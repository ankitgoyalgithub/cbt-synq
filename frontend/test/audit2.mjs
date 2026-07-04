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
// modal + freshly-fired toast: toast must be hidden behind modal
{ const { ctx, page } = await session(1366, 850);
  await page.evaluate(() => window.switchPersona('inv'));
  await new Promise(r=>setTimeout(r,250));
  await page.evaluate(() => window.openCell('inv-signal'));
  await new Promise(r=>setTimeout(r,500));
  const toastVisibleOverModal = await page.evaluate(() => {
    const t = document.querySelector('.toast'); if(!t) return 'no-toast';
    const z = getComputedStyle(document.querySelector('.toast-stack')).zIndex; return 'toast z='+z;
  });
  console.log('modal case:', toastVisibleOverModal);
  await page.screenshot({ path: '/tmp/b-modal-toast.png' }); await ctx.close(); }
// fresh cockpit on load (no welcome toast should appear)
{ const { ctx, page } = await session(1024, 800);
  await new Promise(r=>setTimeout(r,1500));
  const hasToast = await page.evaluate(() => document.querySelectorAll('.toast').length);
  console.log('cockpit on load · toast count:', hasToast);
  await page.screenshot({ path: '/tmp/b-cockpit.png' }); await ctx.close(); }
await browser.close(); console.log('done');
