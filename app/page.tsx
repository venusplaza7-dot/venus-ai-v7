'use client';
import { useState, useEffect } from 'react';
export default function HQ() {
  const [t, setT] = useState('');
  const [e, setE] = useState({count:0,mode:''});
  useEffect(()=>{
    const i=setInterval(()=>setT(new Date().toLocaleString()),1000);
    fetch('/api/emails').then(r=>r.json()).then(setE);
    return ()=>clearInterval(i);
  },[]);
  return (
    <div style={{background:'#f8fafc',color:'#0f172a',padding:'20px',fontFamily:'sans-serif',minHeight:'100vh'}}>
      <h1 style={{fontSize:'32px',fontWeight:'bold',margin:0}}>VENUS AGENT HQ - {t}</h1>
      <p style={{color:'#64748b'}}>SMART Mode: Browse contact, find real email, ping MX, then send - No bounce</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px',marginTop:'20px'}}>
        <div style={{background:'white',padding:'16px',borderLeft:'4px solid #2563eb',borderRadius:'8px'}}>US Sylvia USA<br/>57 found</div>
        <div style={{background:'white',padding:'16px',borderLeft:'4px solid #16a34a',borderRadius:'8px'}}>SA Faisal KSA<br/>34 found</div>
        <div style={{background:'white',padding:'16px',borderLeft:'4px solid #ea580c',borderRadius:'8px'}}>Luna Web<br/>18 designs</div>
        <div style={{background:'white',padding:'16px',borderLeft:'4px solid #2563eb',borderRadius:'8px'}}>US Kenji Closer<br/>{e.count} sent</div>
        <div style={{background:'white',padding:'16px',borderLeft:'4px solid #16a34a',borderRadius:'8px'}}>SA Faisal Closer<br/>{e.count} sent</div>
        <div style={{background:'white',padding:'16px',borderLeft:'4px solid #9333ea',borderRadius:'8px'}}>Rex Video<br/>9 videos</div>
      </div>
      <div style={{marginTop:'20px',background:'white',padding:'20px',borderRadius:'8px'}}>
        <h2>Real Emails Sent: {e.count} | Mode: {e.mode}</h2>
        <p>Flow: Browse site - Scrape /contact for REAL email - Ping MX - Send only if valid</p>
      </div>
    </div>
  );
}
