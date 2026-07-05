// @ts-nocheck
/* Flagship interactive engines (depot sim, signal stack, waterfall, radar, q-comm) — ported. */
/* eslint-disable */
import { state, toast, updateJourney, closeModal } from './shell';

const SIM_SOURCES = {
  west:  { name:'West Depot',     meta:'Mumbai · MH · 42K on hand', avail:8000,  origTotal:42000, mins:45,  cost:18000, mode:'Air · 45 min', city:'Mumbai → Patna' },
  south: { name:'South Depot',    meta:'Bengaluru · KA · 28K on hand', avail:4000, origTotal:28000, mins:90,  cost:22000, mode:'Air · 90 min', city:'Bengaluru → Patna' },
  plant: { name:'Plant 2 (fresh)',meta:'Kolkata plant · 12K batch ready', avail:12000, origTotal:12000, mins:180, cost:38000, mode:'Road · 3 hr',  city:'Kolkata plant → Patna' }
};
const EAST_BASE_STOCK = 14000;
const EAST_DAILY_BURN = 1550;    // ≈ 14K / 9 days
const REV_PER_UNIT    = 525;     // 8000 u × ₹525 ≈ ₹42L
const FILL_BASE       = 82;      // before
let simState = { source:'west', qty:8000 };

function simSource(key){
  simState.source = key;
  const src = SIM_SOURCES[key];
  simState.qty = Math.min(simState.qty, src.avail);
  // Update slider max
  const slider = document.getElementById('simQty');
  slider.max = src.avail;
  slider.value = simState.qty;
  document.getElementById('simMax').textContent = (src.avail/1000) + 'K';
  // Visual selected
  document.querySelectorAll('.src').forEach(s=>s.classList.toggle('active', s.dataset.src===key));
  simUpdate();
}

function simScenario(key){
  document.querySelectorAll('.scn').forEach(b=>b.classList.remove('active'));
  (window.event) && (window.event).currentTarget && (window.event).currentTarget.classList.add('active');
  const slider = document.getElementById('simQty');
  if (key==='default') { simSource('west'); slider.value=8000; simState.qty=8000; }
  else if (key==='max'){ simSource('plant'); slider.value=12000; simState.qty=12000; }
  else if (key==='min'){ simSource('west'); slider.value=4000; simState.qty=4000; }
  else if (key==='nothing'){ slider.value=0; simState.qty=0; }
  simUpdate();
}

function simUpdate(){
  const src = SIM_SOURCES[simState.source];
  simState.qty = +document.getElementById('simQty').value;
  const q = simState.qty;

  // Update text
  document.getElementById('simQtyVal').textContent = q.toLocaleString('en-IN');
  document.getElementById('simSrcName').textContent = src.name;
  document.getElementById('simSrcMeta').textContent = src.meta;
  document.getElementById('simSrcAvail').textContent = (src.avail/1000) + 'K u';
  document.getElementById('simSrcAfter').textContent = ((src.origTotal-q)/1000).toFixed(1) + 'K u';
  document.getElementById('simArrowQty').textContent = q.toLocaleString('en-IN') + ' units';
  document.getElementById('simArrowMode').textContent = src.mode + ' · ₹' + (src.cost/1000).toFixed(0) + 'K';
  document.getElementById('simTgtAfter').textContent = ((EAST_BASE_STOCK+q)/1000).toFixed(1) + 'K u';

  // Impact numbers
  const newCoverDays = ((EAST_BASE_STOCK+q) / EAST_DAILY_BURN);
  const newFill = Math.min(98, FILL_BASE + q * 0.0015);
  const protected_inr = q * REV_PER_UNIT;
  const cost = q > 0 ? src.cost : 0;
  const roi = cost > 0 ? Math.round(protected_inr / cost) : 0;

  // Flash impact cells on change
  ['ic_cover','ic_fill','ic_rs','ic_cost','ic_roi'].forEach(id=>{
    const el = document.getElementById(id);
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    setTimeout(()=>el.classList.remove('flash'), 600);
  });

  document.getElementById('simCover').textContent = newCoverDays.toFixed(1) + ' days';
  document.getElementById('simCover').className = 'impact-cell-val ' + (newCoverDays<10?'er':newCoverDays<14?'wn':'ok');
  document.getElementById('simFill').textContent = newFill.toFixed(0) + '%';
  document.getElementById('simFill').className = 'impact-cell-val ' + (newFill<88?'er':newFill<93?'wn':'ok');
  document.getElementById('simRupees').textContent = '₹' + (protected_inr/100000).toFixed(1) + ' L';
  document.getElementById('simRupees').className = 'impact-cell-val ' + (q===0?'er':'ok');
  document.getElementById('simCost').textContent = cost===0 ? '₹0' : '₹' + (cost/1000).toFixed(0) + ' K';
  document.getElementById('simCost').className = 'impact-cell-val ' + (cost===0?'ok':cost>30000?'er':'wn');
  document.getElementById('simCostDelta').textContent = src.mode;
  document.getElementById('simROI').textContent = q===0 ? '—' : roi + '×';
  document.getElementById('simROI').className = 'impact-cell-val ' + (q===0?'er':roi>100?'ok':roi>50?'wn':'er');
}

function simApprove(){
  const q = simState.qty;
  const src = SIM_SOURCES[simState.source];
  if (q===0){ toast('Nothing to dispatch', 'Slider is at zero · adjust or pick a scenario', 'warn'); return; }
  document.getElementById('simDispatchSub').textContent =
    q.toLocaleString('en-IN') + ' units · ' + src.name.split(' ')[0] + ' → East · ETA ' +
    (src.mins===45?'14:15':src.mins===90?'15:00':'16:30') + ' IST';
  document.getElementById('simDispatch').classList.add('show');
  state.step = 4; updateJourney();
  pushAction('Approved East Depot transfer · ' + q + ' units from ' + src.name);
  showWorkflowComplete({
    title: 'Workflow complete · <em>new inventory plan loaded</em>',
    sub: q.toLocaleString('en-IN') + ' units in motion · 6 systems updated · East Depot recovers in ' + (src.mins/60).toFixed(1) + 'h',
    timeLbl: 'ETA East Depot',
    timeVal: src.mins===45?'14:15':src.mins===90?'15:00':'16:30',
    changes: [
      'WMS · ' + q.toLocaleString('en-IN') + ' units staged for dispatch from ' + src.name,
      'BlueDart · driver assigned · ' + (src.mins===45?'11:30':src.mins===90?'12:00':'13:30') + ' IST slot booked',
      'East Depot · inbound dock booked · receiving team prepped',
      'SAP S/4 · ASN dispatched to Patna depot',
      'WhatsApp · 244 East distributors notified of restock window',
      '<strong>16-week plan</strong> · West Depot replenishment from CFA brought forward by 3 days'
    ],
    newplan: [
      { lbl: 'East cover', before: '9 days', after: ((14000+q)/1550).toFixed(0) + ' days' },
      { lbl: 'Fill rate', before: '82%', after: Math.min(98, 82 + q*0.0015).toFixed(0) + '%' },
      { lbl: 'Revenue protected', before: '₹0', after: '₹' + (q*525/100000).toFixed(1) + ' L' }
    ],
    routes: ['Rajiv Kumar (Inventory)', 'Vikram Mehta (CC)', 'East CFA Manager', 'WMS · live sync']
  });
}

/* ═══════════════════════════════════════════════════════════
   FLAGSHIP 2 · SIGNAL STACK · interactive math
   ═══════════════════════════════════════════════════════════ */
const SIG_LIFTS = {
  // marginal accuracy lift (pts) per signal, by SKU profile · v = point estimate, pm = ± from rolling-origin backtest
  all:    { velocity:{v:5,pm:2}, promo:{v:4,pm:2}, weather:{v:2,pm:1}, qcomm:{v:4,pm:2}, sentiment:{v:3,pm:2} },
  foods:  { velocity:{v:4,pm:2}, promo:{v:8,pm:3}, weather:{v:5,pm:2}, qcomm:{v:3,pm:2}, sentiment:{v:3,pm:2} },
  pc:     { velocity:{v:5,pm:2}, promo:{v:2,pm:1}, weather:{v:1,pm:1}, qcomm:{v:2,pm:1}, sentiment:{v:5,pm:2} },
  qcomm:  { velocity:{v:6,pm:2}, promo:{v:4,pm:2}, weather:{v:1,pm:1}, qcomm:{v:9,pm:3}, sentiment:{v:3,pm:2} }
};
const SIG_PROFILE_LBL = { all:'All 184 SKUs', foods:'Foods (promo-heavy)', pc:'Personal Care (stable)', qcomm:'Q-Comm heavy' };
const SIG_PROFILE_LBL_SHORT = { all:'All SKUs', foods:'Foods', pc:'Personal Care', qcomm:'Q-Comm' };
const SIG_BASELINE = { all:60, foods:56, pc:70, qcomm:46 };  // realistic SAP IBP statistical baseline (1−MAPE), varies by profile
const SIG_PENDING = { qcomm:true, sentiment:true };
const SIG_SETUP_COST = { qcomm: 800000, sentiment: 600000 };  // ₹14L for both pending signals

