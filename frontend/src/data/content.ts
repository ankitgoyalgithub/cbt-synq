// @ts-nocheck
/* Hero tiles + library content — ported verbatim from v0.9. */
/* eslint-disable */
const HERO_TILES: any = {};

const _csco_tiles = `
<div class="tiles-head">
  <div class="tiles-head-title">Your three decisions <em>this morning</em></div>
  <div class="tiles-head-sub">Each tile · click to open · 90 seconds end-to-end</div>
</div>
<div class="tiles">

  <!-- TILE 1 · BRIEF -->
  <button class="tile" onclick="openCell('csco-brief')">
    <div class="tile-hero">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="csco_g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c3aed"/><stop offset="55%" stop-color="#5b21b6"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient>
          <radialGradient id="csco_r1" cx="60%" cy="40%" r="55%"><stop offset="0%" stop-color="#c084fc" stop-opacity=".5"/><stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="400" height="240" fill="url(#csco_g1)"/>
        <circle cx="240" cy="100" r="140" fill="url(#csco_r1)"/>
        <!-- 6 plants -->
        <g opacity=".95">
          <circle cx="60" cy="70" r="6" fill="#86efac"/><text x="60" y="55" font-family="Geist Mono" font-size="8" fill="#86efac" text-anchor="middle">PLANT 1</text>
          <circle cx="60" cy="120" r="6" fill="#86efac"/><text x="60" y="105" font-family="Geist Mono" font-size="8" fill="#86efac" text-anchor="middle">PLANT 2</text>
          <circle cx="60" cy="170" r="6" fill="#fbbf24"/><text x="60" y="155" font-family="Geist Mono" font-size="8" fill="#fbbf24" text-anchor="middle">PLANT 3</text>
        </g>
        <!-- depot dots -->
        <g opacity=".85">
          <circle cx="160" cy="50" r="3" fill="#86efac"/><circle cx="180" cy="80" r="3" fill="#86efac"/><circle cx="170" cy="110" r="3" fill="#fbbf24"/>
          <circle cx="190" cy="140" r="3" fill="#86efac"/><circle cx="150" cy="170" r="3" fill="#f87171"/><circle cx="200" cy="190" r="3" fill="#86efac"/>
          <circle cx="220" cy="50" r="3" fill="#86efac"/><circle cx="250" cy="75" r="3" fill="#86efac"/><circle cx="240" cy="115" r="3" fill="#86efac"/>
          <circle cx="270" cy="140" r="3" fill="#fbbf24"/><circle cx="220" cy="170" r="3" fill="#f87171"/><circle cx="280" cy="190" r="3" fill="#86efac"/>
          <circle cx="320" cy="60" r="3" fill="#86efac"/><circle cx="340" cy="100" r="3" fill="#86efac"/><circle cx="330" cy="140" r="3" fill="#86efac"/>
          <circle cx="350" cy="175" r="3" fill="#fbbf24"/>
        </g>
        <!-- flow lines -->
        <g stroke="rgba(192,132,252,.35)" stroke-width="1" fill="none">
          <path d="M 66 70 Q 110 70 160 50" stroke-dasharray="2,2"/>
          <path d="M 66 120 Q 110 100 170 110" stroke-dasharray="2,2"/>
          <path d="M 66 170 Q 120 170 220 170" stroke="rgba(248,113,113,.5)"/>
        </g>
      </svg>
      <div class="tile-hero-overlay"></div>
      <div class="tile-tags">
        <span class="tile-tag brief">◐ Brief</span>
        <span class="tile-tag">Network</span>
      </div>
      <div class="tile-stamp">
        <div class="tile-stamp-eyebrow">▴ The CSCO opens this Wednesday at 06:30</div>
        <div class="tile-stamp-headline">Six plants. Twenty-eight depots.<br/><em>Three things changed.</em></div>
      </div>
    </div>
    <div class="tile-body">
      <h3 class="tile-title">The CSCO Wednesday Canvas</h3>
      <p class="tile-desc"><strong>Replaces the weekly review deck.</strong> Service level · fill rate · inventory health · revenue at risk on one canvas, refreshed every 4 hours from SAP, DMS, and live Q-Comm feeds. <strong>You are informed by insight, not by reporting.</strong></p>
      <div class="tile-foot">
        <div class="tile-foot-kpi">
          <div class="tile-foot-kpi-val ok"><span class="live-dot"></span> 6 plants live</div>
          <div class="tile-foot-kpi-lbl">8s generation · refresh every 4h</div>
        </div>
        <span class="tile-foot-cta">Open canvas →</span>
      </div>
    </div>
  </button>

  <!-- TILE 2 · WHY -->
  <button class="tile" onclick="openCell('csco-why')">
    <div class="tile-hero">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="csco_g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#991b1b"/><stop offset="60%" stop-color="#7f1d1d"/><stop offset="100%" stop-color="#450a0a"/></linearGradient>
          <radialGradient id="csco_r2" cx="30%" cy="40%" r="55%"><stop offset="0%" stop-color="#fda4af" stop-opacity=".5"/><stop offset="100%" stop-color="#991b1b" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="400" height="240" fill="url(#csco_g2)"/>
        <circle cx="120" cy="100" r="120" fill="url(#csco_r2)"/>
        <!-- waterfall: ₹10.1Cr decomposed -->
        <g>
          <rect x="40" y="50" width="56" height="140" fill="#fda4af" opacity=".55"/>
          <text x="68" y="40" font-family="Geist Mono" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">₹10.1Cr</text>
          <text x="68" y="205" font-family="Geist Mono" font-size="8" fill="#fbcfe8" text-anchor="middle" letter-spacing="1">TOTAL</text>
          <rect x="110" y="80" width="56" height="50" fill="#fda4af" opacity=".85"/>
          <text x="138" y="72" font-family="Geist Mono" font-size="11" font-weight="700" fill="#fda4af" text-anchor="middle">₹2.4Cr</text>
          <text x="138" y="205" font-family="Geist Mono" font-size="8" fill="#fbcfe8" text-anchor="middle" letter-spacing="1">DEMAND MISS</text>
          <rect x="180" y="105" width="56" height="38" fill="#fda4af" opacity=".75"/>
          <text x="208" y="97" font-family="Geist Mono" font-size="11" font-weight="700" fill="#fda4af" text-anchor="middle">₹3.4Cr</text>
          <text x="208" y="205" font-family="Geist Mono" font-size="8" fill="#fbcfe8" text-anchor="middle" letter-spacing="1">STOCKOUT</text>
          <rect x="250" y="125" width="56" height="22" fill="#fda4af" opacity=".7"/>
          <text x="278" y="117" font-family="Geist Mono" font-size="11" font-weight="700" fill="#fda4af" text-anchor="middle">₹4.3Cr</text>
          <text x="278" y="205" font-family="Geist Mono" font-size="8" fill="#fbcfe8" text-anchor="middle" letter-spacing="1">CREDIT HOLD</text>
          <rect x="320" y="50" width="56" height="140" fill="#86efac" opacity=".55"/>
          <text x="348" y="40" font-family="Geist Mono" font-size="9" fill="#86efac" text-anchor="middle" font-weight="700">₹6.3Cr</text>
          <text x="348" y="205" font-family="Geist Mono" font-size="8" fill="#bbf7d0" text-anchor="middle" letter-spacing="1">RECOVERABLE</text>
        </g>
      </svg>
      <div class="tile-hero-overlay"></div>
      <div class="tile-tags">
        <span class="tile-tag why">◎ Why</span>
        <span class="tile-tag">₹ Decomposed</span>
      </div>
      <div class="tile-stamp">
        <div class="tile-stamp-eyebrow">▴ Live · 30-day forward window</div>
        <div class="tile-stamp-headline">₹10.1 Cr at risk.<br/><em>62% recoverable in 7 days.</em></div>
      </div>
    </div>
    <div class="tile-body">
      <h3 class="tile-title">Why is the ₹ at risk?</h3>
      <p class="tile-desc">When ₹ moves, ask <em>why</em>. The Why module decomposes <strong>₹10.1Cr</strong> into ranked causes — each backed by a different data source. <strong>Recovery ceiling named honestly:</strong> ₹6.3Cr in 7 days on existing budget, the rest needs Q2 plan changes.</p>
      <div class="tile-foot">
        <div class="tile-foot-kpi">
          <div class="tile-foot-kpi-val ok">₹6.3 Cr</div>
          <div class="tile-foot-kpi-lbl">recoverable · 7d · existing budget</div>
        </div>
        <span class="tile-foot-cta">Decompose →</span>
      </div>
    </div>
  </button>

  <!-- TILE 3 · SIGNAL -->
  <button class="tile" onclick="openCell('csco-signal')">
    <div class="tile-hero">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="csco_g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="60%" stop-color="#1e1b4b"/><stop offset="100%" stop-color="#0c0a1f"/></linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#csco_g3)"/>
        <!-- timeline base -->
        <g stroke="#a5b4fc" stroke-width="1" fill="none" opacity=".35">
          <line x1="40" y1="170" x2="360" y2="170"/>
          <line x1="40" y1="165" x2="40" y2="175"/>
          <line x1="120" y1="165" x2="120" y2="175"/>
          <line x1="200" y1="165" x2="200" y2="175"/>
          <line x1="280" y1="165" x2="280" y2="175"/>
          <line x1="360" y1="165" x2="360" y2="175"/>
        </g>
        <line x1="40" y1="40" x2="40" y2="170" stroke="#c084fc" stroke-dasharray="3,3" opacity=".7"/>
        <text x="40" y="30" font-family="Geist Mono" font-size="9" fill="#c084fc" text-anchor="middle" font-weight="700">TODAY</text>
        <!-- events -->
        <g>
          <circle cx="120" cy="100" r="22" fill="#fcd34d" opacity=".2"/><circle cx="120" cy="100" r="11" fill="#fcd34d"/>
          <line x1="120" y1="111" x2="120" y2="170" stroke="#fcd34d" stroke-dasharray="2,2" opacity=".55"/>
          <text x="120" y="82" font-family="Geist Mono" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Monsoon</text>
          <text x="120" y="70" font-family="Geist Mono" font-size="9" fill="#fcd34d" text-anchor="middle" font-weight="700">+14 DAYS</text>

          <circle cx="240" cy="80" r="18" fill="#c084fc" opacity=".22"/><circle cx="240" cy="80" r="9" fill="#c084fc"/>
          <line x1="240" y1="89" x2="240" y2="170" stroke="#c084fc" stroke-dasharray="2,2" opacity=".5"/>
          <text x="240" y="62" font-family="Geist Mono" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Diwali prep</text>
          <text x="240" y="50" font-family="Geist Mono" font-size="9" fill="#c084fc" text-anchor="middle" font-weight="700">+95 DAYS</text>

          <circle cx="320" cy="120" r="14" fill="#86efac" opacity=".22"/><circle cx="320" cy="120" r="6" fill="#86efac"/>
          <text x="320" y="104" font-family="Geist Mono" font-size="10" font-weight="600" fill="#fff" text-anchor="middle">Q-Comm BBD</text>
        </g>
        <text x="40" y="195" font-family="Geist Mono" font-size="8" letter-spacing="1.2" fill="#a5b4fc" font-weight="700" opacity=".75">MAY</text>
        <text x="120" y="195" font-family="Geist Mono" font-size="8" letter-spacing="1.2" fill="#a5b4fc" font-weight="700" opacity=".75">JUN</text>
        <text x="200" y="195" font-family="Geist Mono" font-size="8" letter-spacing="1.2" fill="#a5b4fc" font-weight="700" opacity=".75">AUG</text>
        <text x="280" y="195" font-family="Geist Mono" font-size="8" letter-spacing="1.2" fill="#a5b4fc" font-weight="700" opacity=".75">OCT</text>
      </svg>
      <div class="tile-hero-overlay"></div>
      <div class="tile-tags">
        <span class="tile-tag signal">◭ Signal</span>
        <span class="tile-tag">Forward</span>
      </div>
      <div class="tile-stamp">
        <div class="tile-stamp-eyebrow">▴ Forward · 120 days of supply moments</div>
        <div class="tile-stamp-headline">Monsoon. Diwali. BBD.<br/><em>Lock the playbook now.</em></div>
      </div>
    </div>
    <div class="tile-body">
      <h3 class="tile-title">Event radar · what's coming</h3>
      <p class="tile-desc">Every supply moment, 120 days forward. <strong>Monsoon hits in 14 days.</strong> Each event has lead-time alerts, prep thresholds, and last-year lessons loaded. <em>One event win pays for the platform.</em></p>
      <div class="tile-foot">
        <div class="tile-foot-kpi">
          <div class="tile-foot-kpi-val wn">+14 days</div>
          <div class="tile-foot-kpi-lbl">Monsoon prep · 3 events live</div>
        </div>
        <span class="tile-foot-cta">Open radar →</span>
      </div>
    </div>
  </button>
</div>
`;
HERO_TILES.csco = _csco_tiles;

