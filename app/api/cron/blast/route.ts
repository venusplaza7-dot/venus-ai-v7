export const dynamic = 'force-dynamic';
import { kv } from '@vercel/kv';

const NICHE_CONFIG: Record<string, { q: string; must: string[]; color: string; title: string; tools: string[]; subject: string }> = {
  roofing: {
    q: 'roofing contractor Houston Texas site:.com',
    must: ['roof'],
    color: '#0f172a',
    title: 'Roofing',
    subject: 'Roofing',
    tools: ['AI Roof Quote Estimator', 'Leak Scanner AI Upload', 'Missed-Call Text-Back AI', 'Review Auto-Responder AI', 'Venus OS CRM Dashboard'],
  },
  plumber: {
    q: 'plumber Houston Texas site:.com',
    must: ['plumb'],
    color: '#0c4a6e',
    title: 'Plumbing',
    subject: 'Plumbing',
    tools: ['Emergency Plumber AI Dispatch', 'Leak Price Calculator AI', 'Missed-Call Text-Back AI', 'Review Booster AI', 'Venus OS Jobs CRM'],
  },
  hvac: {
    q: 'HVAC contractor Houston Texas site:.com',
    must: ['hvac', 'air', 'heat', 'cool', 'ac'],
    color: '#1e3a8a',
    title: 'HVAC',
    subject: 'HVAC',
    tools: ['AC Repair Quote AI', 'Duct Cost Estimator AI', 'Missed-Call AI Closer', 'Google Review AI', 'Venus OS Scheduler'],
  },
  electrical: {
    q: 'electrician Houston Texas site:.com',
    must: ['electr'],
    color: '#422006',
    title: 'Electrical',
    subject: 'Electrical',
    tools: ['Electrical Quote AI', 'Panel Upgrade Calculator', 'Emergency Call AI', 'Review Engine AI', 'Venus OS Invoicing'],
  },
  dentist: {
    q: 'dentist Houston Texas site:.com',
    must: ['dental', 'dentist', 'smile', 'tooth'],
    color: '#064e3b',
    title: 'Dental',
    subject: 'Dental',
    tools: ['Smile Scan AI Booking', 'Implant Price Estimator', 'No-Show Rescue AI', 'Review Growth AI', 'Venus OS Patient CRM'],
  },
};

const JUNK = [
  'yelp.com', 'facebook.com', 'linkedin.com', 'instagram.com', 'youtube.com',
  'bestpickreports.com', 'serviceagent.ai', 'google.com', 'decra.com',
  'roofing.net', 'angi.com', 'homeadvisor.com', 'thumbtack.com', 'bbb.org',
  'wikipedia.org', 'amazon.com', 'houzz.com', 'porch.com', 'yelp', 'facebook'
];