let sigState = { profile:'all' };

function stackProfile(key){
  sigState.profile = key;
  document.querySelectorAll('.profile-pill').forEach(p=>p.classList.toggle('active', p.dataset.prof===key));
  stackUpdate();
}

// Signals overlap — they partly capture the same demand movement — so marginal lifts do NOT add linearly.
// netLift applies a diminishing-returns discount that grows with the number of signals switched on.
function netLift(sum, count){
  const overlap = sum * 0.08 * Math.max(0, count - 1);
  return Math.max(0, Math.round(sum - overlap));
}

function stackUpdate(){
  const lifts = SIG_LIFTS[sigState.profile];
  const baseline = SIG_BASELINE[sigState.profile];
  let sumAll = 0, countAll = 0, sumLive = 0, countLive = 0, pendingSetup = 0;

  ['velocity','promo','weather','qcomm','sentiment'].forEach(sig=>{
    const row = document.querySelector(`.sig-row[data-sig="${sig}"]`);
    const checked = row.querySelector('input').checked;
    const lift = lifts[sig];
    row.classList.toggle('off', !checked);
    // rebuild the lift cell: point estimate + ± range; pending signals in amber, live in green
    const cell = document.getElementById('lift_'+sig).parentElement;
    cell.innerHTML = `<span id="lift_${sig}" style="font-family:var(--mono);font-size:12px;color:${SIG_PENDING[sig]?'var(--wn)':'var(--ok)'};font-weight:600">+${lift.v}</span> <span style="font-size:10px;color:var(--t-3)">pts</span> <span style="font-family:var(--mono);font-size:9px;color:var(--t-4)">±${lift.pm}</span>`;
    document.getElementById('bar_'+sig).style.width = (lift.v * 3.5) + '%';
    if (checked) {
      sumAll += lift.v; countAll++;
      if (SIG_PENDING[sig]) pendingSetup += SIG_SETUP_COST[sig];
      else { sumLive += lift.v; countLive++; }
    }
  });

  const totalAll  = baseline + netLift(sumAll, countAll);   // live + pending (with roadmap)
  const totalLive = baseline + netLift(sumLive, countLive); // live signals only (today)

  // baseline row
  document.getElementById('baselineBar').style.width = baseline + '%';
  document.getElementById('baselineLbl').textContent = baseline + '%';

  // result strip
  document.getElementById('stackBaseline').textContent = baseline + '%';
  document.getElementById('stackTotal').textContent = totalAll + '%';
  document.getElementById('stackCount').textContent = countAll;
  document.getElementById('stackProfileLbl').textContent = SIG_PROFILE_LBL_SHORT[sigState.profile];
  document.getElementById('stackTotal').className = 'stack-result-val ' + (totalAll>=70?'now':totalAll>=55?'arrow':'was');

  // calc card · live vs roadmap, WC range, payback only on the pending investment
  document.getElementById('calcLive').textContent = totalLive + '%';
  document.getElementById('calcLive').className = 'calc-val ' + (totalLive>=70?'ok':totalLive>=55?'wn':'er');
  document.getElementById('calcProjected').textContent = totalAll + '%';
  document.getElementById('calcProjected').className = 'calc-val ' + (totalAll>=70?'ok':totalAll>=55?'wn':'er');
  const net = totalAll - baseline;
  const wcLo = net * 0.12, wcHi = net * 0.18;  // ₹12–18 L working capital released per accuracy point
  document.getElementById('calcWC').textContent = net>0 ? `₹${wcLo.toFixed(1)}–${wcHi.toFixed(1)} Cr` : '—';
  const incrWC = (totalAll - totalLive) * 0.15 * 1e7;  // ₹/yr attributable to pending signals
  const payback = (pendingSetup>0 && incrWC>0) ? Math.round(pendingSetup / (incrWC/365)) : 0;
  document.getElementById('calcPayback').textContent = payback>0 ? payback + ' days' : '—';
  document.getElementById('calcPayback').className = 'calc-val ' + ((payback>0 && payback<180) ? 'ok' : 'wn');

  drawBacktest(totalAll, baseline);
  document.getElementById('backtestSku').textContent = SIG_PROFILE_LBL_SHORT[sigState.profile];
}

