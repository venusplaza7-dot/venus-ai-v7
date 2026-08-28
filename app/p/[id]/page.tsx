export const dynamic = 'force-dynamic';

const DATA:any={
  roofers:{title:"ROOFERS",emoji:"🏠",calc:"Roof Size Calculator",pain:"Lose $8k roof at 10pm on roof",roi:"12 more roofs/mo = +$60k",current:"Old site = phone number + 3 pics. 2% converts. Loses after-hours."},
  plumbers:{title:"PLUMBERS",emoji:"💧",calc:"Emergency Leak Calculator",pain:"Miss $1200 2am burst",roi:"8 more emergencies/week = +$28k",current:"Old site = list of services. No instant price. Customer calls next guy."},
  hvac:{title:"HVAC",emoji:"❄️",calc:"AC Repair Calculator",pain:"Slow quote, fast guy wins",roi:"15 more AC jobs/week",current:"Old site = no booking. Customer waits 2hrs for callback = lost."},
  dentists:{title:"DENTISTS",emoji:"🦷",calc:"Insurance Checker",pain:"Front desk busy 10min, patient books elsewhere",roi:"34 new patients/mo",current:"Old site = no insurance check. Patient scared of price = no book."},
  electricians:{title:"ELECTRICIANS",emoji:"⚡",calc:"Panel/EV Calculator",pain:"Miss $150 call doing $3000 panel",roi:"Avg $890/job",current:"Old site = no instant quote. Miss small call = lose big panel job later."},
};

