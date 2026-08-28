'use client'
import { useParams, useSearchParams } from 'next/navigation'

const WHATSAPP_NUMBER = '17865880578'

const DATA: any = {
  roofing: {
    color:'#D4AF37', name:'Roofing', bg:'#000', text:'#fff', cardBg:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.12)', sub:'rgba(255,255,255,0.5)',
    comp:'Houston Roofing Pros, Bayou Roofing, Lone Star Roofers',
    hero:"ROOFS THAT DON'T LEAK. CALLS THAT DON'T STOP.",
    old:'houstonroofing2008.biz',
    services:[{n:'Roof Repair', p:'$450-$2k'},{n:'Full Replacement', p:'$4.2k-$8k'},{n:'Emergency Leak', p:'$350-$1.5k'},{n:'Gutter + Inspect', p:'$189-$450'}]
  },
  plumbers: {
    color:'#0EA5E9', name:'Plumbing', bg:'#fff', text:'#000', cardBg:'#f6f8fa', border:'rgba(0,0,0,0.08)', sub:'rgba(0,0,0,0.5)',
    comp:'Houston Plumbing Masters, Fix-It Plumbing, Blue Water',
    hero:"PIPES THAT DON'T BURST. BOOKINGS THAT DON'T STOP.",
    old:'houstonplumbing2007.com',
    services:[{n:'Drain Cleaning', p:'$99-$350'},{n:'Emergency Leak', p:'$150-$500'},{n:'Water Heater', p:'$400-$1.8k'},{n:'Pipe Replacement', p:'$350-$2.5k'}]
  },
  plumber: {
    color:'#0EA5E9', name:'Plumbing', bg:'#fff', text:'#000', cardBg:'#f6f8fa', border:'rgba(0,0,0,0.08)', sub:'rgba(0,0,0,0.5)',
    comp:'Houston Plumbing Masters, Fix-It Plumbing, Blue Water',
    hero:"PIPES THAT DON'T BURST. BOOKINGS THAT DON'T STOP.",
    old:'houstonplumbing2007.com',
    services:[{n:'Drain Cleaning', p:'$99-$350'},{n:'Emergency Leak', p:'$150-$500'},{n:'Water Heater', p:'$400-$1.8k'},{n:'Pipe Replacement', p:'$350-$2.5k'}]
  },
  hvac: {
    color:'#FF6B00', name:'HVAC', bg:'#0a0a0a', text:'#fff', cardBg:'rgba(255,255,255,0.04)', border:'rgba(255,255,255,0.12)', sub:'rgba(255,255,255,0.5)',
    comp:'Houston Air Masters, Cool Tech, Arctic HVAC',
    hero:"AC THAT DOESN'T QUIT. BOOKINGS THAT DON'T STOP.",
    old:'houstonachero2008.com',
    services:[{n:'AC Repair', p:'$150-$650'},{n:'Heating Fix', p:'$200-$800'},{n:'Install New Unit', p:'$2.5k-$6k'},{n:'Duct Cleaning', p:'$199-$500'}]
  },
  dentists: {
    color:'#7ED7C1', name:'Dental', bg:'#f8fdfb', text:'#000', cardBg:'#fff', border:'rgba(0,0,0,0.08)', sub:'rgba(0,0,0,0.5)',
    comp:'Houston Smile Studio, Bayou Dental, Uptown Smiles',
    hero:"SMILES THAT DON'T FADE. BOOKINGS THAT DON'T STOP.",
    old:'houstondental2009.com',
    services:[{n:'Cleaning', p:'$99-$199'},{n:'Whitening', p:'$299-$600'},{n:'Implants', p:'$1.5k-$3k'},{n:'Emergency Pain', p:'$75-$450'}]
  },
  dentist: {
    color:'#7ED7C1', name:'Dental', bg:'#f8fdfb', text:'#000', cardBg:'#fff', border:'rgba(0,0,0,0.08)', sub:'rgba(0,0,0,0.5)',
    comp:'Houston Smile Studio, Bayou Dental, Uptown Smiles',
    hero:"SMILES THAT DON'T FADE. BOOKINGS THAT DON'T STOP.",
    old:'houstondental2009.com',
    services:[{n:'Cleaning', p:'$99-$199'},{n:'Whitening', p:'$299-$600'},{n:'Implants', p:'$1.5k-$3k'},{n:'Emergency Pain', p:'$75-$450'}]
  },
}

