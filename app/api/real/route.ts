import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const QUEUE_KEY = 'venus_real_queue_v1';
const BREVO_KEY = process.env.BREVO_API_KEY || '';
const FROM_EMAIL = 'ron@venushq7.com';
const REPLY_TO = 'hello@venushq7.com';

const CATEGORIES: any = {
  roofers: {
    title: "ROOFERS", pain: "homeowner calls 3 roofers at 10pm, you miss call on roof, lose $8k job",
    calc: "Roof Size + Material Calculator (Shingle/Metal/Flat) + Storm Damage Estimator",
    benefit: "Homeowner gets instant price range in 10s, books free inspection, you close 40% more",
    example: "Houston Elite Roofing now closes 12 extra roofs/month"
  },
  plumbers: {
    title: "PLUMBERS", pain: "pipe bursts 2am, you sleep, competitor gets $1200 emergency",
    calc: "Emergency Leak + Water Heater + Drain Cleaning Calculator + 2AM Dispatch",
    benefit: "AI answers 2am, books emergency, sends plumber with address, you wake up paid",
    example: "Pro Plumbing Houston books 8 more emergencies/week"
  },
  electricians: {
    title: "ELECTRICIANS", pain: "customer needs outlet, you on panel job, miss $150 call that becomes $3000 panel",
    calc: "Outlet / Switch / Panel Upgrade / EV Charger Calculator + Same-Day Slots",
    benefit: "AI qualifies job size, quotes right, books right price slot",
    example: "Texas Electric now averages $890 per job not $190"
  },
  dentists: {
    title: "DENTISTS", pain: "patient needs crown, front desk busy 10min, they book elsewhere",
    calc: "Insurance Checker + Crown / Implant / Cleaning Cost Calculator + Instant Book",
    benefit: "Patient checks insurance in 20s, sees $0 with insurance, books online, no staff needed",
    example: "Bright Smile added 34 new patients last month"
  },
  contractors: {
    title: "CONTRACTORS", pain: "homeowner wants kitchen quote, you take 3 days, fast guy wins",
    calc: "Kitchen / Bathroom / Remodel Estimator + Financing + Before/After AI",
    benefit: "Homeowner gets ballpark in 30s, books estimate, you win speed",
    example: "Prime Contractors closes 50% more estimates"
  }
};

function getCat(cat: string){ return CATEGORIES[cat] || CATEGORIES.roofers; }

