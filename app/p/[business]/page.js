export default function Page({ params }) {
  const slug = params.business || params.slug || "houston-elite-plumber";
  const domain = `${slug}.com`;
  const whatsappHref = `https://wa.me/17865880578?text=APPROVE%20SITE%3A%20${slug}%0AURL%3A%20https%3A%2F%2Fvenus-ai-v8-git-main-venus13.vercel.app%2Flive%2F${slug}%0APLAN%3A%20497`;

  return (
    <div style={{background:"#FCFBF8",minHeight:"100vh",fontFamily:"Instrument Serif, Georgia, serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500&display=swap'); html{scroll-behavior:smooth}`}</style>
      
      <div style={{background:"black",color:"white",padding:"14px 32px",display:"flex",justifyContent:"space-between",fontFamily:"Inter",fontSize:11,letterSpacing:2}}>
        <span>VENUS HQ — LUXURY 2026 • PRIVATE AUDIT FOR {slug.toUpperCase()}</span>
        <span style={{opacity:0.5}}>● Live • Tracking Active</span>
      </div>

      <div style={{maxWidth:1240,margin:"0 auto",padding:"60px 32px",display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:40}}>
        <div>
          <div style={{fontFamily:"Inter",fontSize:10,letterSpacing:2,border:"1px solid #ddd",display:"inline-block",padding:"6px 12px",borderRadius:20}}>BRAND AUDIT • {domain} • EST 2018 → 2026</div>
          <h1 style={{fontSize:64,lineHeight:0.9,marginTop:24}}>HOUSTON ELITE<br/>LUXURY<br/><span style={{color:"#FF6A2C"}}>PLUMBER.</span></h1>
          <p style={{fontFamily:"Inter",color:"#666",marginTop:20}}>We rebuilt <span style={{background:"#E8FF5A",padding:"2px 6px"}}>{domain}</span> — unchanged since 2018 — into Gen-Z luxury with AI. Ready in 24h.</p>
          
          <div style={{background:"black",color:"white",padding:16,marginTop:32,borderRadius:12,display:"flex",justifyContent:"space-between",fontFamily:"Inter",fontSize:12,alignItems:"center"}}>
            <span>CURRENT — 2018 — LIVE NOW<br/><b>{domain} — Old Site</b></span>
            <a href={`https://${domain}`} target="_blank" style={{background:"white",color:"black",padding:"10px 20px",borderRadius:8,textDecoration:"none",fontWeight:700}}>OPEN OLD</a>
          </div>
        </div>

        <div style={{background:"black",borderRadius:32,padding:32,color:"white"}}>
          <div style={{background:"#FF6A2C",display:"inline-block",padding:"8px 16px",borderRadius:20,fontFamily:"Inter",fontSize:10,fontWeight:800}}>LAUNCH SPECIAL • 48H APPROVAL</div>
          <h2 style={{fontSize:32,marginTop:20}}>Your new luxury site<br/><span style={{opacity:0.5}}>is ready.</span></h2>
          <div style={{marginTop:16}}><span style={{textDecoration:"line-through",opacity:0.4}}>$1,997</span><span style={{color:"#FF6A2C",fontSize:38,marginLeft:10}}>$497</span></div>
          <p style={{fontFamily:"Inter",fontSize:12,opacity:0.5,marginTop:8}}>One-time • 48h launch • Old stays live • Tracking: {slug}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:20}}>
            <a href={`#preview-${slug}`} style={{background:"#FF6A2C",color:"white",textAlign:"center",padding:14,borderRadius:100,textDecoration:"none",fontFamily:"Inter",fontWeight:700,fontSize:12}}>VIEW PREVIEW →</a>
            <a href={whatsappHref} target="_blank" style={{background:"white",color:"black",textAlign:"center",padding:14,borderRadius:100,textDecoration:"none",fontFamily:"Inter",fontWeight:700,fontSize:12}}>CONFIRM - $497</a>
          </div>
        </div>
      </div>

      <div id={`preview-${slug}`} style={{background:"black",color:"white",padding:"80px 40px",textAlign:"center"}}>
        <p style={{color:"#FF6A2C",fontFamily:"Inter",letterSpacing:4,fontSize:10}}>PREVIEW — BEAUTIFUL LUXURY SITE — SCROLLS FROM TOP BUTTON</p>
        <h1 style={{fontSize:64,marginTop:20}}>Plumbing<br/><span style={{color:"#FF6A2C"}}>Reimagined.</span></h1>
        <p style={{fontFamily:"Inter",color:"#888",maxWidth:500,margin:"20px auto"}}>AI Concierge answers in 7 seconds. Upload photo, get price. Book in 20 min.</p>
        <div style={{maxWidth:480,margin:"60px auto 0 auto",background:"#111",border:"1px solid #222",borderRadius:20,padding:28}}>
          <div><span style={{textDecoration:"line-through",opacity:0.3}}>$1,997</span><span style={{color:"#FF6A2C",fontSize:40,fontWeight:900,marginLeft:12}}>$497</span></div>
          <a href={whatsappHref} target="_blank" style={{display:"block",background:"#2E7D4F",color:"white",textDecoration:"none",fontWeight:900,textAlign:"center",padding:16,borderRadius:12,marginTop:20,fontFamily:"Inter"}}>✓ CONFIRM VIA WHATSAPP - $497 → {slug}</a>
          <p style={{fontFamily:"Inter",fontSize:10,opacity:0.3,marginTop:8}}>WhatsApp includes {slug} + live link so you know which to activate once paid</p>
        </div>
      </div>
    </div>
  )
}


