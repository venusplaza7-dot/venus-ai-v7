export const dynamic = 'force-dynamic';

const DATA: any = {
  roofers: { title:"ROOFERS", calc:"Roof Size + Material Calculator", benefit:"40% more roofs", emoji:"🏠", color:"#c5a059", bg:"#000", accent:"#fff" },
  plumbers: { title:"PLUMBERS", calc:"Emergency Leak + Water Heater Calculator", benefit:"8 more emergencies/week", emoji:"💧", color:"#c5a059", bg:"#000", accent:"#fff" },
  electricians: { title:"ELECTRICIANS", calc:"Panel / EV Charger Calculator", benefit:"Avg $890/job", emoji:"⚡", color:"#c5a059", bg:"#000", accent:"#fff" },
  dentists: { title:"DENTISTS", calc:"Insurance Checker + Implant Calculator", benefit:"34 new patients/mo", emoji:"🦷", color:"#00b4d8", bg:"#000", accent:"#fff", dentist:true },
  hvac: { title:"HVAC", calc:"AC Repair + Installation Cost Calculator", benefit:"15 more AC jobs/week", emoji:"❄️", color:"#c5a059", bg:"#000", accent:"#fff" },
  contractors: { title:"CONTRACTORS", calc:"Kitchen/Bath Remodel Estimator", benefit:"50% more closes", emoji:"🔨", color:"#c5a059", bg:"#000", accent:"#fff" }
};

