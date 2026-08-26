import { NextResponse } from 'next/server'

export async function GET(){
 const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#050505;padding:20px">
<div style="max-width:600px;margin:0 auto;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;overflow:hidden;font-family:Arial,sans-serif">

<div style="background:#000;padding:16px 24px;display:flex;justify-content:space-between">
  <span style="font-size:10px;letter-spacing:3px;color:#555">VENUS HQ - HOUSTON RESEARCH</span>
  <span style="font-size:10px;color:#C9A86A">$1999 to $497 - 23H LEFT</span>
</div>

<div style="padding:32px 28px">
  <h1 style="color:#fff;font-size:34px;line-height:1.1;margin:0;font-family:Georgia,serif">We found<br><span style="color:#888">24hrplumbinghouston.com</span><br><span style="color:#C9A86A;font-style:italic">losing you 40% jobs.</span></h1>
  
  <div style="margin:20px 0;padding:16px;background:#111;border-left:3px solid #C9A86A;border-radius:8px">
    <div style="font-size:12px;color:#fff;font-weight:800">Hi - We are Venus AI, Houston's Gen-Z conversion lab.</div>
    <div style="font-size:13px;color:#aaa;line-height:1.6;margin-top:8px">
      We audited 147 Houston plumbers last week. <b style="color:#fff">Your site has not been updated since around 2015</b> - same template from 2010-2020 era. 
      Looks trustworthy to 45+ but <b style="color:#fff">Gen-Z (67% of Houston renters) never calls.</b> They click. If no instant price in 3 seconds, they go to next Google result.
    </div>
  </div>

  <div style="display:block">
    <div style="background:#1a0a0a;border:1px solid #331111;padding:14px;border-radius:10px;margin-bottom:12px">
      <div style="font-size:10px;color:#ff6666;font-weight:800;letter-spacing:1px">YOUR CURRENT (2010 ERA)</div>
      <div style="font-size:12px;color:#888;line-height:1.7;margin-top:8px">
        - 8.4s load on mobile<br>
        - Call Now only - no text<br>
        - No photo quote = free trips<br>
        - Office closed = missed jobs<br>
        - 0 Google reviews funnel
      </div>
    </div>
    <div style="background:#0a1a0a;border:1px solid #113311;padding:14px;border-radius:10px">
      <div style="font-size:10px;color:#00ff88;font-weight:800;letter-spacing:1px">NEW - GEN-Z LUXURY 2026</div>
      <div style="font-size:12px;color:#ccc;line-height:1.7;margin-top:8px">
        - 0.8s luxury black/white/gold<br>
        - 3-sec AI Dispatch (text + call)<br>
        - Photo diagnostic = instant range<br>
        - Auto-books while you sleep<br>
        - +40% jobs avg (12 clients)
      </div>
    </div>
  </div>

  <div style="margin:24px 0;background:#fff;color:#000;padding:20px;border-radius:12px">
    <div style="font-size:11px;letter-spacing:2px;font-weight:900;color:#666">WHY 40%? GEN-Z DATA - NOT OPINION</div>
    <div style="font-size:13px;line-height:1.6;margin-top:10px">
      <b>73% of under-35s</b> will not make a phone call for a quote (Forbes 2024).<br>
      <b>85% want photo-based</b> instant pricing.<br>
      <b>2.3x more bookings</b> when site has WhatsApp + auto-scheduler.<br><br>
      Your competitor on Richmond Ave launched this last month - <b>now #1 for emergency plumber Houston</b> because Google ranks fast + interactive sites.
    </div>
  </div>

  <a href="https://venus-ai-v8.vercel.app/p/24hrplumbinghouston-com" style="display:block;text-align:center;background:#fff;color:#000;padding:16px;border-radius:999px;font-weight:900;font-size:13px;letter-spacing:1.5px;text-decoration:none">VIEW YOUR NEW LIVE SITE -></a>
  <div style="text-align:center;margin-top:10px;font-size:11px;color:#666">No mockup - fully working with your number, area, 4 AI agents</div>
</div>

<div style="background:#111;border-top:1px solid #1a1a1a;padding:28px;text-align:center">
  <div style="font-size:10px;letter-spacing:3px;color:#555">INVITATION TO LAUNCH</div>
  <div style="font-family:Georgia,serif;font-size:32px;color:#fff;margin:12px 0">Launch within<br><span style="color:#C9A86A">24 hours.</span></div>
  <div style="font-size:12px;color:#888;line-height:1.5">We hold this design for 24h only for 24hrplumbinghouston.com.<br>After that, we offer same luxury build to next plumber in 77002.</div>
  <a href="https://wa.me/17865880578?text=CONFIRM%20HOUSTON%20-%20LAUNCH%20NOW%20$497" style="display:inline-block;margin-top:18px;background:#25D366;color:#fff;padding:14px 28px;border-radius:999px;font-weight:900;font-size:12px;text-decoration:none">CONFIRM VIA WHATSAPP - $497</a>
  <div style="margin-top:12px;font-size:11px;color:#444">Direct +1 (786) 588-0578 - Full build value $1999 to $497 today</div>
</div>

</div>
</body></html>`

 return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
