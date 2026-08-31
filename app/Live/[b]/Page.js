
"use client";
import { useState } from "react";

export default function LivePage({ params, searchParams }) {
  const business = params?.b || "arizonanativeroofing.com";
  const conf = searchParams?.conf || "VENUS-2026-HOU-497";
  const oldDomain = searchParams?.old || "houstonroofing2008.biz";
  const activatedDate = "Aug 31, 2026";
  const [activeTool, setActiveTool] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const tools = [
    { id: "01", name: "AI INSPECTION", status: "ACTIVE", desc: "DRONE + SATELLITE SCAN", value: "98% Section B Complete", detail: "Houston 77002 • 2,400 sq ft • GAF HDZ • No active leaks", initialMsg: "SCAN COMPLETE: Houston 77002 • 2,400 sq ft • GAF HDZ • 0 active leaks. Section B at 98%. Thermal shows ridge vent at 4% wear - monitor only." },
    { id: "02", name: "DAMAGE ESTIMATOR", status: "READY", desc: "VISION AI • PHOTO ANALYSIS", value: "$1,240 wind estimate", detail: "Upload roof photo • AI estimates in 12 sec", initialMsg: "DAMAGE ESTIMATE READY: Wind damage $1,240. Shingle replacement (32 sq ft) $680, Ridge cap $210, Labor $350. Insurance PDF ready." },
    { id: "03", name: "WARRANTY TRACKER", status: "VALID", desc: "GAF TIMBERLINE HDZ", value: "Valid until Oct 2033", detail: "Claim-ready docs pre-generated", initialMsg: "WARRANTY: GAF Timberline HDZ valid until Oct 2033 (7.2 yrs remaining). Claim docs pre-generated. ROC #AZR-208765." },
    { id: "04", name: "WEATHER RISK", status: "12% RISK", desc: "7-DAY HAIL FORECAST", value: "12% next 7 days", detail: "Storm alerts ON • Houston node active", initialMsg: "WEATHER RISK: Hail risk 12% next 7 days. Wind 15mph avg. Next storm Sep 3-4. Alerts ON." },
    { id: "05", name: "MATERIAL OPTIMIZER", status: "SAVE 18%", desc: "IMPACT-RATED RECOMMENDATION", value: "Save 18% annual", detail: "Class 4 shingle reduces insurance 18%", initialMsg: "MATERIAL PLAN: Class 4 impact-rated shingle saves 18% insurance ($420/yr). Current GAF HDZ at 96% efficiency." }
  ];

  const openTool = (tool) => {
    setActiveTool(tool);
    if (!messages[tool.id]) {
      setMessages(prev => ({ ...prev, [tool.id]: [
        { role: "ai", text: `${business.toUpperCase()} AI — Online. Houston monitoring active.` },
        { role: "ai", text: tool.initialMsg }
      ]}));
    }
  };

  const sendMessage = () => {
    if (!input.trim() || !activeTool) return;
    const userMsg = input; setInput("");
    setMessages(prev => ({ ...prev, [activeTool.id]: [...(prev[activeTool.id]||[]), { role: "user", text: userMsg }] }));
    setTimeout(() => {
      let reply = "";
      const q = userMsg.toLowerCase();
      if (activeTool.id === "01") {
        if (q.includes("leak")) reply = "Leak check: Section B - 0 leaks, Section A dry, attic 12% moisture normal. Last rain Aug 28 - no intrusion.";
        else reply = "Inspection: Roof healthy 2,400 sq ft GAF HDZ 2021, 4% ridge wear. Want drone flyover or PDF report?";
      } else if (activeTool.id === "02") reply = `For "${userMsg}": $1,240 estimate. Upload photo to refine with Vision AI. Generate insurance packet?`;
      else if (activeTool.id === "03") reply = `Warranty covers "${userMsg}" - Yes valid until Oct 2033. Docs ready in portal.`;
      else if (activeTool.id === "04") reply = `Weather: No action for "${userMsg}" today. Risk 12%. Auto alert if >60%.`;
      else reply = `Material: For "${userMsg}" - Class 4 upgrade saves $420/yr. ROI 3.2 yrs.`;
      setMessages(prev => ({ ...prev, [activeTool.id]: [...(prev[activeTool.id]||[]), { role: "ai", text: reply }] }));
    }, 600);
  };

  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"white",fontFamily:"monospace"}}>
      <div style={{background:"#D4AF37",color:"black",textAlign:"center",padding:"8px",fontSize:"11px",fontWeight:"bold",letterSpacing:"2px"}}>● LIVE • ACTIVATED {activatedDate.toUpperCase()} • CONF {conf} • {oldDomain.toUpperCase()} → {business.toUpperCase()} • 1-YEAR AI MONITORING</div>
      <div style={{borderBottom:"1px solid #1a1a1a",padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",gap:"16px",alignItems:"center"}}><div style={{width:"48px",height:"48px",background:"#D4AF37",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",color:"black",fontWeight:"900",fontSize:"20px"}}>A</div><div><div style={{fontWeight:"900",fontSize:"18px"}}>{business.toUpperCase()}</div><div style={{fontSize:"11px",letterSpacing:"3px",color:"#666",marginTop:"4px"}}>HOUSTON ROOFING • 2026 • EST 2008</div></div></div>
        <div style={{background:"#D4AF37",color:"black",padding:"10px 20px",borderRadius:"999px",fontSize:"12px",fontWeight:"900",letterSpacing:"2px"}}>Client Portal</div>
      </div>
      <div style={{padding:"40px 24px",maxWidth:"900px",margin:"0 auto"}}>
        <div style={{border:"1px solid rgba(212,175,55,0.3)",borderRadius:"28px",padding:"32px",background:"#111"}}>
          <div style={{background:"#D4AF37",color:"black",display:"inline-block",padding:"8px 20px",borderRadius:"999px",fontSize:"12px",fontWeight:"900",letterSpacing:"1px",marginBottom:"24px"}}>PREMIUM — ACTIVATED • Live since {activatedDate} • 1-Year AI Monitoring Active</div>
          <h1 style={{fontSize:"40px",fontWeight:"900",lineHeight:"0.9",letterSpacing:"-1px",marginBottom:"16px"}}>AI ROOFING DESIGN & PLAN<br/><span style={{color:"#D4AF37"}}>LIVE BUSINESS SITE</span></h1>
          <p style={{color:"#888",fontSize:"14px",lineHeight:"1.6",maxWidth:"600px",marginBottom:"32px"}}>This is your activated live site — not a proposal. Full AI stack running on Houston node. CONF {conf} • Activated {activatedDate}.</p>
          <div style={{fontSize:"14px",lineHeight:"2"}}><div>✓ Full AI Roof Inspection & Report — Active</div><div>✓ Warranty Tracking & Claim-Ready Docs — Valid until Oct 2033</div><div>✓ 24/7 Damage Alerts + Weather Monitoring — Houston Node</div><div>✓ Priority Scheduling — Client Portal Live</div><div>✓ Annual Material Optimization — Save 18% enabled</div></div>
        </div>
        <div style={{marginTop:"32px",display:"grid",gap:"16px"}}>
          {tools.map(t => (
            <button key={t.id} onClick={() => openTool(t)} style={{textAlign:"left",border:"1px solid #222",borderRadius:"16px",padding:"20px",background:"#111",display:"flex",justifyContent:"space-between",width:"100%",color:"white"}}>
              <div><div style={{fontSize:"10px",color:"#666",letterSpacing:"2px"}}>{t.id} / {t.name} • {t.status}</div><div style={{fontSize:"12px",color:"#D4AF37",marginTop:"4px"}}>{t.desc}</div><div style={{fontSize:"13px",color:"#888",marginTop:"8px"}}>{t.detail}</div></div>
              <div style={{textAlign:"right"}}><div style={{color:"#D4AF37",fontWeight:"bold"}}>{t.value}</div><div style={{fontSize:"11px",color:"#666",marginTop:"4px"}}>Tap →</div></div>
            </button>
          ))}
        </div>
      </div>
      {activeTool && (
        <div style={{position:"fixed",inset:"0",background:"rgba(0,0,0,0.9)",zIndex:"50",display:"flex",flexDirection:"column"}}>
          <div style={{borderBottom:"1px solid #222",padding:"16px 24px",display:"flex",justifyContent:"space-between",background:"#0a0a0a"}}>
            <div><div style={{color:"#D4AF37",fontSize:"12px",letterSpacing:"2px"}}>{activeTool.id} / {activeTool.name}</div><div style={{fontSize:"10px",color:"#666"}}>LIVE • {conf}</div></div>
            <button onClick={() => setActiveTool(null)} style={{width:"40px",height:"40px",borderRadius:"999px",background:"#222",color:"white"}}>✕</button>
          </div>
          <div style={{flex:"1",overflowY:"auto",padding:"24px",maxWidth:"800px",margin:"0 auto",width:"100%",display:"flex",flexDirection:"column",gap:"16px"}}>
            {(messages[activeTool.id]||[]).map((m,i) => (
              <div key={i} style={{maxWidth:"85%",borderRadius:"16px",padding:"16px 20px",fontSize:"13px",lineHeight:"1.6",background: m.role==="user" ? "#D4AF37" : "#1a1a1a", color: m.role==="user" ? "black" : "white", marginLeft: m.role==="user" ? "auto" : "0", border: m.role==="ai" ? "1px solid #222" : "none"}}>{m.text}</div>
            ))}
          </div>
          <div style={{borderTop:"1px solid #222",padding:"16px",background:"#0a0a0a"}}>
            <div style={{maxWidth:"800px",margin:"0 auto",display:"flex",gap:"12px"}}>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder={`Ask about ${activeTool.name.toLowerCase()}...`} style={{flex:"1",background:"#111",border:"1px solid #222",borderRadius:"999px",padding:"14px 24px",color:"white",outline:"none"}} />
              <button onClick={sendMessage} style={{background:"#D4AF37",color:"black",padding:"0 32px",borderRadius:"999px",fontWeight:"900",fontSize:"12px"}}>SEND</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
