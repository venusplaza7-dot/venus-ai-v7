export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function luxuryHtml(domain: string, cat: string, demoUrl: string) {
  return `
<div style="background:#0a0a0a;padding:40px 20px;font-family:Arial,sans-serif">
 <div style="max-width:600px;margin:0 auto;background:#111;padding:40px;border-radius:16px;border:1px solid #222">
  <div style="color:#666;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px">VENUS PLAZA — GEN-Z LUXURY AGENCY</div>
  <h1 style="color:#fff;font-size:32px;line-height:1.1;margin:0 0 10px 0;font-weight:900">Your ${cat} site is losing $30k/mo.</h1>
  <div style="height:2px;width:40px;background:#fff;margin:16px 0"></div>
  <p style="color:#888;font-size:14px;line-height:1.7;margin:0">
   Hi, this is <b style="color:#fff;">Venus Plaza</b> — we build Gen-Z Luxury websites + 4 AI Agents that book jobs while you sleep.<br/><br/>
   Old: <span style="color:#555">${domain}</span> — 8s load, no booking, no AI, losing to competitors<br/>
   <b style="color:#fff;">New: Luxury black design + AI Receptionist that answers in 2s + Auto-booking + SEO — $497 (was $1999)</b><br/><br/>
   I built you a live preview — takes 60 sec to see:
  </p>
  <div style="background:#0a0a0a;border:1px solid #222;border-radius:12px;padding:20px;margin:20px 0">
   <p style="color:#fff;font-size:14px;margin:0 0 8px 0">✓ AI answers calls & books on calendar</p>
   <p style="color:#fff;font-size:14px;margin:0 0 8px 0">✓ Luxury black = 3x more high-ticket leads</p>
   <p style="color:#fff;font-size:14px;margin:0 0 8px 0">✓ Loads in 0.8s not 8s — Google loves it</p>
   <p style="color:#fff;font-size:14px;margin:0">✓ 24/7 — works while you sleep</p>
  </div>
  <a href="${demoUrl}" style="display:block;text-align:center;background:#fff;color:#000;padding:18px;border-radius:100px;text-decoration:none;font-weight:800;font-size:16px;letter-spacing:0.5px">👉 See Your New Luxury Site →</a>
  <p style="color:#555;font-size:11px;text-align:center;margin-top:16px">Live preview expires in 24h — built for ${domain}</p>
  <p style="color:#333;font-size:11px;text-align:center;margin-top:8px">Not you? Reply STOP — Venus Plaza, Lahore — launch@venusplaza.online</p>
 </div>
</div>`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const live = url.searchParams.get('live') === '1';

  const rawUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  const rawToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  const headers = { Authorization: `Bearer ${rawToken}` };

  const niches = ['roofers', 'plumbers', 'electricians', 'dentists', 'contractors'];
  const sgKey = process.env.SENDGRID_API_KEY || process.env.BREVO_KEY || '';
  const testEmail = process.env.TEST_EMAIL || 've9us1@gmail.com';

  const blasted: any[] = [];

  for (const cat of niches) {
    const all: any = await fetch(`${rawUrl}/lrange/${cat}:queue/0/-1`, { headers }).then(r => r.json()).catch(() => ({ result: [] }));
    let domains = (all.result || []).map((d: string) => { try { return decodeURIComponent(d); } catch { return d; } }).filter(Boolean);
    domains = domains.sort(() => 0.5 - Math.random()).slice(0, 10);

    for (const domain of domains) {
      const em: any = await fetch(`${rawUrl}/get/${cat}:email:${encodeURIComponent(domain)}`, { headers }).then(r => r.json()).catch(() => ({ result: null }));
      const realEmail = em.result? decodeURIComponent(em.result) : `info@${domain}`;
      const toEmail = live? realEmail : testEmail;

      const id = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
      const base = process.env.VERCEL_URL? `https://${process.env.VERCEL_URL}` : 'https://venus-ai-v8.vercel.app';
      const demoUrl = `${base}/p/${id}?domain=${encodeURIComponent(domain)}&cat=${cat}`;
      const html = luxuryHtml(domain, cat, demoUrl);

      try {
        if (sgKey.startsWith('SG.')) {
          await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: { Authorization: `Bearer ${sgKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              personalizations: [{ to: [{ email: toEmail }] }],
              from: { email: 'launch@venusplaza.online', name: 'Venus Plaza' },
              subject: `${domain} — Your new Luxury ${cat} site is ready (preview inside)`,
              content: [{ type: 'text/html', value: html }],
            }),
          });
        } else {
          await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: { 'api-key': sgKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: [{ email: toEmail }],
              sender: { email: 'launch@venusplaza.online', name: 'Venus Plaza' },
              subject: `${domain} — Your new Luxury ${cat} site is ready (preview inside)`,
              htmlContent: html,
            }),
          });
        }
        blasted.push({ cat, domain, realEmail, sent_to: toEmail, demo: demoUrl });
      } catch (e: any) {
        blasted.push({ cat, domain, realEmail, error: e.message });
      }
      await new Promise(r => setTimeout(r, 900));
    }
  }

  return Response.json({
    status: live? 'BLAST-5-LUXURY-LIVE-EVEN' : 'BLAST-5-LUXURY-TEST-EVEN',
    total: blasted.length,
    evenSplit: '10 per niche x 5 = 50',
    luxury: 'Gen-Z black + Hi this is Venus Plaza intro preserved',
    blasted,
  });
}
