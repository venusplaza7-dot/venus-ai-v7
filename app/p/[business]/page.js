"use client";
import { useParams } from "next/navigation";

export default function Page(){
  const params = useParams();
  const b = params?.business || "houston-elite-plumber";
  const n = b.replace(/-/g," ").toUpperCase();
  const oldUrl = `https://${b}.com`;

  return (
    <div style={{background:"#0a0a0a",minHeight:"100vh",color:"#fff",fontFamily:"Helvetica",padding:"50px 20px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <p style={{color:"#FF6B00",fontSize:11,letterSpacing:4,fontWeight:800}}>VENUS HQ — LUXURY 2026</p>
        
        <h1 style={{fontSize:72,lineHeight:0.9,fontWeight:900,marginTop:20}}>{n}<br/>LUXURY<br/><span style={{color:"#FF6B00"}}>PLUMBER.</span></h1>
        
        <p style={{color:"#AAA",marginTop:20,fontSize:18}}>We rebuild <a href={oldUrl} target="_blank" style={{color:"#A8FF53",textDecoration:"underline"}}>{b}.com</a> — unchanged since 2018 — into Gen-Z luxury with AI. Ready in 24h.</p>

        {/* OLD WEBSITE LINK THAT WORKS */}
        <div style={{marginTop:30,padding:"20px",background:"#111",border:"1px solid #333",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <p style={{color:"#FF6B00",fontSize:10,letterSpacing:3,fontWeight:800}}>CURRENT — 2018 — LIVE NOW</p>
            <p style={{fontSize:20,fontWeight:700,marginTop:6}}>{b}.com — Old Site</p>
          </div>
          <a href={oldUrl} target="_blank" style={{background:"#fff",color:"#000",padding:"14px 28px",textDecoration:"none",fontWeight:800,fontSize:13}}>OPEN OLD SITE ↗</a>
        </div>

        {/* WHAT WE WILL ADD */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,marginTop:40,border:"1px solid #222"}}>
          <div style={{background:"#151515",padding:40}}>
            <p style={{color:"#FF6B00",fontSize:11,letterSpacing:3,fontWeight:800}}>CURRENT — SLOW — 2018</p>
            <h2 style={{fontSize:36,fontWeight:800,marginTop:10,color:"#666"}}>SLOW</h2>
            <p style={{color:"#888",marginTop:20,lineHeight:2}}>- Legacy boring layout<br/>- 3-5s load time<br/>- No AI, No Quote<br/>- Looks like 2018</p>
          </div>
          <div style={{background:"#FFFFFF",color:"#000",padding:40}}>
            <p style={{color:"#FF6B00",fontSize:11,letterSpacing:3,fontWeight:800}}>PROPOSAL — 2026 LUXURY — VENUS</p>
            <h2 style={{fontSize:36,fontWeight:900,marginTop:10}}>FAST</h2>
            <div style={{marginTop:20,lineHeight:2.2,fontWeight:700}}>
              ✓ Gen-Z Luxury B&W + Orange<br/>
              ✓ AI Concierge 24/7 (Answers jobs)<br/>
              ✓ Visual Quote (Upload photo → Price)<br/>
              ✓ Voice Ops (Hey Venus, book plumber)<br/>
              ✓ 0.8s Load + Mobile First<br/>
              ✓ WhatsApp → Direct Booking
            </div>
          </div>
        </div>

        <div style={{background:"#000",padding:70,textAlign:"center",marginTop:40,border:"1px solid #222"}}>
          <p style={{color:"#FF6B00",letterSpacing:4,fontSize:11,fontWeight:800}}>INVITATION — 24H LAUNCH</p>
          <h2 style={{fontSize:48,fontWeight:900,marginTop:20}}>Launch {n}<br/>within 24h.</h2>
          <a href="https://wa.me/17865880578" style={{display:"inline-block",marginTop:35,background:"#A8FF53",color:"#000",padding:"22px 44px",textDecoration:"none",fontWeight:900,letterSpacing:2}}>CONFIRM VIA WHATSAPP</a>
          <p style={{color:"#666",fontSize:12,marginTop:16}}>We keep your old domain {b}.com — just luxury rebuild</p>
        </div>

      </div>
    </div>
  );
}