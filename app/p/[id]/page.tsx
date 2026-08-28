'use client'
import { useParams, useSearchParams } from 'next/navigation'

const NICHES: any = {
  roofing: {
    color: '#D4AF37',
    bg: '#000',
    text: '#fff',
    subText: 'rgba(255,255,255,0.5)',
    cardBg: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.12)',
    hero: "ROOFS THAT DON'T LEAK. CALLS THAT DON'T STOP.",
    oldDomain: 'houstonroofing2008.biz',
    services: [
      {name:'Roof Repair', price:'$450-$2k', note:'AI Quote'},
      {name:'Full Replacement', price:'$4.2k-$8k', note:'AI Quote'},
      {name:'Emergency Leak', price:'$350-$1.5k', note:'24/7'},
      {name:'Gutter + Inspect', price:'$189-$450', note:'Rebook'},
    ],
    chat: ['What roof type? Shingle leak?', 'Got it. When? Tomorrow 9am?', 'Booked. Crew at 9am. $250 deposit.'],
  },
  roofers: {
    color: '#D4AF37',
    bg: '#000',
    text: '#fff',
    subText: 'rgba(255,255,255,0.5)',
    cardBg: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.12)',
    hero: "ROOFS THAT DON'T LEAK. CALLS THAT DON'T STOP.",
    oldDomain: 'houstonroofing2008.biz',
    services: [
      {name:'Roof Repair', price:'$450-$2k', note:'AI Quote'},
      {name:'Full Replacement', price:'$4.2k-$8k', note:'AI Quote'},
      {name:'Emergency Leak', price:'$350-$1.5k', note:'24/7'},
      {name:'Gutter + Inspect', price:'$189-$450', note:'Rebook'},
    ],
    chat: ['What roof type? Shingle leak?', 'Got it. When? Tomorrow 9am?', 'Booked. Crew at 9am. $250 deposit.'],
  },
  plumbers: {
    color: '#0EA5E9',
    bg: '#ffffff',
    text: '#000',
    subText: 'rgba(0,0,0,0.55)',
    cardBg: '#f6f8fa',
    border: 'rgba(0,0,0,0.08)',
    hero: "PIPES THAT DON'T BURST. BOOKINGS THAT DON'T STOP.",
    oldDomain: 'houstonplumbing2007.com',
    services: [
      {name:'Drain Cleaning', price:'$99-$350', note:'AI Quote'},
      {name:'Emergency Leak', price:'$150-$500', note:'24/7'},
      {name:'Water Heater', price:'$400-$1.8k', note:'Same Day'},
      {name:'Pipe Replacement', price:'$350-$2.5k', note:'Warranty'},
    ],
    chat: ["What's leaking? Kitchen drain?", "On my way - can I come in 1hr?", "Booked. Tech at 2pm."],
  },
  plumber: {
    color: '#0EA5E9',
    bg: '#ffffff',
    text: '#000',
    subText: 'rgba(0,0,0,0.55)',
    cardBg: '#f6f8fa',
    border: 'rgba(0,0,0,0.08)',
    hero: "PIPES THAT DON'T BURST. BOOKINGS THAT DON'T STOP.",
    oldDomain: 'houstonplumbing2007.com',
    services: [
      {name:'Drain Cleaning', price:'$99-$350', note:'AI Quote'},
      {name:'Emergency Leak', price:'$150-$500', note:'24/7'},
      {name:'Water Heater', price:'$400-$1.8k', note:'Same Day'},
      {name:'Pipe Replacement', price:'$350-$2.5k', note:'Warranty'},
    ],
    chat: ["What's leaking? Kitchen drain?", "On my way - can I come in 1hr?", "Booked. Tech at 2pm."],
  },
  hvac: {
    color: '#FF6B00',
    bg: '#0a0a0a',
    text: '#fff',
    subText: 'rgba(255,255,255,0.5)',
    cardBg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.12)',
    hero: "AC THAT DOESN'T QUIT. BOOKINGS THAT DON'T STOP.",
    oldDomain: 'houstonachero2008.com',
    services: [
      {name:'AC Repair', price:'$150-$650', note:'AI Quote'},
      {name:'Heating Fix', price:'$200-$800', note:'24/7'},
      {name:'Install New Unit', price:'$2.5k-$6k', note:'Financing'},
      {name:'Duct Cleaning', price:'$199-$500', note:'Rebook'},
    ],
    chat: ["AC not cooling? What temp?", "72 but blowing warm. House 85F", "Booked. Tech at 4pm - $89 diag."],
  },
  dentists: {
    color: '#7ED7C1',
    bg: '#f8fdfb',
    text: '#0a0a0a',
    subText: 'rgba(0,0,0,0.5)',
    cardBg: '#ffffff',
    border: 'rgba(0,0,0,0.08)',
    hero: "SMILES THAT DON'T FADE. BOOKINGS THAT DON'T STOP.",
    oldDomain: 'houstondental2009.com',
    services: [
      {name:'Cleaning', price:'$99-$199', note:'AI Quote'},
      {name:'Whitening', price:'$299-$600', note:'1 Visit'},
      {name:'Implants', price:'$1.5k-$3k', note:'Consult Free'},
      {name:'Emergency Pain', price:'$75-$450', note:'Same Day'},
    ],
    chat: ["Tooth pain? Cleaning or emergency?", "Sharp pain upper molar", "Booked. Dr. Lee tomorrow 9am."],
  },
  dentist: {
    color: '#7ED7C1',
    bg: '#f8fdfb',
    text: '#0a0a0a',
    subText: 'rgba(0,0,0,0.5)',
    cardBg: '#ffffff',
    border: 'rgba(0,0,0,0.08)',
    hero: "SMILES THAT DON'T FADE. BOOKINGS THAT DON'T STOP.",
    oldDomain: 'houstondental2009.com',
    services: [
      {name:'Cleaning', price:'$99-$199', note:'AI Quote'},
      {name:'Whitening', price:'$299-$600', note:'1 Visit'},
      {name:'Implants', price:'$1.5k-$3k', note:'Consult Free'},
      {name:'Emergency Pain', price:'$75-$450', note:'Same Day'},
    ],
    chat: ["Tooth pain? Cleaning or emergency?", "Sharp pain upper molar", "Booked. Dr. Lee tomorrow 9am."],
  },
}

