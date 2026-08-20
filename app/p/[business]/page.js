"use client";
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const slug = params?.business || "alliance-plumbing-houston";
  const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // SCRAPED DATA FROM YOUR FACTORY TEST - NOW WIRED
  const proposal = {
    oldSite: "https://allianceplumbing.com",
    status: "ONLINE ✓",
    phone: "(480)-788-7473",
    services: ["Drain Cleaning", "Leak Repair", "Water Heater", "Emergency Plumbing"],
    images: 12
  };

  return (
    <div style={{minHeight:'100vh', background:'black', color:'white', padding:'20px', fontFamily:'system-ui'}}>
      <p style={{fontSize:'10px', letterSpacing:'6px', opacity:0.5}}>VENUS AI FOR {name.toUpperCase()}</p>
      <h1 style={{fontSize:'36px', margin:'10px 0'}}>{name}</h1>
      <p style={{opacity:0.6}}>Old: {proposal.oldSite} {proposal.status} | Phone: {proposal.phone} | Images: {proposal.images}</p>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginTop:'30px'}}>
        <div style={{border:'1px solid #333', borderRadius:'12px', padding:'15px'}}>
          <p style={{fontSize:'12px', fontWeight:'bold'}}>CURRENT: {name}</p>
          <div style={{background:'white', color:'black', height:'200px', marginTop:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>{proposal.oldSite}</div>
          <p style={{marginTop:'10px', fontSize:'12px'}}>Services: {proposal.services.join(', ')}</p>
        </div>
        <div style={{border:'2px solid #00ff88', borderRadius:'12px', padding:'15px'}}>
          <p style={{fontSize:'12px', fontWeight:'bold', color:'#00ff88'}}>NEW FOR {name.toUpperCase()}</p>
          <div style={{background:'#111', height:'200px', marginTop:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <button style={{padding:'12px 24px', background:'white', color:'black', fontWeight:'bold', border:'none'}}>VIEW {name.toUpperCase()} PREVIEW</button>
          </div>
        </div>
      </div>

      <div style={{marginTop:'20px', background:'#00ff88', color:'black', padding:'16px', borderRadius:'10px', textAlign:'center', fontWeight:'bold'}}>
        UNLOCK {name.toUpperCase()} - $497
      </div>
      <p style={{marginTop:'10px', fontSize:'10px', opacity:0.5}}>Email: {name} - Your new AI website is ready | Link: /p/{slug}</p>
    </div>
  );
}

