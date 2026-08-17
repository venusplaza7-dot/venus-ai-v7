export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import nodemailer from "nodemailer";

// REAL SCRAPE - no crash code
async function scrapeRealEmail(website: string): Promise<string|null> {
  try {
    const urls = [`${website}/contact`, `${website}/contact-us`, website];
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
    for (const u of urls) {
      const url = u.startsWith('http') ? u : `https://${u}`;
      const res = await fetch(url, { headers: {'User-Agent':'Mozilla/5.0'}, signal: AbortSignal.timeout(8000) }).catch(()=>null);
      if (!res || !res.ok) continue;
      const html = await res.text();
      const emails = html.match(regex);
      if (!emails) continue;
      const real = emails.find(e => {
        const l = e.toLowerCase();
        return !l.includes('example') && !l.includes('wix') && !l.includes('sentry') && !l.includes('.png') && !l.includes('.webp') && l.includes('.');
      });
      if (real) return real;
    }
  } catch {}
  return null;
}

const LEADS = [
  { name: "Truth BBQ", website: "https://truthbbq.com" },
  { name: "Goode Co BBQ", website: "https://goodecompanybarbeque.com" },
  { name: "Blood Bros BBQ", website: "https://bloodbrosbbq.com" },
  { name: "Killen's BBQ", website: "https://www.killensbarbecue.com" },
  { name: "Pinkerton's BBQ", website: "https://pinkertonsbarbecue.com" },
];

export async function GET(){
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER!, pass: process.env.GMAIL_APP_PASSWORD! },
    });

    let realFound = 0;
    let realSent = 0;
    const log: any[] = [];

    for (const lead of LEADS) {
      const email = await scrapeRealEmail(lead.website);
      if (!email) { log.push({ lead: lead.name, result: "no email in /contact" }); continue; }
      realFound++;
      try {
        await transporter.sendMail({
          from: `"Venus Plaza - ${lead.name} Preview" <${process.env.GMAIL_USER}>`,
          to: process.env.GMAIL_USER!, // SEND TO YOU FIRST TO PROVE - change to email after test
          // to: email, // UNCOMMENT THIS AFTER YOU SEE IT WORKS TO SEND TO REAL CLIENT
          subject: `${lead.name} - REAL email found ${email} - Preview Ready`,
          html: `<h2>REAL EMAIL FOUND: ${email}</h2><p>From ${lead.website}/contact</p><p>Would send to ${email}</p>`,
        });
        realSent++;
        log.push({ lead: lead.name, real_email: email, status: "REAL FOUND + EMAIL SENT (to you for proof)" });
      } catch (e: any) { log.push({ lead: lead.name, real_email: email, error: e.message }); }
      await new Promise(r=>setTimeout(r, 1000));
    }

    return Response.json({ 
      status: "SMART LIVE - REAL COUNTS",
      real_found: realFound,
      real_emails_sent: realSent,
      mode: "scrape /contact → real email",
      details: log,
      time: new Date().toISOString()
    });
  } catch(e:any){
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(){ return GET(); }

