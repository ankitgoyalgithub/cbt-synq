import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const ctx = await browser.createBrowserContext();
const page = await ctx.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('input[type="text"]', { timeout: 15000 });
await page.type('input[type="text"]', 'demo');
await page.type('input[type="password"]', 'calvinball123');
await page.click('button[type="submit"]');
await page.waitForSelector('.persona-grid', { timeout: 20000 });
await new Promise(r => setTimeout(r, 1800)); // let welcome toast show
await page.screenshot({ path: '/tmp/after-top.png' });          // top w/ toast at bottom now
await page.evaluate(() => window.scrollBy(0, 640));
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: '/tmp/after-scrolled.png' });     // header sticky, shelf gone
await browser.close();
