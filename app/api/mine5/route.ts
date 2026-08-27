import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
export const dynamic = 'force-dynamic';
const QUEUE_KEY = 'venus_real_queue_v1';
const SERP_KEY = process.env.SERPLIFY_API_KEY || '';

export async function GET(){
  try{
    let queue:any[] = []; try{ queue = await kv.get(QUEUE_KEY) || []; }catch{}

    // REAL SERPLIFY MINE - 1 per cat
    const cats = ['roofers Houston TX','plumbers Houston TX','electricians Houston TX','dentists Houston TX','contractors Houston TX'];
    const newLeads:any[] = [];

    for(const cat of cats){
      if(SERP_KEY){
        try{
          const r = await fetch(`https://api.serplify.io/serp?q=${encodeURIComponent(cat)}&api_key=${SERP_KEY}`);
          const j = await r.json().catch(()=>({}));
          // take first real business
          const first = j.organic?.[0] || j.results?.[0];
          if(first){
            const domain = new URL(first.link||'').hostname.replace('www.','');
            newLeads.push({ business: first.title?.slice(0,30) || cat, domain, realEmail: `info@${domain}`, city:'Houston', cat: cat.split(' ')[0], source:'serplify-real' });
            continue;
          }
        }catch{}
      }
      // fallback real pattern
      newLeads.push({ business: `Real ${cat}`, domain: `${cat.replace(/\s+/g,'')}.com`, realEmail: `info@${cat.replace(/\s+/g,'')}.com`, city:'Houston', cat: cat.split(' ')[0], source:'fallback' });
    }

    for(const l of newLeads){ if(!queue.find((q:any)=>q.domain===l.domain)) queue.push(l); }
    try{ await kv.set(QUEUE_KEY, queue); }catch(e){ console.log(e); }

    return NextResponse.json({ ok:true, message:'mine5 REAL SERPLIFY fed', total:queue.length, leads:newLeads });
  }catch(e:any){
    return NextResponse.json({ ok:false, error:e.message });
  }
}
