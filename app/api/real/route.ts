export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function luxuryHtml(domain: string, cat: string, id: string, demoUrl: string){
  return `
<div style="background:#0a0a0a;padding:40px 20px;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#111;border:1px solid #222;border-radius:24px;padding:32px;">
    <div style="color:#666;font-size:10px;letter-spacing:4px;margin-bottom:24px;">VENUS HQ — GEN-Z LUXURY CONVERSION AGENCY</div>
    <h1 style="color:#fff;font-size:32px;line-height:1.1;margin:0;">Your new <i style="color:#d4b57a;font-weight:300;">luxury</i><br/>website is ready<br/>for ${domain}</h1>
    <div style="height:2px;width:40px;background:#d4b57a;margin:20px 0;"></div>
    <p style="color:#888;font-size:14px;line-height:1.6;">
      Hi, this is <b style="color:#fff;">Venus Plaza — Houston TX</b><br/>
      We build Gen-Z Luxury websites + 4 AI Agents that book jobs while you sleep.
      <br/><br/>
      Old: ${domain} — 8s load, no booking, no AI<br/>
      <b style="color:#fff;">New: Luxury + AI Receptionist + Instant Quote + Review Booster + SEO</b>
    </p>
    <div style="background:#0a0a0a;border:1px solid #222;border-radius:16px;padding:20px;margin:20px 0;">
      <p style="color:#fff;font-size:14px;margin:0 0 8px;">✓ AI Receptionist 24/7</p>
      <p style="color:#fff;font-size:14px;margin:0 0 8px;">✓ Instant Quote Bot</p>
      <p style="color:#fff;font-size:14px;margin:0 0 8px;">✓ Review Booster</p>
      <p style="color:#fff;font-size:14px;margin:0;">✓ SEO + Luxury Design</p>
    </div>
    <a href="${demoUrl}" style="display:block;text-align:center;background:#fff;color:#000;padding:18px;border-radius:100px;text-decoration:none;font-weight:800;letter-spacing:1px;margin:24px 0;">YOUR NEW WEBSITE — LIVE DEMO</a>
    <p style="color:#555;font-size:11px;text-align:center;">Demo ID: ${id} | Category: ${cat} | Built for ${domain}</p>
    <p style="color:#333;font-size:11px;text-align:center;margin-top:16px;">Venus HQ — 24/7 AI Growth Engine — Houston TX — Reply STOP to opt out</p>
  </div>
</div>`;
}

async function scrapeRealEmail(domain: string){
  try{
    const html = await fetch(`https://${domain}`, { signal: AbortSignal.timeout(8000) }).then(r=>r.text()).catch(()=> '');
    const m = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    if(m){
      const filtered = m.filter((e: string)=> !e.includes('sentry') && !e.includes('wix') && !e.includes('.png') && !e.includes('.jpg') && !e.toLowerCase().includes('example'));
      if(filtered.length>0) return filtered[0];
    }
  }catch{}
  return `info@${domain}`;
}

export async function GET(req: Request){
  const url = new URL(req.url);
  const cat = url.searchParams.get('cat') || 'roofers';
  const rawUrl = (process.env.KV_REST_API_URL || '').replace(/"/g,'').replace(/\/$/,'');
  const rawToken = (process.env.KV_REST_API_TOKEN || '').replace(/"/g,'').trim();
  const headers = { Authorization: `Bearer ${rawToken}` };

  const domainEnc: any = await fetch(`${rawUrl}/lpop/leads:${cat}`, {headers}).then(r=>r.json()).catch(()=>({result:null}));
  const domain = domainEnc.result ? decodeURIComponent(domainEnc.result) : null;
  if(!domain) return Response.json({ status:'QUEUE-EMPTY', cat, action:'Run /api/agents/mine?cat='+cat });

  const realEmail = await scrapeRealEmail(domain);
  const id = Math.random().toString(36).slice(2,8).toUpperCase();
  const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://venus-ai-v7.vercel.app';
  const demoUrl = `${base}/p/${id}?domain=${encodeURIComponent(domain)}&cat=${cat}`;

  const html = luxuryHtml(domain, cat, id, demoUrl);
  const sgKey = process.env.SENDGRID_API_KEY || '';

  if(sgKey){
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${sgKey}`, 'Content-Type':'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: realEmail }], subject: `Your new luxury website is ready for ${domain} — ${id}` }],
        from: { email: 'launch@venusplaza.online', name: 'Venus HQ — Houston' },
        content: [{ type: 'text/html', value: html }]
      })
    });
  }

  return Response.json({ status:'SENT-LUXURY-LOCKED', cat, domain, scraped_email: realEmail, sent_to: realEmail, demo_url: demoUrl, demo_id: id });
}
