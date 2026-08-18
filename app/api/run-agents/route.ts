import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const key = process.env.BREVO_API_KEY
    if (!key) {
      return NextResponse.json({ ok: false, error: 'Missing BREVO_API_KEY env var in Vercel' }, { status: 200 })
    }
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { email: 've9us1@gmail.com', name: 'Venus Test' },
        to: [{ email: 've9us1@gmail.com' }],
        subject: 'Venus Agent - Brevo OK - e56ecff',
        htmlContent: '<p>Test OK. Brevo is connected. Build e56ecff works.</p>'
      })
    })
    const data = await r.json()
    return NextResponse.json({ ok: r.ok, status: r.status, brevo: data, sentTo: 've9us1@gmail.com' }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message, stack: e?.stack }, { status: 200 })
  }
}







