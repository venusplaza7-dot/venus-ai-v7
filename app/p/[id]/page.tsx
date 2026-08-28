export const dynamic = 'force-dynamic';

const DATA: any = {
  roofers: {
    title:"ROOFERS", emoji:"🏠", pain:"You lose $8k roof job at 10pm because you were on a roof",
    siteName:"HOUSTON ELITE ROOFING", headline:"Get Your Roof Fixed Today - $0 Down, 24H Emergency",
    calcTitle:"Roof Size Calculator", calcDesc:"Enter sq ft → Get instant price range for Shingle/Metal/Flat",
    color:"#c5a059"
  },
  plumbers: {
    title:"PLUMBERS", emoji:"💧", pain:"You lose $1200 2am pipe burst because you slept",
    siteName:"24/7 PRO PLUMBING HOUSTON", headline:"Pipe Burst? We Are There in 45 Min - 2AM Service",
    calcTitle:"Emergency Cost Calculator", calcDesc:"Leak / Water Heater / Drain → Instant dispatch price",
    color:"#c5a059"
  },
  electricians: {
    title:"ELECTRICIANS", emoji:"⚡", pain:"You miss $150 outlet call doing $3000 panel, lose big",
    siteName:"TEXAS POWER ELECTRIC", headline:"Same Day Electrician - Outlet $99, Panel $1499, EV $599",
    calcTitle:"Panel / Outlet / EV Charger Calculator", calcDesc:"Choose job → Get instant quote + same-day slot",
    color:"#c5a059"
  },
  dentists: {
    title:"DENTISTS", emoji:"🦷", pain:"Front desk busy 10min, patient books elsewhere",
    siteName:"BRIGHT SMILE DENTAL", headline:"Crown $899 With Insurance? Check in 20 Seconds - Book Now",
    calcTitle:"Insurance + Crown/Implant Calculator", calcDesc:"Enter insurance → See $0 copay → Book instantly",
    color:"#c5a059"
  },
  contractors: {
    title:"CONTRACTORS", emoji:"🔨", pain:"3 days to quote kitchen, fast guy wins",
    siteName:"PRIME REMODEL HOUSTON", headline:"Kitchen Remodel $12k-$25k - See Price in 30 Sec, Book Estimate",
    calcTitle:"Kitchen / Bath Remodel Estimator", calcDesc:"Select size + style → Instant ballpark + financing",
    color:"#c5a059"
  }
};

