import { kv } from '@vercel/kv';
export const dynamic = 'force-dynamic';

export async function GET(){
  // Example: scrape from your source (you can change source to Google Places, etc)
  const sources = ['https://24hrplumbinghouston.com', 'https://quickfixplumbinghouston.com']; // replace with your list

  const newLeads:any[] = [];
  for(const site of sources){
    try{
      const html = await fetch(site, { headers:{'User-Agent':'Mozilla/5.0'}, signal: AbortSignal.timeout(8000) }).then(r=>r.text()).catch(()=>'' );
      if(!html) continue;
      const yearMatch = html.match(/©\s*(20(1[0-9]|20))/) || html.match(/copyright.*(20(1[0-9]|20))/i);
      const year = yearMatch? yearMatch[1] : null;
      if(!year || parseInt(year) < 2010 || parseInt(year) > 2020) continue;

      // SCRAPE REAL EMAIL - not guess info@
      const emails = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      const realEmail = emails.find(e=>!e.includes('sentry') &&!e.includes('wix') &&!e.includes('example')) || null;
      if(!realEmail) continue;

      // VERIFY MX
      // simple syntax already done, MX will be checked in sender

      newLeads.push({ site, copyrightYear: year, email: realEmail.toLowerCase(), verified: true, niche: 'plumber', scrapedAt: new Date().toISOString() });
    }catch{}
  }
  const existing = (await kv.get('leads_queue') as any[]) || [];
  await kv.set('leads_queue', [...existing,...newLeads]);
  return Response.json({ agent: 'SCRAPER', found: newLeads.length, range: '2010-2020', sample: newLeads.slice(0,3) });
}



