import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
async function measure(w){
  const p=await b.newPage(); await p.setViewport({width:w,height:800,deviceScaleFactor:1});
  await p.goto('http://localhost:4321/',{waitUntil:'domcontentloaded'});
  await p.waitForSelector('input[type="text"]',{timeout:15000});
  await p.type('input[type="text"]','demo'); await p.type('input[type="password"]','calvinball123');
  await p.click('button[type="submit"]'); await p.waitForSelector('.persona-av',{timeout:20000});
  await new Promise(r=>setTimeout(r,400));
  const m=await p.evaluate(()=>{
    const brand=document.querySelector('.brand').getBoundingClientRect();
    const inner=document.querySelector('.app-head-inner').getBoundingClientRect();
    const sb=document.querySelector('.sidebar').getBoundingClientRect();
    const sblink=document.querySelector('.sb-link-icon')?.getBoundingClientRect();
    return {viewport:window.innerWidth, brandLeft:Math.round(brand.left), innerLeft:Math.round(inner.left), sbLeft:Math.round(sb.left), sbIconLeft:sblink?Math.round(sblink.left):null};
  });
  console.log(JSON.stringify(m));
  if(w===1600){ await p.screenshot({path:'/tmp/logo-1600.png', clip:{x:0,y:0,width:700,height:100}}); }
  await p.close();
}
await measure(1440); await measure(1600); await measure(1920);
await b.close();
