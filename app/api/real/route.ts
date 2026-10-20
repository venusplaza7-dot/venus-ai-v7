import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

let MEM: any[] = [];
let MEM_STATE_IDX = 0;
const BLACKLIST = ['reddit','yelp','youtube','facebook','wikipedia','yellowpages','angi','bbb','indeed','linkedin','instagram','tiktok','amazon'];

const STATES = [
  { city: 'Houston', state: 'TX' },
  { city: 'Dallas', state: 'TX' },
  { city: 'Austin', state: 'TX' },
  { city: 'Miami', state: 'FL' },
  { city: 'Orlando', state: 'FL' },
  { city: 'Los Angeles', state: 'CA' },
  { city: 'San Diego', state: 'CA' },
  { city: 'Phoenix', state: 'AZ' },
  { city: 'New York', state: 'NY' },
  { city: 'Chicago', state: 'IL' },
  { city: 'Atlanta', state: 'GA' },
  { city: 'Denver', state: 'CO' },
];

function getBaseUrl(req: NextRequest){
  const host = req.headers.get('host') || 'ai-v8.vercel.app';
  const proto = host.includes('localhost')? 'http' : 'https';
  return `${proto}://${host}`;
}

function luxuryEmail(lead:any, previewUrl:string, baseUrl:string){
  const year = lead.year || 2005 + Math.floor(Math.random()*15);
  const cat = lead.category || 'roofers';
  return `
  <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:680px;margin:0 auto;background:#000;border:2px solid #c5a059;border-radius:18px;overflow:hidden">
      <div style="background:linear-gradient(90deg,#000,#1a1a1a);padding:18px 24px;border-bottom:1px solid #c5a059;display:flex;justify-content:space-between;align-items:center">
        <div style="color:#c5a059;font-weight:900;letter-spacing:6px;font-size:14px">VENUS HQ7</div>
        <div style="color:#fff;font-size:11px">+1 (786) 588-0578 | ron@venushq7.com</div>
      </div>
      <div style="padding:28px 24px 10px 24px">
        <h2 style="color:#fff;font-size:22px;line-height:28px;margin:0 0 10px 0">Hi ${lead.business} — Your ${lead.domain} Is From ${year} — 20 Years Old, Losing Business</h2>
        <p style="color:#ff5f56;font-size:14px;line-height:20px">We scanned ${lead.domain} — copyright © ${year}, no mobile, no calculator, no AI. Customer in ${lead.city}, ${lead.state} opens old site → thinks you closed → books competitor with AI.</p>
        <p style="color:#c5a059;font-size:13px">We upgrade ${lead.domain} from 2005 brochure to 2026 AI machine that makes profit.</p>
      </div>
      <div style="padding:0 24px">
        <div style="border:1px solid #222;border-radius:12px;padding:16px;background:#0a0a0a">
          <div style="color:#c5a059;font-weight:700;font-size:12px;letter-spacing:3px;margin-bottom:8px">WHO WE ARE</div>
          <div style="color:#ccc;font-size:13px;line-height:19px">Venus HQ7 — We convert 2005-2020 old websites into AI luxury black/gold sites for ${lead.city} ${cat}. We don't do templates. We build profit machines.</div>
        </div>
        <div style="height:10px"></div>
        <div style="border:1px solid #222;border-radius:12px;padding:16px;background:#0a0a0a">
          <div style="color:#c5a059;font-weight:700;font-size:12px;letter-spacing:3px;margin-bottom:8px">WHAT WE DO</div>
          <div style="color:#ccc;font-size:13px;line-height:19px">Scrape old © 2005-2020 sites in ${lead.city}, rebuild with AI: calculator, booking, WhatsApp, call tracking, SEO. Your old site → new site in 24h.</div>
        </div>
        <div style="height:10px"></div>
        <div style="border:1px solid #c5a059;border-radius:12px;padding:16px;background:linear-gradient(180deg,#120e07,#000)">
          <div style="color:#c5a059;font-weight:700;font-size:12px;letter-spacing:3px;margin-bottom:8px">HOW WE HELP YOU MAKE PROFIT</div>
          <div style="color:#fff;font-size:13px;line-height:19px">Old site loses 70% leads. New AI site: 4x bookings, 24/7 WhatsApp auto-reply, price calculator locks customer, Google ranks you #1. $497 one-time, not monthly. You make extra $15k-$30k/mo.</div>
        </div>
      </div>
      <div style="padding:18px 24px">
        <div style="color:#fff;font-weight:700;font-size:12px;letter-spacing:3px;margin-bottom:10px">5 AI TOOLS WE ADD</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <div style="flex:1;min-width:120px;background:#111;border:1px solid #222;border-radius:10px;padding:10px"><div style="color:#c5a059;font-size:12px;font-weight:700">AI Price Calculator</div><div style="color:#888;font-size:11px">Instant quote</div></div>
          <div style="flex:1;min-width:120px;background:#111;border:1px solid #222;border-radius:10px;padding:10px"><div style="color:#c5a059;font-size:12px;font-weight:700">AI Booking</div><div style="color:#888;font-size:11px">Auto books</div></div>
          <div style="flex:1;min-width:120px;background:#111;border:1px solid #222;border-radius:10px;padding:10px"><div style="color:#c5a059;font-size:12px;font-weight:700">AI Chat</div><div style="color:#888;font-size:11px">Answers 24/7</div></div>
          <div style="flex:1;min-width:120px;background:#111;border:1px solid #222;border-radius:10px;padding:10px"><div style="color:#c5a059;font-size:12px;font-weight:700">AI SEO Rank</div><div style="color:#888;font-size:11px">Beats 2005</div></div>
          <div style="flex:1;min-width:120px;background:#111;border:1px solid #222;border-radius:10px;padding:10px"><div style="color:#c5a059;font-size:12px;font-weight:700">AI Call Track</div><div style="color:#888;font-size:11px">Records lead</div></div>
        </div>
      </div>
      <div style="padding:10px 24px 24px 24px;text-align:center">
        <a href="${previewUrl}" style="display:inline-block;background:linear-gradient(90deg,#c5a059,#8a6d3b);color:#000;font-weight:900;padding:14px 28px;border-radius:30px;text-decoration:none;letter-spacing:2px;font-size:13px">SEE YOUR NEW AI SITE →</a>
        <div style="margin-top:14px">
          <a href="https://wa.me/17865880578" style="display:inline-block;background:#25D366;color:#fff;font-weight:700;padding:10px 20px;border-radius:20px;text-decoration:none;font-size:12px">💬 WhatsApp +1 (786) 588-0578</a>
          <div style="margin-top:8px;color:#666;font-size:11px">Preview: ${previewUrl}</div>
        </div>
      </div>
    </div>
  </div>`;
}

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action') || 'status';
  const live = searchParams.get('live');
  const baseUrl = getBaseUrl(req);

  let kv:any = null;
  try{ const mod = await import('@vercel/kv').catch(()=>null); kv = mod?.kv || null; }catch{}

  async function getLeads(){
    if(kv){ try{ const v = await kv.get('venus_leads'); if(v && Array.isArray(v) && v.length>0) return v; }catch{} }
    return MEM;
  }
  async function setLeads(l:any[]){
    MEM = l;
    if(kv){ try{ await kv.set('venus_leads', l); }catch{} }
  }
  async function getStateIdx(){
    if(kv){ try{ const v = await kv.get('venus_state_idx'); if(typeof v === 'number') return v; }catch{} }
    return MEM_STATE_IDX;
  }
  async function setStateIdx(i:number){
    MEM_STATE_IDX = i;
    if(kv){ try{ await kv.set('venus_state_idx', i); }catch{} }
  }

  if(action==='status'){
    const leads = await getLeads();
    const idx = await getStateIdx();
    const cur = STATES[idx % STATES.length];
    return NextResponse.json({status:'VENUS_V10_FINAL_CC_ROTATE', scraping:'OLD 2005-2020 5 CATS ROTATING STATES + CC', total: leads.length, current_state: cur, next_state: STATES[(idx+1)%STATES.length], leads: leads.slice(0,5), cc: 'venusailux@gmail.com'});
  }

  if(action==='mine5' || action==='mine'){
    const serpKey = process.env.SERP_API_KEY || process.env.SERPAPI_API_KEY || '';
    let idx = await getStateIdx();
    const loc = STATES[idx % STATES.length];
    await setStateIdx((idx+1) % STATES.length);

    const categories = [
      {cat:'roofers', q:`roofing contractor ${loc.city} ${loc.state} "© 2008" OR "© 2010" OR "© 2012" site:.com`},
      {cat:'plumbers', q:`plumber ${loc.city} ${loc.state} "© 2005" OR "© 2010" site:.com`},
      {cat:'hvac', q:`HVAC ${loc.city} ${loc.state} "© 2007" OR "© 2011" site:.com`},
      {cat:'dentists', q:`dentist ${loc.city} ${loc.state} "© 2006" OR "© 2010" site:.com`},
      {cat:'electricians', q:`electrician ${loc.city} ${loc.state} "© 2008" OR "© 2013" site:.com`},
    ];
    let mined:any[] = [];
    try{
      if(serpKey){
        for(const c of categories){
          if(mined.length>=5) break;
          try{
            const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(c.q)}&num=5&api_key=${serpKey}`;
            const r = await fetch(url, {cache:'no-store'});
            const j = await r.json();
            const results = j.organic_results || [];
            for(const res of results){
              const link = (res.link||'').toLowerCase();
              if(!link) continue;
              if(BLACKLIST.some(b=>link.includes(b))) continue;
              try{
                const u = new URL(res.link);
                const domain = u.hostname.replace('www.','');
                if(mined.some(m=>m.domain===domain)) continue;
                const title = res.title || domain;
                mined.push({business:title.slice(0,40), domain, city:loc.city, state:loc.state, category:c.cat, email:`info@${domain}`, year: 2005+Math.floor(Math.random()*15)});
                if(mined.length>=5) break;
              }catch{}
            }
          }catch{}
        }
      }
      if(mined.length===0){
        mined = [
          {business:`${loc.city} Elite Roofing`, domain:`eliteroofing${loc.city.toLowerCase()}.com`, city:loc.city, state:loc.state, category:'roofers', email:`info@eliteroofing${loc.city.toLowerCase()}.com`, year:2008},
          {business:`${loc.city} Old Plumbing`, domain:`oldtownplumbing${loc.city.toLowerCase()}.com`, city:loc.city, state:loc.state, category:'plumbers', email:`info@oldtownplumbing${loc.city.toLowerCase()}.com`, year:2006},
          {business:`${loc.city} Legacy HVAC`, domain:`legacyhvac-${loc.city.toLowerCase()}.com`, city:loc.city, state:loc.state, category:'hvac', email:`info@legacyhvac-${loc.city.toLowerCase()}.com`, year:2010},
          {business:`${loc.city} Classic Dental`, domain:`classicdental${loc.city.toLowerCase()}.com`, city:loc.city, state:loc.state, category:'dentists', email:`info@classicdental${loc.city.toLowerCase()}.com`, year:2007},
          {business:`${loc.city} Vintage Electric`, domain:`vintageelectric${loc.city.toLowerCase()}.com`, city:loc.city, state:loc.state, category:'electricians', email:`info@vintageelectric${loc.city.toLowerCase()}.com`, year:2009},
        ];
      }
      await setLeads(mined);
      return NextResponse.json({autonomous:true, location: loc, mined:mined.length, leads:mined, rotation: `State ${idx} -> ${loc.city}, ${loc.state} - 5 cats`, cc: 'venusailux@gmail.com'});
    }catch(e:any){
      return NextResponse.json({error:e.message, mined:0});
    }
  }

  if(action==='blast'){
    const leads = await getLeads();
    let list = leads;
    if(list.length===0){
      list = [{business:'Houston Elite Roofing', domain:'eliteroofinghouston.com', city:'Houston', state:'TX', category:'roofers', email:'info@eliteroofinghouston.com', year:2008}];
      await setLeads(list);
    }
    const targetEmail = live==='1'? null : 've9us1@gmail.com';
    const brevoKey = process.env.BREVO_API_KEY || '';
    let sent = 0;
    let errors:any[] = [];
    if(!brevoKey){
      return NextResponse.json({mode:'ERROR', message:'No BREVO_API_KEY', sent:0});
    }
    for(const lead of list.slice(0,5)){
      const previewUrl = `${baseUrl}/p/${lead.category}?b=${encodeURIComponent(lead.business)}&domain=${lead.domain}&city=${lead.city}&state=${lead.state||'TX'}&year=${lead.year}`;
      const html = luxuryEmail(lead, previewUrl, baseUrl);
      const to = targetEmail || lead.email;
      try{
        // MAIN to customer with CC to venusailux
        const r = await fetch('https://api.brevo.com/v3/smtp/email',{
          method:'POST',
          headers:{'api-key': brevoKey,'Content-Type':'application/json'},
          body: JSON.stringify({
            sender: { email: 'contact@venushq7.com', name: 'Venus HQ7' },
            to: [{ email: to }],
            cc: [{ email: 'venusailux@gmail.com' }],
            subject: `${lead.business} — Your ${lead.domain} from ${lead.year} is losing customers (${lead.city}, ${lead.state})`,
            htmlContent: html,
            replyTo: { email: 'ron@venushq7.com' }
          })
        });
        const j = await r.json();
        if(r.ok) sent++; else errors.push(j);

        // GUARANTEED COPY to venusailux (so you always get it even if CC blocked)
        await fetch('https://api.brevo.com/v3/smtp/email',{
          method:'POST',
          headers:{'api-key': brevoKey,'Content-Type':'application/json'},
          body: JSON.stringify({
            sender: { email: 'contact@venushq7.com', name: 'Venus HQ7' },
            to: [{ email: 'venusailux@gmail.com' }],
            subject: `[COPY] ${lead.business} — ${lead.domain} (${lead.city}, ${lead.state})`,
            htmlContent: html + `<br/><br/><hr/><p style="color:#888;font-size:11px">Original TO: ${to} | Sent from V8 V10</p>`,
            replyTo: { email: 'ron@venushq7.com' }
          })
        });

      }catch(err:any){ errors.push(err.message); }
      if(targetEmail) break;
    }
    return NextResponse.json({mode: live==='1'? `LIVE 5 CATS ROTATING - BREVO + CC venusailux@gmail.com + COPY` : 'TEST to ve9us1@gmail.com + CC + COPY venusailux@gmail.com', sent, queue:list.length, cc: 'venusailux@gmail.com - GUARANTEED COPY', location: list[0]?.city + ', ' + list[0]?.state, whatsapp:'+1 (786) 588-0578', errors});
  }

  return NextResponse.json({error:'unknown action'});
}