export default function DemoPage() {
  const params = useParams()
  const search = useSearchParams()
  const idRaw: any = params?.id
  const id = Array.isArray(idRaw) ? idRaw[0] : (idRaw || 'demo123')
  const nicheStr = String(search?.get('niche') || 'roofing').toLowerCase()
  const cityStr = String(search?.get('city') || 'houston').toLowerCase()
  const oldParam = search?.get('old') || ''
  const cfg = NICHES[nicheStr] || NICHES.roofing
  const cityUpper = cityStr.toUpperCase()
  const nicheUpper = nicheStr.toUpperCase()

  return (
    <div style={{minHeight:'100vh', background: cfg.bg, color: cfg.text}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@400;600&display=swap'); .syne{font-family:'Syne',sans-serif} .grotesk{font-family:'Space Grotesk',sans-serif}`}</style>

      <div style={{height:56, padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${cfg.border}`}}>
        <div className="syne" style={{fontWeight:800, fontSize:13, color: cfg.text}}>{cityUpper} {nicheUpper} CO. <span style={{fontWeight:400, opacity:0.5, marginLeft:8}}>EST. 2008 → REBUILT 2027</span></div>
        <div style={{fontSize:10, padding:'6px 12px', borderRadius:999, border:`1px solid ${cfg.color}`, color: cfg.color, fontWeight:700}}>VENUS AI • LIVE</div>
      </div>

      <div style={{maxWidth:1200, margin:'0 auto', padding:'32px 24px'}}>
        <h1 className="syne" style={{fontSize:'clamp(32px,6vw,68px)', fontWeight:800, lineHeight:0.9, textTransform:'uppercase', color: cfg.text, maxWidth:'14ch'}}>{cfg.hero}</h1>
        <p style={{marginTop:16, maxWidth:'52ch', fontSize:14, lineHeight:1.5, color: cfg.subText}}>
          Original site {oldParam || cfg.oldDomain} had 4 pages, Comic Sans, Yahoo email. Now: instant booking, proof, 1.1s load. Built for {cityUpper}.
        </p>

        <div style={{marginTop:24, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
          <div style={{border:`1px solid ${cfg.border}`, borderRadius:16, padding:16, background: cfg.cardBg}}>
            <div style={{fontSize:10, opacity:0.5, color: cfg.text}}>Leads / week</div>
            <div style={{fontSize:22, fontWeight:800, marginTop:4, color: cfg.text}}>27 → 84</div>
            <div style={{fontSize:11, marginTop:4, color: cfg.color}}>+211% after rebuild</div>
          </div>
          <div style={{border:`1px solid ${cfg.border}`, borderRadius:16, padding:16, background: cfg.cardBg}}>
            <div style={{fontSize:10, opacity:0.5, color: cfg.text}}>Booking rate</div>
            <div style={{fontSize:22, fontWeight:800, marginTop:4, color: cfg.text}}>11% → 38%</div>
            <div style={{fontSize:11, marginTop:4, color: cfg.color}}>AI chat + quote</div>
          </div>
          <div style={{border:`1px solid ${cfg.border}`, borderRadius:16, padding:16, background: cfg.cardBg}}>
            <div style={{fontSize:10, opacity:0.5, color: cfg.text}}>Load time</div>
            <div style={{fontSize:22, fontWeight:800, marginTop:4, color: cfg.text}}>8.4s → 1.1s</div>
            <div style={{fontSize:11, marginTop:4, color: cfg.color}}>Brutalist fast</div>
          </div>
        </div>

        <div style={{marginTop:20, borderRadius:16, background: cfg.text==='#fff' ? '#111' : '#0a0a0a', color:'#fff', padding:20, display:'flex', flexDirection:'column', gap:12}}>
          <div style={{fontSize:10, letterSpacing:'0.15em', opacity:0.5}}>BEFORE / AFTER</div>
          <div style={{display:'flex', gap:12, flexWrap:'wrap', fontSize:12, lineHeight:1.5}}>
            <span style={{textDecoration:'line-through', opacity:0.5}}>{oldParam || cfg.oldDomain} — 2008 HTML tables, no mobile, Comic Sans</span>
            <span style={{color: cfg.color}}>→</span>
            <span>Clean, brutalist, booking-first. Gold-accented CTAs. 5 AI tools inside.</span>
          </div>
        </div>

        <div style={{marginTop:32}}>
          <div style={{fontSize:10, letterSpacing:'0.15em', opacity:0.5, color: cfg.text, marginBottom:12}}>[ SERVICES — AI PRICED ]</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:12}}>
            {cfg.services.map((s:any)=>(
              <div key={s.name} style={{border:`1px solid ${cfg.border}`, borderRadius:16, padding:18, background: cfg.cardBg}}>
                <div style={{fontWeight:700, fontSize:14, color: cfg.text}}>{s.name}</div>
                <div style={{fontSize:12, marginTop:6, color: cfg.subText}}><span style={{color: cfg.color, fontWeight:700}}>{s.price}</span> • {s.note} • AI Quote</div>
                <div style={{marginTop:12, height:28, borderRadius:999, background: cfg.color, color: cfg.color==='#0EA5E9' || cfg.color==='#7ED7C1' ? '#000' : '#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700}}>Book Now →</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:32}}>
          <div style={{fontSize:10, letterSpacing:'0.15em', opacity:0.5, color: cfg.text, marginBottom:12}}>[ 5 AI TOOLS ALREADY INSIDE — {cfg.color} ]</div>
          <div style={{display:'grid', gap:1, background: cfg.border, borderRadius:16, overflow:'hidden', border:`1px solid ${cfg.border}`}}>
            {[
              {n:'01', t:'AI BOOKING CHAT', d:'Replaces form. Talks like human, books while you sleep. Conversion 8% → 34%.'},
              {n:'02', t:'AI QUOTE ESTIMATOR', d:`Instant ${cfg.services[0].price} from photos. Upload → price → book.`},
              {n:'03', t:'AI MISSED-CALL TEXT', d:'Missed call? Texts in 3s. Saves $10k/mo lost calls.'},
              {n:'04', t:'AI REVIEW ENGINE', d:'Auto asks for review, auto replies with SEO. 4.2 → 4.9 stars.'},
              {n:'05', t:'AI UPSELL & REBOOK', d:'30 days later: Gutter due? 15% off. 22% rebook rate.'},
            ].map((tool:any)=>(
              <div key={tool.n} style={{background: cfg.cardBg, padding:16, display:'flex', gap:16}}>
                <div style={{fontSize:11, color: cfg.color, fontWeight:700}}>{tool.n}</div>
                <div>
                  <div style={{fontSize:12, fontWeight:700, color: cfg.text}}>{tool.t}</div>
                  <div style={{fontSize:11, marginTop:4, color: cfg.subText, lineHeight:1.4}}>{tool.d}</div>
                </div>
                <div style={{marginLeft:'auto'}}><span style={{fontSize:9, padding:'4px 8px', borderRadius:999, background: `${cfg.color}20`, border:`1px solid ${cfg.color}40`, color: cfg.color}}>LIVE</span></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:24, display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:12}}>
          <div style={{border:`2px solid ${cfg.color}`, borderRadius:16, padding:16, background: cfg.cardBg}}>
            <div style={{fontSize:10, letterSpacing:'0.15em', opacity:0.6, color: cfg.text}}>AI BOOKING CHAT • LIVE • {String(id)}</div>
            <div style={{marginTop:12, fontFamily:'monospace', fontSize:12, lineHeight:1.6, color: cfg.text}}>
              {cfg.chat.map((c:string, i:number)=>(
                <div key={i} style={{opacity: i===0 ? 1 : 0.7}}>{i===0 ? 'Customer:' : i===cfg.chat.length-1 ? '→' : 'AI:'} {c}</div>
              ))}
              <div style={{marginTop:8, color: cfg.color, fontWeight:700}}>→ Booked. Crew at 9am. {nicheStr.includes('dentist') ? '0 deposit' : '$250 deposit'} held.</div>
            </div>
          </div>
          <div style={{border:`1px solid ${cfg.border}`, borderRadius:16, padding:16, background: cfg.text==='#fff' ? '#111' : '#0a0a0a', color:'#fff'}}>
            <div style={{fontSize:10, opacity:0.5}}>VENUS OS • LIVE</div>
            <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
              <div><div style={{fontSize:10, opacity:0.5}}>Calls Today</div><div style={{fontSize:20, fontWeight:800, marginTop:2}}>23</div><div style={{fontSize:10, color: cfg.color}}>18 AI • 5 human</div></div>
              <div><div style={{fontSize:10, opacity:0.5}}>Booked</div><div style={{fontSize:20, fontWeight:800, marginTop:2}}>8</div><div style={{fontSize:10, color: cfg.color}}>6 chat • 2 rebook</div></div>
              <div><div style={{fontSize:10, opacity:0.5}}>Revenue</div><div style={{fontSize:20, fontWeight:800, marginTop:2}}>$4.2k</div><div style={{fontSize:10, color: cfg.color}}>$18.4k week</div></div>
              <div><div style={{fontSize:10, opacity:0.5}}>Ad ROI</div><div style={{fontSize:20, fontWeight:800, marginTop:2}}>3.2x</div><div style={{fontSize:10, color: cfg.color}}>$500 → $15k</div></div>
            </div>
          </div>
        </div>

        <div style={{marginTop:24, fontSize:11, opacity:0.5, color: cfg.text}}>
          Same brutalist template • Color {cfg.color} • Niche {nicheUpper} • City {cityUpper} • ID {String(id)} • Old {oldParam || cfg.oldDomain} → Rebuilt 2027
        </div>
      </div>

      <div style={{padding:'18px 24px', display:'flex', justifyContent:'space-between', background: cfg.color, color: cfg.color==='#0EA5E9' || cfg.color==='#7ED7C1' ? '#000' : '#fff', fontWeight:800, fontSize:13}}>
        <span>Want yours? This is the system. → Upgrade $497</span>
        <span>VENUS HQ7 // {cityUpper}</span>
      </div>
    </div>
  )
}
