export default function Page({ params }: { params: { site: string } }) {
  const site = params.site || "24hrplumbinghouston-com"
  const displaySite = site.replace("-com", ".com").replace(/-/g, "")
  const isHouston = site.includes("houston")
  
  return (
    <div style={{ margin: 0, background: "#050505", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      
      {/* TOP BAR */}
      <div style={{ background: "#000", borderBottom: "1px solid #1a1a1a", padding: "12px 20px", display: "flex", justifyContent: "space-between", fontSize: "10px", letterSpacing: "2px", color: "#666" }}>
        <span>VENUS HQ - ${"1999"} TO $497 - 23H 35M</span>
        <span style={{ color: "#C9A86A" }}>{displaySite.toUpperCase()}</span>
      </div>

      {/* HERO */}
      <div style={{ background: "#080808", padding: "48px 24px", textAlign: "left", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "48px", lineHeight: "0.95", margin: 0, fontWeight: 900 }}>
          <span style={{ color: "#fff" }}>Houston's</span><br />
          <span style={{ color: "#fff" }}>Most</span><br />
          <span style={{ color: "#888" }}>Trusted</span><br />
          <span style={{ color: "#888" }}>PLUMBING</span><br />
          <span style={{ color: "#C9A86A", fontStyle: "italic", fontWeight: 400 }}>Gen-Z<br />Luxury 2026</span>
        </h1>

        <div style={{ marginTop: "32px", display: "grid", gap: "12px", maxWidth: "380px" }}>
          <div style={{ background: "#fff", color: "#000", padding: "16px 20px", borderRadius: "999px", fontWeight: 900, fontSize: "14px", textAlign: "center" }}>
            Dispatch Agent - PLUMBING
          </div>
          <div style={{ background: "#1a1a1a", border: "1px solid #222", color: "#888", padding: "16px 20px", borderRadius: "999px", fontSize: "14px", textAlign: "center" }}>
            Photo-Diagnostics - instant quote
          </div>
          <div style={{ background: "#1a1a1a", border: "1px solid #222", color: "#888", padding: "16px 20px", borderRadius: "999px", fontSize: "14px", textAlign: "center" }}>
            Quote and Closer - auto book
          </div>
        </div>
      </div>

      {/* AI TOOLS WE WILL IMPLEMENT - NEW CLEAR SECTION */}
      <div style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "48px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#C9A86A", fontWeight: 900 }}>WHAT WE INSTALL - 4 DEDICATED AI AGENTS FOR YOUR SITE</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "32px", color: "#fff", margin: "12px 0 8px 0", lineHeight: 1.1 }}>
            Your site will not be a website.<br />
            <span style={{ color: "#888" }}>It will be 4 employees that never sleep.</span>
          </h2>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "24px" }}>We dedicate these 4 AI agents only to {displaySite}. They work 24/7, speak English + Spanish, and log everything to your phone.</p>

          <div style={{ display: "grid", gap: "16px" }}>
            
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px", display: "flex", gap: "16px" }}>
              <div style={{ minWidth: "48px", height: "48px", background: "#fff", color: "#000", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "20px" }}>1</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: "15px" }}>DISPATCH AGENT - 3 Second Responder</div>
                <div style={{ color: "#C9A86A", fontSize: "11px", letterSpacing: "1px", marginTop: "4px" }}>DEDICATED TO YOUR SITE 24/7</div>
                <div style={{ color: "#aaa", fontSize: "13px", lineHeight: 1.6, marginTop: "10px" }}>
                  <b style={{ color: "#fff" }}>What it does:</b> Answers every lead in 3 seconds via text + call. Asks 4 questions: Zip? Emergency? Photo? Owner or renter? Qualifies emergency vs routine, blocks spam.<br />
                  <b style={{ color: "#fff" }}>Tool used:</b> Twilio + GPT-4o + Google Sheet (your jobs)<br />
                  <b style={{ color: "#fff" }}>Result for you:</b> You stop losing after-hours jobs. 62% more qualified leads, 0 missed calls.
                </div>
              </div>
            </div>

            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px", display: "flex", gap: "16px" }}>
              <div style={{ minWidth: "48px", height: "48px", background: "#C9A86A", color: "#000", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "20px" }}>2</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: "15px" }}>PHOTO-DIAGNOSTICS AGENT - Instant Quote</div>
                <div style={{ color: "#C9A86A", fontSize: "11px", letterSpacing: "1px", marginTop: "4px" }}>STOPS FREE TRIPS - YOUR BIGGEST LOSS</div>
                <div style={{ color: "#aaa", fontSize: "13px", lineHeight: 1.6, marginTop: "10px" }}>
                  <b style={{ color: "#fff" }}>What it does:</b> Customer uploads photo of leak or burst pipe. Vision AI identifies issue (slab leak, water heater, drain) and gives price RANGE instantly: "$149-$290 + Licensed plumber confirms on arrival".<br />
                  <b style={{ color: "#fff" }}>Tool used:</b> Vision AI + your price book + instant SMS with your logo<br />
                  <b style={{ color: "#fff" }}>Result for you:</b> No more free estimates driving across Houston. Only serious jobs book. Saves 8 hrs/week.
                </div>
              </div>
            </div>

            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px", display: "flex", gap: "16px" }}>
              <div style={{ minWidth: "48px", height: "48px", background: "#fff", color: "#000", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "20px" }}>3</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: "15px" }}>QUOTE and CLOSER AGENT - Auto Books</div>
                <div style={{ color: "#C9A86A", fontSize: "11px", letterSpacing: "1px", marginTop: "4px" }}>CLOSES WHILE YOU WORK ON JOBS</div>
                <div style={{ color: "#aaa", fontSize: "13px", lineHeight: 1.6, marginTop: "10px" }}>
                  <b style={{ color: "#fff" }}>What it does:</b> Sends branded quote PDF with your license number, warranty, 5-star reviews, then auto-offers 3 time slots. Customer taps to book. Adds to your calendar + sends WhatsApp confirmation.<br />
                  <b style={{ color: "#fff" }}>Tool used:</b> Calendly + Stripe $49 deposit + WhatsApp API<br />
                  <b style={{ color: "#fff" }}>Result for you:</b> 2.3x more bookings. You wake up to booked jobs, not voicemails.
                </div>
              </div>
            </div>

            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px", display: "flex", gap: "16px" }}>
              <div style={{ minWidth: "48px", height: "48px", background: "#25D366", color: "#fff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "20px" }}>4</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: "15px" }}>REVIEW and RANK AGENT - Number 1 in Houston</div>
                <div style={{ color: "#C9A86A", fontSize: "11px", letterSpacing: "1px", marginTop: "4px" }}>GETS 5-STAR REVIEWS ON AUTOPILOT</div>
                <div style={{ color: "#aaa", fontSize: "13px", lineHeight: 1.6, marginTop: "10px" }}>
                  <b style={{ color: "#fff" }}>What it does:</b> After job marked done, auto-texts customer: "How was our service?" If 4-5 stars, pushes to Google. If 1-3 stars, routes to you privately, not public.<br />
                  <b style={{ color: "#fff" }}>Tool used:</b> Google Business API + sentiment AI<br />
                  <b style={{ color: "#fff" }}>Result for you:</b> From 34 reviews to 200+ in 90 days. Google ranks you #1 for "emergency plumber Houston". +40% calls from Google alone.
                </div>
              </div>
            </div>

          </div>

          <div style={{ marginTop: "24px", background: "#fff", color: "#000", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontWeight: 900, fontSize: "14px" }}>ALL 4 AGENTS + LUXURY SITE + WHATSAPP + BOOKING = $497 TODAY</div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "6px" }}>Normally $1999 build fee - Founder price for {displaySite} only. We install in 48 hours. You keep 100% jobs.</div>
            <a href="https://wa.me/17865880578?text=CONFIRM%20LAUNCH%20FOR%20${site}%20-%20$497" style={{ display: "inline-block", marginTop: "14px", background: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: "999px", fontWeight: 900, fontSize: "12px", textDecoration: "none" }}>CONFIRM ON WHATSAPP - LAUNCH IN 48H</a>
          </div>

          <div style={{ marginTop: "16px", textAlign: "center", fontSize: "10px", color: "#444" }}>Built by Venus AI HQ - Houston Research Lab - 12 plumbers already launched</div>
        </div>
      </div>

    </div>
  )
}





