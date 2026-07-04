import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('input[type="text"]', { timeout: 15000 });
await page.type('input[type="text"]', 'demo'); await page.type('input[type="password"]', 'calvinball123');
await page.click('button[type="submit"]'); await page.waitForSelector('.persona-grid', { timeout: 20000 });
for (const [key,name] of [['dp','dp'],['csco','csco'],['inv','inv'],['qcomm','qcomm']]) {
  await page.evaluate(k => window.switchPersona(k), key);
  await new Promise(r=>setTimeout(r,500));
  await page.evaluate(()=>window.scrollTo(0, 520));
  await new Promise(r=>setTimeout(r,300));
  const tiles = await page.$('.tiles');
  if (tiles) await tiles.screenshot({ path: `/tmp/tiles-${name}.png` });
  console.log('captured', name);
}
await browser.close();
