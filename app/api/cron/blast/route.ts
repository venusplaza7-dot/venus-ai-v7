export const dynamic = 'force-dynamic';

function clean(v?: string){ return v? v.trim().replace(/^["']|["']$/g,'').replace(/\n/g,'').replace(/\r/g,'').trim() : ''; }

const STATES = ["Texas","Florida","California","New York","Pennsylvania","Illinois","Ohio","Georgia","North Carolina","Michigan","New Jersey","Virginia","Washington","Arizona","Massachusetts","Tennessee","Indiana","Missouri","Maryland","Wisconsin","Colorado","Minnesota","South Carolina","Alabama","Louisiana","Kentucky","Oregon","Oklahoma","Connecticut","Utah","Iowa","Nevada","Arkansas","Mississippi","Kansas","New Mexico","Nebraska","West Virginia","Idaho","Hawaii","New Hampshire","Maine","Rhode Island","Montana","Delaware","South Dakota","North Dakota","Alaska","Vermont","Wyoming"];

const HARD_BLACKLIST = new Set([
  "achillesroofinghouston.com","allthetimeplumbing.com","houstonmedicalcenterdental.com","bayouelectrical.com","leethompsonac.com",
  "allstarairtexas.com","aqueductplumbingcompany.com","partnersroofing.com","lonestarelectricalservices.com","houstontexasdentist.com",
  "texasdentalspecialists.com","texasroof.com","roofingcontractors-texas.com","texasbestroofingco.com","reliantplumbing.com"
].map(d=>d.toLowerCase()));

function scoreOldSite(html: string){ const l=html.toLowerCase(); let s=0; const r:string[]=[]; if(!l.includes('name="viewport"')){s+=2;r.push('no viewport');} const m=l.match(/copyright[^0-9]{0,10}(200[1-9]|201[0-9]|2020)/); if(m){s+=2;r.push(`copy ${m[1]}`);} if(l.includes('<table')||l.includes('<font')||l.includes('xhtml')){s+=2;r.push('old tags');} if(!l.includes('2023')&&!l.includes('2024')&&!l.includes('2025')){s+=1;r.push('no 2023-25');} return {isOld:s>=2,reason:r.join(', ')||'old-ish',score:s}; }

async function kvGet(key:string, logs:string[]): Promise<any> {
  try{
    const url=clean(process.env.KV_REST_API_URL)||clean(process.env.UPSTASH_REDIS_REST_URL)||clean(process.env.KV_URL);
    const token=clean(process.env.KV_REST_API_TOKEN)||clean(process.env.UPSTASH_REDIS_REST_TOKEN)||clean(process.env.KV_REST_API_READ_ONLY_TOKEN);
    logs.push(`KV GET ${key}: url=${url?url.substring(0,30)+'...':'MISSING'} token=${token?'OK '+token.substring(0,10)+'...':'MISSING'}`);
    if(!url||!token){ logs.push(`KV GET FAIL ${key}: missing url or token - add UPSTASH_REDIS_REST_URL + TOKEN in Vercel`); return null; }
    const res=await fetch(`${url}/get/${key}`,{headers:{Authorization:`Bearer ${token}`}});
    const j=await res.json();
    if(!j.result){ logs.push(`KV GET ${key}: null (first time)`); return null; }
    const parsed=JSON.parse(j.result);
    logs.push(`KV GET ${key}: OK value=${String(JSON.stringify(parsed)).substring(0,100)}`);
    return parsed;
  }catch(e:any){ logs.push(`KV GET ERR ${key}: ${e.message}`); return null; }
}
async function kvSet(key:string,val:any, logs:string[]){
  try{
    const url=clean(process.env.KV_REST_API_URL)||clean(process.env.UPSTASH_REDIS_REST_URL)||clean(process.env.KV_URL);
    const token=clean(process.env.KV_REST_API_TOKEN)||clean(process.env.UPSTASH_REDIS_REST_TOKEN);
    logs.push(`KV SET ${key}: trying...`);
    if(!url||!token){ logs.push(`KV SET FAIL ${key}: missing url/token`); return false; }
    const res=await fetch(`${url}/set/${key}`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(JSON.stringify(val))});
    const txt=await res.text();
    logs.push(`KV SET ${key}: status ${res.status} resp ${txt.substring(0,100)} -> ${res.ok?'OK':'FAIL'}`);
    return res.ok;
  }catch(e:any){ logs.push(`KV SET ERR ${key}: ${e.message}`); return false; }
}

const NICHE_CONFIG:Record<string,{queries:(state:string)=>string[];must:string[];title:string;tools:any[]}> = {
  roofing:{queries:(s)=>[`best roofing company ${s} site:.com`,`roofing contractor ${s} site:.com`,`${s} roofing company website site:.com`],must:['roof'],title:'Roofing',tools:[{name:'AI Roof Quote Estimator',desc:'Instant quote from photos'},{name:'Leak Scanner AI',desc:'Photo leak detection'},{name:'Missed-Call Text-Back AI',desc:'Never lose a roofing job'},{name:'Review Auto-Responder AI',desc:'Auto 5-star replies'},{name:'Venus OS CRM',desc:'Leads dashboard'}]},
  plumber:{queries:(s)=>[`best plumber ${s} site:.com`,`plumbing company ${s} site:.com`,`${s} plumber website site:.com`],must:['plumb'],title:'Plumbing',tools:[{name:'Emergency AI Dispatch',desc:'24/7 booking'},{name:'Leak Price Calculator AI',desc:'Instant price'},{name:'Missed-Call Text-Back AI',desc:'Recovers 90% calls'},{name:'Review Booster AI',desc:'5-stars autopilot'},{name:'Venus OS Jobs CRM',desc:'Dispatch & invoicing'}]},
  hvac:{queries:(s)=>[`best HVAC company ${s} site:.com`,`AC repair ${s} site:.com`,`${s} HVAC company website site:.com`],must:['hvac','air','heat','cool','ac'],title:'HVAC',tools:[{name:'AC Repair Quote AI',desc:'By model'},{name:'Duct Cost Estimator AI',desc:'Duct pricing'},{name:'Missed-Call AI Closer',desc:'After hours closer'},{name:'Google Review AI',desc:'Auto response'},{name:'Venus OS Scheduler',desc:'Jobs scheduling'}]},
  electrical:{queries:(s)=>[`best electrician ${s} site:.com`,`electrical contractor ${s} site:.com`,`${s} electrician website site:.com`],must:['electr'],title:'Electrical',tools:[{name:'Electrical Quote AI',desc:'Panel quotes'},{name:'Panel Upgrade Calculator',desc:'Upgrade cost'},{name:'Emergency Call AI',desc:'24/7 booking'},{name:'Review Engine AI',desc:'Reputation'},{name:'Venus OS Invoicing',desc:'Leads to cash'}]},
  dentist:{queries:(s)=>[`best dentist ${s} site:.com`,`dental office ${s} site:.com`,`${s} dentist website site:.com`],must:['dental','dentist','smile'],title:'Dental',tools:[{name:'Smile Scan AI Booking',desc:'From selfie'},{name:'Implant Price Estimator',desc:'Pricing'},{name:'No-Show Rescue AI',desc:'No-shows rescue'},{name:'Review Growth AI',desc:'5-stars'},{name:'Venus OS Patient CRM',desc:'Patient mgmt'}]},
};
const JUNK=['yelp.com','facebook.com','linkedin.com','instagram.com','youtube.com','bestpickreports','serviceagent','google.com','decra.com','roofing.net','angi.com','homeadvisor','thumbtack','bbb.org','wikipedia','amazon.com','houzz','porch.com','healthgrades','zocdoc','yellowpages'];

export async function GET(){
  const logs:string[]=[]; const mined:any[]=[]; const newlySent:string[]=[];
  const SERP_KEY=clean(process.env.SERP_API_KEY); const BREVO_KEY=clean(process.env.BREVO_API_KEY);
  logs.push(`=== V25 START FORCE ROTATION DEBUG BUILT-IN ===`);
  try{
    let sentArr:any=await kvGet('sent_emails', logs);
    let sentSet=new Set<string>((sentArr||[]).map((d:string)=>String(d).toLowerCase().trim()));
    logs.push(`GLOBAL NO-REPEAT: ${sentSet.size} already sent - NEVER REPEAT`);

    let stateIdx:any=await kvGet('current_state_index', logs);
    if(stateIdx===null || stateIdx===undefined){ stateIdx=0; logs.push(`STATE INIT: null -> 0 = Texas (first run)`); }
    else { stateIdx=Number(stateIdx); logs.push(`STATE LOAD: index ${stateIdx} = ${STATES[stateIdx % STATES.length]}`); }

    const currentState=STATES[stateIdx % STATES.length];
    const nextStateIdx=(stateIdx+1) % STATES.length;
    logs.push(`FORCE ROTATION: NOW = ${currentState} (index ${stateIdx}) -> NEXT = ${STATES[nextStateIdx]} (index ${nextStateIdx}) - Email will say ${currentState}, not Texas`);

    let lock:any=await kvGet('blast_lock', logs);
    if(lock && Date.now()-Number(lock) < 5*60*1000){
      logs.push(`MUTEX LOCKED: last blast ${Math.round((Date.now()-Number(lock))/1000)}s ago - wait 5 mins - prevents your 3x badge at 6:10pm`);
      return new Response(JSON.stringify({ok:false,currentState,stateIdx,msg:`LOCKED - ran ${Math.round((Date.now()-Number(lock))/1000)}s ago - wait 5 min - State still ${currentState}`,logs}),{status:200});
    }
    await kvSet('blast_lock',Date.now(),logs);
    logs.push(`MUTEX LOCK SET for 5 mins`);

    const all:{domain:string;niche:string}[]=[];
    for(const [nk,cfg] of Object.entries(NICHE_CONFIG)){
      for(const q of cfg.queries(currentState)){
        try{
          logs.push(`SERPAPI: ${q}`);
          const url=`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&num=10&api_key=${SERP_KEY}`;
          const r=await fetch(url); const d=await r.json();
          for(const rr of d.organic_results||[]){ try{ const dm=new URL(rr.link).hostname.replace('www.','').toLowerCase().trim(); if(dm) all.push({domain:dm,niche:nk}); }catch{} }
        }catch(e:any){ logs.push(`SERPAPI ERR ${q}: ${e.message}`); }
      }
    }
    logs.push(`MINED ${all.length} popular sites in ${currentState} - 50-state rotation`);

    const byOld:Record<string,any[]>={roofing:[],plumber:[],hvac:[],electrical:[],dentist:[]};
    const seen=new Set<string>();
    for(const it of all){
      const d=it.domain.toLowerCase().trim();
      if(HARD_BLACKLIST.has(d)){logs.push(`HARD_BLACKLIST SKIP ${d} - your 9x + 3x spam blocked forever`);continue;}
      if(sentSet.has(d)){logs.push(`GLOBAL NO-REPEAT SKIP ${d} - already sent in other state`);continue;}
      if(JUNK.some(j=>d.includes(j))) continue; if(d.endsWith('.ai')||d.endsWith('.io')) continue; if(seen.has(d)) continue; seen.add(d);
      const cfg=NICHE_CONFIG[it.niche]; if(!cfg.must.some(m=>d.includes(m))) continue;
      try{
        const c=new AbortController(); const t=setTimeout(()=>c.abort(),6000);
        const pr=await fetch(`https://${d}`,{signal:c.signal,headers:{'User-Agent':'Mozilla/5.0'}}); clearTimeout(t);
        if(!pr.ok){ logs.push(`FETCH FAIL ${d} ${pr.status}`); continue; }
        const html=await pr.text(); const age=scoreOldSite(html);
        if(age.isOld){ byOld[it.niche].push({domain:d,niche:it.niche,email:`info@${d}`,ageReason:age.reason,score:age.score,state:currentState}); logs.push(`OLD PASS ${currentState} ${d} score ${age.score} [${age.reason}]`); }
        mined.push({domain:d,niche:it.niche,score:age.score,state:currentState});
      }catch(e:any){ logs.push(`FETCH ERR ${d}: ${e.message}`); }
    }

    const raw=[byOld.roofing[0],byOld.plumber[0],byOld.hvac[0],byOld.electrical[0],byOld.dentist[0]].filter(Boolean);
    const map=new Map(); for(const c of raw){ if(!c) continue; const k=c.domain.toLowerCase(); if(!map.has(k)) map.set(k,c); }
    let toSend=Array.from(map.values()).slice(0,5);
    if(toSend.length<5){
      for(const m of mined){ if(toSend.length>=5) break; const k=m.domain.toLowerCase(); if(!map.has(k) &&!sentSet.has(k) &&!HARD_BLACKLIST.has(k)){ map.set(k,{domain:m.domain,niche:m.niche,email:`info@${m.domain}`,ageReason:'popular '+m.state,score:m.score,state:currentState}); toSend=Array.from(map.values()).slice(0,5); } }
    }
    logs.push(`FINAL ${currentState}: R${byOld.roofing.length} P${byOld.plumber.length} H${byOld.hvac.length} E${byOld.electrical.length} D${byOld.dentist.length} -> SEND ${toSend.length} UNIQUE: ${toSend.map((t:any)=>t.domain).join(', ')}`);

    if(toSend.length>0){
      for(const c of toSend) sentSet.add(c.domain.toLowerCase());
      const ok1=await kvSet('sent_emails',Array.from(sentSet),logs);
      const ok2=await kvSet('current_state_index',nextStateIdx,logs);
      logs.push(`FORCE SAVE: sent_emails ${ok1?'OK':'FAIL'} size ${sentSet.size} | state_index ${stateIdx} -> ${nextStateIdx} (${STATES[nextStateIdx]}) ${ok2?'OK':'FAIL'} - NEXT BLAST WILL BE ${STATES[nextStateIdx]} NOT ${currentState}`);
    } else {
      const ok2=await kvSet('current_state_index',nextStateIdx,logs);
      logs.push(`NO SEND in ${currentState}, but FORCE ADVANCE to ${STATES[nextStateIdx]} ${ok2?'OK':'FAIL'} - prevents Texas loop`);
    }

    let totalSent=0;
    for(const c of toSend){
      const cfg=NICHE_CONFIG[c.niche]; const oldLink=`https://${c.domain}`; const newLink=`https://venus-ai-v8.vercel.app/o/${c.domain}?niche=${c.niche}&state=${encodeURIComponent(currentState)}`;
      const subject=`${c.domain} - Your ${currentState} ${cfg.title} site (2001-2020 untouched) - 2026 AI preview $497`;
      const html=`<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;"><div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;"><div style="padding:12px 24px;background:#0a0a0a;display:flex;justify-content:space-between;align-items:center;"><span style="font-size:12px;letter-spacing:3px;font-weight:900;color:#fff;">VENUS HQ7 • GEN-Z LUXURY AI</span><span style="font-size:10px;color:#D4AF37;font-weight:800;padding:4px 8px;border:1px solid #D4AF37;border-radius:4px;">${currentState.toUpperCase()} • 2001-2020 → 2026</span></div><div style="padding:28px 28px 12px;"><p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;color:#D4AF37;font-weight:800;">POPULAR ${currentState.toUpperCase()} • UNTOUCHED 2001-2020 • FOR ${c.domain.toUpperCase()} • STATE ${stateIdx+1}/50</p><h1 style="margin:0;font-size:26px;line-height:32px;font-weight:900;">Your ${cfg.title} site in ${currentState} hasn't been touched since 2001-2020.<br/>We rebuilt it for 2026.</h1><p style="margin:12px 0 0;font-size:13px;color:#555;">We just finished ${stateIdx>0?STATES[stateIdx-1]:'Texas'} - now launching in ${currentState} - ${STATES.length-stateIdx-1} states left.</p></div><div style="margin:16px 16px 0;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;"><div style="font-size:11px;font-weight:900;letter-spacing:2px;">WHO WE ARE</div><p style="margin:8px 0 0;font-size:13px;line-height:20px;">I'm <b>Ron Kahn</b>, Founder <b>Venus HQ7 LLC</b> — Venus AI Lab, <b>IT Corp Inc, 2016 Blake St, Denver CO 80202, USA</b>. NOT an agency. Gen-Z Luxury AI Lab that finds gold old sites untouched 2001-2020 and rebuilds into AI sites that book jobs. No monthly fee. 24H activation. Currently expanding in <b>${currentState}</b> (State ${stateIdx+1} of 50).</p></div><div style="margin:12px 16px 0;padding:16px;background:#FFFBEB;border:1px solid #fde68a;border-radius:10px;"><div style="font-size:11px;font-weight:900;letter-spacing:2px;color:#92400e;">WHY ARE WE CONTACTING YOU IN ${currentState.toUpperCase()}?</div><p style="margin:8px 0 0;font-size:13px;line-height:20px;">Your domain <b>${c.domain}</b> is a popular ${currentState} ${cfg.title} company but our scan shows <b>untouched 2001-2020</b> (${c.ageReason}). You're losing ranking + calls in ${currentState}. As courtesy we built a free 2026 AI preview for ${currentState} market. One-time contact for ${currentState}. Reply STOP = never again across all 50 states. We work state-by-state - no repeat policy ensures we never email same domain twice.</p></div><div style="padding:16px 16px 0;"><div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;"><div style="padding:12px 16px;background:#fff;border-bottom:1px solid #e5e7eb;"><div style="font-size:10px;font-weight:800;color:#888;">CURRENT SITE - ${currentState.toUpperCase()} UNTOUCHED 2001-2020 [${c.ageReason}]</div><a href="${oldLink}" style="color:#111;font-size:13px;word-break:break-all;font-weight:600;">${oldLink}</a></div><div style="padding:14px 16px;background:#0a0a0a;"><div style="font-size:10px;font-weight:800;color:#D4AF37;">NEW 2026 AI REBUILD - FREE PREVIEW - ${currentState.toUpperCase()} EXCLUSIVE</div><a href="${newLink}" style="color:#fff;font-size:14px;font-weight:700;word-break:break-all;">${newLink}</a></div></div></div><div style="padding:20px 24px 0;"><div style="font-size:11px;font-weight:900;letter-spacing:2px;margin-bottom:10px;">WHAT WE DO IN ${currentState.toUpperCase()} - 5 AI TOOLS + VENUS OS</div><table width="100%">${cfg.tools.map((t:any,i:number)=>`<tr><td style="padding:12px 0;border-bottom:1px solid #f3f4f6;"><span style="background:#0a0a0a;color:#D4AF37;font-size:10px;padding:4px 8px;border-radius:99px;margin-right:10px;">0${i+1}</span><span style="font-size:13px;font-weight:700;">${t.name} for ${currentState}</span><span style="font-size:12px;color:#666;"> - ${t.desc}</span></td></tr>`).join('')}</table></div><div style="margin:20px 16px;padding:18px;border:2px dashed #D4AF37;background:#FFFBEB;border-radius:12px;text-align:center;"><div style="font-size:10px;letter-spacing:2px;color:#92400e;font-weight:800;">24H ACTIVATION - ${currentState.toUpperCase()} LAUNCH - STATE ${stateIdx+1}/50</div><div style="margin-top:6px;"><span style="text-decoration:line-through;color:#999;">$1,997</span><span style="font-size:32px;font-weight:900;margin-left:10px;">$497</span><span style="font-size:12px;color:#92400e;margin-left:8px;">${currentState} only</span></div></div><div style="padding:0 24px 28px;"><a href="${newLink}" style="display:block;text-align:center;background:#0a0a0a;color:#fff;padding:18px;text-decoration:none;font-weight:800;border-radius:8px;">VIEW YOUR ${currentState.toUpperCase()} REBUILT WEBSITE →</a><a href="https://wa.me/17865880578?text=Activate%20${c.domain}%20${currentState}%20for%20$497" style="display:block;text-align:center;background:#fff;color:#0a0a0a;border:2px solid #0a0a0a;padding:16px;text-decoration:none;font-weight:800;border-radius:8px;margin-top:12px;">WHATSAPP ACTIVATE $497 - ${currentState.toUpperCase()} →</a><p style="margin-top:20px;font-size:11px;color:#999;line-height:17px;border-top:1px solid #eee;padding-top:14px;">Venus HQ7 LLC - 2016 Blake St Denver CO 80202 - Ron@venushq7.com - Mining ${currentState} today - ${50-stateIdx-1} states left before cycle repeats - State ${stateIdx+1}/50 - Next: ${STATES[nextStateIdx]}<br/>BCC: venusailux@gmail.com proof. Target: 2001-2020 untouched. Reply STOP = global never again across 50 states. No repeat policy + HARD_BLACKLIST of 15 spam domains.</p></div></div></body></html>`;
      try{
        const res=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':BREVO_KEY,'Content-Type':'application/json'},body:JSON.stringify({sender:{name:`Ron Kahn - Venus HQ7 - ${cfg.title} ${currentState}`,email:'ron@venushq7.com'},to:[{email:c.email}],bcc:[{email:'venusailux@gmail.com'}],subject,htmlContent:html})});
        const j=await res.json(); if(res.status===201){logs.push(`BREVO ${c.niche} ${currentState} 201 ${c.domain} [${c.ageReason}] - Email says ${currentState} NOT Texas`); newlySent.push(c.domain); totalSent++;} else logs.push(`BREVO FAIL ${c.domain}: ${JSON.stringify(j)}`);
      }catch(e:any){logs.push(`BREVO ERR ${e.message}`);}
    }
    return new Response(JSON.stringify({ok:true,currentState,nextState:STATES[nextStateIdx],stateIndex:stateIdx,nextIndex:nextStateIdx,totalSent,alreadySentCount:sentSet.size-newlySent.length,newlySent,mined:mined.slice(0,5),logs,debug:{envUrl:clean(process.env.UPSTASH_REDIS_REST_URL)?.substring(0,40),envToken:clean(process.env.UPSTASH_REDIS_REST_TOKEN)?'present':'missing',hardBlacklist:Array.from(HARD_BLACKLIST).length},msg:`V25 FORCE ROTATION DEBUG: Mined ${currentState} (index ${stateIdx}) -> next ${STATES[nextStateIdx]} (index ${nextStateIdx}). Email personalization = ${currentState}. No repeat across 50 states. V17 luxury kept.`}),{status:200});
  }catch(e:any){return new Response(JSON.stringify({ok:false,error:e.message,logs}),{status:500});}
}
