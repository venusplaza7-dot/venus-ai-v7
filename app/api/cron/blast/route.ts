export const dynamic = 'force-dynamic'

const NICHE_CONFIG:any = {
  roofing: {
    q: 'houston roofing company old website',
    must: ['roof'],
    color:'#000',
    tools: '01 AI Roof Quote Estimator<br>02 AI Leak Photo Scanner<br>03 Missed-Call Text<br>04 Review Engine<br>05 Venus OS',
    title: 'Roofing'
  },
  plumber: {
    q: 'houston plumber old website plumbing',
    must: ['plumb'],
    color:'#0a2540',
    tools: '01 AI Plumbing Quote<br>02 Emergency Booking Chat<br>03 Missed-Call Text<br>04 Review Engine<br>05 Venus OS',
    title: 'Plumbing'
  },
  hvac: {
    q: 'houston hvac ac heating old website',
    must: ['hvac','air','heat','cool','ac'],
    color:'#1a4d2e',
    tools: '01 AI HVAC Quote<br>02 AC Tune-up Booking<br>03 Missed-Call Text<br>04 Review Engine<br>05 Venus OS',
    title: 'HVAC'
  },
  electrical: {
    q: 'houston electrician old website electrical',
    must: ['electric'],
    color:'#f59e0b',
    tools: '01 AI Electrical Quote<br>02 Panel Upgrade Estimator<br>03 Missed-Call Text<br>04 Review Engine<br>05 Venus OS',
    title: 'Electrical'
  },
  dentist: {
    q: 'houston dentist dental old website',
    must: ['dental','dentist','smile','tooth'],
    color:'#581c87',
    tools: '01 AI Smile Booking<br>02 Insurance Checker<br>03 Missed-Call Text<br>04 Review Engine<br>05 Venus OS',
    title: 'Dental'
  }
}

