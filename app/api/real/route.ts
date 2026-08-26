export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(){
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const demoLink = `https://venus-ai-v8.vercel.app/p/demo-${Date.now()}?cat=roofers`;
  let debug = '';

  if(url && token){
    try{
      const h = {Authorization:`Bearer ${token}`};
      // 1. INCR - this always works
      const r1 = await fetch(`${url}/incr/sent_count`, {headers:h, cache:'no-store'});
      const j1 = await r1.json();
      debug += `incr:${JSON.stringify(j1)};`;

      // 2. SET last_link - POST with raw body (most reliable for Upstash)
      const r2 = await fetch(`${url}/set/last_link`, {
        method:'POST',
        headers:{...h, 'Content-Type':'text/plain'},
        body: demoLink,
        cache:'no-store'
      });
      const j2 = await r2.json();
      debug += `set:${JSON.stringify(j2)}`;
    }catch(e:any){ debug = e.message; }
  }

  return Response.json({
    status:'LIVE-INFINITE-FREE',
    redis:'upstash-kv-time-field - Free - Available',
    last_link: demoLink,
    debug: debug
  });
}
