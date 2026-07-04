import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 1000, deviceScaleFactor: 2 });
await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('input[type="text"]', { timeout: 15000 });
await page.type('input[type="text"]', 'demo'); await page.type('input[type="password"]', 'calvinball123');
await page.click('button[type="submit"]'); await page.waitForSelector('.persona-grid', { timeout: 20000 });
await page.evaluate(() => window.switchPersona('dp'));
await new Promise(r => setTimeout(r, 500));
await page.evaluate(() => window.openCell('dp-scorecard'));
await new Promise(r => setTimeout(r, 5000)); // let toasts fade
// scroll the modal body to the segmentation/trend area
await page.evaluate(() => { document.querySelector('.modal-body').scrollTop = 1150; });
await new Promise(r => setTimeout(r, 400));
const info = await page.evaluate(() => ({
  seg: document.querySelectorAll('.dpg-seg-cell').length,
  split: !!document.getElementById('dpgSplitWrap')?.innerHTML,
  trend: !!document.getElementById('dpgTrendWrap')?.querySelector('svg'),
}));
console.log('seg cells:', info.seg, '| split rendered:', info.split, '| trend svg:', info.trend);
await page.screenshot({ path: '/tmp/scorecard-lower.png' });
await browser.close();
