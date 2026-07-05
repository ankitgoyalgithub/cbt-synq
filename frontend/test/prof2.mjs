import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage(); await p.setViewport({width:1440,height:950,deviceScaleFactor:2});
await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
await p.waitForSelector('input[type="text"]',{timeout:15000});
await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
await p.click('button[type="submit"]'); await p.waitForSelector('.persona-av',{timeout:20000});
await new Promise(r=>setTimeout(r,500));
// verify order: profile is inside .sb-foot, above the 3 links
const order=await p.evaluate(()=>{const foot=document.querySelector('.sb-foot'); return [...foot.children].map(c=>c.className.includes('sb-profile')?'PROFILE':(c.querySelector('.sb-link-text')?.textContent||c.className));});
console.log('footer order:', JSON.stringify(order));
// screenshot just the bottom portion of the sidebar
await p.screenshot({path:'/tmp/prof2-foot.png', clip:{x:0,y:560,width:260,height:390}});
await b.close();
