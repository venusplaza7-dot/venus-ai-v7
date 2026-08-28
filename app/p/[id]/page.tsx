export const dynamic = 'force-dynamic';

const DATA: any = {
  roofers: { title:"ROOFERS", emoji:"🏠", calc:"Roof Size + Material Calculator", pain:"You lose $8k job at 10pm on roof", benefit:"12 more roofs/mo = +$60k" },
  plumbers: { title:"PLUMBERS", emoji:"💧", calc:"Emergency Leak + Heater Calculator", pain:"You miss $1200 2am burst", benefit:"8 more emergencies/week" },
  hvac: { title:"HVAC", emoji:"❄️", calc:"AC Repair + Install Calculator", pain:"Slow quote, fast guy wins", benefit:"15 more AC jobs/week" },
  dentists: { title:"DENTISTS", emoji:"🦷", calc:"Insurance Checker + Implant Calculator", pain:"Front desk busy 10min, patient books elsewhere", benefit:"34 new patients/mo" },
  electricians: { title:"ELECTRICIANS", emoji:"⚡", calc:"Panel / EV / Outlet Calculator", pain:"Miss $150 call doing $3000 panel", benefit:"Avg $890/job booked" },
  contractors: { title:"CONTRACTORS", emoji:"🔨", calc:"Kitchen / Bath Remodel Estimator", pain:"3 days to quote, lose job", benefit:"50% more closes" }
};

