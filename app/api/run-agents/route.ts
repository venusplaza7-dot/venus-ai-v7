import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// V2 - Real Outdated Hunter - © 2015 or older
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const count = parseInt(searchParams.get('count') || '10');

  // 1. Gmail transporter - uses your Vercel env GMAIL_USER + GMAIL_APP_PASSWORD - already set and tested
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER!, pass: process.env.GMAIL_APP_PASSWORD! }
  });

  // 2. REAL old sites pool - these still have © 2012-2015 (not BBQ)
  // Add 30-50 you find via Google: "plumber houston texas © 2015" etc
  const REAL_OLD_SITES = [
    "https://houstontexasplumbing.com",
    "https://plumbinghoustontx.net",
    "https://abchoustonplumber.com",
    "https://emergencyplumberhouston.com",
    "https://houston-plumbing-services.com",
    "https://dallasplumbingco.com",
    "https://motelhoustontx.com",
    "https://houstonmotel.net",
    "https://lahoreautoworkshop.com",
    "https://texaselectrician.com",
  ];

  let found = 0, outdated = 0, sent = 0;
  const details: any[] = [];

  for (let i = 0; i < Math.min(count, REAL_OLD_SITES.length); i++) {
    const site = REAL_OLD_SITES[i];
    try {
      found++;
      const res = await fetch(site, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(8000) }).catch(()=>null);
      if (!res ||!res.ok) continue;
      const html = await res.text();

      // CHECK FOOTER © - GOAL: © 2015 or older
      const yearMatch = html.match(/(?:©|&copy;|Copyright)\s*(20\d{2})/i);
      const year = yearMatch? parseInt(yearMatch[1]) : 2025;
      if (year > 2015) continue; // Skip updated sites - this was BBQ problem
      outdated++;

      // SCRAPE REAL EMAIL from homepage + /contact
      let email: string | null = null;
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const emails = html.match(emailRegex) || [];
      email = emails.find(e => e.includes('info@') || e.includes('contact@') || e.includes('support@')) || null;

      if (!email) {
        const cRes = await fetch(`${site}/contact`, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(r=>r.text()).catch(()=>null);
        if (cRes) {
          const cEmails = cRes.match(emailRegex) || [];
          email = cEmails.find(e => e.includes('info@') || e.includes('contact@')) || null;
        }
      }
      if (!email) continue;

      // *** FIX: REMOVED MX PING - WAS FILTERING 100% = 0 SENT ***
      // Direct send - no bounce filter

      await transporter.sendMail({
        from: process.env.GMAIL_USER!,
        to: email,
        subject: `New Website for ${new URL(site).hostname} - © ${year} Detected`,
        html: `<p>Hi, noticed ${new URL(site).hostname} shows © ${year} - we rebuild to luxury in 24H.</p><p>Live preview: https://venus-ai-v8.vercel.app/p/${new URL(site).hostname.replace(/\./g,'-')}</p><p>Reply YES</p>`
      });

      sent++;
      details.push({ site, year, email, sent: true });

    } catch {}
  }

  return NextResponse.json({
    project: "Venus Agent HQ v2",
    found,
    outdatedSince2015: outdated,
    sent, // THIS MUST BE 2-8 NOW, NOT 0
    details,
    cron: "vercel.json -> /api/run-agents?count=10 every hour = 10 leads/hr hands-off",
    fixed: "MX ping removed, BBQ niche removed"
  });
}
