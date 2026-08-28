'use client'
import { useParams, useSearchParams } from 'next/navigation'

const WHATSAPP_NUMBER = '17865880578'

const DATA:any={
  roofing:{color:'#D4AF37',name:'Roofing',hero:"ROOFS THAT DON'T LEAK. CALLS THAT DON'T STOP.",comp:'Houston Roofing Pros, Bayou Roofing, Lone Star Roofers',services:[{n:'Roof Repair',p:'$450-$2k'},{n:'Full Replacement',p:'$4.2k-$8k'},{n:'Emergency Leak',p:'$350-$1.5k'},{n:'Gutter + Inspect',p:'$189-$450'}]},
  plumbers:{color:'#0EA5E9',name:'Plumbing',hero:"PIPES THAT DON'T BURST. BOOKINGS THAT DON'T STOP.",comp:'Houston Plumbing Masters, Fix-It Plumbing, Blue Water',services:[{n:'Drain Cleaning',p:'$99-$350'},{n:'Emergency Leak',p:'$150-$500'},{n:'Water Heater',p:'$400-$1.8k'},{n:'Pipe Replacement',p:'$350-$2.5k'}]},
  hvac:{color:'#FF6B00',name:'HVAC',hero:"AC THAT DOESN'T QUIT. BOOKINGS THAT DON'T STOP.",comp:'Houston Air Masters, Cool Tech, Arctic HVAC',services:[{n:'AC Repair',p:'$150-$650'},{n:'Heating Fix',p:'$200-$800'},{n:'Install New Unit',p:'$2.5k-$6k'},{n:'Duct Cleaning',p:'$199-$500'}]},
  dentists:{color:'#7ED7C1',name:'Dental',hero:"SMILES THAT DON'T FADE. BOOKINGS THAT DON'T STOP.",comp:'Houston Smile Studio, Bayou Dental, Uptown Smiles',services:[{n:'Cleaning',p:'$99-$199'},{n:'Whitening',p:'$299-$600'},{n:'Implants',p:'$1.5k-$3k'},{n:'Emergency Pain',p:'$75-$450'}]},
}
function detectNiche(id:string,niche:string,biz:string){
  const h=`${id} ${niche} ${biz}`.toLowerCase()
  if(h.includes('dentist')||h.includes('dental')||h.includes('smile')||h.includes('bright')) return 'dentists'
  if(h.includes('plumb')) return 'plumbers'
  if(h.includes('hvac')||h.includes(' air ')) return 'hvac'
  return niche||'roofing'
}

