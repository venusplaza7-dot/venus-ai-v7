export const dynamic = 'force-dynamic';
export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const event = searchParams.get('event') || 'open'; // open or click
  const cat = searchParams.get('cat') || 'roofers';

  let rawUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  let rawToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  const url = rawUrl.replace(/"/g,'').replace(/'/g,'').trim().replace(/\/$/,'');
  const token = rawToken.replace(/"/g,'').replace(/'/g,'').trim();

  if(url && token){
    const h = {Authorization:`Bearer ${token}`};
    if(event==='open'){
      await fetch(`${url}/incr/open_count`, {headers:h, cache:'no-store'});
      await fetch(`${url}/incr/open:${cat}`, {headers:h, cache:'no-store'});
    }else{
      await fetch(`${url}/incr/click_count`, {headers:h, cache:'no-store'});
      await fetch(`${url}/incr/click:${cat}`, {headers:h, cache:'no-store'});
    }
  }

  // Return 1x1 transparent pixel for email opens
  if(event==='open'){
    return new Response(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'), {
      headers:{'Content-Type':'image/gif','Cache-Control':'no-store'}
    });
  }
  return Response.json({tracked:event, cat});
}

