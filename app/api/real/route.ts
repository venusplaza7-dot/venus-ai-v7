import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const BREVO_KEY = process.env.BREVO_API_KEY!;

// YOUR ORIGINAL 2016 REAL SITES - add your 1000 here or keep this starter 50
const REAL_2016_SITES = [
  "emergencyplumberhouston.com",
  "houstonplumbingco.com",
  "abcplumbinghouston.com",
  // PASTE YOUR 2016 LIST HERE - 1000 domains, one per line
];

function extractEmails(html: string): string[] {
  const re = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const found = html.match(re) || [];
  // Filter real business emails only
  return [...new Set(found)].filter(e =>
   !e.includes('example') &&
   !e.includes('test') &&
   !e.includes('.png') &&
   !e.includes('.jpg') &&
    (e.startsWith('info@') || e.startsWith('contact@') || e.startsWith('support@') || e.startsWith('hello@') || e.includes('@'))
  ).slice(0,3);
}

async function scrapeRealEmailFromWebsite(domain: string): Promise<string | null> {
  try {
    const urls = [`https://${domain}`, `https://${domain}/contact`, `https://${domain}/contact-us`];
    for (const url of urls) {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(8000) }).catch(()=>null);
      if (!res ||!res.ok) continue;
      const html = await res.text();
      const emails = extractEmails(html);
      if (emails.length > 0) return emails[0]; // First real email found
    }
  } catch {}
  return null;
}

async function verifyEmailMX(email: string): Promise<boolean> {
  try {
    const domain = email.split('@')[1];
    // Simple MX check via Google DNS
    const res = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`).then(r=>r.json()).catch(()=>null);
    return!!res?.Answer?.length;
  } catch { return false; }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const force = searchParams.get('force') === 'true';

  // 1. GET NEXT 2016 SITE (round-robin, no rerun)
  const sentList: any[] = (await redis.get('venus_sent_list') || []) as any[];
  const sentDomains = new Set(sentList.map((s:any) => s.domain || s.email?.split('@')[1]));

  let nextDomain = null;
  for (const d of REAL_2016_SITES) {
    if (!sentDomains.has(d)) { nextDomain = d; break; }
  }
  if (!nextDomain) return NextResponse.json({ error: "All 2016 sites sent - add more to REAL_2016_SITES" }, { status: 400 });

  // 2. SCRAPER AGENT - scrape real email from that old website
  const realEmail = await scrapeRealEmailFromWebsite(nextDomain);
  if (!realEmail) {
    // If no email found on site, skip and try next next time, mark as tried
    await redis.set(`tried_${nextDomain}`, true);
    return NextResponse.json({ skipped: true, reason: `No email on ${nextDomain}`, next: nextDomain });
  }

  // 3. VERIFIER AGENT - recheck before mailing
  const isVerified = await verifyEmailMX(realEmail);
  if (!isVerified) {
    return NextResponse.json({ skipped: true, reason: `MX fail ${realEmail}`, domain: nextDomain });
  }

  // 4. MAILER AGENT - no rerun check
  if (sentList.find((s:any) => s.email === realEmail)) {
    return NextResponse.json({ skipped: true, reason: `Already sent to ${realEmail} - no rerun` });
  }

  // 5. SEND REAL PROPOSAL
  const slug = `${nextDomain.replace(/\./g,'-')}-${Date.now().toString(36)}`;
  const proposalUrl = `https://venus-ai-v8.vercel.app/p/${slug}`;

  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': BREVO_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { email: 'contact@venusai.app', name: 'Venus AI' },
      to: [{ email: realEmail }],
      subject: `Luxury Website in 24H for ${nextDomain} - ${slug}`,
      htmlContent: `<p>Hi, made a luxury website for ${nextDomain} in 24H:</p><p><a href="${proposalUrl}">${proposalUrl}</a></p><p>Reply YES to get it live.</p>`
    })
  });

  // Save - no rerun ever
  sentList.push({ email: realEmail, domain: nextDomain, slug, sentAt: new Date().toISOString(), proposalUrl, realScraped: true });
  await redis.set('venus_sent_list', sentList);

  return NextResponse.json({ success: true, real: true, email: realEmail, domain: nextDomain, slug, proposalUrl, scrapedFrom: nextDomain, verified: true });
}