export default function Page({ params, searchParams }: any){
  const catKey = (params?.id || searchParams?.cat || 'roofers').toLowerCase();
  const d = DATA[catKey] || DATA.roofers;
  const business = searchParams?.b || searchParams?.business || `${d.title} Houston`;
  const domain = searchParams?.domain || `${catKey}houston.com`;
  const city = searchParams?.city || 'Houston';
  const isDentist = catKey==='dentists';

  return (
    <div style={{background:'#000',minHeight:'100vh',fontFamily:'Inter,Arial',color:'#fff'}}>
      <div style={{textAlign:'center',padding:'20px',borderBottom:'1px solid #222'}}>
        <h1 style={{color:'#c5a059',letterSpacing:'5px',margin:0}}>VENUS HQ7</h1>
        <p style={{color:'#666',fontSize:'10px',letterSpacing:'3px'}}>PERSONALIZED FOR {business.toUpperCase()} — {city} — GEN-Z LUXURY BLACK/WHITE/GOLD</p>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'30px 20px'}}>
        <div style={{background:'#fff',borderRadius:'16px',overflow:'hidden',border:`3px solid ${isDentist?'#00b4d8':'#c5a059'}`,boxShadow:'0 0 40px rgba(197,160,89,0.3)'}}>
          <div style={{background:'#111',padding:'12px 16px',color:'#666',fontSize:'11px',display:'flex',gap:'8px',alignItems:'center'}}>
            <div style={{width:10,height:10,borderRadius:'50%',background:'#ff5f56'}}/><div style={{width:10,height:10,borderRadius:'50%',background:'#ffbd2e'}}/><div style={{width:10,height:10,borderRadius:'50%',background:'#27c93f'}}/>
            <span style={{marginLeft:10}}>{domain} • AI Website Ready For {business} • {city}</span>
          </div>
          <div style={{padding:'25px',background:'#fff',color:'#000'}}>
            <h2 style={{margin:0,color:'#000',fontSize:'22px'}}>{business} {d.emoji}</h2>
            <p style={{margin:'5px 0',color:'#666',fontSize:'12px'}}>{city} {d.title} • ⭐ 4.9 Google (287 reviews) • AI Answers in 2s</p>
            <h1 style={{fontSize:'20px',margin:'15px 0',lineHeight:'26px',color:'#111'}}>{isDentist?`Need Implant? Check Insurance in 20s - ${business}`:`Get Your ${d.title} Fixed Today - 24H Emergency - ${business} ${city}`}</h1>
            <div style={{background:'#000',color:'#fff',padding:'16px',borderRadius:'10px',border:`1px solid ${isDentist?'#00b4d8':'#c5a059'}`}}>
              <p style={{color:isDentist?'#00b4d8':'#c5a059',fontWeight:'bold',margin:'0 0 8px',fontSize:'13px'}}>{d.calc} — Built For {business}</p>
              <p style={{color:'#aaa',fontSize:'12px',margin:'0 0 12px'}}>Customer enters details → Gets instant price from {business} → Books now. No waiting.</p>
              <div style={{background:'#fff',color:'#000',padding:'12px',borderRadius:'6px',fontWeight:'bold',textAlign:'center'}}>Get Instant Price From {business} →</div>
            </div>
          </div>
        </div>

        <h2 style={{margin:'35px 0 10px',fontSize:'28px'}}>{business} — Your 5 AI Tools Built Inside {domain}</h2>
        <p style={{color:'#888',fontSize:'13px',marginBottom:'20px'}}>Pain: {d.pain}. Here's how Gen-Z AI saves & scales {business}.</p>

        {[
          {t:`1. AI RECEPTIONIST 24/7 FOR ${business}`,h:`AI picks every call for ${business} in 2 sec, speaks English/Spanish, asks 3 qualifying questions, checks your calendar live, books job, sends SMS. Calls back 3x if no answer.`,s:`Save $3k/mo receptionist. Grasp 30% more ${city} after-hours jobs. ${business} +12 jobs/mo = +$60k revenue.`},
          {t:`2. AI WEBSITE + ${d.calc}`,h:`Not brochure. Customer enters sq ft/issue → AI calculates price using ${business} past jobs → Shows your before/after → Offers financing → 1-click book. Black/white/gold luxury like Rolex.`,s:`Save $5k designer. Grasp: Old site 2% converts. Ours 8-12% because instant price = trust. 4x more booked estimates for ${business}.`},
          {t:`3. AI REVIEW & GOOGLE TOP 3 FOR ${business}`,h:`After job, AI texts YOUR customer: "Happy? Leave 5-star for ${business}". If 5-star → posts to Google with photo. If 1-4 → alerts you privately. Replies to ALL reviews in 5 min human tone.`,s:`Save $500/mo reputation. Grasp: ${business} goes Top 3 Google "${d.title} ${city}" in 30 days with 20 new reviews. Free organic calls.`},
          {t:`4. AI ADS + 7x FOLLOW-UP FOR ${business}`,h:`We run Google Ads "${business} ${city} ${d.title}" → Luxury landing page above → AI follows up lead 7 times via SMS/email/voicemail over 7 days until booked or STOP. Tracks which ad made $$$.`,s:`Save $2k ad agency. Grasp: $500 ad → 50 clicks. Old: 2 bookings. With 7x AI: 10-15 bookings for ${business}. $500 → $15k revenue.`},
          {t:`5. VENUS OS — LUXURY DASHBOARD FOR ${business}`,h:`One black dashboard: Live calls answered by AI for ${business}, jobs booked today, revenue this week, new reviews, ad spend vs return, missed calls saved.`,s:`Save guessing. Grasp: See "AI made ${business} $12,450 extra this week, saved 17 missed calls, 9 reviews". Know what works.`},
        ].map((x,i)=>(
          <div key={i} style={{background:i%2===0?'#0a0a0a':'#111',border:'1px solid #222',borderLeft:`4px solid ${i%2===0?'#c5a059':'#fff'}`,padding:'18px',borderRadius:'8px',marginBottom:'14px'}}>
            <b style={{color:i%2===0?'#c5a059':'#fff',fontSize:'13px'}}>{x.t}</b><br/>
            <span style={{color:'#fff',fontSize:'12px',display:'block',marginTop:'8px'}}><b style={{color:'#c5a059'}}>HOW IT WORKS:</b> {x.h}</span>
            <span style={{color:'#aaa',fontSize:'12px',display:'block',marginTop:'6px'}}><b style={{color:'#fff'}}>HOW IT HELPS SAVE & GET BUSINESS:</b> {x.s}</span>
          </div>
        ))}

        <div style={{textAlign:'center',marginTop:'30px',padding:'28px',background:'linear-gradient(135deg,#000,#1a1a1a)',border:'1px solid #c5a059',borderRadius:'12px'}}>
          <p style={{color:'#fff',fontSize:'18px',margin:0}}>{business} — Gen-Z Website Ready in 48Hrs</p>
          <p style={{color:'#c5a059',fontSize:'28px',fontWeight:'bold',margin:'10px 0'}}>$497 <span style={{color:'#555',fontSize:'14px',textDecoration:'line-through'}}>$1999</span></p>
          <a href={`https://wa.me/17865841234?text=I'm ${business} — activate my AI website ${domain}`} style={{background:'#c5a059',color:'#000',padding:'14px 34px',display:'inline-block',textDecoration:'none',fontWeight:'bold',borderRadius:'6px'}}>ACTIVATE {business.toUpperCase()} →</a>
          <p style={{color:'#666',fontSize:'10px',marginTop:'10px'}}>5 spots for {d.title} {city} only — Includes all 5 AI tools</p>
        </div>
      </div>
    </div>
  );
}
