export const dynamic = 'force-dynamic';

const DATA: any = {
  roofers: { title:"ROOFERS", emoji:"🏠", calc:"Roof Size + Material Calculator", benefit:"12 more roofs/mo", works:["Elite Roofing Houston: 3→17 roofs/mo in 22 days","Quick Roof Austin: $8k→$47k/mo"] },
  plumbers: { title:"PLUMBERS", emoji:"💧", calc:"Emergency Leak + Heater Calculator", benefit:"8 more emergencies/week", works:["Pro Plumbing: 40% more 2am calls","FastFlow Dallas: 4.9 Google in 30 days"] },
  hvac: { title:"HVAC", emoji:"❄️", calc:"AC Repair + Install Calculator", benefit:"15 more AC jobs/week", works:["Arctic Air: $12k→$39k/week","CoolTech: 17 missed calls saved daily"] },
  dentists: { title:"DENTISTS", emoji:"🦷", calc:"Insurance Checker + Implant Calculator", benefit:"34 new patients/mo", works:["Bright Smile: 12→48 patients/mo","Elite Dental: $3k front desk saved"] },
  electricians: { title:"ELECTRICIANS", emoji:"⚡", calc:"Panel / EV / Outlet Calculator", benefit:"Avg $890/job", works:["Texas Power: $340→$890 avg","VoltPro: 11pm panel booked auto"] },
  contractors: { title:"CONTRACTORS", emoji:"🔨", calc:"Kitchen / Bath Estimator", benefit:"50% more closes", works:["Prime Build: 3 days→8 min quote"] }
};

export default function Page({ params, searchParams }: any){
  const catKey = (params?.id || 'roofers').toLowerCase();
  const d = DATA[catKey] || DATA.roofers;
  const business = searchParams?.b || `${d.title} Business`;
  const domain = searchParams?.domain || `${catKey}houston.com`;
  const city = searchParams?.city || 'Houston';
  const WHATSAPP = "17865880578"; // YOUR REAL NUMBER +1 (786) 588-0578

  return (
    <div style={{background:'#000',minHeight:'100vh',fontFamily:'Arial',color:'#fff'}}>
      <div style={{textAlign:'center',padding:'18px',borderBottom:'1px solid #222'}}>
        <h1 style={{color:'#c5a059',letterSpacing:'5px',margin:0}}>VENUS HQ7</h1>
        <p style={{color:'#666',fontSize:'10px',letterSpacing:'2px'}}>PERSONALIZED FOR {business.toUpperCase()} • {city} • GEN-Z BLACK WHITE GOLD</p>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'18px'}}>

        {/* INTRO RESTORED */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'12px'}}>
          <div style={{background:'#0a0a0a',border:'1px solid #c5a059',borderRadius:'10px',padding:'16px'}}>
            <b style={{color:'#c5a059',fontSize:'11px',letterSpacing:'2px'}}>WHO WE ARE</b>
            <p style={{fontSize:'12px',lineHeight:'17px',marginTop:'8px',color:'#fff'}}>Venus HQ7 — Gen-Z luxury AI agency. We build Rolex-level black/white/gold AI websites, not brochures. We are IT Corp Inc, 2016 Blake Street, California. We work 24 hours — Open now.</p>
          </div>
          <div style={{background:'#111',border:'1px solid #333',borderRadius:'10px',padding:'16px'}}>
            <b style={{color:'#fff',fontSize:'11px',letterSpacing:'2px'}}>WHAT WE DO</b>
            <p style={{fontSize:'12px',lineHeight:'17px',marginTop:'8px',color:'#aaa'}}>We replace receptionist ($3k), designer ($5k), ads guy ($2k), reputation guy ($500) with 5 AI tools that answer in 2 sec, calculate price, book jobs, get Top 3 Google, follow-up 7x.</p>
          </div>
          <div style={{background:'#0a0a0a',border:'1px solid #c5a059',borderRadius:'10px',padding:'16px'}}>
            <b style={{color:'#c5a059',fontSize:'11px',letterSpacing:'2px'}}>HOW WE HELP {d.title} IN {city}</b>
            <p style={{fontSize:'12px',marginTop:'8px',color:'#fff'}}>Others like you in same category:<br/>
            {d.works.map((w:string,i:number)=><span key={i} style={{display:'block',color:'#aaa',marginTop:'4px'}}>• {w}</span>)}
            <br/><span style={{color:'#c5a059'}}>For {business}: {d.benefit} = more business</span></p>
          </div>
        </div>

        {/* PREVIEW */}
        <div style={{background:'#fff',borderRadius:'14px',overflow:'hidden',border:'3px solid #c5a059',marginTop:'18px'}}>
          <div style={{background:'#111',padding:'10px',color:'#666',fontSize:'11px'}}>{domain} • Ready for {business} • {city} {d.title}</div>
          <div style={{padding:'18px',color:'#000'}}>
            <h2 style={{margin:0}}>{business} {d.emoji}</h2>
            <p style={{color:'#666',fontSize:'11px'}}>⭐ 4.9 Google (287) • AI 2s • {city}</p>
            <h1 style={{fontSize:'18px'}}>Get Instant Price — 24H Emergency — {d.calc} — {business}</h1>
            <div style={{background:'#000',color:'#fff',padding:'12px',borderRadius:'8px',border:'1px solid #c5a059'}}>
              <b style={{color:'#c5a059',fontSize:'12px'}}>{d.calc} for {business}</b>
              <p style={{color:'#aaa',fontSize:'11px'}}>Enter details → Price → Book {business}</p>
              <div style={{background:'#fff',color:'#000',padding:'8px',textAlign:'center',fontWeight:'bold',borderRadius:'5px',fontSize:'12px'}}>Get Price From {business} →</div>
            </div>
          </div>
        </div>

        {/* 5 TOOLS */}
        <h2 style={{marginTop:'22px'}}>{business} — 5 AI Tools Inside {domain}</h2>

        {/* WHATSAPP BUTTON WITH ICON */}
        <div style={{textAlign:'center',marginTop:'26px',padding:'24px',border:'1px solid #c5a059',borderRadius:'12px',background:'#111'}}>
          <p style={{margin:0}}>{business} — AI Website Ready 48Hrs</p>
          <p style={{color:'#c5a059',fontSize:'26px',fontWeight:'bold'}}>$497 <span style={{color:'#555',fontSize:'13px',textDecoration:'line-through'}}>$1999</span></p>
          <a href={`https://wa.me/${WHATSAPP}?text=Hi%20Ron%2C%20I%27m%20${encodeURIComponent(business)}%20${city}%20${catKey}%20-%20activate%20my%20AI%20website%20${encodeURIComponent(domain)}`}
            style={{background:'#25D366',color:'#fff',padding:'14px 28px',display:'inline-flex',alignItems:'center',gap:'10px',textDecoration:'none',fontWeight:'bold',borderRadius:'8px'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19.11 17.2c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.13.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.06-.11-.24-.16-.51-.3zM12.03 21.9a9.9 9.9 0 01-5.05-1.38l-.36-.22-3.74.98.99-3.65-.24-.38A9.85 9.85 0 012.1 12.03C2.1 6.56 6.56 2.1 12.03 2.1c2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 012.9 7.01c0 5.47-4.46 9.93-9.91 9.89z"/></svg>
            ACTIVATE ON WHATSAPP — {business.toUpperCase()}
          </a>
          <p style={{color:'#666',fontSize:'10px',marginTop:'8px'}}>+1 (786) 588-0578 • IT Corp Inc • 2016 Blake Street • 24H Open</p>
        </div>
      </div>
    </div>
  );
}
