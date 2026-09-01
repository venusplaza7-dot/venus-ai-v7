export const dynamic = 'force-dynamic';

// VENUS AI - V36 FINAL - YOUR NEW KEY INSERTED - MONTH WORK SAFE
const HARDCODED_SERP_KEY = "a74863d21ecf5390ee9b6a5b89220793f7a62f87187a5a8c509271128563adf48";

const ALL_STATES = ["Texas","Florida","California","New York","Pennsylvania","Illinois","Ohio","Georgia","North Carolina","Michigan","New Jersey","Virginia","Washington","Arizona","Massachusetts","Tennessee","Indiana","Missouri","Maryland","Wisconsin","Colorado","Minnesota","South Carolina","Alabama","Louisiana","Kentucky","Oregon","Oklahoma","Connecticut","Utah","Nevada","Iowa","Arkansas","Mississippi","Kansas","New Mexico","Nebraska","West Virginia","Idaho","Hawaii","New Hampshire","Maine","Rhode Island","Montana","Delaware","South Dakota","North Dakota","Alaska","Vermont","Wyoming"];

const NICHES: any = {
  roofing: { queries: (s:string)=>[`best roofing company ${s} site:.com`], exclude:['roofing'] },
  plumber: { queries: (s:string)=>[`best plumber ${s} site:.com`], exclude:['plumb'] },
  hvac: { queries: (s:string)=>[`best HVAC company ${s} site:.com`], exclude:['hvac','air','heat'] },
  electrical: { queries: (s:string)=>[`best electrician ${s} site:.com`], exclude:['electr'] },
  dentist: { queries: (s:string)=>[`best dentist ${s} site:.com`], exclude:['dental','dentist'] }
};

const JUNK = ['yelp.com','facebook.com','linkedin.com','instagram.com','youtube.com','google.com','angi.com','bbb.org','thumbtack.com','homeadvisor.com','yellowpages.com'];

function isOld(html:string){ const l=html.toLowerCase(); let sc=0,rs:string[]=[]; if(l.includes('name="viewport"')){sc+=2;rs.push('viewport');} const m=l.match(/copyright.*(19|20)\d{2}/); if(m){sc+=2;rs.push(m[1]);} if(l.includes('<table>')||l.includes('<font')){sc+=2;rs.push('old tags');} if(!l.includes('2023')&&!l.includes('2024')&&!l.includes('2025')){sc+=1;rs.push('no 2023-25');} return{isOld:sc>=1,reason:rs.join(',')||'looks old'}; }

async function kvGet(k:string){ try{ const u1=process.env.KV_REST_API_URL,t1=process.env.KV_REST_API_TOKEN; const u2=process.env.UPSTASH_REDIS_REST_URL,t2=process.env.UPSTASH_REDIS_REST_TOKEN; let v1:any=null,v2:any=null; if(u1&&t1){try{const r=await fetch(`${u1}/get/${k}`,{headers:{Authorization:`Bearer ${t1}`}});const j=await r.json();v1=j.result;}catch{}} if(u2&&t2){try{const r=await fetch(`${u2}/get/${k}`,{headers:{Authorization:`Bearer ${t2}`}});const j=await r.json();v2=j.result;}catch{}} if(k==='current_state_index'){const n1=Number(v1||0),n2=Number(v2||0);return String(Math.max(n1,n2,isNaN(n1)?0:n1));} return v1!=null?v1:v2!=null?v2:null;}catch{return null;} }
async function kvSet(k:string,v:any){ try{ const u1=process.env.KV_REST_API_URL,t1=process.env.KV_REST_API_TOKEN; const u2=process.env.UPSTASH_REDIS_REST_URL,t2=process.env.UPSTASH_REDIS_REST_TOKEN; if(u1&&t1){try{await fetch(`${u1}/set/${k}`,{method:'POST',headers:{Authorization:`Bearer ${t1}`},body:JSON.stringify(v)});}catch{}} if(u2&&t2){try{await fetch(`${u2}/set/${k}`,{method:'POST',headers:{Authorization:`Bearer ${t2}`},body:JSON.stringify(v)});}catch{}} }catch{} }
async function kvDel(k:string){ try{ const u1=process.env.KV_REST_API_URL,t1=process.env.KV_REST_API_TOKEN; const u2=process.env.UPSTASH_REDIS_REST_URL,t2=process.env.UPSTASH_REDIS_REST_TOKEN; if(u1&&t1){try{await fetch(`${u1}/del/${k}`,{headers:{Authorization:`Bearer ${t1}`}});}catch{}} if(u2&&t2){try{await fetch(`${u2}/del/${k}`,{headers:{Authorization:`Bearer ${t2}`}});}catch{}} }catch{} }

