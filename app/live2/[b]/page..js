"use client";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function LivePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const business = params?.b || "arizonanativeroofing.com";
  const conf = searchParams.get("conf") || "VENUS-2026-HOU-497";
  const oldDomain = searchParams.get("old") || "houstonroofing2008.biz";
  const activatedDate = "Aug 31, 2026";
  const [activeTool, setActiveTool] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const tools = [
    { id: "01", name: "AI INSPECTION", status: "ACTIVE", desc: "DRONE + SATELLITE SCAN", value: "98% Section B", detail: "Houston 77002 • 2,400 sq ft", initialMsg: "SCAN COMPLETE: 2,400 sq ft GAF HDZ • 0 leaks • Section B 98% • Ridge 4% wear." },
    { id: "02", name: "DAMAGE ESTIMATOR", status: "READY", desc: "VISION AI", value: "$1,240 estimate", detail: "Upload photo • 12 sec", initialMsg: "ESTIMATE: Wind $1,240 - Shingle $680 Ridge $210 Labor $350. PDF ready." },
    { id: "03", name: "WARRANTY TRACKER", status: "VALID", desc: "GAF TIMBERLINE HDZ", value: "Valid Oct 2033", detail: "Claim docs ready", initialMsg: "WARRANTY: GAF HDZ valid until Oct 2033. 7.2 yrs left. ROC #AZR-208765." },
    { id: "04", name: "WEATHER RISK", status: "12% RISK", desc: "7-DAY HAIL", value: "12% next 7 days", detail: "Alerts ON", initialMsg: "WEATHER: Hail 12% next 7d, Wind 15mph, Storm Sep 3-4." },
    { id: "05", name: "MATERIAL OPTIMIZER", status: "SAVE 18%", desc: "IMPACT-RATED", value: "Save 18%", detail: "Class 4 saves $420/yr", initialMsg: "MATERIAL: Class 4 saves 18% ($420/yr). ROI 3.2yrs." }
  ];

  const openTool = (t) => {
    setActiveTool(t);
    if (!messages[t.id]) setMessages(p=>({...p,[t.id]:[{role:"ai",text:`${business.toUpperCase()} AI Online`},{role:"ai",text:t.initialMsg}]}));
  };
  const send = () => {
    if (!input.trim()||!activeTool) return;
    const u=input; setInput("");
    setMessages(p=>({...p,[activeTool.id]:[...(p[activeTool.id]||[]),{role:"user",text:u}]}));
    setTimeout(()=>setMessages(p=>({...p,[activeTool.id]:[...(p[activeTool.id]||[]),{role:"ai",text:"Processed. Want PDF report?"}]})),600);
  };

  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"white",fontFamily:"monospace"}}>
      <div style={{background:"#D4AF37",color:"black",textAlign:"center",padding:"10px",fontSize:"11px",fontWeight:"bold"}}>● LIVE • ACTIVATED {activatedDate.toUpperCase()} • CONF {conf} • 1-YEAR MONITORING</div>
      <div style={{padding:"32px 24px",maxWidth:"900px",margin:"0 auto"}}>
        <div style={{border:"1px solid #D4AF3755",borderRadius:"28px",padding:"32px",background:"#111"}}>
          <div style={{background:"#D4AF37",color:"black",display:"inline-block",padding:"8px 20px",borderRadius:"999px",fontSize:"12px",fontWeight:"900",marginBottom:"20px"}}>PREMIUM — ACTIVATED • {activatedDate}</div>
          <h1 style={{fontSize:"38px",fontWeight:"900",lineHeight:"0.9"}}>AI ROOFING DESIGN & PLAN<br/><span style={{color:"#D4AF37"}}>LIVE BUSINESS SITE</span></h1>
          <p style={{color:"#888",fontSize:"14px",marginTop:"16px"}}>CONF {conf} • {oldDomain} → {business} • 5 tools live, no loop, no $497</p>
          <div style={{marginTop:"20px",fontSize:"14px",lineHeight:"2"}}>✓ Inspection Active ✓ Warranty Valid Oct 2033 ✓ Weather Monitoring ✓ Portal Live ✓ Save 18%</div>
        </div>
        <div style={{marginTop:"24px",display:"grid",gap:"16px"}}>
          {tools.map(t=>(<button key={t.id} onClick={()=>openTool(t)} style={{textAlign:"left",border:"1px solid #222",borderRadius:"16px",padding:"20px",background:"#111",width:"100%",color:"white"}}><div style={{fontSize:"10px",color:"#666"}}>{t.id} / {t.name} • {t.status}</div><div style={{fontSize:"12px",color:"#D4AF37"}}>{t.desc}</div><div style={{color:"#D4AF37",marginTop:"8px",fontWeight:"bold"}}>{t.value} →</div></button>))}
        </div>
      </div>
      {activeTool && (
        <div style={{position:"fixed",inset:"0",background:"rgba(0,0,0,0.95)",zIndex:"50",display:"flex",flexDirection:"column"}}>
          <div style={{borderBottom:"1px solid #222",padding:"16px",display:"flex",justifyContent:"space-between"}}><div style={{color:"#D4AF37"}}>{activeTool.name}</div><button onClick={()=>setActiveTool(null)} style={{background:"#222",color:"white",borderRadius:"999px",width:"40px",height:"40px"}}>✕</button></div>
          <div style={{flex:"1",overflowY:"auto",padding:"20px",display:"flex",flexDirection:"column",gap:"12px"}}>{(messages[activeTool.id]||[]).map((m,i)=>(<div key={i} style={{maxWidth:"85%",borderRadius:"16px",padding:"14px 18px",fontSize:"13px",background:m.role==="user"?"#D4AF37":"#1a1a1a",color:m.role==="user"?"black":"white",marginLeft:m.role==="user"?"auto":"0"}}>{m.text}</div>))}</div>
          <div style={{borderTop:"1px solid #222",padding:"16px",display:"flex",gap:"12px"}}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask..." style={{flex:"1",background:"#111",border:"1px solid #222",borderRadius:"999px",padding:"12px 20px",color:"white"}}/><button onClick={send} style={{background:"#D4AF37",color:"black",padding:"0 24px",borderRadius:"999px",fontWeight:"900"}}>SEND</button></div>
        </div>
      )}
    </div>
  );
}
