export default function Page({ params }) {
  const slug = params.business
  const company = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  return (
    <div style={{background:'#fff', color:'#000', minHeight:'100vh', fontFamily:'Georgia, serif'}}>
      <div style={{maxWidth:'800px', margin:'0 auto', padding:'40px 20px', textAlign:'center'}}>
        <p style={{fontSize:'10px', letterSpacing:'3px', color:'#999', textTransform:'uppercase'}}>Venus HQ — Private Audit for {company}</p>
        <h1 style={{fontSize:'48px', fontWeight:300, margin:'20px 0'}}>Your site is unchanged since 2016 — losing Gen Z.</h1>
        <div style={{background:'#0a0a0a', color:'#fff', padding:'40px', margin:'30px auto', borderRadius:'16px', maxWidth:'600px', textAlign:'center'}}>
          <p style={{fontFamily:'Arial', fontSize:'14px', marginBottom:'16px'}}>Your new luxury site is ready</p>
          <p style={{fontFamily:'Arial', fontSize:'32px', fontWeight:'bold', margin:'0'}}>
            <span style={{fontSize:'20px', textDecoration:'line-through', color:'#888', marginRight:'12px'}}>$1,997</span>
            <span style={{color:'#FFB86A'}}>$497</span>
          </p>
          <p style={{fontFamily:'Arial', fontSize:'11px', letterSpacing:'2px', color:'#aaa', marginTop:'8px', marginBottom:'24px'}}>LAUNCH SPECIAL — 48H APPROVAL</p>
          <div style={{display:'flex', flexDirection:'column', gap:'16px', alignItems:'center'}}>
            <a href={`#preview-${slug}`} style={{display:'block', width:'100%', maxWidth:'400px', background:'#FFB86A', color:'#000', textAlign:'center', padding:'20px', textDecoration:'none', letterSpacing:'2px', fontFamily:'Arial', fontWeight:'bold', fontSize:'12px', borderRadius:'8px'}}>CLICK HERE TO PREVIEW YOUR NEW WEBSITE →</a>
            <a href={`https://api.whatsapp.com/send?phone=17865880578&text=APPROVE%20${slug}%20FOR%20497`} target="_blank" style={{display:'block', width:'100%', maxWidth:'400px', background:'#25D366', color:'#fff', textAlign:'center', padding:'20px', textDecoration:'none', letterSpacing:'2px', fontFamily:'Arial', fontWeight:'bold', fontSize:'12px', borderRadius:'8px'}}>CONFIRM VIA WHATSAPP - $497 →</a>
          </div>
          <div style={{textAlign:'left', marginTop:'32px', fontFamily:'Arial'}}>
            <p style={{fontSize:'14px', color:'#ccc', lineHeight:'2'}}>AI Concierge 24/7 — answers & books<br/>Visual Quote — upload photo → instant price<br/>20-min Booking + WhatsApp +17865880578<br/>0.8s Load (old 3.4s)</p>
            <p style={{fontSize:'13px', marginTop:'20px', color:'#aaa'}}>Old site stays live until you approve. Normally $1,997 — now $497 for 48h.</p>
          </div>
        </div>
        <div id={`preview-${slug}`} style={{marginTop:'40px', padding:'30px', border:'1px dashed #ddd', borderRadius:'12px'}}>
          <h2 style={{fontFamily:'Arial'}}>Live Preview: {company}</h2>
        </div>
      </div>
    </div>
  )
}