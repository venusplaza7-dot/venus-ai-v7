export default function Page({ params }) {
  const name = params.slug ? params.slug.replace(/-/g, ' ').toUpperCase() : 'LUXURY BUSINESS';
  return (
    <div style={{background:'#fff', minHeight:'100vh', color:'#000', fontFamily:'Arial'}}>
      <div style={{background:'#000', color:'#fff', padding:'20px 30px'}}>
        <b style={{letterSpacing:'4px'}}>{name}</b> - VENUS HQ
      </div>
      <div style={{padding:'60px 30px', maxWidth:'900px'}}>
        <p style={{color:'#888', fontSize:'11px', letterSpacing:'3px'}}>PRIVATE PROPOSAL</p>
        <h1 style={{fontSize:'54px', fontWeight:300}}>{name}<br/><b>LUXURY EDITION</b></h1>
        <p style={{fontSize:'18px', color:'#333', maxWidth:'500px'}}>AI Concierge, Visual Quote, Voice Booking. Loads in 0.9s. Built for Gen Z - they click, not call.</p>
        <a href="https://wa.me/17865880578?text=Hi%20I%20want%20to%20launch" style={{background:'#000', color:'#fff', padding:'16px 28px', textDecoration:'none', display:'inline-block', marginTop:'30px', fontWeight:'bold'}}>APPROVE VIA WHATSAPP</a>
      </div>
    </div>
  );
}