export async function GET() {
  const logs: string[] = [];
  const mined: { domain: string; niche: string; email: string }[] = [];
  const newlySent: string[] = [];

  try {
    // 1. KV GET
    let sentSet = new Set<string>();
    try {
      const existing = await kv.get<string[]>('sent_emails');
      if (existing && Array.isArray(existing)) {
        sentSet = new Set(existing.map(d => d.toLowerCase()));
      }
      logs.push(`KV loaded: ${sentSet.size} already sent`);
    } catch (e: any) {
      logs.push(`KV load failed (first run ok): ${e.message}`);
    }

    // 2. MINE via SERPAPI
    const allDomains: { domain: string; niche: string }[] = [];
    for (const [nicheKey, cfg] of Object.entries(NICHE_CONFIG)) {
      try {
        const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(cfg.q)}&num=10&api_key=${process.env.SERP_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        const results = data.organic_results || [];
        for (const r of results) {
          try {
            const domain = new URL(r.link).hostname.replace('www.', '').toLowerCase();
            if (domain) allDomains.push({ domain, niche: nicheKey });
          } catch {}
        }
        logs.push(`SERP ${nicheKey}: ${results.length} results`);
      } catch (e: any) {
        logs.push(`SERP ${nicheKey} error: ${e.message}`);
      }
    }

    // 3. FILTER
    const candidates: { domain: string; niche: string; email: string }[] = [];
    const seenThisRun = new Set<string>();

    for (const item of allDomains) {
      const d = item.domain;
      const nicheKey = item.niche;
      const cfg = NICHE_CONFIG[nicheKey];
      if (JUNK.some(j => d.includes(j))) { logs.push(`SKIP junk ${d}`); continue; }
      if (d.endsWith('.ai') || d.endsWith('.io')) { logs.push(`SKIP.ai/.io ${d}`); continue; }
      if (d.length < 8 || d.length > 35) { logs.push(`SKIP length ${d}`); continue; }
      if (seenThisRun.has(d)) continue;
      seenThisRun.add(d);
      const mustOk = cfg.must.some(m => d.includes(m));
      if (!mustOk) { logs.push(`SKIP wrong category ${d} for ${nicheKey}`); continue; }
      if (sentSet.has(d)) { logs.push(`SKIP already sent in KV ${d}`); continue; }
      const email = `info@${d}`;
      candidates.push({ domain: d, niche: nicheKey, email });
      mined.push({ domain: d, niche: nicheKey, email });
    }

    // 4. SEND 5 per run - V13 LUXURY WHITE TEMPLATE
    const toSend = candidates.slice(0, 5);
    let totalSent = 0;

    for (const c of toSend) {
      const cfg = NICHE_CONFIG[c.niche];
      const oldLink = `https://${c.domain}`;
      const newLink = `https://venus-ai-v8.vercel.app/o/${c.domain}?niche=${c.niche}`;
      const subject = `${c.domain} - Your ${cfg.title} website preview is ready (2008 -> 2026)`;

      const html = `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">

  <div style="padding:14px 24px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center;">
    <span style="font-size:12px;letter-spacing:3px;font-weight:900;color:#0a0a0a;">VENUS HQ7</span>
    <span style="font-size:10px;color:#999;">VENUS AI LAB • DENVER, CO</span>
  </div>

  <div style="padding:32px 28px 18px 28px;">
    <p style="margin:0 0 10px 0;font-size:11px;letter-spacing:2px;color:#D4AF37;font-weight:800;">COMPLIMENTARY PREVIEW FOR ${c.domain.toUpperCase()}</p>
    <h1 style="margin:0;font-size:27px;line-height:33px;font-weight:900;color:#0a0a0a;">
      Your site ${c.domain} is from 2008.<br/>We rebuilt it for 2026.
    </h1>
    <p style="margin:16px 0 0 0;font-size:14px;line-height:23px;color:#333;">
      Hi — I'm <b>Ron Kahn</b>, Founder of <b>Venus HQ7</b> (IT Corp Inc, 2016 Blake St, Denver CO 80202).<br/><br/>
      <b>Who we are:</b> We are not an agency. We are a Gen-Z Luxury AI Lab that scans old gold contractor sites in Houston and rebuilds them with AI tools that actually book jobs.<br/><br/>
      <b>Why you got this:</b> Your domain <b>${c.domain}</b> appeared as an older site losing mobile customers. As a courtesy, we made you a live AI preview. No charge, no obligation — just a preview to see if you want it.
    </p>
  </div>

  <div style="padding:0 16px;">
    <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
        <div style="font-size:10px;font-weight:800;letter-spacing:1px;color:#888;">YOUR CURRENT SITE</div>
        <a href="${oldLink}" style="display:block;margin-top:4px;color:#555;font-size:13px;word-break:break-all;text-decoration:underline;">${oldLink}</a>
      </div>
      <div style="padding:14px 16px;background:#0a0a0a;">
        <div style="font-size:10px;font-weight:800;letter-spacing:1px;color:#D4AF37;">NEW AI REBUILD - LIVE PREVIEW (FREE TO VIEW)</div>
        <a href="${newLink}" style="display:block;margin-top:6px;color:#ffffff;font-size:14px;font-weight:700;word-break:break-all;text-decoration:underline;">${newLink}</a>
      </div>
    </div>
  </div>

  <div style="padding:24px 28px 0 28px;">
    <h3 style="margin:0 0 12px 0;font-size:11px;letter-spacing:2px;color:#111;">WHAT WE BUILT FOR YOUR ${cfg.title.toUpperCase()} BUSINESS</h3>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${cfg.tools.map((t,i) => `
        <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
          <span style="background:#0a0a0a;color:#D4AF37;font-size:10px;padding:3px 8px;border-radius:99px;margin-right:10px;font-weight:800;">0${i+1}</span>
          <span style="font-size:13px;color:#111;font-weight:600;">${t}</span>
        </td></tr>`).join('')}
    </table>
    <p style="font-size:13px;color:#555;line-height:20px;margin:16px 0 0 0;">
      <b>Venus OS:</b> All leads, calls, quotes, and reviews in one dashboard. Missed-call auto text-back so you never lose a job again.
    </p>
  </div>

  <div style="margin:20px 16px;padding:18px;border:2px dashed #D4AF37;background:#FFFBEB;border-radius:12px;text-align:center;">
    <div style="font-size:10px;letter-spacing:2px;color:#92400e;font-weight:800;">24H ACTIVATION • ONE-TIME OFFER</div>
    <div style="margin:8px 0 0 0;"><span style="text-decoration:line-through;color:#999;font-size:16px;">$1,997</span><span style="font-size:30px;font-weight:900;margin-left:10px;color:#0a0a0a;">$497</span></div>
    <div style="font-size:12px;color:#666;margin-top:4px;">No monthly fee. You own it. We go live in 24 hours.</div>
  </div>

  <div style="padding:18px 28px 32px 28px;">
    <a href="${newLink}" style="display:block;text-align:center;background:#0a0a0a;color:#fff;padding:18px;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.5px;border-radius:8px;">VIEW YOUR REBUILT WEBSITE →</a>
    <a href="https://wa.me/17865880578?text=Hi%20Ron%20-%20Activate%20${c.domain}%20for%20$497%20-%20Preview:%20${encodeURIComponent(newLink)}" style="display:block;text-align:center;background:#ffffff;color:#0a0a0a;border:2px solid #0a0a0a;padding:16px;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.5px;border-radius:8px;margin-top:12px;">WHATSAPP: ACTIVATE FOR $497 →</a>

    <div style="margin-top:28px;padding-top:18px;border-top:1px solid #eee;">
      <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;color:#111;">Ron Kahn | Venus HQ7 LLC</p>
      <p style="margin:0;font-size:11px;color:#999;line-height:18px;">
        IT Corp Inc - 2016 Blake St, Denver CO 80202, USA<br/>
        From: Ron@venushq7.com | WhatsApp: +1 (786) 588-0578<br/>
        BCC: venusailux@gmail.com (proof of delivery)<br/><br/>
        You received this because <b>${c.domain}</b> is a publicly listed business with a website that appears outdated. This is a one-time courtesy preview. If not relevant, reply STOP and we will never contact you again. This is not affiliated with Google, Yelp, or ${c.domain}.
      </p>
    </div>
  </div>

</div>
</body></html>`;

      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: { 'api-key': process.env.BREVO_API_KEY!, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: { name: 'Ron Kahn - Venus HQ7', email: 'ron@venushq7.com' },
            to: [{ email: c.email }],
            bcc: [{ email: 'venusailux@gmail.com' }],
            subject,
            htmlContent: html,
          }),
        });
        const brevoData = await brevoRes.json();
        if (brevoRes.status === 201) {
          logs.push(`BREVO to ${c.email}: 201 relay.mailin.fr id ${brevoData.messageId} - ${c.domain}`);
          newlySent.push(c.domain);
          sentSet.add(c.domain.toLowerCase());
          totalSent++;
        } else {
          logs.push(`BREVO FAIL to ${c.email}: ${brevoRes.status} ${JSON.stringify(brevoData)}`);
        }
      } catch (e: any) {
        logs.push(`BREVO ERROR ${c.email}: ${e.message}`);
      }
    }

    try {
      await kv.set('sent_emails', Array.from(sentSet));
      logs.push(`KV UPDATED: ${sentSet.size} total, +${newlySent.length} new`);
    } catch (e: any) {
      logs.push(`KV SAVE FAIL: ${e.message}`);
    }

    return new Response(JSON.stringify({
      ok: true,
      totalSent,
      alreadySentCount: sentSet.size - newlySent.length,
      newlySent,
      mined: mined.slice(0, 10),
      logs,
      msg: `V13 Luxury White - Sent ${totalSent} new`
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message, logs }), { status: 500 });
  }
}
