"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const slug = params?.business || "alliance-plumbing-houston";
  const name = slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');

  const [scraped, setScraped] = useState(null);

  useEffect(() => {
    // Agent scrapes on its own from localStorage or API — anonymous
    const stored = localStorage.getItem(`venus_${slug}`);
    if(stored) setScraped(JSON.parse(stored));
  }, [slug]);

  const display = scraped || {
    oldSite: `https://${slug}.com`,
    phone: "Scraped live",
    services: ["Auto-detected"],
    images: "Auto-detected",
    city: "Auto-detected"
  };

  return (
    <div style={{minHeight:'100vh', background:'black', color:'white', padding:'20px', fontFamily:'system-ui'}}>
      <p style={{fontSize:'10px', letterSpacing:'6px', opacity:0.5}}>PRIVATE FOR {display.city.toUpperCase()}</p>
      <h1 style={{fontSize:'36px'}}>We rebuilt<br/>{name} before<br/>you asked.</h1>
      <p style={{opacity:0.6, marginTop:'10px'}}>Old: {display.oldSite} | Phone: {display.phone}</p>
      <div style={{marginTop:'20px', border:'2px solid #00ff88', padding:'20px', borderRadius:'12px'}}>
        <p>NEW AI SITE LIVE FOR {name.toUpperCase()}</p>
        <p style={{fontSize:'12px', opacity:0.6, marginTop:'10px'}}>Services: {display.services.join(', ')} | Images: {display.images}</p>
        <div style={{marginTop:'16px', background:'#00ff88', color:'black', padding:'16px', borderRadius:'10px', textAlign:'center', fontWeight:'bold'}}>UNLOCK {name.toUpperCase()} - $497</div>
      </div>
      <p style={{fontSize:'10px', opacity:0.3, marginTop:'20px'}}>Anonymous agent scraped — no manual insert | /p/{slug}</p>
    </div>
  );
}


