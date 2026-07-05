import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage(); await p.setViewport({width:1440,height:950,deviceScaleFactor:2});
await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
await p.waitForSelector('input[type="text"]',{timeout:15000});
await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
await p.click('button[type="submit"]'); await p.waitForSelector('.persona-av',{timeout:20000});
await new Promise(r=>setTimeout(r,500));
const chk=await p.evaluate(()=>({
  profileInitial: document.querySelector('.sb-avatar-user')?.textContent?.trim(),
  signedInGone: !/Signed in as/.test(document.querySelector('.sidebar')?.textContent||''),
  lastFootItem: [...document.querySelectorAll('.sb-foot .sb-link .sb-link-text')].pop()?.textContent
}));
console.log('profile:', JSON.stringify(chk));
await p.screenshot({path:'/tmp/prof-side.png', clip:{x:0,y:0,width:260,height:950}});
await b.close();
