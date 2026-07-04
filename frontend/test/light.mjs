import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage(); await p.setViewport({width:1440,height:950,deviceScaleFactor:1.5});
await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
await p.waitForSelector('input[type="text"]',{timeout:15000});
await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
await p.click('button[type="submit"]'); await p.waitForSelector('.persona-av',{timeout:20000});
// switch to light
await p.evaluate(()=>{const t=[...document.querySelectorAll('.sb-foot .sb-link')].find(l=>/theme/i.test(l.textContent)); t&&t.click();});
await new Promise(r=>setTimeout(r,500));
await p.screenshot({path:'/tmp/light-cockpit.png',fullPage:true});
// open dp-brief modal
await p.evaluate(()=>window.openCell('dp-brief')); await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:'/tmp/light-brief.png'});
await p.evaluate(()=>window.closeModal()); await new Promise(r=>setTimeout(r,300));
// forecast viewer
await p.evaluate(()=>window.goTo('dp-forecast')); await new Promise(r=>setTimeout(r,600));
await p.screenshot({path:'/tmp/light-forecast.png'});
// consensus
await p.evaluate(()=>window.goTo('dp-consensus')); await new Promise(r=>setTimeout(r,600));
await p.screenshot({path:'/tmp/light-consensus.png'});
await b.close(); console.log('done');
