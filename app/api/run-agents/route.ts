import nodemailer from "nodemailer";
import * as dns from 'dns/promises';

async function getRealEmailFromSite(website: string): Promise<string|null> {
  const urls = [`${website}/contact`, `${website}/contact-us`, website];
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  for (const url of urls) {
    try {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      const res = await fetch(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0 VenusPlaza-Bot' }, signal: AbortSignal.timeout(10000) });
      const html = await res.text();
      const emails = html.match(emailRegex);
      if (!emails) continue;
      const real = emails.find(e => !e.includes('example') && !e.includes('wix') && !e.toLowerCase().includes('noreply') && !e.includes('sentry'));
      if (real) {
        const domain = real.split('@')[1];
        try {
          const mx = await dns.resolveMx(domain);
          if (mx && mx.length > 0) return real;
        } catch {}
      }
    } catch {}
  }
  return null;
}

const LEADS = [
  { name: "Truth BBQ", website: "https://truthbbq.com" },
  { name: "Goode Co BBQ", website: "https://goodecompanybarbeque.com" },
  { name: "Blood Bros BBQ", website: "https://bloodbrosbbq.com" },
  { name: "Killen's BBQ", website: "https://www.killensbarbecue.com" },
  { name: "Pinkerton's BBQ", website: "https://pinkertonsbarbecue.com" },
];

export async function POST(req: Request) {
  const body = await req.json().catch(()=>({})) as any;
  if (body.secret !== "venus_hq_2024") return Response.json({error:"Unauthorized"},{status:401});

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER!, pass: process.env.GMAIL_APP_PASSWORD! },
  });

  let sentCount = 0;
  let foundCount = 0;

  for (const lead of LEADS) {
    const realEmail = await getRealEmailFromSite(lead.website);
    if (!realEmail) continue; // skip if no real - THIS IS THE LINE YOU ASKED ABOUT - IT GOES HERE
    foundCount++;
    await transporter.sendMail({
      from: `"Venus Plaza - Luxury Site for ${lead.name}" <${process.env.GMAIL_USER}>`,
      to: realEmail,
      subject: `${lead.name} - Your Luxury Site Preview is Ready`,
      html: `<div style="background:#0a0a0a;padding:40px;color:#fff"><h1 style="color:#d4af37">VENUS PLAZA</h1><p>Found your real email ${realEmail} on ${lead.website}/contact - preview ready: https://venus-agent-hq.vercel.app</p></div>`,
    });
    sentCount++;
    await new Promise(r=>setTimeout(r, 8000));
  }

  return Response.json({ 
    status: "SMART MODE LIVE",
    real_found: foundCount,
    real_emails_sent: sentCount,
    mode: "scrape /contact → real email → ping MX → send"
  });
}






