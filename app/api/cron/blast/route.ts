export const dynamic='force-dynamic';

const S=["Texas","Florida","California","New York","Pennsylvania","Illinois","Ohio","Georgia","North Carolina","Michigan","New Jersey","Virginia","Washington","Arizona","Massachusetts","Tennessee","Indiana","Missouri","Maryland","Wisconsin","Colorado","Minnesota","South Carolina","Alabama","Louisiana","Kentucky","Oregon","Oklahoma","Connecticut","Utah","Nevada","Iowa","Arkansas","Mississippi","Kansas","New Mexico","Nebraska","West Virginia","Idaho","Hawaii","New Hampshire","Maine","Rhode Island","Montana","Delaware","South Dakota","North Dakota","Alaska","Vermont","Wyoming"];

const N:any={
 roofing:{q:(s:string)=>[`best roofing company ${s} site:.com`,`roofing contractor ${s} site:.com`],m:['roofing']},
 plumber:{q:(s:string)=>[`best plumber ${s} site:.com`,`plumbing company ${s} site:.com`],m:['plumb']},
 hvac:{q:(s:string)=>[`best HVAC company ${s} site:.com`,`AC repair ${s} site:.com`],m:['hvac','air','heat']},
 electrical:{q:(s:string)=>[`best electrician ${s} site:.com`,`electrical contractor ${s} site:.com`],m:['electr']},
 dentist:{q:(s:string)=>[`best dentist ${s} site:.com`,`dental office ${s} site:.com`],m:['dental','dentist']}
};
const J=['yelp.com','facebook.com','linkedin.com','instagram.com','youtube.com','google.com','angi.com','bbb.org','thumbtack.com','homeadvisor.com','yellowpages.com','mapquest.com'];

function o(h:string){
 const l=h.toLowerCase();let s=0,r:string[]=[];
 if(l.includes('name="viewport"')){s+=2;r.push('no viewport');}
 const m=l.match(/copyright.*(19|20)\d{2}/); if(m){s+=2;r.push(m[1]);}
 if(l.includes('<table>')||l.includes('<font')){s+=2;r.push('old');}
 if(!l.includes('2023')&&!l.includes('2024')&&!l.includes('2025')){s+=1;r.push('no 2023-25');}
 return{isOld:s>=2,reason:r.join(','),score:s};
}

async function g(k:string){
 try{
  const u1=process.env.KV_REST_API_URL,t1=process.env.KV_REST_API_TOKEN;
  const u2=process.env.UPSTASH_REDIS_REST_URL,t2=process.env.UPSTASH_REDIS_REST_TOKEN;
  let v1:any=null,v2:any=null;
  if(u1&&t1){try{const r=await fetch(`${u1}/get/${k}`,{headers:{Authorization:`Bearer ${t1}`}});const j=await r.json();v1=j.result;}catch{}}
  if(u2&&t2){try{const r=await fetch(`${u2}/get/${k}`,{headers:{Authorization:`Bearer ${t2}`}});const j=await r.json();v2=j.result;}catch{}}
  if(k==='current_state_index'){const n1=Number(v1||0),n2=Number(v2||0);return String(Math.max(n1,n2,isNaN(n1)?0:n1));}
  return v1!=null? v1 : v2!=null? v2 : null;
 }catch{return null;}
}
async function w(k:string,v:any){
 try{
  const u1=process.env.KV_REST_API_URL,t1=process.env.KV_REST_API_TOKEN;
  const u2=process.env.UPSTASH_REDIS_REST_URL,t2=process.env.UPSTASH_REDIS_REST_TOKEN;
  if(u1&&t1){try{await fetch(`${u1}/set/${k}`,{method:'POST',headers:{Authorization:`Bearer ${t1}`},body:JSON.stringify(v)});}catch{}}
  if(u2&&t2){try{await fetch(`${u2}/set/${k}`,{method:'POST',headers:{Authorization:`Bearer ${t2}`},body:JSON.stringify(v)});}catch{}}
 }catch{}
}
async function d(k:string){
 try{
  const u1=process.env.KV_REST_API_URL,t1=process.env.KV_REST_API_TOKEN;
  const u2=process.env.UPSTASH_REDIS_REST_URL,t2=process.env.UPSTASH_REDIS_REST_TOKEN;
  if(u1&&t1){try{await fetch(`${u1}/del/${k}`,{headers:{Authorization:`Bearer ${t1}`}});}catch{}}
  if(u2&&t2){try{await fetch(`${u2}/del/${k}`,{headers:{Authorization:`Bearer ${t2}`}});}catch{}}
 }catch{}
}

