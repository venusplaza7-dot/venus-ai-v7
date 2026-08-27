export const dynamic='force-dynamic'
export const runtime='nodejs'

function luxuryHtml(domain:string,cat:string,demoUrl:string){
return `<div style="background:#0a0a0a;padding:40px 20px;font-family:Inter,Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;background:#111;padding:40px;border-radius:16px;border:1px solid #222">
<div style="color:#666;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px">VENUS PLAZA — GEN-Z LUXURY AGENCY</div>
<h1 style="color:#fff;font-size:30px;line-height:1.1;margin:0 0 10px 0;font-weight:900">Your ${cat} site is losing $30k/mo.</h1>
<div style="height:2px;width:40px;background:#fff;margin:16px 0"></div>
<p style="color:#aaa;font-size:14px;line-height:1.8;margin:0">
Hi, this is <b style="color:#fff">Venus Plaza</b> — we build Gen-Z Luxury websites + 4 AI Agents that book jobs while you sleep.<br/><br/>
Old: <span style="color:#555">${domain}</span> — 8s load, no booking, no AI, losing to competitors<br/>
<b style="color:#fff">New: Luxury black design + AI Receptionist that answers in 2s + Auto-booking + SEO — $497 (was $1999)</b><br/><br/>
I built you a live preview — takes 60 sec to see:
</p>
<div style="background:#0a0a0a;border:1px solid #222;border-radius:12px;padding:20px;margin:20px 0">
<p style="color:#fff;font-size:14px;margin:0 0 8px 0">✓ AI answers calls & books on calendar</p>
<p style="color:#fff;font-size:14px;margin:0 0 8px 0">✓ Luxury black = 3x more high-ticket leads</p>
<p style="color:#fff;font-size:14px;margin:0 0 8px 0">✓ Loads in 0.8s not 8s — Google loves it</p>
<p style="color:#fff;font-size:14px;margin:0">✓ 24/7 — works while you sleep</p>
</div>
<a href="${demoUrl}" style="display:block;text-align:center;background:#fff;color:#000;padding:18px;border-radius:100px;text-decoration:none;font-weight:800;font-size:16px">👉 See Your New Luxury Site →</a>
<p style="color:#555;font-size:11px;text-align:center;margin-top:16px">Live preview expires in 24h — built for ${domain}</p>
<p style="color:#333;font-size:11px;text-align:center;margin-top:8px">Reply STOP to opt-out — Venus Plaza, Lahore — launch@venusplaza.online</p>
</div></div>`
}

async function scrapeRealEmail(domain:string){
  for(const path of ['','/contact','/contact-us','/about']){
    try{
      const res=await fetch(`https://${domain}${path}`,{headers:{'User-Agent':'Mozilla/5.0'},signal:AbortSignal.timeout(5000) as any}).catch(()=>null)
      if(!res||!res.ok) continue
      const html=await res.text()
      const emails=html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g)
      if(!emails) continue
      const good=emails.filter(e=>{const l=e.toLowerCase();return !l.includes('example')&&!l.includes('wix')&&!l.includes('sentry')&&!l.includes('.png')&&!l.includes('.jpg')&&l.length<60})
      const real=good.find(e=>{const l=e.toLowerCase();return !l.startsWith('info@')&&!l.startsWith('admin@')&&!l.startsWith('support@')&&!l.startsWith('noreply@')&&!l.startsWith('no-reply@')&&!l.startsWith('hello@')})
      if(real) return real
    }catch{}
  }
  return null
}

