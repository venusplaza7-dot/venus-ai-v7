import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json({ ok: false, error: "BREVO_API_KEY missing in Vercel Env" }, { status: 200 });
    }

    // Safe load - never crash
    let sitesCount = 0;
    try {
      const p = path.join(process.cwd(), 'site500.json');
      if (fs.existsSync(p)) {
        const data = JSON.parse(fs.readFileSync(p, 'utf8'));
        sitesCount = Array.isArray(data) ? data.length : 0;
      }
    } catch {}

    // ONE email to yourself - this creates Brevo log
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: "Venus Agent HQ", email: "sylvia@venusplaza7.com" }, // use your authenticated Brevo sender
        to: [{ email: "ronkahn1979@gmail.com" }],
        subject: "Venus HQ - Brevo Connected",
        htmlContent: `<p>Brevo working. Sites loaded: ${sitesCount}. Time: ${new Date().toISOString()}</p><p>Next: manual review flow.</p>`
      })
    });

    const j = await r.json();
    
    return NextResponse.json({
      ok: r.ok,
      status: r.status,
      brevo: j,
      sitesCount,
      sentTo: "ronkahn1979@gmail.com",
      note: "If ok=true, check Brevo > Transactional > Logs - will show 1"
    }, { status: 200 });

  } catch (e: any) {
    // Always 200, never 500
    return NextResponse.json({ ok: false, error: e.message }, { status: 200 });
  }
}

