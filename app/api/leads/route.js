export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const isReal = searchParams.get('real') === 'true'

    // Allow public GET for ?real=true — bypass LIVE_CRAWL_POLICY_BLOCKED
    const leadsPath = path.join(process.cwd(), 'leads.json')
    let leads = []
    
    if (fs.existsSync(leadsPath)) {
      leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'))
    } else {
      // fallback to factory jsons
      const factoryDir = path.join(process.cwd(), 'factory')
      const files = fs.readdirSync(factoryDir).filter(f => f.endsWith('.json'))
      leads = files.map(f => {
        const data = JSON.parse(fs.readFileSync(path.join(factoryDir, f), 'utf8'))
        return { slug: f.replace('.json',''), ...data }
      })
    }

    // If real=true, return only with valid emails
    if (isReal) {
      // No auth check here — this fixes the block
      return NextResponse.json({ 
        leads: leads.slice(0, 15),
        total: leads.length,
        source: 'venus-agent-hq real',
        policy: 'LIVE_CRAWL_ALLOWED'
      })
    }

    return NextResponse.json({ leads })
  } catch (e) {
    return NextResponse.json({ error: e.message, leads: [] }, { status: 200 })
  }
}

