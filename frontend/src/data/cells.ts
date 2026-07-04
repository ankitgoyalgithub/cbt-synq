// @ts-nocheck
/* Modal cell content — ported verbatim from v0.9. */
/* eslint-disable */
export function setCurrentCellId(id){ _currentCell = id; }
const _kjRail = (active) => `
<div class="kj-rail">
  <div class="kj-step ${active==='brief'?'active':''}" onclick="openCell(currentCellPersona()+'-brief')">
    <div class="kj-step-num">◐ STEP 1</div>
    <div class="kj-step-name">Brief</div>
    <div class="kj-step-sub">What's the situation</div>
  </div>
  <div class="kj-step ${active==='why'?'active':''}" onclick="openCell(currentCellPersona()+'-why')">
    <div class="kj-step-num">◎ STEP 2</div>
    <div class="kj-step-name">Why</div>
    <div class="kj-step-sub">Root cause</div>
  </div>
  <div class="kj-step ${active==='signal'?'active':''}" onclick="openCell(currentCellPersona()+'-signal')">
    <div class="kj-step-num">◭ STEP 3</div>
    <div class="kj-step-name">Signal</div>
    <div class="kj-step-sub">What's coming</div>
  </div>
  <div class="kj-step ${active==='ask'?'active':''}" onclick="closeModal();toggleAsk()">
    <div class="kj-step-num">◆ STEP 4</div>
    <div class="kj-step-name">Ask</div>
    <div class="kj-step-sub">Decide together</div>
  </div>
</div>`;

let _currentCell = '';
function currentCellPersona(){ return _currentCell.split('-')[0]; }

