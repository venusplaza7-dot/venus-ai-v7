export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get('cat') || 'roofers';

  let rawUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  let rawToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  const url = rawUrl.replace(/"/g,'').replace(/'/g,'').trim().replace(/\/$/,'');
  const token = rawToken.replace(/"/g,'').replace(/'/g,'').trim();

  const demoLink = `https://venus-ai-v8.vercel.app/p/demo-${Date.now()}?cat=${cat}`;
  let count = 0;

  if(url && token){
    const h = {Authorization:`Bearer ${token}`};
    try{
      // Total + category + save to list
      await fetch(`${url}/incr/sent_count`, {headers:h, cache:'no-store'});
      await fetch(`${url}/incr/cat:${cat}`, {headers:h, cache:'no-store'});
      await fetch(`${url}/set/last_link`, {method:'POST', headers:{...h,'Content-Type':'text/plain'}, body:demoLink, cache:'no-store'});
      const r = await fetch(`${url}/incr/sent_count`, {headers:h, cache:'no-store'}).then(r=>r.json());
      count = r.result || 0;
      await fetch(`${url}/lpush/recent_sends/${encodeURIComponent(demoLink)}`, {headers:h, cache:'no-store'});
      await fetch(`${url}/ltrim/recent_sends/0/19`, {headers:h, cache:'no-store'});
    }catch{}
  }

  return Response.json({
    status:'LIVE-INFINITE-FREE',
    count,
    cat,
    last_link: demoLink,
    track_open: `https://venus-ai-v8.vercel.app/api/track?event=open&cat=${cat}`,
    track_click: `https://venus-ai-v8.vercel.app/api/track?event=click&cat=${cat}&url=${encodeURIComponent(demoLink)}`
  });
}


