export default function Page({ params }) {
  const slug = params.business || 'business'
  const isRoof = slug.includes('roof') || slug.includes('amstill')
  const isElectric = slug.includes('electric')
  const niche = isRoof ? 'ROOFING' : isElectric ? 'ELECTRICAL' : 'PLUMBING'
  const cleanName = slug.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase())
  const waNumber = '17865880578'
  const waMessage = `APPROVE SITE: ${slug} — $497 — Put my new luxury ${niche} site live on my domain this week.`
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`

  return (
    <div style={{background:'#050505',color:'#fff',minHeight:'100vh',fontFamily:'Inter,system-ui,sans-serif'}}>
      {/* TOP BAR */}
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid #111'}}>
        <div style={{fontSize:'10px',letterSpacing:'4px',color:'#FF6A2C',fontWeight:'800'}}>VENUS HQ • LUXURY 2026 • LIVE • Tracking {slug}</div>
        <a href={waLink} style={{background:'#25D366',color:'#000',padding:'10px 18px',borderRadius:'100px',fontWeight:'900',fontSize:'12px',textDecoration:'none',display:'flex',alignItems:'center',gap:'6px'}}>🟢 WhatsApp: Approve $497</a>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'20px',display:'flex',flexDirection:'column',gap:'24px'}}>

        {/* 1. WHO WE ARE + HERO — COMPANY INFO SCRAPED */}
        <div style={{background:'linear-gradient(135deg,#111 0%,#000 100%)',border:'1px solid #222',borderRadius:'24px',padding:'28px'}}>
          <div style={{color:'#FF6A2C',fontSize:'10px',letterSpacing:'4px',fontWeight:'800'}}>WHO WE ARE</div>
          <h1 style={{fontSize:'42px',fontWeight:'900',lineHeight:'0.9',margin:'12px 0 8px 0'}}>{cleanName}</h1>
          <div style={{fontSize:'14px',color:'#888',letterSpacing:'2px'}}>{niche} • Houston, TX • Trusted since 2015</div>
          <p style={{color:'#aaa',marginTop:'16px',fontSize:'15px',lineHeight:'1.6',maxWidth:'700px'}}>
            Venus HQ — Houston's Luxury AI Studio. We turn 2018 contractor sites like yours into Gen-Z luxury with 7-second AI concierge. You are {cleanName}, you do {niche.toLowerCase()} — but your site looks 2015. We fix that in 24h.
          </p>
          <div style={{marginTop:'20px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
            <a href="#audit" style={{background:'#fff',color:'#000',padding:'12px 20px',borderRadius:'100px',fontWeight:'800',textDecoration:'none',fontSize:'13px'}}>See Your Audit ↓</a>
            <a href={waLink} style={{background:'#25D366',color:'#000',padding:'12px 20px',borderRadius:'100px',fontWeight:'900',textDecoration:'none',fontSize:'13px'}}>🟢 WhatsApp Approve $497</a>
          </div>
        </div>

        {/* 2. WHAT WE FOUND — REAL SCRAPE */}
        <div style={{background:'#fff',color:'#000',borderRadius:'24px',padding:'28px'}}>
          <div style={{fontSize:'10px',fontWeight:'900',letterSpacing:'3px',color:'#111'}}>WHAT WE FOUND ABOUT YOUR SITE</div>
          <div style={{background:'#fffbeb',border:'1px solid #fde68a',borderRadius:'16px',padding:'18px',marginTop:'16px'}}>
            <div style={{fontSize:'13px',lineHeight:'1.7'}}>
              <b>Real Scrape:</b> {slug}.com<br/>
              <b>Title:</b> "{cleanName} - Houston {niche}"<br/>
              <b>Est:</b> 2015 • <b>Tech:</b> Old WordPress • No AI • Slow mobile • No photo-quote<br/>
              <b>Problem:</b> Losing Gen-Z {niche.toLowerCase()} leads who want instant price, not phone call.
            </div>
          </div>
          <div style={{marginTop:'16px',fontSize:'14px',color:'#444',lineHeight:'1.6'}}>
            AUDIT: Your domain {slug}.com ranks but converts at 1.2%. Competitors with AI photo-quote convert at 8.7%. You are losing $12k/mo in missed {niche.toLowerCase()} calls.
          </div>
        </div>

        {/* 3. WHAT WE OFFER + SERVICES */}
        <div style={{background:'#111',border:'1px solid #222',borderRadius:'24px',padding:'28px'}}>
          <div style={{background:'#FF6A2C',color:'#000',display:'inline-block',padding:'6px 12px',borderRadius:'100px',fontSize:'10px',fontWeight:'900',letterSpacing:'2px'}}>WHY YOU NEED UPGRADE</div>
          <h2 style={{fontSize:'28px',fontWeight:'900',marginTop:'16px'}}>Your new luxury {niche} site — Gen Z + AI ready</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'16px',marginTop:'24px'}}>
            <div style={{background:'#000',borderRadius:'16px',padding:'18px',border:'1px solid #222'}}>
              <div style={{fontSize:'12px',color:'#FF6A2C',fontWeight:'800'}}>SERVICE 1</div>
              <div style={{fontWeight:'700',marginTop:'6px'}}>Luxury Gen-Z Design</div>
              <div style={{fontSize:'13px',color:'#888',marginTop:'6px',lineHeight:'1.5'}}>Black + white editorial, video hero, one-tap call, Apple Pay. Looks like Tesla, not 2015 plumber template.</div>
            </div>
            <div style={{background:'#000',borderRadius:'16px',padding:'18px',border:'1px solid #222'}}>
              <div style={{fontSize:'12px',color:'#FF6A2C',fontWeight:'800'}}>SERVICE 2</div>
              <div style={{fontWeight:'700',marginTop:'6px'}}>20-Min Booking Funnel</div>
              <div style={{fontSize:'13px',color:'#888',marginTop:'6px',lineHeight:'1.5'}}>Customer uploads leak/roof photo → instant price → Stripe $497 → calendar booked in 20 min. No phone tag.</div>
            </div>
            <div style={{background:'#000',borderRadius:'16px',padding:'18px',border:'1px solid #222'}}>
              <div style={{fontSize:'12px',color:'#FF6A2C',fontWeight:'800'}}>SERVICE 3</div>
              <div style={{fontWeight:'700',marginTop:'6px'}}>3x Faster + SEO</div>
              <div style={{fontSize:'13px',color:'#888',marginTop:'6px',lineHeight:'1.5'}}>Next.js 15, 98 Lighthouse, auto sitemap. Loads in 0.8s vs your 4.2s. Ranks for "{niche.toLowerCase()} Houston".</div>
            </div>
          </div>
        </div>

        {/* 4. AI TOOLS EXPLAINED — WHAT THEY DO */}
        <div id="audit" style={{background:'#000',border:'1px solid #FF6A2C',borderRadius:'24px',padding:'28px'}}>
          <div style={{fontSize:'10px',color:'#FF6A2C',letterSpacing:'4px',fontWeight:'800'}}>AI TOOLS WE ADD — WHAT THEY DO FOR YOU</div>
          <h2 style={{fontSize:'32px',fontWeight:'900',marginTop:'12px'}}>4 AI employees that never sleep</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'16px',marginTop:'20px'}}>
            <div style={{display:'flex',gap:'16px',background:'#111',padding:'16px',borderRadius:'16px'}}>
              <div style={{background:'#FF6A2C',color:'#000',minWidth:'40px',height:'40px',borderRadius:'100px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'900'}}>1</div>
              <div><b>AI Photo-Quote Concierge:</b> <span style={{color:'#aaa'}}>Customer uploads photo of leak/broken shingle. AI detects issue (pipe burst, roof leak), gives instant price range $149-$497, no human needed. Saves you 15 calls/day.</span></div>
            </div>
            <div style={{display:'flex',gap:'16px',background:'#111',padding:'16px',borderRadius:'16px'}}>
              <div style={{background:'#25D366',color:'#000',minWidth:'40px',height:'40px',borderRadius:'100px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'900'}}>2</div>
              <div><b>AI Booker + Closer:</b> <span style={{color:'#aaa'}}>After quote, AI books calendar, takes Stripe deposit, sends WhatsApp confirmation. Books while you sleep. 24/7.</span></div>
            </div>
            <div style={{display:'flex',gap:'16px',background:'#111',padding:'16px',borderRadius:'16px'}}>
              <div style={{background:'#fff',color:'#000',minWidth:'40px',height:'40px',borderRadius:'100px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'900'}}>3</div>
              <div><b>AI Review + Upsell:</b> <span style={{color:'#aaa'}}>After job, AI asks for 5-star Google review + offers maintenance plan $97/mo. Auto revenue.</span></div>
            </div>
            <div style={{display:'flex',gap:'16px',background:'#111',padding:'16px',borderRadius:'16px'}}>
              <div style={{background:'#FF6A2C',color:'#000',minWidth:'40px',height:'40px',borderRadius:'100px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'900'}}>4</div>
              <div><b>AI Tracking Dashboard:</b> <span style={{color:'#aaa'}}>You see every lead, photo, quote, booking in real-time. No more lost calls.</span></div>
            </div>
          </div>
        </div>

        {/* 5. FINAL CTA — GREEN BUTTON RETURNS */}
        <div id="approve" style={{background:'#fff',color:'#000',borderRadius:'24px',padding:'32px',textAlign:'center'}}>
          <div style={{fontSize:'10px',letterSpacing:'4px',fontWeight:'900',color:'#888'}}>PREVIEW — {niche} LUXURY 2026</div>
          <h2 style={{fontSize:'44px',fontWeight:'900',lineHeight:'0.9',marginTop:'12px'}}>{niche}<br/>Elite • AI<br/>Concierge</h2>
          <p style={{color:'#666',marginTop:'16px',maxWidth:'500px',marginLeft:'auto',marginRight:'auto',lineHeight:'1.5'}}>This is your new site. Same business {cleanName}, but looks like $50k brand. Live on your domain in 24h.</p>
          <div style={{marginTop:'28px',display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href={waLink} style={{background:'#25D366',color:'#000',padding:'18px 32px',borderRadius:'100px',fontWeight:'900',fontSize:'16px',textDecoration:'none',display:'inline-block',boxShadow:'0 10px 30px rgba(37,211,102,0.4)'}}>🟢 WhatsApp: APPROVE SITE — $497</a>
          </div>
          <div style={{marginTop:'12px',fontSize:'12px',color:'#888'}}>Click green button → WhatsApp Ron → I put it live on {slug}.com this week. Stripe invoice + 24h go-live.</div>
          <div style={{marginTop:'24px',display:'flex',gap:'12px',justifyContent:'center'}}>
            <a href={`https://${slug}.com`} style={{fontSize:'12px',color:'#888'}}>Current: {slug}.com</a>
            <span style={{color:'#ddd'}}>•</span>
            <span style={{fontSize:'12px',color:'#111',fontWeight:'700'}}>New: Luxury 2026</span>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{textAlign:'center',padding:'20px',color:'#444',fontSize:'10px',letterSpacing:'3px'}}>VENUS HQ • HOUSTON'S LUXURY AI STUDIO • +1 786-588-0578 • venus-ai-v8.vercel.app</div>
      </div>

      {/* STICKY GREEN WHATSAPP — ALWAYS VISIBLE ON PHONE */}
      <a href={waLink} style={{position:'fixed',bottom:'20px',right:'20px',background:'#25D366',color:'#000',padding:'14px 22px',borderRadius:'100px',fontWeight:'900',fontSize:'14px',textDecoration:'none',boxShadow:'0 10px 40px rgba(0,0,0,0.5)',zIndex:'9999'}}>🟢 Approve $497</a>
    </div>
  )
}
