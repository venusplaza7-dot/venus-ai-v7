// factory/agent.js - ANONYMOUS AGENT - scrapes any URL, no manual info
import fs from 'fs';

async function scrape(url) {
  console.log(`Scraping ${url}...`);
  const html = await (await fetch(url)).text();
  const phone = html.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] || "Not found";
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1] || "Business";
  const images = (html.match(/<img /g) || []).length;
  const services = [...html.matchAll(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/gi)].slice(0,4).map(m=>m[1].replace(/<[^>]+>/g,'').trim()).filter(Boolean);
  return { oldSite: url, phone, title, images, services, city: "Houston, TX", scrapedAt: new Date().toISOString() };
}

async function run(url) {
  if(!url){ console.log("Usage: node factory/agent.js https://example.com"); return; }
  const slug = url.replace(/https?:\/\//,'').replace(/www\./,'').split('.')[0].replace(/[^a-z0-9]+/g,'-') + "-houston";
  const data = await scrape(url);
  console.log("SCRAPED:", data);
  fs.writeFileSync(`factory/${slug}.json`, JSON.stringify(data, null, 2));
  console.log(`Saved factory/${slug}.json -> preview /p/${slug}`);

  // Auto email test - anonymous
  await fetch("https://venus-ai-v7.vercel.app/api/outreach", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ business: slug, email: "ve9us1@gmail.com", name: data.title, oldSite: url })
  });
  console.log(`Email sent for ${slug}`);
}

run(process.argv[2]);


