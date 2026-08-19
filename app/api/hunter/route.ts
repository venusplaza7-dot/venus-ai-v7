import { NextResponse } from 'next/server'
export const dynamic='force-dynamic'
export async function GET(req:Request){
  const domain=new URL(req.url).searchParams.get('domain')||''
  if(!domain || domain.includes('example')) return NextResponse.json({error:'invalid'}, {status:400})
  const oldImage=`https://image.thum.io/get/width/800/crop/600/noanimate/https://${domain}`
  return NextResponse.json({domain,oldImage,agent:'hunter',status:'done'})
}