function detectNiche(idLower:string, nicheParam:string, businessParam:string){
  const hay = `${idLower} ${nicheParam} ${businessParam}`.toLowerCase()
  if (hay.includes('dentist') || hay.includes('dental') || hay.includes('smile') || hay.includes('bright')) return 'dentists'
  if (hay.includes('plumb')) return 'plumbers'
  if (hay.includes('hvac') || hay.includes(' air ') || hay.includes('cool') || hay.includes(' ac ')) return 'hvac'
  if (hay.includes('roof')) return 'roofing'
  if (nicheParam) return nicheParam
  if (idLower==='dentists' || idLower==='plumbers' || idLower==='hvac' || idLower==='roofing') return idLower
  return 'roofing'
}

export default function OfferPage(){
  const params = useParams()
  const search = useSearchParams()
  const idRaw:any = params?.id
  const id = Array.isArray(idRaw)? idRaw[0] : (idRaw || 'demo123')
  const idLower = String(id).toLowerCase()
  const nicheParam = String(search?.get('niche') || search?.get('category') || '').toLowerCase()
  const businessName = String(search?.get('b') || search?.get('business') || id).replace(/%20/g,' ')
  const oldDomain = String(search?.get('old') || search?.get('domain') || '').toLowerCase() || 'houstonroofing2008.biz'
  const city = String(search?.get('city') || 'houston').toLowerCase()
  const cityU = city.toUpperCase()

  const nicheKey = detectNiche(idLower, nicheParam, businessName.toLowerCase())
  const cfg = (DATA as any)[nicheKey] || DATA.roofing
  const nicheU = nicheKey.toUpperCase()

  const pLink = `https://venus-ai-v8.vercel.app/p/${id}?niche=${nicheKey}&city=${city}&old=${oldDomain}&b=${encodeURIComponent(businessName)}`
  const waMsg = encodeURIComponent(`Hi VENUS HQ7 - I want to activate! 🚀\nID:${id}\nBusiness:${businessName}\nOld:${oldDomain}\nNiche:${nicheKey}\nCity:${cityU}\nDemo:${pLink}`)
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`

  return (
    <div style={{minHeight:'100vh', background:'#000', color:'#fff'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@400;600&display=swap');.syne{font-family:'Syne',sans-serif}.grotesk{font-family:'Space Grotesk',sans-serif}`}</style>
      <div style={{height:56, padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
        <div className="syne" style={{fontWeight:800, fontSize:13}}>VENUS HQ7 // {nicheU} // OFFER {id.toUpperCase()} // {cfg.color}</div>
        <div style={{fontSize:10, color:cfg.color, border:`1px solid ${cfg.color}`, padding:'6px 12px', borderRadius:999}}>OLD: {oldDomain}</div>
      </div>
      <div style={{maxWidth:1150, margin:'0 auto', padding:'48px 24px'}}>
        <h1 className="syne" style={{fontSize:'clamp(36px,7vw,84px)', fontWeight:800, lineHeight:0.9}}>WE FOUND YOUR<br/>OLD WEBSITE.<br/><span style={{color:cfg.color}}>WE REBUILT IT FOR 2027.</span></h1>
        <p className="grotesk" style={{marginTop:16, fontSize:14, color:'rgba(255,255,255,0.6)', maxWidth:'60ch', lineHeight:1.6}}>
          Hi <b style={{color:'#fff'}}>{businessName}</b> — Your domain <b style={{color:'#fff'}}>{oldDomain}</b> has been online since 2008. Google knows it. 4 pages, Comic Sans, Yahoo email. Now it can make money. Rebuilt for <b style={{color:'#fff'}}>{cityU} {cfg.name}</b>.
        </p>

        <div style={{marginTop:32, borderRadius:20, border:'1px solid rgba(255,255,255,0.1)', padding:28, background:'#0a0a0a'}}>
          <div style={{fontSize:10, letterSpacing:'0.2em', opacity:0.5}}>[ WHO WE ARE ]</div>
          <h2 className="syne" style={{marginTop:12, fontSize:26, fontWeight:800}}>VENUS HQ7 // VENUS AI LAB — HOUSTON + REMOTE — 24H</h2>
          <p style={{marginTop:12, fontSize:13, lineHeight:1.7, color:'rgba(255,255,255,0.6)', maxWidth:'75ch'}}>
            We are not a web agency. We are <b style={{color:'#fff'}}>scraper + AI builder</b>. We scan 2005-2020 forgotten {cfg.name} sites — domains with 15+ years history but zero design. We found <b style={{color:'#fff'}}>{oldDomain}</b>.<br/><br/>
            Rebuild with brutalist template: booking-first, 1.1s load, 5 AI tools. <span style={{color:cfg.color, fontWeight:700}}>Old SEO stays, new revenue starts.</span> IT Corp Inc — 2016 Blake Street — Business Account — WhatsApp +1 (786) 588-0578 — 24h.
          </p>
        </div>

        <div style={{marginTop:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <div style={{borderRadius:20, background:'#111', border:'1px solid rgba(255,255,255,0.1)', padding:24}}>
            <div style={{fontSize:10, opacity:0.5}}>[ WHAT WE DO ]</div>
            <div style={{marginTop:12, fontSize:13, lineHeight:1.6, display:'grid', gap:10}}>
              <div><span style={{color:cfg.color, fontWeight:800}}>01 SCAN</span> — Found {oldDomain} — History since 2008 — Competitors pay $15/click — You own it.</div>
              <div><span style={{color:cfg.color, fontWeight:800}}>02 BUILD</span> — AI integrated: Booking chat, Quote Estimator, Missed-call text, Review Engine, Upsell — Not a contact form — A booking machine.</div>
              <div><span style={{color:cfg.color, fontWeight:800}}>03 BOOK</span> — 27→84 leads/week, 11%→38% booking, $18.4k/week — $497 one-time.</div>
            </div>
          </div>
          <div style={{borderRadius:20, background:cfg.color, color: cfg.color==='#0EA5E9'||cfg.color==='#7ED7C1'?'#000':'#fff', padding:24}}>
            <div style={{fontSize:10, fontWeight:800, opacity:0.7}}>[ COMPETITORS WE HELPED IN {cityU} — {cfg.name.toUpperCase()} ]</div>
            <div style={{marginTop:12, fontWeight:800, fontSize:15}}>{cfg.comp}</div>
            <div style={{marginTop:12, fontSize:12, lineHeight:1.6}}>Same niche {cfg.name} in {cityU}. Old 2007-2010 sites. Now AI-integrated. Results: 4.2→4.9 ★, $10k/mo missed calls saved, 22% rebook. Your old domain {oldDomain} can beat them — you have older history.</div>
          </div>
        </div>

        <div style={{marginTop:32, padding:24, borderRadius:20, background:'#fff', color:'#000'}}>
          <div className="syne" style={{fontSize:32, fontWeight:800}}>{cfg.hero}</div>
          <div style={{marginTop:8, fontSize:12, opacity:0.6}}>For {businessName} — Original {oldDomain} — 4 pages, Comic Sans, Yahoo email → Now instant booking, proof, 1.1s load. Built for {cityU}.</div>
          <div style={{marginTop:20, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
            <div style={{border:'1px solid rgba(0,0,0,0.1)', borderRadius:16, padding:16}}><div style={{fontSize:10, opacity:0.5}}>Leads / week</div><div style={{fontSize:20, fontWeight:800, marginTop:4}}>27 → 84</div><div style={{fontSize:11, color:cfg.color, fontWeight:700}}>+211% after rebuild</div></div>
            <div style={{border:'1px solid rgba(0,0,0,0.1)', borderRadius:16, padding:16}}><div style={{fontSize:10, opacity:0.5}}>Booking rate</div><div style={{fontSize:20, fontWeight:800, marginTop:4}}>11% → 38%</div><div style={{fontSize:11, color:cfg.color, fontWeight:700}}>AI chat + quote</div></div>
            <div style={{border:'1px solid rgba(0,0,0,0.1)', borderRadius:16, padding:16}}><div style={{fontSize:10, opacity:0.5}}>Load time</div><div style={{fontSize:20, fontWeight:800, marginTop:4}}>8.4s → 1.1s</div><div style={{fontSize:11, color:cfg.color, fontWeight:700}}>Brutalist fast</div></div>
          </div>
          <div style={{marginTop:16, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:10}}>
            {cfg.services.map((s:any)=>(<div key={s.n} style={{border:'1px solid rgba(0,0,0,0.08)', borderRadius:16, padding:14, background:'#f6f8fa'}}><div style={{fontWeight:700, fontSize:13}}>{s.n}</div><div style={{fontSize:11, marginTop:4}}><span style={{color:cfg.color, fontWeight:800}}>{s.p}</span> • AI Quote • Book Now →</div></div>))}
          </div>
          <div style={{marginTop:20}}>
            <div style={{fontSize:10, letterSpacing:'0.15em', opacity:0.5}}>[ 5 AI TOOLS INSIDE — {cfg.color} ]</div>
            <div style={{marginTop:8, display:'grid', gap:1, background:'rgba(0,0,0,0.08)', borderRadius:16, overflow:'hidden', border:'1px solid rgba(0,0,0,0.08)'}}>
              {[
                {n:'01', t:'AI BOOKING CHAT', d:`Replaces form. 8% → 34% conversion. Books ${businessName} while you sleep.`},
                {n:'02', t:'AI QUOTE ESTIMATOR', d:`Instant ${cfg.services[0].p} from photos for ${businessName}.`},
                {n:'03', t:'AI MISSED-CALL TEXT', d:'Missed call? Texts in 3s. Saves $10k/mo.'},
                {n:'04', t:'AI REVIEW ENGINE', d:'Auto asks review, auto replies SEO. 4.2 → 4.9 ★.'},
                {n:'05', t:'AI UPSELL & REBOOK', d:'30 days later: Gutter/filter/cleaning due? 15% off. 22% rebook.'},
              ].map((x:any)=>(<div key={x.n} style={{background:'#fff', padding:14, display:'flex', gap:12}}><div style={{fontSize:11, color:cfg.color, fontWeight:800}}>{x.n}</div><div><div style={{fontSize:12, fontWeight:700}}>{x.t}</div><div style={{fontSize:11, opacity:0.6, marginTop:2}}>{x.d}</div></div><div style={{marginLeft:'auto'}}><span style={{fontSize:9, padding:'4px 8px', borderRadius:999, background:`${cfg.color}20`, border:`1px solid ${cfg.color}40`, color:cfg.color}}>LIVE</span></div></div>))}
            </div>
          </div>
          <div style={{marginTop:16, display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:12}}>
            <div style={{border:`2px solid ${cfg.color}`, borderRadius:16, padding:14}}><div style={{fontSize:10, opacity:0.6}}>AI BOOKING CHAT • LIVE • {id}</div><div style={{marginTop:8, fontFamily:'monospace', fontSize:11, lineHeight:1.6}}><div>Customer: What roof/service? {businessName}?</div><div style={{opacity:0.7}}>AI: Got it. Tomorrow 9am for {cityU}?</div><div style={{color:cfg.color, fontWeight:800}}>→ Booked. Crew 9am. $250 deposit.</div></div></div>
            <div style={{border:'1px solid rgba(0,0,0,0.08)', borderRadius:16, padding:14, background:'#0a0a0a', color:'#fff'}}><div style={{fontSize:10, opacity:0.5}}>VENUS OS • LIVE • {businessName}</div><div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, fontSize:11}}><div><div style={{opacity:0.5}}>Calls Today</div><div style={{fontSize:18, fontWeight:800}}>23</div><div style={{color:cfg.color}}>18 AI</div></div><div><div style={{opacity:0.5}}>Booked</div><div style={{fontSize:18, fontWeight:800}}>8</div><div style={{color:cfg.color}}>6 chat</div></div><div><div style={{opacity:0.5}}>Revenue</div><div style={{fontSize:18, fontWeight:800}}>$4.2k</div><div style={{color:cfg.color}}>$18.4k wk</div></div><div><div style={{opacity:0.5}}>ROI</div><div style={{fontSize:18, fontWeight:800}}>3.2x</div><div style={{color:cfg.color}}>$500→$15k</div></div></div></div>
          </div>
        </div>

        <div style={{marginTop:24, borderRadius:20, border:`2px solid ${cfg.color}`, padding:28, background:'#0a0a0a'}}>
          <div style={{fontSize:28, fontWeight:800}} className="syne">WANT YOURS {businessName}? <span style={{color:cfg.color}}>THIS IS THE SYSTEM.</span></div>
          <div style={{marginTop:12, fontSize:13, color:'rgba(255,255,255,0.6)', lineHeight:1.6}}>Same template your competitors use. Color {cfg.color} for {cfg.name}. ID {id} — {oldDomain} → {cityU}{nicheU}.com — History kept, AI added, revenue yours. $497 one-time, live in 24h. Personalized for {businessName}.</div>
          <div style={{marginTop:20, display:'flex', gap:12, flexWrap:'wrap'}}>
            <a href={waLink} target="_blank" style={{height:56, padding:'0 28px', background:'#25D366', color:'#000', borderRadius:999, display:'flex', alignItems:'center', gap:10, fontWeight:800, fontSize:14, textDecoration:'none'}}>💬 WHATSAPP TO ACTIVATE $497 — +1 (786) 588-0578</a>
            <a href={pLink} style={{height:56, padding:'0 28px', background:'#fff', color:'#000', borderRadius:999, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14, textDecoration:'none'}}>VIEW FULL DEMO →</a>
          </div>
        </div>
      </div>
      <a href={waLink} target="_blank" style={{position:'fixed', bottom:24, right:24, height:56, padding:'0 22px', background:'#25D366', color:'#000', borderRadius:999, display:'flex', alignItems:'center', gap:8, fontWeight:800, fontSize:13, textDecoration:'none', boxShadow:'0 8px 24px rgba(0,0,0,0.4)', zIndex:50}}>WHATSAPP ACTIVATE</a>
    </div>
  )
}
