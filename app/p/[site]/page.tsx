export default function Page({ params, searchParams }: { params: { site: string }, searchParams?: { cat?: string } }) {
  const site = params.site || "24hrplumbinghouston-com"
  const displaySite = site.replace("-com", ".com").replace(/-/g, "")

  const catParam = (searchParams?.cat || "").toLowerCase()
  const siteLower = site.toLowerCase()
  let category = "plumbers"
  if (catParam) category = catParam
  else if (siteLower.includes("roof")) category = "roofers"
  else if (siteLower.includes("hvac") || siteLower.includes("ac") || siteLower.includes("air")) category = "hvac"
  else if (siteLower.includes("electr")) category = "electricians"
  else if (siteLower.includes("dent")) category = "dentists"
  else if (siteLower.includes("lock")) category = "locksmiths"

  const TEMPLATES: any = {
    plumbers: {
      label: "PLUMBING",
      headline: ["Houston's","Most","Trusted","PLUMBING"],
      stat: "73% of Gen-Z renters will NOT make a phone call",
      agent1: "Dispatch Agent - 3 Second Responder - stops missed after-hours burst pipes",
      loss: "62% more qualified leaks, 0 missed calls",
      color: "#C9A86A"
    },
    roofers: {
      label: "ROOFING",
      headline: ["Dallas's","Most","Trusted","ROOFING"],
      stat: "67% homeowners want drone roof estimate in 3 seconds - you only have Call Now",
      agent1: "Dispatch Agent - 3 Second Responder - qualifies leak vs full replacement from photo",
      loss: "48% more qualified roof jobs, 0 missed storm calls",
      color: "#B85C38"
    },
    hvac: {
      label: "HVAC",
      headline: ["Houston's","Most","Trusted","HVAC"],
      stat: "85% want instant AC repair cost at 2am - your site from 2012 loses them",
      agent1: "Dispatch Agent - 3 Second Responder - qualifies no-cool vs Freon leak",
      loss: "55% more after-hours AC jobs booked",
      color: "#4A9FD4"
    },
    electricians: {
      label: "ELECTRICAL",
      headline: ["Houston's","Most","Trusted","ELECTRICIANS"],
      stat: "91% won't touch sparking panel - they text photo first",
      agent1: "Dispatch Agent - 3 Second Responder - triages sparking vs outage",
      loss: "Stops free trips for tripped breakers",
      color: "#FFC300"
    },
    dentists: {
      label: "DENTAL",
      headline: ["Your City's","Most","Trusted","DENTAL"],
      stat: "73% under 35 won't call for appointment - they want WhatsApp booking",
      agent1: "Dispatch Agent - 3 Second Responder - books cleaning vs emergency",
      loss: "32% more bookings, 0 front-desk overload",
      color: "#6BCB77"
    },
    locksmiths: {
      label: "LOCKSMITH",
      headline: ["Your City's","Most","Trusted","LOCKSMITH"],
      stat: "94% locked out search at night - you lose if you don't answer in 3s",
      agent1: "Dispatch Agent - 3 Second Responder - qualifies car vs house lockout",
      loss: "70% more night lockouts captured",
      color: "#A0A0A0"
    }
  }

  const t = TEMPLATES[category] || TEMPLATES.plumbers
  const getHeadlineColor = (i: number) => {
    if (i === 3) return t.color
    if (i >= 2) return "#888"
    return "#fff"
  }

  return (
    <div style={{ margin: 0, background: "#050505", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      <div style={{ background: "#000", borderBottom: "1px solid #1a1a1a", padding: "12px 20px", display: "flex", justifyContent: "space-between", fontSize: "10px", letterSpacing: "2px", color: "#666" }}>
        <span>VENUS HQ - $1999 TO $497 - {t.label} 2026</span>
        <span style={{ color: t.color }}>{displaySite.toUpperCase()} - {category.toUpperCase()}</span>
      </div>

      <div style={{ background: "#080808", padding: "48px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "48px", lineHeight: "0.95", margin: 0, fontWeight: 900 }}>
          {t.headline.map((line: string, i: number) => (
            <span key={i} style={{ display: "block", color: getHeadlineColor(i), fontStyle: i === 3? "italic" : "normal", fontWeight: i === 3? 400 : 900 }}>{line}</span>
          ))}
        </h1>
        <p style={{ color: "#666", marginTop: "16px", fontSize: "13px" }}>{t.stat}</p>

        <div style={{ marginTop: "32px", display: "grid", gap: "12px", maxWidth: "380px" }}>
          <div style={{ background: "#fff", color: "#000", padding: "16px 20px", borderRadius: "999px", fontWeight: 900, fontSize: "14px", textAlign: "center" }}>{t.agent1}</div>
          <div style={{ background: "#1a1a1a", border: "1px solid #222", color: "#888", padding: "16px 20px", borderRadius: "999px", fontSize: "14px", textAlign: "center" }}>Photo-Diagnostics - instant quote from photo</div>
          <div style={{ background: "#1a1a1a", border: "1px solid #222", color: "#888", padding: "16px 20px", borderRadius: "999px", fontSize: "14px", textAlign: "center" }}>Quote and Closer - auto book + $49 deposit</div>
        </div>
      </div>

      <div style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "48px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ fontSize: "10px", letterSpacing: "4px", color: t.color, fontWeight: 900 }}>WHAT WE INSTALL - 4 DEDICATED AI AGENTS FOR {t.label}</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "28px", color: "#fff", margin: "12px 0 8px 0" }}>Your site will not be a website.<br /><span style={{ color: "#888" }}>It will be 4 employees that never sleep.</span></h2>

          <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px" }}>
              <b style={{ color: "#fff" }}>1. DISPATCH AGENT</b><div style={{ color: t.color, fontSize: "11px" }}>DEDICATED 24/7 TO {displaySite}</div>
              <div style={{ color: "#aaa", fontSize: "13px", marginTop: "8px" }}>Answers every lead in 3 sec via text + call. <b style={{ color: "#fff" }}>{t.loss}</b></div>
            </div>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px" }}>
              <b style={{ color: "#fff" }}>2. PHOTO-DIAGNOSTICS</b><div style={{ color: t.color, fontSize: "11px" }}>STOPS FREE TRIPS</div>
              <div style={{ color: "#aaa", fontSize: "13px", marginTop: "8px" }}>Customer uploads photo. Vision AI gives price RANGE instantly with your logo.</div>
            </div>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px" }}>
              <b style={{ color: "#fff" }}>3. QUOTE + CLOSER</b><div style={{ color: t.color, fontSize: "11px" }}>AUTO BOOKS WHILE YOU WORK</div>
              <div style={{ color: "#aaa", fontSize: "13px", marginTop: "8px" }}>Sends branded PDF + 3 time slots. Customer taps to book + $49 deposit.</div>
            </div>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: "16px", padding: "20px" }}>
              <b style={{ color: "#fff" }}>4. REVIEW + RANK</b><div style={{ color: t.color, fontSize: "11px" }}>GETS 5-STAR ON AUTOPILOT</div>
              <div style={{ color: "#aaa", fontSize: "13px", marginTop: "8px" }}>After job done, auto-texts review. 4-5 stars → Google. 1-3 stars → you privately.</div>
            </div>
          </div>

          <div style={{ marginTop: "24px", background: "#fff", color: "#000", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontWeight: 900, fontSize: "14px" }}>ALL 4 AGENTS + LUXURY SITE FOR {t.label} = $497</div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "6px" }}>Founder price for {displaySite} only - 48h install</div>
            <a href={`https://wa.me/17865880578?text=CONFIRM%20LAUNCH%20FOR%20${site}%20${category.toUpperCase()}%20-%20$497`} style={{ display: "inline-block", marginTop: "14px", background: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: "999px", fontWeight: 900, fontSize: "12px", textDecoration: "none" }}>CONFIRM ON WHATSAPP - {t.label}</a>
          </div>
        </div>
      </div>
    </div>
  )
}
