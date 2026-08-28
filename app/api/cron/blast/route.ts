export const dynamic = 'force-dynamic'
import { kv } from '@vercel/kv'

const NICHE_CONFIG:any = {
  roofing: { q:'houston roofing company old website', must:['roof'], color:'#000', tools:'01 AI Roof Quote<br>02 Leak Scanner<br>03 Missed-Call<br>04 Reviews<br>05 Venus OS', title:'Roofing' },
  plumber: { q:'houston plumber old website', must:['plumb'], color:'#0a2540', tools:'01 Plumbing Quote<br>02 Emergency Booking<br>03 Missed-Call<br>04 Reviews<br>05 Venus OS', title:'Plumbing' },
  hvac: { q:'houston hvac ac old website', must:['hvac','air','heat','cool'], color:'#1a4d2e', tools:'01 HVAC Quote<br>02 Tune-up Booking<br>03 Missed-Call<br>04 Reviews<br>05 Venus OS', title:'HVAC' },
  electrical: { q:'houston electrician electrical old website', must:['electric'], color:'#f59e0b', tools:'01 Electrical Quote<br>02 Panel Estimator<br>03 Missed-Call<br>04 Reviews<br>05 Venus OS', title:'Electrical' },
  dentist: { q:'houston dentist dental old website', must:['dental','dentist','smile'], color:'#581c87', tools:'01 Smile Booking<br>02 Insurance Check<br>03 Missed-Call<br>04 Reviews<br>05 Venus OS', title:'Dental' }
}

