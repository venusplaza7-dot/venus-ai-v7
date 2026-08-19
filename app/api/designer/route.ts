import { NextResponse } from 'next/server'
export const dynamic='force-dynamic
export async function GET(req:Request){
  const slug=new URL(req.url).searchParams.get('business')||'demo'
  const preview=`https://venus-agent-hq.vercel.app/demo/${slug}`
  const newImage=`https://image.thum.io/get/width/800/crop/600/noanimate/${preview}`
  return NextResponse.json({slug,preview,newImage,agent:'designer',features:['Intelligent Concierge','Visual Assessment','Voice Operations']})
