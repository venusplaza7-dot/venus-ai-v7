export const dynamic = 'force-dynamic';

export async function GET(){
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  try{
    // incr sent_count via REST - works with your FREE upstash-kv-time-field
    if(url && token){
      await fetch(`${url}/incr/sent_count`, { headers:{Authorization:`Bearer ${token}`} });
    }
    const link = `https://venus-ai-v8.vercel.app/p/demo-${Date.now()}?cat=roofers`;
    return Response.json({status:'LIVE-INFINITE-FREE', last_link:link, redis:'Available - Free - upstash-kv-time-field'});
  }catch(e:any){
    return Response.json({status:'LIVE-BUT-REDIS-SKIPPED', last_link:`https://venus-ai-v8.vercel.app/p/demo-${Date.now()}?cat=plumbers`, error:e.message},{status:200});
  }
}