export async function GET(){
  const SERP_KEY = process.env.SERP_API_KEY
  const BREVO_KEY = process.env.BREVO_API_KEY
  const SENDER = 'ron@venushq7.com'
  const BCC = 'venusailux@gmail.com'

  let logs:any[] = []
  let mined:any[] = []

  // LOAD ALREADY SENT FROM KV
  let sentList:string[] = []
  try{ sentList = await kv.get('sent_emails') || [] }catch{ logs.push('KV not connected yet - will create now') }
  const sentSet = new Set(sentList)
  logs.push(`Already sent to ${sentSet.size} domains - will skip them`)

  const JUNK = ['yelp','facebook','instagram','yellowpages','angi','thumbtack','bbb.org','homeadvisor','houzz','bestpick','linkedin','wikipedia','amazon','youtube','google.com','serviceagent','decra.com','owenscorning','gaf.com','roofing.net']

  for(let nicheKey of Object.keys(NICHE_CONFIG)){
    const cfg = NICHE_CONFIG[nicheKey]
    try{
      const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(cfg.q)}&num=10&api_key=${SERP_KEY}`
      const r = await fetch(url, {signal: AbortSignal.timeout(12000)})
      const data:any = await r.json()
      for(let item of (data.organic_results||[])){
        let domain = ''
        try{ domain = new URL(item.link).hostname.replace('www.','') }catch{ continue }
        if(JUNK.some(x=>domain.includes(x))) continue
        if(domain.endsWith('.ai') || domain.endsWith('.io')) continue
        if(!cfg.must.some((m:string)=>domain.toLowerCase().includes(m))) continue
        // DEDUPLICATION - THIS FIXES YOUR COMPLAINT
        if(sentSet.has(domain)) { logs.push(`SKIP already sent: ${domain}`); continue }
        if(mined.some(m=>m.domain===domain)) continue

        const business = item.title.split(/[-|]/)[0].trim().slice(0,35) || domain.split('.')[0]
        mined.push({
          business, domain, niche:nicheKey, nicheTitle:cfg.title,
          email:`info@${domain}`, oldLink:item.link,
          link:`https://venus-ai-v8.vercel.app/o/${domain.replace(/\./g,'-')}-${Date.now().toString().slice(-4)}?niche=${nicheKey}`,
          id:`${nicheKey}-${domain}-${Date.now()}`, color:cfg.color, tools:cfg.tools
        })
        if(mined.length >= 20) break
      }
    }catch(e:any){ logs.push(`${nicheKey} FAIL: ${e.message}`) }
    if(mined.length >= 20) break
  }

  let totalSent = 0
  let newlySent:string[] = []
  for(let lead of mined.slice(0,5)){
    const wa = `https://wa.me/17865880578?text=${encodeURIComponent(`Hi ${lead.business}! ${lead.domain} rebuilt: ${lead.link} $497 24H`)}`
    const html = `<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:24px;border:1px solid #e5e5e5;overflow:hidden;font-family:Arial"><div style="background:${lead.color};padding:20px 32px;color:#fff;font-weight:900">VENUS HQ7 • ${lead.nicheTitle.toUpperCase()} • ${lead.domain}</div><div style="padding:24px 32px"><div style="background:#fef3c7;display:inline-block;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:700">${lead.nicheTitle} OLD SITE: ${lead.domain}</div><h1 style="font-size:24px;font-weight:900">We found ${lead.domain}<br>Rebuilt for ${lead.business}</h1><div style="display:flex;gap:10px;margin:12px 0"><div style="flex:1;background:#fafafa;border:1px solid #eee;border-radius:12px;padding:10px;font-size:11px">OLD: ${lead.oldLink}</div><div style="flex:1;background:#000;color:#fff;border-radius:12px;padding:10px;font-size:11px">NEW: ${lead.link}</div></div><div style="margin-top:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;font-size:13px">${lead.tools}</div><div style="margin-top:16px;border:2px dashed #D4AF37;border-radius:16px;padding:16px;text-align:center"><div style="font-size:28px;font-weight:900"><span style="text-decoration:line-through;color:#ccc;font-size:18px">$1997</span> $497</div><a href="${lead.link}" style="display:block;margin-top:12px;background:#000;color:#fff;padding:12px;border-radius:999px;font-weight:900;text-decoration:none">VIEW ${lead.nicheTitle} SITE →</a><a href="${wa}" style="display:block;margin-top:8px;background:#25D366;color:#000;padding:12px;border-radius:999px;font-weight:900;text-decoration:none">WHATSAPP $497</a></div></div><div style="background:#fafafa;padding:10px 32px;font-size:10px;color:#999">Reply STOP to opt-out. Venus HQ7 Denver - ron@venushq7.com</div></div></div>`

    const res = await fetch('https://api.brevo.com/v3/smtp/email',{
      method:'POST', headers:{'api-key': BREVO_KEY||'', 'Content-Type':'application/json'},
      body: JSON.stringify({sender:{name:`Ron - Venus ${lead.nicheTitle}`, email:SENDER}, to:[{email: lead.email}], bcc:[{email:BCC}], subject:`${lead.business} - ${lead.domain} ${lead.nicheTitle} rebuilt $497`, htmlContent: html, tags:[lead.niche]})
    })
    if(res.ok){
      totalSent++
      newlySent.push(lead.domain)
      logs.push(`SENT + SAVED to KV: ${lead.domain} (${lead.niche})`)
    } else {
      logs.push(`FAIL ${lead.domain}: ${res.status}`)
    }
  }

  // SAVE NEWLY SENT TO KV - NEVER SEND AGAIN
  if(newlySent.length > 0){
    try{
      const updated = [...sentList,...newlySent]
      await kv.set('sent_emails', updated)
      logs.push(`KV UPDATED: ${updated.length} total domains blacklisted from resend`)
    }catch(e:any){ logs.push(`KV SAVE FAIL: ${e.message} - Add KV database in Vercel Storage`) }
  }

  return Response.json({ok:true, totalSent, alreadySentCount: sentSet.size, newlySent, mined: mined.slice(0,5).map(m=>({domain:m.domain, niche:m.niche})), logs, msg:`Never sends twice - KV remembers ${sentSet.size + newlySent.length} domains. Next run will skip ${newlySent.join(', ')}`})
}