export default function Page({params,searchParams}:any){
  const cat = (params?.id||'roofers').toLowerCase();
  const d = DATA[cat]||DATA.roofers;
  const business = searchParams?.b || `${d.title} Business`;
  const domain = searchParams?.domain || `${cat}houston.com`;
  const city = searchParams?.city || 'Houston';
  const WHATSAPP="17865880578"; // +1 (786) 588-0578

  return(
    <div style={{background:'#000',color:'#fff',minHeight:'100vh',fontFamily:'Arial'}}>
      <div style={{textAlign:'center',padding:'16px',borderBottom:'1px solid #222'}}>
        <h1 style={{color:'#c5a059',letterSpacing:'5px',margin:0}}>VENUS HQ7</h1>
        <p style={{color:'#666',fontSize:'9px',letterSpacing:'2px'}}>PERSONALIZED DEMO FOR {business.toUpperCase()} • {domain} • {city} — BLACK WHITE GOLD LUXURY</p>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'16px'}}>

        {/* INTRO — WHO WE ARE / WHAT WE DO / CONVINCE */}
        <div style={{background:'#0a0a0a',border:'2px solid #c5a059',borderRadius:'12px',padding:'18px',marginBottom:'18px'}}>
          <h2 style={{color:'#c5a059',margin:'0 0 8px',fontSize:'18px'}}>This Is What We Built For {business} — {domain}</h2>
          <p style={{color:'#fff',fontSize:'13px',lineHeight:'18px'}}><b>WHO WE ARE:</b> Venus HQ7, IT Corp Inc, 2016 Blake Street, California. Gen-Z luxury AI agency. We build AI websites that answer in 2 seconds like Tesla/Rolax.</p>
          <p style={{color:'#aaa',fontSize:'12px',lineHeight:'17px'}}><b>WHAT WE DO:</b> Your current {domain} is brochure. We upgrade to AI machine: Instant price calculator + AI receptionist 24/7 + Review engine Top 3 Google + Ads 7x follow-up + Dashboard.</p>
          <p style={{color:'#c5a059',fontSize:'12px'}}><b>WHY {business} NEEDS UPGRADE:</b> {d.current} Your competitor with AI gets the job at 10pm while you sleep. We fix that. {d.pain}. Our AI books it for you = {d.roi}.</p>
        </div>

        {/* THEIR CURRENT VS OUR AI */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'18px'}}>
          <div style={{background:'#111',border:'1px solid #333',borderRadius:'10px',padding:'14px'}}>
            <b style={{color:'#ff5f56',fontSize:'11px'}}>❌ YOUR CURRENT {domain}</b>
            <ul style={{color:'#888',fontSize:'11px',lineHeight:'16px',margin:'8px 0 0 15px'}}>
              <li>Static pics + phone number</li><li>2% converts, no instant price</li><li>Misses after-hours calls</li><li>No reviews automation</li><li>No follow-up, lose lead in 1hr</li>
            </ul>
            <p style={{color:'#ff5f56',fontSize:'12px',fontWeight:'bold',marginTop:'8px'}}>Result: Lose $30k-$60k/mo</p>
          </div>
          <div style={{background:'#0a0a0a',border:'2px solid #c5a059',borderRadius:'10px',padding:'14px'}}>
            <b style={{color:'#c5a059',fontSize:'11px'}}>✅ OUR AI FOR {business} — {domain}</b>
            <ul style={{color:'#fff',fontSize:'11px',lineHeight:'16px',margin:'8px 0 0 15px'}}>
              <li>{d.calc} → Instant price → Book</li><li>AI picks every call in 2s 24/7</li><li>Gets 5-star reviews auto → Top 3 Google</li><li>7x follow-up until booked</li><li>Dashboard shows $ made live</li>
            </ul>
            <p style={{color:'#c5a059',fontSize:'12px',fontWeight:'bold',marginTop:'8px'}}>Result: +{d.roi} for {business}</p>
          </div>
        </div>

        {/* THEIR WEBSITE PREVIEW — PERSONALIZED */}
        <div style={{background:'#fff',borderRadius:'14px',overflow:'hidden',border:'3px solid #c5a059'}}>
          <div style={{background:'#111',padding:'10px 14px',color:'#666',fontSize:'11px',display:'flex',justifyContent:'space-between'}}>
            <span>{domain} • AI UPGRADED FOR {business} • {city}</span><span style={{color:'#c5a059'}}>LIVE PREVIEW</span>
          </div>
          <div style={{padding:'20px',color:'#000',background:'#fff'}}>
            <h2 style={{margin:0,color:'#000'}}>{business} {d.emoji} — {city} {d.title}</h2>
            <p style={{color:'#666',fontSize:'11px',margin:'4px 0'}}>⭐ 4.9 (287 reviews) • AI Answers in 2s • Open 24H • {domain}</p>
            <h1 style={{fontSize:'20px',color:'#111',margin:'14px 0'}}>Need {d.title} in {city}? Get Instant Price From {business} — Book Now</h1>
            <div style={{background:'#000',color:'#fff',padding:'14px',borderRadius:'8px',border:'1px solid #c5a059'}}>
              <b style={{color:'#c5a059',fontSize:'12px'}}>{d.calc} — Built For {business} — {city}</b>
              <p style={{color:'#aaa',fontSize:'11px',margin:'6px 0'}}>Customer enters job details → Gets instant price from {business} past jobs → Offers financing → 1-click book {business} now. No waiting.</p>
              <div style={{background:'#fff',color:'#000',padding:'10px',borderRadius:'6px',textAlign:'center',fontWeight:'bold'}}>Get Instant Price From {business} → $ Book {business} Now</div>
            </div>
            <p style={{color:'#666',fontSize:'10px',marginTop:'10px'}}>Before: Customer calls 3 {d.title}, waits. After: Instant price from {business} → Books you in 45 seconds. 4x more.</p>
          </div>
        </div>

        {/* 5 TOOLS — HOW THEY WORK + HOW THEY INCREASE BUSINESS */}
        <h2 style={{margin:'24px 0 10px',fontSize:'22px'}}>{business} — 5 AI Tools We Install On {domain} To Increase Business:</h2>

        {[
          {t:`1. AI RECEPTIONIST 24/7 FOR ${business}`,w:`HOW IT WORKS: AI answers every call for ${business} in 2 seconds, speaks English/Spanish, asks 3 qualifying questions (what's issue, address, urgency), checks your Google Calendar live, books job for ${business}, sends confirmation SMS + email, calls back 3x if missed.`,i:`HOW IT INCREASES BUSINESS: You currently lose 27% calls after-hours — ${d.pain}. AI saves them. ${business} example: 40 extra calls/mo → 12 booked jobs → ${d.roi}. Saves $3k/mo receptionist.`},
          {t:`2. AI WEBSITE + ${d.calc} FOR ${business}`,w:`HOW IT WORKS: Not brochure. Customer enters sq ft / leak type / AC model → AI calculates price using ${business} past 200 jobs + material cost + ${city} rate → Shows your before/after photos of ${business} → Offers Affirm financing → 1-click "Book ${business} Now". Black/white/gold luxury like iPhone.`,i:`HOW IT INCREASES: Old ${domain} 2% converts because no price. Ours 8-12% because instant price = trust. For ${business}: 100 visitors → Old 2 leads, New 10 leads = 4x. That's why ${d.roi}. Saves $5k designer.`},
          {t:`3. AI REVIEW ENGINE — GET ${business} TOP 3 GOOGLE IN ${city}`,w:`HOW IT WORKS: After job, AI texts YOUR customer from ${business}: "Happy with ${business}? Tap 5-star". If 5-star → auto posts to Google with job photo + reply in 5 min human tone. If 1-4 star → alerts you privately, not public. Gets 20+ reviews/mo.`,i:`HOW IT INCREASES: ${business} currently maybe 3.8 stars. Top 3 Google "${d.title} ${city}" needs 4.8+ and 20 new reviews. More reviews = free organic calls — no ad spend. One client went 3→Top 3 in 30 days, +$18k/mo free. Saves $500 reputation guy.`},
          {t:`4. AI ADS + 7x FOLLOW-UP UNTIL BOOKED FOR ${business}`,w:`HOW IT WORKS: We run Google Ads "Best ${d.title} ${city}" + "${business} near me" → Click → This luxury page with calculator → Lead enters phone → AI follows up 7 times via SMS/email/voicemail over 7 days until booked or STOP. Tracks which ad made money for ${business}.`,i:`HOW IT INCREASES: You pay $500 ads → 50 clicks. Old: 2 bookings because you call once. With 7x AI: 10-15 bookings for ${business} because AI never stops. $500 ad → $15k revenue. Saves $2k ad agency.`},
          {t:`5. VENUS OS — LUXURY BLACK DASHBOARD FOR ${business}`,w:`HOW IT WORKS: One dashboard for ${business}: Live calls answered by AI, jobs booked today, revenue this week, new 5-star reviews today, ad spend vs return, missed calls saved, customer recordings. On phone.`,i:`HOW IT INCREASES: No guessing. You see "AI made ${business} $12,450 extra this week, saved 17 missed calls, got 9 new reviews, $500 ad made $14k". You know what works. Scale what works. Saves 10hrs/week.`},
        ].map((x,i)=>(
          <div key={i} style={{background:i%2===0?'#0a0a0a':'#111',border:'1px solid #222',borderLeft:`4px solid ${i%2?'#fff':'#c5a059'}`,padding:'16px',borderRadius:'8px',marginBottom:'12px'}}>
            <b style={{color:i%2?'#fff':'#c5a059',fontSize:'13px'}}>{x.t}</b>
            <p style={{color:'#fff',fontSize:'11px',marginTop:'8px',lineHeight:'15px'}}><b style={{color:'#c5a059'}}>HOW IT WORKS:</b> {x.w}</p>
            <p style={{color:'#aaa',fontSize:'11px',lineHeight:'15px'}}><b style={{color:'#fff'}}>HOW IT INCREASES YOUR BUSINESS:</b> {x.i}</p>
          </div>
        ))}

        {/* CONVINCE — WHY UPGRADE NOW */}
        <div style={{background:'linear-gradient(135deg,#000,#1a1a1a)',border:'1px solid #c5a059',borderRadius:'12px',padding:'20px',marginTop:'20px',textAlign:'center'}}>
          <h2 style={{color:'#fff',margin:0}}>{business} — Upgrade {domain} Now, Or Lose To Competitor With AI</h2>
          <p style={{color:'#888',fontSize:'12px',margin:'8px 0'}}>Your competitor in {city} already booked AI demo yesterday. 5 spots per category only.</p>
          <p style={{color:'#c5a059',fontSize:'28px',fontWeight:'bold',margin:'12px 0'}}>$497 Setup <span style={{color:'#555',fontSize:'13px',textDecoration:'line-through'}}>$1999</span> • 48Hrs Live</p>
          <p style={{color:'#aaa',fontSize:'11px'}}>Includes: AI Receptionist + Website + Review + Ads + OS. Saves $10.5k/mo team. Makes {d.roi}.</p>
          <a href={`https://wa.me/${WHATSAPP}?text=Hi%20Ron%2C%20I'm%20${encodeURIComponent(business)}%20${city}%20-%20Upgrade%20my%20site%20${encodeURIComponent(domain)}%20-%20${cat}%20demo`} 
             style={{background:'#25D366',color:'#fff',padding:'14px 30px',display:'inline-flex',alignItems:'center',gap:'10px',textDecoration:'none',fontWeight:'bold',borderRadius:'8px',marginTop:'12px'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19.11 17.2c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.13.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.06-.11-.24-.16-.51-.3zM12.03 21.9a9.9 9.9 0 01-5.05-1.38l-.36-.22-3.74.98.99-3.65-.24-.38A9.85 9.85 0 012.1 12.03C2.1 6.56 6.56 2.1 12.03 2.1c2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 012.9 7.01c0 5.47-4.46 9.93-9.91 9.89z"/></svg>
            WHATSAPP ACTIVATE — +1 (786) 588-0578
          </a>
          <p style={{color:'#666',fontSize:'9px',marginTop:'10px'}}>IT Corp Inc • 2016 Blake Street, California • Open 24 hours • WhatsApp Symbol Included</p>
        </div>

      </div>
    </div>
  );
}
