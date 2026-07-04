import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
for(const w of [1440,1920]){
  const ctx=await b.createBrowserContext(); const p=await ctx.newPage();
  await p.setViewport({width:w,height:800,deviceScaleFactor:w===1440?2:1});
  await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
  await p.waitForSelector('input[type="text"]',{timeout:15000});
  await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
  await p.click('button[type="submit"]'); await p.waitForSelector('.persona-av',{timeout:20000});
  await new Promise(r=>setTimeout(r,400));
  const m=await p.evaluate(()=>({vw:innerWidth, brandLeft:Math.round(document.querySelector('.brand').getBoundingClientRect().left), sbIcon:Math.round(document.querySelector('.sb-link-icon').getBoundingClientRect().left)}));
  console.log(JSON.stringify(m));
  if(w===1440) await p.screenshot({path:'/tmp/logo-fixed.png', clip:{x:0,y:0,width:640,height:150}});
  await ctx.close();
}
await b.close();
