export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const CATS: any = {
  roofers: 'roofers Houston TX',
  plumbers: 'plumbers Houston TX',
  hvac: 'HVAC contractor Houston TX',
  dentists: 'dentists Houston TX',
  electricians: 'electricians Houston TX'
};

async function mineFromSerp(cat: string, q: string){
  const key = (process.env.SERPLIFY_API_KEY || '').trim();
  if(!key) return [];
  try{
    const res: any = await fetch(`https://api.serplify.io/serp?q=${encodeURIComponent(q)}&gl=us&hl=en&location=Houston,Texas`, {
      headers: { 'X-API-KEY': key },
      signal: AbortSignal.timeout(15000)
    }).then(r=>r.json());
    const domains: string[] = [];
    const list = res.organic || res.results || [];
    for(const r of list){
      const link = r.link || r.url || '';
      if(!link) continue;
      try{
        const d = new URL(link).hostname.replace('www.','').toLowerCase();
        if(d && !d.includes('yelp') && !d.includes('facebook') && !d.includes('yellowpages') && !d.includes('youtube')) domains.push(d);
      }catch{}
    }
    return Array.from(new Set(domains)).slice(0,15);
  }catch{ return []; }
}

export async function GET(req: Request){
  const cat = new URL(req.url).searchParams.get('cat') || 'roofers';
  const query = CATS[cat] || CATS['roofers'];
  const rawUrl = (process.env.KV_REST_API_URL || '').replace(/"/g,'').replace(/\/$/,'');
  const rawToken = (process.env.KV_REST_API_TOKEN || '').replace(/"/g,'').trim();
  const headers = { Authorization: `Bearer ${rawToken}` };
  
  const domains = await mineFromSerp(cat, query);
  let added = 0;
  for(const d of domains){
    const exists: any = await fetch(`${rawUrl}/sismember/dedup:${cat}/${encodeURIComponent(d)}`, {headers}).then(r=>r.json()).catch(()=>({result:0}));
    if(exists.result===0){
      await fetch(`${rawUrl}/rpush/leads:${cat}/${encodeURIComponent(d)}`, {headers});
      await fetch(`${rawUrl}/sadd/dedup:${cat}/${encodeURIComponent(d)}`, {headers});
      added++;
    }
  }
  const qlen: any = await fetch(`${rawUrl}/llen/leads:${cat}`, {headers}).then(r=>r.json()).catch(()=>({result:0}));
  return Response.json({ status:'MINER-DONE-LUXURY-LOCKED', cat, found: domains.length, added_new: added, queue: qlen.result, domains });
}
