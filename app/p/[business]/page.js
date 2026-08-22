export default function Page({ params }) {
  const slug = params.business
  const company = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  const domain = slug + '.com'
  return (
    <div style={{background:'#fff', color:'#000', minHeight:'100vh', fontFamily:'Georgia, serif'}}>
      <div style={{maxWidth:'800px', margin:'0 auto', padding:'40px 20px', textAlign:'center'}}>
        <p style={{fontSize:'10px', letterSpacing:'3px', color:'#999', textTransform:'uppercase', textAlign:'center'}}>Venus HQ — Private Audit for {company} — Since 2016</p>
        <h1 style={{fontSize:'48px', lineHeight:'1.1', fontWeight:300, margin:'20px 0', textAlign:'center'}}>Your site is unchanged since 2016 — losing Gen Z.</h1>
        <p style={{fontFamily:'Arial, sans-serif', color:'#666', textAlign:'center'}}>Hi {company} team,</p>
        <div style={{background:'#0a0a0a', color:'#fff', padding:'40px', margin:'30px auto', borderRadius:'16px', border:'1px solid #222', maxWidth:'600px', textAlign:'center'}}>
          <p style={{fontFamily:'Arial, sans-serif', fontSize:'14px', color:'#fff', marginBottom:'24px'}}>Your new luxury site is ready</p>
          <div style={{display:'flex', flexDirection:'column', gap:'16px', alignItems:'center'}}>
            <a href={`#preview-${slug}`} style={{display:'block', width:'100%', maxWidth:'400px', background:'#FFB86A', color:'#000', textAlign:'center', padding:'20px', textDecoration:'none', letterSpacing:'2px', fontFamily:'Arial, sans-serif', fontWeight:'bold', fontSize:'12px', borderRadius:'8px'}}>CLICK HERE TO PREVIEW YOUR NEW WEBSITE →</a>
            <a href={`https://api.whatsapp.com/send?phone=17865880578&text=APPROVE%20${slug}`} target="_blank" style={{display:'block', width:'100%', maxWidth:'400px', background:'#25D366', color:'#fff', textAlign:'center', padding:'20px', textDecoration:'none', letterSpacing:'2px', fontFamily:'Arial, sans-serif', fontWeight:'bold', fontSize:'12px', borderRadius:'8px'}}>CONFIRM VIA WHATSAPP - $497 →</a>
          </div>
          <div style={{textAlign:'left', marginTop:'32px', fontFamily:'Arial, sans-serif'}}>
            <h3 style={{fontSize:'14px'}}>Luxury Rebuilt Includes:</h3>
            <ul style={{lineHeight:'2', fontSize:'14px', color:'#ccc'}}>
              <li>AI Concierge 24/7</li>
              <li>Visual Quote</li>
              <li>20-min Booking + WhatsApp</li>
              <li>0.8s Load</li>
            </ul>
            <p style={{fontSize:'14px', marginTop:'20px'}}>Price: $497 launch (normally $1997) — 48h. Old site stays live.</p>
          </div>
        </div>
        <div id={`preview-${slug}`} style={{marginTop:'40px', padding:'30px', border:'1px dashed #ddd', borderRadius:'12px'}}>
          <h2 style={{fontFamily:'Arial, sans-serif'}}>Live Preview: {company}</h2>
          <p style={{fontFamily:'Arial, sans-serif', color:'#999', fontSize:'12px'}}>{domain}</p>
        </div>
      </div>
    </div>
  )
}



