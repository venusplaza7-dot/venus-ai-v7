export default function Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'JetBrains Mono',monospace;background:#fff;color:#000}
        .wrap{max-width:1200px;margin:0 auto;padding:0 20px}
        .border-b{border-bottom:2px solid #000}
        .btn{background:#000;color:#fff;padding:14px 22px;display:inline-block;text-decoration:none;font-weight:700;font-size:12px;text-transform:uppercase}
        .btn-gold{background:#C9A86A;color:#000}
        h1{font-size:clamp(40px,9vw,120px);line-height:0.85;font-weight:900;letter-spacing:-4px;text-transform:uppercase}
        .gold{color:#C9A86A}
        .card{border:2px solid #000;padding:24px}
        .grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:0;border:2px solid #000}
        .grid3 .card{border:none;border-right:2px solid #000;border-bottom:2px solid #000}
        .stack{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:#000;border:2px solid #000;padding:2px}
        .stack .item{background:#000;color:#fff;padding:20px}
        .live{display:inline-block;background:#22c55e;color:#000;padding:2px 6px;font-size:10px;font-weight:700;margin-left:8px}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',padding:'16px 20px',borderBottom:'2px solid #000',position:'sticky',top:0,background:'#fff',zIndex:10}}>
        <div style={{fontSize:'11px'}}>● VENUS HQ7GEN — 2027 SYSTEM LIVE</div>
        <div style={{fontSize:'10px',opacity:0.5}}>HOUSTON 0.8s</div>
      </header>

      <div className="wrap" style={{paddingTop:'60px',paddingBottom:'60px'}} className="border-b">
        <h1>WE FIND<br/>OLD<br/>WEBSITES.<br/><span className="gold">YOU GET NEW</span><br/>CUSTOMERS.</h1>
        <p style={{marginTop:'24px',maxWidth:'520px',fontSize:'13px',lineHeight:'1.6'}}>
          Scraper for 2005-2020 businesses. Houston. Roofers. Plumbers. Ready.<br/>
          We rebuild them for 2027. You keep the revenue. 0.8s load, booking-first.
        </p>
        <div style={{marginTop:'28px',display:'flex',gap:'12px'}}>
          <a className="btn" href="#demo">View Live Demo →</a>
          <a className="btn" style={{background:'#fff',color:'#000',border:'2px solid #000'}} href="#stack">See 2030 Stack</a>
        </div>
        <div style={{marginTop:'16px',fontSize:'11px',opacity:0.6}}>Before: 2008 HTML tables → After: 2027 booking-first</div>
      </div>

      <div className="wrap" style={{padding:'40px 20px'}}>
        <div style={{fontSize:'12px',marginBottom:'20px'}}>[02 — PROCESS]</div>
        <div className="grid3">
          <div className="card"><div style={{fontSize:'10px',opacity:0.5}}>01</div><div style={{fontSize:'22px',fontWeight:900,marginTop:'8px'}}>SCAN</div><div style={{fontSize:'12px',marginTop:'12px',opacity:0.7}}>Find forgotten sites from 2005-2020. Domains with history, zero design.</div></div>
          <div className="card"><div style={{fontSize:'10px',opacity:0.5}}>02</div><div style={{fontSize:'22px',fontWeight:900,marginTop:'8px'}}>BUILD</div><div style={{fontSize:'12px',marginTop:'12px',opacity:0.7}}>AI rebuilds them for 2027. Brutalist. Fast. Booking-first. 1.1s load.</div></div>
          <div className="card"><div style={{fontSize:'10px',opacity:0.5}}>03</div><div style={{fontSize:'22px',fontWeight:900,marginTop:'8px'}}>BOOK</div><div style={{fontSize:'12px',marginTop:'12px',opacity:0.7}}>Calls, bookings, revenue. Old traffic, new system.</div></div>
        </div>
      </div>

      <div id="stack" style={{background:'#000',color:'#fff',padding:'60px 20px',borderTop:'2px solid #000',borderBottom:'2px solid #000'}}>
        <div className="wrap">
          <div style={{fontSize:'12px',opacity:0.5,marginBottom:'12px'}}>[03 — 2030 STACK]</div>
          <h2 style={{fontSize:'clamp(32px,6vw,64px)',fontWeight:900,lineHeight:0.9}}>EVERYTHING TO<br/>COMPETE IN 2030</h2>
          <p style={{fontSize:'12px',opacity:0.6,marginTop:'12px'}}>All built-in. No extra tools. Built to compete in 2030, not 2020.</p>
          
          <div className="stack" style={{marginTop:'32px'}}>
            <div className="item"><div style={{fontSize:'10px',opacity:0.4}}>01</div><div style={{fontWeight:900,marginTop:'6px'}}>VENUS OS DASHBOARD</div><div style={{fontSize:'11px',opacity:0.6,marginTop:'8px'}}>Live: calls, jobs, revenue, reviews, ad ROI. See extra $12k/week.</div></div>
            <div className="item"><div style={{fontSize:'10px',opacity:0.4}}>02</div><div style={{fontWeight:900,marginTop:'6px'}}>AI VOICE RECEPTIONIST</div><div style={{fontSize:'11px',opacity:0.6,marginTop:'8px'}}>Answers 24/7, books jobs. Old 2 → AI 10-15 bookings.</div></div>
            <div className="item"><div style={{fontSize:'10px',opacity:0.4}}>03</div><div style={{fontWeight:900,marginTop:'6px'}}>AI ADS + 7x FOLLOW-UP</div><div style={{fontSize:'11px',opacity:0.6,marginTop:'8px'}}>$500 → 50 clicks → 10-15 bookings → $15k rev.</div></div>
            <div className="item"><div style={{fontSize:'10px',opacity:0.4}}>04</div><div style={{fontWeight:900,marginTop:'6px'}}>AGENT-SCRAPER</div><div style={{fontSize:'11px',opacity:0.6,marginTop:'8px'}}>Finds old 2005-2020 sites. Houston roofers, plumbers.</div></div>
            <div className="item"><div style={{fontSize:'10px',opacity:0.4}}>05</div><div style={{fontWeight:900,marginTop:'6px'}}>AGENT-BUILDER</div><div style={{fontSize:'11px',opacity:0.6,marginTop:'8px'}}>Rebuilds site for 2027. Brutalist, 1.1s, booking-first.</div></div>
            <div className="item"><div style={{fontSize:'10px',opacity:0.4}}>06</div><div style={{fontWeight:900,marginTop:'6px'}}>AGENT-TRACKER</div><div style={{fontSize:'11px',opacity:0.6,marginTop:'8px'}}>Tracks leads, calls, bookings, ROI live.</div></div>
            <div className="item"><div style={{fontSize:'10px',opacity:0.4}}>07</div><div style={{fontWeight:900,marginTop:'6px'}}>BLAST5 + SEND-PREVIEW</div><div style={{fontSize:'11px',opacity:0.6,marginTop:'8px'}}>Auto blast 5 leads/day. Preview link, WhatsApp close.</div></div>
            <div className="item"><div style={{fontSize:'10px',opacity:0.4}}>08</div><div style={{fontWeight:900,marginTop:'6px'}}>VENUS FACTORY</div><div style={{fontSize:'11px',opacity:0.6,marginTop:'8px'}}>Autonomous loop. Scrapes, builds, tracks, blasts.</div></div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{padding:'40px 20px'}}>
        <div style={{fontSize:'12px',marginBottom:'12px'}}>[04 — 5 AI TOOLS INSIDE]</div>
        <h2 style={{fontSize:'32px',fontWeight:900}}>5 AI TOOLS ALREADY INSIDE. Not add-ons.</h2>
        <div style={{marginTop:'20px',display:'grid',gap:'12px'}}>
          {[
            ["01 BOOKING CHAT","Replaces form. 8% → 34%. venus.ai/tool-01.js"],
            ["02 QUOTE ESTIMATOR","Instant price from photos. $4.2k-$5.8k. venus.ai/tool-02.js"],
            ["03 MISSED-CALL TEXT BACK","AI texts in 3s. Saves $10k/mo. venus.ai/tool-03.js"],
            ["04 REVIEW ENGINE","4.2 → 4.9 stars in 30 days. venus.ai/tool-04.js"],
            ["05 UPSELL & REBOOK","22% rebook rate. venus.ai/tool-05.js"],
          ].map(([t,d])=>(
            <div key={t} style={{border:'2px solid #000',padding:'16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div><div style={{fontWeight:900,fontSize:'13px'}}>{t} <span className="live">LIVE</span></div><div style={{fontSize:'11px',opacity:0.6,marginTop:'4px'}}>{d}</div></div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{borderTop:'2px solid #000',padding:'20px',display:'flex',justifyContent:'space-between',fontSize:'10px',opacity:0.5}}>
        <span>© 2027 VENUS HQ7 — Built for Houston</span><span>v7 code → v8 live prod</span>
      </footer>
    </>
  );
}
