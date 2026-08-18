@"
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
export const dynamic='force-dynamic'
export async function GET(){
 try{
  const key=process.env.BREVO_API_KEY
  if(!key) return NextResponse.json({ok:false,error:'Missing BREVO_API_KEY'}, {status:200})
  let emails:any[]=[]
  try{
   const p=path.join(process.cwd(),'site500.json')
   if(fs.existsSync(p)){
    const raw=fs.readFileSync(p,'utf8').trim()
    if(raw.startsWith('<')) throw new Error('HTML file')
    emails=JSON.parse(raw)
   }
  }catch{ emails=[{email:'ve9us1@gmail.com'}] }
  const toSend=emails.slice(0,100)
  let sent=0; const out:any[]=[]
  for(const it of toSend){
   const to=typeof it==='string'?it:it.email
   if(!to) continue
   const r=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':key,'Content-Type':'application/json'},body:JSON.stringify({sender:{email:'ve9us1@gmail.com',name:'Venus'},to:[{email:to}],subject:'Venus Test OK',htmlContent:'<p>Brevo is working - 100 limit tonight</p>'})})
   const d=await r.json(); out.push({to,status:r.status,ok:r.ok})
   if(r.ok) sent++; await new Promise(x=>setTimeout(x,800))
   if(sent>=100) break
  }
  return NextResponse.json({ok:true,total:emails.length,sent,results:out},{status:200})
 }catch(e:any){ return NextResponse.json({ok:false,error:e.message},{status:200}) }
}