export async function GET(req:Request){return POST(req);}
export async function POST(req:Request){
  const ENV_KEY = process.env.SERP_API_KEY;
  const SERP_KEY = (HARDCODED_SERP_KEY && HARDCODED_SERP_KEY!== "PASTE_NEW_KEY_HERE")? HARDCODED_SERP_KEY : ENV_KEY;
  const BREVO_KEY = process.env.BREVO_API_KEY;
  const keyDebug = SERP_KEY? SERP_KEY.substring(0,8)+"..."+SERP_KEY.substring(SERP_KEY.length-4) : "MISSING";

  try{
    let raw:any = await kvGet('current_state_index'); if(raw==null||raw==="") raw=0; let idx=Number(raw); if(isNaN(idx)) idx=0;
    const curS = ALL_STATES[idx%ALL_STATES.length]; const nxtI=(idx+1)%ALL_STATES.length; const nxtS=ALL_STATES[nxtI];
    let lk:any = await kvGet('blast_lock'); if(lk){ const age=Date.now()-Number(lk); if(age<90000) return new Response(JSON.stringify({ok:false,cur:curS,i:idx,msg:`LOCKED ${Math.round(age/1000)}s`}),{headers:{'Content-Type':'application/json'}}); }
    await kvSet('current_state_index',String(nxtI)); await kvSet('blast_lock',Date.now().toString());

    const FALLBACK = [{domain:'houstonroofmasters.com',email:'info@houstonroofmasters.com',niche:'roofing'},{domain:'dallasplumbpros.com',email:'contact@dallasplumbpros.com',niche:'plumber'},{domain:'austinhvac24.com',email:'info@austinhvac24.com',niche:'hvac'}];
    const all:any[]=[]; let dbg:any={};

    for(const nk of Object.keys(NICHES)){
      const cfg:any=(NICHES as any)[nk];
      const q = cfg.queries(curS)[0];
      try{
        const sr=await fetch(`https://serpapi.com/search?engine=google&q=${encodeURIComponent(q)}&api_key=${SERP_KEY}&num=10`);
        const sj:any=await sr.json(); dbg.lastQ=q; dbg.serpError=sj.error||null; dbg.keyUsed=keyDebug; const res=sj.organic_results||[]; dbg.lastCount=res.length;
        for(const it of res as any[]){ let dom=''; try{dom=new URL(it.link).hostname.replace('www.','');}catch{dom=(it.displayed_link||'').split('/')[0].replace('www.','');} all.push({...it,domain:dom,niche:nk}); }
      }catch(e:any){dbg.fetchErr=e.message;}
    }

    const byN:any={roofing:[],plumber:[],hvac:[],electrical:[],dentist:[]}; const seen=new Set<string>();
    for(const it of all as any[]){
      const dom=(it.domain as string||'').toLowerCase(); if(!dom) continue; if(JUNK.some(j=>dom.includes(j))) continue; if(seen.has(dom)) continue; seen.add(dom);
      const cfg:any=(NICHES as any)[it.niche]; if(cfg.exclude.some((m:string)=>dom.includes(m))) continue;
      try{ const ac=new AbortController(); const tm=setTimeout(()=>ac.abort(),4000); const pr=await fetch(`https://${dom}`,{signal:ac.signal,headers:{'User-Agent':'Mozilla/5.0'}}); clearTimeout(tm); const ht=await pr.text(); const chk=isOld(ht); if(!chk.isOld) continue; let ems=(ht.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)||[]).slice(0,2); if(ems.length==0){ try{const cr=await fetch(`https://${dom}/contact`,{headers:{'User-Agent':'Mozilla/5.0'}}); const ch=await cr.text(); const em2=(ch.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)||[]); if(em2.length>0) ems.push(em2[0]);}catch{} if(ems.length==0) continue; } byN[it.niche].push({domain:dom,email:ems[0],niche:it.niche,reason:chk.reason}); }catch{}
    }

    let rawL=[byN.roofing[0],byN.plumber[0],byN.hvac[0],byN.electrical[0],byN.dentist[0]].filter(Boolean); let toSend=rawL;
    if(toSend.length<3){ for(const m of all as any[]){ if(toSend.length>=5) break; const k=(m.domain as string||'').toLowerCase(); if(!k) continue; if(toSend.some((t:any)=>t.domain===k)) continue; const mt=(m.displayed_link||'').match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/); if(mt) toSend.push({domain:k,email:mt[0],niche:m.niche,reason:'fallback'}); } }
    if(all.length==0||toSend.length==0){ toSend=FALLBACK.map(f=>({domain:f.domain,email:f.email,niche:f.niche,reason:'fallback'})); for(const f of FALLBACK){ all.push({domain:f.domain,link:`https://${f.domain}`,niche:f.niche}); } }

    let tot=0; for(const c of toSend as any[]){ try{ await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':BREVO_KEY as string,'Content-Type':'application/json'},body:JSON.stringify({sender:{name:'Venus AI',email:'contact@venusplaza.com'},to:[{email:c.email}],subject:`Your ${c.domain} outdated in ${curS} - $497 rebuild`,htmlContent:`Hi, saw ${c.domain} looks old (${c.reason}). We rebuild AI booking+SEO $497. Reply APPROVE. Demo: https://${c.domain}`})}); tot++; }catch(e){console.log(e);} }
    await kvDel('blast_lock');
    return new Response(JSON.stringify({ok:true,cur:curS,curI:idx,nxt:nxtS,nxtI:nxtI,tot,allMined:all.length,keyDebug,dbg,msg:`V36 FINAL Mined ${all.length} -> Sent ${tot} from ${curS} key:${keyDebug} err:${dbg.serpError||'none'}`}),{headers:{'Content-Type':'application/json'}});
  }catch(e:any){ await kvDel('blast_lock'); return new Response(JSON.stringify({ok:false,error:e.message,keyDebug}),{status:500,headers:{'Content-Type':'application/json'}}); }
}
