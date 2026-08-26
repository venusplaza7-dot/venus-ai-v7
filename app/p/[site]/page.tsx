export default function Page({params}:{params:{site:string}}){
const slug = params.site || '24hrplumbinghouston-com'
const domain = slug.replace(/-com$/,'').replace(/-/g,'.') + '.com'
const audit = {
 domain,
 title: `24 Hour Plumbing Houston | Emergency Plumber - Call Now`,
 tech: 'Old WordPress + jQuery + No AI',
 est: '2015',
 prob: 'Losing Gen-Z customers who want photo-quote, not phone call'
}
return(
<div style={{background:'#fcfcfa',fontFamily:'Inter,Arial',minHeight:'100vh',color:'#111'}}>
<div style={{background:'#111',color:'#0A84FF',padding:'8px',textAlign:'center',fontSize:11,letterSpacing:2}}>VENUS HQ • JAN 2026 • LIVE • Tracking {domain}</div>
<div style={{maxWidth:1100,margin:'0 auto',padding:'40px 20px'}}>
<nav style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid rgba(0,0,0,0.06)',paddingBottom:20}}>
<b style={{fontSize:11,letterSpacing:2}}>24HR • HOUSTON EST {audit.est}</b><span style={{border:'1px solid #ddd',borderRadius:100,padding:'4px 10px',fontSize:11}}>LICENSED TX</span>
</nav>
<div style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:40,padding:'60px 0'}}>
<div>
<h1 style={{fontSize:64,fontWeight:500,lineHeight:0.9,letterSpacing:-2,margin:0}}>Houston homes<br/><i style={{fontWeight:300}}>don't wait.</i><br/><span style={{color:'rgba(0,0,0,0.3)'}}>Neither should<br/>your plumber.</span></h1>
<p style={{marginTop:20,color:'rgba(0,0,0,0.5)',maxWidth:400}}>Old site costs you $497 per missed booking. We rebuilt it as AI concierge that quotes, schedules in 2 min.</p>
<div style={{marginTop:20,background:'#FBFCFD',border:'1px solid rgba(0,0,0,0.07)',borderRadius:20,padding:20}}>
<div style={{fontSize:10,color:'#888',letterSpacing:2}}>OLD SITE AUDIT • FAILING 38/100</div>
<p style={{fontSize:13,marginTop:10}}><b>DOMAIN:</b> {audit.domain}<br/><b>TITLE:</b> {audit.title}<br/><b>TECH:</b> {audit.tech}<br/><b>PROBLEM:</b> {audit.prob}<br/><br/>Converts at 1.2% vs competitors with AI photo-quote at 8.7%. Losing $12k/mo.</p>
</div>
</div>
<div>
<div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.08)',borderRadius:20,padding:20}}>
<p style={{fontSize:11,letterSpacing:1}}>LIVE AI DEMO — Try it</p>
<div style={{marginTop:16,border:'2px dashed #0A84FF',borderRadius:16,padding:30,textAlign:'center',background:'#F5F8FF'}}>
<p>📸 Upload leak photo</p><p style={{fontSize:12,color:'#888'}}>IMG_4821.jpg → AI → $247 fixed</p>
<button style={{marginTop:10,background:'#0A84FF',color:'#fff',border:'none',padding:'8px 16px',borderRadius:100}}>Use Sample Photo</button>
</div>
<div style={{marginTop:16,background:'#111',color:'#fff',borderRadius:12,padding:12,fontSize:12}}>Analyzing... 100% → $247 • Pipe burst • Parts in stock • 1yr warranty • Booked in 2 min</div>
</div>
</div>
</div>
<h2 style={{fontSize:32,fontWeight:600}}>Your new luxury plumbing site — <span style={{color:'#0A84FF'}}>2026 ready</span></h2>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginTop:20}}>
<div style={{background:'#fff',border:'1px solid #eee',borderRadius:20,padding:20}}><b>Luxury Minimal</b><p style={{fontSize:13,color:'#666'}}>White editorial, video hero, Apple Pay. Looks like Tesla.</p></div>
<div style={{background:'#fff',border:'1px solid #eee',borderRadius:20,padding:20}}><b>20-Min Booking</b><p style={{fontSize:13,color:'#666'}}>Photo → Price → Stripe $497 → Calendar. No phone tag.</p></div>
<div style={{background:'#fff',border:'1px solid #eee',borderRadius:20,padding:20}}><b>3x Faster + SEO</b><p style={{fontSize:13,color:'#666'}}>Next.js 15, 98 Lighthouse, auto schema. 0.8s vs 4.2s.</p></div>
</div>
<div style={{marginTop:40,textAlign:'center',background:'#fff',border:'1px solid #eee',borderRadius:28,padding:40}}>
<h2 style={{fontSize:36}}>PLUMBING Elite • AI Concierge</h2>
<p style={{color:'#666'}}>Same business {domain}, but looks like $50k brand. Live in 24h.</p>
<a href={`https://wa.me/923000000000?text=APPROVE%20${domain}%20$497`} style={{background:'#25D366',color:'#fff',padding:'16px 32px',borderRadius:100,textDecoration:'none',fontWeight:800,display:'inline-block',marginTop:20}}>WhatsApp: APPROVE SITE — $497</a>
</div>
</div>
</div>
)
}

