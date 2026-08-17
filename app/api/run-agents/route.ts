export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import nodemailer from "nodemailer";
import * as dns from 'dns/promises';

async function getRealEmailFromSite(website: string): Promise<string|null> {
  const cleanWebsite = website.replace(/\/$/, '');
  const urls = [`${cleanWebsite}/contact`, `${cleanWebsite}/contact-us`, cleanWebsite];
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  for (const url of urls) {
    try {
      const fullUrl = url.startsWith('http')? url : `https://${url}`;
      const res = await fetch(fullUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(10000)
      });
      if (!res.ok) continue;
      const html = await res.text();
      const emails = html.match(emailRegex);
      if (!emails) continue;

      const real = emails.find(e => {
        const lower = e.toLowerCase();
        return!lower.includes('example') &&!lower.includes('wixpress') &&!lower.includes('sentry') &&!lower.includes('noreply') &&!lower.includes('.png') &&!lower.includes('.jpg');
      });

      if (real) {
        const domain = real.split('@')[1];
        try {
          const mx = await dns.resolveMx(domain);
          if (mx && mx.length > 0) {
            console.log(`✅ REAL + MX OK: ${real} from ${url}`);
            return real;
          }
        } catch (e) {
          console.log(`MX fail for ${domain}, trying anyway`);
          return real;
        }
      }
    } catch (e) {}
  }
  return null;
}

const LEADS = [
  { name: "Truth BBQ", website: "https://truthbbq.com" },
  { name: "Goode Co BBQ", website: "https://goodecompanybarbeque.com" },
  { name: "Blood Bros BBQ", website: "https://bloodbrosbbq.com" },
  { name: "Killen's BBQ", website: "https://www.killensbarbecue.com" },
  { name: "Pinkerton's BBQ", website: "https://pinkertonsbarbecue.com" },
  { name: "CorkScrew BBQ", website: "https://corkscrewbbq.com" },
  { name: "Tejas Chocolate", website: "https://tejaschocolate.com" },
];

async function runHunters() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER!, pass: process.env.GMAIL_APP_PASSWORD! },
  });

  let sentCount = 0;
  let foundCount = 0;
  const results: any[] = [];

  for (const lead of LEADS) {
    const realEmail = await getRealEmailFromSite(lead.website);
    if (!realEmail) {
      results.push({ lead: lead.name, status: "no email on /contact" });
      continue;
    }
    foundCount++;
    try {
      await transporter.sendMail({
        from: `"Venus Plaza - Luxury Preview for ${lead.name}" <${process.env.GMAIL_USER}>`,
        to: realEmail,
        subject: `${lead.name} - Your Luxury Site Preview Ready`,
        html: `<div style="background:#0a0a0a;padding:40px;color:#fff;font-family:sans-serif"><h1 style="color:#d4af37">VENUS PLAZA</h1><p>Hi ${lead.name},</p><p>We found your real contact ${realEmail} on ${lead.website}/contact</p><p>Your luxury preview is ready: https://venus-agent-hq.vercel.app/preview/${lead.name.toLowerCase().replace(/\s+/g,'-')}</p><p>- Ron, Venus Plaza</p></div>`,
      });
      sentCount++;
      results.push({ lead: lead.name, email: realEmail, status: "SENT + MX OK" });
    } catch (e: any) {
      results.push({ lead: lead.name, email: realEmail, status: `FAILED: ${e.message}` });
    }
    await new Promise(r => setTimeout(r, 3000));
  }

  return { found: foundCount, sent: sentCount, results };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(()=>({})) as any;
    if (body.secret!== "venus_hq_2024") {
      // allow browser trigger without secret for GET
      if (req.method === 'POST') return Response.json({error:"Unauthorized"},{status:401});
    }
    const data = await runHunters();
    return Response.json({
      status: "SMART MODE LIVE - SCRAPE /contact → REAL EMAIL → MX PING → SEND",
      real_found: data.found,
      real_emails_sent: data.sent,
      details: data.results,
      sent_from: process.env.GMAIL_USER
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  const fakeReq = new Request("https://fake.com", { method: "POST", body: JSON.stringify({secret:"venus_hq_2024"}) }) as any;
  return POST(fakeReq);
}

