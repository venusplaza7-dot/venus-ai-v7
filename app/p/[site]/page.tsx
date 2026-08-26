export default function Page({params}:{params:{site:string}}){
const slug = params.site || '24hrplumbinghouston-com'
const domain = slug.replace(/-com$|-\w+$/,'').replace(/-/g,'.') + '.com'
const prettyDomain = domain.replace('.com',' Com').replace(/\b\w/g,l=>l.toUpperCase())
const title = `${prettyDomain} — Houston PLUMBING`
const audit = {
 real: domain,
 title: title,
 est: '2015',
 tech: 'Old WordPress + No AI',
 prob: 'Losing Gen-Z leaks who want photo-quote, not phone call'
}
return(
<div style={{background:'#fcfcfa',color:'#111',fontFamily:'Inter,ui-sans-serif',minHeight:'100vh'}}>
<div style={{background:'#111',color:'#ff6a00',padding:'8px 0',textAlign:'center',fontSize:11,letterSpacing:2,fontWeight:700}}>
VENUS HQ — JANUARY 2026 • LIVE • Tracking {domain} • AI Studio
</div>
<div style={{maxWidth:1100,margin:'0 auto',padding:'40px 20px'}}>
<h1 style={{fontSize:64,fontWeight:900,letterSpacing:-3,lineHeight:0.9,margin:0}}>{domain.replace('.com','')}<br/><span style={{color:'#888',fontWeight:400}}>Com</span></h1>
<p style={{color:'#666',marginTop:8}}>PLUMBING • Houston, TX • Trusted since {audit.est}</p>
<div style={{marginTop:24,background:'#111',color:'#fff',borderRadius:20,padding:28,display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:20}}>
<div>
<p style={{fontSize:13,color:'#ff6a00',letterSpacing:2}}>VENUS HQ — LUXURY AI STUDIO</p>
<p style={{fontSize:20,lineHeight:1.3,marginTop:10}}>We turn 2018 contractor sites like yours into <b style={{color:'#fff'}}>Gen-Z luxury with 7-second photo-quote.</b> You are {audit.real}, you do plumbing — but your site looks {audit.est}. We fix that in 24h.</p>
<div style={{marginTop:20,display:'flex',gap:10}}>
<span style={{background:'#fff',color:'#111',padding:'10px 18px',borderRadius:100,fontSize:13,fontWeight:700}}>See Your Audit ↓</span>
<span style={{background:'#25D366',color:'#fff',padding:'10px 18px',borderRadius:100,fontSize:13,fontWeight:700}}>WhatsApp Approve $497</span>
</div>
</div>
<div style={{background:'#fff',color:'#111',borderRadius:16,padding:18,fontSize:12,lineHeight:1.6}}>
<b>WHAT WE FOUND ABOUT YOUR SITE</b><br/>
Real Scrape: {audit.real}<br/>
Title: {audit.title}<br/>
Est: {audit.est} • Tech: {audit.tech} • No AI • Slow mobile<br/>
Problem: {audit.prob}<br/><br/>
<b>AUDIT:</b> Your domain {domain} ranks but converts at 1.2%. Competitors with AI photo-quote convert at 8.7%. You are losing $12k/mo plumbing calls.
</div>
</div>
<div style={{marginTop:40}}>
<h2 style={{fontSize:36,fontWeight:800,letterSpacing:-1}}>Your new luxury PLUMBING site — <span style={{color:'#ff6a00'}}>Gen Z + AI ready</span></h2>
<div style={{marginTop:20,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
<div style={{background:'#111',color:'#fff',borderRadius:20,padding:20}}>
<p style={{color:'#ff6a00',fontSize:11}}>SERVICE 1</p>
<b>Luxury Gen-Z Design</b><p style={{fontSize:13,color:'#aaa',marginTop:8}}>Black + white editorial, video hero, one-tap call, Apple Pay. Looks like Tesla, not 2015 plumber template.</p>
</div>
<div style={{background:'#111',color:'#fff',borderRadius:20,padding:20}}>
<p style={{color:'#ff6a00',fontSize:11}}>SERVICE 2</p>
<b>20-Min Booking Funnel</b><p style={{fontSize:13,color:'#aaa',marginTop:8}}>Customer uploads leak/roof photo → instant price → Stripe $497 → calendar booked in 20 min. No phone tag.</p>
<div style={{marginTop:12,background:'#222',borderRadius:12,padding:12}}>
<div style={{background:'#fff',borderRadius:8,padding:8,textAlign:'center',fontSize:11,color:'#111'}}>📸 Upload leak photo → AI price → Booked</div>
</div>
</div>
<div style={{background:'#111',color:'#fff',borderRadius:20,padding:20}}>
<p style={{color:'#ff6a00',fontSize:11}}>SERVICE 3</p>
<b>3x Faster + SEO</b><p style={{fontSize:13,color:'#aaa',marginTop:8}}>Next.js 15, 98 Lighthouse, auto schema, GBP sync. 0.8s vs your 4.2s. Ranks for "24hr plumber Houston"</p>
</div>
</div>
</div>
<div style={{marginTop:40,border:'1px solid #ff6a00',borderRadius:20,padding:24}}>
<h3 style={{margin:0}}>4 AI employees that never sleep</h3>
<div style={{marginTop:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
<div style={{display:'flex',gap:10}}><span style={{background:'#ff6a00',color:'#fff',width:28,height:28,borderRadius:100,display:'flex',alignItems:'center',justifyContent:'center'}}>1</span><p style={{margin:0,fontSize:13}}><b>AI Photo-Quote Concierge:</b> Customer uploads photo of leak/broken shingle. AI detects issue (pipe burst, roof leak), gives price $149-$497, no human needed. Saves you 15 calls/day.</p></div>
<div style={{display:'flex',gap:10}}><span style={{background:'#25D366',color:'#fff',width:28,height:28,borderRadius:100,display:'flex',alignItems:'center',justifyContent:'center'}}>2</span><p style={{margin:0,fontSize:13}}><b>AI Booker + Closer:</b> After quote, AI books calendar, takes Stripe deposit, sends WhatsApp confirmation. Books while you sleep.</p></div>
<div style={{display:'flex',gap:10}}><span style={{background:'#111',color:'#fff',width:28,height:28,borderRadius:100,display:'flex',alignItems:'center',justifyContent:'center'}}>3</span><p style={{margin:0,fontSize:13}}><b>AI Review + Upsell:</b> After job, AI asks for 5-star Google review + offers maintenance plan $97/mo. Auto revenue.</p></div>
<div style={{display:'flex',gap:10}}><span style={{background:'#ff6a00',color:'#fff',width:28,height:28,borderRadius:100,display:'flex',alignItems:'center',justifyContent:'center'}}>4</span><p style={{margin:0,fontSize:13}}><b>AI Tracking Dashboard:</b> You see every lead, photo, quote, booking in real-time. No more lost calls.</p></div>
</div>
</div>
<div style={{marginTop:40,background:'#fff',border:'1px solid #eee',borderRadius:20,padding:40,textAlign:'center'}}>
<p style={{fontSize:10,letterSpacing:3}}>PREVIEW — PLUMBING LUXURY 2026</p>
<h2 style={{fontSize:40,fontWeight:900,lineHeight:1}}>PLUMBING<br/>Elite • AI<br/>Concierge</h2>
<p style={{color:'#666',marginTop:12}}>This is your new site. Same business {domain}, but looks like $50k brand. Live on your domain in 24h.</p>
<a href={`https://wa.me/923000000000?text=APPROVE%20${domain}%20-%20$497`} style={{background:'#25D366',color:'#fff',padding:'16px 32px',borderRadius:100,textDecoration:'none',fontWeight:800,display:'inline-block',marginTop:20}}>WhatsApp: APPROVE SITE — $497</a>
<p style={{fontSize:11,color:'#999',marginTop:12}}>Click green button → WhatsApp Ron → I put it live on {domain} this week. Stripe invoice + 2h go live.</p>
</div>
</div>
</div>
)
}
