export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const BREVO_KEY = process.env.BREVO_API_KEY
    if (!BREVO_KEY) {
      return NextResponse.json({ error: 'BREVO_API_KEY missing in Vercel env - add it', totalRealSent: 0 }, { status: 500 })
    }

    // Test Brevo key
    const brevoTest = await fetch('https://api.brevo.com/v3/account', {
      headers: { 'api-key': BREVO_KEY }
    })
    const account = await brevoTest.json()

    return NextResponse.json({
      status: 'V8 LIVE',
      brevo_key_present: true,
      brevo_valid: brevoTest.ok,
      brevo_account: account,
      totalRealSent: 0,
      message: 'V8 Ready - 15/hr REAL engine can start. Use ?force=true to send 5',
      sender: process.env.VENUS_SENDER_EMAIL || 've9us1@gmail.com',
      groq_present: !!process.env.GROQ_API_KEY
    })
  } catch (e) {
    return NextResponse.json({ error: e.message, stack: e.stack }, { status: 500 })
  }
}

export async function POST(req) { return GET(req) }