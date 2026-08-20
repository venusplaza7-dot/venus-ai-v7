export default function Proposal({ params }: { params: { slug: string } }) {
  const raw = params.slug || "luxury-business";
  const name = decodeURIComponent(raw).replace(/-/g, " ").toUpperCase();
  return (
    <div style={{fontFamily:"Helvetica, Arial", background:"#fff", minHeight:"100vh", color:"#000"}}>
      <div style={{background:"#000", color:"#fff", padding:"20px 30px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <b style={{letterSpacing:"4px", fontSize:"14px"}}>{name}</b>
        <span style={{fontSize:"10px", letterSpacing:"3px"}}>VENUS HQ</span>
      </div>
      <div style={{padding:"60px 30px", maxWidth:"900px", margin:"0 auto"}}>
        <p style={{color:"#888", fontSize:"11px", letterSpacing:"3px", margin:0}}>PRIVATE PROPOSAL — LUXURY CONCEPT</p>
        <h1 style={{fontSize:"54px", lineHeight:"0.9", fontWeight:300, margin:"16px 0"}}>{name.split(" ").slice(0,2).join(" ")}<br/><b style={{fontWeight:900}}>{name.split(" ").slice(2).join(" ") || "LUXURY EDITION"}</b></h1>
        <p style={{fontSize:"18px", color:"#333", maxWidth:"520px", lineHeight:"1.6"}}>Rebuilt for Gen Z — AI Concierge, Visual Quote, Voice Booking. Loads in 0.9s.</p>
        <div style={{marginTop:"32px"}}>
          <a href="https://wa.me/17865880578?text=Hi%20I%20want%20to%20launch%20my%20new%20website" style={{background:"#000", color:"#fff", padding:"16px 28px", textDecoration:"none", fontWeight:"bold", fontSize:"14px"}}>APPROVE VIA WHATSAPP →</a>
        </div>
      </div>
    </div>
  );