const _dp_tiles = `
<div class="tiles-head">
  <div class="tiles-head-title">Your three decisions <em>this morning</em></div>
  <div class="tiles-head-sub">One choice each — staged for Friday's S&amp;OP · click to decide</div>
</div>
<div class="dtiles">

  <button class="dtile" onclick="openCell('dp-brief')">
    <div class="dtile-top"><span class="dtile-tag brief">◐ Sense · Brief</span><div class="dtile-metric wn">4</div></div>
    <div class="dtile-title">Four exceptions need your eye</div>
    <div class="dtile-desc">Twelve SKUs moved overnight; the model cleared eight and flagged four. Whatever you stage here is what Friday's S&amp;OP sees.</div>
    <div class="dtile-call"><span class="dtile-call-lbl">Your call</span><span class="dtile-call-opts"><b>Diagnose the four</b> <i>or</i> accept the model's read</span></div>
    <div class="dtile-foot"><div class="dtile-foot-kpi">68% acc · 82% backtested</div><span class="dtile-cta">Open the brief →</span></div>
  </button>

  <button class="dtile" onclick="openCell('dp-why')">
    <div class="dtile-top"><span class="dtile-tag why">◎ Diagnose · Variance</span><div class="dtile-metric er">−24<em>%</em></div></div>
    <div class="dtile-title">East Atta is running under forecast</div>
    <div class="dtile-desc">Distributor offtake explains ~46% of the gap; 18% is still unexplained, and competitor pricing has no live feed. The correction feeds Friday's plan.</div>
    <div class="dtile-call"><span class="dtile-call-lbl">Your call</span><span class="dtile-call-opts"><b>Cut the forecast</b> <i>or</i> hold a week</span></div>
    <div class="dtile-foot"><div class="dtile-foot-kpi">≈ ₹1.2 Cr exposure · 3 DCs</div><span class="dtile-cta">See the drivers →</span></div>
  </button>

  <button class="dtile" onclick="openCell('dp-signal')">
    <div class="dtile-top"><span class="dtile-tag signal">◭ Model · Signals</span><div class="dtile-metric ok">+3<em>pts</em></div></div>
    <div class="dtile-title">Lock the model, or wait for more?</div>
    <div class="dtile-desc">Distributor + weather signals are live and backtested at <strong>69%</strong>. Q-commerce offtake + sentiment add ~3 pts, but need a 6-week integration.</div>
    <div class="dtile-call"><span class="dtile-call-lbl">Your call</span><span class="dtile-call-opts"><b>Lock 69% live</b> <i>or</i> wait for 72%</span></div>
    <div class="dtile-foot"><div class="dtile-foot-kpi">18-mo backtest · payback ~6 mo</div><span class="dtile-cta">Review the lift →</span></div>
  </button>

</div>`;
HERO_TILES.dp = _dp_tiles;

