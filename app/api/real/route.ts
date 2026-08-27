export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const CATS: any = {
  roofers: 'roofers Houston TX',
  plumbers: 'plumbers Houston TX',
  hvac: 'HVAC Houston TX',
  dentists: 'dentists Houston TX',
  electricians: 'electricians Houston TX'
};

async function mineSerplify(cat: string, query: string){
  const key = (process.env.SERPLIFY_API_KEY || '').trim();
  if(!key) return [];
  try{
    const res = await fetch(`https://api.serplify.io/serp?q=${encodeURIComponent(query)}&location=Houston,Texas&gl=us&hl=en`, {
      headers: { 'X-API-KEY': key },
      signal: AbortSignal.timeout(12000)
    }).then(r=>r.json());
    const domains: string[] = [];
    const results = res.organic || res.results || res.organic_results || [];
    for(const r of results){
      let link = r.link || r.url || r.website || '';
      if(link){
        try{
          const u = new URL(link);
          let d = u.hostname.replace('www.','').toLowerCase();
          if(d && !d.includes('yelp') && !d.includes('facebook') && !d.includes('youtube') && !d.includes('serplify')) domains.push(d);
        }catch{}
      }
    }
    return Array.from(new Set(domains)).slice(0,15);
  }catch{ return []; }
}

export async function GET(req: Request){
  const cat = new URL(req.url).searchParams.get('cat') || 'roofers';
  const query = CATS[cat] || CATS['roofers'];
  let rawUrl = (process.env.KV_REST_API_URL || '').replace(/"/g,'').replace(/\/$/,'');
  let rawToken = (process.env.KV_REST_API_TOKEN || '').replace(/"/g,'').trim();
  const h = {Authorization:`Bearer ${rawToken}`};
  const domains = await mineSerplify(cat, query);
  let added = 0;
  for(const d of domains){
    const ex = await fetch(`${rawUrl}/sismember/dedup:${cat}/${encodeURIComponent(d)}`, {headers:h}).then(r=>r.json()).catch(()=>({result:0}));
    if(ex.result===0){
      await fetch(`${rawUrl}/rpush/leads:${cat}/${encodeURIComponent(d)}`, {headers:h});
      await fetch(`${rawUrl}/sadd/dedup:${cat}/${encodeURIComponent(d)}`, {headers:h});
      added++;
    }
  }
  const qlen = await fetch(`${rawUrl}/llen/leads:${cat}`, {headers:h}).then(r=>r.json()).catch(()=>({result:0}));
  return Response.json({status:'MINER-DONE-SERPLIFY', cat, query, found: domains.length, added_new: added, queue: qlen.result, domains});
}
