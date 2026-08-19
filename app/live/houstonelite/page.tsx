export default function Page(){
  const domain="houston-elite-plumber.com";
  const name="Houston Elite Plumber";
  const waText="Hi Venus HQ, launch "+domain+" now - https://"+domain+" - add all Gen Z AI tools. Live URL: https://venus-agent-hq.vercel.app/live/houstonelite";
  const waLink="https://wa.me/17865880578?text="+encodeURIComponent(waText);
  return (
    <div style={{background:'#0a0a0a',color:'#fff',minHeight:'100vh',fontFamily:'Inter, Arial, sans-serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',border:'1px solid #222'}}>
        <div style={{padding:'50px 40px 30px'}}>
          <p style={{fontSize:'10px',letterSpacing:'4px',color:'#555',margin:'0'}}>VENUS HQ - LIVE - {domain}</p>
          <h1 style={{fontWeight:200,fontSize:'52px',lineHeight:0.95,margin:'24px 0 20px'}}>{name}<br/>is now live.</h1>
          <p style={{color:'#888',fontSize:'14px',margin:0}}>Gen-Z Luxury B&W - Intelligent Concierge - Visual Assessment - Voice Operations - Tracking domain: {domain}</p>
        </div>
        <div style={{padding:'32px 40px',borderTop:'1px solid #222'}}>
          <div style={{padding:'18px 20px',border:'1px solid #222',marginBottom:'12px'}}><p style={{fontSize:'11px',color:'#666',margin:0}}>01</p><p style={{fontSize:'16px',color:'#fff',margin:'6px 0 4px'}}>Intelligent Concierge</p><p style={{fontSize:'12px',color:'#888',margin:0}}>AI trained on your services - 68% higher conversion</p></div>
          <div style={{padding:'18px 20px',border:'1px solid #222',marginBottom:'12px'}}><p style={{fontSize:'11px',color:'#666',margin:0}}>02</p><p style={{fontSize:'16px',color:'#fff',margin:'6px 0 4px'}}>Visual Assessment</p><p style={{fontSize:'12px',color:'#888',margin:0}}>Client uploads photo - AI instant estimate</p></div>
          <div style={{padding:'18px 20px',border:'1px solid #222'}}><p style={{fontSize:'11px',color:'#666',margin:0}}>03</p><p style={{fontSize:'16px',color:'#fff',margin:'6px 0 4px'}}>Voice Operations</p><p style={{fontSize:'12px',color:'#888',margin:0}}>AI answers calls - never miss a lead</p></div>
        </div>
        <div style={{padding:'40px',textAlign:'center',borderTop:'1px solid #222'}}>
          <a href={waLink} style={{display:'inline-block',background:'#fff',color:'#000',padding:'18px 42px',fontSize:'12px',letterSpacing:'3px',textDecoration:'none',fontWeight:600}}>MANAGE VIA WHATSAPP - {domain}</a>
          <p style={{fontSize:'10px',color:'#444',marginTop:'18px'}}>Live URL: https://venus-agent-hq.vercel.app/live/houstonelite - Live drill timed - 15 min promise proved</p>
        </div>
      </div>
    </div>
  )
}




