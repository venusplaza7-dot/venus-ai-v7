import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get('url') || 'https://example.com';
    const html = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store'
    }).then(r => r.text()).catch(() => '');

    if (!html) {
      return NextResponse.json({ error: 'No html', results: {} });
    }

    // FIXED: use Array.from instead of spread [...]
    const matches = Array.from(html.matchAll(/https?:\/\/([a-z0-9.-]+\.[a-z]{2,})/gi), m => m[1].toLowerCase());

    const unique = [...new Set(matches)].slice(0, 25);

    const allResults: any = {};
    const cat = 'domains';
    allResults[cat] = unique.map(domain => ({ domain, url: `https://${domain}` }));

    return NextResponse.json({ ok: true, count: unique.length, results: allResults, source: url });

  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
