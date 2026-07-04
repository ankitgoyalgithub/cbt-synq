import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage(); await p.setViewport({width:1440,height:920,deviceScaleFactor:2});
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
await p.waitForSelector('input[type="text"]',{timeout:15000});
await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
await p.click('button[type="submit"]'); await p.waitForSelector('.persona-av',{timeout:20000});
await new Promise(r=>setTimeout(r,500));
// header (left) + sidebar top
await p.screenshot({path:'/tmp/tog-header.png', clip:{x:0,y:0,width:560,height:90}});
await p.screenshot({path:'/tmp/tog-side-expanded.png', clip:{x:0,y:60,width:260,height:340}});
// click header menu button → collapse
await p.evaluate(()=>document.querySelector('.head-menu-btn')?.click()); await new Promise(r=>setTimeout(r,400));
const col=await p.evaluate(()=>document.querySelector('.sidebar')?.classList.contains('collapsed'));
console.log('collapsed after header btn click:', col);
await p.screenshot({path:'/tmp/tog-side-collapsed.png', clip:{x:0,y:0,width:120,height:520}});
console.log('errors:', errs.length?errs.join(' | '):'(none)');
await b.close();
