import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

const BLACKLIST = ['reddit.com','yelp.com','thumbtack.com','angieslist.com','angi.com','homeadvisor.com','bbb.org','facebook.com','instagram.com','yellowpages.com','mapquest.com',' Houzz.com'.toLowerCase()];

function isBlacklisted(url:string){
  return BLACKLIST.some(b=> url.toLowerCase().includes(b));
}

async function sendBrevo(to:string, subject:string, html:string){
  const key = process.env.BREVO_API_KEY;
  if(!key) return {error:"BREVO_API_KEY missing"};
  const res = await fetch('https://api.brevo.com/v3/smtp/email',{
    method:'POST',
    headers:{'api-key':key,'Content-Type':'application/json'},
    body:JSON.stringify({
      sender:{name:'Venus HQ7',email:'ron@venushq7.com'},
      replyTo:{email:'hello@venushq7.com',name:'Venus HQ7'},
      to:[{email:to}],
      subject,
      htmlContent: html
    })
  });
  return await res.json();
}

function luxuryEmail(lead:any){
  const link = `https://venus-ai-v8.vercel.app/p/${lead.cat}?b=${encodeURIComponent(lead.business)}&domain=${encodeURIComponent(lead.domain)}&city=${encodeURIComponent(lead.city)}`;
  return `<div style="background:#000;padding:30px;font-family:Arial;color:#fff">
  <div style="max-width:600px;margin:0 auto;border:1px solid #c5a059;border-radius:12px;overflow:hidden">
    <div style="background:#000;padding:20px;text-align:center;border-bottom:1px solid #222"><h1 style="color:#c5a059;letter-spacing:5px;margin:0">VENUS HQ7</h1><p style="color:#666;font-size:10px;letter-spacing:2px">GEN-Z LUXURY AI FOR ${lead.cat.toUpperCase()} • BLACK/WHITE/GOLD</p></div>
    <div style="padding:25px;background:#0a0a0a">
      <h2 style="color:#fff">Hi ${lead.business} — We Built Your AI Website Ready</h2>
      <p style="color:#888;font-size:13px">Who we are: Venus HQ7 builds Gen-Z luxury AI websites. What we do: 5 AI tools that save & grasp more business for ${lead.city} ${lead.cat}.</p>
      <div style="background:#111;border-left:3px solid #c5a059;padding:12px;margin:10px 0"><b style="color:#c5a059">1. AI Receptionist 24/7</b><br><span style="color:#ccc;font-size:12px">HOW: Answers in 2s for ${lead.business}, books calendar. HELP: Save $3k/mo, +30% after-hours jobs.</span></div>
      <div style="background:#111;border-left:3px solid #fff;padding:12px;margin:10px 0"><b style="color:#fff">2. AI Website + Calculator</b><br><span style="color:#ccc;font-size:12px">HOW: Instant price from ${lead.business} → Book. HELP: 4x more bookings.</span></div>
      <div style="background:#111;border-left:3px solid #c5a059;padding:12px;margin:10px 0"><b style="color:#c5a059">3. AI Review Top 3</b><br><span style="color:#ccc;font-size:12px">HOW: Gets 5-star for ${lead.business}. HELP: Top 3 Google "${lead.cat} ${lead.city}" in 30 days.</span></div>
      <div style="background:#111;border-left:3px solid #fff;padding:12px;margin:10px 0"><b style="color:#fff">4. AI Ads + 7x Follow-up</b><br><span style="color:#ccc;font-size:12px">HOW: Ads + 7x SMS until booked. HELP: $500 → $15k revenue for ${lead.business}.</span></div>
      <div style="background:#111;border-left:3px solid #c5a059;padding:12px;margin:10px 0"><b style="color:#c5a059">5. Venus OS Dashboard</b><br><span style="color:#ccc;font-size:12px">HOW: Live revenue for ${lead.business}. HELP: See extra $12k/week.</span></div>
      <div style="text-align:center;margin:25px 0"><a href="${link}" style="background:#c5a059;color:#000;padding:14px 30px;text-decoration:none;font-weight:bold;border-radius:6px">SEE YOUR AI WEBSITE FOR ${lead.business} →</a><p style="color:#555;font-size:10px;margin-top:10px">${link}</p></div>
      <p style="color:#666;font-size:11px">$497 Gen-Z black/white/gold ready in 48Hrs (was $1999). 5 spots for ${lead.cat} ${lead.city}.</p>
    </div></div></div>`;
}

