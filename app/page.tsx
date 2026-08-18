"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({usSylvia:57, saFaisal:34, usKenji:0, saFaisalCloser:0, real:0, luna:18, rex:9});

  useEffect(()=>{
    // load old counts
    const saved = localStorage.getItem("venus_live_counts");
    if(saved){ setData(JSON.parse(saved)); }
    
    // call autonomous agent and increase count
    fetch("/api/run-agents").then(r=>r.json()).then(res=>{
      if(res.ok && res.brevo?.messageId){
        setData(prev=>{
          const next = {...prev, usKenji: prev.usKenji+1, real: prev.real+1};
          localStorage.setItem("venus_live_counts", JSON.stringify(next));
          return next;
        });
      }
    });
  },[]);

  return (
    <div style={{padding:20,fontFamily:"Arial",background:"#fff",minHeight:"100vh"}}>
      <h2>VENUS AGENT HQ - {new Date().toLocaleString()}</h2>
      <p>SMART Mode. Browse, contact, find real email, ping MX, then send - No bounce via Brevo ron@venushq7.com</p>
      
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,marginTop:20}}>
        <div style={{borderLeft:"4px solid #0066ff",paddingLeft:10}}>US Sylvia USA<br/><b>{data.usSylvia} found</b></div>
        <div style={{borderLeft:"4px solid #00aa66",paddingLeft:10}}>SA Faisal KSA<br/><b>{data.saFaisal} found</b></div>
        <div style={{borderLeft:"4px solid #ff4444",paddingLeft:10}}>Luna Web<br/><b>{data.luna} designs</b></div>
        
        <div style={{borderLeft:"4px solid #0066ff",paddingLeft:10}}>US Kenji Closer<br/><b>{data.usKenji} sent</b></div>
        <div style={{borderLeft:"4px solid #00aa66",paddingLeft:10}}>SA Faisal Closer<br/><b>{data.saFaisalCloser} sent</b></div>
        <div style={{borderLeft:"4px solid #aa00ff",paddingLeft:10}}>Rex Video<br/><b>{data.rex} videos</b></div>
      </div>

      <p style={{marginTop:30, fontSize:18}}>
        Real Emails Sent: <b>{data.real}</b> | Mode: SMART scrape+ping<br/>
        Flow: Browse site - Scrape /contact for REAL email - Ping MX - Send only if valid
      </p>

      <button onClick={()=>{localStorage.clear(); location.reload();}} style={{marginTop:20,padding:"10px 20px",background:"#000",color:"#fff",border:"none",cursor:"pointer"}}>Reset Counts</button>
    </div>
  );
}


