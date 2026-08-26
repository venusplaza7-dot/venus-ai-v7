export const dynamic = 'force-dynamic'

export async function GET() {
  const KEY = process.env.BREVO_API_KEY
  if (!KEY) return new Response('Missing BREVO_API_KEY', { status: 500 })

  const html = `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0a0a;">
<tr><td align="center">
<table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#0a0a0a;font-family:Helvetica,Arial,sans-serif;">
<tr><td style="padding:50px 30px 10px;">
<p style="margin:0;font-size:10px;letter-spacing:4px;color:#666;">VENUS HQ - AGENT AUDIT</p>
<h1 style="margin:20px 0 0;font-size:44px;line-height:1.05;font-weight:300;color:#fff;">Your new<br>website is ready<br>for review.</h1>
<div style="width:40px;height:1px;background:#c9a86a;margin:20px 0;"></div>
<p style="margin:0;color:#888;font-size:14px;line-height:1.6;">Old: 24hrplumbinghouston.com - 8s load, no AI<br>New: Luxury Gen-Z <span style="color:#c9a86a;">Black/White/Gold</span> with 4 AI Agents</p>
</td></tr>
<tr><td style="padding:20px 30px;">
<a href="https://venus-ai-v8.vercel.app/p/24hrplumbinghouston-com" style="background:#ffffff;color:#000000;padding:16px 28px;display:inline-block;text-decoration:none;font-size:12px;letter-spacing:2px;font-weight:600;">VIEW LIVE PROPOSAL -></a>
</td></tr>
<tr><td style="padding:40px 30px;background:#000000;text-align:center;">
<p style="margin:0 0 10px;font-size:10px;letter-spacing:4px;color:#555;">INVITATION</p>
<p style="margin:0 0 25px;font-size:34px;line-height:1.2;font-weight:300;color:#fff;">Launch within<br>24 hours.</p>
<a href="https://wa.me/17865880578?text=APPROVE%2024hrplumbinghouston.com%20%24497" style="background:#ffffff;color:#000000;padding:18px 36px;display:inline-block;text-decoration:none;font-size:12px;letter-spacing:3px;font-weight:bold;">CONFIRM VIA WHATSAPP</a>
<p style="margin:15px 0 0;color:#666;font-size:11px;letter-spacing:1px;">DIRECT TO +1 (786) 588-0578 - <span style="text-decoration:line-through;">$1999</span> <span style="color:#c9a86a;">-> $497</span></p>
</td></tr>
</table>
</td></tr>
</table>`

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { email: 'ron@venushq7.com', name: 'Venus HQ' },
      to: [{ email: 've9us1@gmail.com' }],
      subject: 'Preview - Your new website is ready - 24hrplumbinghouston.com',
      htmlContent: html
    })
  })

  const text = await res.text()
  return new Response(text, { status: res.status })
}
