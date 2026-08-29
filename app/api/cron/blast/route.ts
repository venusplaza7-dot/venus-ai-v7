export const dynamic = 'force-dynamic';
import { kv } from '@vercel/kv';

function clean(v?: string){ return v ? v.trim().replace(/^["']|["']$/g,'').replace(/\n/g,'').trim() : ''; }

function scoreOldSite(html: string): { isOld: boolean; reason: string; score: number } {
  const lower = html.toLowerCase();
  let score = 0; const reasons: string[] = [];
  if (!lower.includes('name="viewport"')) { score+=2; reasons.push('no viewport - pre 2015 mobile'); }
  const copyMatch = lower.match(/copyright[^0-9]{0,10}(200[1-9]|201[0-9]|2020)/);
  if (copyMatch) { score+=2; reasons.push(`copyright ${copyMatch[1]}`); }
  if (lower.includes('<table') || lower.includes('<font') || lower.includes('xhtml') || lower.includes('<marquee')) { score+=2; reasons.push('old HTML tags'); }
  if (!lower.includes('2023') && !lower.includes('2024') && !lower.includes('2025')) { score+=1; reasons.push('no 2023-2025'); }
  return { isOld: score>=2, reason: reasons.join(', '), score };
}

// ALL POPULAR SITES - 2 QUERIES PER NICHE = 100 DOMAINS
const NICHE_CONFIG: Record<string, { queries: string[]; must: string[]; title: string; tools: { name: string; desc: string }[] }> = {
  roofing: {
    queries: ['best roofing company Houston Texas site:.com', 'top roofing contractors Houston Texas site:.com'],
    must: ['roof'], title: 'Roofing',
    tools: [{name:'AI Roof Quote Estimator',desc:'Instant quote from address + satellite'}, {name:'Leak Scanner AI',desc:'Upload photo, AI finds leak + cost'}, {name:'Missed-Call Text-Back AI',desc:'Never lose job when miss call'}, {name:'Review Auto-Responder AI',desc:'Auto replies to Google reviews'}, {name:'Venus OS CRM',desc:'All leads + jobs in one dashboard'}],
  },
  plumber: {
    queries: ['best plumber Houston Texas site:.com', 'top plumbing company Houston Texas site:.com'],
    must: ['plumb'], title: 'Plumbing',
    tools: [{name:'Emergency AI Dispatch',desc:'AI books emergency jobs 24/7'}, {name:'Leak Price Calculator AI',desc:'Instant plumbing price'}, {name:'Missed-Call Text-Back AI',desc:'Recovers lost calls'}, {name:'Review Booster AI',desc:'Gets 5-star reviews autopilot'}, {name:'Venus OS Jobs CRM',desc:'Dispatch + invoicing'}],
  },
  hvac: {
    queries: ['best HVAC company Houston Texas site:.com', 'top AC repair Houston Texas site:.com'],
    must: ['hvac','air','heat','cool'], title: 'HVAC',
    tools: [{name:'AC Repair Quote AI',desc:'Quote by AC model + issue'}, {name:'Duct Cost Estimator AI',desc:'Instant duct pricing'}, {name:'Missed-Call AI Closer',desc:'Closes after hours jobs'}, {name:'Google Review AI',desc:'Auto review responses'}, {name:'Venus OS Scheduler',desc:'Jobs + tech scheduling'}],
  },
  electrical: {
    queries: ['best electrician Houston Texas site:.com', 'top electrical contractor Houston Texas site:.com'],
    must: ['electr'], title: 'Electrical',
    tools: [{name:'Electrical Quote AI',desc:'Panel + wiring quotes'}, {name:'Panel Upgrade Calculator',desc:'Instant upgrade cost'}, {name:'Emergency Call AI',desc:'24/7 emergency booking'}, {name:'Review Engine AI',desc:'Boosts reputation'}, {name:'Venus OS Invoicing',desc:'Leads to cash'}],
  },
  dentist: {
    queries: ['best dentist Houston Texas site:.com', 'top dental office Houston Texas site:.com'],
    must: ['dental','dentist','smile'], title: 'Dental',
    tools: [{name:'Smile Scan AI Booking',desc:'AI books consult from selfie'}, {name:'Implant Price Estimator',desc:'Transparent implant pricing'}, {name:'No-Show Rescue AI',desc:'Reduces no-shows'}, {name:'Review Growth AI',desc:'More 5-star reviews'}, {name:'Venus OS Patient CRM',desc:'Patient management'}],
  },
};

const JUNK = ['yelp.com','facebook.com','linkedin.com','instagram.com','youtube.com','bestpickreports','serviceagent','google.com','decra.com','roofing.net','angi.com','homeadvisor','thumbtack','bbb.org','wikipedia','amazon.com','houzz','porch.com','healthgrades','zocdoc','yellowpages'];

export async function GET() {
  const logs: string[] = [];
  const mined: any[] = [];
  const newlySent: string[] = [];
  const SERP_KEY = clean(process.env.SERP_API_KEY);
  const BREVO_KEY = clean(process.env.BREVO_API_KEY);

  try {
    let sentSet = new Set<string>();
    try {
      const existing = await kv.get<string[]>('sent_emails');
      if(existing) sentSet = new Set(existing.map(d=>String(d).toLowerCase().trim()));
      logs.push(`KV loaded: ${sentSet.size} already sent - will never resend`);
    } catch(e:any){ logs.push(`KV load fail: ${e.message}`); }

    const allDomains: { domain:string; niche:string }[] = [];
    for(const [nicheKey, cfg] of Object.entries(NICHE_CONFIG)){
      for(const q of cfg.queries){
        try{
          const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&num=10&api_key=${SERP_KEY}`;
          const res = await fetch(url); const data = await res.json();
          for(const r of data.organic_results||[]){
            try{ const d = new URL(r.link).hostname.replace('www.','').toLowerCase().trim(); if(d) allDomains.push({domain:d, niche:nicheKey}); }catch{}
          }
          logs.push(`SERP ${nicheKey} "${q}": ${data.organic_results?.length||0}`);
        }catch(e:any){ logs.push(`SERP err ${e.message}`); }
      }
    }
    logs.push(`TOTAL MINED POPULAR SITES: ${allDomains.length} = 100 domains target`);

    const byNiche: Record<string, any[]> = { roofing:[], plumber:[], hvac:[], electrical:[], dentist:[] };
    const seen = new Set<string>();

    for(const item of allDomains){
      const d = item.domain.toLowerCase().trim();
      if(JUNK.some(j=>d.includes(j))) continue;
      if(d.endsWith('.ai')||d.endsWith('.io')) continue;
      if(d.length<8||d.length>35) continue;
      if(seen.has(d)) continue; seen.add(d);
      const cfg = NICHE_CONFIG[item.niche];
      if(!cfg.must.some(m=>d.includes(m))) { logs.push(`SKIP wrong niche ${d} for ${item.niche}`); continue; }
      if(sentSet.has(d)) { logs.push(`SKIP KV already sent ${d} - never resend same client`); continue; }

      try{
        const controller = new AbortController(); const t = setTimeout(()=>controller.abort(), 5000);
        const pageRes = await fetch(`https://${d}`, { signal: controller.signal, headers:{'User-Agent':'Mozilla/5.0'} });
        clearTimeout(t);
        if(!pageRes.ok) { logs.push(`SKIP fetch fail ${d} ${pageRes.status}`); continue; }
        const html = await pageRes.text();
        const age = scoreOldSite(html);
        if(!age.isOld){ logs.push(`SKIP modern ${d} score ${age.score}`); continue; }
        logs.push(`OLD SITE PASS 2001-2020 ${d} score ${age.score} [${age.reason}]`);
        byNiche[item.niche].push({ domain:d, niche:item.niche, email:`info@${d}`, ageReason: age.reason });
        mined.push({ domain:d, niche:item.niche, email:`info@${d}`, ageReason: age.reason });
      }catch{ logs.push(`SKIP fetch error ${d}`); continue; }
    }

    const toSend = [byNiche.roofing[0], byNiche.plumber[0], byNiche.hvac[0], byNiche.electrical[0], byNiche.dentist[0]].filter(Boolean);
    logs.push(`FINAL POOL 2001-2020: R${byNiche.roofing.length} P${byNiche.plumber.length} H${byNiche.hvac.length} E${byNiche.electrical.length} D${byNiche.dentist.length} -> SEND BALANCED ${toSend.length}`);

    // FIX DOUBLE SEND: LOCK IN KV BEFORE SENDING
    if(toSend.length>0){
      for(const c of toSend) sentSet.add(c.domain.toLowerCase());
      try{
        await kv.set('sent_emails', Array.from(sentSet));
        logs.push(`KV LOCKED BEFORE SEND: ${sentSet.size} total locked - ${toSend.map(t=>t.domain).join(', ')} - will not send again at 11:01 + 11:30`);
      }catch(e:any){ logs.push(`KV SAVE FAIL: ${e.message} - FIX ENV VARS REMOVE QUOTES`); }
    }

    let totalSent=0;
    for(const c of toSend){
      const cfg = NICHE_CONFIG[c.niche];
      const oldLink = `https://${c.domain}`;
      const newLink = `https://venus-ai-v8.vercel.app/o/${c.domain}?niche=${c.niche}`;
      const subject = `${c.domain} - Your ${cfg.title} site (2001-2020 untouched) - 2026 AI preview $497`;

      // NICE LUXURY WHITE HTML WITH WHO WE ARE / WHAT WE DO / WHY CONTACTING
      const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
  <div style="padding:12px 24px;background:#0a0a0a;display:flex;justify-content:space-between;align-items:center;">
    <span style="font-size:12px;letter-spacing:3px;font-weight:900;color:#fff;">VENUS HQ7 • GEN-Z LUXURY AI</span>
    <span style="font-size:10px;color:#D4AF37;">DENVER, CO • 2016 BLAKE ST</span>
  </div>
  <div style="padding:28px 28px 12px;">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;color:#D4AF37;font-weight:800;">POPULAR SITE IN HOUSTON • UNTOUCHED 2001-2020 • FOR ${c.domain.toUpperCase()}</p>
    <h1 style="margin:0;font-size:26px;line-height:32px;font-weight:900;color:#0a0a0a;">Your ${cfg.title} site hasn't been touched since 2001-2020.<br/>We rebuilt it for 2026.</h1>
  </div>

  <div style="margin:16px 16px 0;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;">
    <div style="font-size:11px;font-weight:900;letter-spacing:2px;color:#111;">WHO WE ARE</div>
    <p style="margin:8px 0 0;font-size:13px;line-height:20px;color:#333;">
      I'm <b>Ron Kahn</b>, Founder of <b>Venus HQ7 LLC</b> — Venus AI Lab, <b>IT Corp Inc, 2016 Blake St, Denver CO 80202, USA</b>.<br/>
      We are <b>NOT a typical agency</b>. We are a Gen-Z Luxury AI Lab led from USA. We scan gold old sites untouched 2001-2020 in Houston and rebuild them into luxury AI sites that book jobs on mobile. No monthly fee. You own it. 24H activation.
    </p>
  </div>

  <div style="margin:12px 16px 0;padding:16px;background:#FFFBEB;border:1px solid #fde68a;border-radius:10px;">
    <div style="font-size:11px;font-weight:900;letter-spacing:2px;color:#92400e;">WHY ARE WE CONTACTING YOU?</div>
    <p style="margin:8px 0 0;font-size:13px;line-height:20px;color:#444;">
      Your domain <b>${c.domain}</b> is a <b>popular ${cfg.title} business in Houston</b> but our scan shows it is <b>untouched between 2001-2020</b> (${c.ageReason}). No mobile viewport, old HTML — you are losing Google ranking + calls to newer competitors.<br/><br/>
      As a courtesy, we already built you a free live 2026 AI preview — no charge, no obligation. We contact you once to show preview. If you like it, activate $497 one-time. If not, reply STOP and we never contact again. Our KV system ensures we never email same client again at 11:01 and 11:30.
    </p>
  </div>

  <div style="padding:16px 16px 0;">
    <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="padding:12px 16px;background:#fff;border-bottom:1px solid #e5e7eb;">
        <div style="font-size:10px;font-weight:800;color:#888;">YOUR CURRENT SITE - UNTOUCHED 2001-2020 [${c.ageReason}]</div>
        <a href="${oldLink}" style="color:#111;font-size:13px;word-break:break-all;font-weight:600;">${oldLink}</a>
      </div>
      <div style="padding:14px 16px;background:#0a0a0a;">
        <div style="font-size:10px;font-weight:800;color:#D4AF37;">NEW AI REBUILD - FREE LIVE PREVIEW 2026</div>
        <a href="${newLink}" style="color:#fff;font-size:14px;font-weight:700;word-break:break-all;">${newLink}</a>
      </div>
    </div>
  </div>

  <div style="padding:20px 24px 0;">
    <div style="font-size:11px;font-weight:900;letter-spacing:2px;color:#111;margin-bottom:10px;">WHAT WE DO - 5 AI TOOLS FOR YOUR ${cfg.title.toUpperCase()} + VENUS OS</div>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${cfg.tools.map((t,i)=>`<tr><td style="padding:12px 0;border-bottom:1px solid #f3f4f6;"><div style="display:flex;"><span style="background:#0a0a0a;color:#D4AF37;font-size:10px;padding:4px 8px;border-radius:99px;height:16px;font-weight:800;margin-right:10px;">0${i+1}</span><div><div style="font-size:13px;font-weight:700;color:#111;">${t.name}</div><div style="font-size:12px;color:#666;margin-top:2px;">${t.desc}</div></div></div></td></tr>`).join('')}
    </table>
    <div style="margin-top:12px;padding:12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;"><div style="font-size:11px;font-weight:800;color:#065f46;">+ VENUS OS INCLUDED</div><div style="font-size:12px;color:#065f46;margin-top:4px;">All leads, calls, quotes, reviews in one dashboard. Missed-call auto text-back so you never lose a $2k job.</div></div>
  </div>

  <div style="margin:20px 16px;padding:18px;border:2px dashed #D4AF37;background:#FFFBEB;border-radius:12px;text-align:center;">
    <div style="font-size:10px;letter-spacing:2px;color:#92400e;font-weight:800;">24H ACTIVATION • ONE-TIME FEE • YOU OWN IT</div>
    <div style="margin-top:6px;"><span style="text-decoration:line-through;color:#999;font-size:16px;">$1,997</span><span style="font-size:32px;font-weight:900;margin-left:10px;color:#0a0a0a;">$497</span></div>
  </div>

  <div style="padding:0 24px 28px;">
    <a href="${newLink}" style="display:block;text-align:center;background:#0a0a0a;color:#fff;padding:18px;text-decoration:none;font-weight:800;font-size:14px;border-radius:8px;letter-spacing:0.5px;">VIEW YOUR REBUILT WEBSITE →</a>
    <a href="https://wa.me/17865880578?text=Hi%20Ron%20-%20Activate%20${c.domain}%20for%20$497%20-%20untouched%20${c.ageReason}" style="display:block;text-align:center;background:#fff;color:#0a0a0a;border:2px solid #0a0a0a;padding:16px;text-decoration:none;font-weight:800;font-size:14px;border-radius:8px;margin-top:12px;">WHATSAPP ACTIVATE FOR $497 →</a>
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;">
      <p style="margin:0;font-size:12px;font-weight:700;">Ron Kahn | Venus HQ7 LLC | Venus AI Lab</p>
      <p style="margin:6px 0 0;font-size:11px;color:#999;line-height:17px;">IT Corp Inc, 2016 Blake St, Denver CO 80202, USA<br/>From: Ron@venushq7.com | WhatsApp: +1 786 588 0578 | BCC: venusailux@gmail.com proof<br/>You got this because ${c.domain} is popular but untouched 2001-2020 [${c.ageReason}]. Reply STOP = never again. Never resends - KV locked before send.</p>
    </div>
  </div>
</div>
</body></html>`;

      try{
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
          method:'POST', headers:{ 'api-key': BREVO_KEY, 'Content-Type':'application/json' },
          body: JSON.stringify({ sender:{ name:`Ron Kahn - Venus HQ7 - ${cfg.title}`, email:'ron@venushq7.com' }, to:[{ email:c.email }], bcc:[{ email:'venusailux@gmail.com' }], subject, htmlContent: html }),
        });
        const j = await res.json();
        if(res.status===201){ logs.push(`BREVO ${c.niche} to info@${c.domain}: 201 - ${c.domain} OLD ${c.ageReason}`); newlySent.push(c.domain); totalSent++; }
        else logs.push(`BREVO FAIL ${c.domain}: ${JSON.stringify(j)}`);
      }catch(e:any){ logs.push(`BREVO ERR ${e.message}`); }
    }

    return new Response(JSON.stringify({ ok:true, totalSent, alreadySentCount: sentSet.size-newlySent.length, newlySent, mined: mined.slice(0,12), logs, msg:`V19 All 4 features + No double send - Sent ${totalSent}` }), { status:200 });
  } catch(e:any){ return new Response(JSON.stringify({ ok:false, error:e.message, logs }), { status:500 }); }
}
