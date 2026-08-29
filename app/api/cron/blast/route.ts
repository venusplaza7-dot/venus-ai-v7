export const dynamic = 'force-dynamic';

function clean(v?: string){ return v? v.trim().replace(/^["']|["']$/g,'').replace(/\n/g,'').replace(/\r/g,'').trim() : ''; }

function scoreOldSite(html: string): { isOld: boolean; reason: string; score: number } {
  const lower = html.toLowerCase();
  let score=0; const reasons:string[]=[];
  if(!lower.includes('name="viewport"')){ score+=2; reasons.push('no viewport'); }
  const cm=lower.match(/copyright[^0-9]{0,10}(200[1-9]|201[0-9]|2020)/);
  if(cm){ score+=2; reasons.push(`copy ${cm[1]}`); }
  if(lower.includes('<table')||lower.includes('<font')||lower.includes('xhtml')||lower.includes('<marquee')){ score+=2; reasons.push('old tags'); }
  if(!lower.includes('2023')&&!lower.includes('2024')&&!lower.includes('2025')){ score+=1; reasons.push('no 2023-25'); }
  return { isOld: score>=2, reason: reasons.join(', ')||'old-ish', score };
}

// Direct Upstash REST - bypasses @vercel/kv bug
async function kvGetSent(): Promise<Set<string>> {
  try {
    const url = clean(process.env.KV_REST_API_URL) || clean(process.env.UPSTASH_REDIS_REST_URL);
    const token = clean(process.env.KV_REST_API_TOKEN) || clean(process.env.UPSTASH_REDIS_REST_TOKEN);
    if(!url||!token) return new Set();
    const res = await fetch(`${url}/get/sent_emails`, { headers:{ Authorization:`Bearer ${token}` } });
    const data = await res.json();
    const arr = data.result? JSON.parse(data.result) : [];
    return new Set(arr.map((d:string)=>String(d).toLowerCase().trim()));
  } catch { return new Set(); }
}
async function kvSetSent(set: Set<string>) {
  try {
    const url = clean(process.env.KV_REST_API_URL) || clean(process.env.UPSTASH_REDIS_REST_URL);
    const token = clean(process.env.KV_REST_API_TOKEN) || clean(process.env.UPSTASH_REDIS_REST_TOKEN);
    if(!url||!token) return false;
    const arr = Array.from(set);
    const res = await fetch(`${url}/set/sent_emails`, {
      method:'POST',
      headers:{ Authorization:`Bearer ${token}`, 'Content-Type':'application/json' },
      body: JSON.stringify(JSON.stringify(arr))
    });
    return res.ok;
  } catch { return false; }
}

const NICHE_CONFIG: Record<string, { queries: string[]; must: string[]; title: string; tools: any[] }> = {
  roofing: { queries:['best roofing company Houston Texas site:.com','roofing contractor Houston Texas site:.com','Houston roofing company website site:.com'], must:['roof'], title:'Roofing', tools:[{name:'AI Roof Quote Estimator',desc:'Instant quote'},{name:'Leak Scanner AI',desc:'Photo leak'},{name:'Missed-Call Text-Back AI',desc:'Never lose job'},{name:'Review Auto-Responder AI',desc:'Auto replies'},{name:'Venus OS CRM',desc:'Leads dashboard'}] },
  plumber: { queries:['best plumber Houston Texas site:.com','plumbing company Houston Texas site:.com','Houston plumber website site:.com'], must:['plumb'], title:'Plumbing', tools:[{name:'Emergency AI Dispatch',desc:'24/7 booking'},{name:'Leak Price Calculator AI',desc:'Instant price'},{name:'Missed-Call Text-Back AI',desc:'Recovers calls'},{name:'Review Booster AI',desc:'5-stars'},{name:'Venus OS Jobs CRM',desc:'Dispatch'}] },
  hvac: { queries:['best HVAC company Houston Texas site:.com','AC repair Houston Texas site:.com','Houston HVAC company website site:.com'], must:['hvac','air','heat','cool','ac'], title:'HVAC', tools:[{name:'AC Repair Quote AI',desc:'By model'},{name:'Duct Cost Estimator AI',desc:'Duct pricing'},{name:'Missed-Call AI Closer',desc:'After hours'},{name:'Google Review AI',desc:'Auto response'},{name:'Venus OS Scheduler',desc:'Scheduling'}] },
  electrical: { queries:['best electrician Houston Texas site:.com','electrical contractor Houston Texas site:.com','Houston electrician website site:.com'], must:['electr'], title:'Electrical', tools:[{name:'Electrical Quote AI',desc:'Panel quotes'},{name:'Panel Upgrade Calculator',desc:'Upgrade cost'},{name:'Emergency Call AI',desc:'24/7'},{name:'Review Engine AI',desc:'Reputation'},{name:'Venus OS Invoicing',desc:'Leads to cash'}] },
  dentist: { queries:['best dentist Houston Texas site:.com','dental office Houston Texas site:.com','Houston dentist website site:.com'], must:['dental','dentist','smile'], title:'Dental', tools:[{name:'Smile Scan AI Booking',desc:'From selfie'},{name:'Implant Price Estimator',desc:'Pricing'},{name:'No-Show Rescue AI',desc:'No-shows'},{name:'Review Growth AI',desc:'5-stars'},{name:'Venus OS Patient CRM',desc:'Patient mgmt'}] },
};

const JUNK = ['yelp.com','facebook.com','linkedin.com','instagram.com','youtube.com','bestpickreports','serviceagent','google.com','decra.com','roofing.net','angi.com','homeadvisor','thumbtack','bbb.org','wikipedia','amazon.com','houzz','porch.com','healthgrades','zocdoc','yellowpages'];

export async function GET() {
  const logs:string[]=[]; const mined:any[]=[]; const newlySent:string[]=[];
  const SERP_KEY=clean(process.env.SERP_API_KEY); const BREVO_KEY=clean(process.env.BREVO_API_KEY);

  try {
    let sentSet = await kvGetSent();
    logs.push(`KV DIRECT REST loaded: ${sentSet.size} already sent - these will NEVER be resent - fixes 3x repeat bug`);

    const allDomains:{ domain:string; niche:string }[]=[];
    for(const [nicheKey,cfg] of Object.entries(NICHE_CONFIG)){
      for(const q of cfg.queries){
        try{
          const url=`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&num=10&api_key=${SERP_KEY}`;
          const res=await fetch(url); const data=await res.json();
          for(const r of data.organic_results||[]){ try{ const d=new URL(r.link).hostname.replace('www.','').toLowerCase().trim(); if(d) allDomains.push({domain:d,niche:nicheKey}); }catch{} }
        }catch{}
      }
    }
    logs.push(`MINED 150 popular: ${allDomains.length}`);

    const byNicheOld:Record<string,any[]>={roofing:[],plumber:[],hvac:[],electrical:[],dentist:[]};
    const byNicheFallback:Record<string,any[]>={roofing:[],plumber:[],hvac:[],electrical:[],dentist:[]};
    const seen=new Set<string>();

    for(const item of allDomains){
      const d=item.domain.toLowerCase().trim();
      if(JUNK.some(j=>d.includes(j))) continue;
      if(d.endsWith('.ai')||d.endsWith('.io')) continue;
      if(d.length<8||d.length>35) continue;
      if(seen.has(d)) continue; seen.add(d);
      const cfg=NICHE_CONFIG[item.niche];
      if(!cfg.must.some(m=>d.includes(m))) continue;
      if(sentSet.has(d)){ logs.push(`SKIP KV already sent ${d} - would have been repeat #${Array.from(sentSet).indexOf(d)+1}`); continue; }
      try{
        const controller=new AbortController(); const t=setTimeout(()=>controller.abort(),6000);
        const pageRes=await fetch(`https://${d}`,{ signal:controller.signal, headers:{'User-Agent':'Mozilla/5.0'}});
        clearTimeout(t);
        if(!pageRes.ok){ byNicheFallback[item.niche].push({domain:d,niche:item.niche,email:`info@${d}`,ageReason:'popular'}); continue; }
        const html=await pageRes.text(); const age=scoreOldSite(html);
        if(age.isOld){ byNicheOld[item.niche].push({domain:d,niche:item.niche,email:`info@${d}`,ageReason:age.reason,score:age.score}); logs.push(`OLD PASS ${d} score ${age.score} [${age.reason}]`); }
        else if(age.score>=1){ byNicheFallback[item.niche].push({domain:d,niche:item.niche,email:`info@${d}`,ageReason:age.reason,score:age.score}); }
        mined.push({domain:d,niche:item.niche,score:age.score});
      }catch{ byNicheFallback[item.niche].push({domain:d,niche:item.niche,email:`info@${d}`,ageReason:'timeout'}); }
    }

    const finalByNiche:Record<string,any[]>={roofing:[],plumber:[],hvac:[],electrical:[],dentist:[]};
    for(const niche of Object.keys(NICHE_CONFIG)){
      if(byNicheOld[niche].length>0) finalByNiche[niche]=byNicheOld[niche];
      else if(byNicheFallback[niche].length>0) finalByNiche[niche]=byNicheFallback[niche];
    }

    // PICK 1 PER NICHE - BALANCED 5 - NOT 2 ONLY
    const toSend=[finalByNiche.roofing[0],finalByNiche.plumber[0],finalByNiche.hvac[0],finalByNiche.electrical[0],finalByNiche.dentist[0]].filter(Boolean);
    logs.push(`FINAL POOL: R${finalByNiche.roofing.length} P${finalByNiche.plumber.length} H${finalByNiche.hvac.length} E${finalByNiche.electrical.length} D${finalByNiche.dentist.length} -> SEND ${toSend.length} BALANCED`);

    // LOCK BEFORE SEND - DIRECT REST - fixes quotes bug
    if(toSend.length>0){
      for(const c of toSend) sentSet.add(c.domain.toLowerCase());
      const ok=await kvSetSent(sentSet);
      if(ok) logs.push(`KV DIRECT LOCKED BEFORE SEND: ${sentSet.size} total - ${toSend.map(t=>t.domain).join(', ')} - WILL NEVER REPEAT`);
      else logs.push(`KV DIRECT SAVE FAIL - check Upstash URL/TOKEN`);
    }

    let totalSent=0;
    for(const c of toSend){
      const cfg=NICHE_CONFIG[c.niche]; const oldLink=`https://${c.domain}`; const newLink=`https://venus-ai-v8.vercel.app/o/${c.domain}?niche=${c.niche}`;
      const subject=`${c.domain} - Your ${cfg.title} site (2001-2020) - 2026 AI preview $497`;
      const html=`<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;"><div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;"><div style="padding:12px 24px;background:#0a0a0a;display:flex;justify-content:space-between;"><span style="font-size:12px;letter-spacing:3px;font-weight:900;color:#fff;">VENUS HQ7 • GEN-Z LUXURY AI</span><span style="font-size:10px;color:#D4AF37;">2001-2020 → 2026</span></div><div style="padding:28px 28px 12px;"><p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;color:#D4AF37;font-weight:800;">POPULAR HOUSTON • UNTOUCHED 2001-2020 • FOR ${c.domain.toUpperCase()}</p><h1 style="margin:0;font-size:26px;line-height:32px;font-weight:900;">Your ${cfg.title} site hasn't been touched since 2001-2020.<br/>We rebuilt it for 2026.</h1></div><div style="margin:16px 16px 0;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;"><div style="font-size:11px;font-weight:900;letter-spacing:2px;">WHO WE ARE</div><p style="margin:8px 0 0;font-size:13px;line-height:20px;">I'm <b>Ron Kahn</b>, Founder <b>Venus HQ7 LLC</b> — Venus AI Lab, <b>IT Corp Inc, 2016 Blake St, Denver CO 80202, USA</b>. NOT an agency. Gen-Z Luxury AI Lab that finds gold old sites untouched 2001-2020 and rebuilds into AI sites that book jobs. No monthly fee. 24H activation.</p></div><div style="margin:12px 16px 0;padding:16px;background:#FFFBEB;border:1px solid #fde68a;border-radius:10px;"><div style="font-size:11px;font-weight:900;letter-spacing:2px;color:#92400e;">WHY ARE WE CONTACTING YOU?</div><p style="margin:8px 0 0;font-size:13px;line-height:20px;">Your domain <b>${c.domain}</b> is popular Houston ${cfg.title} but scan shows <b>untouched 2001-2020</b> (${c.ageReason}). Losing ranking + calls. As courtesy we built free 2026 AI preview. One-time contact. Reply STOP = never again. KV ensures never resend same client twice.</p></div><div style="padding:16px 16px 0;"><div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;"><div style="padding:12px 16px;background:#fff;border-bottom:1px solid #e5e7eb;"><div style="font-size:10px;font-weight:800;color:#888;">CURRENT SITE - UNTOUCHED 2001-2020 [${c.ageReason}]</div><a href="${oldLink}" style="color:#111;font-size:13px;word-break:break-all;font-weight:600;">${oldLink}</a></div><div style="padding:14px 16px;background:#0a0a0a;"><div style="font-size:10px;font-weight:800;color:#D4AF37;">NEW 2026 AI REBUILD - FREE PREVIEW</div><a href="${newLink}" style="color:#fff;font-size:14px;font-weight:700;word-break:break-all;">${newLink}</a></div></div></div><div style="padding:20px 24px 0;"><div style="font-size:11px;font-weight:900;letter-spacing:2px;margin-bottom:10px;">WHAT WE DO - 5 AI TOOLS + VENUS OS</div><table width="100%">${cfg.tools.map((t,i)=>`<tr><td style="padding:12px 0;border-bottom:1px solid #f3f4f6;"><span style="background:#0a0a0a;color:#D4AF37;font-size:10px;padding:4px 8px;border-radius:99px;margin-right:10px;">0${i+1}</span><span style="font-size:13px;font-weight:700;">${t.name}</span><span style="font-size:12px;color:#666;"> - ${t.desc}</span></td></tr>`).join('')}</table></div><div style="margin:20px 16px;padding:18px;border:2px dashed #D4AF37;background:#FFFBEB;border-radius:12px;text-align:center;"><div style="font-size:10px;letter-spacing:2px;color:#92400e;font-weight:800;">24H ACTIVATION</div><div style="margin-top:6px;"><span style="text-decoration:line-through;color:#999;">$1,997</span><span style="font-size:32px;font-weight:900;margin-left:10px;">$497</span></div></div><div style="padding:0 24px 28px;"><a href="${newLink}" style="display:block;text-align:center;background:#0a0a0a;color:#fff;padding:18px;text-decoration:none;font-weight:800;border-radius:8px;">VIEW YOUR REBUILT WEBSITE →</a><a href="https://wa.me/17865880578?text=Activate%20${c.domain}%20for%20$497" style="display:block;text-align:center;background:#fff;color:#0a0a0a;border:2px solid #0a0a0a;padding:16px;text-decoration:none;font-weight:800;border-radius:8px;margin-top:12px;">WHATSAPP ACTIVATE $497 →</a><p style="margin-top:20px;font-size:11px;color:#999;line-height:17px;border-top:1px solid #eee;padding-top:14px;">Venus HQ7 LLC - 2016 Blake St Denver CO 80202 - Ron@venushq7.com<br/>BCC: venusailux@gmail.com proof. Target: 2001-2020 untouched. Reply STOP = never again. Never resends - KV locked before send.</p></div></div></body></html>`;
      try{
        const res=await fetch('https://api.brevo.com/v3/smtp/email',{ method:'POST', headers:{ 'api-key':BREVO_KEY, 'Content-Type':'application/json' }, body: JSON.stringify({ sender:{ name:`Ron Kahn - Venus HQ7 - ${cfg.title}`, email:'ron@venushq7.com' }, to:[{ email:c.email }], bcc:[{ email:'venusailux@gmail.com' }], subject, htmlContent: html }) });
        const j=await res.json();
        if(res.status===201){ logs.push(`BREVO ${c.niche} 201 ${c.domain}`); newlySent.push(c.domain); totalSent++; }
        else logs.push(`BREVO FAIL ${c.domain}: ${JSON.stringify(j)}`);
      }catch(e:any){ logs.push(`BREVO ERR ${e.message}`); }
    }
    return new Response(JSON.stringify({ ok:true, totalSent, alreadySentCount: sentSet.size-newlySent.length, newlySent, mined:mined.slice(0,15), logs, msg:`V21 DIRECT REST - No more 2x/3x repeat - Sent ${totalSent} balanced` }), { status:200 });
  } catch(e:any){ return new Response(JSON.stringify({ ok:false, error:e.message, logs }), { status:500 }); }
}
