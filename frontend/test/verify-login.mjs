import puppeteer from 'puppeteer-core';
const URL = process.argv[2] || 'http://localhost:4321/';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
const errs = [];
page.on('pageerror', (e) => errs.push('[pageerror] ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push('[console.error] ' + m.text()); });
await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise((r) => setTimeout(r, 1200));
const rootLen = await page.evaluate(() => document.getElementById('root')?.innerHTML.length || 0);
const hasLogin = await page.evaluate(() => !!document.querySelector('.auth-card') && /Sign in/.test(document.body.innerText));
console.log('root innerHTML length:', rootLen);
console.log('login screen rendered:', hasLogin);
// attempt a real login with the seeded demo account
let loginResult = 'not attempted';
try {
  await page.type('input[type="text"]', 'demo');
  await page.type('input[type="password"]', 'calvinball123');
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 3500));
  loginResult = await page.evaluate(() => {
    if (document.querySelector('.persona-grid')) return 'SUCCESS — cockpit loaded';
    const err = document.querySelector('.auth-error');
    return err ? 'auth-error: ' + err.textContent : 'still on login, no error';
  });
} catch (e) { loginResult = 'exception: ' + e.message; }
console.log('login attempt:', loginResult);
console.log('errors during session:', errs.length ? '\n' + errs.join('\n') : '(none)');
await browser.close();