const _inv_tiles = `
<div class="tiles-head">
  <div class="tiles-head-title">Your seven SKUs <em>at risk</em></div>
  <div class="tiles-head-sub">East Depot is the urgent one · decided by 11 AM</div>
</div>
<div class="tiles">

  <!-- INV · BRIEF -->
  <button class="tile" onclick="openCell('inv-brief')">
    <div class="tile-hero">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="inv_g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c2d12"/><stop offset="60%" stop-color="#450a0a"/><stop offset="100%" stop-color="#1c0701"/></linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#inv_g1)"/>
        <!-- Days of cover bars -->
        <g transform="translate(40, 50)">
          <text x="0" y="-10" font-family="Geist Mono" font-size="10" fill="#fda4af" letter-spacing="1.2" font-weight="700">DAYS OF COVER · TOP 7</text>
          <g>
            <text x="0" y="14" font-family="Geist Mono" font-size="9" fill="#fff">SKU A · East</text>
            <rect x="100" y="6" width="36" height="10" fill="#f87171"/>
            <text x="142" y="14" font-family="Geist Mono" font-size="9" fill="#fda4af">9d</text>

            <text x="0" y="32" font-family="Geist Mono" font-size="9" fill="#fff">SKU B · East</text>
            <rect x="100" y="24" width="44" height="10" fill="#f87171"/>
            <text x="150" y="32" font-family="Geist Mono" font-size="9" fill="#fda4af">11d</text>

            <text x="0" y="50" font-family="Geist Mono" font-size="9" fill="#fff">SKU C · North</text>
            <rect x="100" y="42" width="48" height="10" fill="#fbbf24"/>
            <text x="154" y="50" font-family="Geist Mono" font-size="9" fill="#fcd34d">12d</text>

            <text x="0" y="68" font-family="Geist Mono" font-size="9" fill="#fff">SKU D · West</text>
            <rect x="100" y="60" width="60" height="10" fill="#fbbf24"/>
            <text x="166" y="68" font-family="Geist Mono" font-size="9" fill="#fcd34d">15d</text>

            <text x="0" y="86" font-family="Geist Mono" font-size="9" fill="#fff">SKU E · South</text>
            <rect x="100" y="78" width="72" height="10" fill="#fbbf24"/>
            <text x="178" y="86" font-family="Geist Mono" font-size="9" fill="#fcd34d">18d</text>

            <text x="0" y="104" font-family="Geist Mono" font-size="9" fill="#fff">SKU F · East</text>
            <rect x="100" y="96" width="78" height="10" fill="#86efac"/>
            <text x="184" y="104" font-family="Geist Mono" font-size="9" fill="#bbf7d0">19d</text>

            <text x="0" y="122" font-family="Geist Mono" font-size="9" fill="#fff">SKU G · West</text>
            <rect x="100" y="114" width="80" height="10" fill="#86efac"/>
            <text x="186" y="122" font-family="Geist Mono" font-size="9" fill="#bbf7d0">20d</text>
          </g>
          <!-- safety norm line -->
          <line x1="60" y1="-5" x2="60" y2="130" stroke="#fcd34d" stroke-dasharray="2,2" opacity=".5"/>
          <text x="60" y="-12" font-family="Geist Mono" font-size="8" fill="#fcd34d" text-anchor="middle">SAFETY</text>
        </g>
        <text x="380" y="48" font-family="Geist Mono" font-size="9" fill="#fda4af" font-weight="700" text-anchor="end" letter-spacing="1">₹7.7Cr</text>
        <text x="380" y="60" font-family="Geist Mono" font-size="8" fill="#fbcfe8" text-anchor="end" letter-spacing="1.2">EXPOSURE</text>
      </svg>
      <div class="tile-hero-overlay"></div>
      <div class="tile-tags"><span class="tile-tag brief">◐ Brief</span><span class="tile-tag">Risk Tower</span></div>
      <div class="tile-stamp">
        <div class="tile-stamp-eyebrow">▴ Inventory Risk Tower · refreshed 06:30</div>
        <div class="tile-stamp-headline">Seven SKUs at risk.<br/><em>Two below safety norm.</em></div>
      </div>
    </div>
    <div class="tile-body">
      <h3 class="tile-title">Inventory Risk Tower</h3>
      <p class="tile-desc"><strong>Replaces the morning stockout call.</strong> Days of cover by SKU × depot, ranked by ₹ exposure, plotted against safety norm. <strong>SKU A in East is the urgent decision today.</strong></p>
      <div class="tile-foot">
        <div class="tile-foot-kpi"><div class="tile-foot-kpi-val er">₹7.7 Cr</div><div class="tile-foot-kpi-lbl">exposure · 14d window</div></div>
        <span class="tile-foot-cta">Open tower →</span>
      </div>
    </div>
  </button>

  <!-- INV · WHY · East Depot story -->
  <button class="tile" onclick="openCell('inv-why')">
    <div class="tile-hero">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="inv_g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#831843"/><stop offset="60%" stop-color="#500724"/><stop offset="100%" stop-color="#2a0312"/></linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#inv_g2)"/>
        <!-- Map: West → East depot transfer -->
        <g>
          <circle cx="100" cy="120" r="42" fill="#a5b4fc" opacity=".18"/>
          <circle cx="100" cy="120" r="26" fill="#3b82f6" opacity=".55"/>
          <circle cx="100" cy="120" r="14" fill="#60a5fa"/>
          <text x="100" y="124" font-family="Instrument Serif" font-size="14" fill="#fff" text-anchor="middle" font-style="italic">W</text>
          <text x="100" y="180" font-family="Geist Mono" font-size="11" fill="#bfdbfe" text-anchor="middle" font-weight="700" letter-spacing="1.2">WEST DEPOT</text>
          <text x="100" y="195" font-family="Geist Mono" font-size="9" fill="#bfdbfe" text-anchor="middle">8,000 u available</text>

          <circle cx="320" cy="120" r="42" fill="#fda4af" opacity=".18"/>
          <circle cx="320" cy="120" r="26" fill="#dc2626" opacity=".55"/>
          <circle cx="320" cy="120" r="14" fill="#f87171"/>
          <text x="320" y="124" font-family="Instrument Serif" font-size="14" fill="#fff" text-anchor="middle" font-style="italic">E</text>
          <text x="320" y="180" font-family="Geist Mono" font-size="11" fill="#fbcfe8" text-anchor="middle" font-weight="700" letter-spacing="1.2">EAST DEPOT</text>
          <text x="320" y="195" font-family="Geist Mono" font-size="9" fill="#fbcfe8" text-anchor="middle">9 days cover · ₹42L</text>

          <!-- transfer arrow -->
          <path d="M 130 120 L 290 120" stroke="#c084fc" stroke-width="2" stroke-dasharray="4,4" opacity=".8"/>
          <polygon points="290,120 282,114 282,126" fill="#c084fc"/>
          <text x="210" y="105" font-family="Geist Mono" font-size="11" fill="#c084fc" text-anchor="middle" font-weight="700">8,000 u</text>
          <text x="210" y="140" font-family="Geist Mono" font-size="9" fill="#e9d5ff" text-anchor="middle">45 min transit</text>
        </g>
        <text x="200" y="40" font-family="Geist Mono" font-size="10" fill="#fda4af" text-anchor="middle" font-weight="700" letter-spacing="1.4">SKU A · ATTA 5KG</text>
        <text x="200" y="58" font-family="Instrument Serif" font-size="22" fill="#fff" text-anchor="middle" font-style="italic">East goes dark in 9 days</text>
      </svg>
      <div class="tile-hero-overlay"></div>
      <div class="tile-tags"><span class="tile-tag why">◎ Why</span><span class="tile-tag">East Depot</span></div>
      <div class="tile-stamp">
        <div class="tile-stamp-eyebrow">▴ Live · SKU A · East · ₹42L exposure</div>
        <div class="tile-stamp-headline">8K units in West.<br/><em>45 min transit. Done.</em></div>
      </div>
    </div>
    <div class="tile-body">
      <h3 class="tile-title">East Depot · the ₹42L story</h3>
      <p class="tile-desc"><strong>The flagship simulator.</strong> See why East is short, see what's available in West, simulate the transfer, see the projected fill-rate lift, approve in one click. <em>Window closes 11 AM IST.</em></p>
      <div class="tile-foot">
        <div class="tile-foot-kpi"><div class="tile-foot-kpi-val er">₹42L exposure</div><div class="tile-foot-kpi-lbl">decide by 11 AM</div></div>
        <span class="tile-foot-cta">Open simulator →</span>
      </div>
    </div>
  </button>

  <!-- INV · SIGNAL -->
  <button class="tile" onclick="openCell('inv-signal')">
    <div class="tile-hero">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="inv_g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="60%" stop-color="#1e1b4b"/><stop offset="100%" stop-color="#0c0a1f"/></linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#inv_g3)"/>
        <!-- 7/14/30 day risk horizons -->
        <g>
          <text x="60" y="40" font-family="Geist Mono" font-size="9" fill="#a5b4fc" letter-spacing="1.2" font-weight="700" text-anchor="middle">+7d</text>
          <circle cx="60" cy="120" r="48" fill="#dc2626" opacity=".15"/>
          <circle cx="60" cy="120" r="32" fill="#dc2626" opacity=".40"/>
          <text x="60" y="118" font-family="Instrument Serif" font-size="22" fill="#fff" text-anchor="middle" font-style="italic">2</text>
          <text x="60" y="132" font-family="Geist Mono" font-size="8" fill="#fda4af" text-anchor="middle">SKUs</text>
          <text x="60" y="190" font-family="Geist Mono" font-size="9" fill="#fda4af" text-anchor="middle" font-weight="700">₹42L</text>

          <text x="200" y="40" font-family="Geist Mono" font-size="9" fill="#a5b4fc" letter-spacing="1.2" font-weight="700" text-anchor="middle">+14d</text>
          <circle cx="200" cy="120" r="56" fill="#fbbf24" opacity=".15"/>
          <circle cx="200" cy="120" r="38" fill="#fbbf24" opacity=".40"/>
          <text x="200" y="118" font-family="Instrument Serif" font-size="28" fill="#fff" text-anchor="middle" font-style="italic">7</text>
          <text x="200" y="135" font-family="Geist Mono" font-size="8" fill="#fde68a" text-anchor="middle">SKUs</text>
          <text x="200" y="195" font-family="Geist Mono" font-size="9" fill="#fde68a" text-anchor="middle" font-weight="700">₹7.7Cr</text>

          <text x="340" y="40" font-family="Geist Mono" font-size="9" fill="#a5b4fc" letter-spacing="1.2" font-weight="700" text-anchor="middle">+30d</text>
          <circle cx="340" cy="120" r="64" fill="#86efac" opacity=".15"/>
          <circle cx="340" cy="120" r="44" fill="#86efac" opacity=".40"/>
          <text x="340" y="118" font-family="Instrument Serif" font-size="32" fill="#fff" text-anchor="middle" font-style="italic">14</text>
          <text x="340" y="138" font-family="Geist Mono" font-size="8" fill="#bbf7d0" text-anchor="middle">SKUs</text>
          <text x="340" y="200" font-family="Geist Mono" font-size="9" fill="#bbf7d0" text-anchor="middle" font-weight="700">₹14.2Cr</text>
        </g>
      </svg>
      <div class="tile-hero-overlay"></div>
      <div class="tile-tags"><span class="tile-tag signal">◭ Signal</span><span class="tile-tag">Horizons</span></div>
      <div class="tile-stamp">
        <div class="tile-stamp-eyebrow">▴ Forward · 7/14/30 day risk horizons</div>
        <div class="tile-stamp-headline">Two now. Seven soon.<br/><em>Fourteen on the horizon.</em></div>
      </div>
    </div>
    <div class="tile-body">
      <h3 class="tile-title">Stockout horizon radar</h3>
      <p class="tile-desc">Risk projected at 7, 14, and 30 days using velocity × cover × in-transit × lead-time. <strong>Two SKUs cross the line in 7 days.</strong> Five more queue up by day 14. Acting now keeps the platform out of crisis mode for a month.</p>
      <div class="tile-foot">
        <div class="tile-foot-kpi"><div class="tile-foot-kpi-val">3 horizons</div><div class="tile-foot-kpi-lbl">live · ₹14.2Cr 30d view</div></div>
        <span class="tile-foot-cta">Open radar →</span>
      </div>
    </div>
  </button>
</div>
`;
HERO_TILES.inv = _inv_tiles;

