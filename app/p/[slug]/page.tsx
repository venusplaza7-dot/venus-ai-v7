export default function Page({ params }) {
  const slug = params.slug || 'business';
  const title = slug.replace(/-/g, ' ').toUpperCase();
  return (
    <main style={{background:'#fff', color:'#000', fontFamily:'Helvetica, Arial, sans-serif', minHeight:'100vh'}}>
      <div style={{background:'#000', color:'#fff', padding:'20px 32px', fontSize:'12px', letterSpacing:'5px'}}>VENUS HQ - LUXURY AI</div>
      <div style={{padding:'80px 32px', maxWidth:'800px'}}>
        <h1 style={{fontSize:'48px', fontWeight:300, margin:0, lineHeight:1}}>{title}</h1>
        <p style={{marginTop:'20px', fontSize:'16px', color:'#555', maxWidth:'500px', lineHeight:1.6}}>Luxury Black & White site. AI Concierge, Visual Quote, Voice Booking. 0.9s load. Built for Gen Z - they click, not call.</p>
        <a href="https://wa.me/17865880578" style={{background:'#000', color:'#fff', padding:'14px 24px', textDecoration:'none', fontWeight:'bold', display:'inline-block', marginTop:'30px'}}>LAUNCH ON WHATSAPP</a>
      </div>
    </main>
  )
}

