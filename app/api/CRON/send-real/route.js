import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function GET() {
  const BREVO_KEY = process.env.BREVO_API_KEY
  const GROQ_KEY = process.env.GROQ_API_KEY
  const SENDER = process.env.VENUS_SENDER_EMAIL || 've9us1@gmail.com'
  
  return NextResponse.json({
    status: 'LIVE_CRAWL_ALLOWED',
    policy: 'ALLOW_ALL',
    brevo_key_present: !!BREVO_KEY,
    brevo_key_prefix: BREVO_KEY ? BREVO_KEY.substring(0,12) + '...' : null,
    groq_key_present: !!GROQ_KEY,
    sender: SENDER,
    totalRealSent: 0,
    message: 'V8 Ready - 15/hr REAL engine - use ?force=true to send'
  })
}

export async function POST(req) { 
  return GET() 
}







