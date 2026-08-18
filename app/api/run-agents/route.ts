import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json({ ok: false, error: "BREVO_API_KEY missing" }, { status: 200 });
    }

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: "Venus HQ", email: "sylvia@venusplaza7.com" },
        to: [{ email: "ronkahn1979@gmail.com" }],
        subject: "Venus HQ Fix Test",
        htmlContent: `<p>Test at ${new Date().toISOString()} - if you see this, Brevo works and 500 is fixed.</p>`
      })
    });
    const data = await res.json();
    return NextResponse.json({ ok: res.ok, status: res.status, brevo: data }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 200 });
  }
}