const CELLS = {

  /* ═══════════ CSCO ═══════════ */
  'csco-brief': {
    eyebrow: '◆ CSCO Cockpit · Brief · Wednesday 06:34 IST',
    title: 'The CSCO Wednesday Canvas',
    body: _kjRail('brief') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Network health · 6 plants · 28 depots · 4 channels</div>
            <div class="cell-head-title">The picture, on one canvas</div>
            <div class="cell-head-sub">Refreshed every 4h from SAP S/4 · DMS · Q-Comm APIs · 8s generation time</div>
          </div>
          <span class="cell-tag brief">Brief</span>
        </div>
        <div class="kpi-grid">
          <div class="kpi wn"><div class="kpi-lbl">Service Level</div><div class="kpi-val wn">94.2%</div><div class="kpi-delta er">−1.4pt vs LW</div></div>
          <div class="kpi er"><div class="kpi-lbl">Q-Comm Fill</div><div class="kpi-val er">88%</div><div class="kpi-delta er">7pt below SLA</div></div>
          <div class="kpi ok"><div class="kpi-lbl">Inventory Health</div><div class="kpi-val ok">82%</div><div class="kpi-delta ok">+2pt vs LW</div></div>
          <div class="kpi er"><div class="kpi-lbl">₹ at Risk · 30d</div><div class="kpi-val er">₹10.1Cr</div><div class="kpi-delta wn">62% recoverable</div></div>
          <div class="kpi wn"><div class="kpi-lbl">Forecast Accuracy</div><div class="kpi-val wn">68%</div><div class="kpi-delta wn">target 75% Q2</div></div>
          <div class="kpi ok"><div class="kpi-lbl">OTIF</div><div class="kpi-val ok">91.4%</div><div class="kpi-delta ok">+0.8pt vs LW</div></div>
        </div>
        <div class="insight">
          <div class="insight-lbl">Three things changed overnight</div>
          <div class="insight-text"><strong>1 · East Depot.</strong> Atta 5kg sales velocity +31% on regional campaign. <em>₹42L exposure in 9 days.</em><br/><strong>2 · Blinkit.</strong> Noodles 70g pull spike +37% after 6PM marketing push. SLA dropping. <em>18hr window.</em><br/><strong>3 · East distributors.</strong> ₹4.3Cr volume on credit hold across 4 distributors. <em>Finance escalation needed.</em></div>
        </div>
        <div class="action">
          <div class="action-lbl">Your three decisions today</div>
          <div class="action-text"><strong>(1)</strong> Approve East rebalance (₹42L protected, ₹18K transit cost). <strong>(2)</strong> Approve Blinkit dark-store transfer (SLA protected, ₹3L expedite). <strong>(3)</strong> Escalate distributor AR to Arjun (₹4.3Cr unblocks if 3-of-4 clear). <em>Total time to triage: 90 seconds.</em></div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="openCell('inv-why')">Open East Depot story →</button>
            <button class="btn btn-ghost" onclick="openCell('qcomm-why')">Open Noodles story →</button>
          </div>
        </div>
      </div>`
  },

  'csco-why': {
    eyebrow: '◆ CSCO Cockpit · Why · Revenue Decomposition',
    title: '<em>₹10.1 Cr</em> at risk · decompose &amp; recover',
    body: _kjRail('why') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Pick horizon · toggle recovery actions · everything live</div>
            <div class="cell-head-title">Three streams. <em>Six recovery levers.</em></div>
            <div class="cell-head-sub">The waterfall animates · recovery total recomputes on every toggle</div>
          </div>
          <span class="cell-tag why">Why</span>
        </div>

        <div class="horizon">
          <button class="hzn" data-h="7" onclick="wfHorizon(7)">7 days</button>
          <button class="hzn" data-h="14" onclick="wfHorizon(14)">14 days</button>
          <button class="hzn active" data-h="30" onclick="wfHorizon(30)">30 days</button>
          <button class="hzn" data-h="60" onclick="wfHorizon(60)">60 days</button>
        </div>

        <div class="waterfall-card">
          <div class="waterfall-head">
            <div class="waterfall-title">Revenue at risk · <em id="wfHorizonLbl">next 30 days</em></div>
            <div class="waterfall-sub" id="wfHorizonSub">refreshed 06:34 IST · live from SAP + DMS + Q-Comm</div>
          </div>
          <svg class="waterfall-svg" id="wfSvg" viewBox="0 0 760 200" preserveAspectRatio="xMidYMid meet">
            <!-- grid -->
            <line x1="50" y1="170" x2="710" y2="170" stroke="#23232c" stroke-width="1"/>
            <line x1="50" y1="120" x2="710" y2="120" stroke="#23232c" stroke-dasharray="2,3" opacity=".5"/>
            <line x1="50" y1="70"  x2="710" y2="70"  stroke="#23232c" stroke-dasharray="2,3" opacity=".5"/>

            <!-- Total at risk (left bar) -->
            <rect id="wfBarTotal" x="60" y="40" width="80" height="130" rx="3" fill="#fda4af" opacity=".55"/>
            <text id="wfValTotal" x="100" y="32" font-family="Instrument Serif" font-size="20" font-style="italic" fill="#fff" text-anchor="middle">₹10.1 Cr</text>
            <text x="100" y="188" font-family="Geist Mono" font-size="10" fill="#fbcfe8" text-anchor="middle" font-weight="700" letter-spacing="1">TOTAL AT RISK</text>

            <!-- Stream 1: Stockout -->
            <rect id="wfBar1" x="180" y="85" width="80" height="85" rx="3" fill="#f87171" opacity=".75"/>
            <text id="wfVal1" x="220" y="77" font-family="Geist Mono" font-size="13" font-weight="700" fill="#fda4af" text-anchor="middle">₹3.4 Cr</text>
            <text x="220" y="188" font-family="Geist Mono" font-size="10" fill="#fbcfe8" text-anchor="middle" letter-spacing="1">STOCKOUT</text>

            <!-- Stream 2: Demand miss -->
            <rect id="wfBar2" x="300" y="110" width="80" height="60" rx="3" fill="#fbbf24" opacity=".75"/>
            <text id="wfVal2" x="340" y="102" font-family="Geist Mono" font-size="13" font-weight="700" fill="#fcd34d" text-anchor="middle">₹2.4 Cr</text>
            <text x="340" y="188" font-family="Geist Mono" font-size="10" fill="#fde68a" text-anchor="middle" letter-spacing="1">DEMAND MISS</text>

            <!-- Stream 3: Credit hold -->
            <rect id="wfBar3" x="420" y="62" width="80" height="108" rx="3" fill="#f87171" opacity=".7"/>
            <text id="wfVal3" x="460" y="54" font-family="Geist Mono" font-size="13" font-weight="700" fill="#fda4af" text-anchor="middle">₹4.3 Cr</text>
            <text x="460" y="188" font-family="Geist Mono" font-size="10" fill="#fbcfe8" text-anchor="middle" letter-spacing="1">CREDIT HOLD</text>

            <!-- Divider -->
            <line x1="550" y1="20" x2="550" y2="180" stroke="#34343f" stroke-dasharray="3,3" opacity=".5"/>

            <!-- Recoverable bar (right) — grows with toggles -->
            <rect id="wfBarRecov" x="600" y="89" width="80" height="81" rx="3" fill="#86efac" opacity=".60"/>
            <text id="wfValRecov" x="640" y="81" font-family="Instrument Serif" font-size="20" font-style="italic" fill="#86efac" text-anchor="middle">₹6.3 Cr</text>
            <text id="wfPctRecov" x="640" y="103" font-family="Geist Mono" font-size="9" fill="#bbf7d0" text-anchor="middle" font-weight="600">62% recoverable</text>
            <text x="640" y="188" font-family="Geist Mono" font-size="10" fill="#bbf7d0" text-anchor="middle" font-weight="700" letter-spacing="1">YOU CAN RECOVER</text>
          </svg>
          <div class="waterfall-legend">
            <span><span class="waterfall-legend-dot" style="background:#f87171;opacity:.7"></span>At risk</span>
            <span><span class="waterfall-legend-dot" style="background:#86efac;opacity:.7"></span>Recoverable (toggle below)</span>
            <span><span class="waterfall-legend-dot" style="background:#34343f"></span>Structural · needs Q2 plan</span>
          </div>
        </div>

        <div class="recovery-card">
          <div class="recovery-head">
            <div class="recovery-title">Recovery levers · <em>toggle to commit</em></div>
            <div class="recovery-meta"><span id="recvCount">6</span> of 6 active · routes to S&amp;OP on approve</div>
          </div>
          <div class="recovery-grid">
            <div class="recv-row checked" data-recv="east" data-rs="4200000" data-stream="1" onclick="recvToggle('east')">
              <div class="task-check" style="background:var(--ok);border-color:var(--ok);color:#000">✓</div>
              <div class="recv-name"><div class="recv-name-title">East Depot rebalance · SKU A</div><div class="recv-name-sub">Inventory · West→East transfer 8K units</div></div>
              <div class="recv-time">6 hours</div>
              <div class="recv-cost">₹18 K cost</div>
              <div class="recv-recover">₹42 L</div>
            </div>
            <div class="recv-row checked" data-recv="bnk" data-rs="3500000" data-stream="1" onclick="recvToggle('bnk')">
              <div class="task-check" style="background:var(--ok);border-color:var(--ok);color:#000">✓</div>
              <div class="recv-name"><div class="recv-name-title">Blinkit dark-store transfer · Noodles</div><div class="recv-name-sub">Inventory · 8K units to 5 dark stores</div></div>
              <div class="recv-time">8 hours</div>
              <div class="recv-cost">₹35 K cost</div>
              <div class="recv-recover">₹35 L</div>
            </div>
            <div class="recv-row checked" data-recv="d1" data-rs="12000000" data-stream="3" onclick="recvToggle('d1')">
              <div class="task-check" style="background:var(--ok);border-color:var(--ok);color:#000">✓</div>
              <div class="recv-name"><div class="recv-name-title">Distributor #1 credit unblock</div><div class="recv-name-sub">Credit · Patna Trading Co · ₹1.2Cr volume</div></div>
              <div class="recv-time">2 days</div>
              <div class="recv-cost">finance esc</div>
              <div class="recv-recover">₹1.2 Cr</div>
            </div>
            <div class="recv-row checked" data-recv="d2" data-rs="9000000" data-stream="3" onclick="recvToggle('d2')">
              <div class="task-check" style="background:var(--ok);border-color:var(--ok);color:#000">✓</div>
              <div class="recv-name"><div class="recv-name-title">Distributor #2 credit unblock</div><div class="recv-name-sub">Credit · Kolkata Wholesale · ₹90L volume</div></div>
              <div class="recv-time">2 days</div>
              <div class="recv-cost">finance esc</div>
              <div class="recv-recover">₹90 L</div>
            </div>
            <div class="recv-row checked" data-recv="fc" data-rs="1800000" data-stream="2" onclick="recvToggle('fc')">
              <div class="task-check" style="background:var(--ok);border-color:var(--ok);color:#000">✓</div>
              <div class="recv-name"><div class="recv-name-title">East Atta forecast correction −10%</div><div class="recv-name-sub">Demand · routes to Friday S&amp;OP</div></div>
              <div class="recv-time">S&amp;OP cycle</div>
              <div class="recv-cost">no cost</div>
              <div class="recv-recover">₹18 L</div>
            </div>
            <div class="recv-row checked" data-recv="prod" data-rs="14000000" data-stream="2" onclick="recvToggle('prod')">
              <div class="task-check" style="background:var(--ok);border-color:var(--ok);color:#000">✓</div>
              <div class="recv-name"><div class="recv-name-title">Monsoon production reshuffle</div><div class="recv-name-sub">Demand · weeks 23-26 · Plants 2 + 5</div></div>
              <div class="recv-time">1 week</div>
              <div class="recv-cost">₹2 L expedite</div>
              <div class="recv-recover">₹1.4 Cr</div>
            </div>
          </div>

          <div class="recv-summary">
            <div class="recv-sum-cell"><div class="recv-sum-val ok" id="recvTotal">₹6.3 Cr</div><div class="recv-sum-lbl">Total recovery committed</div></div>
            <div class="recv-sum-cell"><div class="recv-sum-val t1" id="recvPct">62%</div><div class="recv-sum-lbl">of ₹10.1Cr exposure</div></div>
            <div class="recv-sum-cell"><div class="recv-sum-val wn" id="recvCost">₹55 K</div><div class="recv-sum-lbl">Cost to execute</div></div>
            <div class="recv-sum-cell"><div class="recv-sum-val ok" id="recvROI">1,145×</div><div class="recv-sum-lbl">ROI · cost vs ₹ recovered</div></div>
          </div>
        </div>

        <div class="compare">
          <div class="compare-head">Recovery performance · trailing</div>
          <div class="compare-row">
            <div class="compare-row-lbl">This week</div>
            <div class="compare-row-bar"><div class="compare-row-fill now" id="cmpNow" style="width:62%"></div></div>
            <div class="compare-row-val"><span id="cmpNowVal">62%</span> recovery</div>
          </div>
          <div class="compare-row">
            <div class="compare-row-lbl">4-week avg</div>
            <div class="compare-row-bar"><div class="compare-row-fill avg" style="width:48%"></div></div>
            <div class="compare-row-val">48% recovery</div>
          </div>
          <div class="compare-row">
            <div class="compare-row-lbl">Industry benchmark</div>
            <div class="compare-row-bar"><div class="compare-row-fill industry" style="width:32%"></div></div>
            <div class="compare-row-val">32% recovery</div>
          </div>
        </div>

        <div class="insight">
          <div class="insight-lbl">What this means · honest</div>
          <div class="insight-text"><strong>₹6.3 Cr is recoverable in 7 days.</strong> The remaining ₹3.8 Cr needs Q2 plan changes — distributor renegotiation and production rebalance for monsoon. <em>The system does not promise what it cannot deliver.</em> Industry-average recovery is 32%. We're at 62% because the levers are pre-staged, not invented.</div>
        </div>

        <div class="action">
          <div class="action-lbl">Approve recovery package</div>
          <div class="action-text"><strong>Single approval · 6 actions routed in parallel.</strong> Inventory team gets transfers. Finance gets credit unblock escalation. Demand planner gets forecast correction. Production planner gets reshuffle directive.</div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="recvApprove()">◆ Approve recovery package</button>
            <button class="btn btn-ghost" onclick="openCell('inv-why')">Drill into East Depot →</button>
            <button class="btn btn-ghost" onclick="openCell('csco-signal')">See what's coming →</button>
          </div>
        </div>
      </div>`
  },

  'csco-signal': {
    eyebrow: '◆ CSCO Cockpit · Signal · Event Radar',
    title: '120 days of <em>supply moments</em>',
    body: _kjRail('signal') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Click any event on the timeline · stress-test arrival ± days · tick prep tasks</div>
            <div class="cell-head-title">Three events live. <em>Pick one to ready.</em></div>
            <div class="cell-head-sub">Each event is a playbook with last-year retrospective and ready-to-execute tasks</div>
          </div>
          <span class="cell-tag signal">Signal</span>
        </div>

        <div class="radar-card">
          <div class="radar-head">
            <div class="radar-title">Forward radar · <em>120 days</em></div>
            <div class="radar-sub" id="radarSub">click an event to expand · stress-test below</div>
          </div>
          <svg class="radar-svg" id="radarSvg" viewBox="0 0 760 200" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="rad_amber"><stop offset="0%" stop-color="#fbbf24" stop-opacity=".5"/><stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/></radialGradient>
              <radialGradient id="rad_purple"><stop offset="0%" stop-color="#c084fc" stop-opacity=".5"/><stop offset="100%" stop-color="#c084fc" stop-opacity="0"/></radialGradient>
              <radialGradient id="rad_green"><stop offset="0%" stop-color="#86efac" stop-opacity=".5"/><stop offset="100%" stop-color="#86efac" stop-opacity="0"/></radialGradient>
            </defs>
            <!-- Today line -->
            <line id="todayLine" x1="40" y1="30" x2="40" y2="170" stroke="#c084fc" stroke-dasharray="4,3" opacity=".75"/>
            <text x="40" y="22" font-family="Geist Mono" font-size="10" fill="#c084fc" text-anchor="middle" font-weight="700" letter-spacing="1.2">TODAY</text>
            <!-- Timeline base -->
            <line x1="40" y1="170" x2="720" y2="170" stroke="#34343f" stroke-width="1.5"/>
            <g stroke="#34343f" stroke-width="1">
              <line x1="40" y1="165" x2="40" y2="175"/>
              <line x1="155" y1="165" x2="155" y2="175"/>
              <line x1="270" y1="165" x2="270" y2="175"/>
              <line x1="385" y1="165" x2="385" y2="175"/>
              <line x1="500" y1="165" x2="500" y2="175"/>
              <line x1="615" y1="165" x2="615" y2="175"/>
              <line x1="720" y1="165" x2="720" y2="175"/>
            </g>
            <!-- Month labels -->
            <text x="40"  y="190" font-family="Geist Mono" font-size="9" fill="#5d5d68" text-anchor="middle" letter-spacing="1.2">MAY</text>
            <text x="155" y="190" font-family="Geist Mono" font-size="9" fill="#5d5d68" text-anchor="middle" letter-spacing="1.2">JUN</text>
            <text x="270" y="190" font-family="Geist Mono" font-size="9" fill="#5d5d68" text-anchor="middle" letter-spacing="1.2">JUL</text>
            <text x="385" y="190" font-family="Geist Mono" font-size="9" fill="#5d5d68" text-anchor="middle" letter-spacing="1.2">AUG</text>
            <text x="500" y="190" font-family="Geist Mono" font-size="9" fill="#5d5d68" text-anchor="middle" letter-spacing="1.2">SEP</text>
            <text x="615" y="190" font-family="Geist Mono" font-size="9" fill="#5d5d68" text-anchor="middle" letter-spacing="1.2">OCT</text>
            <text x="720" y="190" font-family="Geist Mono" font-size="9" fill="#5d5d68" text-anchor="middle" letter-spacing="1.2">NOV</text>

            <!-- Event nodes (g elements for click) -->
            <g class="event-node active" id="evt_monsoon" onclick="radarSelect('monsoon')">
              <line id="evt_monsoon_line" x1="195" y1="100" x2="195" y2="170" stroke="#fbbf24" stroke-dasharray="2,2" opacity=".6"/>
              <circle id="evt_monsoon_halo" cx="195" cy="100" r="32" fill="url(#rad_amber)"/>
              <circle id="evt_monsoon_dot" cx="195" cy="100" r="13" fill="#fbbf24" stroke="#fff" stroke-width="2"/>
              <text id="evt_monsoon_lbl" x="195" y="80" font-family="Geist Mono" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">Monsoon</text>
              <text id="evt_monsoon_days" x="195" y="68" font-family="Geist Mono" font-size="9" fill="#fbbf24" text-anchor="middle" font-weight="700" letter-spacing="1">+14 DAYS</text>
            </g>

            <g class="event-node" id="evt_diwali" onclick="radarSelect('diwali')">
              <line x1="495" y1="80" x2="495" y2="170" stroke="#c084fc" stroke-dasharray="2,2" opacity=".5"/>
              <circle cx="495" cy="80" r="28" fill="url(#rad_purple)"/>
              <circle cx="495" cy="80" r="11" fill="#c084fc" stroke="#fff" stroke-width="1.5"/>
              <text x="495" y="60" font-family="Geist Mono" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">Diwali prep</text>
              <text x="495" y="48" font-family="Geist Mono" font-size="9" fill="#c084fc" text-anchor="middle" font-weight="700" letter-spacing="1">+95 DAYS</text>
            </g>

            <g class="event-node" id="evt_bbd" onclick="radarSelect('bbd')">
              <line x1="620" y1="120" x2="620" y2="170" stroke="#86efac" stroke-dasharray="2,2" opacity=".4"/>
              <circle cx="620" cy="120" r="22" fill="url(#rad_green)"/>
              <circle cx="620" cy="120" r="9" fill="#86efac" stroke="#fff" stroke-width="1.5"/>
              <text x="620" y="105" font-family="Geist Mono" font-size="11" fill="#fff" text-anchor="middle" font-weight="600">Q-Comm BBD</text>
              <text x="620" y="93" font-family="Geist Mono" font-size="9" fill="#86efac" text-anchor="middle" font-weight="600" letter-spacing="1">+118 DAYS</text>
            </g>
          </svg>
        </div>

        <div class="stress-card">
          <div class="stress-head">
            <div class="stress-title">Stress test · selected event arrives ± days from forecast</div>
            <div class="stress-val"><span id="stressVal">+0</span><em> days</em></div>
          </div>
          <input type="range" class="slider" id="stressSlider" min="-15" max="15" step="1" value="0" oninput="stressUpdate()"/>
          <div class="slider-marks"><span>−15d earlier</span><span>−7d</span><span>forecast</span><span>+7d</span><span>+15d later</span></div>
        </div>

        <div class="event-detail show" id="evtDetail">
          <!-- populated by radarSelect -->
        </div>

        <div class="action">
          <div class="action-lbl">Activate selected event playbook</div>
          <div class="action-text">Locks the production reshuffle + depot pre-stocking + distributor comms. <em>Routes to ops, planning, and sales teams in parallel.</em></div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="radarApprove()">◆ Activate playbook</button>
            <button class="btn btn-ghost" onclick="openCell('csco-why')">← Back to recovery</button>
          </div>
        </div>
      </div>`
  },

  /* ═══════════ DP ═══════════ */
  'dp-brief': {
    eyebrow: '◆ Demand Planning · Brief · 16-week rolling plan',
    title: 'The Demand Planning Canvas',
    body: _kjRail('brief') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ 184 SKUs · 28 depots · 16-week rolling · backtested 18 months</div>
            <div class="cell-head-title">Forecast health &amp; this cycle's exceptions</div>
            <div class="cell-head-sub">Sense layer · the planner's read before Friday S&amp;OP — what's healthy, what's drifting, what needs a human eye</div>
          </div>
          <span class="cell-tag brief">Brief · Sense</span>
        </div>

        <div class="kpi-grid">
          <div class="kpi wn"><div class="kpi-lbl">Forecast Accuracy</div><div class="kpi-val wn">68%</div><div class="kpi-delta wn">82% backtested · target 75%</div></div>
          <div class="kpi ok"><div class="kpi-lbl">Forecast Value Add</div><div class="kpi-val ok">+11 pts</div><div class="kpi-delta ok">over seasonal-naive baseline</div></div>
          <div class="kpi"><div class="kpi-lbl">MAPE</div><div class="kpi-val">8.7%</div><div class="kpi-delta">improving · −0.4 pts wk/wk</div></div>
          <div class="kpi wn"><div class="kpi-lbl">Bias</div><div class="kpi-val wn">−2.1%</div><div class="kpi-delta wn">slight under-forecast</div></div>
        </div>

        <div style="font-size:11px;color:var(--t-3);font-family:var(--mono);line-height:1.55;margin:-2px 0 14px;padding:9px 13px;background:var(--bg-4);border:1px solid var(--border);border-radius:8px">
          <strong style="color:var(--ok)">FVA +11 pts</strong> = the enhanced forecast beats a naive seasonal forecast by 11 accuracy points across the 18-month backtest. <span style="color:var(--t-4)">This is the number that proves the model earns its keep — a backtest, not a claim.</span>
        </div>

        <div style="background:var(--bg-4);border:1px solid var(--border);border-radius:10px;padding:16px 16px 12px;margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
            <div style="font-size:12px;color:var(--t-2);font-weight:600">Demand · history, forecast &amp; confidence band</div>
            <div style="font-size:10px;color:var(--t-3);font-family:var(--mono)">weekly · units (000s)</div>
          </div>
          <svg viewBox="0 0 920 300" width="100%" style="display:block">
            <g stroke="#23232c" stroke-width="1">
              <line x1="60" y1="70" x2="880" y2="70"/>
              <line x1="60" y1="120" x2="880" y2="120"/>
              <line x1="60" y1="170" x2="880" y2="170"/>
              <line x1="60" y1="220" x2="880" y2="220"/>
            </g>
            <g font-family="Geist Mono" font-size="9" fill="#5d5d68" text-anchor="end">
              <text x="52" y="73">170</text>
              <text x="52" y="123">150</text>
              <text x="52" y="173">130</text>
              <text x="52" y="223">110</text>
            </g>
            <path d="M 560 156 L 610 144 L 660 132 L 710 120 L 760 110 L 810 101 L 860 93 L 880 90 L 880 197 L 860 194 L 810 189 L 760 184 L 710 178 L 660 172 L 610 166 L 560 160 Z" fill="rgba(192,132,252,.13)" stroke="rgba(192,132,252,.30)" stroke-width="0.5"/>
            <line x1="560" y1="40" x2="560" y2="250" stroke="#3d3d46" stroke-width="1" stroke-dasharray="3,3"/>
            <polyline points="60,222 100,216 140,212 180,214 220,206 260,200 300,196 340,190 380,186 420,182 460,176 500,170 540,162 560,158" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
            <polyline points="560,158 610,156 660,153 710,151 760,149 810,148 860,147 880,146" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,4" stroke-linecap="round"/>
            <polyline points="560,158 610,150 660,144 710,138 760,132 810,127 860,122 880,120" fill="none" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="880" cy="120" r="3.5" fill="#c084fc"/>
            <g font-family="Geist Mono" font-size="9" fill="#5d5d68" text-anchor="middle">
              <text x="60" y="272">W38</text>
              <text x="220" y="272">W46</text>
              <text x="420" y="272">W52</text>
              <text x="560" y="272" fill="#c084fc">now</text>
              <text x="720" y="272">W58</text>
              <text x="875" y="272">W65</text>
            </g>
          </svg>
          <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:8px;font-size:10px;font-family:var(--mono);color:var(--t-3)">
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:14px;height:2px;background:#4ade80;display:inline-block"></span>Historical</span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:14px;height:0;border-top:2px dashed #60a5fa;display:inline-block"></span>Baseline forecast</span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:14px;height:3px;background:#c084fc;display:inline-block"></span>Enhanced forecast</span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:14px;height:9px;background:rgba(192,132,252,.22);border:.5px solid rgba(192,132,252,.45);display:inline-block"></span>P10–P90 band</span>
          </div>
          <div style="font-size:10.5px;color:var(--t-4);font-family:var(--mono);margin-top:9px;line-height:1.55">The shaded band is the <strong style="color:var(--t-3)">P10–P90 interval (80% confidence)</strong> and widens with horizon. We show the range of outcomes, <em style="color:var(--t-3)">not a single false-precise line.</em></div>
        </div>

        <div style="font-size:11px;color:var(--p-1);font-family:var(--mono);letter-spacing:.08em;text-transform:uppercase;font-weight:700;margin-bottom:8px">◎ Exception radar · requires a planner's eye</div>
        <div class="risk-table">
          <div class="risk-row header"><div>SKU · Region · signal</div><div style="text-align:right">Variance</div><div style="text-align:right">Confidence</div><div style="text-align:center">Action</div></div>
          <div class="risk-row" onclick="openCell('dp-why')"><div class="risk-row-left"><div class="risk-sku">Atta 5kg · East</div><div class="risk-loc">High variability · DMS offtake drop</div></div><div class="risk-val er">−24%</div><div class="risk-days">71%</div><div class="risk-status er">Diagnose →</div></div>
          <div class="risk-row"><div class="risk-row-left"><div class="risk-sku">Noodles 70g · National</div><div class="risk-loc">Trend shift · Q-Comm pull +37%</div></div><div class="risk-val wn">+37%</div><div class="risk-days">64%</div><div class="risk-status wn">Review +15%</div></div>
          <div class="risk-row"><div class="risk-row-left"><div class="risk-sku">Soap 100g · North</div><div class="risk-loc">Low confidence · Modern Trade softness</div></div><div class="risk-val er">−18%</div><div class="risk-days">58%</div><div class="risk-status wn">Correct −8%</div></div>
          <div class="risk-row"><div class="risk-row-left"><div class="risk-sku">Sunscreen 50ml · South</div><div class="risk-loc">Outlier · heatwave + Q-Comm promo</div></div><div class="risk-val er">−22%</div><div class="risk-days">60%</div><div class="risk-status wn">Review</div></div>
        </div>

        <div class="action">
          <div class="action-lbl">Recommended next step</div>
          <div class="action-text">Start with the biggest, lowest-confidence miss — <em>East Atta 5kg, −24% at 71% confidence.</em> Diagnose the drivers before deciding the correction. Approved corrections are <strong>staged for Friday's S&amp;OP review</strong> — Demand Planning proposes; the cross-functional review commits.</div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="openCell('dp-why')">Diagnose East Atta →</button>
            <button class="btn btn-ghost" onclick="approveAction('4 corrections staged for Friday S&amp;OP review')">Stage 4 corrections for S&amp;OP</button>
          </div>
        </div>
      </div>`
  },

  'dp-why': {
    eyebrow: '◆ Demand Planning · Why · East Atta 5kg',
    title: 'East SKU B · <em>why 76K vs 100K</em>',
    body: _kjRail('why') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Driver decomposition · model-based + estimated · East Atta 5kg</div>
            <div class="cell-head-title">What drove the −24% miss</div>
          </div>
          <span class="cell-tag why">Why · Diagnose</span>
        </div>
        <div class="stack">
          <div class="stack-head">
            <div class="stack-head-title">Estimated driver contributions · ranked</div>
            <div class="stack-head-sub">−24K units · ~82% attributed · 18% residual</div>
          </div>
          <div class="stack-rows">
            <div class="stack-row">
              <div class="stack-row-lbl"><div class="stack-row-name">Distributor offtake softness</div><div class="stack-row-src">DMS · 244 distributors · measured <span style="padding:1px 5px;border-radius:4px;font-size:8.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;background:var(--ok-bg);color:var(--ok);border:1px solid var(--ok-border)">high</span></div></div>
              <div class="stack-row-bar"><div style="position:absolute;top:0;bottom:0;left:40%;width:15%;background:rgba(192,132,252,.20);border-radius:5px"></div><div class="stack-row-bar-fill" style="width:46%"></div></div>
              <div class="stack-row-val">≈46%<div style="font-size:9px;color:var(--t-3);font-weight:400;margin-top:1px">−11K</div></div>
            </div>
            <div class="stack-row">
              <div class="stack-row-lbl"><div class="stack-row-name">Competitor price action</div><div class="stack-row-src">Inferred · no live feed <span style="padding:1px 5px;border-radius:4px;font-size:8.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;background:var(--er-bg);color:var(--er);border:1px solid var(--er-border)">low</span></div></div>
              <div class="stack-row-bar"><div style="position:absolute;top:0;bottom:0;left:8%;width:20%;background:rgba(192,132,252,.20);border-radius:5px"></div><div class="stack-row-bar-fill" style="width:18%"></div></div>
              <div class="stack-row-val">≈18%<div style="font-size:9px;color:var(--t-3);font-weight:400;margin-top:1px">−4K</div></div>
            </div>
            <div class="stack-row">
              <div class="stack-row-lbl"><div class="stack-row-name">Weather · early monsoon</div><div class="stack-row-src">IMD feed × response model <span style="padding:1px 5px;border-radius:4px;font-size:8.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;background:var(--wn-bg);color:var(--wn);border:1px solid var(--wn-border)">med</span></div></div>
              <div class="stack-row-bar"><div style="position:absolute;top:0;bottom:0;left:6%;width:9%;background:rgba(192,132,252,.20);border-radius:5px"></div><div class="stack-row-bar-fill" style="width:11%"></div></div>
              <div class="stack-row-val">≈11%<div style="font-size:9px;color:var(--t-3);font-weight:400;margin-top:1px">−3K</div></div>
            </div>
            <div class="stack-row">
              <div class="stack-row-lbl"><div class="stack-row-name">Promo lag · campaign delay</div><div class="stack-row-src">Marketing calendar <span style="padding:1px 5px;border-radius:4px;font-size:8.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;background:var(--wn-bg);color:var(--wn);border:1px solid var(--wn-border)">med</span></div></div>
              <div class="stack-row-bar"><div style="position:absolute;top:0;bottom:0;left:4%;width:6%;background:rgba(192,132,252,.20);border-radius:5px"></div><div class="stack-row-bar-fill" style="width:7%"></div></div>
              <div class="stack-row-val">≈7%<div style="font-size:9px;color:var(--t-3);font-weight:400;margin-top:1px">−2K</div></div>
            </div>
            <div class="stack-row">
              <div class="stack-row-lbl"><div class="stack-row-name" style="color:var(--t-3)">Unexplained · residual</div><div class="stack-row-src">Not attributed to a known driver</div></div>
              <div class="stack-row-bar"><div class="stack-row-bar-fill" style="width:18%;background:var(--t-4);box-shadow:none"></div></div>
              <div class="stack-row-val" style="color:var(--t-3)">≈18%<div style="font-size:9px;color:var(--t-4);font-weight:400;margin-top:1px">−4K</div></div>
            </div>
          </div>
          <div style="font-size:10px;color:var(--t-4);font-family:var(--mono);line-height:1.55;margin-top:14px;padding-top:12px;border-top:1px dashed var(--border)">
            <strong style="color:var(--t-3)">Method:</strong> contributions are model-based (SHAP on the forecast's features) plus elasticity estimates over the 18-month backtest — <span style="color:var(--t-3)">estimates with a confidence range, not exact causal shares.</span> The shaded band on each bar is that range. Competitor effect is inferred (no live competitor feed), so it carries the widest band and the lowest confidence.
          </div>
        </div>
        <div class="insight">
          <div class="insight-lbl">What the system is telling you</div>
          <div class="insight-text">The miss is <strong>mostly commercial</strong> — distributor offtake is the measured, high-confidence driver (~46%). Competitor and weather are <em>estimates</em>, and ~18% stays unexplained. This <strong>isn't a model failure</strong>: the model can't fix soft distributor pull, but it can stop overproducing for it. <strong>Suggested correction: trim East SKU B by ~10% for weeks 5–10 — a proposal for S&amp;OP, not a certainty.</strong></div>
        </div>
        <div class="action">
          <div class="action-lbl">Proposed correction → S&amp;OP</div>
          <div class="action-text">A −10% trim in weeks 5–10 would release <strong>~₹18L of working capital</strong> and avoid <em>~8K units of excess East inventory.</em> At 71% confidence this is a proposal — Demand Planning stages it; Friday's S&amp;OP commits.</div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="approveAction('East SKU B −10% W5-10 staged for S&amp;OP')">Stage −10% for S&amp;OP</button>
            <button class="btn btn-ghost" onclick="openCell('dp-signal')">See the Signal Stack →</button>
          </div>
        </div>
      </div>`
  },

  /* ═══════════ THE FLAGSHIP · SIGNAL STACK · interactive ═══════════ */
  'dp-signal': {
    eyebrow: '◆ Demand Planning · Signal · The Signal Stack',
    title: 'The Signal Stack · <em>build your own lift</em>',
    body: _kjRail('signal') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Toggle any signal · switch SKU profile · everything recomputes live</div>
            <div class="cell-head-title">Five signals, four SKU profiles. <em>Marginal lift, measured — not magic.</em></div>
            <div class="cell-head-sub">Each layer is a real data source · rolling-origin backtest on 184 SKUs · 18 months · lifts shown with confidence ranges</div>
          </div>
          <span class="cell-tag signal">Signal</span>
        </div>

        <div class="profile-pills">
          <span class="slider-lbl" style="align-self:center;margin-right:6px">SKU profile</span>
          <button class="profile-pill active" data-prof="all" onclick="stackProfile('all')">All 184 SKUs</button>
          <button class="profile-pill" data-prof="foods" onclick="stackProfile('foods')">Foods (promo-heavy)</button>
          <button class="profile-pill" data-prof="pc" onclick="stackProfile('pc')">Personal Care (stable)</button>
          <button class="profile-pill" data-prof="qcomm" onclick="stackProfile('qcomm')">Q-Comm heavy</button>
        </div>

        <div class="sig-row baseline">
          <div></div>
          <div>
            <div style="font-size:13px;color:var(--t-1);font-weight:600">Baseline · SAP IBP</div>
            <div style="font-size:10px;color:var(--t-3);font-family:var(--mono)">Single-source statistical model</div>
          </div>
          <div class="stack-row-bar"><div class="stack-row-bar-fill" id="baselineBar" style="width:60%;background:var(--t-3);box-shadow:none"></div></div>
          <div class="sig-baseline-lbl" id="baselineLbl">60%</div>
        </div>

        <div class="sig-row" data-sig="velocity">
          <label class="toggle"><input type="checkbox" checked onchange="stackUpdate()"/><span class="toggle-track"></span></label>
          <div>
            <div style="font-size:13px;color:var(--t-1);font-weight:600">Sales velocity</div>
            <div style="font-size:10px;color:var(--t-3);font-family:var(--mono)">DMS · daily distributor offtake · <span style="color:var(--ok)">LIVE</span></div>
            <div class="prov" id="prov_velocity">
              <strong>Source:</strong> Aurion's DMS (244 East distributors), polled every 6 hours.<br/>
              <strong>How it lifts:</strong> Captures real distributor sell-out before it shows up in primary sales.
              <div class="prov-flow"><span>DMS API</span><span class="arr">→</span><span>244 distributors</span><span class="arr">→</span><span>6h polling</span><span class="arr">→</span><span>Signal Stack</span></div>
            </div>
            <button onclick="toggleProv('velocity')" style="font-size:10px;color:var(--p-1);font-family:var(--mono);background:none;border:0;cursor:pointer;padding:2px 0;text-decoration:underline">show source</button>
          </div>
          <div class="stack-row-bar"><div class="stack-row-bar-fill" id="bar_velocity" style="width:16%"></div></div>
          <div style="font-family:var(--mono);font-size:12px;color:var(--ok);text-align:right;font-weight:600"><span id="lift_velocity">+8</span> pts</div>
        </div>

        <div class="sig-row" data-sig="promo">
          <label class="toggle"><input type="checkbox" checked onchange="stackUpdate()"/><span class="toggle-track"></span></label>
          <div>
            <div style="font-size:13px;color:var(--t-1);font-weight:600">Promo lift</div>
            <div style="font-size:10px;color:var(--t-3);font-family:var(--mono)">Marketing calendar × historical elasticity · <span style="color:var(--ok)">LIVE</span></div>
            <div class="prov" id="prov_promo">
              <strong>Source:</strong> Marketing campaign calendar + 24 months of historical promo lift by SKU.<br/>
              <strong>How it lifts:</strong> Knows in advance what promos are scheduled and predicts their lift per SKU.
              <div class="prov-flow"><span>Mkt calendar</span><span class="arr">→</span><span>24mo history</span><span class="arr">→</span><span>elasticity model</span><span class="arr">→</span><span>Signal Stack</span></div>
            </div>
            <button onclick="toggleProv('promo')" style="font-size:10px;color:var(--p-1);font-family:var(--mono);background:none;border:0;cursor:pointer;padding:2px 0;text-decoration:underline">show source</button>
          </div>
          <div class="stack-row-bar"><div class="stack-row-bar-fill" id="bar_promo" style="width:24%"></div></div>
          <div style="font-family:var(--mono);font-size:12px;color:var(--ok);text-align:right;font-weight:600"><span id="lift_promo">+12</span> pts</div>
        </div>

        <div class="sig-row" data-sig="weather">
          <label class="toggle"><input type="checkbox" checked onchange="stackUpdate()"/><span class="toggle-track"></span></label>
          <div>
            <div style="font-size:13px;color:var(--t-1);font-weight:600">Weather signal</div>
            <div style="font-size:10px;color:var(--t-3);font-family:var(--mono)">IMD feed × SKU-weather correlation · <span style="color:var(--ok)">LIVE</span></div>
            <div class="prov" id="prov_weather">
              <strong>Source:</strong> India Meteorological Dept 14-day forecast × per-SKU weather sensitivity coefficients.<br/>
              <strong>How it lifts:</strong> Heavy on monsoon-sensitive SKUs (oil, biscuit). Near-zero on weather-stable SKUs.
              <div class="prov-flow"><span>IMD 14d</span><span class="arr">→</span><span>SKU correlation</span><span class="arr">→</span><span>weighted signal</span><span class="arr">→</span><span>Signal Stack</span></div>
            </div>
            <button onclick="toggleProv('weather')" style="font-size:10px;color:var(--p-1);font-family:var(--mono);background:none;border:0;cursor:pointer;padding:2px 0;text-decoration:underline">show source</button>
          </div>
          <div class="stack-row-bar"><div class="stack-row-bar-fill" id="bar_weather" style="width:12%"></div></div>
          <div style="font-family:var(--mono);font-size:12px;color:var(--ok);text-align:right;font-weight:600"><span id="lift_weather">+6</span> pts</div>
        </div>

        <div class="sig-row" data-sig="qcomm">
          <label class="toggle"><input type="checkbox" checked onchange="stackUpdate()"/><span class="toggle-track"></span></label>
          <div>
            <div style="font-size:13px;color:var(--t-1);font-weight:600">Q-Commerce pulse</div>
            <div style="font-size:10px;color:var(--t-3);font-family:var(--mono)">Blinkit/Zepto/Instamart APIs · <span style="color:var(--wn)">PENDING (6 wks)</span></div>
            <div class="prov" id="prov_qcomm">
              <strong>Source:</strong> Direct dark-store inventory + velocity feeds from Blinkit, Zepto, Instamart.<br/>
              <strong>How it lifts:</strong> Catches Q-Comm demand spikes 12-24h before they show up in central forecasts.
              <div class="prov-flow"><span>Platform APIs</span><span class="arr">→</span><span>24 dark stores</span><span class="arr">→</span><span>30-min refresh</span><span class="arr">→</span><span>Signal Stack</span></div>
            </div>
            <button onclick="toggleProv('qcomm')" style="font-size:10px;color:var(--p-1);font-family:var(--mono);background:none;border:0;cursor:pointer;padding:2px 0;text-decoration:underline">show source</button>
          </div>
          <div class="stack-row-bar"><div class="stack-row-bar-fill" id="bar_qcomm" style="width:18%"></div></div>
          <div style="font-family:var(--mono);font-size:12px;color:var(--ok);text-align:right;font-weight:600"><span id="lift_qcomm">+9</span> pts</div>
        </div>

        <div class="sig-row" data-sig="sentiment">
          <label class="toggle"><input type="checkbox" checked onchange="stackUpdate()"/><span class="toggle-track"></span></label>
          <div>
            <div style="font-size:13px;color:var(--t-1);font-weight:600">Distributor sentiment</div>
            <div style="font-size:10px;color:var(--t-3);font-family:var(--mono)">Field-force WhatsApp · NLP · <span style="color:var(--wn)">PENDING (6 wks)</span></div>
            <div class="prov" id="prov_sentiment">
              <strong>Source:</strong> Aurion field-force WhatsApp chatter + structured rep feedback, NLP-extracted.<br/>
              <strong>How it lifts:</strong> Catches distributor-level demand shifts (competition, payment issues, festive expectations) weeks before primary sales reflect them.
              <div class="prov-flow"><span>WhatsApp</span><span class="arr">→</span><span>NLP</span><span class="arr">→</span><span>distributor signal</span><span class="arr">→</span><span>Signal Stack</span></div>
            </div>
            <button onclick="toggleProv('sentiment')" style="font-size:10px;color:var(--p-1);font-family:var(--mono);background:none;border:0;cursor:pointer;padding:2px 0;text-decoration:underline">show source</button>
          </div>
          <div class="stack-row-bar"><div class="stack-row-bar-fill" id="bar_sentiment" style="width:20%"></div></div>
          <div style="font-family:var(--mono);font-size:12px;color:var(--ok);text-align:right;font-weight:600"><span id="lift_sentiment">+10</span> pts</div>
        </div>

        <div class="stack-result" id="stackResult">
          <div class="stack-result-cell"><div class="stack-result-val was" id="stackBaseline">60%</div><div class="stack-result-lbl">Today · baseline</div></div>
          <div class="stack-result-cell"><div class="stack-result-val arrow">→</div><div class="stack-result-lbl"><span id="stackCount">5</span> signals selected</div></div>
          <div class="stack-result-cell"><div class="stack-result-val now" id="stackTotal">72%</div><div class="stack-result-lbl"><span id="stackProfileLbl">All 184 SKUs</span> · with roadmap</div></div>
        </div>

        <div class="backtest">
          <div class="backtest-head">
            <div class="backtest-title">Rolling-origin backtest · 18 months · <em id="backtestSku">All SKUs</em></div>
            <div class="backtest-legend">
              <span><span class="backtest-legend-dot" style="background:var(--t-3)"></span>Baseline</span>
              <span><span class="backtest-legend-dot" style="background:#fff"></span>Actuals</span>
              <span><span class="backtest-legend-dot" style="background:var(--p-2)"></span>With stack</span>
            </div>
          </div>
          <svg class="backtest-svg" id="backtestSvg" viewBox="0 0 700 130" preserveAspectRatio="none">
            <g id="backtestGrid">
              <line x1="0" y1="32" x2="700" y2="32" stroke="#23232c" stroke-dasharray="2,3"/>
              <line x1="0" y1="65" x2="700" y2="65" stroke="#23232c" stroke-dasharray="2,3"/>
              <line x1="0" y1="98" x2="700" y2="98" stroke="#23232c" stroke-dasharray="2,3"/>
            </g>
            <path id="backtestActual" d="" stroke="#f5f5f7" stroke-width="2" fill="none"/>
            <path id="backtestBaseline" d="" stroke="#8b8b95" stroke-width="1.5" fill="none" stroke-dasharray="4,3" opacity=".7"/>
            <path id="backtestStack" d="" stroke="#a855f7" stroke-width="2.5" fill="none" style="filter:drop-shadow(0 0 4px rgba(168,85,247,.5))"/>
            <text x="10" y="14" font-family="Geist Mono" font-size="9" fill="#8b8b95">Forecast vs Actual</text>
            <text x="690" y="125" font-family="Geist Mono" font-size="9" fill="#5d5d68" text-anchor="end">90 days →</text>
          </svg>
        </div>

        <div class="calc-card">
          <div class="calc-cell"><div class="calc-val ok" id="calcLive">69%</div><div class="calc-lbl">Live today · 3 signals</div></div>
          <div class="calc-cell"><div class="calc-val ok" id="calcProjected">72%</div><div class="calc-lbl">With roadmap · incl pending</div></div>
          <div class="calc-cell"><div class="calc-val ok" id="calcWC">₹1.4–2.2 Cr</div><div class="calc-lbl">Est. WC released / yr</div></div>
          <div class="calc-cell"><div class="calc-val ok" id="calcPayback">—</div><div class="calc-lbl">Payback · pending signals</div></div>
        </div>

        <div class="insight">
          <div class="insight-lbl">Why this is defensible</div>
          <div class="insight-text">Every signal has a <strong>real, attributable data source</strong>, and every lift is a rolling-origin backtest result <em>with a confidence range</em> — not a point claim. Signals <strong>overlap, so they don't add linearly</strong>: the total applies a diminishing-returns discount. Three signals are <strong>live today</strong>; Q-Comm pulse and distributor sentiment are pending a 6-week integration — so the today number and the with-roadmap number are shown separately, never merged.</div>
        </div>

        <div class="action">
          <div class="action-lbl">Lock the signal configuration</div>
          <div class="action-text">Locking the signal set is a Demand-Planning decision — it configures which inputs feed the forecast. <em>Setup for the two pending signals is ~₹14L; integration kicks off Monday, validation runs weekly against actuals.</em> The resulting plan still goes to Friday's S&amp;OP to be committed.</div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="stackApprove()">◆ Lock signal configuration</button>
            <button class="btn btn-ghost" onclick="closeModal()">Discuss in S&amp;OP</button>
          </div>
        </div>
      </div>`
  },

  'dp-consensus': {
    eyebrow: '◆ Demand Planning · Align · Consensus workbook',
    title: 'Consensus workbook · <em>propose, guardrail, commit</em>',
    body: _kjRail('align') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Bottom-up planner overrides · reconciled against the system forecast</div>
            <div class="cell-head-title">Align the plan before S&amp;OP</div>
            <div class="cell-head-sub">Align/Commit · planners propose overrides, guardrails flag the big ones, and the locked version goes to Friday's S&amp;OP to be committed</div>
          </div>
          <span class="cell-tag brief">Align · Commit</span>
        </div>

        <div class="wb">
          <div class="wb-toolbar">
            <span style="font-size:11px;color:var(--t-2);font-weight:600">Hair Oils</span>
            <span style="font-size:10px;color:var(--t-3);font-family:var(--mono)">5 SKUs · weeks 1–4 shown of 12 · ₹3.43 Cr</span>
            <span style="flex:1"></span>
            <span style="font-size:9px;font-family:var(--mono);color:var(--t-4);letter-spacing:.06em">GUARDRAIL</span>
            <span class="wb-flag ok">within ±15%</span>
            <span class="wb-flag soft">±15–25% review</span>
            <span class="wb-flag hard">&gt;25% → S&amp;OP</span>
          </div>
          <div class="wb-cat">
            <div>SKU · Owner</div>
            <div style="text-align:right">System</div>
            <div style="text-align:right">Planner</div>
            <div style="text-align:right">Δ vs system</div>
            <div style="text-align:center">Guardrail</div>
            <div style="text-align:center"><span id="wbApprCount">3 / 4 approved</span></div>
          </div>
          <div id="wbBody">
            <div class="wb-row">
              <div><div class="wb-sku">HC_OIL_001 · Bajaj Almond Drops</div><div class="wb-sub">Bhiwandi DC · Online · Rajiv Menon</div></div>
              <div class="wb-num">2,400</div>
              <div class="wb-num">2,500</div>
              <div class="wb-num" style="color:var(--ok)">+4.2%</div>
              <div style="text-align:center"><span class="wb-flag ok">within</span></div>
              <div style="text-align:center"><button class="wb-appr yes" onclick="wbToggle(this)">✓</button></div>
            </div>
            <div class="wb-row">
              <div><div class="wb-sku">HC_OIL_002 · Parachute Coconut 200ml</div><div class="wb-sub">Bengaluru FC · Retail · Priya Sharma</div></div>
              <div class="wb-num">1,800</div>
              <div class="wb-num">2,100</div>
              <div class="wb-num" style="color:var(--wn)">+16.7%</div>
              <div style="text-align:center"><span class="wb-flag soft">review</span></div>
              <div style="text-align:center"><button class="wb-appr no" onclick="wbToggle(this)">○</button></div>
            </div>
            <div class="wb-row">
              <div><div class="wb-sku">HC_OIL_003 · Nihar Naturals Almond</div><div class="wb-sub">Kolkata CFA · B2B · Amit Kulkarni</div></div>
              <div class="wb-num">3,200</div>
              <div class="wb-num">4,150</div>
              <div class="wb-num" style="color:var(--er)">+29.7%</div>
              <div style="text-align:center"><span class="wb-flag hard">hard</span></div>
              <div style="text-align:center"><span class="wb-flag hard" title="Beyond ±25% — cannot be approved here">→ S&amp;OP</span></div>
            </div>
            <div class="wb-row">
              <div><div class="wb-sku">HC_OIL_004 · Parachute Adv. Jasmine</div><div class="wb-sub">Chennai RDC · Direct · Sneha Iyer</div></div>
              <div class="wb-num">1,600</div>
              <div class="wb-num">1,680</div>
              <div class="wb-num" style="color:var(--ok)">+5.0%</div>
              <div style="text-align:center"><span class="wb-flag ok">within</span></div>
              <div style="text-align:center"><button class="wb-appr yes" onclick="wbToggle(this)">✓</button></div>
            </div>
            <div class="wb-row">
              <div><div class="wb-sku">HC_OIL_005 · Hair&amp;Care Light Oil</div><div class="wb-sub">Hyderabad MWH · Online · Vivek Bansal</div></div>
              <div class="wb-num">2,100</div>
              <div class="wb-num">2,290</div>
              <div class="wb-num" style="color:var(--ok)">+9.0%</div>
              <div style="text-align:center"><span class="wb-flag ok">within</span></div>
              <div style="text-align:center"><button class="wb-appr yes" onclick="wbToggle(this)">✓</button></div>
            </div>
          </div>
        </div>

        <div style="font-size:11px;color:var(--t-3);font-family:var(--mono);padding:8px 12px;margin-bottom:12px;background:var(--bg-4);border:1px solid var(--border);border-radius:8px">
          + Shampoos · 1 SKU · 1/1 approved &nbsp;·&nbsp; + 6 more categories &nbsp;·&nbsp; <span style="color:var(--t-4)">condensed view — one category expanded, weeks 1–4 of 12</span>
        </div>

        <div class="insight">
          <div class="insight-lbl">How the guardrail works</div>
          <div class="insight-text">Guardrails compare each planner's override to the <strong>system forecast</strong>, not last year. Within ±15% a planner can approve directly; ±15–25% needs a second look; <strong>beyond ±25% it can't be approved here — it routes to S&amp;OP</strong> with the planner's rationale attached. <em>On the roadmap: override value-add per planner</em> — tracking whose overrides actually improve accuracy, which turns this grid into a coaching tool.</div>
        </div>

        <div class="action">
          <div class="action-lbl">Stage the consensus version</div>
          <div class="action-text">Lock the approved overrides into a consensus forecast version. <em>Out-of-guardrail items travel with their rationale.</em> Demand Planning stages it; Friday's S&amp;OP commits the final plan that supply then runs on.</div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="wbStage()">Stage consensus → S&amp;OP</button>
            <button class="btn btn-ghost" onclick="openCell('dp-brief')">Back to the canvas →</button>
          </div>
        </div>
      </div>`
  },

  /* ═══════════ INV · THE FLAGSHIP · EAST DEPOT SIMULATOR ═══════════ */
  'inv-brief': {
    eyebrow: '◆ Inventory Risk · Brief · Top 7 at-risk SKUs',
    title: 'Inventory Risk Tower',
    body: _kjRail('brief') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Live · 28 depots · 7/14/30 day horizons</div>
            <div class="cell-head-title">Seven SKUs at risk. <em>East Depot is first.</em></div>
          </div>
          <span class="cell-tag brief">Brief</span>
        </div>
        <div class="kpi-grid">
          <div class="kpi er"><div class="kpi-lbl">Exposure · 14d</div><div class="kpi-val er">₹7.7 Cr</div><div class="kpi-delta er">7 SKUs</div></div>
          <div class="kpi wn"><div class="kpi-lbl">SKUs Below Safety</div><div class="kpi-val wn">2</div><div class="kpi-delta wn">East · Atta + Soap</div></div>
          <div class="kpi ok"><div class="kpi-lbl">Auto-Replenishment</div><div class="kpi-val ok">94%</div><div class="kpi-delta ok">on plan</div></div>
          <div class="kpi inf"><div class="kpi-lbl">Transfers Possible</div><div class="kpi-val">5</div><div class="kpi-delta">covers 6 of 7 SKUs</div></div>
        </div>
        <div class="risk-table">
          <div class="risk-row header"><div>SKU · Depot</div><div style="text-align:right">Cover</div><div style="text-align:right">₹ exposure</div><div style="text-align:center">Status</div></div>
          <div class="risk-row" onclick="openCell('inv-why')"><div class="risk-row-left"><div class="risk-sku">Atta 5kg · East</div><div class="risk-loc">SKU A · Patna depot</div></div><div class="risk-val er">9 days</div><div class="risk-days">₹42 L</div><div class="risk-status er">URGENT</div></div>
          <div class="risk-row"><div class="risk-row-left"><div class="risk-sku">Atta 5kg · East</div><div class="risk-loc">SKU B · Kolkata depot</div></div><div class="risk-val er">11 days</div><div class="risk-days">₹38 L</div><div class="risk-status er">URGENT</div></div>
          <div class="risk-row"><div class="risk-row-left"><div class="risk-sku">Soap 100g · North</div><div class="risk-loc">SKU C · Delhi depot</div></div><div class="risk-val wn">12 days</div><div class="risk-days">₹28 L</div><div class="risk-status wn">WATCH</div></div>
          <div class="risk-row"><div class="risk-row-left"><div class="risk-sku">Noodles 70g · West</div><div class="risk-loc">SKU D · Mumbai depot</div></div><div class="risk-val wn">15 days</div><div class="risk-days">₹52 L</div><div class="risk-status wn">WATCH</div></div>
          <div class="risk-row"><div class="risk-row-left"><div class="risk-sku">Biscuit 200g · South</div><div class="risk-loc">SKU E · Bengaluru depot</div></div><div class="risk-val wn">18 days</div><div class="risk-days">₹35 L</div><div class="risk-status wn">WATCH</div></div>
          <div class="risk-row"><div class="risk-row-left"><div class="risk-sku">Atta 10kg · East</div><div class="risk-loc">SKU F · Bhubaneswar depot</div></div><div class="risk-val ok">19 days</div><div class="risk-days">₹22 L</div><div class="risk-status ok">PLAN</div></div>
          <div class="risk-row"><div class="risk-row-left"><div class="risk-sku">Oil 1L · West</div><div class="risk-loc">SKU G · Ahmedabad depot</div></div><div class="risk-val ok">20 days</div><div class="risk-days">₹18 L</div><div class="risk-status ok">PLAN</div></div>
        </div>
        <div class="action">
          <div class="action-lbl">Recommended next step</div>
          <div class="action-text">Click the top row — <strong>SKU A in East</strong> — to open the rebalancing simulator. <em>₹42L decided in 90 seconds.</em></div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="openCell('inv-why')">Open East Depot story →</button>
          </div>
        </div>
      </div>`
  },

  'inv-why': {
    eyebrow: '◆ Inventory Risk · Why · East Depot · SKU A',
    title: 'East Depot · the <em>₹42L story</em>',
    body: _kjRail('why') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Live · SKU A · Atta 5kg · Patna depot · ₹42L exposure · window closes 11 AM</div>
            <div class="cell-head-title">Why East goes dark in 9 days</div>
          </div>
          <span class="cell-tag why">Why</span>
        </div>
        <div class="stack">
          <div class="stack-head">
            <div class="stack-head-title">Contributors to the shortfall</div>
            <div class="stack-head-sub">−12,000 units · 100% explained</div>
          </div>
          <div class="stack-rows">
            <div class="stack-row">
              <div class="stack-row-lbl"><div class="stack-row-name">Sales velocity +31% (campaign)</div><div class="stack-row-src">DMS · East Region · regional festive push</div></div>
              <div class="stack-row-bar"><div class="stack-row-bar-fill" style="width:62%"></div></div>
              <div class="stack-row-val">+7,400 u</div>
            </div>
            <div class="stack-row">
              <div class="stack-row-lbl"><div class="stack-row-name">Replenishment lead time +3d</div><div class="stack-row-src">Plant 2 · capacity bottleneck week 22</div></div>
              <div class="stack-row-bar"><div class="stack-row-bar-fill" style="width:28%"></div></div>
              <div class="stack-row-val">+3,400 u</div>
            </div>
            <div class="stack-row">
              <div class="stack-row-lbl"><div class="stack-row-name">Safety stock at 60% of norm</div><div class="stack-row-src">WMS · East depot · structural</div></div>
              <div class="stack-row-bar"><div class="stack-row-bar-fill" style="width:10%"></div></div>
              <div class="stack-row-val">+1,200 u</div>
            </div>
          </div>
        </div>
        <div class="insight">
          <div class="insight-lbl">What's available · the West Depot option</div>
          <div class="insight-text"><strong>West Depot has 8,000 units of SKU A above safety norm.</strong> Velocity in West is on plan (no upside risk). Transit Mumbai → Patna: 45 min by air freight, ₹18,000 cost. <em>Net: ₹42L of revenue protected for ₹18K of transit.</em></div>
        </div>
        <div class="action">
          <div class="action-lbl">Recommended next step</div>
          <div class="action-text">Open the simulator. <em>One click. Sixty seconds.</em></div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="openCell('inv-signal')">Open the rebalancing simulator →</button>
          </div>
        </div>
      </div>`
  },

  'inv-signal': {
    eyebrow: '◆ Inventory Risk · Simulate · East Depot Rebalance',
    title: 'Rebalance simulator · <em>live</em>',
    body: _kjRail('signal') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Pick source · adjust quantity · approve · all numbers live</div>
            <div class="cell-head-title">Three sources. <em>One slider.</em> Every number updates in real time.</div>
          </div>
          <span class="cell-tag signal">Simulate</span>
        </div>

        <div class="scenarios">
          <button class="scn active" id="scnDefault" onclick="simScenario('default')">◆ Recommended</button>
          <button class="scn" onclick="simScenario('max')">⤴ Max coverage</button>
          <button class="scn" onclick="simScenario('min')">⤓ Min spend</button>
          <button class="scn" onclick="simScenario('nothing')">⊘ Do nothing</button>
        </div>

        <div class="sources">
          <button class="src active" data-src="west" onclick="simSource('west')">
            <div class="src-name">West Depot</div>
            <div class="src-meta">
              <div class="src-meta-cell"><div class="src-meta-val ok">8,000 u</div><div class="src-meta-lbl">surplus</div></div>
              <div class="src-meta-cell"><div class="src-meta-val">45 min</div><div class="src-meta-lbl">air transit</div></div>
            </div>
            <div class="src-foot"><span>Mumbai → Patna</span><span class="src-foot-cost">₹18K</span></div>
          </button>
          <button class="src" data-src="south" onclick="simSource('south')">
            <div class="src-name">South Depot</div>
            <div class="src-meta">
              <div class="src-meta-cell"><div class="src-meta-val wn">4,000 u</div><div class="src-meta-lbl">surplus</div></div>
              <div class="src-meta-cell"><div class="src-meta-val">90 min</div><div class="src-meta-lbl">air transit</div></div>
            </div>
            <div class="src-foot"><span>Bengaluru → Patna</span><span class="src-foot-cost">₹22K</span></div>
          </button>
          <button class="src" data-src="plant" onclick="simSource('plant')">
            <div class="src-name">Plant 2 (fresh)</div>
            <div class="src-meta">
              <div class="src-meta-cell"><div class="src-meta-val ok">12,000 u</div><div class="src-meta-lbl">batch ready</div></div>
              <div class="src-meta-cell"><div class="src-meta-val er">3 hr</div><div class="src-meta-lbl">road transit</div></div>
            </div>
            <div class="src-foot"><span>Kolkata plant → Patna</span><span class="src-foot-cost">₹38K</span></div>
          </button>
        </div>

        <div class="slider-card">
          <div class="slider-head">
            <div class="slider-lbl">Transfer quantity</div>
            <div class="slider-val"><span id="simQtyVal">8,000</span><em> units</em></div>
          </div>
          <input type="range" class="slider" id="simQty" min="0" max="8000" step="500" value="8000" oninput="simUpdate()"/>
          <div class="slider-marks"><span>0</span><span>2K</span><span>4K</span><span>6K</span><span id="simMax">8K</span></div>
        </div>

        <div class="sim">
          <div class="sim-flow">
            <div class="sim-node source">
              <div class="sim-node-icon">◔</div>
              <div class="sim-node-name" id="simSrcName">West Depot</div>
              <div class="sim-node-meta" id="simSrcMeta">Mumbai · MH · 42K on hand</div>
              <div class="sim-node-stat">
                <div class="sim-node-stat-cell"><div class="sim-node-stat-val ok" id="simSrcAvail">8K u</div><div class="sim-node-stat-lbl">available</div></div>
                <div class="sim-node-stat-cell"><div class="sim-node-stat-val" id="simSrcAfter">34K u</div><div class="sim-node-stat-lbl">after</div></div>
              </div>
            </div>
            <div class="sim-arrow">
              <div class="sim-arrow-line">→</div>
              <div class="sim-arrow-val" id="simArrowQty">8,000 units</div>
              <div class="sim-arrow-lbl" id="simArrowMode">Air · 45 min · ₹18K</div>
            </div>
            <div class="sim-node target">
              <div class="sim-node-icon">◑</div>
              <div class="sim-node-name">East Depot</div>
              <div class="sim-node-meta">Patna · BR · 14K on hand</div>
              <div class="sim-node-stat">
                <div class="sim-node-stat-cell"><div class="sim-node-stat-val er">9 days</div><div class="sim-node-stat-lbl">cover now</div></div>
                <div class="sim-node-stat-cell"><div class="sim-node-stat-val ok" id="simTgtAfter">22K u</div><div class="sim-node-stat-lbl">after</div></div>
              </div>
            </div>
          </div>
        </div>

        <div class="impact-strip">
          <div class="impact-cell" id="ic_cover"><div class="impact-cell-lbl">East cover · after</div><div class="impact-cell-val ok" id="simCover">15 days</div><div class="impact-cell-delta">+6 days</div></div>
          <div class="impact-cell" id="ic_fill"><div class="impact-cell-lbl">Fill rate · projected</div><div class="impact-cell-val ok" id="simFill">94%</div><div class="impact-cell-delta">+12 pts</div></div>
          <div class="impact-cell" id="ic_rs"><div class="impact-cell-lbl">Revenue protected</div><div class="impact-cell-val ok" id="simRupees">₹42 L</div><div class="impact-cell-delta">in 9-day window</div></div>
          <div class="impact-cell" id="ic_cost"><div class="impact-cell-lbl">Transit cost</div><div class="impact-cell-val wn" id="simCost">₹18 K</div><div class="impact-cell-delta" id="simCostDelta">air freight</div></div>
          <div class="impact-cell" id="ic_roi"><div class="impact-cell-lbl">ROI · cost vs ₹ saved</div><div class="impact-cell-val ok" id="simROI">233×</div><div class="impact-cell-delta">net positive</div></div>
        </div>

        <div class="insight">
          <div class="insight-lbl">The system has pre-staged everything</div>
          <div class="insight-text"><strong>1 · Driver lined up</strong> (BlueDart, slot 11:30 AM). <strong>2 · WMS pre-staged</strong> (units pulled to outbound). <strong>3 · ASN drafted</strong> (auto-sent on approval). <strong>4 · East depot notified</strong> (inbound dock booked 14:15). <em>You approve. Everything else is wired.</em></div>
        </div>

        <div class="action">
          <div class="action-lbl">Approve transfer</div>
          <div class="action-text">Adjust the slider or source above. <em>Approval routes to Rajiv Kumar, copy to Vikram Mehta.</em></div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="simApprove()">◆ Approve transfer</button>
            <button class="btn btn-ghost" onclick="openCell('inv-why')">← Back to story</button>
            <button class="btn btn-ghost" onclick="closeModal()">Discuss with team</button>
          </div>
        </div>

        <div class="dispatch" id="simDispatch">
          <div class="dispatch-head">
            <div class="dispatch-head-icon">✓</div>
            <div class="dispatch-head-text">
              <div class="dispatch-head-title">Approved · dispatch in progress</div>
              <div class="dispatch-head-sub" id="simDispatchSub">8,000 units · West → East · ETA 14:15 IST</div>
            </div>
          </div>
          <div class="dispatch-timeline">
            <div class="dispatch-step done"><div class="dispatch-step-dot">✓</div><div class="dispatch-step-name">Approved</div><div class="dispatch-step-time">now</div></div>
            <div class="dispatch-step done" style="transition-delay:.6s"><div class="dispatch-step-dot">✓</div><div class="dispatch-step-name">Driver assigned</div><div class="dispatch-step-time">+2 min</div></div>
            <div class="dispatch-step active" id="dispatch3"><div class="dispatch-step-dot">◔</div><div class="dispatch-step-name">In transit</div><div class="dispatch-step-time">11:30 IST</div></div>
            <div class="dispatch-step" id="dispatch4"><div class="dispatch-step-dot">○</div><div class="dispatch-step-name">Arrived East</div><div class="dispatch-step-time">14:15 IST</div></div>
          </div>
        </div>
      </div>`
  },

  /* ═══════════ Q-COMM ═══════════ */
  'qcomm-brief': {
    eyebrow: '◆ Q-Commerce Pulse · Brief · Live SLA',
    title: 'Q-Comm Fill-Rate Pulse',
    body: _kjRail('brief') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Live · 4 platforms · 24 dark stores · refreshed every 30 min</div>
            <div class="cell-head-title">Blinkit is in the penalty zone</div>
          </div>
          <span class="cell-tag brief">Brief</span>
        </div>
        <div class="kpi-grid">
          <div class="kpi er"><div class="kpi-lbl">Blinkit Fill</div><div class="kpi-val er">87%</div><div class="kpi-delta er">−2pt below penalty line</div></div>
          <div class="kpi wn"><div class="kpi-lbl">Zepto Fill</div><div class="kpi-val wn">89%</div><div class="kpi-delta wn">−6pt below SLA</div></div>
          <div class="kpi wn"><div class="kpi-lbl">Instamart Fill</div><div class="kpi-val wn">93%</div><div class="kpi-delta wn">−2pt below SLA</div></div>
          <div class="kpi ok"><div class="kpi-lbl">BigBasket Fill</div><div class="kpi-val ok">96%</div><div class="kpi-delta ok">on SLA</div></div>
          <div class="kpi er"><div class="kpi-lbl">SKUs in Red</div><div class="kpi-val er">3</div><div class="kpi-delta er">Noodles · Atta · Soap</div></div>
          <div class="kpi wn"><div class="kpi-lbl">Hours to Penalty</div><div class="kpi-val wn">18 hrs</div><div class="kpi-delta wn">Blinkit · 85% line</div></div>
        </div>
        <div class="insight">
          <div class="insight-lbl">What changed in the last 6 hours</div>
          <div class="insight-text">A <strong>6 PM marketing push</strong> moved Noodles velocity +37% on Blinkit. Dark-store cover dropped 36h → 14h. <em>Without intervention, we cross 85% and trigger penalty band in 18 hours.</em></div>
        </div>
        <div class="action">
          <div class="action-lbl">Recommended next step</div>
          <div class="action-text">Approve <strong>8K-unit transfer to Blinkit dark stores</strong> (₹3L expedite). SLA holds. Penalty avoided.</div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="openCell('qcomm-why')">See the Noodles story →</button>
            <button class="btn btn-ghost" onclick="openCell('qcomm-signal')">Dark-store heatmap →</button>
          </div>
        </div>
      </div>`
  },

  'qcomm-why': {
    eyebrow: '◆ Q-Comm · Why · Noodles · Blinkit',
    title: 'Marketing pushed. <em>Pull spiked +37%.</em>',
    body: _kjRail('why') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Live · Noodles 70g · Blinkit · last 6 hours</div>
            <div class="cell-head-title">A predictable spike. We were ready 90 minutes ago.</div>
          </div>
          <span class="cell-tag why">Why</span>
        </div>
        <div class="insight">
          <div class="insight-lbl">The story · 4 events</div>
          <div class="insight-text"><strong>17:55</strong> — Marketing pushed Noodles flash offer to Blinkit homepage. <em>System detected campaign in marketing calendar.</em><br/><strong>18:14</strong> — Blinkit pull moved from 240 u/hr baseline to 328 u/hr (+37%). <em>System logged velocity spike.</em><br/><strong>18:18</strong> — Cover at 5 of 8 affected dark stores dropped below 24h. <em>System surfaced as warn.</em><br/><strong>18:20</strong> — System drafted 8K-unit transfer from CFA Mumbai to 5 dark stores. <em>Awaiting your approval.</em></div>
        </div>
        <div class="kpi-grid">
          <div class="kpi er"><div class="kpi-lbl">Cover · before</div><div class="kpi-val er">14 hrs</div><div class="kpi-delta er">vs 36h baseline</div></div>
          <div class="kpi ok"><div class="kpi-lbl">Cover · after transfer</div><div class="kpi-val ok">42 hrs</div><div class="kpi-delta ok">SLA protected</div></div>
          <div class="kpi inf"><div class="kpi-lbl">Penalty avoided</div><div class="kpi-val">₹8 L</div><div class="kpi-delta">vs ₹3L expedite cost</div></div>
        </div>
        <div class="action">
          <div class="action-lbl">Approve transfer</div>
          <div class="action-text">8,000 units · CFA Mumbai → 5 Blinkit dark stores · ₹3L expedite · ₹8L penalty avoided. <em>Net upside: ₹5L + SLA protected.</em></div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="approveAction('Noodles transfer approved · 5 dark stores')">◆ Approve transfer</button>
            <button class="btn btn-ghost" onclick="openCell('qcomm-signal')">See dark-store heatmap →</button>
          </div>
        </div>
      </div>`
  },

  'qcomm-signal': {
    eyebrow: '◆ Q-Comm · Signal · Live Rerouting Simulator',
    title: 'Dark-store rerouting · <em>live simulator</em>',
    body: _kjRail('signal') + `
      <div class="cell">
        <div class="cell-head">
          <div class="cell-head-text">
            <div class="cell-head-eyebrow">▴ Pick aggressiveness · click any store · allocate refill · watch the network heal</div>
            <div class="cell-head-title">24 dark stores. <em>Predictive rerouting in motion.</em></div>
            <div class="cell-head-sub">Flip from Off to Aggressive and watch red stores recover · every metric live</div>
          </div>
          <span class="cell-tag signal">Signal</span>
        </div>

        <div class="modes">
          <button class="mode-btn" data-mode="off" onclick="qcMode('off')">
            <div class="mode-btn-head"><div class="mode-btn-name">Off</div><div class="mode-btn-dot"></div></div>
            <div class="mode-btn-sub">No rerouting · pure local fulfillment</div>
          </button>
          <button class="mode-btn" data-mode="conservative" onclick="qcMode('conservative')">
            <div class="mode-btn-head"><div class="mode-btn-name">Conservative</div><div class="mode-btn-dot"></div></div>
            <div class="mode-btn-sub">Reroute within 5 km · low ops cost</div>
          </button>
          <button class="mode-btn active" data-mode="standard" onclick="qcMode('standard')">
            <div class="mode-btn-head"><div class="mode-btn-name">Standard</div><div class="mode-btn-dot"></div></div>
            <div class="mode-btn-sub">Reroute within 8 km · default</div>
          </button>
          <button class="mode-btn" data-mode="aggressive" onclick="qcMode('aggressive')">
            <div class="mode-btn-head"><div class="mode-btn-name">Aggressive</div><div class="mode-btn-dot"></div></div>
            <div class="mode-btn-sub">Reroute within 12 km · max fill</div>
          </button>
        </div>

        <div class="qmap-card">
          <div class="qmap-head">
            <div class="qmap-title">Mumbai network · <em id="qmapModeLbl">Standard mode</em></div>
            <div class="qmap-sub" id="qmapSub">4 platforms · 24 dark stores · click any to drill in</div>
          </div>
          <svg class="qmap-svg" id="qmapSvg" viewBox="0 0 760 380" preserveAspectRatio="xMidYMid meet">
            <!-- atmosphere grid -->
            <defs>
              <pattern id="qgrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a1a22" stroke-width="0.5"/>
              </pattern>
              <radialGradient id="hr_er"><stop offset="0%" stop-color="#f87171" stop-opacity=".45"/><stop offset="100%" stop-color="#f87171" stop-opacity="0"/></radialGradient>
              <radialGradient id="hr_wn"><stop offset="0%" stop-color="#fbbf24" stop-opacity=".4"/><stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/></radialGradient>
              <radialGradient id="hr_ok"><stop offset="0%" stop-color="#86efac" stop-opacity=".30"/><stop offset="100%" stop-color="#86efac" stop-opacity="0"/></radialGradient>
            </defs>
            <rect width="760" height="380" fill="url(#qgrid)"/>

            <!-- Platform cluster labels -->
            <text x="140" y="34" font-family="Geist Mono" font-size="10" fill="#5d5d68" letter-spacing="1.4" font-weight="700">◆ BLINKIT · WEST</text>
            <text x="540" y="34" font-family="Geist Mono" font-size="10" fill="#5d5d68" letter-spacing="1.4" font-weight="700">◆ ZEPTO · NORTH</text>
            <text x="140" y="220" font-family="Geist Mono" font-size="10" fill="#5d5d68" letter-spacing="1.4" font-weight="700">◆ INSTAMART · SOUTH</text>
            <text x="540" y="220" font-family="Geist Mono" font-size="10" fill="#5d5d68" letter-spacing="1.4" font-weight="700">◆ BIGBASKET · CENTRAL</text>

            <!-- Cluster dividers -->
            <line x1="380" y1="20" x2="380" y2="360" stroke="#23232c" stroke-dasharray="2,4" opacity=".4"/>
            <line x1="20" y1="190" x2="740" y2="190" stroke="#23232c" stroke-dasharray="2,4" opacity=".4"/>

            <!-- Rerouting paths layer (populated by JS) -->
            <g id="qmapPaths"></g>

            <!-- Order pulse layer -->
            <g id="qmapPulses"></g>

            <!-- Store nodes (populated by JS) -->
            <g id="qmapStores"></g>
          </svg>
        </div>

        <div class="sim-controls">
          <div class="sim-controls-left">
            <div class="sim-status"><span class="sim-status-dot" id="simDot"></span><span id="simStatusText">Simulation running · 0.5× speed</span></div>
            <button class="sim-play" id="simPlayBtn" onclick="qcPlayToggle()">⏸ Pause</button>
          </div>
          <div class="sim-clock"><span id="simClock">00:00</span> elapsed</div>
        </div>

        <div class="metrics-strip" id="metricsStrip">
          <div class="metric er running" id="m_fill"><span class="metric-tick"></span>
            <div class="metric-lbl">Network fill</div>
            <div class="metric-val er" id="mv_fill">88%</div>
            <div class="metric-delta">SLA 95% · −7pt</div>
          </div>
          <div class="metric ok running" id="m_orders"><span class="metric-tick"></span>
            <div class="metric-lbl">Orders / min</div>
            <div class="metric-val ok" id="mv_orders">42</div>
            <div class="metric-delta">Mumbai network</div>
          </div>
          <div class="metric wn running" id="m_reroutes"><span class="metric-tick"></span>
            <div class="metric-lbl">Reroutes · 60s</div>
            <div class="metric-val wn" id="mv_reroutes">7</div>
            <div class="metric-delta">avg 8 km hop</div>
          </div>
          <div class="metric er running" id="m_lost"><span class="metric-tick"></span>
            <div class="metric-lbl">Lost · 60s</div>
            <div class="metric-val er" id="mv_lost">3</div>
            <div class="metric-delta">customers waited</div>
          </div>
          <div class="metric wn running" id="m_penalty"><span class="metric-tick"></span>
            <div class="metric-lbl">Penalty risk</div>
            <div class="metric-val wn" id="mv_penalty">₹2.4 L</div>
            <div class="metric-delta">Blinkit · 18h</div>
          </div>
        </div>

        <div class="store-detail" id="storeDetail">
          <!-- populated on store click -->
        </div>

        <div class="refill-card">
          <div class="refill-head">
            <div class="refill-title">Express refill · <em>your CFA, your call</em></div>
            <div class="refill-meta">Pool from CFA Mumbai · live</div>
          </div>
          <div class="refill-pool">
            <div class="refill-pool-lbl">CFA pool used</div>
            <div class="refill-pool-bar"><div class="refill-pool-bar-fill" id="refillPoolFill" style="width:0%"></div></div>
            <div class="refill-pool-val"><span id="refillUsed">0</span> / 8,000 u</div>
          </div>
          <div class="refill-stores">
            <div class="refill-store-row">
              <div class="refill-store-name"><div class="refill-store-name-title">DS-01 · Blinkit · Andheri W</div><div class="refill-store-name-sub">3 SKUs red · 14h cover</div></div>
              <div class="refill-store-slider"><input type="range" class="slider" min="0" max="3000" step="250" value="0" oninput="refillAdjust('s1', this.value)"/></div>
              <div class="refill-store-val" id="refillVal_s1">0 u</div>
            </div>
            <div class="refill-store-row">
              <div class="refill-store-name"><div class="refill-store-name-title">DS-09 · Zepto · Bandra E</div><div class="refill-store-name-sub">2 SKUs red · 16h cover</div></div>
              <div class="refill-store-slider"><input type="range" class="slider" min="0" max="3000" step="250" value="0" oninput="refillAdjust('s9', this.value)"/></div>
              <div class="refill-store-val" id="refillVal_s9">0 u</div>
            </div>
            <div class="refill-store-row">
              <div class="refill-store-name"><div class="refill-store-name-title">DS-17 · Instamart · Dadar</div><div class="refill-store-name-sub">1 SKU red · 18h cover</div></div>
              <div class="refill-store-slider"><input type="range" class="slider" min="0" max="3000" step="250" value="0" oninput="refillAdjust('s17', this.value)"/></div>
              <div class="refill-store-val" id="refillVal_s17">0 u</div>
            </div>
          </div>
        </div>

        <div class="insight">
          <div class="insight-lbl">What's happening under the hood</div>
          <div class="insight-text"><strong>Rerouting buys you SLA in real time</strong> — orders silently redirect to next-nearest stores within radius, so customers never see a failed search. <em>Express refill solves the root cause.</em> Net cost of the simulator's current recommended setup: ₹3L expedite vs ₹8L penalty avoided. <strong>Net upside: ₹5L plus SLA protected.</strong></div>
        </div>

        <div class="action">
          <div class="action-lbl">Approve current configuration</div>
          <div class="action-text">Lock in mode + refill allocations. <em>Routing engine deploys instantly · CFA dispatch in 15 minutes.</em></div>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="qcApprove()">◆ Deploy configuration</button>
            <button class="btn btn-ghost" onclick="openCell('qcomm-why')">← Back to the why</button>
            <button class="btn btn-ghost" onclick="closeModal()">Discuss with team</button>
          </div>
        </div>
      </div>`
  },

  /* ═══════════ ASK cells (lightweight · open the floating widget) ═══════════ */
  'csco-ask': { eyebrow:'◆ CSCO · Ask CalvinBall', title:'Ask anything', body: _kjRail('ask') + `<div class="cell"><div class="insight"><div class="insight-lbl">Ready</div><div class="insight-text">The Ask widget is opening. <em>Try voice or text.</em></div></div></div>` },
  'dp-ask':   { eyebrow:'◆ Demand Planning · Ask CalvinBall', title:'Ask anything', body: _kjRail('ask') + `<div class="cell"><div class="insight"><div class="insight-lbl">Ready</div><div class="insight-text">Try "what changes if I drop East 10%?"</div></div></div>` },
  'inv-ask':  { eyebrow:'◆ Inventory · Ask CalvinBall', title:'Ask anything', body: _kjRail('ask') + `<div class="cell"><div class="insight"><div class="insight-lbl">Ready</div><div class="insight-text">Try "Which depots are systematically hot?"</div></div></div>` },
  'qcomm-ask':{ eyebrow:'◆ Q-Comm · Ask CalvinBall', title:'Ask anything', body: _kjRail('ask') + `<div class="cell"><div class="insight"><div class="insight-lbl">Ready</div><div class="insight-text">Try "Where can I sell more if we had stock?"</div></div></div>` },
};

(window as any).currentCellPersona = currentCellPersona;
export { CELLS, _kjRail };
