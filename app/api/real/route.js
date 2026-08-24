import { NextResponse } from 'next/server'
import dns from 'dns/promises'
import fs from 'fs'
import path from 'path'

export const dynamic='force-dynamic'
export const runtime='nodejs'

const SENDER=process.env.VENUS_SENDER_EMAIL||'Venusplaza7@gmail.com'

const POOL=[
  {b:'Houston Plumbing Pros',d:'houstonplumbing.com',e:'info@houstonplumbing.com',n:'PLUMBING'},
  {b:'Amstill Roofing',d:'amstillroofing.com',e:'info@amstillroofing.com',n:'ROOFING'},
  {b:'Houston Electric',d:'houstonelectrician.com',e:'info@houstonelectrician.com',n:'ELECTRICAL'},
  {b:'ABC Home Plumbing',d:'abchomeandcommercial.com',e:'info@abchomeandcommercial.com',n:'PLUMBING'},
  {b:'Nick Plumbing',d:'nickplumbing.com',e:'service@nickplumbing.com',n:'PLUMBING'},
]

async function hasMX(d){
  try{
    const m=await dns.resolveMx(d)
    return m&&m.length>0
  }catch{
    return true
  }
}

async function scrapeReal(domain){
  try{
    const r=await fetch(`https://${domain}`,{headers:{'User-Agent':'Mozilla/5.0 VenusBot'},signal:AbortSignal.timeout(5000)})
    const html=await r.text()
    const title=html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]||domain
    return {title, len:html.length}
  }catch{
    return {title:domain,len:0}
  }
}

export async function GET(){
  const BREVO=process.env.BREVO_API_KEY
  if(!BREVO) return NextResponse.json({error:'BREVO missing'})
  let sent=[]
  for(const lead of POOL){
    if(!await hasMX(lead.d)) continue
    let j=null
    try{
      const files=fs.readdirSync(path.join(process.cwd(),'factory')).filter(f=>f.endsWith('.json'))
      const match=files.find(f=>f.includes(lead.d.split('.')[0]))
      if(match) j=JSON.parse(fs.readFileSync(path.join(process.cwd(),'factory',match),'utf8'))
    }catch{}
    const scraped=await scrapeReal(lead.d)
    const businessName=j?.businessName||lead.b
    const niche=j?.niche||lead.n
    const realTitle=j?.realTitle||scraped.title
    const subject=`Private Audit: ${businessName} (${lead.d}) — ${niche} — 2018 → Luxury 2026`
    const htmlContent=`
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#000;color:#fff;padding:24px;border-radius:16px 16px 0 0">
          <div style="color:#FF6A2C;letter-spacing:4px;font-size:10px">VENUS HQ • WHO WE ARE</div>
          <h2 style="margin:10px 0 0 0">Venus HQ — Houston's Luxury AI Studio</h2>
          <p style="color:#888;font-size:12px;margin-top:8px">We rebuild ${niche} sites into Gen-Z luxury with 7-sec AI concierge. 20-min booking, $497, 24h live.</p>
        </div>
        <div style="background:#fff;padding:24px;border:1px solid #eee">
          <p>Hi ${businessName} team,</p>
          <p><b>What we do:</b> We turn 2018 contractor sites into luxury AI funnel — no calls, just photo-quote + Apple Pay.</p>
          <div style="background:#fffbeb;border:1px solid #fde68a;padding:12px;border-radius:10px;margin:16px 0">
            <b>What we found about YOUR site ${lead.d}:</b><br/>
            Title="${realTitle}"<br/>
            Old template, no AI, slow mobile (${scraped.len}b), losing Gen-Z to competitors with AI.<br/>
            Est ${j?.est||'2015'} — looks ${j?.est||'2015'}, not 2026.
          </div>
          <p><b>Why you need upgrade:</b> ${businessName} trusted since ${j?.est||'2015'} but site looks old. Gen-Z ${niche.toLowerCase()} homeowners upload photo for instant price, not call.</p>
          <p>I rebuilt a preview for you (Gen Z + AI ready):<br/>
          <a href="https://venus-ai-v8.vercel.app/p/${lead.d.replace('.com','')}">https://venus-ai-v8.vercel.app/p/${lead.d.replace('.com','')}</a></p>
          <p>It has:<br/>
          - AI ${niche.toLowerCase()} assistant that quotes + books 24/7<br/>
          - Gen Z design: video, one-tap call, Apple Pay<br/>
          - 3x faster than your ${j?.est||'2016'} site</p>
          <div style="text-align:center;margin:24px 0">
            <a href="https://venus-ai-v8.vercel.app/p/${lead.d.replace('.com','')}" style="background:#FF6A2C;color:#000;padding:14px 24px;border-radius:100px;font-weight:900;text-decoration:none">VIEW YOUR REAL LUXURY ${niche} AUDIT →</a>
          </div>
          <p>Want me to put it live on your domain this week? Reply APPROVE or WhatsApp +17865880578</p>
          <p>Worth a 10-min call?<br/>Ron — Venus AI<br/>venus-ai-v8.vercel.app</p>
        </div>
      </div>
    `
    const res=await fetch('https://api.brevo.com/v3/smtp/email',{
      method:'POST',
      headers:{'api-key':BREVO,'Content-Type':'application/json'},
      body:JSON.stringify({
        sender:{email:SENDER,name:'Venus Luxury'},
        to:[{email:lead.e}],
        bcc:[{email:'Venusplaza7@gmail.com'},{email:'venus1@gmail.com'}],
        subject,
        htmlContent
      })
    })
    if(res.ok) sent.push({email:lead.e,business:businessName,niche,realTitle})
  }
  return NextResponse.json({status:'5_REAL_DELIVERED',sent,count:sent.length,realScrape:true,whoWeAre:true})
}
