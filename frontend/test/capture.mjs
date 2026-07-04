import puppeteer from 'puppeteer-core';

const URL = process.argv[2] || 'https://cbtsynq.netlify.app/';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
const logs = [];
page.on('console', (m) => logs.push(`[console.${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => logs.push(`[requestfailed] ${r.url()} — ${r.failure()?.errorText}`));
page.on('response', (r) => { if (r.status() >= 400) logs.push(`[http ${r.status()}] ${r.url()}`); });

await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 }).catch((e) => logs.push(`[goto error] ${e.message}`));
await new Promise((r) => setTimeout(r, 1500));

const rootHtmlLen = await page.evaluate(() => document.getElementById('root')?.innerHTML.length || 0);
const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 200));
console.log('=== root innerHTML length:', rootHtmlLen);
console.log('=== body text:', JSON.stringify(bodyText));
console.log('=== logs ===');
console.log(logs.join('\n') || '(none)');
await browser.close();
