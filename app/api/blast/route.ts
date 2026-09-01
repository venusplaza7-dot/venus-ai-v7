import { kv } from '@vercel/kv'

const RESEND_KEY = process.env.RESEND_API_KEY!
const WHATSAPP = '17865880578'
export async function GET(req: Request) {
  return POST(req);
  {
export async function GET(req: Request) {
  return POST(req);
}
export async function POST(req: Request){
  const { niche='roofing', city='houston', limit=5 } = await req.json()
  const ids = await kv.smembers(`leads:${city}:${niche}`) as string[]
  const toBlast = ids.slice(0, limit)
  
  let sent = 0
  for(let id of toBlast){
    const lead:any = await kv.get(`lead:${id}`)
    if(!lead || lead.status==='blasted') continue
    
    const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi VENUS HQ7! Business: ${lead.business} ID: ${id} Old: ${lead.domain} Link: ${lead.link} I want $497 activation in 24h (was $1997)`)}`
    
    const html = `
    <div style="font-family:sans-serif;background:#000;color:#fff;padding:32px;max-width:600px">
      <div style="font-size:11px;letter-spacing:0.2em;opacity:0.5">VENUS HQ7 // WHO WE ARE // WHAT WE DO</div>
      <h1 style="font-size:32px;font-weight:800;line-height:0.9;margin-top:16px">WE FOUND YOUR OLD WEBSITE<br><span style="color:#D4AF37">${lead.domain.toUpperCase()}</span><br>WE REBUILT IT FOR 2027.</h1>
      
      <div style="margin-top:24px;border:1px solid rgba(255,255,255,0.15);padding:20px;border-radius:16px;background:#0a0a0a">
        <div style="font-size:10px;opacity:0.5">[ WHO WE ARE ]</div>
        <p style="font-size:13px;line-height:1.6;color:rgba(255,255,255,0.7)">We are VENUS HQ7 - VENUS AI LAB - Gen-Z Luxury AI for ${lead.niche} - Not an agency. We scan 2005-2020 forgotten ${lead.niche} sites in ${city.toUpperCase()}. We found ${lead.domain} - 15 years history. Rebuild with 5 AI tools. HQ: 2016 Blake St - IT Corp Inc - Business Account - WhatsApp +1 (786) 588-0578 - 24H.</p>
      </div>
      
      <div style="margin-top:16px;border:1px solid rgba(255,255,255,0.1);padding:20px;border-radius:16px;background:#111">
        <div style="font-size:10px;opacity:0.5">[ WHAT WE DO ]</div>
        <p style="font-size:13px;line-height:1.6">01 SCAN - Found ${lead.domain} history since 2008<br>02 REBUILD - AI Booking Chat, Quote, Missed-Call Text, Review Engine, Upsell<br>03 ACTIVATE IN 24H - We will activate your new website with all 5 AI tools within 24 hours</p>
      </div>
      
      <div style="margin-top:16px;background:#fff;color:#000;padding:20px;border-radius:16px">
        <div style="font-size:28px;font-weight:800">ORIGINAL <span style="text-decoration:line-through;opacity:0.5">$1997</span> → TODAY <span style="color:#D4AF37">$497</span></div>
        <p style="font-size:13px;margin-top:8px">For ${lead.business} - All 5 AI tools + Venus OS + Hosting + SSL included. 24H delivery guaranteed.</p>
        <a href="${lead.link}" style="display:block;margin-top:16px;height:48px;background:#000;color:#fff;border-radius:999px;display:flex;align-items:center;justify-content:center;font-weight:800;text-decoration:none">VIEW YOUR REBUILT WEBSITE FOR ${lead.business.toUpperCase()} →</a>
        <a href="${waLink}" style="display:block;margin-top:10px;height:48px;background:#25D366;color:#000;border-radius:999px;display:flex;align-items:center;justify-content:center;font-weight:800;text-decoration:none">💬 WHATSAPP ACTIVATE IN 24H - $497 (WAS $1997)</a>
      </div>
      
      <p style="font-size:11px;opacity:0.4;margin-top:16px">ID: ${id} - ${lead.domain} - ${lead.city.toUpperCase()} - Venus HQ7 - 24h delivery</p>
    </div>`
    
    await fetch('https://api.resend.com/emails',{
      method:'POST',
      headers:{'Authorization':`Bearer ${RESEND_KEY}`,'Content-Type':'application/json'},
      body: JSON.stringify({
        from: 'Venus HQ7 <activate@venus-ai-v8.vercel.app>',
        to: lead.email,
        subject: `We found ${lead.domain} - Rebuilt for ${lead.business} - $1997 → $497 - 24H activation`,
        html
      })
    })
    
    lead.status = 'blasted'
    lead.blastedAt = Date.now()
    await kv.set(`lead:${id}`, lead)
    sent++
  }
  
  return Response.json({sent, niche, city})
}
