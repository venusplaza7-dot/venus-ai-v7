'use client'
import { useParams, useSearchParams } from 'next/navigation'

const WHATSAPP_NUMBER = '17865880578'

const DATA: any = {
  roofing:{color:'#D4AF37', name:'Roofing', bg:'#000', text:'#fff', border:'rgba(255,255,255,0.12)', hero:"ROOFS THAT DON'T LEAK. CALLS THAT DON'T STOP.", services:[{n:'Roof Repair', p:'$450-$2k'},{n:'Full Replacement', p:'$4.2k-$8k'},{n:'Emergency Leak', p:'$350-$1.5k'},{n:'Gutter + Inspect', p:'$189-$450'}]},
  plumbers:{color:'#0EA5E9', name:'Plumbing', bg:'#fff', text:'#000', border:'rgba(0,0,0,0.08)', hero:"PIPES THAT DON'T BURST. BOOKINGS THAT DON'T STOP.", services:[{n:'Drain Cleaning', p:'$99-$350'},{n:'Emergency Leak', p:'$150-$500'},{n:'Water Heater', p:'$400-$1.8k'},{n:'Pipe Replacement', p:'$350-$2.5k'}]},
  plumber:{color:'#0EA5E9', name:'Plumbing', bg:'#fff', text:'#000', border:'rgba(0,0,0,0.08)', hero:"PIPES THAT DON'T BURST. BOOKINGS THAT DON'T STOP.", services:[{n:'Drain Cleaning', p:'$99-$350'},{n:'Emergency Leak', p:'$150-$500'},{n:'Water Heater', p:'$400-$1.8k'},{n:'Pipe Replacement', p:'$350-$2.5k'}]},
  hvac:{color:'#FF6B00', name:'HVAC', bg:'#0a0a0a', text:'#fff', border:'rgba(255,255,255,0.12)', hero:"AC THAT DOESN'T QUIT. BOOKINGS THAT DON'T STOP.", services:[{n:'AC Repair', p:'$150-$650'},{n:'Heating Fix', p:'$200-$800'},{n:'Install New Unit', p:'$2.5k-$6k'},{n:'Duct Cleaning', p:'$199-$500'}]},
  dentists:{color:'#7ED7C1', name:'Dental', bg:'#f8fdfb', text:'#000', border:'rgba(0,0,0,0.08)', hero:"SMILES THAT DON'T FADE. BOOKINGS THAT DON'T STOP.", services:[{n:'Cleaning', p:'$99-$199'},{n:'Whitening', p:'$299-$600'},{n:'Implants', p:'$1.5k-$3k'},{n:'Emergency Pain', p:'$75-$450'}]},
  dentist:{color:'#7ED7C1', name:'Dental', bg:'#f8fdfb', text:'#000', border:'rgba(0,0,0,0.08)', hero:"SMILES THAT DON'T FADE. BOOKINGS THAT DON'T STOP.", services:[{n:'Cleaning', p:'$99-$199'},{n:'Whitening', p:'$299-$600'},{n:'Implants', p:'$1.5k-$3k'},{n:'Emergency Pain', p:'$75-$450'}]},
}

function detectNiche(idLower:string, nicheParam:string, businessParam:string){
  const hay = `${idLower} ${nicheParam} ${businessParam}`.toLowerCase()
  if (hay.includes('dentist') || hay.includes('dental') || hay.includes('smile') || hay.includes('bright')) return 'dentists'
  if (hay.includes('plumb')) return 'plumbers'
  if (hay.includes('hvac') || hay.includes(' air ') || hay.includes('cool')) return 'hvac'
  if (hay.includes('roof')) return 'roofing'
  if (nicheParam) return nicheParam
  return 'roofing'
}

