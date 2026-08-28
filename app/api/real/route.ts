import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

const BLACKLIST = ['reddit.com','yelp.com','thumbtack.com','angi.com','angieslist.com','homeadvisor.com','bbb.org','facebook.com','instagram.com','yellowpages.com','houzz.com','mapquest.com'];
function isBlacklisted(url:string){ return BLACKLIST.some(b=>url.toLowerCase().includes(b)); }

// KV FIX — correct format for Upstash REST
async function kvSet(url:string,token:string,key:string,val:any){
  try{
    await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(["SET",key,JSON.stringify(val)])});
    return true;
  }catch{return false;}
}
async function kvGet(url:string,token:string,key:string){
  try{
    const r=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(["GET",key])});
    const j=await r.json();
    if(j.result) return JSON.parse(j.result);
    return null;
  }catch{return null;}
}

async function sendBrevo(to:string, subject:string, html:string){
  const key=process.env.BREVO_API_KEY;
  if(!key) return {error:"BREVO_API_KEY missing"};
  const res=await fetch('https://api.brevo.com/v3/smtp/email',{
    method:'POST',
    headers:{'api-key':key,'Content-Type':'application/json'},
    body:JSON.stringify({
      sender:{name:'Venus HQ7',email:'ron@venushq7.com'},
      replyTo:{email:'hello@venushq7.com',name:'Venus HQ7'},
      to:[{email:to}],
      subject,
      htmlContent:html
    })
  });
  return await res.json();
}