function drawBacktest(accuracy, baseline){
  // Generate 30 "actual" points (seeded for stability per profile)
  const W = 700, H = 130, pad = 20;
  const N = 30;
  const seed = (sigState.profile === 'foods') ? 31 : sigState.profile === 'pc' ? 17 : sigState.profile === 'qcomm' ? 47 : 11;
  let rng = seed;
  const rand = () => { rng = (rng*9301 + 49297) % 233280; return rng/233280; };

  const actual = [];
  for (let i=0; i<N; i++) {
    const base = 65 + Math.sin(i*0.5)*20 + (rand()-.5)*15;
    actual.push(base);
  }
  // Baseline error from its (profile) accuracy; stack error from configured accuracy → narrower
  const baselineErr = (100 - baseline) / 100;
  const stackErr = (100 - accuracy) / 100;
  const baselineArr = actual.map((v,i)=> v + (rand()-.5) * 45 * baselineErr);
  const stack       = actual.map((v,i)=> v + (rand()-.5) * 45 * stackErr);

  const x = i => pad + (W-2*pad) * i/(N-1);
  const y = v => pad + (H-2*pad) * (1 - (v-30)/70);
  const toPath = arr => arr.map((v,i)=>`${i===0?'M':'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');

  document.getElementById('backtestActual').setAttribute('d', toPath(actual));
  document.getElementById('backtestBaseline').setAttribute('d', toPath(baselineArr));
  document.getElementById('backtestStack').setAttribute('d', toPath(stack));
}

function toggleProv(sig){
  const el = document.getElementById('prov_'+sig);
  el.classList.toggle('show');
}

function wbToggle(el){
  const yes = el.classList.toggle('yes');
  el.classList.toggle('no', !yes);
  el.textContent = yes ? '✓' : '○';
  wbCount();
}
function wbCount(){
  const btns = document.querySelectorAll('#wbBody .wb-appr');
  let y = 0; btns.forEach(b => { if (b.classList.contains('yes')) y++; });
  const el = document.getElementById('wbApprCount');
  if (el) el.textContent = y + ' / ' + btns.length + ' approved';
}
function wbStage(){
  const txt = document.getElementById('wbApprCount').textContent;
  pushAction('Consensus version staged · Hair Oils · ' + txt + ' · out-of-guardrail item routed to S&OP');
  showWorkflowComplete({
    title: 'Consensus staged · <em>version locked for S&amp;OP</em>',
    sub: 'Hair Oils consensus · ' + txt + ' · 1 item (>±25%) routed to S&amp;OP with rationale',
    timeLbl: 'S&OP review',
    timeVal: 'Fri 11:00',
    changes: [
      'Approved overrides · locked into consensus forecast version v2026-W22',
      'Guardrail · 1 SKU over ±25% (Nihar Almond) routed to S&OP with planner rationale',
      'Audit trail · every override stamped with owner, prior value and reason',
      'S&OP review · Friday 11:00 — Demand Planning proposes, the review commits',
      'Supply Planning · receives the committed plan only after S&OP sign-off'
    ],
    newplan: [
      { lbl: 'Within-guardrail overrides', before: 'proposed', after: 'staged' },
      { lbl: 'Routed to S&OP', before: '—', after: '1 SKU (>±25%)' },
      { lbl: 'Commit authority', before: 'Demand Planning', after: 'S&OP review' }
    ],
    routes: ['Anjali Sharma (Demand Planning)', 'S&OP review (commits)', 'Category planners (5)', 'Supply Planning (post-commit)']
  });
  state.step = 4; updateJourney();
}

function stackApprove(){
  const total = +document.getElementById('calcProjected').textContent.replace('%','');
  const live = +document.getElementById('calcLive').textContent.replace('%','');
  const count = +document.getElementById('stackCount').textContent;
  const baseline = SIG_BASELINE[sigState.profile];
  const wc = document.getElementById('calcWC').textContent;
  const prof = SIG_PROFILE_LBL_SHORT[sigState.profile];
  pushAction('Signal configuration locked · ' + count + ' signals · ' + live + '% live / ' + total + '% with roadmap');
  showWorkflowComplete({
    title: 'Configuration locked · <em>forecast model updated</em>',
    sub: count + ' signals configured · ' + prof + ' · validation runs weekly against actuals',
    timeLbl: 'Next plan refresh',
    timeVal: 'Mon 03:00',
    changes: [
      'Signal layer · ' + count + ' inputs configured into the forecast model',
      'SAP IBP · model parameters updated · next batch run scheduled Monday',
      '<strong>Live signals active today</strong> · projected ' + live + '% accuracy (' + prof + ')',
      'Pending signals · Q-Comm + sentiment · 6-week integration sprint to reach ' + total + '%',
      'S&OP review · Friday slot booked — Demand Planning proposes, the review commits the plan',
      'CalvinBall · weekly validation loop tracks realised vs projected lift'
    ],
    newplan: [
      { lbl: 'Accuracy · live signals', before: baseline + '%', after: live + '%' },
      { lbl: 'Accuracy · with roadmap', before: baseline + '%', after: total + '%' },
      { lbl: 'Est. working capital released', before: '₹0', after: wc }
    ],
    routes: ['Anjali Sharma (Demand Planning)', 'S&OP review (commits)', 'Upsynq integration team', 'IBP admin']
  });
  state.step = 4; updateJourney();
}

/* ═══════════════════════════════════════════════════════════
   FLAGSHIP 3 · CSCO REVENUE WATERFALL · interactive
   ═══════════════════════════════════════════════════════════ */
const WF_BASE = { total:10.1, stream1:3.4, stream2:2.4, stream3:4.3 };  // ₹ Cr at 30d
const WF_MULTI = { 7:0.25, 14:0.50, 30:1.00, 60:1.65 };
const WF_LBL = { 7:'next 7 days', 14:'next 14 days', 30:'next 30 days', 60:'next 60 days' };
const RECV_COSTS = { east:18000, bnk:35000, d1:0, d2:0, fc:0, prod:200000 };
let wfState = { horizon:30, active:new Set(['east','bnk','d1','d2','fc','prod']) };

function wfHorizon(h){
  wfState.horizon = h;
  document.querySelectorAll('.hzn').forEach(b=>b.classList.toggle('active', +b.dataset.h===h));
  wfUpdate();
}

function recvToggle(key){
  const row = document.querySelector(`.recv-row[data-recv="${key}"]`);
  if (wfState.active.has(key)) {
    wfState.active.delete(key);
    row.classList.remove('checked');
    row.querySelector('.task-check').style.background='';
    row.querySelector('.task-check').style.borderColor='';
    row.querySelector('.task-check').style.color='';
    row.querySelector('.task-check').textContent='';
  } else {
    wfState.active.add(key);
    row.classList.add('checked');
    row.querySelector('.task-check').style.background='var(--ok)';
    row.querySelector('.task-check').style.borderColor='var(--ok)';
    row.querySelector('.task-check').style.color='#000';
    row.querySelector('.task-check').textContent='✓';
  }
  wfUpdate();
}

function wfUpdate(){
  const m = WF_MULTI[wfState.horizon];
  const total = WF_BASE.total * m;
  const s1 = WF_BASE.stream1 * m;
  const s2 = WF_BASE.stream2 * m;
  const s3 = WF_BASE.stream3 * m;

  // Recovery sum
  let recovCr = 0, costRs = 0;
  document.querySelectorAll('.recv-row').forEach(row=>{
    const k = row.dataset.recv;
    if (wfState.active.has(k)) {
      recovCr += (+row.dataset.rs) / 10000000; // to Cr
      costRs += RECV_COSTS[k];
    }
  });
  recovCr = recovCr * (wfState.horizon===7 ? 0.45 : wfState.horizon===14 ? 0.75 : wfState.horizon===30 ? 1.0 : 1.05);
  const pct = total > 0 ? Math.min(100, (recovCr/total)*100) : 0;

  // Update header labels
  document.getElementById('wfHorizonLbl').textContent = WF_LBL[wfState.horizon];
  document.getElementById('wfHorizonSub').textContent = 'refreshed 06:34 IST · ' + wfState.horizon + '-day forward window';

  // Bar heights · scale so 30d total = 130px tall
  const maxBarH = 130;
  const scale = maxBarH / 10.1; // px per ₹Cr
  const setBar = (rectId, valId, txtY, val, fmt) => {
    const h = val * scale;
    const y = 170 - h;
    const rect = document.getElementById(rectId);
    rect.setAttribute('y', y);
    rect.setAttribute('height', h);
    document.getElementById(valId).setAttribute('y', y - 8);
    document.getElementById(valId).textContent = fmt;
  };
  setBar('wfBarTotal','wfValTotal', 32, total, '₹' + total.toFixed(1) + ' Cr');
  setBar('wfBar1','wfVal1', 77, s1, '₹' + s1.toFixed(1) + ' Cr');
  setBar('wfBar2','wfVal2',102, s2, '₹' + s2.toFixed(1) + ' Cr');
  setBar('wfBar3','wfVal3', 54, s3, '₹' + s3.toFixed(1) + ' Cr');
  setBar('wfBarRecov','wfValRecov', 81, recovCr, '₹' + recovCr.toFixed(1) + ' Cr');

  // Recoverable %
  const pctText = document.getElementById('wfPctRecov');
  pctText.textContent = pct.toFixed(0) + '% recoverable';
  const recovBarY = 170 - (recovCr * scale);
  pctText.setAttribute('y', recovBarY + 14);

  // Bar colors based on recovery quality
  const recovBar = document.getElementById('wfBarRecov');
  if (pct >= 60) { recovBar.setAttribute('fill','#86efac'); }
  else if (pct >= 30) { recovBar.setAttribute('fill','#fbbf24'); }
  else { recovBar.setAttribute('fill','#f87171'); }

  // Summary cells
  document.getElementById('recvTotal').textContent = '₹' + recovCr.toFixed(1) + ' Cr';
  document.getElementById('recvTotal').className = 'recv-sum-val ' + (pct>=60?'ok':pct>=30?'wn':'er');
  document.getElementById('recvPct').textContent = pct.toFixed(0) + '%';
  document.getElementById('recvCost').textContent = costRs===0 ? '₹0' : '₹' + (costRs/1000).toFixed(0) + ' K';
  const roi = costRs > 0 ? Math.round((recovCr*10000000) / costRs) : 0;
  document.getElementById('recvROI').textContent = costRs===0 ? '∞' : roi.toLocaleString('en-IN') + '×';
  document.getElementById('recvCount').textContent = wfState.active.size;
  document.getElementById('cmpNow').style.width = pct + '%';
  document.getElementById('cmpNowVal').textContent = pct.toFixed(0) + '%';
}

function recvApprove(){
  if (wfState.active.size === 0) { toast('Nothing to approve', 'Toggle at least one recovery lever', 'warn'); return; }
  const recovCr = +document.getElementById('recvTotal').textContent.replace(/[^\d.]/g,'');
  const costRs = document.getElementById('recvCost').textContent;
  const pct = document.getElementById('recvPct').textContent;
  const horizonLbl = WF_LBL[wfState.horizon];
  pushAction('Approved recovery package · ₹' + recovCr.toFixed(1) + 'Cr · ' + wfState.active.size + ' actions · ' + horizonLbl);
  showWorkflowComplete({
    title: 'Workflow complete · <em>recovery in motion</em>',
    sub: '₹' + recovCr.toFixed(1) + ' Cr committed · ' + wfState.active.size + ' actions routed in parallel · S&OP Friday',
    timeLbl: 'Recovery window',
    timeVal: wfState.horizon + 'd',
    changes: [
      'Inventory · East Depot transfer dispatched · Blinkit refill staged',
      'Finance · 2 distributor credit unblocks escalated to Arjun Kapoor',
      'Demand Planning · East Atta forecast correction routed to S&OP',
      'Production · monsoon reshuffle directive sent to Plants 2 + 5',
      '<strong>30-day plan</strong> · revenue forecast revised upward by ₹' + recovCr.toFixed(1) + ' Cr',
      'Board pack · auto-updated · ₹ at-risk number drops by ' + pct + ' on next refresh'
    ],
    newplan: [
      { lbl: '₹ at risk · ' + horizonLbl, before: '₹' + (WF_BASE.total*WF_MULTI[wfState.horizon]).toFixed(1)+' Cr', after: '₹' + ((WF_BASE.total*WF_MULTI[wfState.horizon])-recovCr).toFixed(1) + ' Cr' },
      { lbl: 'Recovery vs industry', before: '32% (industry)', after: pct + ' (us)' },
      { lbl: 'Cost to execute', before: 'n/a', after: costRs }
    ],
    routes: ['Vikram Mehta', 'Arjun Kapoor (CFO)', 'Rajiv Kumar (Inv)', 'Anjali Sharma (DP)', 'Plant Heads (2)', 'Board pack · live']
  });
  state.step = 4; updateJourney();
}

/* ═══════════════════════════════════════════════════════════
   FLAGSHIP 4 · CSCO EVENT RADAR · interactive
   ═══════════════════════════════════════════════════════════ */
const EVENTS = {
  monsoon: {
    name: 'Monsoon',
    eyebrow: '◐ Weather · Eastern India · base date Jun 10',
    days: 14,
    title: 'Monsoon · <em>7 SKUs in the line of fire</em>',
    meta: 'Prep window: <strong>7 days</strong> · Last year impact: <strong>₹3.2 Cr loss</strong> · Confidence: <strong>92%</strong>',
    cls: 'monsoon',
    retro: 'Last year, monsoon arrived 4 days earlier than forecast. <em>East depots ran short for 11 days on 7 SKUs.</em> ₹3.2 Cr revenue lost · ₹14 L emergency expedite cost.',
    tasks: [
      { id:'m1', name:'Production reshuffle weeks 23-26',           meta:'Plants 2 + 5 · biscuit + oil swap', due:'+3 days', impact:'₹1.4 Cr', done:true },
      { id:'m2', name:'Pre-stock East depots · 7 SKUs',              meta:'Patna + Kolkata + Bhubaneswar · ₹85K transit', due:'+5 days', impact:'₹2.1 Cr', done:true },
      { id:'m3', name:'Distributor comms · monsoon SKU mix shift',    meta:'244 East distributors · WhatsApp blast', due:'+2 days', impact:'comms',  done:false },
      { id:'m4', name:'Lock packaging supplier · waterproof film',    meta:'2 weeks lead · ₹3.5L PO', due:'+7 days', impact:'protect',  done:false },
      { id:'m5', name:'Insurance · in-transit weather rider',         meta:'12 lanes · marginal cost', due:'+5 days', impact:'₹40L cap', done:false }
    ]
  },
  diwali: {
    name: 'Diwali prep',
    eyebrow: '◇ Festive · pan-India · base date Aug 30',
    days: 95,
    title: 'Diwali · <em>23 SKUs · ₹8.5 Cr opportunity</em>',
    meta: 'Prep window: <strong>21 days</strong> · Last year revenue: <strong>+₹8.5 Cr</strong> · Confidence: <strong>78%</strong>',
    cls: 'diwali',
    retro: 'Last year, gift-pack SKUs sold out in week 1 of festive window. <em>Estimated ₹1.8 Cr left on the table.</em> Personal care and biscuit gift packs were the biggest gaps.',
    tasks: [
      { id:'d1', name:'Gift-pack production schedule',               meta:'Plants 1 + 4 · weeks 33-38 · 23 SKUs', due:'+21 days', impact:'₹8.5 Cr', done:false },
      { id:'d2', name:'Modern trade joint business plans',           meta:'Top 6 MT chains · ₹3.2 Cr commit', due:'+14 days', impact:'₹3.2 Cr', done:false },
      { id:'d3', name:'Q-Comm festive listing · all 4 platforms',     meta:'Blinkit + Zepto + Instamart + BB · API push', due:'+18 days', impact:'₹2.1 Cr', done:false },
      { id:'d4', name:'CFA capacity stress test',                     meta:'4 CFAs · +38% throughput needed', due:'+10 days', impact:'unblock', done:true },
      { id:'d5', name:'Distributor credit limits review',             meta:'Pre-festive volume push · ₹4 Cr exposure', due:'+12 days', impact:'protect', done:false },
      { id:'d6', name:'Marketing calendar alignment',                 meta:'TVC + digital + Q-Comm flash', due:'+9 days', impact:'demand pull', done:false }
    ]
  },
  bbd: {
    name: 'Q-Comm BBD',
    eyebrow: '◭ Q-Commerce · 4 platforms · base date Sep 22',
    days: 118,
    title: 'Big Billion Day · <em>11 SKUs · 8-day stage</em>',
    meta: 'Prep window: <strong>14 days</strong> · Last year revenue: <strong>+₹4.1 Cr</strong> · Confidence: <strong>85%</strong>',
    cls: 'bbd',
    retro: 'Last year, dark-store fill dropped to 79% during BBD peak. <em>₹1.1 Cr penalty + lost orders.</em> Velocity spikes outran our 24h replenishment.',
    tasks: [
      { id:'b1', name:'Dark-store pre-stocking · 11 SKUs',           meta:'24 stores · 8-day cover at 1.4× velocity', due:'+10 days', impact:'₹4.1 Cr', done:false },
      { id:'b2', name:'CFA → dark-store express lanes',              meta:'4 platforms · 3× daily replenishment', due:'+7 days', impact:'SLA hold', done:false },
      { id:'b3', name:'Platform JBP commitments lock',                meta:'Blinkit + Zepto · volume guarantees', due:'+5 days', impact:'₹2.4 Cr', done:true },
      { id:'b4', name:'War-room staffing · 8-day rotation',          meta:'Ops + supply + commercial · 24×7', due:'+12 days', impact:'response', done:false }
    ]
  }
};
let radarState = { event:'monsoon', stress:0 };

function radarSelect(key){
  radarState.event = key;
  document.querySelectorAll('.event-node').forEach(n=>n.classList.toggle('active', n.id==='evt_'+key));
  const ev = EVENTS[key];
  // Tasks done count
  const done = ev.tasks.filter(t=>t.done).length;
  const readiness = Math.round((done/ev.tasks.length)*100);
  // Render detail
  const html = `
    <div class="event-detail-head">
      <div class="event-detail-left">
        <div class="event-detail-eyebrow ${ev.cls}">${ev.eyebrow}</div>
        <div class="event-detail-title">${ev.title}</div>
        <div class="event-detail-meta">${ev.meta}</div>
      </div>
      <div class="event-detail-gauge">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-2)" stroke-width="8"/>
          <circle cx="50" cy="50" r="42" fill="none" stroke="${readiness>=70?'var(--ok)':readiness>=40?'var(--wn)':'var(--er)'}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${(readiness/100)*264} 264" style="filter:drop-shadow(0 0 4px currentColor);transition:stroke-dasharray .6s var(--ease)"/>
        </svg>
        <div class="event-detail-gauge-val">${readiness}%</div>
        <div class="event-detail-gauge-lbl">Ready</div>
      </div>
    </div>
    <div class="tasks">
      ${ev.tasks.map(t=>`
        <div class="task ${t.done?'done':''}" data-task="${t.id}" onclick="taskToggle('${t.id}')">
          <div class="task-check">${t.done?'✓':''}</div>
          <div>
            <div class="task-name">${t.name}</div>
            <div class="task-meta">${t.meta}</div>
          </div>
          <div class="task-due">due ${t.due}</div>
          <div class="task-impact">${t.impact}</div>
        </div>
      `).join('')}
    </div>
    <div class="retro">
      <div class="retro-lbl">Last year · retrospective</div>
      <div class="retro-text">${ev.retro}</div>
    </div>
  `;
  document.getElementById('evtDetail').innerHTML = html;
  document.getElementById('evtDetail').classList.add('show');
  document.getElementById('radarSub').innerHTML = `Selected: <strong style="color:var(--t-1)">${ev.name}</strong> · ${ev.days} days out · tick tasks to update readiness`;
}

function taskToggle(id){
  const ev = EVENTS[radarState.event];
  const t = ev.tasks.find(x=>x.id===id);
  t.done = !t.done;
  // Re-render this event
  radarSelect(radarState.event);
}

function stressUpdate(){
  const v = +document.getElementById('stressSlider').value;
  radarState.stress = v;
  document.getElementById('stressVal').textContent = (v>=0?'+':'') + v;
  // Move the selected event node on the radar
  const ev = radarState.event;
  const baseX = { monsoon:195, diwali:495, bbd:620 }[ev];
  const newX = baseX + (v * 4);  // 4px per day
  const dot = document.querySelector('#evt_'+ev+' circle:nth-child(3)');
  const halo = document.querySelector('#evt_'+ev+' circle:nth-child(2)');
  const lbl = document.querySelector('#evt_'+ev+' text:nth-child(4)');
  const days = document.querySelector('#evt_'+ev+' text:nth-child(5)');
  const line = document.querySelector('#evt_'+ev+' line');
  if (dot) dot.setAttribute('cx', newX);
  if (halo) halo.setAttribute('cx', newX);
  if (lbl) lbl.setAttribute('x', newX);
  if (days) days.setAttribute('x', newX);
  if (line) { line.setAttribute('x1', newX); line.setAttribute('x2', newX); }
  // Update label
  const baseDays = EVENTS[ev].days;
  const newDays = baseDays + v;
  if (days) days.textContent = '+' + newDays + ' DAYS';
  // Update readiness implication
  if (Math.abs(v) >= 5) {
    document.getElementById('radarSub').innerHTML = `<strong style="color:${v<0?'var(--er)':'var(--wn)'}">⚠ Stress test:</strong> ${EVENTS[ev].name} arrives ${v<0?Math.abs(v)+' days early':v+' days late'} · prep window compressed`;
  } else {
    document.getElementById('radarSub').innerHTML = `Selected: <strong style="color:var(--t-1)">${EVENTS[ev].name}</strong> · ${EVENTS[ev].days+v} days out · tick tasks to update readiness`;
  }
}

function radarApprove(){
  const ev = EVENTS[radarState.event];
  const done = ev.tasks.filter(t=>t.done).length;
  const open = ev.tasks.length - done;
  showWorkflowComplete({
    title: 'Workflow complete · <em>playbook activated</em>',
    sub: ev.name + ' · ' + ev.tasks.length + ' tasks tracked · readiness loop live',
    timeLbl: 'Next checkpoint',
    timeVal: 'Friday S&OP',
    changes: [
      'Ops · ' + open + ' open tasks routed to plant + logistics leads',
      'Planning · production reshuffle for ' + ev.name + ' window committed',
      'Sales · East distributor comms scheduled (244 distributors · WhatsApp)',
      'CFA · capacity check triggered · stress test results in 24h',
      'CalvinBall · readiness gauge now tracked daily on this cockpit'
    ],
    newplan: [
      { lbl: ev.name + ' readiness', before: Math.round((done/ev.tasks.length)*100)+'%', after: '100% by ' + ev.days/2 + 'd' },
      { lbl: 'Last-yr loss prevented', before: 'unaddressed', after: '70-90%' },
      { lbl: 'Tasks tracked', before: '0', after: ev.tasks.length }
    ],
    routes: ['Plant heads', 'East CFA', 'Sales · GT', 'CSCO (CC)']
  });
  state.step = 4; updateJourney();
  pushAction('Activated ' + ev.name + ' playbook · ' + ev.tasks.length + ' tasks');
  toast(ev.name + ' playbook activated', open + ' tasks routed · ops + planning + sales notified', 'ok');
}

/* ═══════════════════════════════════════════════════════════
   WORKFLOW COMPLETION · shared component
   ═══════════════════════════════════════════════════════════ */
function showWorkflowComplete(opts){
  // Remove any prior completion panels in this modal
  document.querySelectorAll('.screen-body .complete').forEach(el=>el.remove());
  const panel = document.createElement('div');
  panel.className = 'complete show';
  panel.innerHTML = `
    <div class="complete-head">
      <div class="complete-icon">✓</div>
      <div class="complete-text">
        <div class="complete-title">${opts.title || 'Workflow complete'}</div>
        <div class="complete-sub">${opts.sub || ''}</div>
      </div>
      ${opts.timeVal ? `<div class="complete-time">
        <div class="complete-time-val">${opts.timeVal}</div>
        <div>${opts.timeLbl || ''}</div>
      </div>` : ''}
    </div>
    <div class="complete-body">
      ${opts.changes && opts.changes.length ? `
        <div class="complete-section">
          <div class="complete-section-lbl">◆ State changes · what just happened</div>
          <div class="complete-changes">
            ${opts.changes.map(c=>`<div class="complete-change"><span class="complete-change-check">✓</span><div>${c}</div></div>`).join('')}
          </div>
        </div>
      ` : ''}
      ${opts.newplan && opts.newplan.length ? `
        <div class="complete-section">
          <div class="complete-section-lbl">◆ New plan · loaded into systems</div>
          <div class="complete-newplan">
            ${opts.newplan.map(np=>`<div class="complete-newplan-cell">
              <div class="complete-newplan-lbl">${np.lbl}</div>
              <div><span class="complete-newplan-before">${np.before}</span> <span class="complete-newplan-arrow">→</span></div>
              <div class="complete-newplan-after">${np.after}</div>
            </div>`).join('')}
          </div>
        </div>
      ` : ''}
    </div>
    ${opts.routes && opts.routes.length ? `
      <div class="complete-foot">
        <div class="complete-foot-routes">
          ${opts.routes.map(r=>`<span class="complete-route">${r}</span>`).join('')}
        </div>
        <button class="btn btn-ghost" onclick="closeModal()">Close & continue</button>
      </div>
    ` : ''}
  `;
  // Insert after action box, or at end of modal body
  const body = document.querySelector('.screen-body');
  const action = body && body.querySelector('.action');
  if (action) action.parentNode.insertBefore(panel, action.nextSibling);
  else if (body) body.appendChild(panel);
  // Hide action buttons (so user doesn't double-approve)
  if (action) {
    const buttons = action.querySelector('.action-buttons');
    if (buttons) buttons.style.opacity = '.4';
    if (buttons) buttons.style.pointerEvents = 'none';
  }
  // Scroll panel into view
  setTimeout(()=>panel.scrollIntoView({behavior:'smooth', block:'center'}), 150);
}

/* Track recent approvals so AI widget can reference them in conversation */
function pushAction(label){
  if (!state.recentActions) state.recentActions = [];
  state.recentActions.unshift({ label, time: new Date(), persona: state.persona, cell: state.currentCell });
  state.recentActions = state.recentActions.slice(0, 6);
}

/* ═══════════════════════════════════════════════════════════
   FLAGSHIP 5 · Q-COMMERCE REROUTING SIMULATOR
   ═══════════════════════════════════════════════════════════ */
// 24 stores arranged 4 clusters × 6 stores
// id, cluster, x, y, baseFill (0-100), refillKey or null
const STORES = [
  // Blinkit · top-left (x: 60-340, y: 60-180)
  { id:'DS-01', name:'Andheri W',    plat:'Blinkit',   x: 90, y: 90,  baseFill:62, refillKey:'s1',  red:true, area:'Andheri West' },
  { id:'DS-02', name:'Andheri E',    plat:'Blinkit',   x:160, y:130, baseFill:91, red:false, area:'Andheri East' },
  { id:'DS-03', name:'Goregaon',     plat:'Blinkit',   x:240, y: 75, baseFill:97, red:false, area:'Goregaon W' },
  { id:'DS-04', name:'Malad',        plat:'Blinkit',   x:310, y:120, baseFill:99, red:false, area:'Malad West' },
  { id:'DS-05', name:'Versova',      plat:'Blinkit',   x: 70, y:165, baseFill:88, red:false, area:'Versova' },
  { id:'DS-06', name:'Borivali',     plat:'Blinkit',   x:340, y: 60, baseFill:94, red:false, area:'Borivali W' },

  // Zepto · top-right
  { id:'DS-07', name:'Powai',        plat:'Zepto',     x:440, y: 75, baseFill:96, red:false, area:'Powai' },
  { id:'DS-08', name:'Vikhroli',     plat:'Zepto',     x:520, y:115, baseFill:93, red:false, area:'Vikhroli' },
  { id:'DS-09', name:'Bandra E',     plat:'Zepto',     x:600, y: 90, baseFill:67, refillKey:'s9', red:true, area:'Bandra East' },
  { id:'DS-10', name:'Khar',         plat:'Zepto',     x:680, y:130, baseFill:91, red:false, area:'Khar' },
  { id:'DS-11', name:'Santacruz',    plat:'Zepto',     x:450, y:160, baseFill:89, red:false, area:'Santacruz' },
  { id:'DS-12', name:'Juhu',         plat:'Zepto',     x:710, y: 70, baseFill:97, red:false, area:'Juhu' },

  // Instamart · bottom-left
  { id:'DS-13', name:'Lower Parel',  plat:'Instamart', x: 90, y:250, baseFill:92, red:false, area:'Lower Parel' },
  { id:'DS-14', name:'Worli',        plat:'Instamart', x:170, y:290, baseFill:95, red:false, area:'Worli' },
  { id:'DS-15', name:'Mahalakshmi',  plat:'Instamart', x:250, y:255, baseFill:98, red:false, area:'Mahalakshmi' },
  { id:'DS-16', name:'Prabhadevi',   plat:'Instamart', x:330, y:295, baseFill:90, red:false, area:'Prabhadevi' },
  { id:'DS-17', name:'Dadar',        plat:'Instamart', x: 70, y:330, baseFill:71, refillKey:'s17', red:true, area:'Dadar West' },
  { id:'DS-18', name:'Matunga',      plat:'Instamart', x:330, y:340, baseFill:93, red:false, area:'Matunga' },

  // BigBasket · bottom-right
  { id:'DS-19', name:'BKC',          plat:'BigBasket', x:450, y:250, baseFill:98, red:false, area:'BKC' },
  { id:'DS-20', name:'Kurla',        plat:'BigBasket', x:530, y:285, baseFill:96, red:false, area:'Kurla' },
  { id:'DS-21', name:'Ghatkopar',    plat:'BigBasket', x:610, y:255, baseFill:95, red:false, area:'Ghatkopar' },
  { id:'DS-22', name:'Mulund',       plat:'BigBasket', x:690, y:295, baseFill:97, red:false, area:'Mulund' },
  { id:'DS-23', name:'Sion',         plat:'BigBasket', x:450, y:335, baseFill:94, red:false, area:'Sion' },
  { id:'DS-24', name:'Chembur',      plat:'BigBasket', x:710, y:335, baseFill:96, red:false, area:'Chembur' },
];

const MODE_CFG = {
  off:          { radius:0,  rerouteFactor:0,    label:'Off',          fillBoost:0,  ordersPerSec:0.7, lostMul:1.0 },
  conservative: { radius:80, rerouteFactor:0.45, label:'Conservative', fillBoost:3,  ordersPerSec:0.7, lostMul:0.55 },
  standard:     { radius:130,rerouteFactor:0.72, label:'Standard',     fillBoost:6,  ordersPerSec:0.7, lostMul:0.30 },
  aggressive:   { radius:200,rerouteFactor:0.95, label:'Aggressive',   fillBoost:9,  ordersPerSec:0.7, lostMul:0.10 },
};

let qcState = {
  mode:'standard',
  selected:null,
  refill:{ s1:0, s9:0, s17:0 },
  running:true,
  clockSec:0,
  ordersTotal:0,
  reroutesTotal:0,
  lostTotal:0
};
let _qcTick = null;
let _qcOrderTick = null;

function qcRender(){
  const cfg = MODE_CFG[qcState.mode];
  const storesG = document.getElementById('qmapStores');
  if (!storesG) return;

  // Effective fill per store (base + refill effect)
  storesG.innerHTML = STORES.map(s=>{
    let fill = s.baseFill;
    if (s.refillKey && qcState.refill[s.refillKey]) {
      // every 1000 units adds ~7 fill points (cap at 98)
      fill = Math.min(98, fill + (qcState.refill[s.refillKey]/1000)*7);
    }
    const fillCls = fill >= 95 ? 'ok' : fill >= 88 ? 'wn' : 'er';
    const haloFill = fillCls === 'er' ? 'url(#hr_er)' : fillCls === 'wn' ? 'url(#hr_wn)' : 'url(#hr_ok)';
    const dotColor = fillCls === 'er' ? '#f87171' : fillCls === 'wn' ? '#fbbf24' : '#86efac';
    const dotR = fillCls === 'er' ? 9 : fillCls === 'wn' ? 8 : 7;
    const haloR = fillCls === 'er' ? 28 : fillCls === 'wn' ? 22 : 18;
    const isSel = qcState.selected === s.id ? ' selected' : '';
    return `<g class="store${isSel}" data-store="${s.id}" onclick="qcSelectStore('${s.id}')">
      <circle class="store-halo" cx="${s.x}" cy="${s.y}" r="${haloR}" fill="${haloFill}"/>
      <circle class="store-dot" cx="${s.x}" cy="${s.y}" r="${dotR}" fill="${dotColor}" stroke="rgba(0,0,0,.45)" stroke-width="1"/>
      <text x="${s.x}" y="${s.y+dotR+12}" font-family="Geist Mono" font-size="9" fill="#8b8b95" text-anchor="middle">${s.id}</text>
    </g>`;
  }).join('');

  // Rerouting paths — draw from each red/amber store to nearest green within radius
  const pathsG = document.getElementById('qmapPaths');
  if (cfg.radius === 0) {
    pathsG.innerHTML = '';
  } else {
    const paths = [];
    STORES.forEach(src=>{
      let fill = src.baseFill;
      if (src.refillKey && qcState.refill[src.refillKey]) fill = Math.min(98, fill + (qcState.refill[src.refillKey]/1000)*7);
      if (fill >= 95) return; // only reroute from non-green
      // Find nearest store within radius that's green
      let nearest = null, nearestDist = Infinity;
      STORES.forEach(tgt=>{
        if (tgt.id === src.id) return;
        let tFill = tgt.baseFill;
        if (tgt.refillKey && qcState.refill[tgt.refillKey]) tFill = Math.min(98, tFill + (qcState.refill[tgt.refillKey]/1000)*7);
        if (tFill < 95) return;
        const d = Math.hypot(src.x-tgt.x, src.y-tgt.y);
        if (d < cfg.radius && d < nearestDist) { nearest = tgt; nearestDist = d; }
      });
      if (nearest) {
        paths.push(`<path class="reroute-path show" d="M ${src.x} ${src.y} Q ${(src.x+nearest.x)/2} ${(src.y+nearest.y)/2 - 12} ${nearest.x} ${nearest.y}"/>`);
      }
    });
    pathsG.innerHTML = paths.join('');
  }

  // Update mode label
  document.getElementById('qmapModeLbl').textContent = cfg.label + ' mode';
  document.getElementById('qmapSub').textContent = cfg.radius === 0
    ? '4 platforms · 24 dark stores · rerouting disabled'
    : `4 platforms · 24 dark stores · reroute radius ${cfg.radius/16} km`;

  qcUpdateMetrics();
}

function qcUpdateMetrics(){
  const cfg = MODE_CFG[qcState.mode];
  // Network fill = avg of all stores, weighted up by mode boost + refill effects
  let totalFill = 0; let count = 0;
  STORES.forEach(s=>{
    let f = s.baseFill;
    if (s.refillKey && qcState.refill[s.refillKey]) f = Math.min(98, f + (qcState.refill[s.refillKey]/1000)*7);
    totalFill += f; count++;
  });
  let avgFill = Math.round(totalFill/count);
  // Mode boost (rerouting hides failures)
  avgFill = Math.min(99, avgFill + cfg.fillBoost);

  const fillCls = avgFill >= 95 ? 'ok' : avgFill >= 88 ? 'wn' : 'er';
  document.getElementById('mv_fill').textContent = avgFill + '%';
  document.getElementById('mv_fill').className = 'metric-val ' + fillCls;
  document.getElementById('m_fill').className = 'metric ' + fillCls + (qcState.running?' running':'');

  // Orders per min
  const ordersPerMin = 42 + Math.round(Math.random()*8 - 4);
  document.getElementById('mv_orders').textContent = ordersPerMin;

  // Reroutes
  const reroutes = cfg.radius === 0 ? 0 : Math.round((cfg.rerouteFactor * 10) + Math.random()*4 - 2);
  document.getElementById('mv_reroutes').textContent = reroutes;
  const rCls = reroutes === 0 ? 'er' : reroutes > 8 ? 'wn' : 'ok';
  document.getElementById('mv_reroutes').className = 'metric-val ' + rCls;
  document.getElementById('m_reroutes').className = 'metric ' + rCls + (qcState.running?' running':'');

  // Lost orders (depends on red stores + mode)
  const refillTotal = qcState.refill.s1 + qcState.refill.s9 + qcState.refill.s17;
  const redStoresLeft = Math.max(0, 3 - Math.floor(refillTotal/2500));
  const baseLost = (redStoresLeft * 3) + 1;
  const lost = Math.round(baseLost * cfg.lostMul);
  document.getElementById('mv_lost').textContent = lost;
  const lostCls = lost <= 1 ? 'ok' : lost <= 4 ? 'wn' : 'er';
  document.getElementById('mv_lost').className = 'metric-val ' + lostCls;
  document.getElementById('m_lost').className = 'metric ' + lostCls + (qcState.running?' running':'');

  // Penalty risk (₹)
  const penaltyLakh = (lost * 0.4 + (95-avgFill) * 0.3).toFixed(1);
  const pCls = penaltyLakh < 1 ? 'ok' : penaltyLakh < 3 ? 'wn' : 'er';
  document.getElementById('mv_penalty').textContent = '₹' + (penaltyLakh<0?0:penaltyLakh) + ' L';
  document.getElementById('mv_penalty').className = 'metric-val ' + pCls;
  document.getElementById('m_penalty').className = 'metric ' + pCls + (qcState.running?' running':'');
}

function qcMode(mode){
  qcState.mode = mode;
  document.querySelectorAll('.mode-btn').forEach(b=>b.classList.toggle('active', b.dataset.mode===mode));
  qcRender();
  toast('Mode: ' + MODE_CFG[mode].label, MODE_CFG[mode].radius===0?'Rerouting disabled':'Reroute radius '+(MODE_CFG[mode].radius/16)+' km', 'info');
}

function qcSelectStore(id){
  qcState.selected = id;
  qcRender();
  const s = STORES.find(x=>x.id===id);
  let fill = s.baseFill;
  if (s.refillKey && qcState.refill[s.refillKey]) fill = Math.min(98, fill + (qcState.refill[s.refillKey]/1000)*7);
  const fillCls = fill >= 95 ? 'ok' : fill >= 88 ? 'wn' : 'er';
  const cover = Math.round((fill-50)*0.45 + 14);
  // Nearby stores within mode radius
  const cfg = MODE_CFG[qcState.mode];
  const nearby = STORES.filter(t=>t.id!==id && Math.hypot(t.x-s.x, t.y-s.y) < (cfg.radius||999))
    .sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y))
    .slice(0,3);
  const html = `
    <div class="store-detail-head">
      <div class="store-detail-left">
        <div class="store-detail-eyebrow">◆ ${s.plat} · ${s.area} · DS-${s.id.split('-')[1]}</div>
        <div class="store-detail-title">${s.area}<span style="font-family:var(--mono);font-size:14px;color:var(--t-3);font-weight:400;margin-left:10px">${s.plat}</span></div>
        <div class="store-detail-meta">Coordinates ${s.x}·${s.y} on Mumbai network grid · live · 30-min refresh</div>
      </div>
      <div class="store-detail-stat">
        <div class="store-detail-stat-cell"><div class="store-detail-stat-val ${fillCls}">${Math.round(fill)}%</div><div class="store-detail-stat-lbl">Fill rate</div></div>
        <div class="store-detail-stat-cell"><div class="store-detail-stat-val ${fillCls}">${cover}h</div><div class="store-detail-stat-lbl">Cover left</div></div>
      </div>
    </div>
    <div class="store-detail-row">
      <div class="store-detail-block">
        <div class="store-detail-block-lbl">${s.red?'Why red':'Health snapshot'}</div>
        <div class="store-detail-block-val">${s.red
          ? `Velocity spike on <strong>3 SKUs</strong> (Noodles, Atta, Soap) drove cover below 24h. <em>${cfg.radius>0?'Reroutes active':'No reroutes — orders failing'}.</em>`
          : `On-SLA. Velocity stable. <strong>${cfg.radius>0?'Available as reroute target.':'Reroute disabled in current mode.'}</strong>`}</div>
      </div>
      <div class="store-detail-block">
        <div class="store-detail-block-lbl">Within reroute radius</div>
        <div class="store-detail-block-val">${nearby.length===0 ? 'No stores in mode radius — increase mode or refill.' : nearby.map(n=>{
          let nf = n.baseFill;
          if (n.refillKey && qcState.refill[n.refillKey]) nf = Math.min(98, nf + (qcState.refill[n.refillKey]/1000)*7);
          const ncls = nf >= 95 ? 'ok' : nf >= 88 ? 'wn' : 'er';
          const km = (Math.hypot(n.x-s.x, n.y-s.y) / 16).toFixed(1);
          return `<strong>${n.id}</strong> · ${n.plat} ${n.area} · <span style="color:var(--${ncls==='ok'?'ok':ncls==='wn'?'wn':'er'})">${Math.round(nf)}%</span> · ${km} km`;
        }).join('<br/>')}</div>
      </div>
    </div>`;
  const det = document.getElementById('storeDetail');
  det.innerHTML = html;
  det.classList.add('show');
}

function refillAdjust(key, v){
  qcState.refill[key] = +v;
  document.getElementById('refillVal_'+key).textContent = (+v).toLocaleString('en-IN') + ' u';
  const total = qcState.refill.s1 + qcState.refill.s9 + qcState.refill.s17;
  document.getElementById('refillUsed').textContent = total.toLocaleString('en-IN');
  document.getElementById('refillPoolFill').style.width = Math.min(100, (total/8000)*100) + '%';
  qcRender();
}

function qcPlayToggle(){
  qcState.running = !qcState.running;
  document.getElementById('simDot').classList.toggle('paused', !qcState.running);
  document.getElementById('simPlayBtn').textContent = qcState.running ? '⏸ Pause' : '▶ Resume';
  document.getElementById('simStatusText').textContent = qcState.running ? 'Simulation running · 0.5× speed' : 'Simulation paused';
  document.querySelectorAll('.metric').forEach(m=>m.classList.toggle('running', qcState.running));
}

function qcFireOrderPulse(){
  if (!qcState.running) return;
  const cfg = MODE_CFG[qcState.mode];
  // Pick a random source store (bias toward red)
  const reds = STORES.filter(s=>{
    let f = s.baseFill;
    if (s.refillKey && qcState.refill[s.refillKey]) f = Math.min(98, f + (qcState.refill[s.refillKey]/1000)*7);
    return f < 95;
  });
  const greens = STORES.filter(s=>{
    let f = s.baseFill;
    if (s.refillKey && qcState.refill[s.refillKey]) f = Math.min(98, f + (qcState.refill[s.refillKey]/1000)*7);
    return f >= 95;
  });
  if (greens.length === 0) return;
  const src = (reds.length > 0 && Math.random() < 0.7) ? reds[Math.floor(Math.random()*reds.length)] : STORES[Math.floor(Math.random()*STORES.length)];
  let srcFill = src.baseFill;
  if (src.refillKey && qcState.refill[src.refillKey]) srcFill = Math.min(98, srcFill + (qcState.refill[src.refillKey]/1000)*7);

  // If green, just pulse at the store
  if (srcFill >= 95 || cfg.radius === 0) {
    qcFirePulseAt(src.x, src.y, src.x, src.y);
    return;
  }
  // Find nearest green within radius
  let nearest = null, nearestDist = Infinity;
  greens.forEach(t=>{
    const d = Math.hypot(src.x-t.x, src.y-t.y);
    if (d < cfg.radius && d < nearestDist) { nearest = t; nearestDist = d; }
  });
  if (nearest) {
    qcFirePulseAt(src.x, src.y, nearest.x, nearest.y);
  } else {
    qcFirePulseAt(src.x, src.y, src.x, src.y);
  }
}

function qcFirePulseAt(x1, y1, x2, y2){
  const pulses = document.getElementById('qmapPulses');
  if (!pulses) return;
  const id = 'pulse_'+Math.random().toString(36).slice(2,7);
  const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
  c.setAttribute('cx', x1); c.setAttribute('cy', y1);
  c.setAttribute('r', 3); c.setAttribute('fill', x1===x2?'#86efac':'#c084fc');
  c.style.transition = 'cx 1.3s ease-out, cy 1.3s ease-out, opacity 1.3s';
  c.style.opacity = 1;
  pulses.appendChild(c);
  requestAnimationFrame(()=>{
    c.setAttribute('cx', x2);
    c.setAttribute('cy', y2);
    c.style.opacity = 0;
  });
  setTimeout(()=>c.remove(), 1400);
}

function qcStartLoops(){
  qcStopLoops();
  // Metric refresh every 2s
  _qcTick = setInterval(()=>{
    if (!qcState.running) return;
    qcState.clockSec += 2;
    const m = Math.floor(qcState.clockSec/60), s = qcState.clockSec%60;
    document.getElementById('simClock').textContent = String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
    qcUpdateMetrics();
  }, 2000);
  // Order pulse every 900ms
  _qcOrderTick = setInterval(qcFireOrderPulse, 900);
}
function qcStopLoops(){
  if (_qcTick) clearInterval(_qcTick); _qcTick = null;
  if (_qcOrderTick) clearInterval(_qcOrderTick); _qcOrderTick = null;
}

function qcApprove(){
  const cfg = MODE_CFG[qcState.mode];
  const refillTotal = qcState.refill.s1 + qcState.refill.s9 + qcState.refill.s17;
  const fillVal = document.getElementById('mv_fill').textContent;
  const lostVal = document.getElementById('mv_lost').textContent;
  pushAction('Deployed Q-Comm config · ' + cfg.label + ' · ' + refillTotal + 'u refill');
  showWorkflowComplete({
    title: 'Workflow complete · <em>rerouting deployed</em>',
    sub: cfg.label + ' mode · ' + refillTotal.toLocaleString('en-IN') + 'u refill in motion · SLA protection live',
    timeLbl: 'CFA dispatch',
    timeVal: '15 min',
    changes: [
      'Routing engine · ' + cfg.label + ' mode deployed across 4 platforms',
      'CFA Mumbai · ' + refillTotal.toLocaleString('en-IN') + ' units allocated to ' + Object.values(qcState.refill).filter(v=>v>0).length + ' dark stores',
      'Blinkit + Zepto + Instamart + BB · API config updated with new fallback radius',
      'Penalty risk window · 18h Blinkit SLA breach averted',
      '<strong>Q-Comm plan</strong> · next 7d dark-store replenishment recalibrated',
      'War-room · alert suppressed for next 6h on these 3 stores'
    ],
    newplan: [
      { lbl: 'Network fill', before: '88%', after: fillVal },
      { lbl: 'Lost orders / min', before: '7', after: lostVal },
      { lbl: 'Penalty exposure', before: '₹2.4 L', after: refillTotal>=7000?'₹0':'₹0.4 L' }
    ],
    routes: ['Priya Nair (Q-Comm)', 'Vikram Mehta (CC)', 'CFA Mumbai', 'Platform APIs · live']
  });
  state.step = 4; updateJourney();
  qcStopLoops();
}


/* Consensus Workbook / Forecast Viewer filters (v0.9) —
   category / channel / location selects combine with the free-text search.
   Empty category headers hide themselves so groups don't leave orphan labels. */
function val(id) { const el: any = document.getElementById(id); return el ? el.value : 'all'; }

/* Forecast Viewer: the chart + KPI cards are driven off the *visible* rows, so
   changing a filter re-derives accuracy/MAPE/bias/FVA and redraws the demand
   chart (forecast slope from bias, confidence-band width from accuracy). The
   pristine portfolio view (all/all) is snapshotted once and restored verbatim. */
let fvOrig: any = null;
function fvCapture() {
  if (fvOrig) return;
  const c = document.getElementById('fvChartData');
  const k = document.getElementById('fvKpis');
  if (c && k) fvOrig = { chart: c.innerHTML, kpis: k.innerHTML };
}
function fvRestore() {
  if (!fvOrig) return;
  const c = document.getElementById('fvChartData'); if (c) c.innerHTML = fvOrig.chart;
  const k = document.getElementById('fvKpis'); if (k) k.innerHTML = fvOrig.kpis;
}
function fvNum(t) { return parseFloat((t || '').replace('−', '-').replace(/[+%\s]/g, '')) || 0; }
function fvHash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

function fvDrawChart(acc, bias, seedStr) {
  const g = document.getElementById('fvChartData'); if (!g) return;
  let s = fvHash(seedStr || 'all') || 1;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const x0 = 60, xNow = 560, x1 = 880, yNow = 158;
  const hist: any[] = [];
  for (let i = 0; i < 14; i++) {
    const t = i / 13;
    hist.push([x0 + (xNow - x0) * t, 226 - t * (226 - yNow) + (rnd() - 0.5) * 8]);
  }
  hist[13] = [xNow, yNow];
  const slope = Math.max(8, 20 + (-bias) * 4);              // bias correction → forecast rise
  const bandW = Math.min(36, Math.max(6, (92 - acc) * 1.35 + 6)); // lower accuracy → wider band
  const enh: any[] = [], base: any[] = [], top: any[] = [], bot: any[] = [];
  for (let i = 0; i < 8; i++) {
    const t = i / 7, x = xNow + (x1 - xNow) * t;
    const ey = yNow - slope * (0.55 * t + 0.45 * t * t);
    enh.push([x, ey]); base.push([x, yNow - slope * 0.35 * t]);
    top.push([x, ey - bandW * t]); bot.push([x, ey + bandW * t]);
  }
  const P = (a) => a.map((p) => p[0].toFixed(0) + ',' + p[1].toFixed(0)).join(' ');
  const bandD = 'M ' + top.map((p) => p[0].toFixed(0) + ' ' + p[1].toFixed(0)).join(' L ')
    + ' L ' + bot.slice().reverse().map((p) => p[0].toFixed(0) + ' ' + p[1].toFixed(0)).join(' L ') + ' Z';
  const dot = enh[7];
  g.innerHTML =
    '<path d="' + bandD + '" fill="rgba(192,132,252,.13)" stroke="rgba(192,132,252,.30)" stroke-width="0.5"/>'
    + '<line x1="560" y1="40" x2="560" y2="250" stroke="#3d3d46" stroke-width="1" stroke-dasharray="3,3"/>'
    + '<polyline points="' + P(hist) + '" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>'
    + '<polyline points="' + P(base) + '" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,4" stroke-linecap="round"/>'
    + '<polyline points="' + P(enh) + '" fill="none" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<circle cx="' + dot[0].toFixed(0) + '" cy="' + dot[1].toFixed(0) + '" r="3.5" fill="#c084fc"/>';
}

function fvApply(stats, seed, shown) {
  if (!stats.length) return;
  const avg = (k) => stats.reduce((a, b) => a + b[k], 0) / stats.length;
  const acc = avg('acc'), mape = avg('mape'), bias = avg('bias'), fva = avg('fva');
  const set = (id, txt) => { const e = document.getElementById(id); if (e) e.textContent = txt; };
  const cls = (id, c) => { const e = document.getElementById(id); if (e) e.className = c; };
  set('fvkAcc', Math.round(acc) + '%');
  set('fvkFva', '+' + Math.round(fva) + ' pts');
  set('fvkMape', mape.toFixed(1) + '%');
  set('fvkBias', (bias >= 0 ? '+' : '−') + Math.abs(bias).toFixed(1) + '%');
  set('fvkVmape', (mape * 1.07).toFixed(1) + '%');
  const accOk = acc >= 75;
  cls('fvcAcc', 'kpi ' + (accOk ? 'ok' : 'wn')); cls('fvkAcc', 'kpi-val ' + (accOk ? 'ok' : 'wn'));
  set('fvkAccD', shown + (shown === 1 ? ' SKU' : ' SKUs') + ' in view · target 75%');
  const biasOk = Math.abs(bias) < 1;
  cls('fvcBias', 'kpi ' + (biasOk ? 'ok' : 'wn')); cls('fvkBias', 'kpi-val ' + (biasOk ? 'ok' : 'wn'));
  set('fvkBiasD', bias < 0 ? 'under-forecast' : 'over-forecast');
  fvDrawChart(acc, bias, seed);
}

function fvFilter() {
  const body = document.getElementById('fvtBody'); if (!body) return;
  fvCapture();
  const cat = val('fvCat'), ch = val('fvCh');
  const q = ((document.getElementById('fvSearch') as any)?.value || '').toLowerCase().trim();
  let header: any = null, headerCount = 0, shown = 0;
  const stats: any[] = [];
  const flush = () => { if (header) header.style.display = headerCount ? '' : 'none'; };
  Array.prototype.forEach.call(body.children, function (el: any) {
    if (el.classList.contains('fv-cat-row')) { flush(); header = el; headerCount = 0; return; }
    if (!el.classList.contains('fvt-row')) return;
    const rowCat = header ? header.textContent.split('·')[0].trim() : '';
    const chCell = el.querySelector('.fvt-num');
    const rowCh = chCell ? chCell.textContent.trim() : '';
    const ok = (cat === 'all' || rowCat === cat)
      && (ch === 'all' || rowCh === ch)
      && (!q || el.textContent.toLowerCase().indexOf(q) > -1);
    el.style.display = ok ? '' : 'none';
    if (ok) {
      shown++; headerCount++;
      const nums = el.querySelectorAll('.fvt-num'); // [channel, accuracy, mape, bias, fva]
      if (nums.length >= 5) stats.push({
        acc: fvNum(nums[1].textContent), mape: fvNum(nums[2].textContent),
        bias: fvNum(nums[3].textContent), fva: fvNum(nums[4].textContent),
      });
    }
  });
  flush();
  const e = document.getElementById('fvtEmpty'); if (e) e.style.display = shown ? 'none' : 'block';
  const c = document.getElementById('fvtCount'); if (c) c.textContent = shown + ' of 184 shown';
  if (shown === 0 || (cat === 'all' && ch === 'all' && !q)) fvRestore();
  else fvApply(stats, cat + '|' + ch, shown);
}

function wbFilter() {
  const body = document.getElementById('wbBody'); if (!body) return;
  const cat = val('wbCat'), dc = val('wbDc'), ch = val('wbCh');
  const q = ((document.getElementById('wbSearch') as any)?.value || '').toLowerCase().trim();
  let header: any = null, headerCount = 0;
  const flush = () => { if (header) header.style.display = headerCount ? '' : 'none'; };
  Array.prototype.forEach.call(body.children, function (el: any) {
    if (el.classList.contains('fv-cat-row')) { flush(); header = el; headerCount = 0; return; }
    if (!el.classList.contains('wb-row')) return;
    const rowCat = header ? header.textContent.split('·')[0].trim() : '';
    const sub = el.querySelector('.wb-sub');
    const parts = sub ? sub.textContent.split('·').map((s: string) => s.trim()) : [];
    const rowDc = parts[0] || '', rowCh = parts[1] || '';
    const ok = (cat === 'all' || rowCat === cat)
      && (dc === 'all' || rowDc === dc)
      && (ch === 'all' || rowCh === ch)
      && (!q || el.textContent.toLowerCase().indexOf(q) > -1);
    el.style.display = ok ? '' : 'none';
    if (ok) headerCount++;
  });
  flush();
}

/* search inputs keep their old handler name but now route through the combined filter */
function fvSearch() { fvFilter(); }
function wbSearch() { wbFilter(); }

/* expose engine functions on window so inline onclick handlers in injected HTML resolve */
Object.assign(window as any, {
  simSource, simScenario, simUpdate, simApprove,
  stackProfile, stackUpdate, toggleProv, stackApprove, drawBacktest,
  wfHorizon, recvToggle, wfUpdate, recvApprove,
  radarSelect, taskToggle, stressUpdate, radarApprove,
  showWorkflowComplete, pushAction,
  qcRender, qcUpdateMetrics, qcMode, qcSelectStore, refillAdjust,
  qcPlayToggle, qcFireOrderPulse, qcStartLoops, qcStopLoops, qcApprove,
  wbToggle, wbCount, wbStage, wbSearch, fvSearch, fvFilter, wbFilter,
});
export { wbCount, fvFilter, wbFilter };

/* Cell init helpers — called by the React modal once a flagship cell's HTML is mounted.
   Mirrors the setTimeout(...) initializers from the original openCell wrappers. */
export function initSim() {
  simState = { source: 'west', qty: 8000 };
  simUpdate();
}
export function initStack() {
  sigState = { profile: 'all' };
  stackUpdate();
}
export function initWaterfall() {
  wfState = { horizon: 30, active: new Set(['east', 'bnk', 'd1', 'd2', 'fc', 'prod']) };
  wfUpdate();
}
export function initRadar() {
  radarState = { event: 'monsoon', stress: 0 };
  radarSelect('monsoon');
}
export function initQcomm() {
  qcState = {
    mode: 'standard', selected: null, refill: { s1: 0, s9: 0, s17: 0 },
    running: true, clockSec: 0, ordersTotal: 0, reroutesTotal: 0, lostTotal: 0,
  };
  qcRender();
  qcStartLoops();
}
export { qcStopLoops };