export default function DemoPage(){
  const params = useParams()
  const search = useSearchParams()
  const idRaw:any = params?.id
  const id = Array.isArray(idRaw)? idRaw[0] : (idRaw || 'demo123')
  const idLower = String(id).toLowerCase()
  const nicheParam = String(search?.get('niche') || search?.get('category') || '').toLowerCase()
  const businessName = String(search?.get('b') || search?.get('business') || id).replace(/%20/g,' ')
  const oldDomain = String(search?.get('old') || search?.get('domain') || '').toLowerCase()
  const city = String(search?.get('city') || 'houston').toLowerCase()
  const cityU = city.toUpperCase()

  const nicheKey = detectNiche(idLower, nicheParam, businessName.toLowerCase())
  const cfg = (DATA as any)[nicheKey] || DATA.roofing

  const oLink = `https://venus-ai-v8.vercel.app/o/${id}?niche=${nicheKey}&city=${city}&old=${oldDomain}&b=${encodeURIComponent(businessName)}`
  const waMsg = encodeURIComponent(`Hi - Activate ${businessName} ${id} ${nicheKey} ${cityU} Demo: https://venus-ai-v8.vercel.app/p/${id}?niche=${nicheKey}&city=${city}&old=${oldDomain}&b=${encodeURIComponent(businessName)}`)
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`

  return (
    <div style={{minHeight:'100vh', background:cfg.bg, color:cfg.text}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');.syne{font-family:'Syne',sans-serif}`}</style>
      <div style={{height:56, padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${cfg.border}`}}>
        <div className="syne" style={{fontWeight:800, fontSize:14}}>{cityU} {cfg.name.toUpperCase()} CO. — EST. 2008 → REBUILT 2027 — {businessName.toUpperCase()}</div>
        <div style={{fontSize:10, border:`1px solid ${cfg.color}`, color:cfg.color, padding:'6px 12px', borderRadius:999}}>VENUS AI • LIVE • {cfg.color}</div>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:'32px 24px'}}>
        <h1 className="syne" style={{fontSize:'clamp(32px,6vw,64px)', fontWeight:800, lineHeight:0.9}}>{cfg.hero}</h1>
        <p style={{marginTop:12, fontSize:13, opacity:0.6, lineHeight:1.6}}>Original site {oldDomain||'houston2008.biz'} had 4 pages, Comic Sans, Yahoo email. Now: instant booking, proof, 1.1s load. Built for {cityU} — Personalized for {businessName} — Niche {nicheKey} detected.</p>

        <div style={{marginTop:20, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
          <div style={{border:`1px solid ${cfg.border}`, borderRadius:16, padding:16}}><div style={{fontSize:10, opacity:0.5}}>Leads / week</div><div style={{fontSize:20, fontWeight:800, marginTop:4}}>27 → 84</div><div style={{fontSize:11, color:cfg.color, fontWeight:700}}>+211% after rebuild</div></div>
          <div style={{border:`1px solid ${cfg.border}`, borderRadius:16, padding:16}}><div style={{fontSize:10, opacity:0.5}}>Booking rate</div><div style={{fontSize:20, fontWeight:800, marginTop:4}}>11% → 38%</div><div style={{fontSize:11, color:cfg.color, fontWeight:700}}>AI chat + quote</div></div>
          <div style={{border:`1px solid ${cfg.border}`, borderRadius:16, padding:16}}><div style={{fontSize:10, opacity:0.5}}>Load time</div><div style={{fontSize:20, fontWeight:800, marginTop:4}}>8.4s → 1.1s</div><div style={{fontSize:11, color:cfg.color, fontWeight:700}}>Brutalist fast</div></div>
        </div>

        <div style={{marginTop:16, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:10}}>
          {cfg.services.map((s:any)=>(<div key={s.n} style={{border:`1px solid ${cfg.border}`, borderRadius:16, padding:14, background: cfg.bg==='#fff'?'#f6f8fa':'rgba(255,255,255,0.04)'}}><div style={{fontWeight:700, fontSize:13}}>{s.n}</div><div style={{fontSize:11, marginTop:4}}><span style={{color:cfg.color, fontWeight:800}}>{s.p}</span> • AI Quote • Book Now →</div></div>))}
        </div>

        <div style={{marginTop:20, display:'grid', gap:1, background:cfg.border, borderRadius:16, overflow:'hidden', border:`1px solid ${cfg.border}`}}>
          {[
            {n:'01', t:'AI BOOKING CHAT', d:`Books ${businessName} 24/7`},
            {n:'02', t:'AI QUOTE ESTIMATOR', d:'Instant price from photos'},
            {n:'03', t:'AI MISSED-CALL TEXT', d:'Saves $10k/mo'},
            {n:'04', t:'AI REVIEW ENGINE', d:'4.2 → 4.9 stars'},
            {n:'05', t:'AI UPSELL & REBOOK', d:'22% rebook'},
          ].map((x:any)=>(<div key={x.n} style={{background:cfg.bg, padding:14, display:'flex', gap:12}}><div style={{fontSize:11, color:cfg.color, fontWeight:800}}>{x.n}</div><div><div style={{fontSize:12, fontWeight:700}}>{x.t}</div><div style={{fontSize:11, opacity:0.6}}>{x.d}</div></div></div>))}
        </div>

        <div style={{marginTop:20, border:`2px solid ${cfg.color}`, borderRadius:20, padding:20, display:'flex', gap:12, alignItems:'center', flexWrap:'wrap'}}>
          <a href={waLink} target="_blank" style={{height:48, padding:'0 24px', background:'#25D366', color:'#000', borderRadius:999, display:'flex', alignItems:'center', fontWeight:800, fontSize:13, textDecoration:'none'}}>💬 WHATSAPP ACTIVATE {businessName}</a>
          <a href={oLink} style={{height:48, padding:'0 24px', background:cfg.color, color: cfg.color==='#0EA5E9'||cfg.color==='#7ED7C1'?'#000':'#fff', borderRadius:999, display:'flex', alignItems:'center', fontWeight:800, fontSize:13, textDecoration:'none'}}>GO TO OFFER PAGE →</a>
          <span style={{fontSize:11, opacity:0.5}}>ID: {id} • {nicheKey} • {cityU} • {oldDomain} • Color {cfg.color} • {businessName}</span>
        </div>
      </div>
    </div>
  )
}