function luxuryEmail(lead:any){
  const link=`https://ai-v8.vercel.app/p/${lead.cat}?b=${encodeURIComponent(lead.business)}&domain=${encodeURIComponent(lead.domain)}&city=${encodeURIComponent(lead.city)}`;
  const WHATSAPP="17865880578";
  return `<div style="background:#000;padding:20px;font-family:Arial;color:#fff">
  <div style="max-width:650px;margin:0 auto;border:2px solid #c5a059;border-radius:16px;overflow:hidden">
    <div style="background:#000;padding:18px;text-align:center;border-bottom:1px solid #222">
      <h1 style="color:#c5a059;letter-spacing:6px;margin:0">VENUS HQ7</h1>
      <p style="color:#666;font-size:10px;letter-spacing:2px">IT CORP INC • 2016 Blake St • +1 (786) 588-0578 • 24H OPEN • ron@venushq7.com</p>
    </div>
    <div style="padding:22px;background:#0a0a0a">
      <h2 style="color:#fff;margin:0">Hi ${lead.business} — Your AI Website For ${lead.domain} Ready</h2>
      <p style="color:#888;font-size:12px">Category: ${lead.cat.toUpperCase()} ${lead.city} • ${lead.domain}</p>

      <div style="border:1px solid #c5a059;border-radius:10px;padding:14px;margin:14px 0;background:#111">
        <b style="color:#c5a059;font-size:11px;letter-spacing:2px">WHO WE ARE</b>
        <p style="color:#fff;font-size:12px;line-height:18px;margin:6px 0 0">Venus HQ7 — Gen-Z luxury AI agency, IT Corp Inc, 2016 Blake Street, California. We build black/white/gold AI machines like Rolex/Tesla that answer in 2s and book jobs while you sleep. Not brochure sites.</p>
      </div>
      <div style="border:1px solid #333;border-radius:10px;padding:14px;margin:10px 0;background:#000">
        <b style="color:#fff;font-size:11px;letter-spacing:2px">WHAT WE DO</b>
        <p style="color:#aaa;font-size:12px;line-height:18px;margin:6px 0 0">Replace $3k receptionist with AI 24/7, $5k designer with calculator site 4x conversion, $2k ad guy with 7x follow-up, $500 reputation with Top 3 Google in 30 days. All luxury for ${lead.business}.</p>
      </div>
      <div style="border:1px solid #c5a059;border-radius:10px;padding:14px;margin:10px 0;background:#111">
        <b style="color:#c5a059;font-size:11px">HOW WE HELP ${lead.cat.toUpperCase()} IN ${lead.city.toUpperCase()} MAKE MORE PROFIT</b>
        <p style="color:#fff;font-size:12px;line-height:18px;margin:6px 0 0">Houston Elite Roofing 3→17 roofs/mo +$60k, Pro Plumbing +40% 2am calls +$28k, Arctic Air $12k→$39k/week. For ${lead.business}: save $10.5k/mo team + make $30k-$60k extra profit/mo by not losing after-hours.</p>
      </div>

      <h3 style="color:#c5a059;margin:18px 0 10px">5 AI TOOLS WE IMPLEMENT ON ${lead.domain} — HOW THEY WORK + PROFIT:</h3>
      <div style="background:#000;border-left:4px solid #c5a059;padding:12px;margin:8px 0;border-radius:6px"><b style="color:#c5a059">1. AI RECEPTIONIST 24/7 FOR ${lead.business}</b><br><span style="color:#fff;font-size:11px"><b>HOW:</b> Answers 2s, English/Spanish, qualifies, checks calendar, books ${lead.business}, SMS, 3x callback.</span><br><span style="color:#aaa;font-size:11px"><b>PROFIT:</b> Save $3k/mo + 12 more jobs = +$60k/mo profit for ${lead.business}.</span></div>
      <div style="background:#111;border-left:4px solid #fff;padding:12px;margin:8px 0;border-radius:6px"><b style="color:#fff">2. AI WEBSITE + CALCULATOR FOR ${lead.business}</b><br><span style="color:#fff;font-size:11px"><b>HOW:</b> Instant price from ${lead.business} past jobs, before/after, financing, 1-click book.</span><br><span style="color:#aaa;font-size:11px"><b>PROFIT:</b> 2%→12% conversion, 4x bookings for ${lead.business}.</span></div>
      <div style="background:#000;border-left:4px solid #c5a059;padding:12px;margin:8px 0;border-radius:6px"><b style="color:#c5a059">3. AI REVIEW TOP 3 FOR ${lead.business}</b><br><span style="color:#fff;font-size:11px"><b>HOW:</b> Texts your customer → 5-star posts to Google with photo, replies 5min.</span><br><span style="color:#aaa;font-size:11px"><b>PROFIT:</b> Top 3 Google = free $10k/mo calls, no ad spend for ${lead.business}.</span></div>
      <div style="background:#111;border-left:4px solid #fff;padding:12px;margin:8px 0;border-radius:6px"><b style="color:#fff">4. AI ADS + 7x FOLLOW-UP FOR ${lead.business}</b><br><span style="color:#fff;font-size:11px"><b>HOW:</b> Google Ads → luxury page → AI follows 7x SMS/email until booked.</span><br><span style="color:#aaa;font-size:11px"><b>PROFIT:</b> $500→$15k revenue for ${lead.business}, 20x ROI.</span></div>
      <div style="background:#000;border-left:4px solid #c5a059;padding:12px;margin:8px 0;border-radius:6px"><b style="color:#c5a059">5. VENUS OS DASHBOARD FOR ${lead.business}</b><br><span style="color:#fff;font-size:11px"><b>HOW:</b> Live calls, jobs, revenue, reviews, ad ROI for ${lead.business} on phone.</span><br><span style="color:#aaa;font-size:11px"><b>PROFIT:</b> See extra $12k/week made, scale what works.</span></div>

      <div style="text-align:center;margin:20px 0"><a href="${link}" style="background:#c5a059;color:#000;padding:14px 26px;text-decoration:none;font-weight:bold;border-radius:6px;display:inline-block">SEE YOUR AI WEBSITE FOR ${lead.business} →</a><p style="color:#555;font-size:10px;word-break:break-all">${link}</p></div>
      <div style="text-align:center;padding:14px;background:#000;border:2px solid #25D366;border-radius:10px">
        <a href="https://wa.me/${WHATSAPP}?text=I'm ${encodeURIComponent(lead.business)} upgrade ${encodeURIComponent(lead.domain)}" style="background:#25D366;color:#fff;padding:12px 24px;display:inline-flex;gap:8px;align-items:center;text-decoration:none;font-weight:bold;border-radius:6px">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M19.11 17.2c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.13.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.06-.11-.24-.16-.51-.3zM12.03 21.9a9.9 9.9 0 01-5.05-1.38l-.36-.22-3.74.98.99-3.65-.24-.38A9.85 9.85 0 012.1 12.03C2.1 6.56 6.56 2.1 12.03 2.1c2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 012.9 7.01c0 5.47-4.46 9.93-9.91 9.89z"/></svg>
          WHATSAPP ACTIVATE +1 (786) 588-0578
        </a><p style="color:#666;font-size:9px;margin-top:8px">$497 (was $1999) 48Hrs • 5 spots • ${lead.cat} ${lead.city}</p>
      </div>
    </div></div></div>`;
}

