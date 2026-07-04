import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage(); await p.setViewport({width:1440,height:1000,deviceScaleFactor:2});
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('requestfailed',r=>{if(/banners/.test(r.url()))errs.push('img fail '+r.url())});
await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
await p.waitForSelector('input[type="text"]',{timeout:15000});
await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
await p.click('button[type="submit"]'); await p.waitForSelector('.persona-av',{timeout:20000});
await new Promise(r=>setTimeout(r,600));
// scroll to library
await p.evaluate(()=>{const l=document.querySelector('.library'); l&&l.scrollIntoView();});
await new Promise(r=>setTimeout(r,500));
const imgs=await p.evaluate(()=>[...document.querySelectorAll('.lib-banner')].map(i=>({src:i.getAttribute('src'), w:i.naturalWidth||i.getBoundingClientRect().width, loaded:i.complete})));
console.log('banners:', JSON.stringify(imgs));
const lib=await p.$('.library');
if(lib) await lib.screenshot({path:'/tmp/ban-lib.png'});
console.log('errors:', errs.length?errs.join(' | '):'(none)');
await b.close();
