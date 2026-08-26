export default function Page() {
  const domain = '24hrplumbinghouston.com'
  const wa = `https://wa.me/17865880578?text=APPROVE%20${domain}%20$497`
  return (
    <div style={{minHeight:'100vh', background:'#000000', color:'#ffffff', fontFamily:'Inter, sans-serif'}}>
      <div style={{background:'#000', borderBottom:'1px solid #222', textAlign:'center', padding:'8px', fontSize:'10px', letterSpacing:'2px', color:'#888'}}>
        VENUS HQ • $1999 → $497 • 23H 35M • {domain.toUpperCase()}
      </div>
      <div style={{maxWidth:'800px', margin:'0 auto', padding:'40px 24px'}}>
        <h1 style={{fontSize:'56px', lineHeight:'0.9', fontWeight:900, margin:0}}>
          <span style={{color:'#fff'}}>Houston&apos;s Most</span><br/>
          <span style={{color:'#a1a1aa'}}>Trusted PLUMBING</span><br/>
          <span style={{color:'#c9a86a', fontStyle:'italic', fontWeight:300}}>Gen-Z Luxury 2026</span>
        </h1>

        <div style={{marginTop:'32px', display:'grid', gap:'12px'}}>
          <div style={{background:'#ffffff', color:'#000000', borderRadius:'16px', padding:'16px', fontWeight:700}}>Dispatch Agent — PLUMBING</div>
          <div style={{background:'#171717', color:'#a1a1aa', borderRadius:'16px', padding:'16px', border:'1px solid #27272a'}}>Photo-Diagnostics — instant quote</div>
          <div style={{background:'#171717', color:'#a1a1aa', borderRadius:'16px', padding:'16px', border:'1px solid #27272a'}}>Quote & Closer — auto book</div>
        </div>

        <div style={{marginTop:'40px', background:'#ffffff', color:'#000000', borderRadius:'32px', padding:'40px'}}>
          <h2 style={{fontSize:'32px', fontWeight:800, margin:0}}>Houston PLUMBING Elite</h2>
          <p style={{marginTop:'12px', color:'#52525b', lineHeight:'1.6'}}>Complete new beautiful website — autonomous build. Black/White/Gold luxury with 4 AI Agents.</p>
          <a href={wa} style={{display:'inline-block', marginTop:'24px', background:'#22c55e', color:'#fff', fontWeight:800, fontSize:'12px', letterSpacing:'2px', padding:'18px 32px', borderRadius:'999px', textDecoration:'none'}}>
            WHATSAPP: APPROVE & LAUNCH →
          </a>
          <p style={{marginTop:'12px', fontSize:'12px', color:'#71717a'}}>Authorization {domain} — $1999 → $497 — Approve?</p>
        </div>
      </div>
    </div>
  )
}









