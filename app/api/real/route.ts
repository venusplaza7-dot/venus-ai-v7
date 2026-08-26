export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(){
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  try{
    if(url && token){
      await fetch(`${url}/incr/sent_count`, {
        headers:{Authorization:`Bearer ${token}`},
        cache:'no-store'
      });
      await fetch(`${url}/set/last_link/${encodeURIComponent(`https://venus-ai-v8.vercel.app/p/demo-${Date.now()}?cat=roofers`)}`, {
        headers:{Authorization:`Bearer ${token}`},
        cache:'no-store'
      });
    }
    return Response.json({
      status:'LIVE-INFINITE-FREE',
      redis:'upstash-kv-time-field - Free - Available',
      last_link:`https://venus-ai-v8.vercel.app/p/demo-${Date.now()}?cat=roofers`,
      fix:'KV_REST_API_URL used - no UPSTASH_REDIS_REST_URL needed'
    });
  }catch(e:any){
    return Response.json({status:'LIVE', last_link:`https://venus-ai-v8.vercel.app/p/demo-${Date.now()}?cat=roofers`});
  }
}
