import { NextResponse } from 'next/server'

export async function GET(){
 const html = `
 <div style="background:#0a0a0a;color:#fff;font-family:'Playfair Display',Georgia,serif;padding:40px;max-width:600px;margin:0 auto;border:1px solid #222">
  <div style="font-size:10px;letter-spacing:3px;color:#666;margin-bottom:24px">VENUS HQ • AGENT AUDIT • HOUSTON TX</div>
  
  <h1 style="font-size:36px;line-height:1.1;margin:0 0 20px 0">Your new<br><span style="color:#C9A86A;font-style:italic">website is ready</span><br>for review.</h1>
  <div style="width:40px;height:2px;background:#C9A86A;margin:20px 0"></div>

  <!-- CLEAR INFO BLOCK -->
  <div style="background:#111;border:1px solid #222;padding:20px;border-radius:12px;margin:20px 0;font-family:sans-serif">
    <div style="color:#ff4444;font-size:12px;font-weight:800;letter-spacing:1px">OLD SITE AUDIT — 24hrplumbinghouston.com</div>
    <div style="color:#888;font-size:13px;margin-top:6px;line-height:1.5">
      ✗ 8.2s load time (losing 60% calls)<br>
      ✗ No instant quote — customer waits<br>
      ✗ No photo diagnostic — you drive for free<br>
      ✗ No auto-booking — office misses after-hours
    </div>
    <div style="margin-top:16px;color:#00ff88;font-size:12px;font-weight:800;letter-spacing:1px">NEW — GEN-Z LUXURY + 4 AI AGENTS</div>
    <div style="color:#fff;font-size:13px;margin-top:6px;line-height:1.7">
      <b>1. Dispatch Agent:</b> Answers in 3 sec, qualifies emergency vs. routine<br>
      <b>2. Photo-Diagnostics:</b> Customer uploads leak photo → AI gives instant price range → no free trip<br>
      <b>3. Quote & Closer:</b> Sends licensed quote + books slot automatically<br>
      <b>4. Review Agent:</b> Auto-asks for 5-star after job → ranks you #1 in Houston
    </div>
    <div style="margin-top:12px;color:#C9A86A;font-size:12px">Result: 0.8s load, 24/7 booking, +$12k/mo extra jobs (avg client)</div>
  </div>

  <a href="https://venus-ai-v8.vercel.app/p/24hrplumbinghouston-com" style="display:inline-block;background:#fff;color:#000;padding:14px 28px;border-radius:999px;font-family:sans-serif;font-weight:800;font-size:12px;letter-spacing:1.5px;text-decoration:none">VIEW LIVE PROPOSAL →</a>

  <div style="background:#111;margin:24px 0;padding:24px;border-radius:12px;text-align:center;border:1px solid #1a1a1a">
    <div style="font-size:10px;letter-spacing:3px;color:#555;font-family:sans-serif">INVITATION TO LAUNCH</div>
    <div style="font-size:32px;margin:12px 0">Launch within<br><span style="color:#C9A86A">24 hours.</span></div>
    <div style="font-family:sans-serif;font-size:12px;color:#888;line-height:1.5">We keep this design reserved for 24h only.<br>After that we release to next plumber in Houston.</div>
    <a href="https://wa.me/17865880578?text=CONFIRM%20HOUSTON%20PLUMBING%20LAUNCH%20-%20497" style="display:inline-block;margin-top:16px;background:#25D366;color:#fff;padding:14px 28px;border-radius:999px;font-family:sans-serif;font-weight:800;font-size:12px;letter-spacing:1px;text-decoration:none">CONFIRM VIA WHATSAPP</a>
    <div style="margin-top:12px;font-family:sans-serif;font-size:11px;color:#555">DIRECT +1 (786) 588-0578 • LAUNCH PRICE $1999 → <span style="color:#fff">$497 today</span></div>
  </div>

  <div style="font-family:sans-serif;font-size:10px;color:#333;text-align:center">© 2026 Venus AI HQ • Houston Luxury Division</div>
 </div>
 `

 // your Brevo send logic here - keep same
 return NextResponse.json({ok:true, html_preview: "email ready"})
}
