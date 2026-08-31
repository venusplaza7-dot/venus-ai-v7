"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function UltraPage(){
  const params = useParams(); const sp = useSearchParams();
  const biz = params?.b || "arizonanativeroofing.com";
  const conf = sp.get("conf")||"VENUS-2026-HOU-497";
  const [openTool,setOpenTool]=useState(null);
  const [showWelcome,setShowWelcome]=useState(false);
  const [quote,setQuote]=useState({sqft:2400, material:"GAF HDZ", price:12480});
  const [uploaded,setUploaded]=useState(false);
  const canvasRef=useRef(null);

  useEffect(()=>{ setTimeout(()=>setShowWelcome(true), 1800); },[]);
  useEffect(()=>{
    if(openTool?.id==="01" && canvasRef.current){
      const c=canvasRef.current, ctx=c.getContext("2d"); let p=0;
      const anim=setInterval(()=>{ p+=2; ctx.clearRect(0,0,400,200);
        ctx.strokeStyle="#D4AF37"; ctx.lineWidth=2; ctx.setLineDash([5,5]);
        ctx.strokeRect(20,20,360,120); ctx.setLineDash([]);
        ctx.fillStyle="#D4AF37"; ctx.fillRect(20+p*1.5,20,4,120);
        if(p>100) clearInterval(anim);
      },30);
    }
  },[openTool]);

  const tools=[
    {id:"01", name:"LIVE DRONE SCAN", badge:"SCANNING", color:"#00FF88"},
    {id:"02", name:"DAMAGE AI VISION", badge:"UPLOAD", color:"#FF3B30"},
    {id:"03", name:"INSTANT QUOTE ENGINE", badge:"LIVE CALC", color:"#D4AF37"},
    {id:"04", name:"WEATHER SHIELD RADAR", badge:"12% RISK", color:"#0A84FF"},
    {id:"05", name:"WARRANTY VAULT", badge:"VERIFIED", color:"#D4AF37"},
  ];

  return (
    <div style={{minHeight:"100vh", background:"radial-gradient(1200px at 50% -20%, #1a1a1a, #070707)", color:"white", fontFamily:"ui-monospace, monospace"}}>
      <div style={{background:"linear-gradient(90deg,#D4AF37,#FFD700)", color:"black", textAlign:"center", padding:"12px", fontWeight:"900", fontSize:"12px", letterSpacing:"1px"}}>● VENUS AI ULTRA • LIVE • {conf} • {biz.toUpperCase()} • 1-YEAR AI MONITORING ACTIVE</div>

      <div style={{maxWidth:"1100px", margin:"0 auto", padding:"32px 20px"}}>
        <div style={{display:"grid", gridTemplateColumns:"1.2fr 0.8fr", gap:"20px"}}>
          <div style={{border:"1px solid #D4AF3722", borderRadius:"32px", padding:"36px", background:"linear-gradient(180deg,#151515,#0e0e0e)"}}>
            <div style={{display:"inline-flex", gap:"8px", background:"#D4AF37", color:"black", padding:"8px 16px", borderRadius:"999px", fontSize:"11px", fontWeight:"900"}}><span style={{animation:"pulse 1s infinite"}}>●</span> PREMIUM ULTRA — ACTIVATED Aug 31, 2026</div>
            <h1 style={{fontSize:"44px", fontWeight:"900", lineHeight:"0.9", marginTop:"20px"}}>AI ROOFING<br/>COMMAND<br/><span style={{color:"#D4AF37"}}>CENTER</span></h1>
            <p style={{color:"#888", marginTop:"16px", fontSize:"13px"}}>{conf} • {biz} • 5 autonomous agents • No monthly fees</p>
            <div style={{marginTop:"20px", display:"flex", gap:"10px", flexWrap:"wrap"}}>
              <span style={{border:"1px solid #222", padding:"6px 12px", borderRadius:"999px", fontSize:"11px"}}>✓ Drone Live</span>
              <span style={{border:"1px solid #222", padding:"6px 12px", borderRadius:"999px", fontSize:"11px"}}>✓ GAF Valid 2033</span>
              <span style={{border:"1px solid #222", padding:"6px 12px", borderRadius:"999px", fontSize:"11px"}}>✓ Weather AI</span>
            </div>
            <button onClick={()=>setShowWelcome(true)} style={{marginTop:"24px", background:"white", color:"black", padding:"14px 28px", borderRadius:"999px", fontWeight:"900", border:"0"}}>▶ LAUNCH AI ASSISTANT</button>
          </div>
          <div style={{border:"1px solid #D4AF3733", borderRadius:"32px", padding:"20px", background:"#111", display:"flex", flexDirection:"column", gap:"12px"}}>
            <div style={{fontSize:"10px", color:"#666"}}>LIVE ROOF FEED — {biz}</div>
            <div style={{height:"220px", borderRadius:"20px", background:"linear-gradient(45deg,#0a0a0a,#1e1e1e)", border:"1px solid #222", position:"relative", overflow:"hidden"}}>
              <div style={{position:"absolute", inset:"0", background:"repeating-linear-gradient(0deg, transparent, transparent 19px, #D4AF3708 20px)"}}/>
              <div style={{position:"absolute", top:"50%", left:"20%", width:"60%", height:"2px", background:"#D4AF37", boxShadow:"0 0 20px #D4AF37", animation:"scan 3s infinite linear"}}/>
              <div style={{position:"absolute", bottom:"20px", left:"20px", fontSize:"10px", color:"#D4AF37"}}>2,400 SQ FT • SECTION B 98% WEAR • 0 LEAKS DETECTED</div>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px"}}>
              <div style={{background:"#0e0e0e", borderRadius:"14px", padding:"12px", border:"1px solid #222"}}><div style={{fontSize:"10px", color:"#666"}}>ESTIMATED REPAIR</div><div style={{color:"#D4AF37", fontWeight:"900"}}>$1,240</div></div>
              <div style={{background:"#0e0e0e", borderRadius:"14px", padding:"12px", border:"1px solid #222"}}><div style={{fontSize:"10px", color:"#666"}}>HAIL RISK 7D</div><div style={{color:"#00FF88", fontWeight:"900"}}>12% LOW</div></div>
            </div>
          </div>
        </div>

        <div style={{marginTop:"24px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"14px"}}>
          {tools.map(t=>(
            <button key={t.id} onClick={()=>setOpenTool(t)} style={{textAlign:"left", background:"#111", border:"1px solid #222", borderRadius:"20px", padding:"18px", color:"white"}}>
              <div style={{fontSize:"10px", color:t.color, fontWeight:"900"}}>{t.id} • {t.badge} ●</div>
              <div style={{fontSize:"13px", fontWeight:"800", marginTop:"6px"}}>{t.name}</div>
              <div style={{fontSize:"11px", color:"#666", marginTop:"10px"}}>Click to launch AI →</div>
            </button>
          ))}
        </div>
      </div>

      {showWelcome && (
        <div style={{position:"fixed", bottom:"20px", right:"20px", width:"360px", background:"#111", border:"1px solid #D4AF37", borderRadius:"24px", boxShadow:"0 20px 60px rgba(0,0,0,0.8)", zIndex:50, overflow:"hidden"}}>
          <div style={{background:"#D4AF37", color:"black", padding:"12px 16px", fontWeight:"900", fontSize:"12px", display:"flex", justifyContent:"space-between"}}><span>VENUS AI — ONLINE</span><button onClick={()=>setShowWelcome(false)} style={{background:"black", color:"#D4AF37", borderRadius:"999px", width:"24px", height:"24px", border:"0"}}>✕</button></div>
          <div style={{padding:"16px", fontSize:"13px", lineHeight:"1.5"}}>👋 Hey! I'm your AI for <b>{biz}</b>.<br/><br/>I just finished scanning: 2,400 sq ft, GAF HDZ, Section B 98% wear. Want me to show you the damage map or instant quote?<br/><br/><button onClick={()=>{setOpenTool(tools[0]); setShowWelcome(false);}} style={{background:"white", color:"black", padding:"10px 16px", borderRadius:"999px", fontWeight:"800", border:"0", fontSize:"12px"}}>▶ SHOW DRONE SCAN</button></div>
        </div>
      )}

      {openTool && (
        <div style={{position:"fixed", inset:"0", background:"rgba(0,0,0,0.92)", zIndex:60, display:"flex", flexDirection:"column"}}>
          <div style={{padding:"16px 24px", borderBottom:"1px solid #222", display:"flex", justifyContent:"space-between", alignItems:"center"}}><div style={{color:"#D4AF37", fontWeight:"900"}}>{openTool.id} / {openTool.name}</div><button onClick={()=>setOpenTool(null)} style={{background:"#222", color:"white", width:"40px", height:"40px", borderRadius:"999px", border:"0"}}>✕</button></div>
          <div style={{flex:1, padding:"24px", overflow:"auto", maxWidth:"800px", margin:"0 auto", width:"100%"}}>
            {openTool.id==="01" && (<div><canvas ref={canvasRef} width={400} height={200} style={{width:"100%", background:"#0a0a0a", borderRadius:"16px", border:"1px solid #222"}}/><div style={{marginTop:"16px", background:"#111", padding:"16px", borderRadius:"16px", border:"1px solid #222"}}><div style={{color:"#00FF88"}}>● LIVE: Drone at 120ft • Scanning...</div><div style={{marginTop:"10px", fontSize:"12px", color:"#aaa"}}>Section B: 98% granule loss • Recommend replacement in 14 days • No active leaks</div><button style={{marginTop:"12px", background:"#D4AF37", color:"black", padding:"10px 20px", borderRadius:"999px", fontWeight:"900", border:"0"}}>📄 Download Scan PDF</button></div></div>)}
            {openTool.id==="02" && (<div><div onClick={()=>setUploaded(true)} style={{border:"2px dashed #D4AF37", borderRadius:"20px", padding:"40px", textAlign:"center", background:"#111", cursor:"pointer"}}>{uploaded? "✅ AI DETECTED: 3 damages (92% confidence) • Wind lift at ridge" : "📸 Drop roof photo here or click to upload"}<br/><span style={{fontSize:"11px", color:"#666"}}>AI Vision • Instant • No signup</span></div>{uploaded && <div style={{marginTop:"16px", position:"relative"}}><img src="https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600" style={{width:"100%", borderRadius:"16px"}}/><div style={{position:"absolute", top:"30%", left:"40%", border:"2px solid #FF3B30", width:"80px", height:"40px", borderRadius:"6px"}}><span style={{background:"#FF3B30", color:"white", fontSize:"9px", padding:"2px 6px", position:"absolute", top:"-14px"}}>WIND 92%</span></div></div>}</div>)}
            {openTool.id==="03" && (<div><div style={{background:"#111", padding:"20px", borderRadius:"20px", border:"1px solid #222"}}><div style={{display:"flex", justifyContent:"space-between"}}><span>Sq Ft: {quote.sqft}</span><input type="range" min={1200} max={4000} value={quote.sqft} onChange={e=>setQuote(q=>({...q,sqft:+e.target.value, price:Math.round((+e.target.value)*5.2)}))}/></div><div style={{marginTop:"20px", fontSize:"32px", fontWeight:"900", color:"#D4AF37"}}>${quote.price.toLocaleString()}</div><div style={{fontSize:"12px", color:"#666"}}>Includes GAF HDZ + Labor + 10yr warranty • Houston 77002</div><button style={{marginTop:"16px", background:"white", color:"black", width:"100%", padding:"14px", borderRadius:"999px", fontWeight:"900", border:"0"}}>💬 Send Quote to Customer</button></div></div>)}
            {openTool.id==="04" && (<div><div style={{height:"200px", background:"radial-gradient(circle at 50% 50%, #0A84FF22, #000)", borderRadius:"20px", border:"1px solid #222", display:"flex", alignItems:"center", justifyContent:"center"}}><div style={{width:"120px", height:"120px", border:"2px solid #0A84FF", borderRadius:"50%", borderTopColor:"transparent", animation:"spin 2s linear infinite"}}/></div><div style={{marginTop:"16px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px"}}>{["Today 2%","Tomorrow 5%","7-Day 12%"].map(x=><div key={x} style={{background:"#111", padding:"12px", borderRadius:"14px", textAlign:"center", border:"1px solid #222", fontSize:"12px"}}>{x}</div>)}</div></div>)}
            {openTool.id==="05" && (<div style={{textAlign:"center"}}><div style={{background:"#111", padding:"32px", borderRadius:"24px", border:"1px solid #D4AF37"}}><div style={{fontSize:"48px"}}>✓</div><div style={{fontWeight:"900", marginTop:"10px"}}>GAF TIMBERLINE HDZ</div><div style={{color:"#D4AF37"}}>Verified • Blockchain • Valid Oct 2033</div><div style={{fontSize:"10px", color:"#666", marginTop:"12px"}}>ROC #AZR-208765 • Transferable</div><button style={{marginTop:"20px", background:"#D4AF37", color:"black", padding:"12px 24px", borderRadius:"999px", fontWeight:"900", border:"0"}}>⬇ Download Warranty PDF</button></div></div>)}
          </div>
        </div>
      )}
      <style>{`@keyframes scan{0%{transform:translateY(0)}100%{transform:translateY(180px)}} @keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}
