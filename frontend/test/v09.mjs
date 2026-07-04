import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage(); await p.setViewport({width:1440,height:1000,deviceScaleFactor:1.5});
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
await p.waitForSelector('input[type="text"]',{timeout:15000});
await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
await p.click('button[type="submit"]'); await p.waitForSelector('.persona-pill',{timeout:20000});
// switch to DP via header pill
await p.evaluate(()=>window.switchPersona('dp')); await new Promise(r=>setTimeout(r,500));
await p.screenshot({path:'/tmp/v09-dp-home.png',fullPage:true});
// nav items present?
const nav=await p.evaluate(()=>Array.from(document.querySelectorAll('.sb-link-text')).map(e=>e.textContent));
console.log('DP nav:', nav.filter(Boolean).join(' | '));
// open Forecast Viewer via goTo
await p.evaluate(()=>window.goTo('dp-forecast')); await new Promise(r=>setTimeout(r,500));
const fv=await p.evaluate(()=>({title:document.querySelector('.fsview-title')?.textContent, rows:document.querySelectorAll('#fvtBody .fvt-row').length}));
console.log('Forecast Viewer:', JSON.stringify(fv));
await p.screenshot({path:'/tmp/v09-forecast.png'});
// search filter
await p.evaluate(()=>window.fvSearch('clinic')); await new Promise(r=>setTimeout(r,200));
const shown=await p.evaluate(()=>Array.from(document.querySelectorAll('#fvtBody .fvt-row')).filter(r=>r.style.display!=='none').length);
console.log('fvSearch("clinic") rows shown:', shown);
// open Consensus Workbook
await p.evaluate(()=>window.goTo('dp-consensus')); await new Promise(r=>setTimeout(r,500));
const wb0=await p.evaluate(()=>document.getElementById('wbApprCount')?.textContent);
// toggle a no→yes
await p.evaluate(()=>{const btn=document.querySelector('#wbBody .wb-appr.no'); if(btn) window.wbToggle(btn);});
const wb1=await p.evaluate(()=>document.getElementById('wbApprCount')?.textContent);
console.log('Consensus count before/after toggle:', wb0, '→', wb1);
await p.screenshot({path:'/tmp/v09-consensus.png'});
// signal stack modal — new baseline
await p.evaluate(()=>window.closeView()); await new Promise(r=>setTimeout(r,300));
await p.evaluate(()=>window.openCell('dp-signal')); await new Promise(r=>setTimeout(r,700));
const sig=await p.evaluate(()=>({baseline:document.getElementById('baselineLbl')?.textContent, live:document.getElementById('calcLive')?.textContent, proj:document.getElementById('calcProjected')?.textContent, total:document.getElementById('stackTotal')?.textContent}));
console.log('Signal Stack:', JSON.stringify(sig));
await p.evaluate(()=>window.closeModal()); await new Promise(r=>setTimeout(r,200));
// collapse sidebar
await p.evaluate(()=>document.querySelector('.sb-collapse')?.click()); await new Promise(r=>setTimeout(r,300));
const col=await p.evaluate(()=>document.querySelector('.sidebar')?.classList.contains('collapsed'));
console.log('sidebar collapsed:', col);
await p.screenshot({path:'/tmp/v09-collapsed.png',fullPage:true});
console.log('CONSOLE ERRORS:', errs.length?errs.join(' | '):'(none)');
await b.close();
