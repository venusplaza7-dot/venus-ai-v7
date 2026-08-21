"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { business } = useParams();
  const slug = business || "alliance-plumbing-houston";
  const name = slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/proposal/${slug}`).then(r=>r.json()).then(d=>{ if(d.found) setData(d); });
  }, [slug]);

  const d = data || { oldSite: "Your current site", phone: "(480)-788-7473", images: 12, services: ["Drain Cleaning","Leak Repair"], city: "Houston, TX" };

  return (
    <div style={{minHeight:'100vh', background:'#070708', color:'#fff', padding:'40px 20px', fontFamily:'system-ui'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>
        <p style={{fontSize:'10px', letterSpacing:'6px', opacity:0.4}}>PRIVATE FOR {d.city.toUpperCase()}</p>
        <h1 style={{fontSize:'54px', lineHeight:'0.95', margin:'20px 0', fontWeight:800}}>We rebuilt<br/>{name} before<br/>you asked.</h1>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginTop:'30px'}}>
          <div style={{border:'1px solid #1a1a1a', borderRadius:'16px', padding:'20px'}}><p style={{fontSize:'10px', opacity:0.5}}>CURRENT</p><p style={{fontSize:'13px', marginTop:'10px'}}>{d.oldSite}</p></div>
          <div style={{border:'1px solid #00ff88', borderRadius:'16px', padding:'20px', background:'#0a1f14'}}><p style={{fontSize:'10px', color:'#00ff88'}}>NEW AI SITE - LIVE</p><p style={{marginTop:'10px'}}>{name} AI Ready</p></div>
        </div>
        <a href="#" style={{display:'block', marginTop:'24px', background:'#fff', color:'#000', padding:'20px', borderRadius:'14px', textAlign:'center', fontWeight:900, textDecoration:'none'}}>UNLOCK {name.toUpperCase()} - $497</a>
        <p style={{fontSize:'10px', opacity:0.3, marginTop:'16px', textAlign:'center'}}>venus-ai-v8.vercel.app/p/{slug}</p>
      </div>
    </div>
  );
}





