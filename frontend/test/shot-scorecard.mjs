import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 1000, deviceScaleFactor: 2 });
await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('input[type="text"]', { timeout: 15000 });
await page.type('input[type="text"]', 'demo');
await page.type('input[type="password"]', 'calvinball123');
await page.click('button[type="submit"]');
await page.waitForSelector('.persona-grid', { timeout: 20000 });
// switch to DP persona, open scorecard
await page.evaluate(() => window.switchPersona('dp'));
await new Promise(r => setTimeout(r, 500));
await page.evaluate(() => window.openCell('dp-scorecard'));
await new Promise(r => setTimeout(r, 900));
const kpis = await page.evaluate(() => document.getElementById('dpgKpis')?.innerText || '');
const seg = await page.evaluate(() => !!document.querySelector('.dpg-seg-grid'));
console.log('KPIs text:', kpis.replace(/\n+/g,' | ').slice(0,240));
console.log('segmentation grid present:', seg);
// screenshot the modal body
const body = await page.$('.modal-body');
await body.screenshot({ path: '/tmp/scorecard.png' });
// toggle to Lag-1 and re-check accuracy changes
await page.evaluate(() => window.dpgLag('l1'));
await new Promise(r => setTimeout(r, 400));
const kpis2 = await page.evaluate(() => document.getElementById('dpgKpis')?.innerText || '');
console.log('Lag-1 KPIs:', kpis2.replace(/\n+/g,' | ').slice(0,160));
await browser.close();
