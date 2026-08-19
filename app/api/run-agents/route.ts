import { NextResponse } from 'next/server'
import fs from 'fs'; import path from 'path'
export const dynamic='force-dynamic'
export async function GET(){
  const key=process.env.BREVO_API_KEY?.trim()
  if(!key) return NextResponse.json({ok:false,error:'Add BREVO_API_KEY last - everything fixed first'})
  let sites:any[]=[]
  try{
    const paths=[path.join(process.cwd(),'public','site500.json'), path.join(process.cwd(),'site500.json')]
    let raw=''
    for(const p of paths){ if(fs.existsSync(p)){ raw=fs.readFileSync(p,'utf8').trim(); break; } }
    if(!raw) throw new Error('site500.json missing')
    if(raw.startsWith('<')) throw new Error('HTML file - fix .gitattributes')
    sites=JSON.parse(raw)
  }catch(e:any){ return NextResponse.json({ok:false,error:e.message}) }
  sites=sites.filter((s:any)=> s.domain && !s.domain.includes('example') && s.email?.includes('@'))
  const sample=sites.slice(0,3).map((s:any)=>s.domain)
  return NextResponse.json({ok:true,total:sites.length,sample,ready:'Add key last to send with old+new images'})
}




