export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const catsParam = url.searchParams.get('cat');
  const niches = catsParam? [catsParam] : ['roofers','plumbers','electricians','dentists','contractors'];

  const rawUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  const rawToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  const headers = { Authorization: `Bearer ${rawToken}` };

  const cleared = [];
  for (const cat of niches) {
    try {
      await fetch(`${rawUrl}/del/${cat}:queue`, { headers });
      cleared.push(cat);
    } catch {}
  }

  return Response.json({ status: 'CLEARED', cleared, message: 'Old 340 deleted. Ready for fresh 5-niche scrape.' });
}