export async function GET(req: NextRequest){
  const action=req.nextUrl.searchParams.get('action')||'';
  const live=req.nextUrl.searchParams.get('live')||'0';
  const SERP_KEY=process.env.SERP_API_KEY;
  const KV_URL=process.env.KV_REST_API_URL;
  const KV_TOKEN=process.env.KV_REST_API_TOKEN;

  if(!action){
    return NextResponse.json({status:"VENUS_REAL_FULL_LUXURY",from:"ron@venushq7.com",replyTo:"hello@venushq7.com",whatsapp:"+1 (786) 588-0578",env:{serp:!!SERP_KEY,brevo:!!process.env.BREVO_API_KEY,kv:!!KV_URL},actions:["mine5","status","blast&live=0/1"]});
  }

  if(action==='mine5'){
    if(!SERP_KEY) return NextResponse.json({error:"SERP_API_KEY missing",autonomous:false},{status:500});
    const cats=[
      {cat:'roofers',q:'roofing company Houston TX official website -reddit -yelp -thumbtack'},
      {cat:'plumbers',q:'plumbing company Houston TX official website -reddit -yelp'},
      {cat:'hvac',q:'HVAC company Houston TX official website -reddit -yelp'},
      {cat:'dentists',q:'dentist office Houston TX official website -yelp -reddit'},
      {cat:'electricians',q:'electrician company Houston TX official website -reddit -yelp'}
    ];
    let leads:any[]=[];
    for(let c of cats){
      try{
        const r=await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(c.q)}&location=Houston,Texas&api_key=${SERP_KEY}&num=10`);
        const d=await r.json();
        let found=null;
        for(let o of (d.organic_results||[])){
          if(!isBlacklisted(o.link) && o.link.includes('.')){found=o;break;}
        }
        if(!found) continue;
        const domain=new URL(found.link).hostname.replace('www.','');
        leads.push({business:found.title?.split('-')[0]?.split('|')[0]?.trim()?.substring(0,40)||`${c.cat} Houston`,cat:c.cat,domain,city:'Houston',realEmail:`info@${domain}`,website:found.link,source:'SERP autonomous filtered'});
      }catch{}
    }
    if(KV_URL && KV_TOKEN && leads.length) await kvSet(KV_URL,KV_TOKEN,"venus_queue",leads);
    return NextResponse.json({autonomous:true,luxury:true,filtered:true,mined:leads.length,leads,whatsapp:"+1 (786) 588-0578"});
  }

  if(action==='status'){
    if(KV_URL && KV_TOKEN){
      const q=await kvGet(KV_URL,KV_TOKEN,"venus_queue");
      if(q) return NextResponse.json({from:"ron@venushq7.com",total:q.length,byCat:q.reduce((a:any,c:any)=>{a[c.cat]=(a[c.cat]||0)+1;return a},{}),queue:q,whatsapp:"+1 (786) 588-0578",luxury:true});
    }
    return NextResponse.json({from:"ron@venushq7.com",total:0,error:"Queue empty, run mine5 first",fix:"Hit /api/real?action=mine5 first"});
  }

  if(action==='blast'){
    let queue:any[]=[];
    if(KV_URL && KV_TOKEN) queue=await kvGet(KV_URL,KV_TOKEN,"venus_queue")||[];
    // AUTO-MINE IF EMPTY — fixes your screenshot error
    if(!queue.length){
      if(!SERP_KEY) return NextResponse.json({error:"Queue empty + SERP_API_KEY missing",total:0});
      let leads:any[]=[];
      const cats=[{cat:'roofers',q:'roofing company Houston TX site:.com'},{cat:'plumbers',q:'plumbing company Houston TX site:.com'},{cat:'hvac',q:'HVAC company Houston TX site:.com'},{cat:'dentists',q:'dentist Houston TX site:.com'},{cat:'electricians',q:'electrician Houston TX site:.com'}];
      for(let c of cats){
        try{
          const r=await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(c.q)}&api_key=${SERP_KEY}&num=5`);
          const d=await r.json();
          let f=d.organic_results?.find((o:any)=>!isBlacklisted(o.link));
          if(!f) continue;
          const domain=new URL(f.link).hostname.replace('www.','');
          leads.push({business:f.title?.split('-')[0]?.substring(0,35)||c.cat,cat:c.cat,domain,city:'Houston',realEmail:`info@${domain}`,website:f.link});
        }catch{}
      }
      queue=leads;
      if(KV_URL && KV_TOKEN && leads.length) await kvSet(KV_URL,KV_TOKEN,"venus_queue",leads);
    }
    if(!queue.length) return NextResponse.json({error:"SERP returned 0 — add credit or try later",total:0});
    const results:any[]=[];
    for(let lead of queue.slice(0,5)){
      const to=live==='1'?lead.realEmail:'ve9us1@gmail.com';
      const html=luxuryEmail(lead);
      const sent=await sendBrevo(to,`${lead.business} — Your ${lead.cat} AI Website That Increases Profit ${lead.city}`,html);
      results.push({to,business:lead.business,domain:lead.domain,sent:sent.messageId?'sent':sent});
    }
    return NextResponse.json({sent:true,luxury:true,live:live==='1'?'REAL customers':'TEST ve9us1@gmail.com',whatsapp:"+1 (786) 588-0578",results});
  }

  return NextResponse.json({error:"unknown action",actions:["mine5","status","blast"]});
}
