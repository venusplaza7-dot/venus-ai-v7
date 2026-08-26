import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function GET(){
  try{
    const niche = ['plumbers','roofers','hvac'][Math.floor(Math.random()*3)];
    const city = 'Houston';
    const link = `https://venus-ai-v8.vercel.app/p/demo-${Date.now()}?cat=${niche}`;
    await redis.incr('sent_count');
    await redis.set('last_link', link);
    const count = await redis.get('sent_count');
    return NextResponse.json({status:'LIVE-INFINITE-FREE', sent_count:count, last_link:link, redis:'upstash-kv-time-field - FREE - Connected'});
  }catch(e:any){
    return NextResponse.json({error:e.message, env_keys:Object.keys(process.env).filter(k=>k.includes('KV')||k.includes('REDIS'))},{status:500});
  }
}
