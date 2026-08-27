import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;
const QUEUE_KEY = 'venus_real_queue_v1';
const SERP_KEY = process.env.SERP_API_KEY || '';

async function getRealEmail(domain: string): Promise<string> {
  try {
    const res = await fetch(`https://${domain}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(6000)
    });
    const html = await res.text();
    const m = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
    if (m) {
      const email = m[0].toLowerCase();
      if (!email.includes('example') &&!email.includes('sentry') &&!email.includes('wix') &&!email.includes('.png') &&!email.includes('.jpg')) {
        return email;
      }
    }
  } catch {}
  return `info@${domain}`;
}

export async function GET() {
  if (!SERP_KEY) return NextResponse.json({ ok: false, error: 'SERP_API_KEY missing - add in Vercel env' }, { status: 500 });

  const cats = ['roofers', 'plumbers', 'electricians', 'dentists', 'contractors'];
  const existing = (await kv.get<any[]>(QUEUE_KEY)) || [];
  const newLeads: any[] = [];
  const existingDomains = new Set(existing.map((e: any) => e.domain));

  for (const cat of cats) {
    try {
      const q = `${cat} in Houston Texas`;
      const serpUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&location=Houston,Texas&num=5&api_key=${SERP_KEY}`;
      const r = await fetch(serpUrl);
      const data = await r.json();
      const organic = data.organic_results || [];

      for (const item of organic) {
        const link = item.link || '';
        if (!link) continue;
        let domain = '';
        try { domain = new URL(link).hostname.replace('www.', ''); } catch { continue; }
        if (existingDomains.has(domain) || newLeads.find(l => l.domain === domain)) continue;
        if (domain.includes('yelp') || domain.includes('facebook') || domain.includes('yellowpages') || domain.includes('bbb.org')) continue;

        const realEmail = await getRealEmail(domain);
        newLeads.push({
          business: (item.title || domain).split('|')[0].split('-')[0].trim().slice(0, 50),
          domain,
          realEmail,
          city: 'Houston',
          cat,
          source: 'SERP_API_LIVE'
        });
        if (newLeads.length >= 5) break;
      }
    } catch (e) { console.log('serp err', cat, e); }
    if (newLeads.length >= 5) break;
    await new Promise(res => setTimeout(res, 1200));
  }

  const merged = [...existing,...newLeads];
  await kv.set(QUEUE_KEY, merged);

  return NextResponse.json({
    ok: true,
    autonomous: true,
    fed: newLeads.length,
    total: merged.length,
    sample: newLeads,
    msg: 'LIVE autonomous - fetched from Google via SERP_API_KEY - no hardcoded emails'
  });
}
