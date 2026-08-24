import fs from 'fs';
import path from 'path';
export const dynamic='force-dynamic';

export default function Page({ params }) {
  const slug = params.business || params.slug || "houston-plumbing-pros";
  let j = null;
  try{
    const fp = path.join(process.cwd(),'factory',`${slug}.json`);
    if(fs.existsSync(fp)) j = JSON.parse(fs.readFileSync(fp,'utf8'));
  }catch{}

  const domain = j?.oldSite || j?.domain || `${slug}.com`;
  const businessName = j?.businessName || slug.replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase());
  const niche = j?.niche || (domain.includes('roof')? 'ROOFING' : domain.includes('electric')? 'ELECTRICAL' : 'PLUMBING');
  const realTitle = j?.realTitle || `${businessName} - Houston ${niche}`;
  const est = j?.est || '2015';
  const audit = j?.audit || null;
  const whatsappHref = `https://wa.me/17865880578?text=APPROVE SITE: ${slug} - ${businessName}`;

  return (
    <div style={{background:"#FCFBF8",minHeight:"100vh"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');`}</style>
      <div style={{background:"black",color:"white",padding:"12px 24px",display:"flex",justifyContent:"space-between",fontSize:11,letterSpacing:2}}>
        <span>VENUS HQ — LUXURY 2026 • PRIVATE AUDIT FOR {niche} • REAL SCRAPE</span>
        <span style={{opacity:0.5}}>• Live • Tracking {businessName}</span>
      </div>
      <div style={{maxWidth:1240,margin:"0 auto",padding:"40px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:32}}>
          <div>
            <div style={{fontFamily:"Inter",fontSize:11,letterSpacing:4,color:"#FF6A2C",fontWeight:800}}>WHO WE ARE</div>
            <h1 style={{fontSize:64,lineHeight:0.9,margin:"12px 0 0 0",fontWeight:900}}>{businessName}<br/><span style={{color:"#888",fontSize:28}}>{niche} • Houston</span></h1>
            <p style={{fontFamily:"Inter",color:"#666",marginTop:20,lineHeight:1.6}}>{audit?.whoWeAre || `Venus HQ — Houston's Luxury AI Studio. We turn 2018 contractor sites into Gen-Z luxury with 7-second AI concierge.`}</p>
            <div style={{background:"black",color:"white",padding:"20px",borderRadius:16,marginTop:24}}>
              <div style={{fontFamily:"Inter",fontSize:11,letterSpacing:2,color:"#FF6A2C"}}>WHAT WE DO</div>
              <p style={{marginTop:8,lineHeight:1.6,fontSize:14}}>{audit?.whatWeDo || `We rebuild ${niche} sites with AI photo-quote, 20-min booking, Stripe $497, 24h go-live.`}</p>
            </div>
            <div style={{background:"#fff",border:"1px solid #eee",borderRadius:16,padding:20,marginTop:20}}>
              <div style={{fontFamily:"Inter",fontSize:11,letterSpacing:2,fontWeight:800}}>WHAT WE FOUND ABOUT YOUR SITE</div>
              <div style={{marginTop:12,background:"#fffbeb",padding:12,borderRadius:10,fontSize:12}}><b>Real Scrape:</b> {domain}<br/>Title="{realTitle}"<br/>Est {est} • Old WP • No AI • Slow mobile</div>
              <p style={{marginTop:12,lineHeight:1.6,fontSize:13,color:"#333"}}>{audit?.whatWeFound || `AUDIT of ${domain}: Title="${realTitle}". Old template from ${est}, no AI, losing Gen-Z ${niche} leads.`}</p>
            </div>
          </div>
          <div style={{background:"black",borderRadius:32,padding:24,color:"white"}}>
            <div style={{background:"#FF6A2C",display:"inline-block",padding:"6px 12px",borderRadius:20,fontSize:11,letterSpacing:2,fontWeight:800}}>WHY YOU NEED UPGRADE</div>
            <h2 style={{fontSize:32,marginTop:20,lineHeight:1.1}}>Your new luxury {niche} site — Gen Z + AI ready</h2>
            <p style={{fontFamily:"Inter",fontSize:12,opacity:0.7,marginTop:12,lineHeight:1.6}}>{audit?.whyUpgrade || `${businessName} trusted since ${est} but site looks ${est}. Gen-Z ${niche} homeowners don't call — they upload photo for instant price.`}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:24}}>
              <a href={`#preview-${slug}`} style={{background:"white",color:"black",padding:"14px",borderRadius:100,textAlign:"center",fontWeight:800,textDecoration:"none",fontSize:13}}>See Audit ↓</a>
              <a href={whatsappHref} target="_blank" style={{background:"#FF6A2C",color:"black",padding:"14px",borderRadius:100,textAlign:"center",fontWeight:800,textDecoration:"none",fontSize:13}}>Approve $497</a>
            </div>
          </div>
        </div>
      </div>
      <div id={`preview-${slug}`} style={{background:"black",color:"white",padding:"80px 24px",marginTop:40}}>
        <p style={{color:"#FF6A2C",fontFamily:"Inter",letterSpacing:4,fontSize:11,textAlign:"center"}}>PREVIEW — {niche} LUXURY 2026</p>
        <h1 style={{fontSize:64,marginTop:20,textAlign:"center"}}>{niche}<br/>Elite • AI Concierge</h1>
        <div style={{maxWidth:480,margin:"60px auto 0 auto",textAlign:"center"}}>
          <a href={whatsappHref} target="_blank" style={{background:"white",color:"black",display:"inline-block",marginTop:20,padding:"16px 32px",borderRadius:100,fontWeight:900,textDecoration:"none"}}>APPROVE SITE: {slug} — $497</a>
        </div>
      </div>
    </div>
  );
}
