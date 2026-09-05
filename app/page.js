export default function Home(){
  return (
    <div style={{background:'#fff',color:'#111',minHeight:'100vh',fontFamily:'system-ui',overflowX:'hidden'}}>
      <style>{`
        *{box-sizing:border-box}
        @media(max-width:600px){
          h1{font-size:38px !important; letter-spacing:-1.5px !important}
          .grid{grid-template-columns:1fr !important}
          .hero{padding:28px 16px !important}
          .card{padding:16px !important}
        }
      `}</style>

      <div style={{height:56,borderBottom:'1px solid #eee',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',position:'sticky',top:0,background:'#fff',zIndex:10}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}><div style={{background:'#111',color:'#fff',width:26,height:26,borderRadius:8,display:'grid',placeItems:'center',fontWeight:800,fontSize:12}}>V</div><b style={{fontSize:13}}>VENUS HQ7GEN</b></div>
        <div style={{fontSize:10,background:'#111',color:'#fff',padding:'5px 10px',borderRadius:20}}>LIVE 0.8s</div>
      </div>

      <div className="hero" style={{maxWidth:1100,margin:'0 auto',padding:'48px 20px'}}>
        <div style={{fontSize:10,letterSpacing:1,border:'1px solid #e5e5e5',display:'inline-block',padding:'6px 12px',borderRadius:20,color:'#666'}}>HOUSTON • 2005-2020 • FORGOTTEN DOMAINS</div>
        <h1 style={{fontSize:'clamp(38px,7vw,68px)',fontWeight:900,lineHeight:0.9,marginTop:20,letterSpacing:-2.5}}>WE FIND<br/>OLD WEBSITES.<br/><span style={{background:'#FFE55C',padding:'0 8px'}}>YOU GET NEW</span><br/>CUSTOMERS.</h1>
        <p style={{color:'#666',maxWidth:480,marginTop:14,fontSize:16,lineHeight:1.5}}>Scraper for 2005-2020. Houston roofers, plumbers. We rebuild for 2027 booking-first.</p>

        <div className="grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:12,marginTop:28}}>
          <div className="card" style={{border:'1px solid #e5e5e5',borderRadius:16,padding:18}}>
            <div style={{fontSize:10,color:'#999'}}>01 — BOOKING CHAT</div>
            <div style={{fontWeight:700,marginTop:6,fontSize:15}}>Replaces contact form</div>
            <div style={{fontSize:13,color:'#666',marginTop:4}}>8% → 34% conversion • 1 line script</div>
            <div style={{background:'#f6f6f7',borderRadius:12,padding:10,marginTop:10,fontSize:13,lineHeight:1.4}}>Hi! What roof type?<br/>Shingle — leaking near chimney<br/><span style={{color:'#888'}}>Got it. Tomorrow 9am?</span><br/>Yes. 1420 Westheimer<br/><div style={{background:'#111',color:'#a3e635',padding:'7px 10px',borderRadius:8,marginTop:8,fontSize:12}}>Booked. Crew at 9am $250</div></div>
          </div>

          <div className="card" style={{border:'1px solid #e5e5e5',borderRadius:16,padding:18}}>
            <div style={{fontSize:10,color:'#999'}}>02 — QUOTE ESTIMATOR</div>
            <div style={{fontWeight:700,marginTop:6,fontSize:15}}>Photo → instant price</div>
            <div style={{border:'1px dashed #ccc',borderRadius:12,padding:16,textAlign:'center',marginTop:10}}><div style={{fontSize:12}}>DRAG PHOTO HERE</div><div style={{fontSize:11,color:'#888',marginTop:6}}>Analyzing shingle wear...</div><b style={{display:'block',marginTop:6}}>$4,200 — $5,800</b></div>
          </div>

          <div className="card" style={{border:'1px solid #e5e5e5',borderRadius:16,padding:18}}>
            <div style={{fontSize:10,color:'#999'}}>03 — MISSED-CALL TEXT BACK</div>
            <div style={{fontWeight:700,marginTop:6,fontSize:15}}>3s reply • Saves $10k/mo</div>
            <div style={{background:'#f6f6f7',borderRadius:12,padding:10,marginTop:10,fontSize:13}}>MISSED CALL 2:34pm<br/>→ SMS in 3s<br/>On a roof — call back in 5? Reply YES<br/><div style={{marginTop:8,display:'flex',gap:6}}><span style={{background:'#FFE55C',padding:'4px 8px',borderRadius:20,fontSize:12}}>Customer: YES</span><span style={{background:'#111',color:'#fff',padding:'4px 8px',borderRadius:20,fontSize:12}}>Booked</span></div></div>
          </div>

          <div className="card" style={{border:'1px solid #e5e5e5',borderRadius:16,padding:18}}>
            <div style={{fontSize:10,color:'#999'}}>04 — REVIEW ENGINE</div>
            <div style={{fontWeight:700,marginTop:6,fontSize:15}}>4.2 → 4.9 stars in 30 days</div>
            <div style={{fontSize:13,marginTop:10,lineHeight:1.4}}>Job #2841 complete<br/>→ "Loved your new roof?" SMS<br/>★★★★★ "Fast, clean, fixed leak in 2hrs"<br/><span style={{color:'#666',fontSize:12}}>AI Reply: Thanks! Houston's leak specialists #HoustonRoofing</span></div>
          </div>

          <div className="card" style={{border:'1px solid #e5e5e5',borderRadius:16,padding:18}}>
            <div style={{fontSize:10,color:'#999'}}>05 — UPSELL & REBOOK</div>
            <div style={{fontWeight:700,marginTop:6,fontSize:15}}>22% rebook rate</div>
            <div style={{background:'#f6f6f7',borderRadius:12,padding:10,marginTop:10,fontSize:13}}>Job done 31 days ago<br/>→ AI: "Hey Mike, gutter due? 15% off"<br/>Mike: GUTTER<div style={{background:'#FFE55C',padding:'8px',borderRadius:8,marginTop:8,fontWeight:700}}>Booked Thu 10am — $189</div></div>
          </div>
        </div>

        <div style={{marginTop:36,borderTop:'1px solid #eee',paddingTop:20}}>
          <h2 style={{fontSize:22,fontWeight:800}}>READY TO SEE IT LIVE?</h2>
          <p style={{color:'#666',fontSize:14,marginTop:6}}>Houston demo loads 0.8s. Before 2008 tables, after 2027 booking-first.</p>
          <div style={{display:'inline-block',marginTop:12,background:'#111',color:'#fff',padding:'12px 20px',borderRadius:30,fontSize:14,fontWeight:600}}>View Live Demo →</div>
          <div style={{marginTop:20,fontSize:11,color:'#999'}}>© 2027 VENUS HQ7 — Built for Houston</div>
        </div>
      </div>
    </div>
  )
}
