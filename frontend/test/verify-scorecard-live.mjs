import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
const errs = [];
page.on('pageerror', e => errs.push('[pageerror] ' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('[console.error] ' + m.text()); });
await page.goto('https://cbtsynq.netlify.app/', { waitUntil: 'networkidle2', timeout: 30000 });
await page.waitForSelector('input[type="text"]', { timeout: 20000 });
await page.type('input[type="text"]', 'demo'); await page.type('input[type="password"]', 'calvinball123');
await page.click('button[type="submit"]'); await page.waitForSelector('.persona-grid', { timeout: 20000 });
await page.evaluate(() => window.switchPersona('dp'));
await new Promise(r => setTimeout(r, 600));
await page.evaluate(() => window.openCell('dp-scorecard'));
await new Promise(r => setTimeout(r, 1200));
const ok = await page.evaluate(() => {
  const k = document.getElementById('dpgKpis')?.innerText || '';
  return { hasAcc: /ACCURACY/.test(k), hasBias: /BIAS/.test(k), seg: document.querySelectorAll('.dpg-seg-cell').length, trend: !!document.querySelector('#dpgTrendWrap svg') };
});
// toggle a lag to prove recompute
await page.evaluate(() => window.dpgLag('l1'));
await new Promise(r => setTimeout(r, 400));
const acc = await page.evaluate(() => (document.querySelector('#dpgKpis .kpi-val')?.textContent || ''));
console.log('scorecard KPIs:', ok.hasAcc && ok.hasBias, '| seg cells:', ok.seg, '| trend svg:', ok.trend, '| lag-1 acc:', acc);
console.log('errors:', errs.length ? '\n' + errs.join('\n') : '(none)');
await browser.close();