const _qcomm_tiles = `
<div class="tiles-head">
  <div class="tiles-head-title">The 18-hour <em>SLA window</em></div>
  <div class="tiles-head-sub">Blinkit penalty at 85% · we are at 88%</div>
</div>
<div class="tiles">

  <!-- QCOMM · BRIEF -->
  <button class="tile" onclick="openCell('qcomm-brief')">
    <div class="tile-hero">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="qc_g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0c4a6e"/><stop offset="60%" stop-color="#0a2540"/><stop offset="100%" stop-color="#020617"/></linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#qc_g1)"/>
        <!-- Fill rate gauge -->
        <g transform="translate(110, 130)">
          <circle cx="0" cy="0" r="70" fill="none" stroke="#1e293b" stroke-width="14"/>
          <circle cx="0" cy="0" r="70" fill="none" stroke="#f87171" stroke-width="14" stroke-dasharray="387 100" stroke-dashoffset="0" transform="rotate(-90)" stroke-linecap="round"/>
          <text x="0" y="-6" font-family="Instrument Serif" font-size="38" fill="#fff" text-anchor="middle" font-style="italic">88<tspan font-size="20">%</tspan></text>
          <text x="0" y="14" font-family="Geist Mono" font-size="9" fill="#a5b4fc" text-anchor="middle" letter-spacing="1.2">FILL RATE</text>
          <text x="0" y="32" font-family="Geist Mono" font-size="9" fill="#fda4af" text-anchor="middle" letter-spacing="1.2">SLA 95% · −7pts</text>
        </g>
        <!-- Platform breakdown -->
        <g transform="translate(230, 60)">
          <text x="0" y="0" font-family="Geist Mono" font-size="9" fill="#a5b4fc" letter-spacing="1.2" font-weight="700">BY PLATFORM</text>
          <g transform="translate(0,16)">
            <text x="0" y="12" font-family="Geist Mono" font-size="10" fill="#fff" font-weight="600">Blinkit</text>
            <rect x="60" y="4" width="100" height="10" fill="#1e293b"/>
            <rect x="60" y="4" width="87" height="10" fill="#f87171"/>
            <text x="164" y="12" font-family="Geist Mono" font-size="9" fill="#fda4af">87%</text>

            <text x="0" y="32" font-family="Geist Mono" font-size="10" fill="#fff" font-weight="600">Zepto</text>
            <rect x="60" y="24" width="100" height="10" fill="#1e293b"/>
            <rect x="60" y="24" width="89" height="10" fill="#fbbf24"/>
            <text x="164" y="32" font-family="Geist Mono" font-size="9" fill="#fde68a">89%</text>

            <text x="0" y="52" font-family="Geist Mono" font-size="10" fill="#fff" font-weight="600">Instamart</text>
            <rect x="60" y="44" width="100" height="10" fill="#1e293b"/>
            <rect x="60" y="44" width="93" height="10" fill="#fbbf24"/>
            <text x="164" y="52" font-family="Geist Mono" font-size="9" fill="#fde68a">93%</text>

            <text x="0" y="72" font-family="Geist Mono" font-size="10" fill="#fff" font-weight="600">BigBasket</text>
            <rect x="60" y="64" width="100" height="10" fill="#1e293b"/>
            <rect x="60" y="64" width="96" height="10" fill="#86efac"/>
            <text x="164" y="72" font-family="Geist Mono" font-size="9" fill="#bbf7d0">96%</text>
          </g>
        </g>
      </svg>
      <div class="tile-hero-overlay"></div>
      <div class="tile-tags"><span class="tile-tag brief">◐ Brief</span><span class="tile-tag">Q-Comm Pulse</span></div>
      <div class="tile-stamp">
        <div class="tile-stamp-eyebrow">▴ Q-Comm Pulse · live every 30 minutes</div>
        <div class="tile-stamp-headline">Blinkit is breaking us.<br/><em>87% vs 95% SLA.</em></div>
      </div>
    </div>
    <div class="tile-body">
      <h3 class="tile-title">Q-Commerce Fill-Rate Pulse</h3>
      <p class="tile-desc"><strong>Replaces the 30-min platform check.</strong> Fill rate by platform × city × SKU, refreshed every 30 minutes from dark-store APIs. <strong>Blinkit is in the penalty zone.</strong> Three SKUs are the offenders.</p>
      <div class="tile-foot">
        <div class="tile-foot-kpi"><div class="tile-foot-kpi-val er">88% fill</div><div class="tile-foot-kpi-lbl">SLA 95% · penalty at 85%</div></div>
        <span class="tile-foot-cta">Open pulse →</span>
      </div>
    </div>
  </button>

  <!-- QCOMM · WHY -->
  <button class="tile" onclick="openCell('qcomm-why')">
    <div class="tile-hero">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="qc_g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#581c87"/><stop offset="60%" stop-color="#3b0764"/><stop offset="100%" stop-color="#1e0532"/></linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#qc_g2)"/>
        <!-- Velocity spike chart -->
        <g>
          <text x="40" y="36" font-family="Geist Mono" font-size="10" fill="#c084fc" letter-spacing="1.2" font-weight="700">NOODLES · BLINKIT VELOCITY</text>
          <!-- baseline -->
          <line x1="40" y1="170" x2="360" y2="170" stroke="#1f1147" stroke-width="1"/>
          <!-- normal trend -->
          <path d="M 40 150 L 80 148 L 120 152 L 160 149 L 200 150 L 240 148" stroke="#a78bfa" stroke-width="2" fill="none" opacity=".4" stroke-dasharray="3,2"/>
          <!-- spike -->
          <path d="M 40 150 L 80 148 L 120 152 L 160 149 L 200 150 L 240 148 L 280 100 L 320 70 L 360 60" stroke="#fff" stroke-width="2.5" fill="none"/>
          <!-- marketing trigger marker -->
          <circle cx="240" cy="148" r="6" fill="#fcd34d"/>
          <text x="240" y="132" font-family="Geist Mono" font-size="9" fill="#fcd34d" text-anchor="middle" font-weight="700">MKTG PUSH</text>
          <!-- spike label -->
          <text x="320" y="55" font-family="Geist Mono" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">+37%</text>
          <!-- time labels -->
          <text x="40" y="195" font-family="Geist Mono" font-size="8" fill="#a5b4fc" letter-spacing="1">−6H</text>
          <text x="240" y="195" font-family="Geist Mono" font-size="8" fill="#fcd34d" letter-spacing="1" text-anchor="middle" font-weight="700">NOW</text>
          <text x="360" y="195" font-family="Geist Mono" font-size="8" fill="#a5b4fc" letter-spacing="1" text-anchor="end">+12H</text>
        </g>
      </svg>
      <div class="tile-hero-overlay"></div>
      <div class="tile-tags"><span class="tile-tag why">◎ Why</span><span class="tile-tag">Noodles</span></div>
      <div class="tile-stamp">
        <div class="tile-stamp-eyebrow">▴ Live · Noodles · Blinkit velocity</div>
        <div class="tile-stamp-headline">Marketing pushed.<br/><em>Pull spiked +37%.</em></div>
      </div>
    </div>
    <div class="tile-body">
      <h3 class="tile-title">Why is Noodles breaking?</h3>
      <p class="tile-desc">A 6PM marketing push moved Noodles velocity from baseline to <strong>+37% pull</strong> on Blinkit. Dark-store stock cover dropped from 36h to 14h. We need <strong>8K units transferred to Blinkit dark stores</strong> within 6 hours to hold SLA.</p>
      <div class="tile-foot">
        <div class="tile-foot-kpi"><div class="tile-foot-kpi-val wn">14h cover</div><div class="tile-foot-kpi-lbl">vs 36h baseline</div></div>
        <span class="tile-foot-cta">See full story →</span>
      </div>
    </div>
  </button>

  <!-- QCOMM · SIGNAL -->
  <button class="tile" onclick="openCell('qcomm-signal')">
    <div class="tile-hero">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="qc_g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#064e3b"/><stop offset="60%" stop-color="#022c22"/><stop offset="100%" stop-color="#001510"/></linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#qc_g3)"/>
        <!-- Dark store heatmap -->
        <g transform="translate(40, 50)">
          <text x="0" y="0" font-family="Geist Mono" font-size="10" fill="#86efac" letter-spacing="1.2" font-weight="700">DARK STORE HEALTH · 24 LIVE</text>
          <g transform="translate(0, 20)">
            ${Array.from({length:24}).map((_,i)=>{
              const x = (i%8)*40, y = Math.floor(i/8)*40;
              const status = i<3?'#f87171':i<8?'#fbbf24':'#86efac';
              return `<rect x="${x}" y="${y}" width="34" height="34" rx="4" fill="${status}" opacity=".7"/><text x="${x+17}" y="${y+21}" font-family="Geist Mono" font-size="9" fill="#000" text-anchor="middle" font-weight="700">${(85+Math.floor(Math.random()*15))}</text>`;
            }).join('')}
          </g>
          <text x="0" y="172" font-family="Geist Mono" font-size="9" fill="#fda4af" font-weight="700">● 3 RED</text>
          <text x="100" y="172" font-family="Geist Mono" font-size="9" fill="#fde68a" font-weight="700">● 5 AMBER</text>
          <text x="220" y="172" font-family="Geist Mono" font-size="9" fill="#bbf7d0" font-weight="700">● 16 GREEN</text>
        </g>
      </svg>
      <div class="tile-hero-overlay"></div>
      <div class="tile-tags"><span class="tile-tag signal">◭ Signal</span><span class="tile-tag">Dark Stores</span></div>
      <div class="tile-stamp">
        <div class="tile-stamp-eyebrow">▴ 24 dark stores · live SLA pulse</div>
        <div class="tile-stamp-headline">Three red. Five amber.<br/><em>Rebalance the network.</em></div>
      </div>
    </div>
    <div class="tile-body">
      <h3 class="tile-title">Dark-store network signal</h3>
      <p class="tile-desc">Live fill-rate heatmap across <strong>24 dark stores</strong>. Red cells are below 90% — those drive the penalty. <em>Predictive routing</em> reroutes orders from amber stores to green to keep SLA above 95%.</p>
      <div class="tile-foot">
        <div class="tile-foot-kpi"><div class="tile-foot-kpi-val">24 stores</div><div class="tile-foot-kpi-lbl">live · 30-min refresh</div></div>
        <span class="tile-foot-cta">Open heatmap →</span>
      </div>
    </div>
  </button>
</div>
`;
HERO_TILES.qcomm = _qcomm_tiles;

