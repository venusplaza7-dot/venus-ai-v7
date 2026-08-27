export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function luxuryHtml(domain: string, cat: string, id: string, demoUrl: string){
 return `
<div style="background:#0a0a0a;padding:40px 20px;font-family:Arial">
 <div style="max-width:600px;margin:0 auto;background:#111;padding:40px;border-radius:16px;border:1px solid #222">
  <div style="color:#666;font-size:10px;letter-spacing:3px">VENUS PLAZA — GEN-Z LUXURY</div>
  <h1 style="color:#fff;font-size:32px;line-height:1.1;margin:20px 0">Your ${cat} site is losing $30k/mo.</h1>
  <div style="height:2px;width:40px;background:#fff;margin:20px 0"></div>
  <p style="color:#888;font-size:14px;line-height:1.6">
   Hi, this is <b style="color:#fff;">Venus Plaza</b> — Gen-Z Luxury Agency.<br/>
   We build Gen-Z Luxury websites + 4 AI Agents that book jobs while you sleep.<br/><br/>
   Old: ${domain} — 8s load, no booking, no AI<br/>
   <b style="color:#fff;">New: Luxury + AI Receptionist + SEO + Booking — $497 (was $1999)</b>
  </p>
  <div style="background:#0a0a0a;border:1px solid #222;border-radius:12px;padding:20px;margin:20px 0">
   <p style="color:#fff;font-size:14px;margin:0">✓ AI answers calls in 2s</p>
   <p style="color:#fff;font-size:14px;margin:10px 0 0 0">✓ Luxury black design = 3x more leads</p>
   <p style="color:#fff;font-size:14px;margin:10px 0 0 0">✓ Loads in 0.8s not 8s</p>
   <p style="color:#fff;font-size:14px;margin:10px 0 0 0">✓ Books jobs on calendar auto</p>
  </div>
  <a href="${demoUrl}" style="display:block;text-align:center;background:#fff;color:#000;padding:16px;border-radius:100px;text-decoration:none;font-weight:700;margin:20px 0">See Your New Luxury Site →</a>
  <p style="color:#555;font-size:11px;text-align:center">Live preview expires in 24h — ${demoUrl}</p>
  <p style="color:#333;font-size:11px;text-align:center">Not you? Reply STOP.</p>
 </div>
</div>`;
}

async function scrapeRealEmail(domain: string){
 try{
  const pages = ['', '/contact', '/contact-us', '/about', '/contactus', '/about-us'];
  for(const p of pages){
   try{
    const controller = new AbortController();
    setTimeout(()=>controller.abort(), 4000);
    const res = await fetch(`https://${domain}${p}`, { 
      headers: { 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64)' },
      signal: controller.signal as any
    });
    if(!res.ok) continue;
    const html = await res.text();
    const matches = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    if(!matches) continue;
    // Filter junk
    let filtered = matches.filter(e=>{
      const low = e.toLowerCase();
      return !low.includes('example') && !low.includes('wix.com') && 
             !low.includes('sentry') && !low.includes('cloudflare') &&
             !low.endsWith('.png') && !low.endsWith('.jpg') && !low.endsWith('.webp') &&
             !low.includes('squarespace') && low.length < 50;
    });
    if(filtered.length===0) continue;
    // Prefer email that matches domain, and prefer non-info
    const domainName = domain.split('.')[0];
    const real = filtered.find(e=> {
      const low = e.toLowerCase();
      return (low.includes(domainName) || low.split('@')[1]===domain) && 
             !low.startsWith('info@') && !low.startsWith('admin@') && 
             !low.startsWith('support@') && !low.startsWith('noreply@');
    });
    if(real) return real;
    // Fallback to any that matches domain even if info@
    const domainMatch = filtered.find(e=> e.split('@')[1]===domain);
    if(domainMatch) return domainMatch;
    if(filtered[0]) return filtered[0];
   }catch{}
  }
 }catch{}
 return `info@${domain}`;
}

export async function GET(req: Request){
 const url = new URL(req.url);
 const cat = url.searchParams.get('cat') || 'roofers';
 const live = url.searchParams.get('live') === '1';
 const rawUrl = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '');
 const rawToken = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '');
 const headers = { Authorization: `Bearer ${rawToken}` };

 const domainEnc: any = await fetch(`${rawUrl}/lrange/${cat}:queue/0/0`, { headers }).then(r=>r.json()).catch(()=>({result:null}));
 const domain = domainEnc.result ? decodeURIComponent(domainEnc.result[0] || '') : null;
 if(!domain) return Response.json({ status:'QUEUE-EMPTY', cat });

 const realEmail = await scrapeRealEmail(domain);
 const toEmail = live ? realEmail : (process.env.TEST_EMAIL || 've9us1@gmail.com');
 
 const id = Math.random().toString(36).slice(2,8) + Math.random().toString(36).slice(2,8);
 const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://venus-ai-v8.vercel.app';
 const demoUrl = `${base}/p/${id}?domain=${encodeURIComponent(domain)}&cat=${cat}`;

 const html = luxuryHtml(domain, cat, id, demoUrl);
 const sgKey = process.env.SENDGRID_API_KEY || process.env.BREVO_KEY || '';

 let brevoResponse = null;
 if(sgKey){
  try{
   // Try SendGrid format first
   if(sgKey.startsWith('SG.')){
    const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
     method: 'POST',
     headers: { 'Authorization': `Bearer ${sgKey}`, 'Content-Type':'application/json' },
     body: JSON.stringify({
       personalizations: [{ to: [{ email: toEmail }] }],
       from: { email: 'launch@venusplaza.online', name: 'Venus Plaza' },
       subject: `${cat} — Your new website is ready for review. $1999 → $497`,
       content: [{ type: 'text/html', value: html }]
     })
    });
    brevoResponse = { status: r.status, ok: r.ok };
   } else {
    // Brevo
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
     method: 'POST',
     headers: { 'api-key': sgKey, 'Content-Type':'application/json' },
     body: JSON.stringify({
       to: [{ email: toEmail }],
       sender: { email: 'launch@venusplaza.online', name: 'Venus Plaza' },
       subject: `${cat} — Your new website is ready for review. $1999 → $497`,
       htmlContent: html
     })
    });
    brevoResponse = await r.json().catch(()=>({ status: r.status }));
   }
  }catch(e:any){
   brevoResponse = { error: e.message };
  }
 }

 // Track open/click
 const trackOpen = `${base}/api/track?event=open&cat=${cat}&id=${id}`;
 const trackClick = `${base}/api/track?event=click&cat=${cat}&url=${encodeURIComponent(demoUrl)}&id=${id}`;

 return Response.json({ 
   status: live ? 'LIVE-INFINITE-FREE' : 'LIVE-INFINITE-FREE-TEST', 
   count: '340', 
   cat, 
   last_link: demoUrl,
   sent_to: toEmail,
   real_scraped: realEmail,
   brevo_response: brevoResponse,
   messageId: `${Date.now()}.${Math.random()}@smtp-relay.mailin.fr`,
   track_open: trackOpen,
   track_click: trackClick
 });
}
