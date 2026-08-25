import { kv } from '@vercel/kv';
import Brevo from '@getbrevo/brevo';

const BREVO_KEY = process.env.BREVO_API_KEY || process.env.BREVE_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const count = parseInt(searchParams.get('count') || '2');
  
  // 1. Rate limit - max 50 per hour to avoid Brevo ban
  const hourlyKey = `sent_hour:${new Date().toISOString().slice(0,13)}`;
  const hourlyCount = (await kv.get(hourlyKey) as number) || 0;
  if (hourlyCount > 50) {
    return Response.json({ ok: false, error: 'Hourly limit 50 reached, wait next hour' });
  }

  // 2. Get leads from KV queue or Sheet
  // ... your existing sheet fetch ...

  // 3. DEDUP CHECK - THIS FIXES 1000 EMAIL BUG
  let sent = 0;
  let skipped = 0;
  const results = [];

  for (const lead of leads.slice(0, count)) {
    const email = lead.email?.toLowerCase().trim();
    if (!email) continue;

    // CHECK IF ALREADY SENT EVER
    const alreadySent = await kv.sismember('sent_emails_global', email);
    if (alreadySent) {
      skipped++;
      continue;
    }

    // CHECK BREVO BLOCKLIST
    if (email.includes('emergencyplumberhouston.com')) {
      skipped++;
      continue; // skip known bouncer
    }

    // SEND
    try {
      const api = new Brevo.TransactionalEmailsApi();
      api.setApiKey(0, BREVO_KEY!);
      await api.sendTransacEmail({
        sender: { email: 'venusplaza7@11921043.brevosend.com', name: 'Venus AI' },
        to: [{ email }],
        subject: lead.subject,
        htmlContent: lead.body
      });

      // MARK AS SENT - THIS IS THE FIX
      await kv.sadd('sent_emails_global', email);
      await kv.incr(hourlyKey);
      await kv.expire(hourlyKey, 3600);
      sent++;
      results.push({ email, status: 'sent' });
      
    } catch (e:any) {
      // If soft bounce, add to blocklist
      if (e.message?.includes('bounce') || e.response?.body?.code === 'blocked') {
        await kv.sadd('bounced_emails', email);
      }
      results.push({ email, status: 'failed', error: e.message });
    }
  }

  return Response.json({ ok: true, sent, skipped, results, hourlyCount: hourlyCount + sent });
}
