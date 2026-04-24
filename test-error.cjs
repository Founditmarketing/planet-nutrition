const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('pageerror', err => console.log('ERROR:', err.message));
  page.on('console', msg => console.log('LOG:', msg.text()));
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' }).catch(e => console.log(e));
  await browser.close();
})();