/* ═══════════════════════════════════════════════════════════
   LIBRARY · secondary playbooks per persona
   ═══════════════════════════════════════════════════════════ */
const LIBRARY: any = {};

function _libCard(tag, tagCls, title, desc, kpi, hero, cellId){
  return `<button class="lib-card" onclick="openCell('${cellId}')">
    <div class="lib-card-hero">${hero}<span class="lib-card-tag ${tagCls}">${tag}</span></div>
    <div class="lib-card-body">
      <div class="lib-card-title">${title}</div>
      <div class="lib-card-desc">${desc}</div>
      <div class="lib-card-foot"><span class="lib-card-foot-val">${kpi}</span><span class="lib-card-foot-cta">Open →</span></div>
    </div>
  </button>`;
}

const _libHero1 = `<svg viewBox="0 0 400 100" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="lh1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#0c0a1f"/></linearGradient></defs><rect width="400" height="100" fill="url(#lh1)"/><g><circle cx="60" cy="50" r="4" fill="#86efac"/><circle cx="120" cy="40" r="3" fill="#86efac"/><circle cx="180" cy="55" r="3" fill="#fbbf24"/><circle cx="240" cy="45" r="3" fill="#86efac"/><circle cx="300" cy="60" r="3" fill="#f87171"/><circle cx="350" cy="48" r="3" fill="#86efac"/></g><line x1="40" y1="80" x2="370" y2="80" stroke="#a5b4fc" stroke-width="1" opacity=".4"/></svg>`;
const _libHero2 = `<svg viewBox="0 0 400 100" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="lh2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c2d12"/><stop offset="100%" stop-color="#1c0701"/></linearGradient></defs><rect width="400" height="100" fill="url(#lh2)"/><g><rect x="40" y="50" width="40" height="40" fill="#fda4af" opacity=".55"/><rect x="100" y="60" width="40" height="30" fill="#fda4af" opacity=".7"/><rect x="160" y="70" width="40" height="20" fill="#fda4af" opacity=".85"/><rect x="220" y="55" width="40" height="35" fill="#fda4af" opacity=".6"/><rect x="280" y="40" width="40" height="50" fill="#fda4af" opacity=".5"/></g></svg>`;
const _libHero3 = `<svg viewBox="0 0 400 100" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="lh3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#064e3b"/><stop offset="100%" stop-color="#001510"/></linearGradient></defs><rect width="400" height="100" fill="url(#lh3)"/><g fill="none" stroke="#86efac" stroke-width="2"><path d="M 40 70 Q 100 30 200 50 T 360 35"/></g><circle cx="200" cy="50" r="4" fill="#86efac"/><text x="200" y="35" font-family="Geist Mono" font-size="9" fill="#86efac" text-anchor="middle">signal lift</text></svg>`;
const _libHero4 = `<svg viewBox="0 0 400 100" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="lh4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#581c87"/><stop offset="100%" stop-color="#1e0532"/></linearGradient></defs><rect width="400" height="100" fill="url(#lh4)"/><g><text x="200" y="55" font-family="Instrument Serif" font-size="28" fill="#fff" text-anchor="middle" font-style="italic">Ask anything</text></g></svg>`;

