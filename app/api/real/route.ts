import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
const redis = Redis.fromEnv();
const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const LEADS = [
  { niche: 'plumbers', domain: 'emergencyplumberhouston.com', email: 'contact@emergencyplumberhouston.com', city: 'Houston', slug: 'emergency-plumber-houston-houston' },
  { niche: 'roofers', domain: 'dallasroofexperts.com', email: 'info@dallasroofexperts.com', city: 'Dallas', slug: 'dallas-roofers-dallas' },
  { niche: 'hvac', domain: 'miamihvacpros.com', email: 'info@miamihvacpros.com', city: 'Miami', slug: 'hvac-miami' },
];
async function sendEmail(lead:any){
  const r=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':BREVO_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({sender:{email:'hello@venusplaza.com',name:'Venus Plaza'},to:[{email:lead.email}],subject:`Quick idea for ${lead.domain}`,htmlContent:`<p>Preview: <a href="https://venus-ai-v8.vercel.app/p/${lead.slug}">https://venus-ai-v8.vercel.app/p/${lead.slug}</a></p><p>$497 one-time.</p>`})});
  return {ok:r.ok,data:await r.json()};
}
export async function GET(req:Request){
  const force=new URL(req.url).searchParams.get('force')==='true';
  let sentList:any[]=(await redis.get('venus_sent_list')) as any[]||[];
  const last=(await redis.get('venus_last_sent_at')) as number||0;
  const now=Date.now();
  if(force||now-last>4*60*1000){
    if(sentList.length<LEADS.length){
      const lead=LEADS[sentList.length];
      const br=await sendEmail(lead);
      if(br.ok){sentList.push({...lead,sent_at:new Date().toISOString()});await redis.set('venus_sent_list',sentList);await redis.set('venus_last_sent_at',now);}
    }
  }
  return NextResponse.json({status:'LIVE-PERSISTENT',storage:'upstash-kv-lime-field',totalRealSent:sentList.length,sent:sentList});
}
