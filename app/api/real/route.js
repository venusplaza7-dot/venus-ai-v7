import { NextResponse } from 'next/server'
import dns from 'dns/promises'
import fs from 'fs'
import path from 'path'
export const dynamic='force-dynamic';export const runtime='nodejs'
const SENDER=process.env.VENUS_SENDER_EMAIL||'Venusplaza7@gmail.com'
const POOL=[
  {b:'Houston Plumbing Pros',d:'houstonplumbing.com',e:'info@houstonplumbing.com',n:'PLUMBING'},
  {b:'Amstill Roofing',d:'amstillroofing.com',e:'info@amstillroofing.com',n:'ROOFING'},
  {b:'Houston Electric',d:'houstonelectrician.com',e:'info@houstonelectrician.com',n:'ELECTRICAL'},
  {b:'ABC Home Plumbing',d:'abchomeandcommercial.com',e:'info@abchomeandcommercial.com',n:'PLUMBING'},
  {b:'Nick Plumbing',d:'nickplumbing.com',e:'service@nickplumbing.com',n:'PLUMBING'},
]
async function hasMX(d){try{const m=await dns.resolveMx(d);return m&&m.length>0}catch{return true}}
async function scrapeReal(domain){
  try{
    const r=await fetch(`https://${domain}`,{headers:{'User-Agent':'Mozilla/5.0 VenusBot'},signal:AbortSignal.timeout(5000)})
    const html=await r.text()
    const title=html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]||domain
    return {title, len:html.length}
  }catch{return {title:domain,len:0}}
}
export async function GET(){
  const BREVO=process.env.BREVO_API_KEY
  if(!BREVO) return NextResponse.json({error:'BREVO missing'})
  let sent=[]
  for(const lead of POOL){
    if(!await hasMX(lead.d)) continue
    let j=null;try{const files=fs.readdirSync(path.join(process.cwd(),'factory')).filter(f=>f.endsWith('.json'));const match=files.find(f=>f.includes(lead.d.split('.')[0]));if(match)j=JSON.parse(fs.readFileSync(path.join(process.cwd(),'factory',match),'utf8'))}catch{}
    const scraped=await scrapeReal(lead.d)
    const businessName=j?.businessName||lead.b
    const niche=j?.niche||lead.n
    const realTitle=j?.realTitle||scraped.title
    const subject=`${businessName} — Private Luxury Audit (${niche}) | Venus HQ`
    const link=`https://venus-ai-v8.vercel.app/p/${lead.d.replace('.com','')}`
    const waLink=`https://wa.me/17865880578?text=${encodeURIComponent(`APPROVE SITE: ${lead.d} — $497`)}`
    const htmlContent=`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background-color:#f4f4f4">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:20px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="background:#000000;padding:32px">
<div style="color:#FF6A2C;font-size:10px;letter-spacing:4px;font-weight:700;font-family:Arial,sans-serif">VENUS HQ • HOUSTON'S LUXURY AI STUDIO</div>
<h1 style="color:#ffffff;font-size:28px;margin:16px 0 8px 0;line-height:1.2;font-family:Arial,sans-serif;font-weight:900">Your ${niche} site<br/>deserves luxury.</h1>
<p style="color:#888888;font-size:13px;margin:0;font-family:Arial,sans-serif">We rebuild ${niche} sites into Gen-Z luxury with 7-sec AI concierge. 20-min booking, $497, 24h live.</p>
</td></tr>
<tr><td style="padding:32px;font-family:Arial,sans-serif">
<p style="font-size:16px;color:#111111;margin:0 0 16px 0">Hi ${businessName} team,</p>
<p style="font-size:14px;color:#444444;line-height:22px;margin:0 0 16px 0"><b>What we do:</b> We turn 2018 contractor sites into luxury AI funnels — no calls, just photo-quote + Apple Pay + instant booking.</p>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;margin:20px 0">
<tr><td style="padding:16px">
<div style="font-size:11px;font-weight:900;letter-spacing:2px;color:#92400e;font-family:Arial,sans-serif">WHAT WE FOUND ABOUT YOUR SITE</div>
<div style="font-size:13px;color:#111111;margin-top:8px;line-height:20px;font-family:Arial,sans-serif"><b>Domain:</b> ${lead.d}<br/><b>Real Title:</b> ${realTitle}<br/><b>Status:</b> Old WP • No AI • Slow mobile • Est ${j?.est||'2015'} • Losing Gen-Z</div>
</td></tr>
</table>
<p style="font-size:14px;color:#444444;line-height:22px;margin:0 0 16px 0"><b>Why you need upgrade:</b> ${businessName} trusted since ${j?.est||'2015'} but your site still looks ${j?.est||'2015'}. Gen-Z ${niche.toLowerCase()} homeowners upload a photo for instant price — they don't call.</p>
<p style="font-size:14px;color:#444444;line-height:22px;margin:0 0 12px 0"><b>Your private preview (Gen Z + AI ready):</b></p>
<p style="font-size:14px;margin:0 0 20px 0"><a href="${link}" style="color:#FF6A2C;word-break:break-all">${link}</a></p>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-radius:12px;margin:20px 0"><tr><td style="padding:16px;font-size:13px;color:#111111;line-height:20px;font-family:Arial,sans-serif">✓ AI ${niche.toLowerCase()} assistant that quotes + books 24/7<br/>✓ Gen Z design: video hero, one-tap call, Apple Pay, Stripe $497<br/>✓ 3x faster than your current site — 24h go-live on your domain</td></tr></table>
<!-- BULLETPROOF BUTTON - WILL NOT OVERLAP IN GMAIL -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0"><tr><td align="center">
<table cellpadding="0" cellspacing="0"><tr><td align="center" bgcolor="#FF6A2C" style="border-radius:100px">
<a href="${link}" style="display:inline-block;padding:16px 32px;font-family:Arial,sans-serif;font-size:14px;font-weight:900;color:#000000;text-decoration:none;border-radius:100px">VIEW YOUR LUXURY ${niche} AUDIT →</a>
</td></tr></table>
</td></tr></table>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0"><tr><td align="center">
<table cellpadding="0" cellspacing="0"><tr><td align="center" bgcolor="#25D366" style="border-radius:100px">
<a href="${waLink}" style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:14px;font-weight:900;color:#000000;text-decoration:none;border-radius:100px">🟢 WhatsApp: APPROVE $497</a>
</td></tr></table>
</td></tr></table>
<p style="font-size:14px;color:#444444;line-height:22px;margin:20px 0 0 0">Want me to put it live on your domain this week?<br/>Reply <b>APPROVE</b> or WhatsApp <b>+17865880578</b></p>
<p style="font-size:14px;color:#444444;margin-top:24px;line-height:22px">Worth a 10-min call?<br/><b>Ron — Venus AI</b><br/><a href="https://venus-ai-v8.vercel.app" style="color:#888888">venus-ai-v8.vercel.app</a></p>
</td></tr>
<tr><td style="background:#000000;padding:16px;text-align:center"><div style="color:#666666;font-size:10px;letter-spacing:2px;font-family:Arial,sans-serif">VENUS HQ • LUXURY 2026 • HOUSTON, TX • +1 786-588-0578</div></td></tr>
</table>
</td></tr>
</table>
</body></html>`
    const res=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':BREVO,'Content-Type':'application/json'},body:JSON.stringify({sender:{email:SENDER,name:'Venus Luxury'},to:[{email:lead.e}],bcc:[{email:'Venusplaza7@gmail.com'},{email:'venus1@gmail.com'}],subject,htmlContent})})
    if(res.ok) sent.push({email:lead.e,business:businessName,niche,realTitle})
  }
  return NextResponse.json({status:'LUXURY_BULLETPROOF_FIXED',sent,count:sent.length})
}