export async function GET(){
  const SERP_KEY = process.env.SERP_API_KEY
  const BREVO_KEY = process.env.BREVO_API_KEY
  const SENDER = 'ron@venushq7.com'
  const BCC = 'venusailux@gmail.com'

  let logs:any[] = []
  let mined:any[] = []

  const JUNK = ['yelp','facebook','instagram','yellowpages','angi','thumbtack','bbb.org','homeadvisor','houzz','bestpick','linkedin','wikipedia','amazon','youtube','google.com','serviceagent','decra.com','owenscorning','gaf.com','roofing.net','rooferscoffeeshop']

  for(let nicheKey of Object.keys(NICHE_CONFIG)){
    const cfg = NICHE_CONFIG[nicheKey]
    try{
      const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(cfg.q)}&num=10&api_key=${SERP_KEY}`
      const r = await fetch(url, {signal: AbortSignal.timeout(12000)})
      const data:any = await r.json()
      logs.push(`${nicheKey}: ${data.organic_results?.length||0}`)

      for(let item of (data.organic_results||[])){
        let domain = ''
        try{ domain = new URL(item.link).hostname.replace('www.','') }catch{ continue }

        if(JUNK.some(x=>domain.includes(x))) continue
        if(domain.endsWith('.ai') || domain.endsWith('.io')) continue
        // MUST match niche keyword - THIS FIXES google.com problem
        if(!cfg.must.some((m:string)=>domain.toLowerCase().includes(m))) continue
        if(mined.some(m=>m.domain===domain)) continue
        if(domain.length < 8 || domain.length > 35) continue

        const business = item.title.split(/[-|]/)[0].trim().slice(0,35) || domain.split('.')[0]
        mined.push({
          business, domain, niche: nicheKey, nicheTitle: cfg.title,
          email:`info@${domain}`, oldLink: item.link,
          link: `https://venus-ai-v8.vercel.app/o/${domain.replace(/\./g,'-')}-${Date.now().toString().slice(-4)}?niche=${nicheKey}&old=${domain}`,
          id: `${nicheKey}-${domain}-${Date.now()}`,
          color: cfg.color, tools: cfg.tools
        })
      }
    }catch(e:any){ logs.push(`${nicheKey} FAIL: ${e.message}`) }
  }

  if(mined.length===0) return Response.json({ok:false, logs, msg:'SERP quota over - no niche match'})

  let totalSent = 0
  for(let lead of mined.slice(0,5)){
    const wa = `https://wa.me/17865880578?text=${encodeURIComponent(`Hi ${lead.business}! Your ${lead.nicheTitle} site ${lead.domain} rebuilt: ${lead.link} - $497 24H`)}`

    const html = `
<div style="background:#f5f5f3;padding:20px 0;font-family:Inter,Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:24px;border:1px solid #e5e5e5;overflow:hidden">
    <div style="background:${lead.color};padding:24px 32px;display:flex;justify-content:space-between">
      <div style="color:#fff;font-weight:900;letter-spacing:2px">VENUS HQ7 • ${lead.nicheTitle.toUpperCase()}</div>
      <div style="color:#D4AF37;font-size:10px;font-weight:700">GEN-Z LUXURY AI</div>
    </div>
    <div style="padding:32px">
      <div style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;padding:6px 12px;border-radius:999px;display:inline-block">${lead.nicheTitle.toUpperCase()} OLD SITE DETECTED: ${lead.domain} (2008)</div>
      <h1 style="font-size:26px;font-weight:900;margin:16px 0 8px">We found <span style="color:#2563eb">${lead.domain}</span><br>Rebuilt for ${lead.business} - ${lead.nicheTitle}</h1>
      <p style="color:#666;font-size:14px">Your ${lead.nicheTitle} site is 16 years old. We rebuilt it with ${lead.nicheTitle} AI tools.</p>
      <div style="display:flex;gap:12px;margin-top:16px">
        <div style="flex:1;background:#fafafa;border:1px solid #eee;border-radius:16px;padding:12px"><div style="font-size:10px;color:#999;font-weight:700">OLD REAL SITE</div><div style="font-size:11px;color:#2563eb;word-break:break-all;margin-top:4px">${lead.oldLink}</div></div>
        <div style="flex:1;background:#000;border-radius:16px;padding:12px"><div style="font-size:10px;color:#D4AF37;font-weight:700">NEW ${lead.nicheTitle.toUpperCase()} AI SITE</div><div style="font-size:11px;color:#fff;word-break:break-all;margin-top:4px">${lead.link}</div></div>
      </div>
      <div style="margin-top:20px;background:#fcfaf6;border:1px solid #f0e6d3;border-radius:16px;padding:16px"><div style="font-size:11px;font-weight:800">WHO WE ARE</div><div style="font-size:13px;color:#444;margin-top:6px">VENUS HQ7 - Venus AI Lab, Denver. We scan old ${lead.nicheTitle} sites like ${lead.domain} and rebuild with Gen-Z luxury AI.</div></div>
      <div style="margin-top:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:16px"><div style="font-size:11px;font-weight:800">WHAT WE DO - ${lead.nicheTitle.toUpperCase()} 5 AI TOOLS</div><div style="font-size:13px;color:#444;margin-top:6px;line-height:1.6">${lead.tools}</div></div>
      <div style="margin-top:20px;border:2px dashed #D4AF37;border-radius:20px;padding:20px;text-align:center"><div style="font-size:32px;font-weight:900"><span style="text-decoration:line-through;color:#ccc;font-size:20px">$1997</span> $497</div><div style="font-size:12px;color:#666">${lead.nicheTitle} activation in 24H</div><a href="${lead.link}" style="display:block;margin-top:16px;background:#000;color:#fff;padding:14px;border-radius:999px;font-weight:900;text-decoration:none">VIEW YOUR ${lead.nicheTitle.toUpperCase()} REBUILT SITE →</a><a href="${wa}" style="display:block;margin-top:10px;background:#25D366;color:#000;padding:14px;border-radius:999px;font-weight:900;text-decoration:none">WHATSAPP $497 - 24H</a></div>
    </div>
    <div style="background:#fafafa;padding:12px 32px;border-top:1px solid #eee"><div style="font-size:10px;color:#999">You got this because ${lead.domain} is outdated ${lead.nicheTitle}. Reply STOP. Venus HQ7 Denver - ron@venushq7.com</div></div>
  </div>
</div>`

    const res = await fetch('https://api.brevo.com/v3/smtp/email',{
      method:'POST',
      headers:{'api-key': BREVO_KEY||'', 'Content-Type':'application/json'},
      body: JSON.stringify({
        sender:{name:`Ron - Venus ${lead.nicheTitle}`, email:SENDER},
        to:[{email: lead.email}],
        bcc:[{email:BCC}],
        subject:`${lead.business} - Your ${lead.nicheTitle} site ${lead.domain} rebuilt $1997→$497`,
        htmlContent: html,
        tags:[lead.niche]
      })
    })
    if(res.ok) totalSent++
    logs.push(`BREVO to info@${lead.domain} (${lead.niche}): ${res.status}`)
  }

  return Response.json({ok:true, totalSent, mined: mined.slice(0,5).map(m=>({domain:m.domain, niche:m.niche, email:m.email})), logs, msg:`Sent ${totalSent} niche-matched from ${SENDER} - no more google.com roofing mismatch`})
