import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const BREVO_KEY = process.env.BREVO_API_KEY
    if (!BREVO_KEY) return NextResponse.json({ok:false, error:'Missing BREVO_API_KEY in Vercel Env'}, {status:200})
    let emails:any[]=[]
    try {
      const p = path.join(process.cwd(), 'site500.json')
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p,'utf8').trim()
        if (raw.startsWith('<')) throw new Error('site500.json is HTML not JSON')
        emails = JSON.parse(raw)
      }
    } catch {
      emails = [{email:'ve9us1@gmail.com'}]
    }
    const toSend = emails.slice(0,100)
    let sent=0
    const results:any[]=[]
    for (const item of toSend) {
      const to = typeof item==='string'?item:item.email||item.Email
      if (!to) continue
      const r = await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':BREVO_KEY,'Content-Type':'application/json'},body:JSON.stringify({sender:{email:'ve9us1@gmail.com',name:'Venus'},to:[{email:to}],subject:'Quick note',htmlContent:'<p>Test from Venus Agent HQ - 100 limit tonight</p>'})})
      const data = await r.json()
      results.push({to,status:r.status,ok:r.ok,brevo:data})
      if (r.ok) sent++
      await new Promise(res=>setTimeout(res,800))
      if (sent>=100) break
    }
    return NextResponse.json({ok:true,totalInFile:emails.length,attempted:toSend.length,sent,results},{status:200})
  } catch (e:any) {
    return NextResponse.json({ok:false,error:e.message,stack:e.stack},{status:200})
  }
}
