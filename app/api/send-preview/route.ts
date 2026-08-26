export async function GET(){
  const KEY = process.env.BREVO_API_KEY!
  const html = `
  <div style="background:#0a0a0a;color:#fff;font-family:Helvetica;max-width:600px;margin:0 auto;padding:40px">
    <p style="font-size:10px;letter-spacing:4px;color:#666">VENUS HQ — AGENT AUDIT</p>
    <h1 style="font-size:42px;font-weight:300">Your new<br>website is ready<br>for review.</h1>
    <p style="color:#888">Old: 24hrplumbinghouston.com — 8s load, no AI<br>New: Luxury Gen-Z Black/White/Gold with 4 AI Agents</p>
    <a href="https://venus-ai-v8.vercel.app/p/24hrplumbinghouston-com" style="background:#fff;color:#000;padding:16px 32px;display:inline-block;text-decoration:none;margin:20px 0">VIEW LIVE PROPOSAL →</a>
    <div style="background:#000;padding:40px;text-align:center;margin-top:40px">
      <p style="font-size:36px;font-weight:300">Launch within 24 hours.</p>
      <a href="https://wa.me/17865880578?text=APPROVE 24hrplumbinghouston.com $497" style="background:#fff;color:#000;padding:18px 36px;display:inline-block;text-decoration:none;font-size:12px;letter-spacing:3px;font-weight:bold">CONFIRM VIA WHATSAPP</a>
      <p style="color:#666;font-size:11px;margin-top:20px">DIRECT TO +1 (786) 588-0578 — $1999 → $497</p>
    </div>
  </div>`

  const res = await fetch('https://api.brevo.com/v3/smtp/email',{
    method:'POST',
    headers:{'api-key':KEY,'Content-Type':'application/json'},
    body: JSON.stringify({
      sender:{email:'ron@venushq7.com',name:'Venus HQ'},
      to:[{email:'ve9us1@gmail.com'}],
      subject:'Preview — Your new website is ready — 24hrplumbinghouston.com',
      htmlContent: html
    })
  })
  return new Response(await res.text(),{status: res.status})
}