export async function GET(req: Request){ return POST(req); }

export async function POST(req: Request){
 const SK=process.env.SERP_API_KEY,BK=process.env.BREVO_API_KEY;
 try{
  let sA:any=await g('sent_emails');let arr=Array.isArray(sA)?sA:(typeof sA==='string'?JSON.parse(sA||'[]'):[]);
  if(!Array.isArray(arr)) arr=[];
  let i:any=await g('current_state_index');if(i==null||i==="") i=0; let idx=Number(i); if(isNaN(idx)) idx=0;
  const curS=S[idx % S.length], nxtI=(idx+1)%S.length, nxtS=S[nxtI];

  let lk:any=await g('blast_lock');
  if(lk){const age=Date.now()-Number(lk); if(age<90000) return new Response(JSON.stringify({ok:false,cur:curS,i:idx,msg:`LOCKED ${Math.round(age/1000)}s ago - wait`}),{headers:{'Content-Type':'application/json'}});}

  await w('current_state_index',String(nxtI)); await w('blast_lock',Date.now().toString());

  const all:any[]=[];
  for(const k of Object.keys(N)){const cfg:any=(N as any)[k];for(const q of cfg.q(curS)){try{
   const sr=await fetch(`https://serpapi.com/search?engine=google&q=${encodeURIComponent(q)}&api_key=${SK}&num=10`);
   const sj=await sr.json(); const res=sj.organic_results||[];
   for(const it of res as any[]){all.push({...it,niche:k});}
  }catch{}}}

  const byO:any={roofing:[],plumber:[],hvac:[],electrical:[],dentist:[]}; const se=new Set<string>();
  for(const it of all as any[]){
   const dom=(it.domain as string||it.displayed_link||'').toLowerCase(); if(!dom) continue;
   if(J.some(j=>dom.includes(j))) continue; if(se.has(dom)) continue; se.add(dom);
   const cfg:any=(N as any)[it.niche]; if(cfg.m.some((m:string)=>dom.includes(m))) continue;
   try{
    const ac=new AbortController(); const tm=setTimeout(()=>ac.abort(),4000);
    const pr=await fetch(`https://${dom}`,{signal:ac.signal, headers:{'User-Agent':'Mozilla/5.0'}}); clearTimeout(tm);
    const ht=await pr.text(); const chk=o(ht); if(chk.isOld) continue;
    const em=(ht.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)||[]).slice(0,3);
    if(em.length==0) continue;
    byO[it.niche].push({domain:dom,email:em[0],niche:it.niche,reason:chk.reason});
   }catch{}
  }

  const raw=[byO.roofing[0],byO.plumber[0],byO.hvac[0],byO.electrical[0],byO.dentist[0]].filter(Boolean);
  let toSend=raw; if(toSend.length<3){
   for(const m of all as any[]){if(toSend.length>=5) break; const k=(m.domain as string||'').toLowerCase(); if(!k) continue; if(toSend.some((t:any)=>t.domain===k)) continue;
    const match=(m.displayed_link||'').match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/); if(match) toSend.push({domain:k,email:match[0],niche:m.niche,reason:'fallback'});
   }
  }

  let tot=0;
  for(const c of toSend as any[]){
   try{
    await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':BK as string,'Content-Type':'application/json'},body:JSON.stringify({sender:{name:'Venus AI',email:'contact@venusplaza.com'},to:[{email:c.email}],subject:`Your ${c.domain} website is outdated (in ${curS}) - rebuild for $497`,htmlContent:`Hi, I saw ${c.domain} - looks outdated (${c.reason}). We rebuild it with AI booking + SEO for $497. Reply APPROVE to start. Demo: https://${c.domain}`})});
    tot++;
   }catch(e){console.log(e);}
  }
  await d('blast_lock');
  return new Response(JSON.stringify({ok:true,cur:curS,curI:idx,nxt:nxtS,nxtI:nxtI,tot,msg:`V33 LONG FIXED Mined ${all.length} -> Sent ${tot} from ${curS}`}),{headers:{'Content-Type':'application/json'}});
 }catch(e:any){await d('blast_lock');return new Response(JSON.stringify({ok:false,error:e.message}),{status:500,headers:{'Content-Type':'application/json'}});}
}
