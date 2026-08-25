import { kv } from '@vercel/kv';
import * as Brevo from '@getbrevo/brevo';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const count = Math.min(parseInt(url.searchParams.get('count') || '50'), 50); // max 50 per call

  const BREVO_KEY = process.env.BREVO_API_KEY || process.env.BREVE_API_KEY;
  const brevo = new Brevo.TransactionalEmailsApi();
  // @ts-ignore
  brevo.setApiKey(0, BREVO_KEY);

  // --- 200/DAY LIMIT ---
  const today = new Date().toISOString().slice(0,10);
  const dayKey = `sent_day:${today}`;
  const sentToday = (await kv.get(dayKey) as number) || 0;
  if (sentToday >= 200) {
    return Response.json({ ok:false, error:'200/day limit reached', sentToday });
  }
  const remainingToday = 200 - sentToday;

  // --- FETCH LEADS: ANY NICHE 2010-2020 ---
  // Replace your old plumber-only fetch with this broad fetch
  // This assumes your sheet / KV has leads with {site, email, copyrightYear}
  // Filter for any copyright 2010-2020, any niche
  const allLeads = (await kv.get('leads_queue') as any[]) || [];
  
  const eligible = allLeads.filter(l => {
    const year = parseInt(l.copyrightYear || l.year || '0');
    const inRange = year >= 2010 && year <= 2020;
    const notPlumberOnly = true; // remove old filter: l.niche !== 'plumber'
    return inRange && notPlumberOnly && l.email;
  });

  let sent = 0;
  let skippedDup = 0;
  let skippedBounce = 0;
  const details = [];

  for (const lead of eligible.slice(0, Math.min(count, remainingToday))) {
    const email = lead.email.toLowerCase().trim();
    
    // DEDUP - fixes 1000 bug
    if (await kv.sismember('sent_emails_global', email)) { skippedDup++; continue; }
    if (await kv.sismember('bounced_emails', email)) { skippedBounce++; continue; }

    try {
      await brevo.sendTransacEmail({
        sender: { email: 'venusplaza7@11921043.brevosend.com', name: 'Venus AI' },
        to: [{ email }],
        subject: `Quick fix for ${lead.site} - site shows ${lead.copyrightYear}`,
        htmlContent: `
          <p>Hi team at ${lead.site},</p>
          <p>I noticed your site footer still shows © ${lead.copyrightYear}. We rebuild outdated sites (2010-2020) into modern luxury sites in 24H.</p>
          <p>Want a free preview?</p>
          <p>— Venus<br>venus-ai-v8.vercel.app</p>
          <hr>
          <p style="font-size:12px;color:#888">You received this because your business site appears outdated. If not relevant, <a href="https://venus-ai-v8.vercel.app/api/unsubscribe?email=${email}">unsubscribe here</a><br>Venus Plaza, Lahore, Pakistan</p>
        `,
      });

      await kv.sadd('sent_emails_global', email);
      await kv.incr(dayKey);
      await kv.expire(dayKey, 86400);
      sent++;
      details.push({ site: lead.site, email, status: 'sent', year: lead.copyrightYear });
    } catch (e:any) {
      const msg = e?.response?.body?.message || e.message;
      if (msg?.toLowerCase().includes('bounce') || msg?.toLowerCase().includes('blocked')) {
        await kv.sadd('bounced_emails', email);
      }
      details.push({ site: lead.site, email, status: 'failed', error: msg });
    }
  }

  return Response.json({ 
    project: 'Venus Agent HQ v2 - 200/day ANY niche 2010-2020',
    sentToday: sentToday + sent,
    remainingToday: remainingToday - sent,
    sentThisRun: sent,
    skippedDup,
    skippedBounce,
    details
  });
}
