// @ts-nocheck
/* ═══════════════════════════════════════════════════════════
   DEMAND PLANNER · FORECAST SCORECARD
   A realistic *simulated* implementation of the Tier-1/Tier-2
   planning metrics (WMAPE · Bias · Tracking Signal · FVA ·
   over/under split · ABC×XYZ segmentation · learning loop).

   The numbers are genuinely COMPUTED from a seeded synthetic
   forecast-vs-actual panel — not hardcoded — to demonstrate the
   metrics are just arithmetic once the data exists. Swap
   genPanel() for a real SAP IBP / DMS feed and the same compute
   functions produce the real scorecard.
   ═══════════════════════════════════════════════════════════ */

/* deterministic PRNG (same style as drawBacktest) */
function rngFrom(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

const GM = 0.24; // gross margin assumption for lost-sales framing

/* Forecast lags = how far ahead the forecast was frozen.
   Lag-1 ≈ demand sensing (best), Lag-4 ≈ the S&OP-relevant horizon (worst). */
const LAGS = {
  // bias = chronic over-forecast target (worse further out — forecasts get optimistic)
  l1: { label: 'Lag-1', hint: 'demand sensing', factor: 0.56, bias: 0.025 },
  l3: { label: 'Lag-3', hint: 'operational',    factor: 0.90, bias: 0.045 },
  l4: { label: 'Lag-4', hint: 'S&OP horizon',   factor: 1.03, bias: 0.065 },
};
const PANEL_SEED = 4157; // one fixed panel so lags differ only by horizon, not by luck
const LAYERS = [
  { key: 'naive', name: 'Seasonal naïve', src: 'last year × trend' },
  { key: 'stat',  name: 'Statistical baseline', src: 'SAP IBP' },
  { key: 'sig',   name: '+ Signal Stack', src: 'velocity · promo · weather' },
  { key: 'cons',  name: 'Consensus', src: 'S&OP · sales + mktg + finance' },
  { key: 'final', name: 'Planner override', src: 'Anjali · final published' },
];

/* Build a synthetic SKU panel for one lag (48 aggregate SKUs). */
function genPanel(lagKey) {
  const cfg = LAGS[lagKey];
  const rng = rngFrom(PANEL_SEED);
  const n = () => rng() * 2 - 1;
  const rows = [];
  for (let i = 0; i < 120; i++) {
    const A = 600 + Math.floor(rng() * 7200);           // weekly actual units (aggregated SKU)
    const price = 360 + Math.floor(rng() * 280);        // ₹ / unit
    const cov = 0.18 + rng() * 0.9;                     // intrinsic variability → XYZ
    const scale = cfg.factor * cov;
    const clamp = (f) => Math.max(A * 0.05, f);         // forecasts can't go (near) negative
    // each layer shrinks error vs the previous one
    const naiveF = clamp(A * (1 + n() * 1.30 * scale));
    const statF  = clamp(A * (1 + n() * 1.10 * scale));
    const sigF   = clamp(A * (1 + n() * 0.98 * scale));
    const consF  = clamp(A * (1 + n() * 0.90 * scale));
    // planner override: systematic UP bias (over-forecasting) + noise
    // → sometimes helps, sometimes destroys value (realistic)
    // flat ~6% chronic over-forecast bias (planner optimism) + noise
    const finalF = clamp(consF * 1.06 + A * n() * 0.26 * scale);
    rows.push({ A, price, cov, naiveF, statF, sigF, consF, finalF });
  }
  return rows;
}

const wmape = (rows, f) => {
  let num = 0, den = 0;
  for (const r of rows) { num += Math.abs(r.A - r[f]); den += r.A; }
  return den ? (num / den) * 100 : 0;
};
const biasPct = (rows, f) => {
  let num = 0, den = 0;
  for (const r of rows) { num += r[f] - r.A; den += r.A; }
  return den ? (num / den) * 100 : 0;
};
const trackingSignal = (rows, f) => {
  let sumErr = 0, sumAbs = 0;
  for (const r of rows) { sumErr += r[f] - r.A; sumAbs += Math.abs(r[f] - r.A); }
  const mad = sumAbs / rows.length;
  return mad ? sumErr / mad : 0;
};

/* full scorecard for one lag */
export function computeScorecard(lagKey) {
  const rows = genPanel(lagKey);

  // Calibrate the published forecast's volume-weighted bias to the lag's chronic
  // over-forecast target (so the Bias KPI is stable & tells a consistent story).
  const realizedBias = biasPct(rows, 'finalF') / 100;
  const shift = LAGS[lagKey].bias - realizedBias;
  rows.forEach((r) => { r.finalF = Math.max(r.A * 0.05, r.finalF + shift * r.A); });

  const layerWmape = {};
  LAYERS.forEach((l) => {
    const f = l.key === 'naive' ? 'naiveF' : l.key === 'stat' ? 'statF'
      : l.key === 'sig' ? 'sigF' : l.key === 'cons' ? 'consF' : 'finalF';
    layerWmape[l.key] = wmape(rows, f);
  });

  // Forecast Value-Add: reduction in WMAPE vs the layer before it (positive = good)
  const fva = {};
  let prev = layerWmape.naive;
  ['stat', 'sig', 'cons', 'final'].forEach((k) => { fva[k] = prev - layerWmape[k]; prev = layerWmape[k]; });
  const fvaVsNaive = layerWmape.naive - layerWmape.final;

  const finalWmape = layerWmape.final;
  const accuracy = 100 - finalWmape;
  const bias = biasPct(rows, 'finalF');
  const ts = histTrackingSignal(); // temporal tracking signal over the 8-week history

  // over- vs under-forecast $ consequence (on the published/final forecast)
  let overUnits = 0, underUnits = 0, overInr = 0, underInr = 0;
  for (const r of rows) {
    const e = r.finalF - r.A;
    if (e >= 0) { overUnits += e; overInr += e * r.price; }               // excess → working capital
    else { underUnits += -e; underInr += (-e) * r.price * GM; }           // shortfall → lost gross margin
  }
  const overShare = (overUnits + underUnits) ? (overUnits / (overUnits + underUnits)) * 100 : 0;

  // ABC × XYZ segmentation
  const byRev = [...rows].map((r) => ({ ...r, rev: r.A * r.price })).sort((a, b) => b.rev - a.rev);
  const totalRev = byRev.reduce((s, r) => s + r.rev, 0);
  let cum = 0;
  byRev.forEach((r) => { cum += r.rev; r.abc = cum / totalRev <= 0.7 ? 'A' : cum / totalRev <= 0.9 ? 'B' : 'C'; });
  byRev.forEach((r) => { r.xyz = r.cov < 0.45 ? 'X' : r.cov < 0.8 ? 'Y' : 'Z'; });
  const seg = {};
  ['A', 'B', 'C'].forEach((a) => ['X', 'Y', 'Z'].forEach((x) => { seg[a + x] = { n: 0, num: 0, den: 0, rev: 0 }; }));
  byRev.forEach((r) => {
    const c = seg[r.abc + r.xyz];
    c.n++; c.num += Math.abs(r.A - r.finalF); c.den += r.A; c.rev += r.rev;
  });
  Object.values(seg).forEach((c) => { c.wmape = c.den ? (c.num / c.den) * 100 : 0; c.revPct = totalRev ? (c.rev / totalRev) * 100 : 0; });

  return {
    lagKey, rows: rows.length, layerWmape, fva, fvaVsNaive,
    finalWmape, accuracy, bias, ts, overShare,
    overUnits, underUnits, overInr, underInr, seg, totalRev,
  };
}

/* 8-week learning-loop history (WMAPE trend + bias + override value-add per cycle) */
export function computeHistory() {
  const rng = rngFrom(613);
  const out = [];
  let w = 36; // start higher, improve over time
  for (let i = 0; i < 8; i++) {
    w = w - 0.7 + (rng() - 0.5) * 1.6;                 // WMAPE gently improving
    const overrideFva = 1.4 - i * 0.15 + (rng() - 0.5) * 2.6; // override value-add, sometimes negative
    const bias = 6.8 - i * 0.32 + (rng() - 0.5) * 2.0; // chronic over-forecast, slowly improving
    out.push({ week: `W${18 + i}`, wmape: +w.toFixed(1), overrideFva: +overrideFva.toFixed(1), bias: +bias.toFixed(1) });
  }
  return out;
}

/* Tracking Signal computed the correct (temporal) way: cumulative bias / MAD over cycles.
   |TS| > 4 ⇒ the process is out of control (persistent bias, not random error). */
function histTrackingSignal() {
  const hist = computeHistory();
  const sumErr = hist.reduce((s, h) => s + h.bias, 0);
  const mad = hist.reduce((s, h) => s + Math.abs(h.bias), 0) / hist.length;
  return mad ? sumErr / mad : 0;
}

/* ── formatting ─────────────────────────────────────────── */
const inrCr = (x) => '₹' + (x / 1e7).toFixed(1) + ' Cr';
const inrShort = (x) => (x >= 1e7 ? '₹' + (x / 1e7).toFixed(1) + ' Cr' : '₹' + (x / 1e5).toFixed(0) + ' L');
const pct = (x, d = 0) => x.toFixed(d) + '%';
const signed = (x, d = 1) => (x >= 0 ? '+' : '') + x.toFixed(d);
const cls = (good) => (good ? 'ok' : 'er');

/* ── render ─────────────────────────────────────────────── */
let dpgState = { lag: 'l4' };

export function dpgLag(lag) {
  dpgState.lag = lag;
  document.querySelectorAll('.dpg-lag').forEach((b) => b.classList.toggle('active', b.dataset.lag === lag));
  dpgRender();
}

function dpgRender() {
  const m = computeScorecard(dpgState.lag);
  const lag = LAGS[dpgState.lag];

  // ── KPI row ──
  const accGood = m.accuracy >= 75;
  const biasCls = Math.abs(m.bias) <= 3 ? 'ok' : Math.abs(m.bias) <= 7 ? 'wn' : 'er';
  const tsCls = Math.abs(m.ts) <= 4 ? 'ok' : 'er';
  const fvaCls = m.fvaVsNaive > 0 ? 'ok' : 'er';
  const kpis = document.getElementById('dpgKpis');
  if (kpis) kpis.innerHTML = `
    <div class="kpi ${accGood ? 'ok' : 'wn'}"><div class="kpi-lbl">Forecast Accuracy · WMAPE</div>
      <div class="kpi-val ${accGood ? 'ok' : 'wn'}">${pct(m.accuracy)}</div>
      <div class="kpi-delta ${accGood ? 'ok' : 'wn'}">WMAPE ${pct(m.finalWmape, 1)} · target 75%</div></div>
    <div class="kpi ${biasCls}"><div class="kpi-lbl">Bias (direction)</div>
      <div class="kpi-val ${biasCls}">${signed(m.bias)}%</div>
      <div class="kpi-delta ${biasCls}">${m.bias >= 0 ? 'over-forecasting → excess' : 'under-forecasting → stockout'}</div></div>
    <div class="kpi ${tsCls}"><div class="kpi-lbl">Tracking Signal</div>
      <div class="kpi-val ${tsCls}">${signed(m.ts)}</div>
      <div class="kpi-delta ${tsCls}">${Math.abs(m.ts) <= 4 ? 'in control (±4)' : 'OUT OF CONTROL'}</div></div>
    <div class="kpi ${fvaCls}"><div class="kpi-lbl">Forecast Value-Add · vs naïve</div>
      <div class="kpi-val ${fvaCls}">${signed(m.fvaVsNaive)} pts</div>
      <div class="kpi-delta ${fvaCls}">${m.fvaVsNaive > 0 ? 'process beats naïve' : 'process LOSES to naïve'}</div></div>`;

  // ── FVA ladder ──
  const maxW = Math.max(...LAYERS.map((l) => m.layerWmape[l.key]));
  const fvaWrap = document.getElementById('dpgFvaWrap');
  if (fvaWrap) fvaWrap.innerHTML = `
    <div class="stack">
      <div class="stack-head">
        <div class="stack-head-title">Forecast Value-Add ladder · <em>who actually improves the forecast?</em></div>
        <div class="stack-head-sub">${lag.label} · lower WMAPE = better · Δ vs layer above</div>
      </div>
      <div class="stack-rows">
        ${LAYERS.map((l, i) => {
          const w = m.layerWmape[l.key];
          const delta = i === 0 ? null : m.fva[l.key];
          const dGood = delta === null ? true : delta >= 0;
          return `<div class="stack-row">
            <div class="stack-row-lbl"><div class="stack-row-name">${l.name}</div><div class="stack-row-src">${l.src}</div></div>
            <div class="stack-row-bar"><div class="stack-row-bar-fill" style="width:${(w / maxW) * 100}%;${i === 0 ? 'background:var(--t-3);box-shadow:none' : ''}"></div></div>
            <div class="stack-row-val">${pct(w, 1)} ${delta === null ? '' : `<span style="color:var(--${dGood ? 'ok' : 'er'});font-size:11px">(${signed(delta)})</span>`}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="insight" style="margin-top:14px;margin-bottom:0">
        <div class="insight-lbl">Read it like a planner</div>
        <div class="insight-text">The Signal Stack adds <strong>${signed(m.fva.sig)} pts</strong> and consensus <strong>${signed(m.fva.cons)} pts</strong>.
        Your <em>override</em> value-add is <strong style="color:var(--${m.fva.final >= 0 ? 'ok' : 'er'})">${signed(m.fva.final)} pts</strong> —
        ${m.fva.final >= 0 ? 'your manual touches are helping.' : 'your manual touches are <em>destroying</em> value this cycle; trust the consensus more.'}</div>
      </div>
    </div>`;

  // ── over / under split ──
  const splitWrap = document.getElementById('dpgSplitWrap');
  if (splitWrap) splitWrap.innerHTML = `
    <div class="recovery-card" style="margin-top:14px">
      <div class="recovery-head">
        <div class="recovery-title">Error direction · <em>two very different problems</em></div>
        <div class="recovery-meta">${lag.label} · signed on published forecast</div>
      </div>
      <div class="compare">
        <div class="compare-row">
          <div class="compare-row-lbl">Over-forecast</div>
          <div class="compare-row-bar"><div class="compare-row-fill industry" style="width:${m.overShare}%"></div></div>
          <div class="compare-row-val">${pct(m.overShare)}</div>
        </div>
        <div class="compare-row">
          <div class="compare-row-lbl">Under-forecast</div>
          <div class="compare-row-bar"><div class="compare-row-fill now" style="width:${100 - m.overShare}%"></div></div>
          <div class="compare-row-val">${pct(100 - m.overShare)}</div>
        </div>
      </div>
      <div class="recv-summary" style="grid-template-columns:1fr 1fr;margin-top:14px">
        <div class="recv-sum-cell"><div class="recv-sum-val wn">${inrShort(m.overInr)}</div><div class="recv-sum-lbl">Excess / working-capital exposure<br/>${Math.round(m.overUnits / 1000)}K units over</div></div>
        <div class="recv-sum-cell"><div class="recv-sum-val er">${inrShort(m.underInr)}</div><div class="recv-sum-lbl">Lost gross-margin exposure<br/>${Math.round(m.underUnits / 1000)}K units short</div></div>
      </div>
    </div>`;

  // ── ABC × XYZ segmentation ──
  const segWrap = document.getElementById('dpgSegWrap');
  if (segWrap) {
    const cell = (a, x) => {
      const c = m.seg[a + x];
      const wc = c.wmape <= 22 ? 'ok' : c.wmape <= 35 ? 'wn' : 'er';
      return `<div class="dpg-seg-cell">
        <div class="dpg-seg-w ${wc}">${c.n ? pct(c.wmape) : '—'}</div>
        <div class="dpg-seg-meta">${c.n} SKU · ${pct(c.revPct)} rev</div></div>`;
    };
    segWrap.innerHTML = `
      <div class="recovery-card" style="margin-top:14px">
        <div class="recovery-head">
          <div class="recovery-title">Segmentation · <em>ABC × XYZ</em> · where to spend effort</div>
          <div class="recovery-meta">WMAPE by value (A/B/C) × variability (X/Y/Z)</div>
        </div>
        <div class="dpg-seg-grid">
          <div class="dpg-seg-h"></div><div class="dpg-seg-h">X · steady</div><div class="dpg-seg-h">Y · variable</div><div class="dpg-seg-h">Z · erratic</div>
          <div class="dpg-seg-h side">A · high ₹</div>${cell('A', 'X')}${cell('A', 'Y')}${cell('A', 'Z')}
          <div class="dpg-seg-h side">B</div>${cell('B', 'X')}${cell('B', 'Y')}${cell('B', 'Z')}
          <div class="dpg-seg-h side">C · long tail</div>${cell('C', 'X')}${cell('C', 'Y')}${cell('C', 'Z')}
        </div>
        <div class="insight" style="margin-top:14px;margin-bottom:0">
          <div class="insight-lbl">Where to spend the day</div>
          <div class="insight-text">Chase accuracy on <strong>A-X / A-Y</strong> (high value, forecastable). For <strong>C-Z</strong> (erratic long tail) stop fighting the forecast — <em>buffer with safety stock instead.</em></div>
        </div>
      </div>`;
  }

  // ── learning loop trend ──
  const hist = computeHistory();
  const trendWrap = document.getElementById('dpgTrendWrap');
  if (trendWrap) {
    const W = 680, H = 90, pad = 8;
    const xs = (i) => pad + (W - 2 * pad) * (i / (hist.length - 1));
    const wm = hist.map((h) => h.wmape);
    const lo = Math.min(...wm) - 2, hi = Math.max(...wm) + 2;
    const ys = (v) => pad + (H - 2 * pad) * (1 - (v - lo) / (hi - lo));
    const path = hist.map((h, i) => `${i === 0 ? 'M' : 'L'}${xs(i).toFixed(1)},${ys(h.wmape).toFixed(1)}`).join('');
    const bars = hist.map((h, i) => {
      const bh = Math.min(28, Math.abs(h.overrideFva) * 7);
      const good = h.overrideFva >= 0;
      const y = good ? 150 - bh : 150;
      return `<rect x="${xs(i) - 9}" y="${y}" width="18" height="${bh}" rx="2" fill="var(--${good ? 'ok' : 'er'})" opacity=".55"/>
        <text x="${xs(i)}" y="${good ? y - 3 : 146}" font-family="Geist Mono" font-size="8" fill="var(--${good ? 'ok' : 'er'})" text-anchor="middle">${signed(h.overrideFva)}</text>`;
    }).join('');
    trendWrap.innerHTML = `
      <div class="backtest" style="margin-top:14px">
        <div class="backtest-head">
          <div class="backtest-title">Learning loop · <em>8-week trend</em></div>
          <div class="backtest-legend">
            <span><span class="backtest-legend-dot" style="background:var(--p-2)"></span>WMAPE (↓ better)</span>
            <span><span class="backtest-legend-dot" style="background:var(--ok)"></span>Override value-add / cycle</span>
          </div>
        </div>
        <svg viewBox="0 0 ${W} 170" preserveAspectRatio="none" style="width:100%;height:150px;display:block">
          <path d="${path}" stroke="var(--p-2)" stroke-width="2.5" fill="none" style="filter:drop-shadow(0 0 3px rgba(168,85,247,.5))"/>
          ${hist.map((h, i) => `<circle cx="${xs(i).toFixed(1)}" cy="${ys(h.wmape).toFixed(1)}" r="3" fill="var(--p-1)"/><text x="${xs(i).toFixed(1)}" y="${(ys(h.wmape) - 8).toFixed(1)}" font-family="Geist Mono" font-size="8" fill="var(--t-3)" text-anchor="middle">${h.wmape}</text>`).join('')}
          <line x1="${pad}" y1="150" x2="${W - pad}" y2="150" stroke="var(--border)" stroke-width="1"/>
          ${bars}
          ${hist.map((h, i) => `<text x="${xs(i).toFixed(1)}" y="168" font-family="Geist Mono" font-size="8" fill="var(--t-4)" text-anchor="middle">${h.week}</text>`).join('')}
        </svg>
      </div>`;
  }
}

export function dpgCommit() {
  const m = computeScorecard(dpgState.lag);
  const fn = (window as any).showWorkflowComplete;
  const push = (window as any).pushAction;
  if (push) push('Published forecast scorecard review · ' + LAGS[dpgState.lag].label + ' · accuracy ' + m.accuracy.toFixed(0) + '%');
  if (fn) {
    fn({
      title: 'Workflow complete · <em>scorecard signed off for S&OP</em>',
      sub: LAGS[dpgState.lag].label + ' · accuracy ' + m.accuracy.toFixed(0) + '% · FVA ' + signed(m.fvaVsNaive) + ' pts vs naïve',
      timeLbl: 'S&OP review',
      timeVal: 'Fri 11:00',
      changes: [
        'Scorecard snapshot frozen · WMAPE ' + m.finalWmape.toFixed(1) + '% · bias ' + signed(m.bias) + '%',
        'Override value-add flagged: ' + signed(m.fva.final) + ' pts · ' + (m.fva.final >= 0 ? 'overrides retained' : 'consensus restored on value-destroying SKUs'),
        'Segmentation policy · A-X/A-Y accuracy targets tightened · C-Z moved to safety-stock buffering',
        'Bias correction routed to statistical model owner (' + (m.bias >= 0 ? 'trim upward bias' : 'lift under-forecast') + ')',
        '<strong>Working-capital exposure</strong> · ' + inrCr(m.overInr) + ' excess flagged to inventory + finance',
      ],
      newplan: [
        { lbl: 'Forecast accuracy', before: '68%', after: m.accuracy.toFixed(0) + '%' },
        { lbl: 'Forecast value-add', before: 'untracked', after: signed(m.fvaVsNaive) + ' pts vs naïve' },
        { lbl: 'Bias', before: 'unmanaged', after: signed(m.bias) + '%' },
      ],
      routes: ['Anjali Sharma (Demand Planning)', 'Statistical model owner', 'S&OP · Fri 11:00', 'Finance (WC)', 'Rajiv Kumar (Inventory)'],
    });
  }
}

export function initDpScorecard() {
  dpgState = { lag: 'l4' };
  document.querySelectorAll('.dpg-lag').forEach((b) => b.classList.toggle('active', b.dataset.lag === 'l4'));
  dpgRender();
}

if (typeof window !== 'undefined') {
  Object.assign(window as any, { dpgLag, dpgCommit, dpgRender });
}
