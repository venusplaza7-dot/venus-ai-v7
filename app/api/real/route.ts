export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(){
  let rawUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  let token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  // CLEAN - remove quotes and trailing slash
  const url = rawUrl.replace(/"/g,'').replace(/'/g,'').trim().replace(/\/$/,'');
  token = token.replace(/"/g,'').replace(/'/g,'').trim();
  
  const demoLink = `https://venus-ai-v8.vercel.app/p/demo-${Date.now()}?cat=roofers`;
  let debug = `clean_url:${url} token_len:${token.length}`;

  if(url && token){
    try{
      const h = {Authorization:`Bearer ${token}`};
      const r1 = await fetch(`${url}/incr/sent_count`, {headers:h, cache:'no-store'}).then(r=>r.json());
      debug += ` incr:${JSON.stringify(r1)}`;
      const r2 = await fetch(`${url}/set/last_link/${encodeURIComponent(demoLink)}`, {headers:h, cache:'no-store'}).then(r=>r.json());
      debug += ` set:${JSON.stringify(r2)}`;
    }catch(e:any){ debug += ` err:${e.message}`; }
  }

  return Response.json({status:'LIVE-INFINITE-FREE', redis:'upstash-kv-time-field', last_link:demoLink, debug});
}
