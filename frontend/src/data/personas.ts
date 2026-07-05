// @ts-nocheck
/* Persona definitions + sidebar nav/history — ported verbatim from v0.9. */
/* eslint-disable */
const PERSONAS = {
  csco: {
    name:'Vikram Mehta', role:'Chief Supply Chain Officer · Aurion Consumer Brands', initials:'VM', first:'Vikram',
    eyebrow:'Wednesday · 27 May 2026 · 06:34 IST',
    title:'Good morning, <em>Vikram</em>.<br/>Three signals worth your attention.',
    sub:"Service health across <strong>6 plants, 28 depots, 4 channels</strong>. The system has triaged overnight data and surfaced what only you can decide.",
    bigVal:'₹10.1 <em>Cr</em>',
    bigLbl:'Revenue at risk · next 30 days · <strong>3 streams: demand miss, stockout, distributor hold</strong>',
    bigMini:[{v:'62%',l:'recoverable in 7 days'},{v:'4',l:'cross-functional decisions queued'},{v:'2 min',l:'to triage all three'}],
    severity:'er',
    askSuggs:["What's my biggest issue this week?","Show me the East Depot story","Are we on plan for Q1?","What can I sell more of if we had stock?"]
  },
  dp: {
    name:'Anjali Sharma', role:'Head of Demand Planning · Aurion Consumer Brands', initials:'AS', first:'Anjali',
    eyebrow:'Wednesday · 27 May 2026 · 06:34 IST',
    title:'Good morning, <em>Anjali</em>.<br/>The forecast is wrong in 4 places.',
    sub:"Last week's actuals are in. The system has reconciled <strong>184 SKUs × 28 depots</strong> against your 16-week plan and surfaced where the model is breaking.",
    bigVal:'+11 <em>pts</em>',
    bigLbl:"Forecast value-add over a naive baseline · accuracy <strong>68% (target 75%)</strong> · 4 SKUs need a planner's eye today",
    bigMini:[{v:'68%',l:'accuracy · 82% backtested'},{v:'12',l:'SKUs off-plan ≥20%'},{v:'4',l:'corrections to stage today'}],
    severity:'warn',
    askSuggs:["Where is my forecast most wrong?","Show me the Signal Stack","Why did East Atta miss by 24%?","What's the production impact if I cut East 10%?"]
  },
  inv: {
    name:'Rajiv Kumar', role:'Inventory &amp; Replenishment Manager · Aurion Consumer Brands', initials:'RK', first:'Rajiv',
    eyebrow:'Wednesday · 27 May 2026 · 06:34 IST',
    title:'Good morning, <em>Rajiv</em>.<br/>Seven SKUs go dark in 14 days.',
    sub:"Inventory, in-transit, sales velocity and lead times reconciled across <strong>28 depots</strong>. The biggest one — East Depot — is decided by 11 AM today or you lose <strong>₹42L</strong>.",
    bigVal:'₹7.7 <em>Cr</em>',
    bigLbl:"Stockout revenue exposure · next 14 days · <strong>East Depot is the urgent one</strong>",
    bigMini:[{v:'9 days',l:'East cover · SKU A'},{v:'8,000 u',l:'available West'},{v:'45 min',l:'transit time'}],
    severity:'er',
    askSuggs:["Show me the East Depot story","Which depots are systematically hot?","What's the cost of all transfers this week?","Where is Q-Comm breaking us?"]
  },
  qcomm: {
    name:'Priya Nair', role:'Q-Commerce &amp; Modern Trade Head · Aurion', initials:'PN', first:'Priya',
    eyebrow:'Wednesday · 27 May 2026 · 06:34 IST',
    title:'Good morning, <em>Priya</em>.<br/>Blinkit penalty kicks in at 85%.',
    sub:"Q-Comm fill rate is <strong>88% vs 95% SLA</strong>. Three SKUs running below safety norm on Blinkit + Zepto. Marketing has just launched a 24-hour Noodles push.",
    bigVal:'7 <em>pts</em>',
    bigLbl:"Below SLA on Q-Comm · <strong>3 SKUs in red, penalty band starts at −10pts</strong>",
    bigMini:[{v:'+37%',l:'Noodles Q-Comm pull'},{v:'8K',l:'transfer needed'},{v:'18 hrs',l:'before penalty hits'}],
    severity:'er',
    askSuggs:["What's our Q-Comm SLA position?","Where can I sell more if we had stock?","MT vs Q-Comm velocity divergence","Show me the Noodles story"]
  }
};

const SB_NAV = {
  csco: [
    { id:'home',         icon:'home', name:'Home',                    tag:'' },
    { id:'csco-brief',   icon:'brief', name:'Wednesday Canvas',        tag:'Brief' },
    { id:'csco-why',     icon:'why', name:'Revenue Waterfall',       tag:'Why' },
    { id:'csco-signal',  icon:'signal', name:'Event Radar',             tag:'Signal' },
    { id:'csco-ask',     icon:'ask', name:'Ask CalvinBall',           tag:'Ask' }
  ],
  dp: [
    { id:'home',         icon:'home', name:'Home',                    tag:'' },
    { id:'dp-brief',     icon:'brief', name:'Planning Canvas',         tag:'Brief' },
    { id:'dp-why',       icon:'why', name:'Variance Decomposer',     tag:'Why' },
    { id:'dp-signal',    icon:'signal', name:'Signal Stack',            tag:'Signal' },
    { id:'dp-forecast',  icon:'forecast', name:'Forecast Viewer',         tag:'View' },
    { id:'dp-consensus', icon:'consensus', name:'Consensus Workbook',      tag:'Align' },
    { id:'dp-ask',       icon:'ask', name:'Ask CalvinBall',           tag:'Ask' }
  ],
  inv: [
    { id:'home',         icon:'home', name:'Home',                    tag:'' },
    { id:'inv-brief',    icon:'brief', name:'Risk Tower',              tag:'Brief' },
    { id:'inv-why',      icon:'why', name:'East Depot · ₹42L',       tag:'Why' },
    { id:'inv-signal',   icon:'signal', name:'Rebalance Simulator',     tag:'Signal' },
    { id:'inv-ask',      icon:'ask', name:'Ask CalvinBall',           tag:'Ask' }
  ],
  qcomm: [
    { id:'home',         icon:'home', name:'Home',                    tag:'' },
    { id:'qcomm-brief',  icon:'brief', name:'Q-Comm Pulse',            tag:'Brief' },
    { id:'qcomm-why',    icon:'why', name:'SLA Decomposer',          tag:'Why' },
    { id:'qcomm-signal', icon:'signal', name:'Rerouting Simulator',     tag:'Signal' },
    { id:'qcomm-ask',    icon:'ask', name:'Ask CalvinBall',           tag:'Ask' }
  ]
};

const SB_HISTORY = {
  csco:  ['East Depot ₹42L — should I approve?','What changed since last Wednesday?','Recovery progress this week','Why is OTIF dropping?'],
  dp:    ['East Atta variance · why 24%?','Signal Stack — what if I switch off weather?','Q-Comm vs MT divergence','Forecast accuracy by SKU profile'],
  inv:   ['Show me the East Depot story','Which depots are systematically hot?','Cost of all rebalances this week','Lead-time drift · last 30d'],
  qcomm: ['Blinkit SLA — how long do we have?','Rerouting cost vs penalty math','Dark-store refill priority','Velocity spike pattern · last 7d']
};

export { PERSONAS, SB_NAV, SB_HISTORY };
