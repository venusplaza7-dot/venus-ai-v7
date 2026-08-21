"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const slug = params?.business || "alliance-plumbing-houston";
  const [data, setData] = useState(null);
  useEffect(() => { fetch(`/api/proposal/${slug}`).then(r=>r.json()).then(d=>{ if(d.found) setData(d); }); }, [slug]);
  
  const company = data?.title || slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
  const city = data?.city || "HOUSTON, TX";
  const oldSite = data?.oldSite || "https://www.allianceplumbing.com";
  const ref = `VENUS-${slug.toUpperCase()}`;
  const phone = data?.phone || "+1 (786) 588-0578";

  return (
    <div style={{background:'#fff', color:'#000', minHeight:'100vh', fontFamily:'Inter, sans-serif'}}>
      {/* LUXURY HEADER - from elite */}
      <header style={{display:'flex', justifyContent:'space-between', padding:'24px 40px', borderBottom:'1px solid #eee', maxWidth:'1200px', margin:'0 auto'}}>
        <span style={{fontSize:'12px', letterSpacing:'4px', fontWeight:700}}>{company.toUpperCase()}</span>
        <a href={`https://wa.me/17865880578?text=${ref}`} style={{background:'#000', color:'#fff', padding:'10px 22px', fontSize:'11px', letterSpacing:'2px', textDecoration:'none'}}>INQUIRE</a>
      </header>

      <div style={{maxWidth:'720px', margin:'0 auto', padding:'60px 24px'}}>
        {/* PRIVATE CONCEPT - your email copy but luxury */}
        <p style={{fontSize:'11px', letterSpacing:'5px', opacity:0.4}}>PRIVATE CONCEPT FOR {city.toUpperCase()}</p>

        <h1 style={{fontFamily:'Instrument Serif, serif', fontSize:'clamp(48px,7vw,88px)', lineHeight:'0.9', margin:'24px 0', fontWeight:300}}>
          We rebuilt<br/><span style={{textDecoration:'underline', textUnderlineOffset:'8px'}}>{company.split(' ').slice(0,2).join(' ')}</span><br/><span style={{textDecoration:'underline', textUnderlineOffset:'8px'}}>{company.split(' ').slice(2).join(' ') || 'Plumbing'}</span><br/>before you<br/>asked.
        </h1>

        <div style={{marginTop:'48px', maxWidth:'480px'}}>
          <p style={{fontSize:'20px', lineHeight:'1.5'}}>Your current site <strong>{oldSite}</strong> is live and working, but it's costing you.</p>
          <p style={{fontSize:'18px', lineHeight:'1.6', opacity:0.6, marginTop:'24px'}}>Gen Z doesn't call — they click. 4.7s load, no mobile booking, no AI. 73% leave and book competitor with 1 click.</p>
          <p style={{fontSize:'18px', fontWeight:700, marginTop:'32px'}}>We fixed it — luxury Black & White + AI Concierge — already live.</p>
        </div>

        {/* LIVE PREVIEW CARD - luxury */}
        <div style={{marginTop:'48px', border:'1px solid #000'}}>
          <div style={{background:'#000', color:'#fff', display:'flex', justifyContent:'space-between', padding:'16px 24px', fontSize:'11px', letterSpacing:'3px'}}>
            <span>NEW VENUS — LIVE PREVIEW</span>
            <span style={{color:'#00ff88'}}>● LIVE</span>
          </div>
          <div style={{padding:'48px 24px', textAlign:'center'}}>
            <h2 style={{fontSize:'clamp(28px,5vw,48px)', letterSpacing:'6px', fontWeight:300, lineHeight:'1.1'}}>{company.toUpperCase()}</h2>
            <p style={{fontSize:'12px', letterSpacing:'4px', opacity:0.4, marginTop:'16px'}}>{city} • AI BOOKING • 0.9S</p>
            <a href={`https://venus-ai-v8.vercel.app/p/${slug}`} style={{display:'inline-block', background:'#000', color:'#fff', padding:'20px 40px', marginTop:'32px', fontSize:'13px', letterSpacing:'2px', fontWeight:700, textDecoration:'none'}}>VIEW LIVE PREVIEW →</a>
          </div>
        </div>

        <p style={{textAlign:'center', fontSize:'12px', opacity:0.4, marginTop:'16px'}}>{`https://venus-ai-v8.vercel.app/p/${slug}`}</p>

        {/* CURRENT vs NEW VENUS */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'24px', border:'1px solid #ddd'}}>
          <div style={{padding:'20px', background:'#f9f9f8'}}><p style={{fontSize:'11px', opacity:0.5}}>CURRENT</p><p style={{fontSize:'18px', fontWeight:700, marginTop:'8px'}}>4.7s • No AI •<br/>Mobile issues</p></div>
          <div style={{padding:'20px', background:'#000', color:'#fff'}}><p style={{fontSize:'11px', opacity:0.5}}>NEW VENUS</p><p style={{fontSize:'18px', fontWeight:700, marginTop:'8px'}}>0.9s • AI<br/>Concierge • 3X</p></div>
        </div>

        {/* LAUNCH */}
        <a href={`https://wa.me/17865880578?text=LAUNCH ${ref} - ${oldSite}`} style={{display:'block', background:'#000', color:'#fff', textAlign:'center', padding:'24px', marginTop:'24px', fontSize:'16px', letterSpacing:'2px', fontWeight:800, textDecoration:'none'}}>LAUNCH MY NEW SITE IN 24H →</a>
        <p style={{textAlign:'center', fontSize:'12px', opacity:0.4, marginTop:'12px'}}>1-click WhatsApp • No forms • We handle everything • Direct to {phone}</p>

        {/* PAY */}
        <a href={`https://buy.stripe.com/test_link?client_reference_id=${slug}`} style={{display:'block', border:'1px solid #000', textAlign:'center', padding:'18px', marginTop:'12px', fontSize:'13px', letterSpacing:'2px', fontWeight:700, textDecoration:'none', color:'#000'}}>OR PAY $497 & GO LIVE INSTANTLY</a>
      </div>
    </div>
  );
}
