"use client";
import { useEffect, useState } from "react";
export default function Home(){
  const [stats,setStats]=useState({found:0,sent:0,details:[],time:"",loading:true});
  const load = async()=>{
    setStats(s=>({...s,loading:true}));
    const r = await fetch("/api/run-agents?t="+Date.now());
    const d = await r.json();
    setStats({found:d.real_found||0,sent:d.real_emails_sent||0,details:d.details||[],time:d.time||"",loading:false});
  };
  useEffect(()=>{ load(); },[]);
  return (
    <div style={{padding:20,fontFamily:"sans-serif",background:"#f5f5f5",minHeight:"100vh"}}>
      <h1>VENUS AGENT HQ - LIVE {new Date().toLocaleString()}</h1>
      <p style={{color:"green",fontWeight:"bold"}}>Mode: SMART - Scrape /contact → Real Email → Send - NO FAKE NUMBERS</p>
      <button onClick={load} style={{padding:"15px 30px",background:"#000",color:"#d4af37",fontSize:18,marginTop:10}}>🔄 RUN AGENTS NOW & SHOW REAL COUNT</button>
      {stats.loading? <p>Running Sylvia... scraping /contact...</p> : <>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:15,marginTop:20}}>
          <div style={{background:"#fff",padding:20,borderLeft:"6px solid blue"}}><h2>REAL FOUND: {stats.found}</h2><p>Scraped from /contact pages</p></div>
          <div style={{background:"#fff",padding:20,borderLeft:"6px solid green"}}><h2>REAL EMAILS SENT: {stats.sent}</h2><p>Checked in Gmail Sent</p></div>
        </div>
        <div style={{background:"#fff",padding:15,marginTop:20}}>
          <h3>Details (Real Emails From /contact):</h3>
          <pre style={{whiteSpace:"pre-wrap",fontSize:12}}>{JSON.stringify(stats.details,null,2)}</pre>
          <p>Last Run: {stats.time}</p>
        </div>
      </>}
    </div>
  );
}

