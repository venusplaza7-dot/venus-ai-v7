import { NextResponse } from 'next/server'
import dns from 'dns/promises'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0
const SENDER = process.env.VENUS_SENDER_EMAIL || 've9us1@gmail.com'
const REAL_POOL = [
  { business: 'Houston Plumbing Pros', domain: 'houstonplumbing.com', email: 'info@houstonplumbing.com', slug: 'houston-plumbing-pros' },
  { business: 'Emergency Plumber Houston', domain: 'emergencyplumberhouston.com', email: 'contact@emergencyplumberhouston.com', slug: 'emergency-plumber-houston' },
  { business: 'All Star Plumbing Houston', domain: 'allstarplumbinghouston.com', email: 'service@allstarplumbinghouston.com', slug: 'all-star-plumbing-houston' },
  { business: 'Houston Roofing Kings', domain: 'houstonroofing.com', email: 'info@houstonroofing.com', slug: 'houston-roofing-kings' },
  { business: 'Amstill Roofing Houston', domain: 'amstillroofing.com', email: 'info@amstillroofing.com', slug: 'amstill-roofing-houston' },
]
async function hasMX(d){try{const m=await dns.resolveMx(d);return m&&m.length>0}catch{return false}}
export async function GET(req){
  const BREVO_KEY=process.env.BREVO_API_KEY
  if(!BREVO_KEY) return NextResponse.json({error:'BREVO missing'}, {status:500})
  let sent=0; const results=[]
  for(let i=0;i<5;i++){
    const lead=REAL_POOL[i]
    if(!(await hasMX(lead.domain))){results.push({...lead,status:'skip'});continue}
    const r=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':BREVO_KEY,'Content-Type':'application/json'},body:JSON.stringify({sender:{email:SENDER,name:'Venus Luxury'},to:[{email:SENDER}],subject:`${lead.business} LIVE`,htmlContent:`<div style="background:#000;color:#fff;padding:30px"><h1 style="color:#ff8c00">VENUS LUXURY</h1><p>${lead.business} - /p/${lead.slug} - WhatsApp APPROVE</p></div>`})})
    if(r.ok){sent++;results.push({...lead,status:'sent_real'})}
  }
  return NextResponse.json({status:'REAL_DEAL_LIVE',sent_this_batch:sent,totalRealSent:sent,leads:results})
}
export async function POST(r){return GET(r)}
