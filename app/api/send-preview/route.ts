export const dynamic = 'force-dynamic'

export async function GET() {
  const KEY = process.env.BREVO_API_KEY
  if (!KEY) {
    return new Response('Missing BREVO_API_KEY', { status: 500 })
  }

  const html = `<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet"></head><body style="margin:0;padding:0;background:#080808;"><table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#080808;"><tr><td align="center" style="padding:40px 15px;"><table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#0f0f0f;border:1px solid #1e1e1e;border-radius:16px;overflow:hidden;"><tr><td style="padding:36px 36px 0 36px;"><p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:10px;letter-spacing:4px;color:#555;font-weight:600;">VENUS HQ - AGENT AUDIT</p><h1 style="margin:18px 0 0;font-family:'Playfair Display',Georgia,serif;font-size:42px;line-height:0.95;font-weight:700;color:#fff;letter-spacing:-1px;">Your new<br><span style="color:#c9a86a;font-style:italic;font-weight:300;">website is ready</span><br>for review.</h1><div style="width:48px;height:2px;background:#c9a86a;margin:22px 0;"></div><p style="margin:0;font-family:Inter,sans-serif;font-size:14px;line-height:1.7;color:#8a8a8a;"><span style="color:#555;">OLD:</span> 24hrplumbinghouston.com - 8s load, no AI<br><span style="color:#c9a86a;">NEW:</span> <span style="color:#fff;font-weight:600;">Gen-Z Luxury Black/White/Gold</span> + 4 AI Agents</p></td></tr><tr><td style="padding:28px 36px;"><a href="https://venus-ai-v8.vercel.app/p/24hrplumbinghouston-com" style="display:inline-block;background:#ffffff;color:#000000;font-family:Inter,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-decoration:none;padding:18px 32px;border-radius:999px;">VIEW LIVE PROPOSAL</a></td></tr><tr><td style="background:#000000;padding:36px;text-align:center;border-top:1px solid #1e1e1e;"><p style="margin:0;font-family:Inter,sans-serif;font-size:10px;letter-spacing:4px;color:#444;">INVITATION TO LAUNCH</p><p style="margin:12px 0 0;font-family:'Playfair Display',serif;font-size:38px;color:#fff;">Launch within<br><span style="color:#c9a86a;">24 hours.</span></p><a href="https://wa.me/17865880578?text=APPROVE%2024hrplumbinghouston.com%20%24497" style="display:inline-block;margin-top:24px;background:#25D366;color:#fff;font-family:Inter,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-decoration:none;padding:18px 36px;border-radius:999px;">CONFIRM VIA WHATSAPP</a><p style="margin:16px 0 0;font-family:Inter,sans-serif;font-size:11px;color:#666;">DIRECT +1 (786) 588-0578 - <span style="color:#c9a86a;">$1999 -&gt; $497</span></p></td></tr></table></td></tr></table></body></html>`

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { email: 'hello@venushq7.com', name: 'Venus HQ' },
      to: [{ email: 've9us1@gmail.com' }],
      subject: 'Your new website is ready - 24hrplumbinghouston.com',
      htmlContent: html,
      textContent: 'View proposal: https://venus-ai-v8.vercel.app/p/24hrplumbinghouston-com - WhatsApp +17865880578'
    })
  })

  const data = await res.text()
  return new Response(data, { status: res.status })
}
