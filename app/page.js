export default function Home(){
  return (
    <div style={{background:'#fff', color:'#111', minHeight:'100vh', fontFamily:'system-ui, sans-serif'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Geist+Mono&family=Instrument+Sans:wght@500;600&display=swap'); *{font-family:Instrument Sans,sans-serif} .mono{font-family:Geist Mono,monospace}`}</style>
      
      {/* HEADER */}
      <div style={{height:64, borderBottom:'1px solid #e5e5e5', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', position:'sticky', top:0, background:'rgba(255,255,255,0.8)', backdropFilter:'blur(12px)'}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}><div style={{height:28, width:28, background:'#111', color:'#fff', borderRadius:8, display:'grid', placeItems:'center', fontSize:12, fontWeight:700}}>V</div><b style={{fontSize:14}}>VENUS HQ7GEN</b><span className="mono" style={{fontSize:11, color:'#888', letterSpacing:1}}>2027 SYSTEM</span></div>
        <div className="mono" style={{fontSize:11, color:'#666', display:'flex', gap:8, alignItems:'center'}}><span style={{height:8,width:8,background:'#10b981',borderRadius:20, display:'inline-block'}}></span>2027 SYSTEM LIVE</div>
      </div>

      {/* HERO */}
      <div style={{maxWidth:1200, margin:'0 auto', padding:'72px 24px'}}>
        <div className="mono" style={{fontSize:10, letterSpacing:'1.5px', color:'#666', border:'1px solid #e5e5e5', display:'inline-block', padding:'6px 12px', borderRadius:20}}>HOUSTON • 2005-2020 • FORGOTTEN DOMAINS — SCRAPER v7</div>
        <h1 style={{fontSize:'clamp(36px,6vw,72px)', fontWeight:600, lineHeight:0.9, letterSpacing:'-0.03em', marginTop:32}}>WE FIND OLD<br/>WEBSITES.<br/><span style={{background:'#FFE55C', padding:'0 8px', borderRadius:6}}>YOU GET NEW</span> CUSTOMERS.</h1>
        <div style={{display:'flex', gap:24, marginTop:24, flexWrap:'wrap'}}>
          <p style={{maxWidth:520, fontSize:18, color:'#666', lineHeight:1.4}}>Scraper for 2005-2020 businesses. Houston roofers, plumbers, forgotten domains with history. We rebuild them into 2027 booking machines.</p>
          <div className="mono" style={{fontSize:11, color:'#888', display:'flex', gap:24}}><div><b style={{color:'#111', fontSize:13}}>1.1s load</b><div>brutalist rebuild</div></div><div><b style={{color:'#111', fontSize:13}}>Gold CTA</b><div>booking-first</div></div><div><b style={{color:'#111', fontSize:13}}>Houston</b><div>rooted</div></div></div>
        </div>
      </div>

      {/* 5 TOOLS */}
      <div style={{maxWidth:1200, margin:'0 auto', padding:'0 24px 40px'}}>
        <div className="mono" style={{fontSize:11, letterSpacing:1.5, color:'#888'}}>[04 — INSIDE YOUR SITE]</div>
        <h2 style={{fontSize:36, fontWeight:600, marginTop:8}}>5 AI TOOLS ALREADY INSIDE.</h2>
        <div className="mono" style={{fontSize:12, color:'#666', marginTop:8}}>Not add-ons. Built into your rebuild. Works day 1.</div>
        
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px,1fr))', gap:16, marginTop:32}}>
          <div style={{border:'1px solid #e5e5e5', borderRadius:16, padding:20}}>
            <div className="mono" style={{fontSize:10, color:'#999'}}>01 — AI BOOKING CHAT</div>
            <div style={{fontWeight:600, marginTop:8}}>Replaces contact form. Talks like human, books job while you sleep.</div>
            <div className="mono" style={{fontSize:11, color:'#666', marginTop:8}}>8% → 34% conversion • 1 line script</div>
            <div style={{background:'#f4f4f5', borderRadius:12, padding:12, marginTop:12, fontSize:13}}>
              <div style={{background:'#111', color:'#fff', padding:'6px 10px', borderRadius:20, display:'inline-block', fontSize:12}}>Hi! What roof type needs work?</div>
              <div style={{marginTop:8}}>Shingle — leaking near chimney</div>
              <div style={{marginTop:4, color:'#666'}}>Got it. When works? Tomorrow 9am?</div>
              <div style={{marginTop:4}}>Yes. 1420 Westheimer, Houston</div>
              <div style={{marginTop:8, background:'#111', color:'#a3e635', padding:'8px 12px', borderRadius:10, fontSize:12}}>Booked. Crew at 9am. $250 deposit held.</div>
            </div>
          </div>
          <div style={{border:'1px solid #e5e5e5', borderRadius:16, padding:20}}>
            <div className="mono" style={{fontSize:10, color:'#999'}}>02 — AI QUOTE ESTIMATOR</div>
            <div style={{fontWeight:600, marginTop:8}}>Instant price from photos. Upload roof photo, AI gives $ range.</div>
            <div className="mono" style={{fontSize:11, color:'#666', marginTop:8}}>Lead capture +210%</div>
            <div style={{border:'1px dashed #ccc', borderRadius:12, padding:20, marginTop:12, textAlign:'center'}}>
              <div style={{fontSize:13}}>DRAG PHOTO HERE</div>
              <div className="mono" style={{fontSize:11, color:'#888', marginTop:8}}>Analyzing shingle wear...</div>
              <div style={{fontWeight:700, marginTop:8}}>ESTIMATE: $4,200 — $5,800</div>
              <div style={{background:'#111', color:'#fff', padding:'8px', borderRadius:20, marginTop:8, fontSize:12}}>Book inspection to lock price?</div>
            </div>
          </div>
          <div style={{border:'1px solid #e5e5e5', borderRadius:16, padding:20}}>
            <div className="mono" style={{fontSize:10, color:'#999'}}>03 — AI MISSED-CALL TEXT BACK</div>
            <div style={{fontWeight:600, marginTop:8}}>Missed call? AI texts in 3 seconds. Saves $10k/mo lost calls.</div>
            <div className="mono" style={{fontSize:11, color:'#666', marginTop:8}}>3s response • Twilio + Venus</div>
            <div style={{background:'#f4f4f5', borderRadius:12, padding:12, marginTop:12, fontSize:13}}>
              <div className="mono" style={{fontSize:11}}>MISSED CALL 2:34pm — (713) 555-0142</div>
              <div style={{marginTop:8}}>→ SMS sent in 3s</div>
              <div style={{marginTop:4}}>On a roof — can I call back in 5? Reply YES to book →</div>
              <div style={{marginTop:8, display:'flex', gap:8}}><span style={{background:'#FFE55C', padding:'4px 10px', borderRadius:20, fontSize:12}}>Customer: YES</span><span style={{background:'#111', color:'#fff', padding:'4px 10px', borderRadius:20, fontSize:12}}>Booked.</span></div>
            </div>
          </div>
          <div style={{border:'1px solid #e5e5e5', borderRadius:16, padding:20}}>
            <div className="mono" style={{fontSize:10, color:'#999'}}>04 — AI REVIEW ENGINE</div>
            <div style={{fontWeight:600, marginTop:8}}>Auto asks for review after job, auto replies with SEO keywords.</div>
            <div className="mono" style={{fontSize:11, color:'#666', marginTop:8}}>4.2 → 4.9 stars in 30 days</div>
            <div style={{background:'#f4f4f5', borderRadius:12, padding:12, marginTop:12, fontSize:13}}>
              <div>Job #2841 complete</div>
              <div style={{marginTop:4}}>→ “Loved your new roof? Leave a review?” SMS sent</div>
              <div style={{marginTop:8}}>★★★★★ “Fast, clean, Houston roofer fixed leak in 2hrs”</div>
              <div style={{marginTop:8, fontSize:12, color:'#666'}}>↳ AI Reply: “Thanks! Proud to be Houston’s leak specialists… #HoustonRoofing”</div>
            </div>
          </div>
          <div style={{border:'1px solid #e5e5e5', borderRadius:16, padding:20}}>
            <div className="mono" style={{fontSize:10, color:'#999'}}>05 — AI UPSELL & REBOOK</div>
            <div style={{fontWeight:600, marginTop:8}}>After job, AI texts “Gutter cleaning due? 15% off if booked this week.”</div>
            <div className="mono" style={{fontSize:11, color:'#666', marginTop:8}}>22% rebook rate • Venus tracker</div>
            <div style={{background:'#f4f4f5', borderRadius:12, padding:12, marginTop:12, fontSize:13}}>
              <div>Customer: Job done 31 days ago</div>
              <div style={{marginTop:4}}>→ AI: “Hey Mike, gutter cleaning due? 15% off this week. Reply GUTTER”</div>
              <div style={{marginTop:8}}><span style={{border:'1px solid #111', padding:'4px 10px', borderRadius:20}}>Mike: GUTTER</span></div>
              <div style={{marginTop:8, background:'#FFE55C', padding:'8px 12px', borderRadius:10, fontWeight:600}}>Booked Thu 10am — $189</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200, margin:'0 auto', padding:'40px 24px', borderTop:'1px solid #eee'}}>
        <h2 style={{fontSize:32, fontWeight:600}}>READY TO SEE IT LIVE?</h2>
        <p style={{color:'#666', marginTop:8}}>Houston Roofing Co. demo — loads in 0.8s. Before 2008 HTML tables, after 2027 booking-first.</p>
        <div style={{marginTop:16, display:'inline-block', border:'1px solid #111', padding:'10px 20px', borderRadius:30, fontWeight:600}}>View Live Demo →</div>
        <div className="mono" style={{marginTop:24, fontSize:11, color:'#888'}}>© 2027 VENUS HQ7 — Built for Houston</div>
      </div>
    </div>
  )
}
