import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
export const dynamic='force-dynamic';
export async function GET(){
  const keys=['venus_real_queue_v1','venus_sent_count','venus_stats','venus_dashboard','sent','opens','clicks','venus_pro_dashboard','dashboard:stats'];
  for(const k of keys){ try{ await kv.del(k); }catch{} }
  try{ const all=await kv.keys('venus*'); for(const k of all){ await kv.del(k); } }catch{}
  try{ const all2=await kv.keys('*sent*'); for(const k of all2){ await kv.del(k); } }catch{}
  return NextResponse.json({status:'DASHBOARD_CLEARED', msg:'Fake 350 wiped'});
}
