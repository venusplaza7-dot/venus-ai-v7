"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const slug = params?.business || "houston-elite-plumber";
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/proposal/${slug}`).then(r=>r.json()).then(d=>{
      if(d.found) setData(d);
    }).catch(()=>{});
  }, [slug]);

  // Autonomous data - scraped by GitHub YML
  const companyName = data?.title || slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
  const city = data?.city || "Houston, Texas";
  const phone = data?.phone || "+1 (786) 588-0578";
  const oldSite = data?.oldSite || "their current website";
  const services = data?.services?.slice(0,4) || ["Drain Cleaning", "Leak Repair", "Water Heater", "Emergency"];
  const ref = `VENUS-${slug.toUpperCase()}`;

  return (
    <div style={{minHeight:'100vh', background:'#ffffff', color:'#000', fontFamily:'Inter, sans-serif'}}>
      {/* HEADER - Same as your working elite */}
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 32px', borderBottom:'1px solid #eee', maxWidth:'1200px', margin:'0 auto'}}>
        <h2 style={{fontSize:'13px', letterSpacing:'3px', fontWeight:700}}>{companyName.toUpperCase()}</h2>
        <a href={`https://wa.me/17865880578?text=Inquiry ${ref}`} style={{background:'#000', color:'#fff', padding:'12px 28px', fontSize:'12px', letterSpacing:'2px', fontWeight:700, textDecoration:'none'}}>INQUIRE</a>
      </header>

      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'60px 32px'}}>
        <p style={{fontSize:'11px', letterSpacing:'4px', opacity:0.4}}>{city.toUpperCase()} — PROPOSAL REF: {ref}</p>

        <h1 style={{fontFamily:'Instrument Serif, serif', fontSize:'clamp(42px,6vw,72px)', lineHeight:'0.95', margin:'24px 0', maxWidth:'700px'}}>
          {companyName.split(' ').slice(0,2).join(' ')} <span style={{fontWeight:700}}>{companyName.split(' ').slice(2).join(' ')}</span>
        </h1>

        <p style={{fontSize:'18px', lineHeight:'1.6', maxWidth:'520px', opacity:0.6}}>
          A refined digital presence with intelligent automation. Designed to convert visitors into clients without human intervention. We analyzed {oldSite} and rebuilt it for AI search.
        </p>

        <div style={{display:'flex', gap:'16px', marginTop:'32px', flexWrap:'wrap'}}>
          <a href="#features" style={{background:'#000', color:'#fff', padding:'18px 32px', fontSize:'12px', letterSpacing:'2px', fontWeight:700, textDecoration:'none'}}>APPROVE & LAUNCH</a>
          <a href="#features" style={{border:'1px solid #000', color:'#000', padding:'18px 32px', fontSize:'12px', letterSpacing:'2px', fontWeight:700, textDecoration:'none'}}>VIEW FEATURES</a>
        </div>

        <div style={{marginTop:'40px', borderLeft:'1px solid #eee', paddingLeft:'24px'}}>
          <p style={{fontSize:'14px', lineHeight:'2'}}>✓ AI Concierge 24/7</p>
          <p style={{fontSize:'14px', lineHeight:'2'}}>✓ Visual Quote Engine</p>
          <p style={{fontSize:'14px', lineHeight:'2'}}>✓ Voice Booking — {phone}</p>
          <p style={{fontSize:'14px', lineHeight:'2'}}>✓ Premium Hosting</p>
          <p style={{fontSize:'12px', opacity:0.5, marginTop:'8px'}}>Detected services: {services.join(' • ')}</p>
        </div>

        {/* 3 pillars - same luxury */}
        <div id="features" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'0', marginTop:'80px', background:'#f8f8f6'}}>
          <div style={{padding:'48px', border:'1px solid #eee', background:'#fff'}}>
            <p style={{fontSize:'12px', opacity:0.3}}>01</p>
            <h3 style={{fontSize:'22px', margin:'16px 0', fontWeight:600}}>Intelligent Concierge</h3>
            <p style={{fontSize:'14px', opacity:0.6, lineHeight:'1.6'}}>AI trained on your {services.join(', ')}. Answers, quotes, books automatically. 68% higher conversion.</p>
          </div>
          <div style={{padding:'48px', border:'1px solid #eee', background:'#fff'}}>
            <p style={{fontSize:'12px', opacity:0.3}}>02</p>
            <h3 style={{fontSize:'22px', margin:'16px 0', fontWeight:600}}>Visual Assessment</h3>
            <p style={{fontSize:'14px', opacity:0.6, lineHeight:'1.6'}}>Client uploads photo. AI provides instant estimate. No friction. Built from your {data?.images || 12} current images.</p>
          </div>
          <div style={{padding:'48px', border:'1px solid #eee', background:'#fff'}}>
            <p style={{fontSize:'12px', opacity:0.3}}>03</p>
            <h3 style={{fontSize:'22px', margin:'16px 0', fontWeight:600}}>Voice Operations</h3>
            <p style={{fontSize:'14px', opacity:0.6, lineHeight:'1.6'}}>Customers call {phone}, AI answers. Your business never misses a call. Private proposal for {companyName}.</p>
          </div>
        </div>
      </div>

      {/* INVITATION - same as your working */}
      <div style={{background:'#000', color:'#fff', textAlign:'center', padding:'100px 32px'}}>
        <p style={{fontSize:'11px', letterSpacing:'5px', opacity:0.4}}>INVITATION</p>
        <h2 style={{fontFamily:'Instrument Serif, serif', fontSize:'clamp(36px,5vw,64px)', lineHeight:'1.1', margin:'24px auto', maxWidth:'700px', fontWeight:300}}>Launch {companyName} within 24 hours.</h2>
        <div style={{display:'flex', gap:'16px', justifyContent:'center', marginTop:'32px', flexWrap:'wrap'}}>
          <a href={`https://wa.me/17865880578?text=CONFIRM ${ref} - Launch my site`} style={{background:'#fff', color:'#000', padding:'20px 40px', fontSize:'12px', letterSpacing:'2px', fontWeight:700, textDecoration:'none'}}>CONFIRM VIA WHATSAPP</a>
          <a href={`https://buy.stripe.com/test_YOUR_LINK_HERE?client_reference_id=${slug}`} style={{background:'#00ff88', color:'#000', padding:'20px 40px', fontSize:'12px', letterSpacing:'2px', fontWeight:700, textDecoration:'none'}}>PAY $497 & GO LIVE →</a>
        </div>
        <p style={{fontSize:'12px', opacity:0.3, marginTop:'24px'}}>DIRECT TO {phone} • {`venus-ai-v8.vercel.app/p/${slug}`}</p>
        <p style={{fontSize:'10px', opacity:0.2, marginTop:'8px'}}>Anonymous agent scraped — no manual insert • Proposal expires in 48h</p>
      </div>
    </div>
  );
}



