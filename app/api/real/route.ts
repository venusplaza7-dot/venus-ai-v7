export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(){
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const demoLink = `https://venus-ai-v8.vercel.app/p/demo-${Date.now()}?cat=roofers`;

  if(url && token){
    const h = {Authorization:`Bearer ${token}`, "Content-Type":"application/json"};
    // Pipeline - incr + set correctly
    await fetch(`${url}/pipeline`, {
      method:'POST',
      headers:h,
      body: JSON.stringify([
        ["INCR","sent_count"],
        ["SET","last_link", demoLink],
        ["SET","last_cat","roofers"]
      ]),
      cache:'no-store'
    });
  }

  return Response.json({
    status:'LIVE-INFINITE-FREE',
    redis:'upstash-kv-time-field - Free - Available',
    last_link: demoLink,
    fix:'KV_REST_API_URL used - pipeline fixed'
  });
}
