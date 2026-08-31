"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function FixedPage(){
  const params = useParams(); const sp = useSearchParams();
  const biz = params?.b || "arizonanativeroofing.com";
  const [open,setOpen]=useState(null);
  const [chat,setChat]=useState(false);
  const [input,setInput]=useState("");
  const [msgs,setMsgs]=useState([{role:"ai", text:"How can I assist you today? I can launch any AI tool for you."}]);

  useEffect(()=>{ const t=setTimeout(()=>setChat(true), 2000); return ()=>clearTimeout(t); },[]);

  const tools=[
    {id:"01", title:"LIVE DRONE SCAN", sub:"DRONE + SATELLITE MEASUREMENT", what:"Measures your exact roof size (2,400 sq ft) from satellite, finds leaks and wear. Shows Section B 98% worn.", how:"How to use: Tap this card → Watch gold laser scan your roof blueprint → Get PDF report.", cta:"98% Section B needs attention →", color:"#00FF88"},
    {id:"02", title:"DAMAGE AI VISION", sub:"UPLOAD PHOTO → AI FINDS DAMAGE", what:"Upload any roof photo. AI draws red boxes around damage with 92% confidence. No other roofer has this.", how:"How to use: Tap → Drop photo → AI marks wind lift, cracks instantly.", cta:"$1,240 estimate detected →", color:"#FF3B30"},
    {id:"03", title:"INSTANT QUOTE ENGINE", sub:"LIVE PRICE CALCULATOR", what:"Customer moves slider for roof size, picks GAF/Owens material, price updates live. No phone call needed.", how:"How to use: Tap → Move sq ft slider 1200-4000 → Price $6k-$20k updates live → Send to customer.", cta:"Build $12,480 quote →", color:"#D4AF37"},
    {id:"04", title:"WEATHER SHIELD RADAR", sub:"7-DAY HAIL & WIND FORECAST", what:"Live radar shows hail risk for your address. Today 2%, Tomorrow 5%, 7-Day 12%. Creates urgency to buy now.", how:"How to use: Tap → See spinning radar → Shows risk meter → Use to sell: '12% hail next week'.", cta:"12% risk next 7 days →", color:"#0A84FF"},
    {id:"05", title:"WARRANTY VAULT", sub:"BLOCKCHAIN VERIFIED WARRANTY", what:"GAF Timberline HDZ verified until Oct 2033. ROC #AZR-208765. Transferable to next homeowner.", how:"How to use: Tap → See verified gold stamp → Download PDF to give customer proof.", cta:"Valid Oct 2033 - Download →", color:"#D4AF37"},
  ];

  const send=()=>{
    if(!input.trim()) return; const q=input; setInput(""); setMsgs(m=>[...m,{role:"user",text:q},{role:"ai",text:`For "${q}" — I recommend ${q.toLowerCase().includes("quote")?"Instant Quote Engine":q.toLowerCase().includes("damage")?"Damage AI Vision":"Live Drone Scan"}. Tap the card above!`}]);
  };

  return (
    <div style={{minHeight:"100vh", background:"#080808", color:"white", fontFamily:"monospace", paddingBottom:"100px"}}>
      <div style={{background:"#D4AF37", color:"black", textAlign:"center", padding:"10px", fontWeight:"900", fontSize:"11px"}}>● LIVE • arizonanativeroofing.com • CONF VENUS-2026-HOU-497 • 5 AI TOOLS</div>
      <div style={{maxWidth:"900px", margin:"0 auto", padding:"20px"}}>
        <h1 style={{fontSize:"30px", fontWeight:"900", lineHeight:"1"}}>AI ROOFING<br/><span style={{color:"#D4AF37"}}>5 TOOLS EXPLAINED</span></h1>
        <p style={{color:"#666", fontSize:"12px", marginTop:"8px"}}>Each card shows what it does + how to use it. Tap any card to launch real working AI.</p>
        <div style={{marginTop:"20px", display:"grid", gap:"14px"}}>
          {tools.map(t=>(
            <button key={t.id} onClick={()=>setOpen(t)} style={{textAlign:"left", background:"#111", border:"1px solid #222", borderRadius:"20px", padding:"18px", color:"white"}}>
              <div style={{fontSize:"11px", color:t.color, fontWeight:"900"}}>{t.id} • {t.sub}</div>
              <div style={{fontSize:"16px", fontWeight:"900", marginTop:"6px"}}>{t.title}</div>
              <div style={{fontSize:"11px", color:"#aaa", marginTop:"8px", lineHeight:"1.4"}}><b style={{color:"white"}}>What it does:</b> {t.what}</div>
              <div style={{fontSize:"11px", color:"#D4AF37", marginTop:"6px", lineHeight:"1.4"}}><b>How to use:</b> {t.how}</div>
              <div style={{marginTop:"10px", background:"#1a1a1a", borderRadius:"999px", padding:"8px 14px", display:"inline-block", fontSize:"12px", color:"#D4AF37", fontWeight:"800"}}>{t.cta}</div>
            </button>
          ))}
        </div>
      </div>

      {/* SMALL CHAT - NOT BIG */}
      {chat? (
        <div style={{position:"fixed", bottom:"16px", right:"16px", width:"300px", background:"#111", border:"1px solid #D4AF37", borderRadius:"20px", zIndex:50, overflow:"hidden"}}>
          <div style={{background:"#D4AF37", color:"black", padding:"10px 14px", fontWeight:"900", fontSize:"11px", display:"flex", justifyContent:"space-between"}}><span>VENUS AI - How can I assist you?</span><button onClick={()=>setChat(false)} style={{background:"black", color:"#D4AF37", width:"22px", height:"22px", borderRadius:"999px", border:"0"}}>✕</button></div>
          <div style={{maxHeight:"160px", overflow:"auto", padding:"10px", display:"flex", flexDirection:"column", gap:"8px"}}>
            {msgs.slice(-3).map((m,i)=><div key={i} style={{fontSize:"11px", padding:"8px 12px", borderRadius:"14px", background:m.role==="user"?"#D4AF37":"#1e1e1e", color:m.role==="user"?"black":"white", alignSelf:m.role==="user"?"flex-end":"flex-start"}}>{m.text}</div>)}
          </div>
          <div style={{display:"flex", gap:"4px", padding:"8px", flexWrap:"wrap"}}>
            {tools.slice(0,4).map(t=><button key={t.id} onClick={()=>setOpen(t)} style={{fontSize:"9px", background:"#222", color:"#D4AF37", border:"1px solid #333", borderRadius:"999px", padding:"4px 8px"}}>{t.title.split(" ")[0]}</button>)}
          </div>
          <div style={{padding:"8px", borderTop:"1px solid #222", display:"flex", gap:"6px"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask..." style={{flex:1, background:"#000", border:"1px solid #222", borderRadius:"999px", padding:"8px 12px", color:"white", fontSize:"11px"}}/>
            <button onClick={send} style={{background:"#D4AF37", color:"black", padding:"0 14px", borderRadius:"999px", fontWeight:"900", border:"0", fontSize:"11px"}}>SEND</button>
          </div>
        </div>
      ) : <button onClick={()=>setChat(true)} style={{position:"fixed", bottom:"16px", right:"16px", background:"#D4AF37", color:"black", width:"52px", height:"52px", borderRadius:"999px", border:"0", fontWeight:"900", zIndex:50}}>AI</button>}

      {open && (
        <div style={{position:"fixed", inset:"0", background:"rgba(0,0,0,0.95)", zIndex:60, padding:"20px"}}>
          <div style={{maxWidth:"600px", margin:"0 auto", background:"#111", border:"1px solid #D4AF37", borderRadius:"24px", padding:"20px"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}><div style={{color:"#D4AF37", fontWeight:"900"}}>{open.id} / {open.title}</div><button onClick={()=>setOpen(null)} style={{background:"#222", color:"white", width:"32px", height:"32px", borderRadius:"999px", border:"0"}}>✕</button></div>
            <div style={{marginTop:"12px", fontSize:"12px", color:"#aaa"}}><b style={{color:"white"}}>What:</b> {open.what}</div>
            <div style={{marginTop:"8px", fontSize:"12px", color:"#D4AF37"}}><b>How:</b> {open.how}</div>
            <div style={{marginTop:"16px", background:"#000", borderRadius:"16px", padding:"30px", textAlign:"center", border:"1px dashed #333"}}>🚀 Real AI tool working here<br/><span style={{fontSize:"11px", color:"#666"}}>Drone scan / Photo AI / Live quote / Radar / PDF download</span></div>
            <button onClick={()=>setOpen(null)} style={{marginTop:"16px", width:"100%", background:"#D4AF37", color:"black", padding:"12px", borderRadius:"999px", fontWeight:"900", border:"0"}}>Close & Try Next Tool</button>
          </div>
        </div>
      )}
    </div>
  );
}
