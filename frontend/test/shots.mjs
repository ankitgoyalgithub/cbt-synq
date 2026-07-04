import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const base = 'http://localhost:4321/';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });

async function fresh(w, h) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  return { ctx, page };
}
async function login(page) {
  await page.waitForSelector('input[type="text"]', { timeout: 15000 });
  await page.type('input[type="text"]', 'demo');
  await page.type('input[type="password"]', 'calvinball123');
  await page.click('button[type="submit"]');
  await page.waitForSelector('.persona-grid', { timeout: 20000 });
  await new Promise(r => setTimeout(r, 1500));
}

{ const { ctx, page } = await fresh(1440, 1000); await login(page);
  await page.screenshot({ path: '/tmp/shot-cockpit.png', fullPage: true }); await ctx.close(); console.log('cockpit'); }

{ const { ctx, page } = await fresh(1440, 1000); await login(page);
  await page.evaluate(() => window.openCell('inv-signal')); await new Promise(r=>setTimeout(r,1000));
  await page.screenshot({ path: '/tmp/shot-modal-inv.png' }); await ctx.close(); console.log('modal-inv'); }

{ const { ctx, page } = await fresh(1440, 1000); await login(page);
  await page.evaluate(() => window.openCell('csco-why')); await new Promise(r=>setTimeout(r,1000));
  await page.screenshot({ path: '/tmp/shot-modal-why.png' }); await ctx.close(); console.log('modal-why'); }

{ const { ctx, page } = await fresh(1280, 900); await login(page);
  await page.screenshot({ path: '/tmp/shot-cockpit-1280.png', fullPage: true }); await ctx.close(); console.log('cockpit-1280'); }

await browser.close();
