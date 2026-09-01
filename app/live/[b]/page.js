"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
export default function Page(){
  const params = useParams();
  const b = params?.b;
  const biz = Array.isArray(b) ? b[b.length-1] : b || "arizonanativeroofing.com";
  const [sqft,setSqft]=useState(2400);
  const [chatOpen,setChatOpen]=useState(false);
  const [messages,setMessages]=useState([{role:'sarah',text:"Hey hey! 👋 I'm Sarah from "+biz+" — real person. How's your roof?"}]);
  const [input,setInput]=useState("");
  const [typing,setTyping]=useState(false);
  const [whatsApp,setWhatsApp]=useState("");
  const [ticket,setTicket]=useState(null);
  const [d1,setD1]=useState(false); const [d2,setD2]=useState(false);
  const chatRef=useRef(null);
  const price=Math.round(sqft*5.2);
  const send=()=>{
    if(!input.trim()) return;
    const t=input; setMessages(m=>[...m,{role:'user',text:t}]); setInput(""); setTyping(true);
    setTimeout(()=>{setTyping(false); setMessages(m=>[...m,{role:'sarah',text:"Got it — sounds like Section B wear. Want me to run scan? Drop WhatsApp for ticket VENUS-XXXX, owner notified instantly!"}]);},900);
  };
  useEffect(()=>{ if(chatRef.current) chatRef.current.scrollTop=chatRef.current.scrollHeight; },[messages, typing]);
  return(
    <div style={{minHeight:"100vh", background:"#faf8f3", color:"#111", fontFamily:"system-ui"}}>
      <style>{`@media(max-width:600px){.gridTools{grid-template-columns:1fr!important}.hero{font-size:28px!important}}`}</style>
      <div style={{maxWidth:"1140px", margin:"0 auto", padding:"20px"}}>
        <div style={{fontSize:"11px", letterSpacing:"2px", color:"#c19a4a", fontWeight:900}}>VENUS AI • {biz.toUpperCase()} • ROC VERIFIED</div>
        <h1 className="hero" style={{fontSize:"48px", fontWeight:900, lineHeight:0.95, marginTop:"18px"}}>Your roof.<br/><span style={{color:"#c19a4a", fontStyle:"italic"}}>Understood in 10 sec.</span></h1>
        <p style={{color:"#666", marginTop:"12px"}}>Mobile-friendly premium — 5 tools that close jobs.</p>
        
        <div className="gridTools" style={{marginTop:"24px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"16px"}}>
          <div style={{background:"white", border:"1px solid #e8e0c8", borderRadius:"24px", padding:"18px"}}>
            <div style={{fontSize:"10px", color:"#c19a4a", fontWeight:900}}>01 • DRONE SCAN</div>
            <div style={{marginTop:"10px", height:"110px", background:"#f5f1e8", borderRadius:"12px", display:"grid", placeItems:"center", fontSize:"11px"}}>🛰️ 2,400 sq ft satellite<br/>Section B 98% wear</div>
            <h3 style={{marginTop:"12px", fontWeight:700}}>Live Drone Scan</h3>
            <button onClick={()=>setD1(!d1)} style={{marginTop:"10px", background:"black", color:"white", borderRadius:"999px", padding:"8px 16px", border:"0"}}>Try Demo →</button>
            {d1&&<div style={{marginTop:"8px", fontSize:"12px", background:"#faf8f3", padding:"8px", borderRadius:"8px"}}>Scanned • PDF ready</div>}
          </div>

          <div style={{background:"white", border:"1px solid #e8e0c8", borderRadius:"24px", padding:"18px"}}>
            <div style={{fontSize:"10px", color:"#c19a4a", fontWeight:900}}>02 • DAMAGE AI</div>
            <div style={{marginTop:"10px", height:"110px", background:"#111", borderRadius:"12px", display:"grid", placeItems:"center", color:"white", fontSize:"11px"}}>🔴 Red boxes 92%<br/>$1,240 est</div>
            <h3 style={{marginTop:"12px", fontWeight:700}}>Damage AI Vision</h3>
            <button onClick={()=>setD2(!d2)} style={{marginTop:"10px", background:"black", color:"white", borderRadius:"999px", padding:"8px 16px", border:"0"}}>Try Demo →</button>
            {d2&&<div style={{marginTop:"8px", fontSize:"12px", background:"#faf8f3", padding:"8px", borderRadius:"8px"}}>92% • 3 damages • $1,240</div>}
          </div>

          <div style={{background:"white", border:"1px solid #e8e0c8", borderRadius:"24px", padding:"18px"}}>
            <div style={{fontSize:"10px", color:"#c19a4a", fontWeight:900}}>03 • QUOTE</div>
            <div style={{marginTop:"10px", background:"#faf8f3", borderRadius:"12px", padding:"12px", border:"1px solid #e8e0c8"}}>
              <div style={{fontSize:"22px", fontWeight:900}}>${price.toLocaleString()}</div>
              <div style={{fontSize:"11px", color:"#666"}}>{sqft} sq ft • GAF HDZ</div>
              <input type="range" min={1200} max={4000} value={sqft} onChange={e=>setSqft(Number(e.target.value))} style={{width:"100%", marginTop:"6px"}}/>
            </div>
            <h3 style={{marginTop:"12px", fontWeight:700}}>Instant Quote</h3>
          </div>

          <div style={{background:"white", border:"1px solid #e8e0c8", borderRadius:"24px", padding:"18px"}}>
            <div style={{fontSize:"10px", color:"#c19a4a", fontWeight:900}}>04 • WEATHER</div>
            <div style={{marginTop:"10px", height:"110px", background:"#0f1115", borderRadius:"12px", display:"grid", placeItems:"center", color:"white"}}>12% WATCH • Hail</div>
            <h3 style={{marginTop:"12px", fontWeight:700}}>Weather Shield</h3>
          </div>

          <div style={{background:"#111", borderRadius:"24px", padding:"18px", color:"white"}}>
            <div style={{fontSize:"10px", color:"#c19a4a", fontWeight:900}}>05 • WARRANTY</div>
            <div style={{marginTop:"10px", height:"110px", background:"rgba(255,255,255,0.06)", borderRadius:"12px", display:"grid", placeItems:"center"}}>✓ Gold Seal • Till 2033</div>
            <h3 style={{marginTop:"12px", fontWeight:700}}>Warranty Vault</h3>
          </div>

          <div style={{background:"#111", borderRadius:"24px", padding:"18px", color:"white", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div><div style={{fontSize:"10px", letterSpacing:"1px", color:"rgba(255,255,255,0.4)"}}>GET TICKET</div><h3 style={{fontSize:"22px", marginTop:"8px"}}>Crew calls in 30 mins.</h3></div>
            <div style={{background:"white", borderRadius:"16px", padding:"12px", marginTop:"14px"}}>
              {!ticket ? (
                <>
                <div style={{display:"flex", gap:"6px"}}><div style={{background:"#faf8f3", border:"1px solid #e8e0c8", borderRadius:"999px", padding:"8px 12px", fontSize:"12px"}}>🇺🇸 +1</div><input value={whatsApp} onChange={e=>setWhatsApp(e.target.value)} placeholder="WhatsApp" style={{flex:1, borderRadius:"999px", border:"1px solid #e8e0c8", padding:"8px 12px"}}/></div>
                <button onClick={()=>setTicket("VENUS-"+Math.floor(1000+Math.random()*9000))} style={{marginTop:"10px", width:"100%", background:"black", color:"white", borderRadius:"999px", padding:"10px", border:"0"}}>Get Ticket + WhatsApp →</button>
                </>
              ):(
                <div style={{textAlign:"center", color:"black"}}><div style={{width:"32px", height:"32px", background:"#22c55e", borderRadius:"999px", display:"grid", placeItems:"center", margin:"0 auto", color:"white"}}>✓</div><div style={{marginTop:"8px", fontWeight:700}}>{ticket}</div><div style={{fontSize:"11px", color:"#666"}}>WhatsApp sent • ETA 30m</div></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button onClick={()=>setChatOpen(!chatOpen)} style={{position:"fixed", bottom:"20px", right:"20px", width:"56px", height:"56px", borderRadius:"999px", background:"#111", color:"#c19a4a", border:"2px solid #c19a4a", zIndex:50}}>{chatOpen?"X":"S"}</button>
      {chatOpen&&(
        <div style={{position:"fixed", bottom:"88px", right:"20px", width:"92vw", maxWidth:"340px", background:"white", border:"1px solid #e8e0c8", borderRadius:"20px", display:"flex", flexDirection:"column", height:"min(420px,60vh)", zIndex:50, boxShadow:"0 20px 40px rgba(0,0,0,0.2)"}}>
          <div style={{background:"black", color:"white", padding:"12px 14px", borderRadius:"20px 20px 0 0", display:"flex", justifyContent:"space-between"}}><span style={{fontSize:"12px"}}>Sarah • Real • Online</span><button onClick={()=>setChatOpen(false)} style={{background:"rgba(255,255,255,0.15)", border:"0", color:"white", width:"24px", height:"24px", borderRadius:"999px"}}>X</button></div>
          <div ref={chatRef} style={{flex:1, overflow:"auto", padding:"12px", display:"flex", flexDirection:"column", gap:"8px", background:"#faf8f3"}}>
            {messages.map((m,i)=>(<div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start", background:m.role==="user"?"black":"white", color:m.role==="user"?"white":"black", border:m.role==="sarah"?"1px solid #e8e0c8":"0", padding:"10px 14px", borderRadius:"16px", fontSize:"13px", maxWidth:"80%"}}>{m.text}</div>))}
            {typing&&<div style={{fontSize:"11px", color:"#999"}}>Sarah is typing…</div>}
          </div>
          <div style={{padding:"10px", borderTop:"1px solid #e8e0c8", display:"flex", gap:"8px"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Hi Sarah..." style={{flex:1, background:"#faf8f3", border:"1px solid #e8e0c8", borderRadius:"999px", padding:"10px 14px"}}/>
            <button onClick={send} style={{background:"black", color:"white", border:"0", borderRadius:"999px", padding:"0 16px"}}>↑</button>
          </div>
        </div>
      )}
    </div>
  );
}
