
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get('cat') || 'roofers';
  const force = searchParams.get('force');

  let rawUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || ''
  let rawToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ''
  const url = rawUrl.replace(/"/g,'').replace(/\/$/,'')
  const token = rawToken.replace(/"/g,'').trim()
  const brevoKey = (process.env.BREVO_API_KEY || '').replace(/"/g,'').trim()

  const demoId = Date.now()
  const demoLink = `https://venus-ai-v8.vercel.app/p/demo-${demoId}?cat=${cat}`
  let count = 0;
  let sentTo = 'none';
  let brevoRes = 'skipped';

  // 1. INCR count
  if(url && token){
    const h = {Authorization:`Bearer ${token}`}
    try{
      await fetch(`${url}/incr/sent_count`, {headers:h})
      await fetch(`${url}/incr/cat:${cat}`, {headers:h})
      await fetch(`${url}/set/last_link/${encodeURIComponent(demoLink)}`, {headers:h})
      const r = await fetch(`${url}/incr/sent_count`, {headers:h}).then(r=>r.json())
      count = r.result || 0;
      await fetch(`${url}/lpush/recent_sends/${encodeURIComponent(demoLink)}`, {headers:h})
      await fetch(`${url}/ltrim/recent_sends/0/20`, {headers:h})
    }catch(e){}
  }

  // 2. SEND EMAIL VIA BREVO - THIS WAS MISSING
  try{
    // TODO: replace with your real leads list
    // For now sends to you to confirm Brevo works again
    const toEmail = process.env.TEST_EMAIL || 've9us1@gmail.com'
    
    if(brevoKey){
      const res = await fetch('https://api.brevo.com/v3/smtp/email',{
        method:'POST',
        headers:{'api-key': brevoKey, 'Content-Type':'application/json'},
        body: JSON.stringify({
          sender:{name:'Venus AI', email:'noreply@venushq7.com'},
          to:[{email: toEmail}],
          subject: `Demo for ${cat} - ${demoId}`,
          htmlContent: `<h1>New Demo Ready</h1><p>Category: ${cat}</p><p><a href="${demoLink}">${demoLink}</a></p><img src="https://venus-ai-v8.vercel.app/api/track?event=open&cat=${cat}" width="1" height="1"/>`
        })
      })
      const j = await res.json()
      brevoRes = JSON.stringify(j).slice(0,200)
      sentTo = toEmail
    }else{
      brevoRes = 'BREVO_API_KEY missing in Vercel env'
    }
  }catch(e:any){
    brevoRes = 'error:'+ e.message
  }

  return Response.json({
    status:'LIVE-INFINITE-FREE',
    count,
    cat,
    last_link: demoLink,
    sent_to: sentTo,
    brevo_response: brevoRes,
    track_open: `https://venus-ai-v8.vercel.app/api/track?event=open&cat=${cat}`,
    track_click: `https://venus-ai-v8.vercel.app/api/track?event=click&cat=${cat}&url=${encodeURIComponent(demoLink)}`
  });
}