LIBRARY.csco = `<div class="library">
  <div class="library-head">
    <div class="library-head-title"><span class="library-head-icon">✦</span><em>More from</em> the CSCO Cockpit</div>
    <div class="library-head-meta"><strong>3 playbooks</strong> · grouped · Ask · Why · Signal</div>
  </div>
  <div class="lib-grid">
    ${_libCard('◆ Ask','ask',"Ask CalvinBall (CSCO)",'Natural-language across plants, depots, channels. <strong>Voice-enabled.</strong>','22K tokens / query',_libHero4,'csco-ask')}
    ${_libCard('◐ Brief','brief','Weekly S&amp;OP Pre-Read','Auto-generated S&amp;OP deck Sunday 6 PM. <strong>Pre-decisions ready.</strong>','12 slides',_libHero1,'csco-brief')}
    ${_libCard('◭ Signal','signal','Cost-to-Serve Drift','Per-region cost-to-serve vs plan. <strong>Drift early-warning.</strong>','5 regions',_libHero3,'csco-signal')}
  </div>
</div>`;
LIBRARY.dp = `<div class="library">
  <div class="library-head">
    <div class="library-head-title"><span class="library-head-icon">✦</span><em>More from</em> Demand Planning</div>
    <div class="library-head-meta"><strong>Workbench</strong> · consensus · forecast · ask</div>
  </div>
  <div class="lib-grid">
    <div class="lib-card" onclick="openView('dp-consensus')">
      <div class="lib-card-hero" style="background:linear-gradient(135deg,#0c3d2e 0%,#04231a 100%)"><span class="lib-card-tag brief">⊞ Align</span><img class="lib-banner" src="/banners/consensus.svg" alt=""/></div>
      <div class="lib-card-body">
        <div class="lib-card-title">Consensus Workbook</div>
        <div class="lib-card-desc">Planner overrides vs the system forecast, guardrailed ±15 / ±25. Propose, review, and stage the version for S&amp;OP.</div>
        <div class="lib-card-foot"><span class="lib-card-foot-val">full screen</span><span class="lib-card-foot-cta">Open →</span></div>
      </div>
    </div>
    <div class="lib-card" onclick="openView('dp-forecast')">
      <div class="lib-card-hero" style="background:linear-gradient(135deg,#10233f 0%,#071426 100%)"><span class="lib-card-tag signal">▤ View</span><img class="lib-banner" src="/banners/forecast.svg" alt=""/></div>
      <div class="lib-card-body">
        <div class="lib-card-title">Forecast Viewer</div>
        <div class="lib-card-desc">The full forecast the way a planner reads it — filter by category, channel and location, group, and search across SKUs.</div>
        <div class="lib-card-foot"><span class="lib-card-foot-val">184 SKUs</span><span class="lib-card-foot-cta">Open →</span></div>
      </div>
    </div>
    <div class="lib-card" onclick="toggleAsk()">
      <div class="lib-card-hero" style="background:linear-gradient(135deg,#0d3320 0%,#04160d 100%)"><span class="lib-card-tag ask">✦ Ask</span><img class="lib-banner" src="/banners/ask.svg" alt=""/></div>
      <div class="lib-card-body">
        <div class="lib-card-title">Ask CalvinBall</div>
        <div class="lib-card-desc">SKU × depot × week questions in plain language — grounded in the same numbers, with sources and a recommended next step.</div>
        <div class="lib-card-foot"><span class="lib-card-foot-val">planner view</span><span class="lib-card-foot-cta">Ask →</span></div>
      </div>
    </div>
  </div>
</div>`;
LIBRARY.inv = `<div class="library">
  <div class="library-head">
    <div class="library-head-title"><span class="library-head-icon">✦</span><em>More from</em> Inventory Risk</div>
    <div class="library-head-meta"><strong>3 playbooks</strong> · grouped · Ask · Why · Signal</div>
  </div>
  <div class="lib-grid">
    ${_libCard('◆ Ask','ask','Ask CalvinBall (Inventory)','"Which depots are hot?" "Cost of all rebalances?" <strong>Voice-enabled.</strong>','22K tokens / query',_libHero4,'inv-ask')}
    ${_libCard('◐ Brief','brief','Replenishment Brief','Daily replenishment orders, pre-prioritised. <strong>One-click approve.</strong>','28 depots',_libHero1,'inv-brief')}
    ${_libCard('◭ Signal','signal','Lead-Time Drift Radar','Supplier and route lead-times drifting out of plan. <strong>Before they bite.</strong>','17 lanes',_libHero3,'inv-signal')}
  </div>
</div>`;
LIBRARY.qcomm = `<div class="library">
  <div class="library-head">
    <div class="library-head-title"><span class="library-head-icon">✦</span><em>More from</em> Q-Commerce Pulse</div>
    <div class="library-head-meta"><strong>3 playbooks</strong> · grouped · Ask · Why · Signal</div>
  </div>
  <div class="lib-grid">
    ${_libCard('◆ Ask','ask','Ask CalvinBall (Q-Comm)','"Where can I sell more?" "What is breaking SLA?" <strong>Voice-enabled.</strong>','22K tokens / query',_libHero4,'qcomm-ask')}
    ${_libCard('◎ Why','why','SLA Breach Decomposer','Why SLA broke — by platform × city × SKU. <strong>Root cause in 8 seconds.</strong>','4 platforms',_libHero2,'qcomm-why')}
    ${_libCard('◭ Signal','signal','Dark-Store Heatmap','24 dark stores · live SLA · <strong>predictive rerouting</strong>.','30-min refresh',_libHero3,'qcomm-signal')}
  </div>
</div>`;

export { HERO_TILES, LIBRARY };
