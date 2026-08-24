export const dynamic='force-dynamic';export const runtime='nodejs'
const SENDER=process.env.VENUS_SENDER_EMAIL||'ve9us1@gmail.com'
const POOL=300 domains with next index from /tmp/venus_progress.json

// NEW: Scrape real company info per domain before email
async function scrapeCompany(domain){
  try{
    const html = await fetch(`https://${domain}`).then(r=>r.text())
    return {
      name: html.match(/<title>(.*?)<\/title>/)?.[1] || domain,
      since: html.match(/Since\s+(\d{4})/i)?.[1] || "2015",
      phone: html.match(/\+1-\d{3}-\d{3}-\d{4}/)?.[0] || "+1-713-XXX-XXXX",
      services: html.match(/AC Repair|Plumbing|Roofing|Electrical/g)?.slice(0,4) || ["Service"],
    }
  }catch{return {name:domain,since:"2015",phone:"",services:[]}}
}

// Gmail API send (not Brevo) — this was working perfect morning
// To: lead.e, BCC: SENDER (you) — so you get copy
// Subject: {Company} — Your AI Luxury Site vs Current (Ready)
// Body: OLD vs NEW with dynamic info
