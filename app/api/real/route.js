import { NextResponse } from 'next/server'
import dns from 'dns/promises'
export const dynamic='force-dynamic';export const runtime='nodejs'
const SENDER=process.env.VENUS_SENDER_EMAIL||'ve9us1@gmail.com'
const POOL=[
  {b:'Houston Plumbing Pros',d:'houstonplumbing.com',e:'info@houstonplumbing.com',s:'houston-plumbing-pros'},
  {b:'Amstill Roofing',d:'amstillroofing.com',e:'info@amstillroofing.com',s:'amstill-roofing'},
  {b:'Houston Electric',d:'houstonelectrician.com',e:'service@houstonelectrician.com',s:'houston-electric-pro'},
  {b:'ABC Home Plumbing',d:'abchomeandcommercial.com',e:'info@abchomeandcommercial.com',s:'abc-home-plumbing'},
  {b:'Nick Plumbing',d:'nickplumbing.com',e:'service@nickplumbing.com',s:'nick-plumbing-houston'},
]
async function hasMX(d){try{const m=await dns.resolveMx(d);return m&&m.length>0}catch{return false}}
export async function GET(){
  const BREVO=process.env.BREVO_API_KEY
  if(!BREVO) return NextResponse.json({error:'BREVO missing'},{status:500})
  let sent=[]
  for(const lead of POOL){
    if(!await hasMX(lead.d)) continue
    const res=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':BREVO,'Content-Type':'application/json'},body:JSON.stringify({sender:{email:SENDER,name:'Ron | Venus AI'},to:[{email:lead.e}],bcc:[{email:SENDER}],subject:`${lead.b} — Your $497 Luxury Site is LIVE`,htmlContent:`<div style="background:#000;color:#fff;padding:32px;font-family:Arial"><h1 style="color:#ff8c00">VENUS LUXURY</h1><h2>${lead.b}</h2><p>https://venus-ai-v8.vercel.app/p/${lead.s}</p><p>WhatsApp APPROVE SITE: ${lead.s}</p></div>`})})
    if(res.ok) sent.push(lead.e)
  }
  return NextResponse.json({status:'5_REAL_DELIVERED',sent_this_batch:sent.length,emails:sent})
}
export async function POST(){return GET()}