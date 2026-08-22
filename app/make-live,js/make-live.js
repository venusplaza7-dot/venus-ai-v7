// factory/make-live.js — 100% AUTONOMOUS - 0 URLs hardcoded
const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({
    headless: false, // visible so Google doesn't block
    args: ['--no-sandbox','--disable-blink-features=AutomationControlled']
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36');

  console.log('AGENT: Searching Houston plumbers...');

  // Use Bing - doesn't block bots like Google
  await page.goto('https://www.bing.com/search?q=best+plumbers+Houston+TX+official+website', { waitUntil: 'networkidle2' });

  const discovered = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('li.b_algo h2 a').forEach(a => {
      const href = a.href;
      if (href && href.startsWith('http') &&!href.includes('bing.com') &&!href.includes('yelp.com') &&!href.includes('angi.com')) {
        results.push(href);
      }
    });
    return results;
  });

  console.log('DISCOVERED:', discovered);

  let finalUrls = [...new Set(discovered)].slice(0,10);

  if (finalUrls.length === 0) {
    console.log('Bing blocked, trying DuckDuckGo...');
    await page.goto('https://duckduckgo.com/?q=Houston+plumber+official+site', { waitUntil: 'networkidle2' });
    const ddg = await page.evaluate(() => Array.from(document.querySelectorAll('a[data-testid="result-title-a"]')).map(a=>a.href).slice(0,10));
    finalUrls = [...new Set(ddg)].slice(0,10);
  }

  if (finalUrls.length === 0) throw new Error('Search engines blocked — retry');

  // Save discovered - this is AGENT writing clients.txt, not you
  fs.writeFileSync('factory/clients.txt', finalUrls.join('\n'));
  console.log(`✅ AGENT DISCOVERED ${finalUrls.length} COMPANIES BY ITSELF — ZERO input from you`);

  // Now scrape each discovered URL for business name
  for (let url of finalUrls) {
    try {
      console.log(`Scraping ${url}...`);
      await page.goto(url, { timeout: 20000, waitUntil: 'domcontentloaded' });
      const info = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelector('h1')?.innerText || ''
      }));
      const bizName = (info.h1 || info.title).split('|')[0].split('-')[0].trim().substring(0,40);
      const slug = url.replace(/^https?:\/\/(www\.)?/,'').split('/')[0].replace(/[^a-z0-9]/gi,'-').toLowerCase() + '-houston';

      fs.writeFileSync(`factory/${slug}.json`, JSON.stringify({
        businessName: bizName,
        oldSite: url,
        city: 'Houston, TX',
        discoveredAt: new Date().toISOString(),
        autonomous: true
      }, null, 2));

      console.log(` → ${bizName} → ${slug}.json`);
    } catch(e) { console.log(` Failed ${url}`); }
  }

  await browser.close();
  console.log('DONE — Trial 10 autonomous. Check factory/*.json');
}

run();