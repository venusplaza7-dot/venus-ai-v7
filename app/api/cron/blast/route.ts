import { kv } from '@vercel/kv'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const CATEGORIES = ['roofing','plumbers','hvac','dentists']
const CITY = 'houston'
const SERP_KEY = process.env.SERP_API_KEY!
const RESEND_KEY = process.env.RESEND_API_KEY!
const WHATSAPP = '17865880578'

async function mineNiche(niche: string){
  const query = `${CITY} ${niche} old website built 2008 contact`
  const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&num=10&api_key=${SERP_KEY}`
  try{
    const r = await fetch(url)
    const data = await r.json()
    for(let item of (data.organic_results||[]).slice(0,5)){
      const domain = new URL(item.link).hostname.replace('www.','')
      if(['yelp','facebook','instagram','thumbtack','angi'].some(x=>domain.includes(x))) continue
      const business = item.title.split('-')[0].trim().slice(0,40)
      const slug = `${business.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${CITY}-${Date.now().toString().slice(-4)}`
      const link = `https://venus-ai-v8.vercel.app/o/${slug}?niche=${niche}&city=${CITY}&old=${domain}&b=${encodeURIComponent(business)}`
      const lead = {id:slug, business, domain, niche, city:CITY, email:`info@${domain}`, link, status:'mined', created:Date.now()}
      const exists = await kv.get(`lead:${slug}`)
      if(!exists){
        await kv.set(`lead:${slug}`, lead)
        await kv.sadd(`leads:${CITY}:${niche}`, slug)
        await kv.sadd(`queue:${CITY}:${niche}`, slug)
      }
    }
  }catch(e){ console.log('mine error',e) }
}

async function blastNiche(niche: string){
  const queue = await kv.smembers(`queue:${CITY}:${niche}`) as string[]
  const toSend = queue.slice(0,5)
  let sent = 0
  for(let id of toSend){
    const lead:any = await kv.get(`lead:${id}`)
    if(!lead) continue
    const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi VENUS HQ7! ${lead.business} ${lead.domain} ${lead.link} Activate $497 in 24h (was $1997) ID:${id}`)}`
    const html = `
    <div style="font-family:sans-serif;background:#000;color:#fff;padding:32px;max-width:600px">
      <h1 style="font-size:28px;font-weight:800">WE FOUND ${lead.domain.toUpperCase()}<br>REBUILT FOR 2027 FOR ${lead.business.toUpperCase()}</h1>
      <div style="margin-top:16px;padding:16px;border:1px solid #333;border-radius:12px;background:#0a0a0a"><b>WHO WE ARE:</b> VENUS HQ7 - VENUS AI LAB - Gen-Z Luxury AI - Not agency. Scan old ${niche} sites like ${lead.domain} (2008 history). HQ 2016 Blake St - IT Corp Inc - WhatsApp +1 (786) 588-0578 - 24H - Usa Ron</div>
      <div style="margin-top:12px;padding:16px;border:1px solid #222;border-radius:12px;background:#111"><b>WHAT WE DO:</b> 01 SCAN old gold 02 REBUILD with 5 AI tools (Booking Chat, Quote, Missed-Call, Review, Upsell) 03 ACTIVATE IN 24H with all tools</div>
      <div style="margin-top:16px;background:#fff;color:#000;padding:20px;border-radius:16px;text-align:center"><div style="font-size:32px;font-weight:800"><span style="text-decoration:line-through;opacity:0.5">$1997</span> → <span style="color:#D4AF37">$497</span></div><p style="font-size:13px">We will activate your new website for ${lead.business} with all 5 AI tools within 24 hours. One-time $497, no monthly. Was $1997.</p><a href="${lead.link}" style="display:block;margin-top:12px;background:#000;color:#fff;padding:14px;border-radius:999px;font-weight:800;text-decoration:none">VIEW YOUR WEBSITE → ${lead.domain}</a><a href="${waLink}" style="display:block;margin-top:8px;background:#25D366;color:#000;padding:14px;border-radius:999px;font-weight:800;text-decoration:none">WHATSAPP ACTIVATE IN 24H - $497</a></div>
    </div>`
    try{
      await fetch('https://api.resend.com/emails',{
        method:'POST',
        headers:{'Authorization':`Bearer ${RESEND_KEY}`,'Content-Type':'application/json'},
        body: JSON.stringify({from:'Venus HQ7 <activate@venus-ai-v8.vercel.app>', to: lead.email, subject:`${lead.business} - Your old site ${lead.domain} rebuilt - $1997 → $497 - 24H activation`, html})
      })
      lead.status='blasted'; lead.blastedAt=Date.now()
      await kv.set(`lead:${id}`, lead)
      await kv.srem(`queue:${CITY}:${niche}`, id)
      await kv.sadd(`blasted:${CITY}:${niche}`, id)
      sent++
    }catch(e){ console.log('blast error',e) }
  }
  return sent
}

export async function GET(req: Request){
  // protect cron - Vercel sends auth header
  const auth = req.headers.get('authorization')
  if(auth!== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV==='production'){
    // allow Vercel cron without check - remove this check if you want
  }

  let totalMined = 0, totalSent = 0
  const log:any[]=[]

  for(let niche of CATEGORIES){
    await mineNiche(niche)
    const sent = await blastNiche(niche)
    totalSent += sent
    log.push({niche, sent})
  }

  await kv.set('last_cron', {time:Date.now(), log, totalSent})
  return Response.json({ok:true, time: new Date().toISOString(), log, totalSent, msg:'5 emails per category every 30min - agents fetch on their own'})
}
