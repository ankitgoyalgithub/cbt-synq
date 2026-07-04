import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });

async function session(w, h) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('input[type="text"]', { timeout: 15000 });
  await page.type('input[type="text"]', 'demo'); await page.type('input[type="password"]', 'calvinball123');
  await page.click('button[type="submit"]'); await page.waitForSelector('.persona-grid', { timeout: 20000 });
  return { ctx, page };
}

// 1) cockpit with a toast visible (right after switch) at 1366
{ const { ctx, page } = await session(1366, 850);
  await page.evaluate(() => window.switchPersona('dp'));
  await new Promise(r=>setTimeout(r,600));
  await page.screenshot({ path: '/tmp/a-toast-over-content.png' }); await ctx.close(); }

// 2) modal open WITH a toast (switch persona then open cell quickly)
{ const { ctx, page } = await session(1366, 850);
  await page.evaluate(() => { window.switchPersona('inv'); });
  await new Promise(r=>setTimeout(r,300));
  await page.evaluate(() => window.openCell('inv-signal'));
  await new Promise(r=>setTimeout(r,600));
  await page.screenshot({ path: '/tmp/a-modal-toast.png' }); await ctx.close(); }

// 3) narrow width cockpit 1024
{ const { ctx, page } = await session(1024, 800);
  await new Promise(r=>setTimeout(r,4200)); // toasts fade
  await page.screenshot({ path: '/tmp/a-cockpit-1024.png', fullPage:false }); await ctx.close(); }

// 4) ask panel open over content
{ const { ctx, page } = await session(1366, 850);
  await new Promise(r=>setTimeout(r,4200));
  await page.evaluate(() => window.toggleAsk());
  await new Promise(r=>setTimeout(r,500));
  await page.screenshot({ path: '/tmp/a-ask.png' }); await ctx.close(); }

await browser.close(); console.log('done');