export default function DemoPage({ params, searchParams }: any){
  const catKey = (params?.id || searchParams?.cat || 'roofers').toLowerCase();
  const d = DATA[catKey] || DATA.roofers;
  const domain = searchParams?.domain || `${catKey}houston.com`;

  return (
    <div style={{background:'#000',minHeight:'100vh',fontFamily:'Inter, Arial',color:'#fff'}}>

      {/* HEADER */}
      <div style={{borderBottom:'1px solid #222',padding:'20px',textAlign:'center',background:'#000'}}>
        <h1 style={{color:'#c5a059',margin:0,letterSpacing:'5px',fontSize:'24px'}}>VENUS HQ7</h1>
        <p style={{color:'#666',fontSize:'10px',letterSpacing:'3px',marginTop:'6px'}}>GEN-Z LUXURY AI WEBSITE FOR {d.title} — BLACK / WHITE / GOLD</p>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'30px 20px',display:'grid',gridTemplateColumns:'1fr',gap:'40px'}}>

        {/* LEFT - WEBSITE PREVIEW MOCK */}
        <div>
          <p style={{color:'#c5a059',fontSize:'12px',letterSpacing:'2px',marginBottom:'15px'}}>✦ LIVE PREVIEW - WHAT YOUR CUSTOMER SEES</p>
          <div style={{background:'#fff',borderRadius:'16px',overflow:'hidden',border:'2px solid #c5a059',boxShadow:'0 0 40px rgba(197,160,89,0.3)'}}>
            {/* Browser bar */}
            <div style={{background:'#111',padding:'10px 15px',display:'flex',gap:'8px',alignItems:'center'}}>
              <div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#ff5f56'}}/><div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#ffbd2e'}}/><div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#27c93f'}}/>
              <span style={{color:'#666',fontSize:'11px',marginLeft:'15px'}}>{domain} • AI Powered</span>
            </div>
            {/* Site content */}
            <div style={{padding:'25px',background:'#fff',color:'#000'}}>
              <h2 style={{margin:'0 0 10px',fontSize:'22px',color:'#000'}}>{d.siteName}</h2>
              <h1 style={{margin:'0 0 15px',fontSize:'18px',lineHeight:'24px',color:'#111'}}>{d.headline}</h1>
              <div style={{background:'#000',color:'#fff',padding:'15px',borderRadius:'8px',border:'1px solid #c5a059'}}>
                <p style={{margin:'0 0 8px',color:'#c5a059',fontWeight:'bold',fontSize:'13px'}}>{d.calcTitle}</p>
                <p style={{margin:'0 0 12px',color:'#aaa',fontSize:'12px'}}>{d.calcDesc}</p>
                <div style={{background:'#fff',color:'#000',padding:'10px',borderRadius:'6px',fontSize:'12px',textAlign:'center',fontWeight:'bold'}}>Get Instant Price → Book Now</div>
              </div>
              <div style={{marginTop:'15px',display:'flex',gap:'10px'}}>
                <div style={{flex:1,background:'#f5f5f5',padding:'10px',borderRadius:'6px',textAlign:'center'}}><span style={{fontSize:'10px',color:'#666'}}>⭐ 4.9 Google (287)</span></div>
                <div style={{flex:1,background:'#000',padding:'10px',borderRadius:'6px',textAlign:'center'}}><span style={{fontSize:'10px',color:'#c5a059'}}>⚡ AI Answers in 2s</span></div>
              </div>
            </div>
          </div>
          <p style={{color:'#555',fontSize:'11px',textAlign:'center',marginTop:'12px'}}>↑ This is not brochure — this is selling machine. Gen-Z luxury black/white/gold.</p>
        </div>

        {/* RIGHT - 5 AI TOOLS HOW IT WORKS + HOW IT HELPS */}
        <div>
          <h2 style={{color:'#fff',fontSize:'28px',margin:'0 0 10px'}}>5 AI Tools That Save & Scale Your {d.title} Business</h2>
          <p style={{color:'#888',fontSize:'13px',margin:'0 0 25px'}}>Pain: {d.pain} — We fix it with Gen-Z AI.</p>

          {[
            {n:"1. AI RECEPTIONIST 24/7", how:"AI picks up every call in 2 seconds, speaks English/Spanish, asks 3 qualifying questions, checks your Google Calendar live, books job, sends SMS confirmation. If no booking, calls back 3x in 24h.", save:"Save: Never hire $3k/month receptionist. Never miss after-hours $8k job. Grasp: Book 30% more calls that old site missed. Houston roofers add 12 jobs/month = +$60k revenue.", color:"#c5a059"},
            {n:`2. AI WEBSITE + ${d.calcTitle}`, how:`Not static page. Customer enters details → AI calculates instant price range using your past jobs data → Shows before/after of your ${d.title} work → Offers financing → 1-click book. Mobile-first black/white/gold like Rolex.`, save:`Save: No $5k web designer needed. Site updates itself. Grasp: Old site converts 2% visitors to calls. Our AI site converts 8-12% because instant price = instant trust. 4x more booked estimates.`, color:"#fff"},
            {n:"3. AI REVIEW & GOOGLE TOP 3 ENGINE", how:"After job done, AI auto texts customer: 'Happy? Leave 5-star review'. If 5-star → posts to Google with photo. If 1-4 star → alerts you privately before posting. AI replies to ALL reviews with human tone in 5 min.", save:"Save: No reputation manager $500/mo. Grasp: Google ranks you Top 3 for '"+d.title+" near me' in 30 days because 20 new 5-star reviews + fast replies. More organic calls, zero ad spend.", color:"#c5a059"},
            {n:"4. AI ADS + 7x FOLLOW-UP MACHINE", how:"We launch Google Ads '"+d.title+" "+catKey+"' Houston, build luxury landing page (above preview), and AI follows up every lead 7 times via SMS/email/voicemail over 7 days until they book or say STOP. Tracks which ad made money.", save:"Save: No $2k ad agency. Grasp: $500 ad → 50 clicks → Old: 2 bookings. With 7x AI follow-up: 10-15 bookings. Turns wasted clicks into jobs. $500 → $15k revenue.", color:"#fff"},
            {n:"5. VENUS OS - LUXURY DASHBOARD", how:"One black dashboard: Live calls answered by AI, jobs booked today, revenue this week, new reviews, ad spend vs return, missed calls saved by AI, customer location map.", save:"Save: No more guessing. Grasp: See 'AI made you $12,450 extra this week, saved 17 missed calls, 9 reviews'. Know exactly what works. Gen-Z control center.", color:"#c5a059"},
          ].map((t:any,i:number)=>(
            <div key={i} style={{background:i%2===0?'#0a0a0a':'#111',border:'1px solid #222',borderLeft:`4px solid ${t.color}`,padding:'20px',borderRadius:'8px',marginBottom:'16px'}}>
              <h3 style={{color:t.color,margin:'0 0 10px',fontSize:'14px'}}>{t.n}</h3>
              <p style={{color:'#fff',fontSize:'12px',margin:'0 0 8px'}}><b style={{color:'#c5a059'}}>HOW IT WORKS:</b> {t.how}</p>
              <p style={{color:'#aaa',fontSize:'12px',margin:0}}><b style={{color:'#fff'}}>HOW IT HELPS YOU SAVE & GET MORE BUSINESS:</b> {t.save}</p>
            </div>
          ))}

          <div style={{textAlign:'center',marginTop:'30px',padding:'25px',background:'linear-gradient(135deg,#000 0%,#1a1a1a 100%)',border:'1px solid #c5a059',borderRadius:'12px'}}>
            <p style={{color:'#fff',fontSize:'18px',margin:'0 0 10px'}}>Get This Gen-Z Website For {d.title} Ready in 48Hrs</p>
            <p style={{color:'#c5a059',fontSize:'26px',fontWeight:'bold',margin:'0 0 15px'}}>$497 <span style={{color:'#555',fontSize:'14px',textDecoration:'line-through'}}>$1999</span></p>
            <a href={`https://wa.me/17865841234?text=I want AI website for ${d.title} - ${domain}`} style={{display:'inline-block',background:'#c5a059',color:'#000',padding:'14px 35px',textDecoration:'none',fontWeight:'bold',borderRadius:'6px'}}>GET YOUR AI WEBSITE →</a>
            <p style={{color:'#666',fontSize:'10px',marginTop:'12px'}}>5 spots for {d.title} Houston only — Setup includes all 5 AI tools</p>
          </div>
        </div>

      </div>
    </div>
  );
}