export async function GET(req: NextRequest){
  const action = req.nextUrl.searchParams.get('action') || '';
  const live = req.nextUrl.searchParams.get('live') || '0';
  const SERP_KEY = process.env.SERP_API_KEY;

  if(!action){
    return NextResponse.json({status:"VENUS_REAL_LUXURY_FILTERED",actions:["mine5","status","blast&live=0/1"],from:"ron@venushq7.com",replyTo:"hello@venushq7.com",env:{serp:!!SERP_KEY,brevo:!!process.env.BREVO_API_KEY,kv:!!process.env.KV_REST_API_URL}});
  }

  if(action==='mine5'){
    if(!SERP_KEY) return NextResponse.json({error:"SERP_API_KEY missing",autonomous:false},{status:500});
    const cats = [
      {cat:'roofers', q:'roofers Houston TX company website -reddit -yelp -thumbtack'},
      {cat:'plumbers', q:'plumbers Houston TX company website -reddit -yelp -thumbtack'},
      {cat:'hvac', q:'HVAC company Houston TX website -reddit -yelp -thumbtack'},
      {cat:'dentists', q:'dentist Houston TX official website -yelp -reddit'},
      {cat:'electricians', q:'electrician company Houston TX website -reddit -yelp -thumbtack'}
    ];
    let leads:any[]=[];
    for(let c of cats){
      try{
        const r = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(c.q)}&location=Houston,Texas&api_key=${SERP_KEY}&num=10`);
        const d = await r.json();
        // Find first NOT blacklisted
        let found = null;
        for(let o of (d.organic_results||[])){
          if(!isBlacklisted(o.link) && o.link.includes('.com')){
            found = o; break;
          }
        }
        if(!found) continue;
        const domain = new URL(found.link).hostname.replace('www.','');
        leads.push({business:found.title?.split('-')[0]?.split('|')[0]?.trim()?.substring(0,40)||`${c.cat} Houston`,cat:c.cat,domain,city:'Houston',realEmail:`info@${domain}`,website:found.link,source:'SERP autonomous filtered'});
      }catch{}
    }
    try{
      const KV_URL=process.env.KV_REST_API_URL; const KV_TOKEN=process.env.KV_REST_API_TOKEN;
      if(KV_URL && KV_TOKEN){
        await fetch(`${KV_URL}/set/venus_queue`,{method:'POST',headers:{Authorization:`Bearer ${KV_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify(leads)});
      }
    }catch{}
    return NextResponse.json({autonomous:true, filtered:true, mined:leads.length, leads});
  }

  if(action==='status'){
    try{
      const KV_URL=process.env.KV_REST_API_URL; const KV_TOKEN=process.env.KV_REST_API_TOKEN;
      if(KV_URL && KV_TOKEN){
        const r = await fetch(`${KV_URL}/get/venus_queue`,{headers:{Authorization:`Bearer ${KV_TOKEN}`}});
        const j = await r.json();
        const q = j.result? JSON.parse(j.result) : [];
        return NextResponse.json({from:"ron@venushq7.com",total:q.length,leads:q,byCat:q.reduce((a:any,c:any)=>{a[c.cat]=(a[c.cat]||0)+1;return a},{}),filtered:true});
      }
    }catch{}
    return NextResponse.json({from:"ron@venushq7.com",total:0,note:"KV empty, run mine5 first"});
  }

  if(action==='blast'){
    let queue:any[]=[];
    try{
      const KV_URL=process.env.KV_REST_API_URL; const KV_TOKEN=process.env.KV_REST_API_TOKEN;
      if(KV_URL && KV_TOKEN){
        const r = await fetch(`${KV_URL}/get/venus_queue`,{headers:{Authorization:`Bearer ${KV_TOKEN}`}});
        const j = await r.json();
        queue = j.result? JSON.parse(j.result) : [];
      }
    }catch{}
    if(!queue.length) return NextResponse.json({error:"Queue empty, run mine5 first", total:0});
    const results:any[]=[];
    for(let lead of queue.slice(0,5)){
      const to = live==='1'? lead.realEmail : 've9us1@gmail.com';
      const html = luxuryEmail(lead);
      const sent = await sendBrevo(to, `${lead.business} — Your ${lead.cat} AI Website Ready (${lead.city})`, html);
      results.push({to, business:lead.business, domain:lead.domain, sent: sent.messageId? 'sent' : sent});
    }
    return NextResponse.json({sent:true,live:live==='1'?'REAL customers':'TEST ve9us1@gmail.com',results});
  }
  return NextResponse.json({error:"unknown action"});
}
