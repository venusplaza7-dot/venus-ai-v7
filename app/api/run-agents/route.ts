import dns from "dns/promises"
import nodemailer from "nodemailer"

const HOUSTON_DOMAINS = [
  "houstonluxurysalon.com", "houstonautodetail.com", "houstonplumbing.com",
  "houstonroofing.com", "houstonlandscaping.com", "houstoncleaning.com",
  "houstonpainting.com", "houstonfitness.com", "houstondental.com",
  // Add 200 domains here - Sylvia will find them automatically later
  // For tonight we use test + real scrape
]

async function scrapeEmail(domain: string) {
  try {
    const html = await fetch(`https://${domain}/contact`, { signal: AbortSignal.timeout(4000) }).then(r=>r.text()).catch(()=> "")
    const emails = html.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || []
    return emails.find(e=>!e.includes("example") && !e.toLowerCase().includes("info@")) || emails[0]
  } catch { return null }
}

async function checkMX(email: string) {
  try { const mx = await dns.resolveMx(email.split("@")[1]); return mx.length>0 } catch { return false }
}

export async function GET() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD }
  })

  // 200 per day = 9 per hour
  const batch = HOUSTON_DOMAINS.slice(0, 9)
  let sent = 0

  for (const domain of batch) {
    const email = await scrapeEmail(domain) || `contact@${domain}`
    const mxOk = await checkMX(email)
    if (!mxOk) continue

    await transporter.sendMail({
      from: `"Venus Plaza" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // TONIGHT: to you for proof - change to `email` tomorrow
      subject: `${domain} - Luxury Website + Video Offer`,
      html: `<h1>VENUS PLAZA</h1><p>For ${domain}</p><p>WhatsApp +17865880578</p><a href="https://venus-agent-hq.vercel.app">Portfolio</a>`
    })

    sent++
    await new Promise(r=>setTimeout(r, 5000)) // 5 sec gap safe
  }

  return Response.json({ target: "200/day", sentThisHour: sent, nextHour: "9 more", mode: "AUTONOMOUS 200/day" })
}
