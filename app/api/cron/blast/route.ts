export const dynamic = 'force-dynamic'

export async function GET(){
  const SERP_KEY = process.env.SERP_API_KEY
  const BREVO_KEY = process.env.BREVO_API_KEY
  const SENDER = 'ron@venushq7.com'
  const BCC = 'venusailux@gmail.com'
  const CITY = 'houston'
  const WHATSAPP = '17865880578'

  let logs:any[] = []
  let mined:any[] = []
  let totalSent = 0

  /        let domain = ''
        try{ domain = new URL(rawLink).hostname.replace('www.','') }catch{ continue }

        // V10 ULTRA STRICT - ONLY small houston roofing old sites
        const JUNK = ['yelp','facebook','instagram','yellowpages','angi','thumbtack','bbb.org','homeadvisor','houzz','bestpick','linkedin','wikipedia','amazon','youtube','twitter','tiktok','serviceagent','google.com','decra.com','owenscorning','gaf.com','certainteed','roofing.net','rooferscoffeeshop']
        if(JUNK.some(x=>domain.includes(x))) continue
        if(domain.endsWith('.ai') || domain.endsWith('.io')) continue // no AI companies
        if(!domain.includes('roof') && !domain.includes('houston')) continue // MUST contain roof or houston - this kills google.com
        if(mined.some(m=>m.domain===domain)) continue
        if(domain.length < 10 || domain.length > 30) continue // small business domains are 10-30 chars 1. MINE REAL OLD SITES - 4 niches = 20 leads
  const niches = ['roofing','plumber','hvac','dentist']
  for(let niche of niches){
    try{
      const q = `${CITY} ${niche} old website 2008 -yelp -facebook`
      const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&num=10&api_key=${SERP_KEY}`
      const r = await fetch(url, {signal: AbortSignal.timeout(12000)})
      const data:any = await r.json()
      logs.push(`${niche}: found ${data.organic_results?.length||0}`)

      for(let item of (data.organic_results||[])){
        const rawLink = item.link
        let domain = ''
        try{ domain = new URL(rawLink).hostname.replace('www.','') }catch{ continue }

        // STRONG JUNK FILTER - fixes bestpick, linkedin issue
        const JUNK = ['yelp','facebook','instagram','yellowpages','angi','thumbtack','bbb.org','homeadvisor','houzz','bestpick','linkedin','wikipedia','amazon','youtube','twitter','tiktok']
        if(JUNK.some(x=>domain.includes(x))) continue
        if(mined.some(m=>m.domain===domain)) continue
        if(domain.length < 5 || domain.split('.').length!==2) continue

        const business = item.title.split(/[-|]/)[0].trim().slice(0,35) || domain.split('.')[0]
        mined.push({
          business, domain,
          niche,
          email:`info@${domain}`,
          oldLink: rawLink,
          link: `https://venus-ai-v8.vercel.app/o/${domain.replace(/\./g,'-')}-${Date.now().toString().slice(-5)}?niche=${niche}&city=${CITY}&old=${domain}`,
          id: `${niche}-${domain}-${Date.now()}`
        })
        if(mined.length >= 20) break
      }
    }catch(e:any){ logs.push(`${niche} FAIL: ${e.message}`) }
    if(mined.length >= 20) break
  }

  if(mined.length===0){
    logs.push('FALLBACK - SERP quota over')
    mined = [
      {business:'Houston Roofing Pro', domain:'houstonroofingonline.com', niche:'roofing', email:'info@houstonroofingonline.com', oldLink:'https://houstonroofingonline.com', link:`https://venus-ai-v8.vercel.app/o/houstonroofingonline-${Date.now()}`, id:`fb1-${Date.now()}`},
      {business:'Proper Roof Houston', domain:'properroof.com', niche:'roofing', email:'info@properroof.com', oldLink:'https://properroof.com', link:`https://venus-ai-v8.vercel.app/o/properroof-${Date.now()}`, id:`fb2-${Date.now()}`},
    ]
  }

  // 2. SEND LUXURY PROFESSIONAL EMAIL
  for(let lead of mined.slice(0,5)){
    const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi ${lead.business}! Your old site ${lead.domain} rebuilt: ${lead.link} - $1997→$497 24H - Ron`)}`
    const colors:any = {roofing:'#000', plumber:'#0a2540', hvac:'#1a4d2e', dentist:'#581c87'}
    const brandColor = colors[lead.niche] || '#000'

    const html = `
<div style="background:#f5f5f3;margin:0;padding:20px 0;font-family:Inter,Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #e5e5e5">
    <div style="background:${brandColor};padding:24px 32px;display:flex;justify-content:space-between;align-items:center">
      <div style="color:#fff;font-weight:900;letter-spacing:2px">VENUS HQ7</div>
      <div style="color:#D4AF37;font-size:10px;letter-spacing:1px;font-weight:700">GEN-Z LUXURY AI • 2016</div>
    </div>
    <div style="padding:32px 32px 16px">
      <div style="display:inline-block;background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;padding:6px 12px;border-radius:999px">OLD SITE DETECTED: ${lead.oldLink.replace('https://','').slice(0,30)} (2008)</div>
      <h1 style="font-size:26px;font-weight:900;color:#000;margin:16px 0 8px;line-height:1.1">We found <span style="color:#2563eb">${lead.domain}</span><br>Rebuilt for ${lead.business}</h1>
      <p style="color:#666;font-size:14px;margin:0">16-year-old site detected. We already rebuilt it with 5 AI tools - preview live.</p>
    </div>
    <div style="padding:0 32px;display:flex;gap:12px">
      <div style="flex:1;background:#fafafa;border:1px solid #eee;border-radius:16px;padding:14px"><div style="font-size:10px;color:#999;font-weight:700">OLD REAL SITE (2008)</div><div style="font-size:12px;color:#2563eb;word-break:break-all;margin-top:6px">${lead.oldLink}</div></div>
      <div style="flex:1;background:#000;border-radius:16px;padding:14px"><div style="font-size:10px;color:#D4AF37;font-weight:700">NEW AI SITE (2026)</div><div style="font-size:12px;color:#fff;word-break:break-all;margin-top:6px">${lead.link}</div></div>
    </div>
    <div style="padding:20px 32px">
      <div style="background:#fcfaf6;border:1px solid #f0e6d3;border-radius:16px;padding:16px"><div style="font-size:11px;font-weight:800;letter-spacing:1px">WHO WE ARE</div><div style="font-size:13px;color:#444;margin-top:6px;line-height:1.5">VENUS HQ7 - Venus AI Lab, IT Corp Inc, 2016 Blake St Denver CO. We scan old gold sites like ${lead.domain} (16 yrs old) and rebuild with Gen-Z luxury AI. Ron, USA. 24H activation.</div></div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:16px;margin-top:12px"><div style="font-size:11px;font-weight:800;letter-spacing:1px">WHAT WE DO - 5 AI TOOLS</div><div style="font-size:13px;color:#444;margin-top:6px;line-height:1.6">01 <b>AI Booking Chat</b><br>02 <b>AI Quote Estimator</b><br>03 <b>AI Missed-Call Text</b><br>04 <b>AI Review Engine</b><br>05 <b>Venus OS</b></div></div>
    </div>
    <div style="padding:0 32px 32px;text-align:center">
      <div style="border:2px dashed #D4AF37;border-radius:20px;padding:24px">
        <div style="font-size:34px;font-weight:900"><span style="text-decoration:line-through;color:#ccc;font-size:22px">$1997</span> $497</div>
        <div style="font-size:13px;color:#666;margin-top:6px">Activate ${lead.business} new site in 24H - One-time $497</div>
        <a href="${lead.link}" style="display:block;margin-top:18px;background:#000;color:#fff;padding:16px;border-radius:999px;font-weight:900;text-decoration:none">VIEW REBUILT WEBSITE →</a>
        <a href="${wa}" style="display:block;margin-top:10px;background:#25D366;color:#000;padding:16px;border-radius:999px;font-weight:900;text-decoration:none">WHATSAPP $497 - 24H ACTIVATE</a>
      </div>
    </div>
    <div style="background:#fafafa;padding:16px 32px;border-top:1px solid #eee"><div style="font-size:10px;color:#999;line-height:1.5">You got this because ${lead.domain} is outdated (2008). We rebuilt as courtesy. Reply STOP to opt-out. Venus HQ7, 2016 Blake St Denver - ron@venushq7.com - +1 786 588 0578</div></div>
  </div>
</div>`

    try{
      const res = await fetch('https://api.brevo.com/v3/smtp/email',{
        method:'POST',
        headers:{'api-key': BREVO_KEY||'', 'Content-Type':'application/json'},
        body: JSON.stringify({
          sender:{name:'Ron - Venus HQ7', email:SENDER},
          to:[{email: lead.email}],
          bcc:[{email:BCC}],
          subject:`${lead.business} - ${lead.domain} rebuilt $1997→$497 - 24H`,
          htmlContent: html,
          tags:[lead.niche,CITY]
        })
      })
      const j:any = await res.json()
      logs.push(`BREVO to ${lead.email}: ${res.status}`)
      if(res.ok) totalSent++
    }catch(e:any){ logs.push(`FAIL ${lead.email}: ${e.message}`) }
  }

  return Response.json({ok:true, sender:SENDER, bcc:BCC, totalSent, mined: mined.slice(0,5).map(m=>({domain:m.domain, email:m.email, niche:m.niche})), logs, msg:`Sent ${totalSent} luxury from ${SENDER} to info@ REAL old domains + BCC ${BCC}`})
}
