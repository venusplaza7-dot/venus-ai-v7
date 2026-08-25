import { kv } from '@vercel/kv';
import * as Brevo from '@getbrevo/brevo';
import dns from 'dns/promises';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const count = Math.min(parseInt(url.searchParams.get('count') || '20'), 50);

  const BREVO_KEY = process.env.BREVO_API_KEY || process.env.BREVE_API_KEY;
  const brevo = new Brevo.TransactionalEmailsApi();
  // @ts-ignore
  brevo.setApiKey(0, BREVO_KEY);

  const today = new Date().toISOString().slice(0,10);
  const dayKey = `sent_day:${today}`;
  const sentToday = (await kv.get(dayKey) as number) || 0;
  if (sentToday >= 200) return Response.json({ ok:false, error:'200/day limit', sentToday });

  const allLeads = (await kv.get('leads_queue') as any[]) || [];

  // ANY NICHE 2010-2020
  const eligible = allLeads.filter((l:any) => {
    const y = parseInt(l.copyrightYear || '0');
    return y >= 2010 && y <= 2020 && l.site && l.email;
  });

  let sent = 0, bad = 0, dup = 0;
  const details = [];

  for (const lead of eligible.slice(0, count)) {
    let email = String(lead.email).toLowerCase().trim();

    // === VERIFICATION - FIXES YOUR BOUNCE ===
    // 1. Syntax
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { bad++; continue; }
    // 2. Skip risky generic guesses if not verified
    if (['info@','contact@','admin@','sales@','support@'].some(p=>email.startsWith(p)) &&!lead.verified) {
      // try to find better email, if not skip
      if (!lead.realEmail) { bad++; continue; }
      email = lead.realEmail;
    }
    // 3. MX check
    try {
      const mx = await dns.resolveMx(email.split('@')[1]);
      if (!mx.length) { await kv.sadd('bounced_emails', email); bad++; continue; }
    } catch { await kv.sadd('bounced_emails', email); bad++; continue; }

    // DEDUP
    if (await kv.sismember('sent_emails_global', email)) { dup++; continue; }
    if (await kv.sismember('bounced_emails', email)) { dup++; continue; }

    try {
      await brevo.sendTransacEmail({
        sender: { email: 'venusplaza7@11921043.brevosend.com', name: 'Venus' },
        to: [{ email }],
        subject: `Your site ${lead.site} shows © ${lead.copyrightYear}`,
        htmlContent: `<p>Hi ${lead.site} team,</p><p>Noticed footer shows © ${lead.copyrightYear}. We upgrade 2010-2020 sites to modern luxury in 24h.</p><p>Free preview?</p><p>— Venus<br><a href="https://venus-ai-v8.vercel.app">venus-ai-v8.vercel.app</a></p><hr><p style="font-size:11px;color:#999">Unsubscribe <a href="https://venus-ai-v8.vercel.app/api/unsubscribe?email=${email}">here</a> | Venus Plaza, Lahore</p>`
      });
      await kv.sadd('sent_emails_global', email);
      await kv.incr(dayKey);
      sent++;
      details.push({site:lead.site, email, year:lead.copyrightYear, status:'sent'});
    } catch(e:any){
      await kv.sadd('bounced_emails', email);
      details.push({site:lead.site, email, status:'bounced', error:e.message});
    }
  }

  return Response.json({ ok:true, sentToday: sentToday+sent, sent, badSkipped: bad, dupSkipped: dup, details });
}