export default function Page({params, searchParams}: any){
  const catKey = (params?.id || 'roofers').toLowerCase();
  const base = DATA[catKey] || DATA.roofers;
  const business = searchParams?.b || searchParams?.business || `${base.title} BUSINESS`;
  const domain = searchParams?.domain || `${catKey}houston.com`;
  const city = searchParams?.city || 'Houston';
  const isDentist = catKey==='dentists';

  return (
    <div style={{background:base.bg,minHeight:'100vh',fontFamily:'Arial',color:'#fff'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'20px'}}>
        <div style={{textAlign:'center',padding:'20px',borderBottom:'1px solid #222'}}>
          <h1 style={{color:'#c5a059',letterSpacing:'5px',margin:0}}>VENUS HQ7</h1>
          <p style={{color:'#666',fontSize:'10px',letterSpacing:'2px'}}>PERSONALIZED FOR {business.toUpperCase()} — {city}</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'30px',marginTop:'30px'}}>

          {/* PREVIEW WITH HIS NAME */}
          <div style={{background:'#fff',borderRadius:'16px',overflow:'hidden',border:`2px solid ${isDentist?'#00b4d8':'#c5a059'}`}}>
            <div style={{background:'#111',padding:'10px 15px',color:'#666',fontSize:'11px'}}>{domain} • AI Website Ready For {business}</div>
            <div style={{padding:'25px',color:'#000',background:'#fff'}}>
              <h2 style={{margin:0,color:'#000'}}>{business}</h2>
              <p style={{margin:'5px 0',color:'#555',fontSize:'12px'}}>{city} {base.title} • ⭐ 4.9 (287) • AI Answers in 2s</p>
              <h1 style={{fontSize:'20px',margin:'15px 0'}}>{isDentist? `Need Implant? Check Insurance in 20s - ${business}` : `Get ${base.title} Fixed Today - ${city} 24H Emergency - ${business}`}</h1>
              <div style={{background:'#000',color:'#fff',padding:'15px',borderRadius:'8px',border:`1px solid ${base.color}`}}>
                <p style={{color:base.color,fontWeight:'bold',margin:'0 0 8px'}}>{base.calc} — Built for {business}</p>
                <p style={{color:'#aaa',fontSize:'12px',margin:'0 0 12px'}}>Enter details → Get instant price for {business} → Book now</p>
                <div style={{background:'#fff',color:'#000',padding:'10px',textAlign:'center',fontWeight:'bold',borderRadius:'6px'}}>Get Instant Price from {business} →</div>
              </div>
              <p style={{fontSize:'11px',color:'#888',marginTop:'15px'}}>This preview is personalized — tools built-in for {business} in {city}. Not template.</p>
            </div>
          </div>

          {/* WHAT HE GETS - 5 TOOLS */}
          <div>
            <h2 style={{fontSize:'26px',margin:'0 0 10px'}}>{business} — Your 5 AI Tools Inside Website</h2>
            <p style={{color:'#888',fontSize:'13px',marginBottom:'20px'}}>Mr/Ms Owner of {business}, here's what you get built into {domain}:</p>

            <div style={{background:'#0a0a0a',borderLeft:'4px solid #c5a059',padding:'15px',marginBottom:'12px',borderRadius:'6px'}}>
              <b style={{color:'#c5a059'}}>1. AI RECEPTIONIST FOR {business}</b><br/>
              <span style={{color:'#fff',fontSize:'12px'}}>HOW: Answers calls for {business} in 2s, books in your calendar.</span><br/>
              <span style={{color:'#aaa',fontSize:'12px'}}>HELP: Save $3k/mo receptionist. Get 30% more {city} jobs after-hours.</span>
            </div>

            <div style={{background:'#111',borderLeft:'4px solid #fff',padding:'15px',marginBottom:'12px',borderRadius:'6px'}}>
              <b style={{color:'#fff'}}>2. AI WEBSITE + {base.calc}</b><br/>
              <span style={{color:'#fff',fontSize:'12px'}}>HOW: Customer enters job details → Gets price from {business} instantly → Books.</span><br/>
              <span style={{color:'#aaa',fontSize:'12px'}}>HELP: 4x more bookings vs old site. {base.benefit} for {business}.</span>
            </div>

            <div style={{background:'#0a0a0a',borderLeft:'4px solid #c5a059',padding:'15px',marginBottom:'12px',borderRadius:'6px'}}>
              <b style={{color:'#c5a059'}}>3. AI REVIEW ENGINE FOR {business}</b><br/>
              <span style={{color:'#fff',fontSize:'12px'}}>HOW: After job, AI texts YOUR customer: Leave 5-star for {business}.</span><br/>
              <span style={{color:'#aaa',fontSize:'12px'}}>HELP: {business} goes Top 3 Google "{base.title} {city}" in 30 days.</span>
            </div>

            <div style={{background:'#111',borderLeft:'4px solid #fff',padding:'15px',marginBottom:'12px',borderRadius:'6px'}}>
              <b style={{color:'#fff'}}>4. AI ADS + FOLLOW-UP FOR {business}</b><br/>
              <span style={{color:'#fff',fontSize:'12px'}}>HOW: Runs ads for "{business} {city}" + follows up 7x until booked.</span><br/>
              <span style={{color:'#aaa',fontSize:'12px'}}>HELP: $500 ad → 10-15 booked jobs for {business}, not clicks.</span>
            </div>

            <div style={{background:'#0a0a0a',borderLeft:'4px solid #c5a059',padding:'15px',marginBottom:'12px',borderRadius:'6px'}}>
              <b style={{color:'#c5a059'}}>5. VENUS OS DASHBOARD FOR {business}</b><br/>
              <span style={{color:'#fff',fontSize:'12px'}}>HOW: See calls, jobs, revenue for {business} live.</span><br/>
              <span style={{color:'#aaa',fontSize:'12px'}}>HELP: Know AI made {business} $12k extra this week.</span>
            </div>

            <div style={{textAlign:'center',marginTop:'25px',padding:'25px',border:'1px solid #c5a059',borderRadius:'12px',background:'#000'}}>
              <p style={{margin:0,color:'#fff'}}>{business} — Gen-Z Luxury Website Ready</p>
              <p style={{color:'#c5a059',fontSize:'24px',fontWeight:'bold'}}>$497 <span style={{color:'#555',fontSize:'14px',textDecoration:'line-through'}}>$1999</span></p>
              <a href={`https://wa.me/17865841234?text=I'm ${business} - I want my personalized ${base.title} AI website - ${domain}`} style={{background:'#c5a059',color:'#000',padding:'14px 30px',display:'inline-block',textDecoration:'none',fontWeight:'bold',borderRadius:'6px'}}>ACTIVATE {business.toUpperCase()} WEBSITE →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