export async function GET(req:Request){
  const u=new URL(req.url)
  const action=u.searchParams.get('action')||'blast'
  const live=u.searchParams.get('live')==='1'
  const KV_URL=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL||''
  const KV_TOKEN=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN||''
  const H={Authorization:`Bearer ${KV_TOKEN}`}
  const niches=['roofers','plumbers','electricians','dentists','contractors']
  const SEND_KEY=process.env.SENDGRID_API_KEY||process.env.BREVO_KEY||''
  const TEST_EMAIL=process.env.TEST_EMAIL||'ve9us1@gmail.com'

  if(action==='clear'){
    for(const cat of niches){await fetch(`${KV_URL}/del/${cat}:queue`,{headers:H})}
    return Response.json({status:'CLEARED_5'})
  }

  if(action==='mine5'){
    let total=0
    const cities=['austin','miami','dallas','phoenix','denver','seattle','atlanta','chicago','houston','tampa']
    for(const cat of niches){
      const city=cities[Math.floor(Math.random()*cities.length)]
      const html=await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(cat+' in '+city+' site:.com')}`,{headers:{'User-Agent':'Mozilla/5.0'}}).then(r=>r.text()).catch(()=> '')
      const domains=[...new Set([...html.matchAll(/https?:\/\/([a-z0-9.-]+\.[a-z]{2,})/gi)].map(m=>m[1]).filter(d=>!d.includes('duckduckgo')&&!d.includes('yelp')&&d.includes('.')&&d.length<30).slice(0,25))]
      for(const domain of domains){
        const email=await scrapeRealEmail(domain)
        if(!email) continue
        await fetch(`${KV_URL}/rpush/${cat}:queue/${encodeURIComponent(domain)}`,{headers:H})
        await fetch(`${KV_URL}/set/${cat}:email:${encodeURIComponent(domain)}/${encodeURIComponent(email)}`,{headers:H})
        total++; if(total>=100) break
        await new Promise(r=>setTimeout(r,600))
      }
    }
    return Response.json({status:'MINED_5_EVEN',total})
  }

  const blasted:any[]=[]
  for(const cat of niches){
    const raw:any=await fetch(`${KV_URL}/lrange/${cat}:queue/0/-1`,{headers:H}).then(r=>r.json()).catch(()=>({result:[]}))
    let domains=(raw.result||[]).map((d:string)=>{try{return decodeURIComponent(d)}catch{return d}}).filter(Boolean)
    domains=domains.sort(()=>0.5-Math.random()).slice(0,1) // 1 PER CATEGORY = 5 TOTAL
    for(const domain of domains){
      const em:any=await fetch(`${KV_URL}/get/${cat}:email:${encodeURIComponent(domain)}`,{headers:H}).then(r=>r.json()).catch(()=>({result:null}))
      const realEmail=em.result?decodeURIComponent(em.result):`info@${domain}`
      const toEmail=live?realEmail:TEST_EMAIL
      const id=Math.random().toString(36).slice(2,10)
      const base=process.env.VERCEL_URL?`https://${process.env.VERCEL_URL}`:'https://venus-ai-v8.vercel.app'
      const demoUrl=`${base}/p/${id}?domain=${encodeURIComponent(domain)}&cat=${cat}`
      const html=luxuryHtml(domain,cat,demoUrl)
      try{
        if(SEND_KEY.startsWith('SG.')){
          await fetch('https://api.sendgrid.com/v3/mail/send',{method:'POST',headers:{Authorization:`Bearer ${SEND_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({personalizations:[{to:[{email:toEmail}]}],from:{email:'launch@venusplaza.online',name:'Venus Plaza'},subject:`${domain} — Your new Luxury ${cat} site is ready (preview inside)`,content:[{type:'text/html',value:html}]})})
        }else{
          await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':SEND_KEY,'Content-Type':'application/json'},body:JSON.stringify({to:[{email:toEmail}],sender:{email:'launch@venusplaza.online',name:'Venus Plaza'},subject:`${domain} — Your new Luxury ${cat} site is ready (preview inside)`,htmlContent:html})})
        }
        blasted.push({cat,domain,realEmail,sent_to:toEmail,demo:demoUrl})
      }catch(e:any){blasted.push({cat,domain,error:e.message})}
      await new Promise(r=>setTimeout(r,800))
    }
  }
  return Response.json({status:live?'BLAST_5_LIVE_1_PER_CAT':'BLAST_5_TEST_1_PER_CAT',total:blasted.length,blasted})
}
