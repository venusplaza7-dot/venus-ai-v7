export default function DemoPage({ params }: { params: { business: string } }) {
  const slug = params.business || "houston-elite-plumber";
  let name = "Houston Elite Plumber";
  let city = "Houston, Texas";
  if (slug.includes("salon")) { name = "Jeddah Luxury Salon"; city = "Jeddah, Saudi Arabia"; }
  if (slug.includes("cafe")) { name = "Riyadh Premium Cafe"; city = "Riyadh, Saudi Arabia"; }
  const whatsappNumber = "17865880578";
  const message = `Hello Venus, I reviewed proposal for ${name} (${slug}). Please proceed with launch within 24 hours. Preview: https://venus-agent-hq.vercel.app/demo/${slug}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div style={{ fontFamily: "Inter, Helvetica, Arial, sans-serif", background: "white", color: "black", margin: 0 }}>
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hero { padding: 40px 24px !important; }
          .hero h1 { font-size: 36px !important; }
          .grid2 { grid-template-columns: 1fr !important; gap: 24px !important; }
          .grid3 { grid-template-columns: 1fr !important; }
          .pad { padding: 40px 24px !important; }
          .footer { flex-direction: column !important; gap: 8px !important; }
        }
      `}</style>

      <nav className="pad" style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", position: "sticky", top: 0, background: "white", zIndex: 10 }}>
        <div style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: 700, textTransform: "uppercase" }}>{name}</div>
        <div className="nav-desktop" style={{ display: "flex", gap: "24px", fontSize: "12px", color: "#666" }}><span>Services</span><span>Proposal</span><span>Contact</span></div>
        <a href={whatsappLink} target="_blank" style={{ background: "black", color: "white", padding: "10px 20px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}>Inquire</a>
      </nav>

      <div className="hero pad" style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 60px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#999", marginBottom: "16px" }}>{city} — Proposal Ref: Venus-{slug.toUpperCase()}</div>
        <h1 style={{ fontSize: "64px", fontWeight: 300, lineHeight: "0.9", letterSpacing: "-2px", margin: 0 }}>{name.split(" ").slice(0,2).join(" ")}<br/><span style={{ fontWeight: 700 }}>{name.split(" ").slice(2).join(" ")}</span></h1>
        <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "60px", marginTop: "40px" }}>
          <div>
            <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#333", fontWeight: 300 }}>A refined digital presence with intelligent automation. Designed to convert visitors into clients without human intervention.</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
              <a href={whatsappLink} target="_blank" style={{ background: "black", color: "white", padding: "16px 28px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}>Approve & Launch</a>
              <a href="#features" style={{ border: "1px solid black", color: "black", padding: "16px 28px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}>View Features</a>
            </div>
          </div>
          <div style={{ borderLeft: "1px solid #eee", paddingLeft: "32px", fontSize: "13px", lineHeight: "2" }}>✓ AI Concierge 24/7<br/>✓ Visual Quote Engine<br/>✓ Voice Booking<br/>✓ Premium Hosting</div>
        </div>
      </div>

      <div id="features" style={{ background: "#fafafa", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
        <div className="grid3 pad" style={{ maxWidth: "1200px", margin: "0 auto", padding: "1px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "#eee" }}>
          {[
            { n: "01", t: "Intelligent Concierge", d: "AI trained on your services. Answers, quotes, books automatically. 68% higher conversion." },
            { n: "02", t: "Visual Assessment", d: "Client uploads photo. AI provides instant estimate. No friction." },
            { n: "03", t: "Voice Operations", d: "Customers call, AI answers. Your business never misses a call." }
          ].map(f => (
            <div key={f.n} style={{ background: "white", padding: "40px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#999", marginBottom: "16px" }}>{f.n}</div>
              <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>{f.t}</div>
              <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pad" style={{ background: "black", color: "white", textAlign: "center", padding: "100px 60px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#666", marginBottom: "16px" }}>Invitation</div>
        <h2 style={{ fontSize: "40px", fontWeight: 300, maxWidth: "600px", margin: "0 auto", lineHeight: "1.1" }}>Launch {name} within 24 hours.</h2>
        <a href={whatsappLink} target="_blank" style={{ background: "white", color: "black", padding: "18px 40px", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", fontWeight: 700, display: "inline-block", marginTop: "40px" }}>Confirm via WhatsApp</a>
        <div style={{ marginTop: "20px", fontSize: "10px", color: "#555" }}>DIRECT TO +1 (786) 588-0578</div>
      </div>
    </div>
  );
}