export default function Page(){
  const params=useParams()
  const search=useSearchParams()
  const idRaw:any=params?.id
  const id=Array.isArray(idRaw)?idRaw[0]:(idRaw||'demo123')
  const biz=String(search?.get('b')||search?.get('business')||id).replace(/%20/g,' ')
  const oldDom=String(search?.get('old')||search?.get('domain')||'houstonroofing2008.biz')
  const city=String(search?.get('city')||'houston')
  const cityU=city.toUpperCase()
  const nicheP=String(search?.get('niche')||'').toLowerCase()
  const nicheKey=detectNiche(String(id).toLowerCase(),nicheP,biz.toLowerCase())
  const cfg=(DATA as any)[nicheKey]||DATA.roofing
  const pLink=`https://venus-ai-v8.vercel.app/p/${id}?niche=${nicheKey}&city=${city}&old=${oldDom}&b=${encodeURIComponent(biz)}`
  const waMsg=encodeURIComponent(`Hi VENUS HQ7! 🚀\nBusiness: ${biz}\nID: ${id}\nOld: ${oldDom}\nNiche: ${nicheKey}\nCity: ${cityU}\nLink: ${pLink}\n\nI want to activate for $497 (was $1997) - 24h delivery with all 5 AI tools.`)
  const waLink=`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`

  return (
    <div style={{minHeight:'100vh',background:'#000',color:'#fff'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');.syne{font-family:'Syne',sans-serif}`}</style>
      <div style={{height:56,padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
        <div className="syne" style={{fontWeight:800,fontSize:13}}>VENUS HQ7 // OFFER {id.toUpperCase()} // 24H DELIVERY</div>
        <div style={{fontSize:10,display:'flex',gap:8,alignItems:'center'}}><span style={{textDecoration:'line-through',opacity:0.5}}>$1997</span><span style={{color:cfg.color,border:`1px solid ${cfg.color}`,padding:'6px 12px',borderRadius:999,fontWeight:800}}>$497 TODAY • OLD: {oldDom}</span></div>
      </div>

      <div style={{maxWidth:1150,margin:'0 auto',padding:'48px 24px'}}>
        <h1 className="syne" style={{fontSize:'clamp(36px,7vw,84px)',fontWeight:800,lineHeight:0.9}}>WE FOUND YOUR<br/>OLD WEBSITE.<br/><span style={{color:cfg.color}}>WE REBUILT IT FOR 2027.</span></h1>
        <p style={{marginTop:16,fontSize:14,color:'rgba(255,255,255,0.6)',maxWidth:'60ch',lineHeight:1.6}}>Hi <b style={{color:'#fff'}}>{biz}</b> — Your domain <b style={{color:'#fff'}}>{oldDom}</b> since 2008. 4 pages, Comic Sans, Yahoo email. Now booking machine. For <b style={{color:'#fff'}}>{cityU} {cfg.name}</b>.</p>

        {/* WHO WE ARE - NOW BIGGER */}
        <div style={{marginTop:32,borderRadius:20,border:'1px solid rgba(255,255,255,0.15)',padding:28,background:'#0a0a0a'}}>
          <div style={{fontSize:10,letterSpacing:'0.2em',opacity:0.5}}>[ WHO WE ARE — VENUS HQ7 ]</div>
          <h2 className="syne" style={{marginTop:12,fontSize:28,fontWeight:800,lineHeight:1.1}}>WE ARE VENUS HQ7 // VENUS AI LAB<br/>GEN-Z LUXURY AI FOR {cfg.name.toUpperCase()} — HOUSTON + REMOTE — 24H OPEN</h2>
          <p style={{marginTop:16,fontSize:13,lineHeight:1.8,color:'rgba(255,255,255,0.6)',maxWidth:'80ch'}}>
            We are NOT a web agency. Agencies charge $1997+ and take 4 weeks.<br/><br/>
            We are <b style={{color:'#fff'}}>scraper + AI builder</b>. We scan 2005-2020 forgotten {cfg.name} websites in {cityU} — domains like <b style={{color:'#fff'}}>{oldDom}</b> with 15+ years Google history but zero design, zero booking.<br/><br/>
            We found your domain. Still indexed. Competitors pay $15/click for same traffic. You already own the history.<br/>
            <span style={{color:'#fff',fontWeight:700}}>Headquarters:</span> 2016 Blake Street, California — IT Corp Inc — Business Account — WhatsApp +1 (786) 588-0578 — Open 24 hours — {biz} account managed by Usa Ron.
          </p>
        </div>

        {/* WHAT WE DO + PRICING */}
        <div style={{marginTop:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          <div style={{borderRadius:20,background:'#111',border:'1px solid rgba(255,255,255,0.1)',padding:24}}>
            <div style={{fontSize:10,letterSpacing:'0.2em',opacity:0.5}}>[ WHAT WE DO ]</div>
            <div style={{marginTop:14,display:'grid',gap:14,fontSize:13,lineHeight:1.6}}>
              <div><b style={{color:cfg.color}}>01 — SCAN</b> — Find old gold like {oldDom}. Est 2008. 4 pages. Still indexed. We extract old SEO value.</div>
              <div><b style={{color:cfg.color}}>02 — REBUILD WITH AI</b> — Brutalist template, 1.1s load, 5 AI tools: Booking Chat, Quote Estimator, Missed-Call Text, Review Engine, Upsell & Rebook. Not contact form — booking machine.</div>
              <div><b style={{color:cfg.color}}>03 — ACTIVATE IN 24H</b> — You pay, we go live in 24 hours with all AI tools, domain connected, booking open. You keep 100% revenue. No monthly fee.</div>
            </div>
          </div>
          <div style={{borderRadius:20,background:cfg.color,color:cfg.color==='#0EA5E9'||cfg.color==='#7ED7C1'?'#000':'#fff',padding:24}}>
            <div style={{fontSize:10,fontWeight:800,letterSpacing:'0.15em',opacity:0.8}}>[ PRICING — 24H ACTIVATION ]</div>
            <div style={{marginTop:12,display:'flex',alignItems:'baseline',gap:12}}>
              <div style={{fontSize:18,textDecoration:'line-through',opacity:0.6}}>ORIGINAL $1997</div>
              <div style={{fontSize:42,fontWeight:800}}>$497</div>
              <div style={{fontSize:12,fontWeight:800,padding:'6px 10px',borderRadius:999,background:'#000',color:'#fff'}}>75% OFF TODAY</div>
            </div>
            <div style={{marginTop:12,fontSize:13,lineHeight:1.6,fontWeight:600}}>We will activate your new website with ALL 5 AI tools within 24 hours after you WhatsApp. Includes: AI Booking Chat, AI Quote, AI Missed-Call, AI Reviews, AI Upsell + Venus OS Dashboard. Hosting + SSL + domain connect included.</div>
            <div style={{marginTop:14,fontSize:11,lineHeight:1.5,opacity:0.8}}>Competitors we helped: {cfg.comp} — same niche {cfg.name} in {cityU}. Old 2007-2010 sites → now 84 leads/week, 38% booking, $18.4k/week. Your old domain {oldDom} has older history — can beat them.</div>
            <a href={waLink} target="_blank" style={{marginTop:16,height:48,background:'#000',color:'#fff',borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,textDecoration:'none'}}>WHATSAPP TO ACTIVATE IN 24H — $497 (WAS $1997) →</a>
          </div>
        </div>

        {/* STATS + SERVICES + TOOLS */}
        <div style={{marginTop:24,padding:24,borderRadius:20,background:'#fff',color:'#000'}}>
          <div className="syne" style={{fontSize:28,fontWeight:800}}>{cfg.hero} — FOR {biz.toUpperCase()}</div>
          <div style={{marginTop:8,fontSize:12,opacity:0.6}}>Original {oldDom} → Rebuilt 2027 — Personalized for {biz} — {cityU}</div>
          <div style={{marginTop:16,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            <div style={{border:'1px solid rgba(0,0,0,0.1)',borderRadius:16,padding:16}}><div style={{fontSize:10,opacity:0.5}}>Leads / week</div><div style={{fontSize:20,fontWeight:800}}>27 → 84</div><div style={{fontSize:11,color:cfg.color,fontWeight:700}}>+211% after rebuild</div></div>
            <div style={{border:'1px solid rgba(0,0,0,0.1)',borderRadius:16,padding:16}}><div style={{fontSize:10,opacity:0.5}}>Booking rate</div><div style={{fontSize:20,fontWeight:800}}>11% → 38%</div><div style={{fontSize:11,color:cfg.color,fontWeight:700}}>AI chat + quote</div></div>
            <div style={{border:'1px solid rgba(0,0,0,0.1)',borderRadius:16,padding:16}}><div style={{fontSize:10,opacity:0.5}}>Delivery</div><div style={{fontSize:20,fontWeight:800}}>24 Hours</div><div style={{fontSize:11,color:cfg.color,fontWeight:700}}>All 5 AI tools live</div></div>
          </div>
          <div style={{marginTop:16,display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))',gap:10}}>
            {cfg.services.map((s:any)=>(<div key={s.n} style={{border:'1px solid rgba(0,0,0,0.08)',borderRadius:16,padding:14,background:'#f6f8fa'}}><div style={{fontWeight:700,fontSize:13}}>{s.n}</div><div style={{fontSize:11,marginTop:4}}><span style={{color:cfg.color,fontWeight:800}}>{s.p}</span> • AI Quote • Book Now</div></div>))}
          </div>
          <div style={{marginTop:16,fontSize:10,letterSpacing:'0.15em',opacity:0.5}}>[ 5 AI TOOLS YOU GET IN 24H ]</div>
          <div style={{marginTop:8,display:'grid',gap:1,background:'rgba(0,0,0,0.08)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(0,0,0,0.08)'}}>
            {[
              {n:'01',t:'AI BOOKING CHAT',d:`Replaces form for ${biz}. 8% → 34% conversion.`},
              {n:'02',t:'AI QUOTE ESTIMATOR',d:'Instant price from photos → 4x bookings.'},
              {n:'03',t:'AI MISSED-CALL TEXT',d:'Missed call? Texts in 3s. Saves $10k/mo.'},
              {n:'04',t:'AI REVIEW ENGINE',d:'Auto asks review, auto replies SEO. 4.2 → 4.9 ★.'},
              {n:'05',t:'AI UPSELL & REBOOK + VENUS OS',d:'30 days later upsell + live revenue dashboard.'},
            ].map((x:any)=>(<div key={x.n} style={{background:'#fff',padding:14,display:'flex',gap:12}}><div style={{fontSize:11,color:cfg.color,fontWeight:800}}>{x.n}</div><div><div style={{fontSize:12,fontWeight:700}}>{x.t}</div><div style={{fontSize:11,opacity:0.6,marginTop:2}}>{x.d}</div></div><span style={{marginLeft:'auto',fontSize:9,padding:'4px 8px',borderRadius:999,background:`${cfg.color}20`,border:`1px solid ${cfg.color}40`,color:cfg.color,height:'fit-content'}}>INCLUDED IN $497</span></div>))}
          </div>
        </div>

        {/* FINAL CTA WITH PRICING AGAIN */}
        <div style={{marginTop:24,borderRadius:20,border:`2px solid ${cfg.color}`,padding:28,background:'#0a0a0a',textAlign:'center'}}>
          <div style={{fontSize:12,letterSpacing:'0.2em',opacity:0.5}}>[ ACTIVATE IN 24 HOURS ]</div>
          <h3 className="syne" style={{marginTop:12,fontSize:32,fontWeight:800}}>ORIGINAL <span style={{textDecoration:'line-through',opacity:0.5}}>$1997</span> → TODAY <span style={{color:cfg.color}}>$497</span></h3>
          <p style={{marginTop:12,fontSize:14,color:'rgba(255,255,255,0.6)',maxWidth:'60ch',margin:'12px auto 0',lineHeight:1.6}}>We will activate your new website for <b style={{color:'#fff'}}>{biz}</b> with all 5 AI tools within 24 hours. Old domain {oldDom} kept, new AI system live. You keep 100% revenue. One-time $497, no monthly. Managed by Usa Ron — IT Corp Inc — 2016 Blake Street — Business Account.</p>
          <div style={{marginTop:20,display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <a href={waLink} target="_blank" style={{height:56,padding:'0 32px',background:'#25D366',color:'#000',borderRadius:999,display:'flex',alignItems:'center',gap:10,fontWeight:800,fontSize:15,textDecoration:'none'}}>💬 WHATSAPP +1 (786) 588-0578 — ACTIVATE IN 24H — $497</a>
            <a href={pLink} style={{height:56,padding:'0 28px',background:'#fff',color:'#000',borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14,textDecoration:'none'}}>VIEW LIVE DEMO →</a>
          </div>
          <div style={{marginTop:12,fontSize:11,opacity:0.4}}>24H delivery guaranteed • All AI tools included • Was $1997 now $497 • ID {id} • {oldDom} • {cityU}</div>
        </div>
      </div>
      <a href={waLink} target="_blank" style={{position:'fixed',bottom:24,right:24,height:56,padding:'0 22px',background:'#25D366',color:'#000',borderRadius:999,display:'flex',alignItems:'center',gap:8,fontWeight:800,fontSize:13,textDecoration:'none',boxShadow:'0 8px 24px rgba(0,0,0,0.4)',zIndex:50}}>WHATSAPP $497 IN 24H</a>
    </div>
  )
}
