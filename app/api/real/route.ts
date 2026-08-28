import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

const BLACKLIST = ['reddit.com','yelp.com','thumbtack.com','angi.com','homeadvisor.com','bbb.org','facebook.com','yellowpages.com','houzz.com'];
function isBlacklisted(url:string){ return BLACKLIST.some(b=>url.toLowerCase().includes(b)); }

async function kvSet(url:string,token:string,key:string,val:any){
  try{
    await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(["SET",key,JSON.stringify(val)])});
    return true;
  }catch{ return false; }
}
async function kvGet(url:string,token:string,key:string){
  try{
    const r = await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(["GET",key])});
    const j = await r.json();
    if(j.result) return JSON.parse(j.result);
    return null;
  }catch{ return null; }
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
  const link = `https://ai-v8.vercel.app/p/${lead.cat}?b=${encodeURIComponent(lead.business)}&domain=${encodeURIComponent(lead.domain)}&city=${encodeURIComponent(lead.city)}`;
  const WHATSAPP="17865880578"; // +1 (786) 588-0578
  return `
  <div style="background:#000;padding:20px;font-family:Arial,sans-serif;color:#fff">
    <div style="max-width:650px;margin:0 auto;border:2px solid #c5a059;border-radius:16px;overflow:hidden">
      <div style="background:#000;padding:20px;text-align:center;border-bottom:1px solid #222">
        <h1 style="color:#c5a059;letter-spacing:6px;margin:0;font-size:26px">VENUS HQ7</h1>
        <p style="color:#666;font-size:10px;letter-spacing:3px;margin:5px 0 0">GEN-Z LUXURY BLACK WHITE GOLD • IT CORP INC • +1 (786) 588-0578 • 24H OPEN</p>
        <p style="color:#444;font-size:9px">2016 Blake Street, California • IT Corp Inc • Other Business</p>
      </div>
      <div style="padding:24px;background:#0a0a0a">

        <h2 style="color:#fff;margin:0;font-size:20px">Hi ${lead.business} — We Built Your AI Website For ${lead.domain}</h2>
        <p style="color:#c5a059;font-size:12px;margin:6px 0 0">Personalized for ${lead.business} • ${lead.city} ${lead.cat.toUpperCase()} • Preview: ${link}</p>

        <!-- INTRO LUXURY — WHO WE ARE -->
        <div style="margin:18px 0;padding:16px;background:#111;border:1px solid #c5a059;border-radius:10px">
          <b style="color:#c5a059;letter-spacing:2px;font-size:11px">WHO WE ARE</b>
          <p style="color:#fff;font-size:12px;line-height:18px;margin:8px 0 0">We are <b>Venus HQ7</b> — Gen-Z luxury AI agency, IT Corp Inc, 2016 Blake Street, California, USA Ron. Open 24 hours. We don't build brochure websites that lose money. We build black/white/gold AI machines like Rolex, Tesla, iPhone that answer in 2 seconds, calculate price, book jobs, get 5-star reviews, and print money while you sleep. Your current ${lead.domain} is losing $30k-$60k/mo after-hours — we fix.</p>
        </div>

        <div style="margin:12px 0;padding:16px;background:#000;border:1px solid #333;border-radius:10px">
          <b style="color:#fff;letter-spacing:2px;font-size:11px">WHAT WE DO</b>
          <p style="color:#aaa;font-size:12px;line-height:18px;margin:8px 0 0">We replace your $3k/mo receptionist with AI 24/7 that never misses, your $5k designer with calculator website that converts 4x better (2%→8-12%), your $2k ad guy with AI that follows up 7 times until booked, your $500 reputation guy with AI that gets you Top 3 Google "${lead.cat} ${lead.city}" in 30 days. All luxury black/white/gold for ${lead.business}.</p>
        </div>

        <div style="margin:12px 0;padding:16px;background:#111;border:1px solid #c5a059;border-radius:10px">
          <b style="color:#c5a059;letter-spacing:2px;font-size:11px">HOW WE HELP ${lead.cat.toUpperCase()} IN ${lead.city.toUpperCase()} MAKE MORE PROFIT — LIKE ${lead.business}</b>
          <p style="color:#fff;font-size:12px;line-height:18px;margin:8px 0 0">
            Same category as ${lead.business}, we helped:<br>
            • Houston Elite Roofing: 3 → 17 roofs/mo in 22 days = +$60k profit<br>
            • Pro Plumbing Houston: 40% more 2am emergencies booked auto = +$28k/mo<br>
            • Arctic Air HVAC: $12k → $39k/week summer with 7x AI follow-up<br>
            • Bright Smile Dental: 12 → 48 new patients/mo with insurance checker<br><br>
            <b style="color:#c5a059">For ${lead.business}:</b> You lose after-hours jobs (pain: customer calls at 10pm, you on roof). Our AI books them. You save $10.5k/mo team cost + make $30k-$60k extra profit/mo. That's how we help ${lead.business} profit more.
          </p>
        </div>

        <h3 style="color:#c5a059;margin:22px 0 12px;font-size:14px;letter-spacing:1px">5 AI TOOLS WE WILL IMPLEMENT ON ${lead.domain} FOR ${lead.business} — HOW THEY WORK + HOW THEY INCREASE PROFIT:</h3>

        <div style="background:#000;border-left:4px solid #c5a059;padding:14px;margin:10px 0;border-radius:8px">
          <b style="color:#c5a059;font-size:13px">1. AI RECEPTIONIST 24/7 FOR ${lead.business}</b><br>
          <span style="color:#fff;font-size:11px;line-height:16px;display:block;margin-top:6px"><b>HOW IT WORKS:</b> AI picks every call for ${lead.business} in 2 seconds, speaks English/Spanish, asks 3 qualifying (issue, address, urgency), checks your Google Calendar live, books job for ${lead.business}, sends SMS confirmation, calls back 3x if missed. Records call.</span><br>
          <span style="color:#aaa;font-size:11px;line-height:16px;display:block"><b>HOW IT INCREASES PROFIT:</b> Save $3k/mo receptionist cost. Grasp 30% more ${lead.city} after-hours jobs you currently lose. Example: ${lead.business} gets 40 extra calls/mo → 12 booked → avg $800/job = +$9,600/mo profit, +$60k/mo for roofers. Profit up.</span>
        </div>

        <div style="background:#111;border-left:4px solid #fff;padding:14px;margin:10px 0;border-radius:8px">
          <b style="color:#fff;font-size:13px">2. AI WEBSITE + CALCULATOR FOR ${lead.business}</b><br>
          <span style="color:#fff;font-size:11px;line-height:16px;display:block;margin-top:6px"><b>HOW IT WORKS:</b> Not brochure like current ${lead.domain}. Customer enters roof size / leak type / AC model → AI calculates instant price using ${lead.business} past 200 jobs + material + ${lead.city} rate → Shows your before/after photos → Offers Affirm financing → 1-click "Book ${lead.business} Now". Black/white/gold luxury.</span><br>
          <span style="color:#aaa;font-size:11px;line-height:16px;display:block"><b>HOW IT INCREASES PROFIT:</b> Save $5k designer. Old ${lead.domain} 2% converts (no price, customer leaves). Ours 8-12% because instant price = trust. 100 visitors: Old 2 leads, New 10 leads = 4x more booked estimates for ${lead.business} = 4x profit. That's how you make more profit.</span>
        </div>

        <div style="background:#000;border-left:4px solid #c5a059;padding:14px;margin:10px 0;border-radius:8px">
          <b style="color:#c5a059;font-size:13px">3. AI REVIEW & GOOGLE TOP 3 FOR ${lead.business}</b><br>
          <span style="color:#fff;font-size:11px;line-height:16px;display:block;margin-top:6px"><b>HOW IT WORKS:</b> After job, AI texts YOUR customer from ${lead.business}: "Happy with ${lead.business}? Tap 5-star". If 5-star → auto posts to Google with job photo + replies in 5 min human tone. If 1-4 star → alerts you privately, not public. Gets 20+ reviews/mo for ${lead.business}.</span><br>
          <span style="color:#aaa;font-size:11px;line-height:16px;display:block"><b>HOW IT INCREASES PROFIT:</b> Save $500/mo reputation. ${lead.business} goes Top 3 Google "${lead.cat} ${lead.city}" in 30 days. Top 3 = free organic calls worth $5k-$10k/mo ad spend. More 5-star = more trust = higher close rate = more profit. Profit up free.</span>
        </div>

        <div style="background:#111;border-left:4px solid #fff;padding:14px;margin:10px 0;border-radius:8px">
          <b style="color:#fff;font-size:13px">4. AI ADS + 7x FOLLOW-UP UNTIL BOOKED FOR ${lead.business}</b><br>
          <span style="color:#fff;font-size:11px;line-height:16px;display:block;margin-top:6px"><b>HOW IT WORKS:</b> We run Google Ads "Best ${lead.cat} ${lead.city}" + "${lead.business} near me" → Click → This luxury page with calculator for ${lead.business} → Lead enters phone → AI follows up 7 times via SMS/email/voicemail over 7 days until booked or STOP. Tracks which ad made $$$ for ${lead.business}.</span><br>
          <span style="color:#aaa;font-size:11px;line-height:16px;display:block"><b>HOW IT INCREASES PROFIT:</b> Save $2k ad agency. You pay $500 ads → 50 clicks. Old way you call once → 2 bookings. With 7x AI follow-up → 10-15 bookings for ${lead.business}. $500 ad spend → $15k revenue → $10k profit. 20x ROI. That's profit increase.</span>
        </div>

        <div style="background:#000;border-left:4px solid #c5a059;padding:14px;margin:10px 0;border-radius:8px">
          <b style="color:#c5a059;font-size:13px">5. VENUS OS — LUXURY BLACK DASHBOARD FOR ${lead.business}</b><br>
          <span style="color:#fff;font-size:11px;line-height:16px;display:block;margin-top:6px"><b>HOW IT WORKS:</b> One black dashboard for ${lead.business}: Live calls answered by AI, jobs booked today, revenue this week, new 5-star reviews today, ad spend vs return, missed calls saved, customer recordings. On your phone. Real time.</span><br>
          <span style="color:#aaa;font-size:11px;line-height:16px;display:block"><b>HOW IT INCREASES PROFIT:</b> Save guessing. See "AI made ${lead.business} $12,450 extra this week, saved 17 missed calls, got 9 reviews, $500 ad made $14k". You know what works, scale it. Save 10hrs/week, make data decisions = more profit. Know your profit live.</span>
        </div>

        <div style="text-align:center;margin:24px 0;padding:18px;background:#111;border:1px solid #c5a059;border-radius:10px">
          <p style="color:#fff;margin:0;font-size:14px">Your Personalized AI Website For ${lead.business} Is Ready — Click To See</p>
          <a href="${link}" style="background:#c5a059;color:#000;padding:14px 28px;display:inline-block;text-decoration:none;font-weight:bold;border-radius:8px;margin:12px 0">SEE ${lead.business.toUpperCase()} AI WEBSITE → ${lead.domain}</a>
          <p style="color:#555;font-size:10px;word-break:break-all">${link}</p>
        </div>

        <div style="text-align:center;padding:16px;background:#000;border:2px solid #25D366;border-radius:12px">
          <p style="color:#fff;margin:0 0 10px;font-size:13px">Upgrade ${lead.domain} Now — $497 (was $1999) — 48Hrs Live — 5 spots for ${lead.cat} ${lead.city}</p>
          <a href="https://wa.me/${WHATSAPP}?text=Hi%20Ron%2C%20I'm%20${encodeURIComponent(lead.business)}%20-%20${lead.city}%20${lead.cat}%20-%20I%20want%20to%20upgrade%20${encodeURIComponent(lead.domain)}%20to%20AI%20-%20profit%20machine"
             style="background:#25D366;color:#fff;padding:14px 28px;display:inline-flex;align-items:center;gap:10px;text-decoration:none;font-weight:bold;border-radius:8px">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19.11 17.2c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.13.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.06-.11-.24-.16-.51-.3zM12.03 21.9a9.9 9.9 0 01-5.05-1.38l-.36-.22-3.74.98.99-3.65-.24-.38A9.85 9.85 0 012.1 12.03C2.1 6.56 6.56 2.1 12.03 2.1c2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 012.9 7.01c0 5.47-4.46 9.93-9.91 9.89z"/></svg>
            WHATSAPP ACTIVATE — +1 (786) 588-0578
          </a>
          <p style="color:#666;font-size:9px;margin-top:10px">IT Corp Inc • 2016 Blake Street • Open 24H • WhatsApp icon included • Save & make more profit for ${lead.business}</p>
        </div>

      </div>
    </div>
  </div>`;
}

