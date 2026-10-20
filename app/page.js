export default function Page() {
  return (
    <div style={{background:"#fff",color:"#000",fontFamily:"monospace",lineHeight:1.4}}>
      
      <div style={{borderBottom:"3px solid #000",padding:"14px 20px",display:"flex",justifyContent:"space-between",fontSize:"11px",fontWeight:700,position:"sticky",top:0,background:"#fff",zIndex:10}}>
        <span>● VENUS HQ7GEN — 2027 SYSTEM LIVE</span>
        <span style={{opacity:0.5}}>HOUSTON 0.8s</span>
      </div>

      <div style={{padding:"60px 20px",borderBottom:"3px solid #000"}}>
        <div style={{fontSize:"clamp(36px,10vw,110px)",fontWeight:900,lineHeight:0.85,letterSpacing:"-3px",textTransform:"uppercase"}}>
          <div>WE FIND</div>
          <div>OLD WEBSITES.</div>
          <div><span style={{color:"#C9A86A"}}>YOU GET NEW</span> CUSTOMERS.</dinesses. Houston. Roofers. Plumbers. Ready. We rebuild them for 2027. You keep the revenue.
        </div>
        <div style={{marginTop:"24px",display:"flex",gap:"12px"}}>
          <a href="#demo" style={{background:"#000",color:"#fff",padding:"14px 20px",textDecoration:"none",fontSize:"12px",fontWeight:700}}>View Live Demo →</a>
          <a href="#stack" style={{background:"#fff",color:"#000",border:"3px solid #000",padding:"11px 20px",textDecoration:"none",fontSize:"12px",fontWeight:700}}>See 2030 Stack</a>
        </div>
      </div>

      <div style={{padding:"40px 20px"}}>
        <div style={{fontSize:"12px",marginBottom:"16px"}}>[02 — PROCESS]</div>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          <div style={{border:"3px solid #000",padding:"20px"}}>
            <div style={{fontSize:"10px",opacity:0.5}}>01</div>
            <div style={{fontSize:"20px",fontWeight:900,marginTop:"6px"}}>SCAN</div>
            <div style={{fontSize:"12px",marginTop:"8px"}}>Find forgotten sites from 2005-2020. Domains with history, zero design.</div>
          </div>
          <div style={{border:"3px solid #000",padding:"20px"}}>
            <div style={{fontSize:"10px",opacity:0.5}}>02</div>
            <div style={{fontSize:"20px",fontWeight:900,marginTop:"6px"}}>BUILD</div>
            <div style={{fontSize:"12px",marginTop:"8px"}}>AI rebuilds them for 2027. Brutalist. Fast. Booking-first.</div>
          </div>
          <div style={{border:"3px solid #000",padding:"20px"}}>
            <div style={{fontSize:"10px",opacity:0.5}}>03</div>
            <div style={{fontSize:"20px",fontWeiinTop:"6px"}}>BOOK</div>
            <div style={{fontSize:"12px",marginTop:"8px"}}>Calls, bookings, revenue. Old traffic, new system.</div>
          </div>
        </div>
      </div>

      <div id="stack" style={{background:"#000",color:"#fff",padding:"40px 20px"}}>
        <div style={{fontSize:"12px",opacity:0.5}}>[03 — 2030 STACK]</div>
        <div style={{fontSize:"36px",fontWeight:900,lineHarginTop:"8px"}}>EVERYTHING TO COMPETE IN 2030</div>
        <div style={{fontSize:"12px",opacity:0.6,marginTop:"8px"}}>All built-in. No extra tools.</div>
        
        <div style={{marginTop:"24px",display:"flex",flexDirection:"column",gap:"12px"}}>
          {[
            ["01 VENUS OS DASHBOARD","Live: calls, jobs, revenue, reviews, ad ROI. See extra $12k/week made."],
            ["02 AI VOICE RECEPTIONIST","Answers 24/7, books jobs. Old 2 → AI 10-15 bookings."],
            ["03 AI ADS + 7x FOLLOW-UP","$500 ads → 50 clicks → 10-15 bookings → $15k revenue."],
            ["04 AGENT-SCRAPER","Finds old 2005-2020 sites, plumbers."],
            ["05 AGENT-BUILDER","Rebuilds site for 2027. Brutalist, 1.1s load, booking-first, gold CTA."],
            ["06 AGENT-TRACKER","Tracks leads, calls, bookings."],
            ["07 BLAST5 + SEND-PREVIEW","Auto email + SMS blast to 5 leads/day."],
            ["08 VENUS FACTORY","Autonomous loop. Scrapes, builds, tracks, blasts."],
          ].map(([t,d])=>(
            <div key={t} style={{border:"2px solid #fff",padding:"16px"}}>
              <div style={{fontWeight:900,fontSize:"13px"}}>{t}</div>
              <div style={{fontSize:"11px",opacity:0.7,marginTop:"6px"}}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"40px 20px",borderTop:"3px solid #000"}}>
        <div style={{fontSize:"12px"}}>[04 — 5 AI TOOLS INSIDE]</div>
        <div style={{fontSize:"28px",fontWeight:900,marginTop:"8px"}}>5 AI TOOLS ALREADY INSIDE.</div>
        <div style={{marginTop:"20px",display:"flex",flexDirection:"column",gap:"10px"}}>
          <div style={{border:"3px solid #000",padding:"14px"}}><b>01 BOOKING CHAT</b> — Replaces form. 8% → 34% <span style={{background:"#22c55e",fontSize:"10px",padding:"2px 6px"}}>LIVE</span></div>
          <div style={{border:"3px solid #000",padding:"14px"}}><b>02 QUOTE ESTIMATOR</b> — Instant price from photos. $4.2k-$5.8k <span style={{background:"#22c55e",fontSize:"10px",padding:"2px 6px"}}>LIVE</span></div>
          <div style={{border:"3px solid #000",padding:"14px"}}><b>03 MISSED-CALL TEXT BACK</b> — AI texts in 3s. Saves $10k/mo <span style={{background:"#22c55e",fontSize:"10px",padding:"2px 6px"}}>LIVE</span></div>
          <div style={{border:"3px solid #000",padding:"14px"}}><b>04 REVIEW ENGINE</b> — 4.2 → 4.9 stars in 30 days <span style={{background:"#22c55e",fontSize:"10px",padding:"2px 6px"}}>LIVE</span></div>
          <div style={{border:"3px solid #000",padding:"14px"}}><b>05 UPSELL & REBOOK</b> — 22% rebook rate <span style={{background:"#22c55e",fontSize:"10px",padding:"2px 6px"}}>LIVE</span></div>
        </div>
      </div>

      <div style={{borderTop:"3px solid #000",padding:"16px 20px",display:"flex",justifyContent:"space-between",fontSize:"10px",opacity:0.6}}>
        <span>© 2027 VENUS HQ7 — Built for Houston</span>
        <span>v7 code → v8 live prod</span>
      </div>

    </div>
  );
}
