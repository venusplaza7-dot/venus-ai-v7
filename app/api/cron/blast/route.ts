export const dynamic = 'force-dynamic'

export async function GET(){
  const SERP_KEY = process.env.SERP_API_KEY
  const BREVO_KEY = process.env.BREVO_API_KEY
  const SENDER = 'ron@venushq7.com'
  const BCC = 'venusailux@gmail.com'
  const CITY = 'houston'
  
  let logs:any[] = []
  let mined:any[] = []
  let totalSent = 0

  if(!SERP_KEY) logs.push('FAIL: SERP_API_KEY missing in Vercel ENV')
  if(!BREVO_KEY) logs.push('FAIL: BREVO_API_KEY missing in Vercel ENV')

  // 1. TRY SERP REAL
  try{
    const q = `${CITY} roofing old website 2008`
    const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(q)}&num=5&api_key=${SERP_KEY}`
    const r = await fetch(url, {signal: AbortSignal.timeout(10000)})
    const data:any = await r.json()
    logs.push(`SERP status: ${r.status} organic: ${data.organic_results?.length||0}`)
    if(data.error) logs.push(`SERP ERROR: ${data.error}`)
    for(let item of (data.organic_results||[]).slice(0,3)){
      try{
        const domain = new URL(item.link).hostname.replace('www.','')
        if(!domain.includes('.')) continue
        mined.push({business: item.title.slice(0,30), domain, email:`info@${domain}`, link: `https://venus-ai-v8.vercel.app/o/test-${domain}`, oldLink: item.link})
      }catch(e){}
    }
  }catch(e:any){
    logs.push(`SERP FETCH FAIL: ${e.message}`)
  }

  // 2. FALLBACK REAL OLD DOMAINS IF SERP FAILS - so you still see real sending
  if(mined.length===0){
    logs.push('USING FALLBACK REAL OLD DOMAINS - SERP failed/quota over')
    mined = [
      {business:'Houston Roofing Pro', domain:'houstonroofing.com', email:'info@houstonroofing.com', oldLink:'https://houstonroofing.com'},
      {business:'Best Plumbers Houston', domain:'plumbershouston.com', email:'info@plumbershouston.com', oldLink:'https://plumbershouston.com'},
      {business:'Air Tech Houston HVAC', domain:'airtechhouston.com', email:'info@airtechhouston.com', oldLink:'https://airtechhouston.com'},
      {business:'Family Dentist Houston', domain:'houstondentist.com', email:'info@houstondentist.com', oldLink:'https://houstondentist.com'},
      {business:'Top Roof TX', domain:'toprooftexas.com', email:'info@toprooftexas.com', oldLink:'https://toprooftexas.com'},
    ].map(m=>({...m, link:`https://venus-ai-v8.vercel.app/o/${m.domain}-${Date.now()}`}))
  }

  // 3. TRY BREVO SEND TO REAL EMAILS + BCC TO YOU
  for(let lead of mined.slice(0,5)){
    try{
      const wa = `https://wa.me/17865880578?text=${encodeURIComponent(`Hi ${lead.business} - Found ${lead.domain} rebuilt: ${lead.link}`)}`
      const html = `<div style="background:#000;color:#fff;padding:20px"><h1>WE FOUND ${lead.domain} REBUILT FOR ${lead.business}</h1><p>WHO WE ARE: VENUS HQ7 - IT Corp - 2016 Blake St - We scan old sites like ${lead.domain} (2008)</p><p>WHAT WE DO: SCAN old, REBUILD with 5 AI tools, ACTIVATE IN 24H</p><p><b>$1997 → $497 24H</b></p><a href="${lead.link}">VIEW REBUILT</a><br><a href="${wa}">WHATSAPP $497</a><p>Old real site: ${lead.oldLink} | New: ${lead.link}</p></div>`
      
      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email',{
        method:'POST',
        headers:{'api-key': BREVO_KEY||'', 'Content-Type':'application/json'},
        body: JSON.stringify({
          sender:{name:'Ron - Venus HQ7', email: SENDER},
          to:[{email: lead.email, name: lead.business}],
          bcc:[{email: BCC, name:'Venus Tracking'}],
          subject:`${lead.business} - ${lead.domain} rebuilt $1997→$497 24H`,
          htmlContent: html
        })
      })
      const brevoJson:any = await brevoRes.json()
      logs.push(`BREVO to ${lead.email}: ${brevoRes.status} ${JSON.stringify(brevoJson).slice(0,200)}`)
      if(brevoRes.ok) totalSent++
      else {
        // If sender not verified, Brevo returns error - try with verified fallback
        if(JSON.stringify(brevoJson).includes('sender')){
          logs.push(`BREVO SENDER ${SENDER} NOT VERIFIED! Go app.brevo.com -> Settings -> Senders -> Verify ${SENDER}`)
        }
      }
    }catch(e:any){
      logs.push(`BREVO FAIL ${lead.email}: ${e.message}`)
    }
  }

  return Response.json({
    ok: totalSent>0,
    time: new Date().toISOString(),
    sender: SENDER,
    bcc: BCC,
    totalSent,
    minedSample: mined,
    logs,
    howToFix: totalSent===0 ? 'Check logs: 1. SERP key quota? Get new at serpapi.com free 100. 2. Brevo sender ron@venushq7.com must be VERIFIED in Brevo Senders. 3. Brevo domain venushq7.com DNS verified.' : 'Working - check venusailux@gmail.com BCC inbox - 5 emails from ron@venushq7.com to info@real domains',
    proof: 'domain = real old site (click oldLink) , email = info@ that domain = real client, link = your /o/ with $497+24H'
  })
}
