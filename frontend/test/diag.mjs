import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
for (const w of [1440, 1920, 2560]) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('input[type="text"]', { timeout: 15000 });
  await page.type('input[type="text"]', 'demo'); await page.type('input[type="password"]', 'calvinball123');
  await page.click('button[type="submit"]'); await page.waitForSelector('.persona-grid', { timeout: 20000 });
  await page.evaluate(() => window.switchPersona('dp'));
  await new Promise(r=>setTimeout(r,500));
  const m = await page.evaluate(() => {
    const main = document.querySelector('.app-main');
    const tile = document.querySelector('.tile');
    const hero = document.querySelector('.tile-hero');
    return {
      mainW: Math.round(main.getBoundingClientRect().width),
      mainMax: getComputedStyle(main).maxWidth,
      tileW: tile ? Math.round(tile.getBoundingClientRect().width) : 0,
      heroW: hero ? Math.round(hero.getBoundingClientRect().width) : 0,
      heroH: hero ? Math.round(hero.getBoundingClientRect().height) : 0,
    };
  });
  console.log(`viewport ${w}:`, JSON.stringify(m));
  if (w === 1920) { await page.evaluate(()=>window.scrollBy(0,560)); await new Promise(r=>setTimeout(r,300)); await page.screenshot({ path: '/tmp/diag-1920.png' }); }
  await ctx.close();
}
await browser.close();