function luxuryEmail(lead: any){
  const cat = getCat(lead.cat);
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#000;">
<div style="background:#000;padding:40px 20px;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;background:#0a0a0a;border:1px solid #c5a059;border-radius:12px;overflow:hidden;">

<div style="background:linear-gradient(135deg,#000 0%,#1a1a1a 100%);padding:35px;text-align:center;border-bottom:2px solid #c5a059;">
<h1 style="color:#c5a059;margin:0;font-size:32px;letter-spacing:4px;">VENUS HQ7</h1>
<p style="color:#fff;margin:10px 0 0;font-size:11px;letter-spacing:3px;">LUXURY AI EMPLOYEES FOR ${cat.title}</p>
</div>

<div style="padding:30px;background:#000;">
<h2 style="color:#c5a059;font-size:16px;margin:0 0 12px;letter-spacing:1px;">WHO WE ARE</h2>
<p style="color:#e0e0e0;font-size:14px;line-height:22px;margin:0;">We are Venus HQ7, Houston luxury AI agency. We don't sell chatbots. We install AI employees that work 24/7 for ${lead.city} ${cat.title} like ${lead.business}. They answer, book, and close while you work.</p>
</div>

<div style="padding:0 30px 30px;background:#000;">
<h2 style="color:#c5a059;font-size:16px;margin:0 0 12px;">WHAT WE DO FOR ${lead.business.toUpperCase()}</h2>
<p style="color:#e0e0e0;font-size:14px;line-height:22px;margin:0;">You're losing ${cat.title} jobs daily because ${cat.pain}. Your website is brochure. Your phone misses after-hours. Competitor with AI wins.</p>
</div>

<div style="padding:30px;background:#111;border-top:1px solid #222;border-bottom:1px solid #222;">
<h2 style="color:#c5a059;font-size:16px;margin:0 0 22px;text-align:center;letter-spacing:2px;">5 AI TOOLS YOU GET - BUILT FOR ${cat.title}</h2>

<div style="margin-bottom:20px;">
<p style="color:#c5a059;font-weight:bold;font-size:14px;margin:0 0 6px;">1. AI RECEPTIONIST - NEVER MISS ${cat.title.toUpperCase()} CALL</p>
<p style="color:#aaa;font-size:13px;line-height:19px;margin:0;">Answers every call in 2s, English/Spanish, qualifies, checks calendar, books job, sends SMS. If no book, calls back 3x. What it does: You never lose emergency $${lead.cat==='dentists'?'1k':'5k'} job because you were busy. Example: ${cat.example}</p>
</div>

<div style="margin-bottom:20px;">
<p style="color:#c5a059;font-weight:bold;font-size:14px;margin:0 0 6px;">2. AI WEBSITE THAT SELLS - ${cat.calc}</p>
<p style="color:#aaa;font-size:13px;line-height:19px;margin:0;">Not brochure. Instant calculator, before/after, financing, 1-click book. Mobile black/gold luxury. What it does: ${cat.benefit}</p>
</div>

<div style="margin-bottom:20px;">
<p style="color:#c5a059;font-weight:bold;font-size:14px;margin:0 0 6px;">3. AI REVIEW & GOOGLE TOP 3 ENGINE</p>
<p style="color:#aaa;font-size:13px;line-height:19px;margin:0;">After job, AI texts: Happy? Leave 5-star. Auto posts to Google, replies to all reviews with AI. What it does: Pushes you to Top 3 for "${cat.title} near me ${lead.city}" in 30 days, more calls without ads.</p>
</div>

<div style="margin-bottom:20px;">
<p style="color:#c5a059;font-weight:bold;font-size:14px;margin:0 0 6px;">4. AI ADS + 7x FOLLOW-UP MACHINE</p>
<p style="color:#aaa;font-size:13px;line-height:19px;margin:0;">Runs Google Ads "${cat.title} ${lead.city}", creates landing page, follows up every lead 7 times SMS/email/voicemail until booked. What it does: Turns $500 ads into 10-15 booked ${cat.title} jobs, not clicks.</p>
</div>

<div style="margin-bottom:0;">
<p style="color:#c5a059;font-weight:bold;font-size:14px;margin:0 0 6px;">5. VENUS OS - LUXURY DASHBOARD</p>
<p style="color:#aaa;font-size:13px;line-height:19px;margin:0;">One dashboard: calls answered, jobs booked, revenue, reviews, ad ROI, missed calls saved by AI. What it does: See $12k extra this week because of AI, not guesswork.</p>
</div>
</div>

<div style="padding:35px;background:#000;text-align:center;">
<p style="color:#fff;font-size:17px;margin:0 0 10px;">We install all 5 for ${cat.title} in ${lead.city}:</p>
<p style="color:#c5a059;font-size:22px;font-weight:bold;margin:0 0 20px;">$497 <span style="color:#666;font-size:14px;text-decoration:line-through;">$1999</span> - 5 spots only</p>
<a href="https://venushq7.com/new-website/${lead.cat}?b=${encodeURIComponent(lead.business)}" style="display:inline-block;background:#c5a059;color:#000;padding:15px 35px;text-decoration:none;font-weight:bold;font-size:14px;letter-spacing:1px;border-radius:4px;">SEE YOUR AI WEBSITE →</a>
<p style="color:#666;font-size:11px;margin:18px 0 0;">Ron Kahn, Founder - Reply to ${REPLY_TO} - 48hr setup</p>
</div>

</div>
<div style="text-align:center;padding:20px;">
<p style="color:#333;font-size:10px;">Venus HQ7 Houston | For ${lead.business} - ${cat.title} | Unsubscribe reply STOP to ${REPLY_TO}</p>
</div>
</div>
</body></html>`;
}

async function brevoSend(opts: any){
  const res = await fetch('https://api.brevo.com/v3/smtp/email',{
    method:'POST',
    headers:{'api-key':BREVO_KEY,'Content-Type':'application/json'},
    body: JSON.stringify({
      sender:{email:FROM_EMAIL,name:'Ron - Venus HQ7'},
      replyTo:{email:REPLY_TO},
      to:[{email:opts.to}],
      subject:opts.subject,
      htmlContent:opts.html,
      tags:opts.tags
    })
  });
  return res.json();
}

export async function GET(req: Request){
  const {searchParams} = new URL(req.url);
  const action = searchParams.get('action');
  const live = searchParams.get('live');

  if(action==='clear'){
    await kv.del(QUEUE_KEY);
    await kv.del('venus_queue');
    await kv.del('venus_real_queue');
    return NextResponse.json({status:'CLEARED',queue:0,msg:'Stopped 350 loop to ve9us1. Queue empty. Luxury intact'});
  }
  if(action==='status'){
    const q = await kv.get<any[]>(QUEUE_KEY) || [];
    const byCat: any = {};
    q.forEach((l:any)=> byCat[l.cat]=(byCat[l.cat]||0)+1);
    return NextResponse.json({status:'QUEUE_STATUS',total:q.length,byCat,sample:q.slice(0,2),senders:{from:FROM_EMAIL,replyTo:REPLY_TO}});
  }
  if(action==='blast'){
    const q = await kv.get<any[]>(QUEUE_KEY) || [];
    if(!q.length) return NextResponse.json({status:'QUEUE_EMPTY',msg:'No leads. Mine first.'});
    let sent=0;
    for(const lead of q){
      const html = luxuryEmail(lead);
      const to = live==='1' ? lead.realEmail : 've9us1@gmail.com';
      const subj = `${lead.business} - You're losing ${lead.cat} jobs daily (AI fixes it) - ${lead.city}`;
      try{
        await brevoSend({to,subject:subj,html,tags:[lead.cat]});
        sent++;
      }catch(e){ console.log(e); }
      await new Promise(r=>setTimeout(r,1200));
    }
    if(live==='1') await kv.del(QUEUE_KEY);
    return NextResponse.json({status: live==='1'?'BLASTED_LIVE':'TEST_BLAST',sent,from:FROM_EMAIL,replyTo:REPLY_TO,msg: live==='1'?`Sent ${sent} REAL luxury black/gold per category from ${FROM_EMAIL}`:`Test sent ${sent} to ve9us1@gmail.com`});
  }
  return NextResponse.json({status:'VENUS_REAL_LUXURY',actions:['clear','status','blast&live=0/1'],from:FROM_EMAIL,replyTo:REPLY_TO});
}
