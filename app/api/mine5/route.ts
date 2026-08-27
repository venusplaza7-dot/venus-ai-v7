export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function scrapeRealEmail(domain: string): Promise<string | null> {
  for (const p of ['', '/contact', '/contact-us', '/about']) {
    try {
      const res = await fetch(`https://${domain}${p}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        signal: AbortSignal.timeout(5000) as any,
      }).catch(() => null);
      if (!res ||!res.ok) continue;
      const html = await res.text();
      const matches = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g);
      if (!matches) continue;
      const filtered = matches.filter(e => {
        const l = e.toLowerCase();
        return!l.includes('example') &&!l.includes('wix') &&!l.includes('sentry') &&!l.includes('.png') &&!l.includes('.jpg') && l.length < 60;
      });
      // Find real person email, not generic
      const real = filtered.find(e => {
        const l = e.toLowerCase();
        return!l.startsWith('info@') &&!l.startsWith('admin@') &&!l.startsWith('support@') &&!l.startsWith('noreply@') &&!l.startsWith('no-reply@') &&!l.startsWith('hello@');
      });
      if (real) return real;
    } catch {}
  }
  return null; // SKIP - no info@ fallback
}

export async function GET(req: Request) {
  const rawUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  const rawToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  const headers = { Authorization: `Bearer ${rawToken}` };

  const niches = ['roofers', 'plumbers', 'electricians', 'dentists', 'contractors'];
  const cities = ['austin', 'miami', 'dallas', 'phoenix', 'denver', 'seattle', 'atlanta', 'chicago', 'houston', 'tampa', 'orlando', 'san-diego', 'los-angeles', 'new-york'];

  let totalSaved = 0;
  const allResults: any = {};

  for (const cat of niches) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const query = `${cat} in ${city} site:.com`;
    const html = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    }).then(r => r.text()).catch(() => '');

    const domainMatches = [...html.matchAll(/https?:\/\/([a-z0-9.-]+\.[a-z]{2,})/gi)].map(m => m[1]).filter(d =>!d.includes('duckduckgo') &&!d.includes('yelp') &&!d.includes('facebook') &&!d.includes('instagram') && d.includes('.') &&!d.includes('google'));

    const unique = [...new Set(domainMatches)].slice(0, 25);
    allResults[cat] = [];
    let saved = 0;

    for (const domain of unique) {
      if (saved >= 20) break;
      const email = await scrapeRealEmail(domain);
      if (!email) continue;

      await fetch(`${rawUrl}/rpush/${cat}:queue/${encodeURIComponent(domain)}`, { headers });
      await fetch(`${rawUrl}/set/${cat}:email:${encodeURIComponent(domain)}/${encodeURIComponent(email)}`, { headers });

      allResults[cat].push({ domain, email });
      saved++;
      totalSaved++;
      await new Promise(r => setTimeout(r, 700));
    }
  }

  return Response.json({
    status: '5-NICHE-FRESH-EVEN-REAL-ONLY',
    totalSaved,
    perNiche: '20 per niche target',
    results: allResults,
    nextStep: 'Hit /api/blast5 for test to your Gmail, /api/blast5?live=1 for real owners',
  });
}
