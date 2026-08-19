import { NextResponse } from 'next/server'
export const dynamic='force-dynamic'
export async function GET(){
  const key=process.env.BREVO_API_KEY?.trim(); if(!key) return NextResponse.json({error:'no key'})
  const domain='houston-elite-plumber.com'
  const oldImage=`https://image.thum.io/get/width/600/crop/400/noanimate/https://${domain}`
  const preview=`https://venus-agent-hq.vercel.app/demo/houstonelite`
  const newImage=`https://image.thum.io/get/width/600/crop/400/noanimate/${preview}`
  const wa=`https://wa.me/17865880578?text=Test`
  const html=`<div style="background:#0a0a0a;color:#fff;max-width:650px;margin:0 auto;font-family:Arial"><div style="padding:30px"><h1 style="font-weight:300;font-size:38px">Your new<br>website is ready</h1></div><div style="padding:0 20px"><p style="font-size:10px;letter-spacing:3px;color:#666">OLD SITE</p><img src="${oldImage}" style="width:100%;border:1px solid #222"/></div><div style="padding:20px"><p style="font-size:10px;letter-spacing:3px;color:#fff">NEW — GEN Z + AI</p><img src="${newImage}" style="width:100%;border:1px solid #fff"/><div style="background:#fff;color:#000;padding:20px"><p>01 Intelligent Concierge<br>02 Visual Assessment<br>03 Voice Operations</p><a href="${preview}" style="background:#000;color:#fff;padding:14px 24px;display:inline-block;text-decoration:none">VIEW LIVE PROPOSAL</a></div></div><div style="text-align:center;padding:40px"><a href="${wa}" style="background:#fff;color:#000;padding:18px 36px;text-decoration:none;font-weight:600">CONFIRM VIA WHATSAPP — +1 (786) 588-0578</a></div></div>`
  await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':key,'Content-Type':'application/json'},body:JSON.stringify({sender:{email:'ron@venushq7.com',name:'Venus HQ'},to:[{email:'ve9us1@gmail.com'}],subject:'TEST — old vs new images fixed',htmlContent:html})})
  return NextResponse.json({ok:true,sent:'ve9us1@gmail.com'})
}








