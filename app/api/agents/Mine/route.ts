
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const CATS = {
  roofers: 'roofers Houston TX',
  plumbers: 'plumbers Houston TX',
  hvac: 'HVAC contractors Houston TX',
  dentists: 'dentists Houston TX',
  electricians: 'electricians Houston TX'
};

async function mineFromSerp(cat: string, query: string): Promise<string[]> {
  const serpKey = (process.env.SERPAPI_KEY || '').replace(/"/g,'').trim();
  if(!serpKey) return [];

  // SerpAPI Google Maps search
  const url = `https://serpapi.com/search.json?engine=google_maps&q=${encodeURIComponent(query)}&ll=@29.7604,-95.3698,11z&type=search&api_key=${serpKey}`;
  try {
    const res = await fetch(url, {signal: AbortSignal.timeout(15000)}).then(r=>r.json());
    const domains: string[] = [];
    for(const p of (res.local_results || [])){
      let website = p.website || p.link || '';
      if(website){
        try{
          const u = new URL(website);
          let d = u.hostname.replace('www.','');
          if(d &&!d.includes('facebook') &&!d.includes('yelp') &&!d.includes('google')) domains.push(d);
        }catch{}
      }
    }
    return [...new Set(domains)].slice(0, 20);
  } catch { return []; }
}

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const targetCat = searchParams.get('cat') || 'all';
  const catsToMine = targetCat === 'all'? Object.keys(CATS) : [targetCat];

  let rawUrl = (process.env.KV_REST_API_URL || '').replace(/"/g,'').replace(/\/$/,'');
  let rawToken = (process.env.KV_REST_API_TOKEN || '').replace(/"/g,'').trim();
  const h = {Authorization:`Bearer ${rawToken}`};

  let totalMined: any = {};

  for(const cat of catsToMine){
    const query = (CATS as any)[cat];
    const domains = await mineFromSerp(cat, query);

    // Push to KV + dedupe with SADD
    let added = 0;
    for(const d of domains){
      const exists = await fetch(`${rawUrl}/sismember/dedup:${cat}/${encodeURIComponent(d)}`, {headers:h}).then(r=>r.json()).catch(()=>({result:0}));
      if(exists.result === 0){
        await fetch(`${rawUrl}/rpush/leads:${cat}/${encodeURIComponent(d)}`, {headers:h});
        await fetch(`${rawUrl}/sadd/dedup:${cat}/${encodeURIComponent(d)}`, {headers:h});
        added++;
      }
    }
    const qlen = await fetch(`${rawUrl}/llen/leads:${cat}`, {headers:h}).then(r=>r.json()).catch(()=>({result:0}));
    totalMined[cat] = {found: domains.length, added_new: added, queue: qlen.result, domains};
  }

  return Response.json({status:'MINER-AGENTS-DONE', mined: totalMined});
}
