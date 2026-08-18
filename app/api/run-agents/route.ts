import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json({ ok: false, error: "BREVO_API_KEY missing in Vercel" }, { status: 200 });
    }
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: "Venus HQ", email: "sylvia@venusplaza7.com" },
        to: [{ email: "ronkahn1979@gmail.com" }],
        subject: "Venus HQ Fixed",
        htmlContent: `<p>Fixed at ${new Date().toISOString()}</p>`
      })
    });
    const data = await r.json();
    return NextResponse.json({ ok: r.ok, status: r.status, brevo: data }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 200 });
  }
}

