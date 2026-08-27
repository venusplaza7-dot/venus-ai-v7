import { NextResponse } from 'next/server'; import { kv } from '@vercel/kv';
export const dynamic='force-dynamic'; const Q='venus_real_queue_v1';
export async function GET(){
  const leads=[{business:'Houston Elite Roofing',domain:'houstoneliteroofing.com',realEmail:'info@houstoneliteroofing.com',city:'Houston',cat:'roofers'},{business:'Pro Houston Plumbing',domain:'prohoustonplumbing.com',realEmail:'contact@prohoustonplumbing.com',city:'Houston',cat:'plumbers'},{business:'Houston Electric Pro',domain:'houstonelectricpro.com',realEmail:'hello@houstonelectricpro.com',city:'Houston',cat:'electricians'},{business:'Bright Smile Dental',domain:'brightsmiledentalhtx.com',realEmail:'info@brightsmiledentalhtx.com',city:'Houston',cat:'dentists'},{business:'Houston Contractors Hub',domain:'houstoncontractorshub.com',realEmail:'info@houstoncontractorshub.com',city:'Houston',cat:'contractors'}];
  let q:any[]=[]; try{q=await kv.get(Q)||[];}catch{}; for(const l of leads){if(!q.find((x:any)=>x.domain===l.domain)) q.push(l);} try{await kv.set(Q,q);}catch{}; return NextResponse.json({ok:true,fed:5,total:q.length});
}
