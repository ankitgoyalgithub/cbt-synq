import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const p = await browser.newPage(); await p.setViewport({width:1440,height:900,deviceScaleFactor:2});
await p.goto('http://localhost:4321/',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,800));
await p.screenshot({path:'/tmp/f-login.png'});
await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
await p.click('button[type="submit"]'); await p.waitForSelector('.persona-pill',{timeout:20000});
await new Promise(r=>setTimeout(r,700));
// top viewport (hero + strip)
await p.screenshot({path:'/tmp/f-cockpit.png'});
// scorecard modal
await p.evaluate(()=>window.switchPersona('dp')); await new Promise(r=>setTimeout(r,400));
await p.evaluate(()=>window.openCell('dp-scorecard')); await new Promise(r=>setTimeout(r,1000));
await p.screenshot({path:'/tmp/f-modal.png'});
await browser.close(); console.log('done');
