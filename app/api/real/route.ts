export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get('cat') || 'roofers';
  let rawUrl = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '').replace(/"/g,'').replace(/\/$/,'');
  let rawToken = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '').replace(/"/g,'').trim();
  const brevoKey = (process.env.BREVO_API_KEY || '').replace(/"/g,'').trim();

  const demoId = Date.now();
  const demoLink = `https://venus-ai-v8.vercel.app/p/demo-${demoId}?cat=${cat}`;
  const oldDomain = `24hr${cat}houston.com`;
  let count = 0;
  let sentTo = 'none';
  let brevoRes = 'skipped';

  if(rawUrl && rawToken){
    const h = {Authorization:`Bearer ${rawToken}`};
    try{
      await fetch(`${rawUrl}/incr/sent_count`, {headers:h});
      await fetch(`${rawUrl}/incr/cat:${cat}`, {headers:h});
      await fetch(`${rawUrl}/set/last_link/${encodeURIComponent(demoLink)}`, {headers:h});
      const r = await fetch(`${rawUrl}/get/sent_count`, {headers:h}).then(r=>r.json());
      count = r.result || 0;
    }catch(e){}
  }

  const toEmail = process.env.TEST_EMAIL || 've9us1@gmail.com';

  if(brevoKey){
    try{
      const html = `
<div style="background:#0a0a0a;padding:20px;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden">
  <div style="padding:32px 28px 20px 28px">
    <div style="color:#666;font-size:10px;letter-spacing:3px;text-transform:uppercase">VENUS HQ - AGENT AUDIT</div>
    <div style="color:#fff;font-size:38px;line-height:1.1;font-weight:700;margin-top:16px">Your new <i style="color:#d4b57a;font-weight:300">website</i> is ready<br>for review.</div>
    <div style="height:2px;width:40px;background:#d4b57a;margin:18px 0"></div>
    <div style="color:#666;font-size:13px;line-height:1.6">OLD: <span style="color:#4a8af4">${oldDomain}</span> - 8s load, no AI<br>NEW: <span style="color:#fff;font-weight:bold">Gen-Z Luxury Black/White/Gold</span> + 4 AI Agents</div>
    <a href="${demoLink}" style="display:inline-block;margin-top:20px;background:#fff;color:#000;padding:14px 24px;border-radius:100px;font-size:12px;letter-spacing:2px;font-weight:700;text-decoration:none">VIEW LIVE PROPOSAL</a>
  </div>
  <div style="border-top:1px solid #222;padding:28px;text-align:center">
    <div style="color:#555;font-size:9px;letter-spacing:4px">INVITATION TO LAUNCH</div>
    <div style="color:#fff;font-size:42px;line-height:1.1;margin-top:10px">Launch within<br><span style="color:#d4b57a">24 hours.</span></div>
    <a href="https://wa.me/17865880578?text=Hi%20Venus%20-%20I%20want%20to%20launch%20my%20${cat}%20site%20${demoLink}" style="display:inline-block;margin-top:20px;background:#00d26a;color:#000;padding:16px 32px;border-radius:100px;font-size:12px;letter-spacing:2px;font-weight:800;text-decoration:none">CONFIRM VIA WHATSAPP</a>
    <div style="color:#555;font-size:11px;margin-top:14px">DIRECT +1 (786) 588-0578 - <span style="text-decoration:line-through">$1999</span> -> <span style="color:#fff">$497</span></div>
  </div>
</div>
<p style="text-align:center;color:#555;font-size:11px;margin-top:12px"><a href="https://venus-ai-v8.vercel.app/api/unsubscribe?email=${toEmail}" style="color:#888">Unsubscribe</a></p>
<img src="https://venus-ai-v8.vercel.app/api/track?event=open&cat=${cat}" width="1" height="1"/>
</div>`;
      const res = await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':brevoKey,'Content-Type':'application/json'},body:JSON.stringify({sender:{name:'Venus HQ',email:'noreply@venushq7.com'},to:[{email:toEmail}],subject:`Your new ${cat} website is ready for review.`,htmlContent:html})});
      const j = await res.json();
      brevoRes = JSON.stringify(j).slice(0,300);
      sentTo = toEmail;
    }catch(e:any){ brevoRes = 'error:'+e.message; }
  }

  return Response.json({status:'LIVE-INFINITE-FREE',count,cat,last_link:demoLink,sent_to:sentTo,brevo_response:brevoRes,track_open:`https://venus-ai-v8.vercel.app/api/track?event=open&cat=${cat}`,track_click:`https://venus-ai-v8.vercel.app/api/track?event=click&cat=${cat}&url=${encodeURIComponent(demoLink)}`});
}
