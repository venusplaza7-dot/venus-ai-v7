export default function Page({ params }) {
  const business = params?.business || 'houston-elite-plumber';
  const domain = business.includes('.') ? business : business + '.com';
  const name = business.replace(/-/g,' ').toUpperCase();

  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'#fff',fontFamily:'Helvetica Neue, Helvetica, Arial',padding:'0'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'50px 20px'}}>
        <p style={{color:'#FF6B00',fontSize:11,letterSpacing:4,fontWeight:800}}>VENUS HQ — LUXURY 2026</p>
        <h1 style={{fontSize:68,lineHeight:0.9,fontWeight:800,marginTop:20,letterSpacing:-2}}>{name}<br/>LUXURY<br/><span style={{color:'#FF6B00'}}>PLUMBER.</span></h1>
        <p style={{color:'#CCCCCC',fontSize:18,marginTop:20,maxWidth:600}}>We rebuilt {domain} — unchanged since 2016 — into Gen-Z luxury with AI. Ready in 24h.</p>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'#222',marginTop:60,border:'1px solid #222'}}>
          <div style={{background:'#111',padding:40}}>
            <p style={{color:'#FF6B00',fontWeight:800,fontSize:12,letterSpacing:3}}>CURRENT — 2016</p>
            <p style={{color:'#666',fontSize:44,fontWeight:200,marginTop:10,textDecoration:'line-through'}}>SLOW</p>
            <p style={{color:'#BBBBBB',marginTop:16,lineHeight:1.8}}>— Legacy template<br/>— 3.4s load<br/>— No AI<br/>— Gen Z bounces</p>
          </div>
          <div style={{background:'#151515',padding:40}}>
            <p style={{color:'#FF6B00',fontWeight:800,fontSize:12,letterSpacing:3}}>PROPOSAL — 2026 LUXURY</p>
            <p style={{color:'#fff',fontSize:44,fontWeight:700,marginTop:10}}>FAST</p>
            <p style={{color:'#fff',marginTop:16,lineHeight:1.8}}>• Gen-Z Luxury B&W<br/>• AI Concierge 24/7<br/>• Visual Quote + Voice</p>
          </div>
        </div>

        <p style={{color:'#FF6B00',marginTop:60,letterSpacing:3,fontSize:13,fontWeight:800}}>INCLUDED — GEN Z AI STACK</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:'#222',marginTop:20,border:'1px solid #222'}}>
          <div style={{background:'#111',padding:30}}><p style={{color:'#FF6B00',fontWeight:800}}>01 — CONCIERGE</p><p style={{marginTop:12,color:'#fff'}}>AI answers + books 24/7. 68% higher conversion.</p></div>
          <div style={{background:'#111',padding:30}}><p style={{color:'#FF6B00',fontWeight:800}}>02 — VISUAL QUOTE</p><p style={{marginTop:12,color:'#fff'}}>Upload leak photo, instant estimate. Gen Z expects.</p></div>
          <div style={{background:'#111',padding:30}}><p style={{color:'#FF6B00',fontWeight:800}}>03 — VOICE OPS</p><p style={{marginTop:12,color:'#fff'}}>AI answers calls, never misses lead.</p></div>
        </div>

        <div style={{background:'#000',padding:80,textAlign:'center',marginTop:60,border:'1px solid #222'}}>
          <p style={{color:'#FF6B00',letterSpacing:4,fontSize:12,fontWeight:800}}>INVITATION — 24H LAUNCH</p>
          <h2 style={{fontSize:52,fontWeight:800,marginTop:12}}>Launch {name}<br/>within 24h.</h2>
          <p style={{color:'#BBBBBB',marginTop:16}}>Your old 2016 site costing luxury clients daily.</p>
          <a href="https://wa.me/17865880578" style={{display:'inline-block',marginTop:30,background:'#A8FF53',color:'#000',padding:'20px 40px',textDecoration:'none',fontWeight:900,letterSpacing:3,fontSize:12}}>CONFIRM VIA WHATSAPP</a>
          <p style={{color:'#666',marginTop:20,fontSize:12}}>DIRECT TO +1 (786) 588-0578 — ron@venushq7.com</p>
        </div>
      </div>
    </div>
  );
}
