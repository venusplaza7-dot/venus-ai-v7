import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

const CATS = [
  { cat:'roofers', q:'roofers Houston TX website' },
  { cat:'plumbers', q:'plumbers Houston TX website' },
  { cat:'hvac', q:'HVAC contractors Houston TX website' },
  { cat:'dentists', q:'dentists Houston TX website' },
  { cat:'electricians', q:'electricians Houston TX website' }
];

export async function GET(){
  const SERP_KEY = process.env.SERP_API_KEY;
  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if(!SERP_KEY) return NextResponse.json({error:"SERP_API_KEY missing in Vercel env"}, {status:500});

  let leads:any[] = [];

  for(let c of CATS){
    try{
      const serpRes = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(c.q)}&location=Houston,Texas&api_key=${SERP_KEY}&num=5`);
      const data = await serpRes.json();
      const org = data.organic_results?.[0];
      if(!org) continue;
      const domain = new URL(org.link).hostname.replace('www.','');
      const business = org.title?.split('-')[0]?.split('|')[0]?.trim() || `${c.cat} Houston`;
      const email = `info@${domain}`;
      leads.push({
        business, cat:c.cat, domain, city:'Houston',
        realEmail: email, website: org.link, title: org.title,
        source: 'SERP autonomous'
      });
    }catch(e:any){
      leads.push({cat:c.cat, error:e.message});
    }
  }

  // Save to KV queue
  if(KV_URL && KV_TOKEN && leads.length){
    try{
      await fetch(`${KV_URL}/set/venus_queue`,{
        method:'POST',
        headers:{Authorization:`Bearer ${KV_TOKEN}`,'Content-Type':'application/json'},
        body: JSON.stringify(leads)
      });
    }catch{}
  }

  return NextResponse.json({
    autonomous:true,
    serp_used:!!SERP_KEY,
    kv_used:!!KV_URL,
    brevo_ready:!!process.env.BREVO_API_KEY,
    mined: leads.length,
    leads
  });
}
