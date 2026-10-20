export default function Page() {
  const html = `
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Inter',sans-serif;background:#0A0A0A;color:#fff;overflow-x:hidden}
      .mono{font-family:'JetBrains Mono',monospace}
      .top{position:sticky;top:0;z-index:50;background:rgba(10,10,10,0.9);backdrop-filter:blur(12px);border-bottom:1px solid #222;display:flex;justify-content:space-between;align-items:center;padding:14px 24px}
      .logo{font-weight:900;letter-spacing:-1px;font-size:14px}.logo span{color:#FF6A00}.logo b{color:#D4AF37}
      .badge{display:inline-flex;gap:8px;align-items:center;border:1px solid #333;background:#111;padding:6px 12px;border-radius:100px;font-size:10px;letter-spacing:1px}
      .dot{width:6px;height:6px;background:#22c55e;border-radius:50%;box-shadow:0 0 8px #22c55e}
      .hero{padding:80px 24px 40px;max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1.2fr 0.8fr;gap:40px}
      @media(max-width:900px){.hero{grid-template-columns:1fr;padding:40px 20px}}
      .h1{font-size:clamp(40px,6vw,88px);line-height:0.9;font-weight:900;letter-spacing:-3px}
      .h1 .silver{color:#C0C0C0}.h1 .gold{color:#D4AF37}.h1 .orange{color:#FF6A00}
      .sub{color:#999;font-size:16px;line-height:1.6;margin-top:20px;max-width:520px}
      .ctaRow{display:flex;gap:12px;margin-top:28px;flex-wrap:wrap}
      .btnOrange{background:#FF6A00;color:#000;padding:16px 28px;font-weight:800;font-size:13px;text-decoration:none;display:inline-block;letter-spacing:0.5px}
      .btnGhost{border:1px solid #333;color:#fff;padding:15px 28px;font-weight:600;font-size:13px;text-decoration:none;background:#111}
      .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#222;border:1px solid #222;margin-top:32px}
      .stat{background:#0A0A0A;padding:18px}.stat b{font-size:22px;display:block}.stat span{font-size:10px;color:#777;letter-spacing:1px}
      .rightCard{background:linear-gradient(180deg,#141414,#0A0A0A);border:1px solid #222;padding:20px;position:relative;overflow:hidden}
      .rightCard:before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,#FF6A00,#D4AF37,#C0C0C0)}
      .codeBlock{background:#000;border:1px solid #222;padding:14px;font-size:11px;line-height:1.7;color:#C0C0C0;margin-top:12px}
      .codeBlock .g{color:#D4AF37}.codeBlock .o{color:#FF6A00}.codeBlock .w{color:#fff}
      .section{max-width:1280px;margin:0 auto;padding:60px 24px;border-top:1px solid #1A1A1A}
      .label{font-size:10px;letter-spacing:2px;color:#666;margin-bottom:16px}
      .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#222;border:1px solid #222}
      @media(max-width:800px){.grid3{grid-template-columns:1fr}}
      .card{background:#0F0F0F;padding:28px;transition:0.2s}.card:hover{background:#141414}
      .cardIcon{width:36px;height:36px;border:1px solid #333;display:flex;align-items:center;justify-content:center;font-size:14px;margin-bottom:16px}
      .card h3{font-size:16px;font-weight:800;margin-bottom:8px}.card p{font-size:13px;color:#888;line-height:1.6}
      .tag{display:inline-block;font-size:9px;padding:4px 8px;border:1px solid #333;color:#666;margin-top:12px;letter-spacing:1px}
      .blackGold{background:linear-gradient(135deg,#000 0%,#1A1500 100%);border:1px solid #332A00;padding:40px 24px;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#222}
      .blackGold .item{background:#0A0A0A;padding:24px;border:1px solid #222}
      .pricing{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px}
      @media(max-width:900px){.pricing{grid-template-columns:1fr}}
      .priceCard{background:#111;border:1px solid #222;padding:28px;position:relative}.priceCard.featured{border-color:#FF6A00;background:linear-gradient(180deg,#1A1000,#111)}
      .price{font-size:36px;font-weight:900;margin:12px 0}.price span{font-size:14px;color:#666}
      footer{border-top:1px solid #222;padding:24px;display:flex;justify-content:space-between;font-size:10px;color:#555;letter-spacing:1px}
    </style>

    <div class="top">
      <div class="logo mono">VENUS <span>HQ7</span>GEN — <b>2027</b></div>
      <div class="mono" style="font-size:10px;color:#666">HOUSTON • 0.8s • <span style="color:#22c55e">LIVE</span></div>
    </div>

    <div class="hero">
      <div>
        <div class="badge mono"><div class="dot"></div> SYSTEM LIVE — V7 → V8 PROD</div>
        <h1 class="h1" style="margin-top:20px">WE FIND<br><span class="silver">OLD</span> WEBSITES.<br><span class="gold">YOU GET NEW</span><br><span class="orange">CUSTOMERS.</span></h1>
        <p class="sub">Scraper for 2005-2020 businesses. Houston roofers, plumbers, contractors. We rebuild them for 2027. Booking-first, 0.8s load, AI receptionist. You keep the revenue.</p>
        <div class="ctaRow">
          <a class="btnOrange mono" href="#demo">VIEW LIVE DEMO →</a>
          <a class="btnGhost mono" href="#stack">SEE 2030 STACK</a>
        </div>
        <div class="stats mono">
          <div class="stat"><b>1.1s</b><span>AVG LOAD</span></div>
          <div class="stat"><b>34%</b><span>BOOKING RATE</span></div>
          <div class="stat"><b style="color:#FF6A00">$15K</b><span>PER $500 AD</span></div>
        </div>
      </div>
      <div>
        <div class="rightCard">
          <div class="mono" style="font-size:10px;color:#666;letter-spacing:1px">VENUS_OS // LIVE FEED</div>
          <div class="codeBlock mono">
            <div><span class="o">●</span> <span class="w">scraper</span> <span class="g">found</span> houston-roofing-2008.com</div>
            <div><span class="o">●</span> <span class="w">builder</span> <span class="g">rebuilt</span> → 1.1s / booking-first</div>
            <div><span class="o">●</span> <span class="w">voice_ai</span> answered 3 calls, booked 2</div>
            <div><span class="o">●</span> <span class="w">ads</span> $500 → 52 clicks → $18.2k revenue</div>
            <div style="margin-top:8px;color:#333">-------------------------------</div>
            <div style="margin-top:8px">LIVE SITES: <span class="w">47</span> | REVENUE TODAY: <span class="o">$12,430</span></div>
          </div>
          <div style="margin-top:16px;display:flex;gap:8px">
            <div style="flex:1;background:#000;border:1px solid #222;padding:12px"><div class="mono" style="font-size:9px;color:#666">CALLS TODAY</div><div style="font-weight:800;font-size:18px">23 <span style="color:#22c55e;font-size:10px">+12%</span></div></div>
            <div style="flex:1;background:#000;border:1px solid #222;padding:12px"><div class="mono" style="font-size:9px;color:#666">BOOKINGS</div><div style="font-weight:800;font-size:18px;color:#D4AF37">11</div></div>
          </div>
        </div>
        <div style="margin-top:12px;background:#FF6A00;color:#000;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;font-weight:800;font-size:12px" class="mono">
          <span>ORANGE → GOLD → SILVER PIPELINE</span><span>→</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="label mono">[02 — PROCESS — ORANGE / GOLD / SILVER]</div>
      <div class="grid3">
        <div class="card"><div class="cardIcon" style="color:#FF6A00;border-color:#FF6A00">01</div><h3>SCAN</h3><p>Find forgotten sites from 2005-2020. Domains with history, zero design. Houston focus.</p><div class="tag mono">AGENT-SCRAPER • LIVE</div></div>
        <div class="card"><div class="cardIcon" style="color:#D4AF37;border-color:#D4AF37">02</div><h3>BUILD</h3><p>AI rebuilds for 2027. Brutalist luxury, 1.1s load, booking-first, orange CTA.</p><div class="tag mono">AGENT-BUILDER • 0.8s</div></div>
        <div class="card"><div class="cardIcon" style="color:#C0C0C0;border-color:#C0C0C0">03</div><h3>BOOK</h3><p>Calls, bookings, revenue. Old traffic, new system. Voice AI closes.</p><div class="tag mono">AGENT-TRACKER • $12K/WK</div></div>
      </div>
    </div>

    <div class="section" id="stack" style="background:#080808">
      <div class="label mono">[03 — 2030 STACK — 8 MODULES]</div>
      <h2 style="font-size:clamp(28px,4vw,48px);font-weight:900;letter-spacing:-1px;line-height:0.9">EVERYTHING TO<br>COMPETE IN <span style="color:#FF6A00">2030</span></h2>
      <p style="color:#666;font-size:13px;margin-top:8px" class="mono">All built-in. No extra tools. Orange = Action, Gold = Revenue, Silver = System</p>
      <div style="margin-top:32px;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#222;border:1px solid #222" class="blackGold">
        <div class="item"><div class="mono" style="font-size:10px;color:#FF6A00">01</div><div style="font-weight:800;margin-top:8px">VENUS OS</div><div style="font-size:11px;color:#666;margin-top:6px;line-height:1.5">Live: calls, jobs, revenue, reviews, ad ROI.</div></div>
        <div class="item"><div class="mono" style="font-size:10px;color:#D4AF37">02</div><div style="font-weight:800;margin-top:8px">AI VOICE</div><div style="font-size:11px;color:#666;margin-top:6px">Answers 24/7, books jobs. 2 → 15 bookings.</div></div>
        <div class="item"><div class="mono" style="font-size:10px;color:#FF6A00">03</div><div style="font-weight:800;margin-top:8px">AI ADS</div><div style="font-size:11px;color:#666;margin-top:6px">$500 → 50 clicks → $15k revenue.</div></div>
        <div class="item"><div class="mono" style="font-size:10px;color:#C0C0C0">04</div><div style="font-weight:800;margin-top:8px">SCRAPER</div><div style="font-size:11px;color:#666;margin-top:6px">Finds 2005-2020 sites. Houston.</div></div>
        <div class="item"><div class="mono" style="font-size:10px;color:#D4AF37">05</div><div style="font-weight:800;margin-top:8px">BUILDER</div><div style="font-size:11px;color:#666;margin-top:6px">Rebuilds for 2027. 1.1s, booking-first.</div></div>
        <div class="item"><div class="mono" style="font-size:10px;color:#C0C0C0">06</div><div style="font-weight:800;margin-top:8px">TRACKER</div><div style="font-size:11px;color:#666;margin-top:6px">Tracks leads, calls, bookings, ROI.</div></div>
        <div class="item"><div class="mono" style="font-size:10px;color:#FF6A00">07</div><div style="font-weight:800;margin-top:8px">BLAST5</div><div style="font-size:11px;color:#666;margin-top:6px">Auto blast 5 leads/day. Preview + close.</div></div>
        <div class="item"><div class="mono" style="font-size:10px;color:#D4AF37">08</div><div style="font-weight:800;margin-top:8px">FACTORY</div><div style="font-size:11px;color:#666;margin-top:6px">Autonomous loop. Scrape, build, track, blast.</div></div>
      </div>
    </div>

    <div class="section">
      <div class="label mono">[04 — PRICING — BLACK / ORANGE / GOLD]</div>
      <div class="pricing">
        <div class="priceCard"><div class="mono" style="font-size:10px;color:#666">STARTER</div><div class="price">$500<span>/site</span></div><div style="font-size:12px;color:#888;line-height:1.6">1 site rebuild<br>Booking widget<br>Basic tracker</div></div>
        <div class="priceCard featured"><div class="mono" style="font-size:10px;color:#FF6A00">MOST POPULAR — GOLD</div><div class="price" style="color:#FF6A00">$2.5K<span>/10 sites</span></div><div style="font-size:12px;color:#aaa;line-height:1.6">10 sites + Venus OS<br>AI Voice + Ads + Blast5<br>Factory access</div><div style="margin-top:16px;background:#FF6A00;color:#000;text-align:center;padding:12px;font-weight:800;font-size:12px" class="mono">START FACTORY →</div></div>
        <div class="priceCard"><div class="mono" style="font-size:10px;color:#C0C0C0">SILVER SCALE</div><div class="price">$10K<span>/100 sites</span></div><div style="font-size:12px;color:#888;line-height:1.6">100 sites/month<br>White-label<br>API + priority</div></div>
      </div>
    </div>

    <footer class="mono"><span>© 2027 VENUS HQ7 — BLACK • ORANGE • GOLD • SILVER • WHITE</span><span>V7 → V8 PROD • HOUSTON • 0.8s</span></footer>
  `;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
