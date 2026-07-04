import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage(); await p.setViewport({width:1440,height:900,deviceScaleFactor:2});
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
await p.waitForSelector('input[type="text"]',{timeout:15000});
await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
await p.click('button[type="submit"]'); await p.waitForSelector('.persona-av',{timeout:20000});
await new Promise(r=>setTimeout(r,500));
// top-left + border handle
await p.screenshot({path:'/tmp/edge-topleft.png', clip:{x:0,y:60,width:340,height:260}});
const edgeX=await p.evaluate(()=>{const e=document.querySelector('.sb-edge');const r=e.getBoundingClientRect();return Math.round(r.left+r.width/2);});
console.log('handle center x (expanded, expect ~236):', edgeX);
// collapse via handle
await p.evaluate(()=>document.querySelector('.sb-edge')?.click()); await new Promise(r=>setTimeout(r,450));
const edgeX2=await p.evaluate(()=>{const e=document.querySelector('.sb-edge');const r=e.getBoundingClientRect();return Math.round(r.left+r.width/2);});
const col=await p.evaluate(()=>document.querySelector('.sidebar')?.classList.contains('collapsed'));
console.log('collapsed:',col,'· handle center x (collapsed, expect ~66):', edgeX2);
await p.screenshot({path:'/tmp/edge-collapsed.png', clip:{x:0,y:60,width:340,height:260}});
console.log('errors:', errs.length?errs.join(' | '):'(none)');
await b.close();
