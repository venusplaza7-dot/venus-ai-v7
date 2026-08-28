export const dynamic = 'force-dynamic';

const DATA:any={
  roofers:{title:"ROOFERS",emoji:"🏠",calc:"Roof Size Calculator",profit:"12 more roofs/mo = +$60k"},
  plumbers:{title:"PLUMBERS",emoji:"💧",calc:"Emergency Calculator",profit:"8 more jobs/week = +$28k"},
  hvac:{title:"HVAC",emoji:"❄️",calc:"AC Calculator",profit:"15 more jobs/week"},
  dentists:{title:"DENTISTS",emoji:"🦷",calc:"Insurance Checker",profit:"34 new patients/mo"},
  electricians:{title:"ELECTRICIANS",emoji:"⚡",calc:"Panel Calculator",profit:"Avg $890/job"},
};

export default function Page({params,searchParams}:any){
  const cat=(params?.id||'roofers').toLowerCase();
  const d=DATA[cat]||DATA.roofers;
  const business=searchParams?.b||"Your Business";
  const domain=searchParams?.domain||`${cat}houston.com`;
  const city=searchParams?.city||"Houston";
  const WHATSAPP="17865880578";

  return(
    <div style={{background:'#000',color:'#fff',minHeight:'100vh',fontFamily:'system-ui',WebkitFontSmoothing:'antialiased'}}>
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'0'}}>

        {/* SHARP HEADER */}
        <div style={{padding:'20px',textAlign:'center',borderBottom:'1px solid #222'}}>
          <h1 style={{color:'#c5a059',letterSpacing:'6px',margin:0,fontSize:'22px'}}>VENUS HQ7</h1>
          <p style={{color:'#888',fontSize:'11px',marginTop:'6px'}}>LUXURY AI PREVIEW FOR {business.toUpperCase()} • {domain}</p>
        </div>

        {/* THEIR WEBSITE PREVIEW — CLEAN WHITE */}
        <div style={{margin:'20px',background:'#fff',borderRadius:'16px',overflow:'hidden',border:'2px solid #c5a059'}}>
          <div style={{background:'#111',color:'#888',padding:'12px 16px',fontSize:'12px'}}>{domain} • AI UPGRADED • {city} • LIVE</div>
          <div style={{padding:'24px',color:'#000'}}>
            <h1 style={{fontSize:'26px',lineHeight:'30px',margin:0,color:'#111',fontWeight:'800'}}>{business} {d.emoji}<br/>Get Instant {d.title} Price in {city}</h1>
            <p style={{color:'#666',fontSize:'13px',marginTop:'8px'}}>⭐ 4.9 (287) • AI Answers 2s • 24H • {domain}</p>
            <div style={{marginTop:'18px',background:'#000',borderRadius:'10px',padding:'16px'}}>
              <p style={{color:'#c5a059',fontWeight:'bold',margin:0}}>{d.calc} — Built For {business}</p>
              <p style={{color:'#aaa',fontSize:'13px',margin:'8px 0'}}>Enter job → Instant price from {business} → Book now</p>
              <div style={{background:'#fff',color:'#000',textAlign:'center',padding:'12px',borderRadius:'8px',fontWeight:'bold'}}>Get Price From {business} →</div>
            </div>
          </div>
        </div>

        {/* 5 TOOLS — NO DUPLICATE — SHARP */}
        <div style={{padding:'0 20px'}}>
          <h2 style={{fontSize:'22px',margin:'10px 0'}}>{business} — 5 AI Tools On {domain} That Increase Profit:</h2>

          {[
            {t:`1. AI RECEPTIONIST 24/7`,d:`Answers every call for ${business} in 2s, books calendar, SMS, 3x callback. Saves $3k/mo. +30% after-hours jobs = ${d.profit}.`},
            {t:`2. AI WEBSITE + ${d.calc}`,d:`Customer gets instant price from ${business} → Books in 45s. Old site 2% converts, ours 8-12%. 4x more leads for ${business}.`},
            {t:`3. AI REVIEW — TOP 3 GOOGLE`,d:`Gets 20+ 5-star/mo for ${business}, auto replies. Top 3 Google "${d.title} ${city}" = free $10k/mo calls.`},
            {t:`4. AI ADS + 7x FOLLOW-UP`,d:`$500 ads → 50 clicks. Old 2 bookings. AI follows 7x → 10-15 bookings for ${business}. $500 → $15k revenue.`},
            {t:`5. VENUS OS DASHBOARD`,d:`Live: calls answered, jobs booked, revenue, reviews, ad ROI for ${business}. See extra $12k/week made.`},
          ].map((x,i)=>(
            <div key={i} style={{background:'#111',border:'1px solid #222',borderLeft:`4px solid ${i%2?'#fff':'#c5a059'}`,padding:'16px',borderRadius:'10px',marginBottom:'12px'}}>
              <b style={{color:i%2?'#fff':'#c5a059',fontSize:'14px'}}>{x.t} FOR {business.toUpperCase()}</b>
              <p style={{color:'#ccc',fontSize:'13px',lineHeight:'19px',marginTop:'8px'}}>{x.d}</p>
            </div>
          ))}

          {/* CONVINCE UPGRADE */}
          <div style={{background:'#111',border:'2px solid #c5a059',borderRadius:'14px',padding:'22px',textAlign:'center',marginTop:'20px'}}>
            <h2 style={{margin:0}}>Upgrade {domain} Now Or Lose To AI Competitor</h2>
            <p style={{color:'#888',fontSize:'12px',marginTop:'6px'}}>5 spots per {d.title} in {city}. Competitor booked yesterday.</p>
            <p style={{color:'#c5a059',fontSize:'32px',fontWeight:'800',margin:'14px 0'}}>$497 <span style={{color:'#555',fontSize:'14px',textDecoration:'line-through'}}>$1999</span></p>
            <a href={`https://wa.me/${WHATSAPP}?text=Hi Ron, I'm ${encodeURIComponent(business)} - upgrade ${encodeURIComponent(domain)}`} style={{background:'#25D366',color:'#fff',padding:'15px 28px',borderRadius:'10px',display:'inline-flex',gap:'10px',alignItems:'center',textDecoration:'none',fontWeight:'bold',fontSize:'15px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19.11 17.2c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.13.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.06-.11-.24-.16-.51-.3zM12.03 21.9a9.9 9.9 0 01-5.05-1.38l-.36-.22-3.74.98.99-3.65-.24-.38A9.85 9.85 0 012.1 12.03C2.1 6.56 6.56 2.1 12.03 2.1c2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 012.9 7.01c0 5.47-4.46 9.93-9.91 9.89z"/></svg>
              WHATSAPP +1 (786) 588-0578
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