export async function GET(req: NextRequest){
  const action = req.nextUrl.searchParams.get('action')||'';
  const live = req.nextUrl.searchParams.get('live')||'0';
  const SERP_KEY = process.env.SERP_API_KEY;
  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if(!action){
    return NextResponse.json({status:"VENUS_REAL_LUXURY_FULL",from:"ron@venushq7.com",replyTo:"hello@venushq7.com",whatsapp:"+1 (786) 588-0578",env:{serp:!!SERP_KEY,brevo:!!process.env.BREVO_API_KEY,kv:!!KV_URL}});
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
        const r = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(c.q)}&location=Houston,Texas&api_key=${SERP_KEY}&num=10`);
        const d = await r.json();
        let found=null;
        for(let o of (d.organic_results||[])){
          if(!isBlacklisted(o.link) && o.link.includes('.')){
            found=o;break;
          }
        }
        if(!found) continue;
        const domain = new URL(found.link).hostname.replace('www.','');
        leads.push({business:found.title?.split('-')[0]?.split('|')[0]?.trim()?.substring(0,40)||`${c.cat} Houston`,cat:c.cat,domain,city:'Houston',realEmail:`info@${domain}`,website:found.link,source:'SERP luxury filtered'});
      }catch{}
    }
    if(KV_URL && KV_TOKEN && leads.length) await kvSet(KV_URL,KV_TOKEN,"venus_queue",leads);
    return NextResponse.json({autonomous:true,luxury:true,filtered:true,mined:leads.length,leads,whatsapp:"+1 (786) 588-0578"});
  }

  if(action==='status'){
    if(KV_URL && KV_TOKEN){
      const q = await kvGet(KV_URL,KV_TOKEN,"venus_queue");
      if(q) return NextResponse.json({from:"ron@venushq7.com",total:q.length,byCat:q.reduce((a:any,c:any)=>{a[c.cat]=(a[c.cat]||0)+1;return a},{}),queue:q,whatsapp:"+1 (786) 588-0578"});
    }
    return NextResponse.json({from:"ron@venushq7.com",total:0,error:"Queue empty, run mine5 first",total_info:"Run /api/real?action=mine5"});
  }

  if(action==='blast'){
    let queue:any[]=[];
    if(KV_URL && KV_TOKEN) queue = await kvGet(KV_URL,KV_TOKEN,"venus_queue")||[];
    if(!queue.length) return NextResponse.json({error:"Queue empty, run mine5 first",total:0,fix:"Hit /api/real?action=mine5 first"});
    const results:any[]=[];
    for(let lead of queue.slice(0,5)){
      const to = live==='1'? lead.realEmail : 've9us1@gmail.com';
      const html = luxuryEmail(lead);
      const sent = await sendBrevo(to, `${lead.business} — Your ${lead.cat} AI Website That Increases Profit ${lead.city}`, html);
      results.push({to,business:lead.business,domain:lead.domain,sent: sent.messageId?'sent':sent});
    }
    return NextResponse.json({sent:true,luxury:true,live:live==='1'?'REAL':'TEST ve9us1@gmail.com',whatsapp:"+1 (786) 588-0578",results});
  }

  return NextResponse.json({error:"unknown action"});
}
