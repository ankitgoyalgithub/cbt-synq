// @ts-nocheck
/* Ask CalvinBall conversational engine — ported verbatim from v0.9. */
/* eslint-disable */
import { state } from './shell';
import { PERSONAS } from '../data/personas';

function generateAskReply(q){
  const ql = q.toLowerCase().trim();
  const p = PERSONAS[state.persona];
  const recent = state.recentActions || [];
  const lastAction = recent[0];
  const lastQ = state.askHistory && state.askHistory.length > 1 ? state.askHistory[state.askHistory.length-3] : null;

  // ─── Identity & meta ───
  if (/^(who are you|what are you|introduce yourself|tell me about yourself)/.test(ql))
    return { time:1.4, html:`I'm <strong>CalvinBall</strong> — a decision intelligence layer that sits above your existing systems (SAP S/4 HANA, DMS, WMS, Q-Comm APIs). I don't replace them. <br/><br/>What I do for <strong>${p.first}</strong> right now: hold a Context Graph (~22K tokens per query) across your <strong>6 plants, 28 depots, 4 channels, 184 SKUs</strong>; watch for changes every 30 minutes; and when something matters, surface it as a <em>decision</em> — with reasoning, sources, projected impact, and a one-click execute path. <br/><br/>I'm not a chatbot. I'm wired into your workflows. Try asking me <em>"what's my biggest issue this week?"</em>` };

  if (/^(hello|hi|hey|good morning|good evening|good afternoon)$|^(hi|hey|hello) (claude|calvinball|there)/.test(ql))
    return { time:0.8, html:`Hi ${p.first}. I've been watching the data overnight. <strong>${p.bigVal.replace(/<[^>]+>/g,'')}</strong> ${p.bigLbl.replace(/<[^>]+>/g,'').split('·')[0]}— that's the headline. Want me to walk you through it?` };

  if (/thank|thanks|cheers|appreciate/.test(ql))
    return { time:0.6, html:`Anytime, ${p.first}. I'll keep watching.` };

  // ─── Reference to recent action (follow-up) ───
  if (/(how much|what.*save|did i save|impact|net|roi)/.test(ql) && lastAction)
    return { time:1.1, html:`From your last action — <em>"${lastAction.label}"</em> — the immediate impact is in the <strong>workflow completion panel</strong> still open in the modal. The 30-day forward effect, conservatively, is ${p.persona==='inv'?'₹42 L of revenue protected and East fill rate up to 94%':p.persona==='dp'?'₹2.1 Cr of working capital released over 12 months':p.persona==='qcomm'?'₹8 L of penalty avoided in the 18h window':'₹6.3 Cr of recovery committed against ₹10.1 Cr exposure'}. <br/><br/>Want me to project the full quarter?` };

  if (/(what.*just|what did|last|earlier)/.test(ql) && lastAction)
    return { time:0.9, html:`Your last action was <em>"${lastAction.label}"</em> at ${lastAction.time.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}. ${recent.length>1?`Before that: ${recent[1].label}.`:''}` };

  // ─── East Depot story ───
  if (/(east depot|patna|42L|₹42|east.*stockout|atta|sku a)/.test(ql))
    return { time:1.3, html:`<strong>The East Depot story</strong>: SKU A · Atta 5kg · Patna depot has 9 days of cover · ₹42L of revenue exposure. West Depot has 8K units surplus, 45-min air transit, ₹18K cost. <em>Window closes 11 AM IST.</em> <br/><br/>The simulator lets you pick the source (West / South / Plant 2 fresh), drag the quantity, see live impact — then approve with one click. ${state.persona!=='inv'?`This is in the Inventory persona — want me to take you there? <button class="btn btn-ghost" onclick="closeAsk();drillStat('inv','inv-signal')" style="margin-top:10px">Open the simulator →</button>`:`<button class="btn btn-ghost" onclick="closeAsk();openCell('inv-signal')" style="margin-top:10px">Open the simulator →</button>`}` };

  // ─── Signal Stack ───
  if (/(signal stack|forecast accuracy|75|30.*75|how do you get|how does the accuracy)/.test(ql))
    return { time:1.5, html:`<strong>The Signal Stack</strong> — how we lift a ~60% statistical baseline (for All SKUs; it varies by profile): <br/>• <strong>+5 ±2 pts</strong> sales velocity (DMS · live)<br/>• <strong>+4 ±2 pts</strong> promo lift (calendar × elasticity · live)<br/>• <strong>+2 ±1 pts</strong> weather (IMD feed · live)<br/>• <strong>+4 ±2 pts</strong> Q-Comm pulse (pending · 6-week integration)<br/>• <strong>+3 ±2 pts</strong> distributor sentiment (pending · 6-week integration)<br/><br/>Signals overlap, so they don't add linearly — after the diminishing-returns discount it's <strong>~69% live today, ~72% with the roadmap</strong>. Every lift is a backtest result with a range, not a point claim. <button class="btn btn-ghost" onclick="closeAsk();drillStat('dp','dp-signal')" style="margin-top:10px">Open the Signal Stack →</button>` };

  // ─── Biggest issue ───
  if (/(biggest issue|most urgent|top priority|what should i|priority today|focus on)/.test(ql)) {
    const replies = {
      csco: `Your single biggest decision today is the <strong>East Depot ₹42L stockout</strong>. SKU A · 9 days of cover left, 8K units in West, 45-min transit. Window closes 11 AM. Beyond that: Blinkit SLA at 88% (penalty band at 85%, 18h window) and ₹4.3Cr in distributor credit hold needing finance escalation. <br/><br/>If I had to pick one: <em>open the East Depot story.</em> <button class="btn btn-ghost" onclick="closeAsk();drillStat('inv','inv-signal')" style="margin-top:10px">Open it →</button>`,
      dp: `Your forecast is materially wrong in <strong>4 places</strong>. The biggest one — <em>East Atta 5kg, off by 24%</em> — is also the most actionable. Correction is queued: reduce W5-10 forecast by 10%, route to Friday S&OP. <button class="btn btn-ghost" onclick="closeAsk();openCell('dp-why')" style="margin-top:10px">See the variance decomposer →</button>`,
      inv: `<strong>East Depot is the urgent one.</strong> SKU A · 9 days of cover. ₹42L exposure. Decided by 11 AM today. The simulator is pre-staged — 8K units in West, driver lined up, ASN drafted. <em>You approve, everything else is wired.</em>  <button class="btn btn-ghost" onclick="closeAsk();openCell('inv-signal')" style="margin-top:10px">Open the simulator →</button>`,
      qcomm: `Blinkit is in the penalty zone — <strong>87% vs 95% SLA</strong>. Penalty band kicks in at 85%. You have ~18h. Three SKUs are the offenders: Noodles, Atta, Soap. The rerouting simulator is live — flip mode to Aggressive and watch fill recover. <button class="btn btn-ghost" onclick="closeAsk();openCell('qcomm-signal')" style="margin-top:10px">Open the simulator →</button>`
    };
    return { time:1.4, html: replies[state.persona] };
  }

  // ─── On-plan / status check ───
  if (/(on plan|on track|how are we|status|are we ok|q1|quarter)/.test(ql))
    return { time:1.2, html:`Snapshot for ${p.first}: <strong>${p.bigVal.replace(/<[^>]+>/g,'')}</strong> ${p.bigLbl.replace(/<[^>]+>/g,'').slice(0,80)}. Forecast accuracy 68% (target 75% Q2-end). OTIF 91.4% (target 95%). Q-Comm fill 88% (SLA 95%). <br/><br/>We're tracking <em>two amber, one red</em> against quarterly goals. The red — Q-Comm fill — is fixable this week.` };

  // ─── Q-Comm ───
  if (/(blinkit|zepto|q.?comm|dark.?store|fill rate|sla)/.test(ql))
    return { time:1.2, html:`Q-Comm fill is at <strong>88%</strong> vs 95% SLA. Below threshold on Blinkit (87%) and Zepto (89%). Penalty band starts at 85%. <em>3 SKUs in the red</em>: Noodles 70g, Atta 5kg, Soap 100g. The rerouting simulator can move you to 97% in current Aggressive mode. <button class="btn btn-ghost" onclick="closeAsk();drillStat('qcomm','qcomm-signal')" style="margin-top:10px">Open Q-Comm pulse →</button>` };

  // ─── Why / cause ───
  if (/(but why|why|root cause|root.cause|what.s.causing)/.test(ql)) {
    const ctx = state.persona === 'inv' ? `<strong>Sales velocity +31% on a regional campaign</strong> (DMS data, East region · 244 distributors). On top of that, replenishment lead time slipped by 3 days because Plant 2 hit a capacity bottleneck in week 22. Safety stock was already at 60% of norm — structural.`
              : state.persona === 'dp' ? `For East Atta: <strong>distributor offtake softness</strong> is the measured, high-confidence driver (~46% of the miss). Competitor price action (~18%) is <em>inferred — no live feed</em>, early monsoon (~11%) is estimated, and ~18% stays unexplained. It's mostly commercial, not a model failure — but treat the competitor share as an estimate, not a measured fact.`
              : state.persona === 'qcomm' ? `Marketing pushed a Noodles flash offer at 17:55. Velocity moved from 240 u/hr baseline to 328 u/hr — <strong>+37%</strong>. Dark-store cover dropped from 36h to 14h. Predictable, not modeled.`
              : `Three streams: stockout (₹3.4Cr · 7 SKUs), demand miss (₹2.4Cr · 4 SKUs), credit hold (₹4.3Cr · 4 distributors). The credit hold is the largest and the most political.`;
    return { time:1.6, html:ctx + ` <button class="btn btn-ghost" onclick="closeAsk();openCell('${state.persona}-why')" style="margin-top:10px">Open the decomposer →</button>` };
  }

  // ─── Cost / ROI ───
  if (/(cost|how much.*cost|expense|spend|budget)/.test(ql))
    return { time:1.1, html:`Costs in the open recommendations: East Depot transfer <strong>₹18K</strong> (vs ₹42L protected · 233× ROI). Blinkit dark-store transfer <strong>₹35K</strong> (vs ₹8L penalty avoided · 23× ROI). Signal Stack expansion <strong>₹14L one-time</strong> (vs ~₹1.4–2.2 Cr annual working-capital release · payback under ~6 months once the pending signals are live). <br/><br/>Net of all recommendations: <em>cost ₹17.5L · upside ₹6.3 Cr</em>.` };

  // ─── Recovery / save ───
  if (/(recovery|recover|save|saved|fix)/.test(ql))
    return { time:1.3, html:`Of the <strong>₹10.1 Cr at 30-day risk</strong>, ${recent.find(a=>a.label.includes('recovery'))?'you have just approved ₹6.3 Cr of recovery':'₹6.3 Cr is recoverable in 7 days'} on existing budget. The remaining ₹3.8 Cr needs Q2 plan changes — distributor renegotiation and production rebalance for monsoon. <em>Industry-average recovery is 32% — we're at 62% because the levers are pre-staged, not invented.</em>` };

  // ─── Switch persona / view ───
  if (/(show me|switch|change view|change to|go to|let me see)/.test(ql)) {
    const map = [
      { kw:/(csco|chief|exec|board)/i, k:'csco' },
      { kw:/(demand|planning|planner|anjali|forecast)/i, k:'dp' },
      { kw:/(inventory|stock|inv|rajiv|depot)/i, k:'inv' },
      { kw:/(q.?comm|blinkit|zepto|priya|dark)/i, k:'qcomm' }
    ];
    const hit = map.find(m=>m.kw.test(ql));
    if (hit) return { time:0.8, html:`Switching you to <strong>${PERSONAS[hit.k].name}</strong>'s view. <button class="btn btn-ghost" onclick="closeAsk();switchPersona('${hit.k}')" style="margin-top:8px">Take me there →</button>` };
  }

  // ─── Confidence / honesty ───
  if (/(confident|confidence|how sure|trust|believe)/.test(ql))
    return { time:1.2, html:`Honest answer: confidence varies by signal. <em>East Depot story</em> — high (95%), the data sources are clean and the math is conservative. <em>Signal Stack projection</em> — medium-high (78%), an 18-month rolling-origin backtest, but Q-Comm and sentiment signals haven't been integrated yet, so the live number is lower than the with-roadmap number. <em>Event Radar last-year retros</em> — high (90%+), they're empirical. <br/><br/>I won't claim certainty I don't have.` };

  // ─── How does it work / explain ───
  if (/(how does|how do you|how it work|explain|under the hood|architecture)/.test(ql))
    return { time:1.5, html:`Under the hood: I read from your existing systems (no rip-and-replace). Three layers — <strong>Context Graph</strong> (the ~22K-token cross-system memory), <strong>Signal Stack</strong> (5 backtested data inputs that lift the statistical baseline, with diminishing returns and live-vs-roadmap shown separately), and <strong>Playbook Engine</strong> (the Brief / Why / Signal / Ask pattern you're using). I learn from approvals and outcomes weekly. Pricing is ₹40-50L/month after a 12-week pilot. <br/><br/>Want the technical whitepaper?` };

  // ─── Recommendation / what should we / sell more ───
  if (/(what can i sell|sell more|opportunity|upside)/.test(ql))
    return { time:1.3, html:`Three live opportunities I can see: <br/>• <strong>Noodles on Q-Comm</strong> — pull is +37% above forecast, you're capacity-bound. Refill 5 dark stores and you capture another ₹3-4L this week. <br/>• <strong>Diwali gift packs</strong> (95 days out) — last year you stocked out in week 1 of the festive window, ₹1.8 Cr left on the table. Production schedule is unlocked, lock it. <br/>• <strong>BBD on Q-Comm</strong> — 8-day staging window, ₹4.1 Cr Last-year revenue. <button class="btn btn-ghost" onclick="closeAsk();drillStat('csco','csco-signal')" style="margin-top:10px">Open the Event Radar →</button>` };

  // ─── Summarize / week / month ───
  if (/(summary|summarize|summarise|week|recap|brief me)/.test(ql))
    return { time:1.4, html:`<strong>This week, ${p.first}:</strong> <br/>• ₹10.1 Cr at 30-day risk · 62% recoverable on existing budget · 4 actions queued <br/>• Forecast accuracy 68% (target 75%) · 4 SKUs need correction this morning <br/>• 7 SKUs at 14d stockout risk · East Depot is the urgent one <br/>• Q-Comm SLA at 88% · penalty risk in 18h on Blinkit <br/>• 3 forward events on the radar — Monsoon (+14d), Diwali (+95d), BBD (+118d) <br/><br/>Open the Wednesday Canvas to triage all in 90 seconds. <button class="btn btn-ghost" onclick="closeAsk();openCell('csco-brief')" style="margin-top:10px">Open it →</button>` };

  // ─── Disagree / push back / why are you wrong ───
  if (/(wrong|incorrect|disagree|i don.t think|that.s not right|push back)/.test(ql))
    return { time:1.5, html:`Fair pushback. Let me ground my reasoning so you can find the gap: I'm sourcing from <strong>SAP S/4 sales actuals, DMS distributor offtake, IMD weather feed, marketing calendar, and Q-Comm platform APIs</strong>. The math is in the Why decomposer. <em>If you tell me what looks off</em> — a specific number, SKU, region — I'll trace it back to the source.` };

  // ─── Fallback · context-aware ───
  return {
    time: 1.0 + Math.random()*1.2,
    html: `I hear "${q.length>50?q.slice(0,50)+'…':q}". I'm interpreting that against your current view (<strong>${p.role.split('·')[0].trim()}</strong>${state.currentCell?', '+state.currentCell.replace('-',' · '):''})${recent.length?' and your recent action ('+recent[0].label.split('·')[0].trim()+')':''}. <br/><br/><em>In production, I'd return a structured answer with sources and a recommended next action.</em> For the demo, try: "what's my biggest issue?", "show me the East Depot story", "how do you get to 75% accuracy?", or "summarize the week".`
  };
}

export { generateAskReply };
