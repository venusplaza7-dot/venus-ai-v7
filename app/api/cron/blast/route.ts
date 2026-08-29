export const dynamic = 'force-dynamic';
import { kv } from '@vercel/kv';

// FIX KV URL parsing bug - trim quotes
function cleanEnv(v?: string) { return v? v.trim().replace(/^["']|["']$/g, '') : ''; }

const NICHE_CONFIG: Record<string, { queries: string[]; must: string[]; title: string; tools: string[] }> = {
  roofing: {
    queries: ['best roofing company Houston Texas site:.com', 'top roofing contractors Houston site:.com'],
    must: ['roof'],
    title: 'Roofing',
    tools: ['AI Roof Quote Estimator', 'Leak Scanner AI Upload', 'Missed-Call Text-Back AI', 'Review Auto-Responder AI', 'Venus OS CRM Dashboard'],
  },
  plumber: {
    queries: ['best plumber Houston Texas site:.com', 'top plumbing company Houston site:.com'],
    must: ['plumb'],
    title: 'Plumbing',
    tools: ['Emergency Plumber AI Dispatch', 'Leak Price Calculator AI', 'Missed-Call Text-Back AI', 'Review Booster AI', 'Venus OS Jobs CRM'],
  },
  hvac: {
    queries: ['best HVAC company Houston Texas site:.com', 'top AC repair Houston site:.com'],
    must: ['hvac','air','heat','cool'],
    title: 'HVAC',
    tools: ['AC Repair Quote AI', 'Duct Cost Estimator AI', 'Missed-Call AI Closer', 'Google Review AI', 'Venus OS Scheduler'],
  },
  electrical: {
    queries: ['best electrician Houston Texas site:.com', 'top electrical contractor Houston site:.com'],
    must: ['electr'],
    title: 'Electrical',
    tools: ['Electrical Quote AI', 'Panel Upgrade Calculator', 'Emergency Call AI', 'Review Engine AI', 'Venus OS Invoicing'],
  },
  dentist: {
    queries: ['best dentist Houston Texas site:.com', 'top dental office Houston site:.com'],
    must: ['dental','dentist','smile'],
    title: 'Dental',
    tools: ['Smile Scan AI Booking', 'Implant Price Estimator', 'No-Show Rescue AI', 'Review Growth AI', 'Venus OS Patient CRM'],
  },
};

const JUNK = ['yelp.com','facebook.com','linkedin.com','instagram.com','youtube.com','bestpickreports.com','serviceagent.ai','google.com','decra.com','roofing.net','angi.com','homeadvisor.com','thumbtack.com','bbb.org','wikipedia.org','amazon.com','houzz.com','porch.com','healthgrades','zocdoc','yellowpages','yelp','facebook'];

export async function GET() {
  const logs: string[] = [];
  const mined: { domain: string; niche: string; email: string }[] = [];
  const newlySent: string[] = [];

  // Clean env vars to fix your parse error
  const SERP_KEY = cleanEnv(process.env.SERP_API_KEY);
  const BREVO_KEY = cleanEnv(process.env.BREVO_API_KEY);

  try {
    let sentSet = new Set<string>();
    try {
      const existing = await kv.get<string[]>('sent_emails');
      if (existing && Array.isArray(existing)) sentSet = new Set(existing.map(d => String(d).toLowerCase().trim()));
      logs.push(`KV loaded: ${sentSet.size} already sent`);
    } catch (e:any) { logs.push(`KV load failed (first run ok): ${e.message}`); }

    // MINE POPULAR SITES - 10 queries x 10 results = 100 domains
    const allDomains: { domain: string; niche: string }[] = [];
    for (const [nicheKey, cfg] of Object.entries(NICHE_CONFIG)) {
      for (const q of cfg.queries) {
        try {
          const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&num=10&api_key=${SERP_KEY}`;
          const res = await fetch(url); const data = await res.json();
          for (const r of data.organic_results || []) {
            try {
              const domain = new URL(r.link).hostname.replace('www.','').toLowerCase().trim();
              if (domain) allDomains.push({ domain, niche: nicheKey });
            } catch {}
          }
          logs.push(`SERP ${nicheKey} "${q}": ${data.organic_results?.length||0}`);
        } catch (e:any) { logs.push(`SERP ${nicheKey} error: ${e.message}`); }
      }
    }

    // FILTER + DEDUP
    const byNiche: Record<string, { domain:string; niche:string; email:string }[]> = { roofing:[], plumber:[], hvac:[], electrical:[], dentist:[] };
    const seenThisRun = new Set<string>();

    for (const item of allDomains) {
      const d = item.domain.toLowerCase().trim();
      const nicheKey = item.niche;
      const cfg = NICHE_CONFIG[nicheKey];

      if (JUNK.some(j => d.includes(j))) { logs.push(`SKIP junk ${d}`); continue; }
      if (d.endsWith('.ai') || d.endsWith('.io')) continue;
      if (d.length < 8 || d.length > 35) continue;
      if (seenThisRun.has(d)) continue;
      seenThisRun.add(d);

      // Must contain niche keyword
      if (!cfg.must.some(m => d.includes(m))) { logs.push(`SKIP wrong category ${d} for ${nicheKey}`); continue; }

      // NEVER RESEND - check KV
      if (sentSet.has(d)) { logs.push(`SKIP already sent in KV ${d}`); continue; }

      byNiche[nicheKey].push({ domain:d, niche:nicheKey, email:`info@${d}` });
      mined.push({ domain:d, niche:nicheKey, email:`info@${d}` });
    }

    // BALANCED 1 PER NICHE - scrapes all popular sites, not just roofing
    const toSend = [
      byNiche.roofing[0],
      byNiche.plumber[0],
      byNiche.hvac[0],
      byNiche.electrical[0],
      byNiche.dentist[0],
    ].filter(Boolean);

    logs.push(`POPULAR POOL: Roof ${byNiche.roofing.length} Plumb ${byNiche.plumber.length} HVAC ${byNiche.hvac.length} Elec ${byNiche.electrical.length} Dent ${byNiche.dentist.length} -> SEND ${toSend.length}`);

    let totalSent = 0;
    for (const c of toSend) {
      const cfg = NICHE_CONFIG[c.niche];
      const oldLink = `https://${c.domain}`;
      const newLink = `https://venus-ai-v8.vercel.app/o/${c.domain}?niche=${c.niche}`;
      const subject = `${c.domain} - Your ${cfg.title} website preview is ready (2008 -> 2026) - $497`;

      // NICE HTML - LUXURY WHITE - NICHE COLORED
      const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
  <div style="padding:14px 24px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;">
    <span style="font-size:12px;letter-spacing:3px;font-weight:900;">VENUS HQ7 • ${cfg.title.toUpperCase()}</span>
    <span style="font-size:10px;color:#999;">VENUS AI LAB • DENVER</span>
  </div>
  <div style="padding:32px 28px 18px;">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;color:#D4AF37;font-weight:800;">COMPLIMENTARY PREVIEW FOR ${c.domain.toUpperCase()} • POPULAR SITE IN HOUSTON</p>
    <h1 style="margin:0;font-size:26px;line-height:32px;font-weight:900;color:#0a0a0a;">Your ${cfg.title} site is from 2008.<br/>We rebuilt it for 2026.</h1>
    <p style="margin:16px 0 0;font-size:14px;line-height:23px;color:#333;">
      Hi — I'm <b>Ron Kahn</b>, Founder <b>Venus HQ7</b> (2016 Blake St Denver CO).<br/><br/>
      <b>WHO WE ARE:</b> Gen-Z Luxury AI Lab, not an agency. We scan old gold ${cfg.title} sites in Houston and rebuild with 5 AI tools that book jobs.<br/>
      <b>WHY CONTACT:</b> ${c.domain} is a popular site but looks outdated on mobile. We made a free AI preview — view only, no obligation.
    </p>
  </div>
  <div style="padding:0 16px;">
    <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
        <div style="font-size:10px;font-weight:800;color:#888;">YOUR CURRENT POPULAR SITE</div>
        <a href="${oldLink}" style="color:#555;font-size:13px;word-break:break-all;">${oldLink}</a>
      </div>
      <div style="padding:14px 16px;background:#0a0a0a;">
        <div style="font-size:10px;font-weight:800;color:#D4AF37;">NEW AI REBUILD - LIVE PREVIEW</div>
        <a href="${newLink}" style="color:#fff;font-size:14px;font-weight:700;word-break:break-all;">${newLink}</a>
      </div>
    </div>
  </div>
  <div style="padding:22px 28px 0;">
    <h3 style="margin:0 0 12px;font-size:11px;letter-spacing:2px;">5 AI TOOLS FOR ${cfg.title.toUpperCase()} - VENUS OS</h3>
    <table width="100%">${cfg.tools.map((t,i)=>`<tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><span style="background:#0a0a0a;color:#D4AF37;font-size:10px;padding:3px 8px;border-radius:99px;margin-right:8px;">0${i+1}</span><span style="font-size:13px;font-weight:600;">${t}</span></td></tr>`).join('')}</table>
  </div>
  <div style="margin:20px 16px;padding:18px;border:2px dashed #D4AF37;background:#FFFBEB;border-radius:12px;text-align:center;">
    <div style="font-size:10px;letter-spacing:2px;color:#92400e;font-weight:800;">24H ACTIVATION</div>
    <div style="margin-top:6px;"><span style="text-decoration:line-through;color:#999;">$1,997</span><span style="font-size:30px;font-weight:900;margin-left:10px;">$497</span> <span style="font-size:11px;">ONE-TIME</span></div>
  </div>
  <div style="padding:18px 28px 30px;">
    <a href="${newLink}" style="display:block;text-align:center;background:#0a0a0a;color:#fff;padding:18px;text-decoration:none;font-weight:800;border-radius:8px;">VIEW YOUR REBUILT WEBSITE →</a>
    <a href="https://wa.me/17865880578?text=Activate%20${c.domain}%20for%20$497" style="display:block;text-align:center;background:#fff;color:#0a0a0a;border:2px solid #0a0a0a;padding:16px;text-decoration:none;font-weight:800;border-radius:8px;margin-top:12px;">WHATSAPP ACTIVATE $497 →</a>
    <p style="margin-top:20px;font-size:11px;color:#999;line-height:17px;border-top:1px solid #eee;padding-top:14px;">Venus HQ7 LLC - 2016 Blake St Denver CO 80202 - Ron@venushq7.com<br/>BCC: venusailux@gmail.com proof. You got this because ${c.domain} is popular outdated site. Reply STOP to opt-out. Never resends to same client - tracked via KV.</p>
  </div>
</div></body></html>`;

      try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
          method:'POST',
          headers:{ 'api-key': BREVO_KEY, 'Content-Type':'application/json' },
          body: JSON.stringify({
            sender:{ name:`Ron Kahn - Venus HQ7 - ${cfg.title}`, email:'ron@venushq7.com' },
            to:[{ email:c.email }],
            bcc:[{ email:'venusailux@gmail.com' }],
            subject, htmlContent: html,
          }),
        });
        const j = await res.json();
        if(res.status===201){
          logs.push(`BREVO ${c.niche} to ${c.email}: 201 - ${c.domain} - SAVED TO KV`);
          newlySent.push(c.domain);
          sentSet.add(c.domain.toLowerCase());
          totalSent++;
        } else logs.push(`BREVO FAIL ${c.email}: ${JSON.stringify(j)}`);
      } catch(e:any){ logs.push(`BREVO ERR ${e.message}`); }
    }

    try {
      await kv.set('sent_emails', Array.from(sentSet));
      logs.push(`KV UPDATED: ${sentSet.size} total, never resend same client again`);
    } catch(e:any){ logs.push(`KV SAVE FAIL: ${e.message} - CHECK ENV VARS HAVE NO QUOTES`); }

    return new Response(JSON.stringify({ ok:true, totalSent, alreadySentCount: sentSet.size-newlySent.length, newlySent, mined: mined.slice(0,12), logs, msg:`V15 Popular + Balanced + No Resend - Sent ${totalSent}` }), { status:200 });
  } catch(e:any){ return new Response(JSON.stringify({ ok:false, error:e.message, logs }), { status:500 }); }
}
