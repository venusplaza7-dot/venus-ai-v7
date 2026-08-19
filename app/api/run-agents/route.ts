import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const paths = [
      path.join(process.cwd(), 'public', 'site500.json'),
      path.join(process.cwd(), 'site500.json'),
    ];
    let raw = "";
    for (const p of paths) {
      if (fs.existsSync(p)) { raw = fs.readFileSync(p, 'utf8').trim(); break; }
    }
    if (!raw) throw new Error('site500.json missing');
    if (raw.startsWith('<')) throw new Error('HTML file - fix .gitattributes');
    
    let sites = JSON.parse(raw);
    // REX QA: Filter valid leads only
    sites = sites.filter((s:any) => s.domain && !s.domain.includes('example') && s.email);

    // LUNA + REX + FAISAL AUTONOMOUS FACTORY
    const results = [];
    for (const lead of sites.slice(0,5)) {
      // LUNA BUILD
      const { buildLiveSite } = require('../factory/make-live.js');
      const live = await buildLiveSite(lead);
      results.push(live);
    }

    return NextResponse.json({
      ok: true,
      total: sites.length,
      built: results,
      ready: `Luna built ${results.length} live sites`,
      liveUrls: results.map(r=> `/live/${r.slug}`)
    });

  } catch (e:any) {
    return NextResponse.json({ ok:false, error:e.message }, { status:500 });
  }
}




