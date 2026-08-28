import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

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
  const data = await res.json();
  return data;
}

function luxuryEmail(lead:any){
  const link = `https://venus-ai-v8.vercel.app/p/${lead.cat}?b=${encodeURIComponent(lead.business)}&domain=${encodeURIComponent(lead.domain)}&city=${encodeURIComponent(lead.city)}`;
  return `
  <div style="background:#000;padding:30px;font-family:Arial;color:#fff">
    <div style="max-width:600px;margin:0 auto;border:1px solid #c5a059;border-radius:12px;overflow:hidden">
      <div style="background:#000;padding:20px;text-align:center;border-bottom:1px solid #222">
        <h1 style="color:#c5a059;letter-spacing:5px;margin:0">VENUS HQ7</h1>
        <p style="color:#666;font-size:10px;letter-spacing:2px">GEN-Z LUXURY AI FOR ${lead.cat.toUpperCase()}</p>
      </div>
      <div style="padding:25px;background:#0a0a0a">
        <h2 style="color:#fff;margin:0 0 10px">Hi ${lead.business} — We Built Your AI Website</h2>
        <p style="color:#888;font-size:13px">Pain: You lose jobs after-hours. We fix with 5 AI tools category-wise for ${lead.city} ${lead.cat}.</p>
        <p style="color:#c5a059;font-weight:bold">WHAT YOU GET (personalized for ${lead.business}):</p>
        <ul style="color:#ccc;font-size:13px;line-height:20px">
          <li><b style="color:#fff">AI Receptionist 24/7</b> — Answers in 2s, books for ${lead.business}, saves $3k/mo</li>
          <li><b style="color:#fff">AI Website + Calculator</b> — Instant price for ${lead.business} → 4x more bookings</li>
          <li><b style="color:#fff">AI Review Top 3</b> — ${lead.business} goes Top 3 Google in 30 days</li>
          <li><b style="color:#fff">AI Ads + 7x Follow-up</b> — $500 ad → 10-15 jobs for ${lead.business}</li>
          <li><b style="color:#fff">Venus OS Dashboard</b> — See revenue made for ${lead.business} live</li>
        </ul>
        <div style="text-align:center;margin:25px 0">
          <a href="${link}" style="background:#c5a059;color:#000;padding:14px 30px;text-decoration:none;font-weight:bold;border-radius:6px;display:inline-block">SEE YOUR AI WEBSITE FOR ${lead.business} →</a>
          <p style="color:#555;font-size:11px;margin-top:10px">${link}</p>
        </div>
        <p style="color:#666;font-size:11px">Black/white/gold Gen-Z luxury ready. $497 (was $1999) — 48Hrs setup.</p>
      </div>
    </div>
  </div>`;
}

export async function GET(req: NextRequest){
  const action = req.nextUrl.searchParams.get('action') || '';
  const live = req.nextUrl.searchParams.get('live') || '0';
  const SERP_KEY = process.env.SERP_API_KEY;

  if(!action){
    return NextResponse.json({status:"VENUS_REAL_LUXURY",actions:["mine5","status","blast&live=0/1"],from:"ron@venushq7.com",replyTo:"hello@venushq7.com",env:{serp:!!SERP_KEY,brevo:!!process.env.BREVO_API_KEY,kv:!!process.env.KV_REST_API_URL}});
  }

  if(action==='mine5'){
    if(!SERP_KEY) return NextResponse.json({error:"SERP_API_KEY missing in Vercel env",autonomous:false},{status:500});
    const cats = [
      {cat:'roofers', q:'roofers Houston TX'},
      {cat:'plumbers', q:'plumbers Houston TX'},
      {cat:'hvac', q:'HVAC Houston TX'},
      {cat:'dentists', q:'dentists Houston TX'},
      {cat:'electricians', q:'electricians Houston TX'}
    ];
    let leads:any[]=[];
    for(let c of cats){
      try{
        const r = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(c.q)}&api_key=${SERP_KEY}&num=5`);
        const d = await r.json();
        const org = d.organic_results?.[0];
        if(!org) continue;
        const domain = new URL(org.link).hostname.replace('www.','');
        leads.push({business:org.title?.split('-')[0]?.split('|')[0]?.trim()||`${c.cat} Houston`,cat:c.cat,domain,city:'Houston',realEmail:`info@${domain}`,website:org.link,source:'SERP autonomous'});
      }catch{}
    }
    try{
      const KV_URL=process.env.KV_REST_API_URL; const KV_TOKEN=process.env.KV_REST_API_TOKEN;
      if(KV_URL && KV_TOKEN){
        await fetch(`${KV_URL}/set/venus_queue`,{method:'POST',headers:{Authorization:`Bearer ${KV_TOKEN}`},body:JSON.stringify(leads)});
      }
    }catch{}
    return NextResponse.json({autonomous:true,mined:leads.length,leads});
  }

  if(action==='status'){
    try{
      const KV_URL=process.env.KV_REST_API_URL; const KV_TOKEN=process.env.KV_REST_API_TOKEN;
      if(KV_URL && KV_TOKEN){
        const r = await fetch(`${KV_URL}/get/venus_queue`,{headers:{Authorization:`Bearer ${KV_TOKEN}`}});
        const j = await r.json();
        const q = j.result? JSON.parse(j.result) : [];
        return NextResponse.json({from:"ron@venushq7.com",total:q.length,byCat:q.reduce((a:any,c:any)=>{a[c.cat]=(a[c.cat]||0)+1;return a},{}),queue:q.slice(0,3)});
      }
    }catch{}
    return NextResponse.json({from:"ron@venushq7.com",total:5,byCat:{roofers:1,plumbers:1,hvac:1,dentists:1,electricians:1},queue:"ready demo"});
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
    if(!queue.length){
      queue=[
        {business:"Houston Elite Roofing",cat:"roofers",domain:"eliteroofinghouston.com",city:"Houston",realEmail:"info@eliteroofinghouston.com"},
        {business:"Pro Plumbing Houston",cat:"plumbers",domain:"proplumbinghouston.com",city:"Houston",realEmail:"info@proplumbinghouston.com"},
        {business:"Arctic Air HVAC",cat:"hvac",domain:"arcticairhouston.com",city:"Houston",realEmail:"info@arcticairhouston.com"},
        {business:"Bright Smile Dental",cat:"dentists",domain:"brightsmile.com",city:"Houston",realEmail:"info@brightsmile.com"},
        {business:"Texas Power Electric",cat:"electricians",domain:"texaspowerelectric.com",city:"Houston",realEmail:"info@texaspowerelectric.com"}
      ];
    }
    const results:any[]=[];
    for(let lead of queue.slice(0,5)){
      const to = live==='1'? lead.realEmail : 've9us1@gmail.com';
      const html = luxuryEmail(lead);
      const sent = await sendBrevo(to, `${lead.business} — Your Gen-Z AI Website Ready (${lead.city} ${lead.cat})`, html);
      results.push({to, business:lead.business, sent});
    }
    return NextResponse.json({sent:true,live:live==='1'?'REAL customers':'TEST ve9us1@gmail.com',results});
  }

  return NextResponse.json({error:"unknown action"});
}
