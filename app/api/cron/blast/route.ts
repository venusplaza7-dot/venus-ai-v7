export const dynamic='force-dynamic';
function c(v?:string){return v?v.trim().replace(/^["']|["']$/g,'').replace(/\n/g,'').replace(/\r/g,'').trim():'';}
const S=["Texas","Florida","California","New York","Pennsylvania","Illinois","Ohio","Georgia","North Carolina","Michigan","New Jersey","Virginia","Washington","Arizona","Massachusetts","Tennessee","Indiana","Missouri","Maryland","Wisconsin","Colorado","Minnesota","South Carolina","Alabama","Louisiana","Kentucky","Oregon","Oklahoma","Connecticut","Utah","Iowa","Nevada","Arkansas","Mississippi","Kansas","New Mexico","Nebraska","West Virginia","Idaho","Hawaii","New Hampshire","Maine","Rhode Island","Montana","Delaware","South Dakota","North Dakota","Alaska","Vermont","Wyoming"];

function o(h:string){const l=h.toLowerCase();let s=0,r:string[]=[];if(!l.includes('name="viewport"')){s+=2;r.push('no viewport');}const m=l.match(/copyright[^0-9]{0,10}(200[1-9]|201[0-9]|2020)/);if(m){s+=2;r.push(m[1]);}if(l.includes('<table')||l.includes('<font')){s+=2;r.push('old');}if(!l.includes('2023')&&!l.includes('2024')&&!l.includes('2025')){s+=1;r.push('no 2023-25');}return{isOld:s>=2,reason:r.join(','),score:s};}

async function g(k:string){try{const u=c(process.env.KV_REST_API_URL)||c(process.env.UPSTASH_REDIS_REST_URL);const t=c(process.env.KV_REST_API_TOKEN)||c(process.env.UPSTASH_REDIS_REST_TOKEN);if(!u||!t)return null;const r=await fetch(`${u}/get/${k}`,{headers:{Authorization:`Bearer ${t}`}});const j=await r.json();if(!j.result)return null;let v=j.result;try{v=JSON.parse(v)}catch{};try{v=JSON.parse(v)}catch{};return v;}catch{return null;}}
async function w(k:string,v:any){try{const u=c(process.env.KV_REST_API_URL)||c(process.env.UPSTASH_REDIS_REST_URL);const t=c(process.env.KV_REST_API_TOKEN)||c(process.env.UPSTASH_REDIS_REST_TOKEN);if(!u||!t)return false;const r=await fetch(`${u}/set/${k}`,{method:'POST',headers:{Authorization:`Bearer ${t}`},body:JSON.stringify(JSON.stringify(v))});return r.ok;}catch{return false;}}
async function d(k:string){try{const u=c(process.env.KV_REST_API_URL)||c(process.env.UPSTASH_REDIS_REST_URL);const t=c(process.env.KV_REST_API_TOKEN)||c(process.env.UPSTASH_REDIS_REST_TOKEN);if(!u||!t)return;await fetch(`${u}/del/${k}`,{headers:{Authorization:`Bearer ${t}`}});}catch{}}

const N:any={roofing:{q:(s:string)=>[`best roofing company ${s} site:.com`,`roofing contractor ${s} site:.com`],m:['roof'],t:'Roofing',l:[{n:'AI Roof Quote Estimator',d:'Instant quote'},{n:'Leak Scanner AI',d:'Photo leak'},{n:'Missed-Call Text-Back AI',d:'Never lose job'},{n:'Review Auto-Responder AI',d:'Auto replies'},{n:'Venus OS CRM',d:'Leads dashboard'}]},plumber:{q:(s:string)=>[`best plumber ${s} site:.com`,`plumbing company ${s} site:.com`],m:['plumb'],t:'Plumbing',l:[{n:'Emergency AI Dispatch',d:'24/7 booking'},{n:'Leak Price Calculator AI',d:'Instant price'},{n:'Missed-Call Text-Back AI',d:'Recovers calls'},{n:'Review Booster AI',d:'5-stars'},{n:'Venus OS Jobs CRM',d:'Dispatch'}]},hvac:{q:(s:string)=>[`best HVAC company ${s} site:.com`,`AC repair ${s} site:.com`],m:['hvac','air','heat','cool','ac'],t:'HVAC',l:[{n:'AC Repair Quote AI',d:'By model'},{n:'Duct Cost Estimator AI',d:'Duct pricing'},{n:'Missed-Call AI Closer',d:'After hours'},{n:'Google Review AI',d:'Auto response'},{n:'Venus OS Scheduler',d:'Scheduling'}]},electrical:{q:(s:string)=>[`best electrician ${s} site:.com`,`electrical contractor ${s} site:.com`],m:['electr'],t:'Electrical',l:[{n:'Electrical Quote AI',d:'Panel quotes'},{n:'Panel Upgrade Calculator',d:'Upgrade cost'},{n:'Emergency Call AI',d:'24/7'},{n:'Review Engine AI',d:'Reputation'},{n:'Venus OS Invoicing',d:'Leads to cash'}]},dentist:{q:(s:string)=>[`best dentist ${s} site:.com`,`dental office ${s} site:.com`],m:['dental','dentist','smile'],t:'Dental',l:[{n:'Smile Scan AI Booking',d:'From selfie'},{n:'Implant Price Estimator',d:'Pricing'},{n:'No-Show Rescue AI',d:'No-shows'},{n:'Review Growth AI',d:'5-stars'},{n:'Venus OS Patient CRM',d:'Patient mgmt'}]}};
const J=['yelp.com','facebook.com','linkedin.com','instagram.com','youtube.com','google.com','angi.com','homeadvisor','thumbtack','bbb.org'];

export async function GET(){
 const L:string[]=[],M:any[]=[],R:string[]=[];const SK=c(process.env.SERP_API_KEY),BK=c(process.env.BREVO_API_KEY);
 try{
  let sA:any=await g('sent_emails');let arr=Array.isArray(sA)?sA:(typeof sA==='string'?JSON.parse(sA):sA||[]);let sS=new Set<string>((arr||[]).map((d:any)=>String(d).toLowerCase()));
  let i:any=await g('current_state_index');if(i===null||i==="")i=0;i=Number(i);const curS=S[i%S.length],nxt=(i+1)%S.length,nxtS=S[nxt];

  // 90 SEC AUTO-RESET - ALLOWS 30 MIN CRON
  let lk:any=await g('blast_lock');
  if(lk){
    const age=Date.now()-Number(lk);
    if(age<90000) return new Response(JSON.stringify({ok:false,cur:curS,msg:`LOCKED ${90-Math.floor(age/1000)}s left`,i}),{status:200});
    else await d('blast_lock');
  }
  // WRITE NEXT BEFORE MINING - ROTATION NEVER STUCK
  await w('current_state_index',nxt);
  await w('blast_lock',Date.now());

  const all:any[]=[];
  for(const k of Object.keys(N)){
    const cfg:any=(N as any)[k];
    for(const q of cfg.q(curS)){
      try{
        const u=`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&num=10&api_key=${SK}`;
        const r=await fetch(u);const d=await r.json();
        for(const rr of (d.organic_results||[])){
          try{const dm=new URL((rr as any).link).hostname.replace('www.','').toLowerCase();if(dm)all.push({domain:dm,niche:k});}catch{}
        }
      }catch{}
    }
  }

  // NO BLACKLIST - 50 STATE ROTATION - NO REPEAT FOR 50 BLASTS
  const byO:any={roofing:[],plumber:[],hvac:[],electrical:[],dentist:[]};const se=new Set<string>();
  // PARALLEL AGE DETECTIVE - 5 at a time - 15 sec vs 75 sec - FITS 30 MIN CRON
  const chunks=[];for(let idx=0;idx<all.length;idx+=5)chunks.push(all.slice(idx,idx+5));
  for(const chunk of chunks){
    const res=await Promise.allSettled(chunk.map(async (it:any)=>{
      const d=(it.domain as string).toLowerCase();if(sS.has(d)||se.has(d)||J.some(j=>d.includes(j)))return null;const cfg:any=(N as any)[it.niche];if(!cfg.m.some((m:string)=>d.includes(m)))return null;
      try{const ac=new AbortController();const tm=setTimeout(()=>ac.abort(),2000);const pr=await fetch(`https://${d}`,{signal:ac.signal,headers:{'User-Agent':'Mozilla/5.0'}});clearTimeout(tm);if(!pr.ok)return null;const h=await pr.text();const a=o(h);return{...it,age:a,isOld:a.isOld}}catch{return null}
    }));
    for(const r of res){if(r.status==='fulfilled'&&r.value){const v=r.value as any;const d=v.domain.toLowerCase();if(!se.has(d)){se.add(d);M.push(v);if(v.isOld)byO[v.niche].push({domain:v.domain,niche:v.niche,email:`info@${v.domain}`,reason:v.age.reason,score:v.age.score,state:curS});}}}
    if(byO.roofing.length&&byO.plumber.length&&byO.hvac.length&&byO.electrical.length&&byO.dentist.length)break;
  }

  const raw=[byO.roofing[0],byO.plumber[0],byO.hvac[0],byO.electrical[0],byO.dentist[0]].filter(Boolean);
  const mp=new Map();for(const c of raw as any[]){const k=(c.domain as string).toLowerCase();if(!mp.has(k))mp.set(k,c);}let toSend=Array.from(mp.values()).slice(0,5);
  if(toSend.length<5){for(const m of M as any[]){if(toSend.length>=5)break;const k=(m.domain as string).toLowerCase();if(!mp.has(k)&&!sS.has(k)){mp.set(k,{domain:m.domain,niche:m.niche,email:`info@${m.domain}`,reason:'popular '+m.state,score:m.score,state:curS});toSend=Array.from(mp.values()).slice(0,5);}}}

  for(const c of toSend as any[])sS.add((c.domain as string).toLowerCase());await w('sent_emails',Array.from(sS));

  let tot=0;
  for(const c of toSend as any[]){
   const cfg:any=(N as any)[c.niche];const oldL=`https://${c.domain}`,newL=`https://venus-ai-v8.vercel.app/o/${c.domain}?niche=${c.niche}&state=${encodeURIComponent(curS)}`;
   const subj=`${c.domain} - Your ${curS} ${cfg.t} site (2001-2020) - 2026 AI $497`;
   const html=`<!DOCTYPE html><html><body style="margin:0;padding:0;background:#ffffff;"><div style="max-width:600px;margin:0 auto;background:#ffffff;border:2px solid #0a0a0a;"><div style="padding:14px 24px;background:#0a0a0a;"><span style="font-size:13px;letter-spacing:3px;font-weight:900;color:#fff;">VENUS HQ7 • LUXURY AI</span><span style="float:right;font-size:11px;color:#D4AF37;border:1px solid #D4AF37;padding:5px 10px;border-radius:20px;font-weight:800;">${curS.toUpperCase()} • STATE ${i+1}/50</span></div><div style="padding:24px;background:#fff;"><h1 style="margin:0;font-size:26px;font-weight:900;color:#0a0a0a;">Your ${cfg.t} site in ${curS} untouched since 2001-2020.<br/>We rebuilt it for 2026.</h1></div><div style="margin:0 16px;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;"><b>WHO WE ARE</b><br/>I'm <b>Ron Kahn</b>, Founder <b>Venus HQ7 LLC</b> — <b>2016 Blake St, Denver CO 80202, USA</b>. Expanding in <b>${curS}</b> State ${i+1}/50.</div><div style="margin:12px 16px;padding:16px;background:#FFFBEB;border:1px solid #fde68a;border-radius:12px;"><b>WHY CONTACTING YOU IN ${curS.toUpperCase()}?</b><br/>Your domain <b>${c.domain}</b> popular ${curS} ${cfg.t} but untouched 2001-2020 (${c.reason}). Built free 2026 preview for ${curS}. One-time. STOP=never 50 states.</div><div style="padding:16px;background:#fff;"><div style="border:2px solid #0a0a0a;border-radius:14px;overflow:hidden;"><div style="padding:16px;background:#fff;"><div style="font-size:11px;font-weight:800;color:#666;">YOUR CURRENT OLD SITE</div><div style="margin-top:8px;padding:12px;background:#f3f4f6;border-radius:8px;font-weight:600;word-break:break-all;color:#111;">${oldL}</div><a href="${oldL}" style="display:inline-block;margin-top:12px;background:#fff;color:#0a0a0a;border:2px solid #0a0a0a;padding:12px 20px;text-decoration:none;font-weight:800;border-radius:8px;">🔗 OPEN YOUR CURRENT SITE →</a></div><div style="padding:18px;background:#0a0a0a;border-top:3px solid #D4AF37;"><div style="font-size:12px;font-weight:900;color:#D4AF37;letter-spacing:2px;">✨ NEW 2026 AI REBUILD - FREE PREVIEW - ${curS.toUpperCase()} ✨</div><div style="margin-top:12px;padding:14px;background:#1a1a1a;border-radius:10px;border:1px solid #D4AF37;text-align:center;"><a href="${newL}" style="color:#D4AF37;font-size:18px;font-weight:900;text-decoration:none;display:block;">👉 CLICK HERE - YOUR NEW WEBSITE</a><div style="color:#aaa;font-size:11px;margin-top:8px;word-break:break-all;">${newL}</div></div><a href="${newL}" style="display:block;margin-top:16px;text-align:center;background:#D4AF37;color:#000000;padding:20px;text-decoration:none;font-weight:900;border-radius:12px;font-size:18px;letter-spacing:1px;border:3px solid #000;">⭐ VIEW YOUR NEW ${curS.toUpperCase()} WEBSITE →</a><div style="text-align:center;color:#D4AF37;font-size:12px;margin-top:10px;font-weight:700;">↑ GOLD BUTTON - VISIBLE IN DARK MODE ↑</div></div></div></div><div style="padding:16px 24px 0;background:#fff;"><b>WHAT WE DO IN ${curS.toUpperCase()} - 5 AI + VENUS OS</b><table width="100%" style="margin-top:10px;">${cfg.l.map((t:any,j:number)=>`<tr><td style="padding:12px 0;border-bottom:1px solid #eee;"><span style="background:#0a0a0a;color:#D4AF37;padding:5px 10px;border-radius:20px;margin-right:10px;font-weight:800;">0${j+1}</span><b>${t.n} for ${curS}</b> - ${t.d}</td></tr>`).join('')}</table></div><div style="margin:20px 16px;padding:20px;border:3px dashed #D4AF37;background:#FFFBEB;border-radius:14px;text-align:center;"><div style="font-size:11px;font-weight:900;color:#92400e;">24H ACTIVATION - ${curS.toUpperCase()} - STATE ${i+1}/50 - NEXT ${nxtS.toUpperCase()}</div><div style="margin-top:8px;"><span style="text-decoration:line-through;color:#999;">$1,997</span><span style="font-size:38px;font-weight:900;margin-left:12px;color:#0a0a0a;">$497</span></div><a href="${newL}" style="display:block;margin-top:12px;background:#0a0a0a;color:#fff;padding:16px;text-decoration:none;font-weight:900;border-radius:10px;">ACTIVATE FOR ${curS.toUpperCase()} → $497</a></div><div style="padding:0 24px 30px;background:#fff;"><a href="https://wa.me/17865880578?text=Activate%20${c.domain}%20${curS}%20$497" style="display:block;text-align:center;background:#25D366;color:#fff;padding:18px;text-decoration:none;font-weight:900;border-radius:10px;">WHATSAPP $497 - ${curS.toUpperCase()} →</a><p style="font-size:11px;color:#777;margin-top:20px;border-top:2px solid #000;padding-top:14px;">Venus HQ7 LLC - Denver - Mining ${curS} - Next: ${nxtS} - State ${i+1}/50<br/>BCC: venusailux@gmail.com. STOP=never 50 states. 50-state rotation, no blacklist needed.</p></div></div></body></html>`;
   try{const r=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':BK,'Content-Type':'application/json'},body:JSON.stringify({sender:{name:`Ron Kahn - Venus HQ7 - ${cfg.t} ${curS}`,email:'ron@venushq7.com'},to:[{email:c.email}],bcc:[{email:'venusailux@gmail.com'}],subject:subj,htmlContent:html})});if(r.status===201){R.push(c.domain);tot++;}}catch{}
  }
  await d('blast_lock');return new Response(JSON.stringify({ok:true,curS,nxtS,i,nxt,tot,R,msg:`V31 50-STATE PARALLEL: Mined ${curS} -> next ${nxtS}. 90s lock + parallel 2s fetch = 30min cron ready.`}),{status:200});
 }catch(e:any){await d('blast_lock');return new Response(JSON.stringify({ok:false,error:e.message,L}),{status:500});}
}
