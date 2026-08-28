import { NextResponse } from 'next/server'

// In-memory leads - replace with DB later
let LEADS_DB: any[] = (global as any).LEADS_DB || []

const NICHE_COLORS: any = {
  roofing: '#D4AF37',
  roofers: '#D4AF37',
  plumber: '#0EA5E9',
  plumbers: '#0EA5E9',
  hvac: '#FF6B00',
  dentist: '#7ED7C1',
  dentists: '#7ED7C1',
}

// Mock old domains - replace with real Wayback scraper later
const OLD_DOMAINS: any = {
  roofing: ['houstonroofing2008.biz', 'allstateroofingtx.com', 'texasroofpro2009.net', 'houstonroofrepairsite.org'],
  plumbers: ['houstonplumbing2007.com', 'quickplumbhouston.net', '24hrplumbertx.biz'],
  hvac: ['houstonachero2008.com', 'coolairhouston.net', 'texashvacpro.com'],
  dentists: ['houstondental2009.com', 'smilehoustontexas.net', 'houstonteethcare.com'],
}

export async function POST(req: Request) {
  try {
    const { city = 'houston', niche = 'roofing', limit = 10 } = await req.json()

    const cleanNiche = niche.toLowerCase()
    const domains = OLD_DOMAINS[cleanNiche] || OLD_DOMAINS.roofing
    const color = NICHE_COLORS[cleanNiche] || '#D4AF37'

    const newLeads = []
    for (let i = 0; i < limit; i++) {
      const domain = domains[i % domains.length]
      const id = `${Date.now()}${Math.floor(Math.random()*1000)}-${i}`
      const demoId = `${Date.now()}${i}`

      // This is the public demo URL - uses new template with color auto
      const publicUrl = `/p/${demoId}?niche=${cleanNiche}&city=${city}&old=${domain}`

      const lead = {
        id,
        demoId,
        domain,
        oldDomain: domain,
        niche: cleanNiche,
        city,
        color,
        publicUrl,
        oldUrl: `http://${domain}`,
        newUrl: publicUrl,
        status: 'scraped',
        built: false,
        emailed: false,
        yearFound: 2005 + Math.floor(Math.random() * 15), // 2005-2020
        pages: Math.floor(Math.random() * 10) + 2,
        hasYahooEmail: Math.random() > 0.5,
        createdAt: new Date().toISOString(),
        upgradePrice: 497,
        upgradeId: `demo-${demoId}${city}.com`,
      }

      newLeads.push(lead)
      LEADS_DB.push(lead)
    }

    ;(global as any).LEADS_DB = LEADS_DB

    return NextResponse.json({
      success: true,
      message: `MINE5 scraped ${newLeads.length} old ${niche} sites from ${city} (2005-2020)`,
      leads: newLeads,
      totalInDb: LEADS_DB.length,
      next: `Run POST /api/agent-builder to build ${newLeads.length} demos with ${color} color`,
    })

  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function GET() {
  const db = (global as any).LEADS_DB || LEADS_DB
  return NextResponse.json({
    total: db.length,
    byNiche: db.reduce((acc: any, l: any) => {
      acc[l.niche] = (acc[l.niche] || 0) + 1
      return acc
    }, {}),
    leads: db.slice(-20).reverse(), // last 20
  })
}

export async function DELETE() {
  ;(global as any).LEADS_DB = []
  LEADS_DB = []
  return NextResponse.json({ success: true, message: 'Cleared all leads' })
}
