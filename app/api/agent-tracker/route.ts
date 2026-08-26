mport { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

export async function GET(req: Request){
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');
  const action = url.searchParams.get('action');

  if(slug && action === 'paid'){
    const client = await kv.get(`client:${slug}`) as any;
    if(client){
      client.paymentStatus = 'paid';
      await kv.set(`client:${slug}`, client);
      await kv.set(`preview:${slug}`, {...client, status:'live'});
    }
    return Response.json({ ok:true, activated: slug });
  }

  const keys = await kv.keys('client:*');
  const clients = keys.length ? await kv.mget(...keys) : [];
  return Response.json({ agent:'TRACKER', clients });
}
