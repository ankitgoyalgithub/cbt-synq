import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
async function login(w,h){ const ctx=await browser.createBrowserContext(); const p=await ctx.newPage();
  await p.setViewport({width:w,height:h,deviceScaleFactor:1});
  await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
  await p.waitForSelector('input[type="text"]',{timeout:15000});
  await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
  await p.click('button[type="submit"]'); await p.waitForSelector('.persona-pill',{timeout:20000});
  return {ctx,p}; }
// DP full page
{ const {ctx,p}=await login(1440,900); await p.evaluate(()=>window.switchPersona('dp')); await new Promise(r=>setTimeout(r,600));
  await p.screenshot({path:'/tmp/rd-dp.png',fullPage:true}); await ctx.close(); }
// 1280 cockpit (viewport)
{ const {ctx,p}=await login(1280,860); await new Promise(r=>setTimeout(r,500));
  await p.screenshot({path:'/tmp/rd-1280.png'}); await ctx.close(); }
console.log('done'); await browser.close();
