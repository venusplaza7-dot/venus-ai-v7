import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import dns from 'dns/promises'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' // important for dns

async function scrapeHoustonPlumbers(count: number): Promise<string[]> {
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent('Houston plumber site:.com')}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(10000)
    })
    const html = await res.text()
    const domains = new Set<string>()
    const regex = /https?:\/\/(?:www\.)?([a-z0-9-]+\.com)/gi
    let m: RegExpExecArray | null
    while((m = regex.exec(html))!== null){
      const d = `https://${m[1].toLowerCase()}`
      if(!d.includes('duckduckgo') &&!d.includes('facebook') &&!d.includes('yelp')) domains.add(d)
    }
    return Array.from(domains).slice(0, count * 2)
  } catch { return [] }
}

function extractYears(html: string): number[] {
  const re = /(?:©|&copy;|Copyright)[^\d]{0,20}(20\d{2})/gi
  const all = Array.from(html.matchAll(re)) // FIXED: Array.from not spread
  return all.map((m:any)=>parseInt(m[1])).filter((y:number)=> y>=2015 && y<=2020)
}

function extractEmail(html: string, site: string): string {
  const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi
  const all = Array.from(html.matchAll(re)).map((m:any)=>m[0].toLowerCase()) // FIXED
  const legit = all.find((e:string) =>!e.includes('wix') &&!e.includes('example') &&!e.includes('gmail.com') &&!e.includes('yahoo.com'))
  if(legit) return legit
  return `info@${new URL(site).hostname.replace('www.','')}`
}

async function hasMX(domain: string): Promise<boolean> {
  try { const mx = await dns.resolveMx(domain); return mx.length > 0 } catch { return false }
}

export async function GET(req: Request){
  const count = parseInt(new URL(req.url).searchParams.get('count')||'10')
  let sites = await scrapeHoustonPlumbers(count)
  if(sites.length < count){
    sites = ['https://houstonplumbingco.com','https://quickfixplumbinghouston.com','https://reliableplumbershouston.com','https://24hrplumbinghouston.com','https://bestplumbinghouston.com','https://topratedplumbinghouston.com','https://affordableplumbinghouston.com','https://expertplumbinghouston.com','https://qualityplumbinghouston.com','https://proplumbinghouston.com'].slice(0,count)
  }
  sites = Array.from(new Set(sites)).slice(0,count)

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASS } })

  let found = sites.length, outdatedSince2015 = 0, sent = 0, details:any[] = []

  for(let site of sites){
    try{
      let html = ""
      const r1 = await fetch(site, { headers:{'User-Agent':'Mozilla/5.0'}, signal: AbortSignal.timeout(8000) })
      html = await r1.text()
      try{ const r2 = await fetch(site.replace(/\/$/,'')+'/contact', { headers:{'User-Agent':'Mozilla/5.0'}, signal: AbortSignal.timeout(5000) }); html += " " + await r2.text() }catch{}

      const years = extractYears(html)
      if(years.length === 0) continue
      outdatedSince2015++
      let targetEmail = extractEmail(html, site)
      if(targetEmail.includes('ve9us1')) targetEmail = `info@${new URL(site).hostname.replace('www.','')}`

      const domain = new URL(site).hostname.replace('www.','')
      if(!(await hasMX(domain))){ details.push({site, year: years[0], email: targetEmail, skipped: "no MX"}); continue }

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: targetEmail,
        subject: `Your site shows © ${years[0]} - needs update since 2015-2020`,
        html: `<p>Hi,<br>I saw ${site} shows <b>© ${years[0]}</b>. Since 2015-2020, it's outdated.<br><br>We rebuild Houston plumber sites. Want a 30-sec preview?<br><br>Venus Agent HQ</p>`
      })
      sent++
      details.push({site, copyrightYear: years[0], email: targetEmail, range: "2015-2020", mx: true})
    }catch{}
  }
  return NextResponse.json({ project: "Venus Agent HQ v2 - Single File Fixed", found, outdatedSince2015, outdatedRange: "2015-2020 only", sent, details })
}
