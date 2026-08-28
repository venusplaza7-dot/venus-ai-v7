export const dynamic = 'force-dynamic';
const CATEGORIES: any = {
  roofers: { title:"ROOFERS", pain:"homeowner calls 3 roofers 10pm, you miss, lose $8k", calc:"Roof Size + Material + Storm Damage Calculator", benefit:"Instant price in 10s, books inspection, 40% more closes" },
  plumbers: { title:"PLUMBERS", pain:"2am pipe burst, you sleep, lose $1200", calc:"Emergency Leak + Water Heater Calculator + 2AM Dispatch", benefit:"AI books 2am emergency, you wake up paid" },
  electricians: { title:"ELECTRICIANS", pain:"miss $150 outlet call doing panel, lose $3000 job", calc:"Outlet / Panel / EV Charger Calculator", benefit:"AI qualifies $150 vs $3000, books right" },
  dentists: { title:"DENTISTS", pain:"front desk busy 10min, patient books elsewhere", calc:"Insurance Checker + Crown/Implant Calculator", benefit:"Patient checks insurance 20s, books online" },
  contractors: { title:"CONTRACTORS", pain:"3 days to quote kitchen, fast guy wins", calc:"Kitchen/Bath Remodel Estimator + Financing", benefit:"Ballpark 30s, books estimate, you win" }
};

export default function Page({params}:{params:{cat:string}}){
  const c = CATEGORIES[params.cat] || CATEGORIES.roofers;
  return (
  <div style={{background:'#000',minHeight:'100vh',padding:'40px 20px',fontFamily:'Arial'}}>
  <div style={{maxWidth:'900px',margin:'0 auto'}}>
  <h1 style={{color:'#c5a059',textAlign:'center',fontSize:'42px',letterSpacing:'4px',margin:0}}>VENUS HQ7</h1>
  <p style={{color:'#fff',textAlign:'center',letterSpacing:'3px',fontSize:'12px',marginTop:'10px'}}>AI WEBSITE FOR {c.title} - SELLS NOT SHOWS</p>
  <p style={{color:'#aaa',textAlign:'center',marginTop:'20px'}}>You're losing jobs because {c.pain}</p>

  <div style={{marginTop:'40px',border:'1px solid #c5a059',borderRadius:'12px',overflow:'hidden',background:'#0a0a0a'}}>
  <div style={{padding:'30px'}}><h2 style={{color:'#c5a059',margin:'0 0 10px'}}>1. AI RECEPTIONIST 24/7</h2><p style={{color:'#e0e0e0',lineHeight:'22px'}}>Answers 2s, books job, SMS confirm, callbacks 3x. Never lose ${c.title} emergency.</p></div>
  <div style={{padding:'30px',background:'#111',borderTop:'1px solid #222'}}><h2 style={{color:'#c5a059',margin:'0 0 10px'}}>2. AI WEBSITE + {c.calc}</h2><p style={{color:'#e0e0e0',lineHeight:'22px'}}>{c.benefit}. Luxury black/gold mobile design like Rolex for {c.title}.</p></div>
  <div style={{padding:'30px',borderTop:'1px solid #222'}}><h2 style={{color:'#c5a059',margin:'0 0 10px'}}>3. AI REVIEW & TOP 3 GOOGLE</h2><p style={{color:'#e0e0e0',lineHeight:'22px'}}>Auto asks for 5-star, posts to Google, replies with AI. Top 3 for "{c.title} near me" in 30 days.</p></div>
  <div style={{padding:'30px',background:'#111',borderTop:'1px solid #222'}}><h2 style={{color:'#c5a059',margin:'0 0 10px'}}>4. AI ADS + 7x FOLLOW-UP</h2><p style={{color:'#e0e0e0',lineHeight:'22px'}}>Runs Google Ads "{c.title} Houston", follows up 7x SMS/email/voicemail until booked.</p></div>
  <div style={{padding:'30px',borderTop:'1px solid #222'}}><h2 style={{color:'#c5a059',margin:'0 0 10px'}}>5. VENUS OS DASHBOARD</h2><p style={{color:'#e0e0e0',lineHeight:'22px'}}>Calls, jobs, revenue, reviews, ROI - see $12k extra/week from AI.</p></div>
  </div>

  <div style={{textAlign:'center',marginTop:'40px'}}>
  <a href="/contact" style={{background:'#c5a059',color:'#000',padding:'16px 40px',textDecoration:'none',fontWeight:'bold',borderRadius:'4px',display:'inline-block'}}>GET AI WEBSITE FOR {c.title} - $497</a>
  </div>
  </div>
  </div>
  );
}
