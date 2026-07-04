import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
async function shot(w,h,name,scale=1.5){
  const ctx=await browser.createBrowserContext(); const p=await ctx.newPage();
  await p.setViewport({width:w,height:h,deviceScaleFactor:scale});
  await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
  await p.waitForSelector('input[type="text"]',{timeout:15000});
  await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
  await p.click('button[type="submit"]'); await p.waitForSelector('.persona-pill',{timeout:20000});
  await new Promise(r=>setTimeout(r,600));
  const info=await p.evaluate(()=>({sidebar:getComputedStyle(document.querySelector('.sidebar')).display, ow:document.documentElement.scrollWidth, cw:document.documentElement.clientWidth}));
  console.log(name, JSON.stringify(info), 'overflow:', info.ow>info.cw+2);
  await p.screenshot({path:`/tmp/resp-${name}.png`});
  await ctx.close();
}
await shot(390,780,'phone',2);
await shot(768,900,'tablet',1.5);
await browser.close(); console.log('done');
