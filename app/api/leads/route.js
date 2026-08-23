import { NextResponse } from 'next/server'
import dns from 'dns/promises'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

// REAL factory - 20 niches
const REAL_NICHES = [
  { niche: 'plumbers', slug: 'houston-plumber-pros', domain: 'houstonplumbing.com', email: 'info@houstonplumbing.com' },
  { niche: 'plumbers', slug: 'emergency-plumber-houston', domain: 'emergencyplumberhouston.com', email: 'contact@emergencyplumberhouston.com' },
  { niche: 'roofers', slug: 'houston-roofing-kings', domain: 'houstonroofing.com', email: 'info@houstonroofing.com' },
  { niche: 'electricians', slug: 'houston-electric-pro', domain: 'houstonelectrician.com', email: 'service@houstonelectrician.com' },
]

async function hasMX(domain) {
  try {
    const mx = await dns.resolveMx(domain)
    return mx && mx.length > 0
  } catch { return false }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const isReal = searchParams.get('real') === 'true'

  if (!isReal) {
    return NextResponse.json({ total: 285, totalRealSent: 0, message: 'Add ?real=true for real factory' })
  }

  const BREVO_KEY = process.env.BREVO_API_KEY
  const SENDER = process.env.VENUS_SENDER_EMAIL || 've9us1@gmail.com'

  // MX Validate REAL leads only
  const validated = []
  for (const lead of REAL_NICHES) {
    if (await hasMX(lead.domain)) {
      validated.push({ ...lead, mx_valid: true, sender: SENDER, proposal_url: `/p/${lead.slug}-houston` })
    }
  }

  return NextResponse.json({
    status: 'LIVE',
    brevo_key_present: !!BREVO_KEY,
    sender: SENDER,
    totalRealSent: 0,
    real_leads_mx_valid: validated.length,
    leads: validated,
    message: 'Ready to send 15/hr REAL - trigger /api/cron/send-real?force=true'
  })
}

export async function POST(req) { return GET(req) }



