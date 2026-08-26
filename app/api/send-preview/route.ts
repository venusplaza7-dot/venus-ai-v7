xport const dynamic = 'force-dynamic'

export async function GET() {
  const KEY = process.env.BREVO_API_KEY!
  if (!KEY) return new Response('Missing BREVO_API_KEY', { status: 500 })

  // LUXURY EMAIL — Playfair + Inter + Gold
  const html = `
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;600;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#080808;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#080808;">
<tr><td align="center" style="padding:40px 15px;">
<table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#0f0f0f;border:1px solid #1e1e1e;border-radius:16px;overflow:hidden;">

<!-- HEADER -->
<tr><td style="padding:36px 36px 0 36px;">
<p style="margin:0;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:4px;color:#555;font-weight:600;">VENUS HQ • AGENT AUDIT</p>
<h1 style="margin:18px 0 0;font-family:'Playfair Display',Georgia,serif;font-size:42px;line-height:0.95;font-weight:700;color:#ffffff;letter-spacing:-1px;">Your new<br><span style="color:#c9a86a;font-style:italic;font-weight:300;">website is ready</span><br>for review.</h1>
<div style="width:48px;height:2px;background:linear-gradient(90deg,#c9a86a,#f5e6b5);margin:22px 0;"></div>
<p style="margin:0;font-family:'Inter',Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#8a8a8a;">
<span style="color:#555;">OLD:</span> 24hrplumbinghouston.com — 8s load, no AI, losing calls<br>
<span style="color:#c9a86a;">NEW:</span> <span style="color:#fff;font-weight:600;">Gen-Z Luxury Black/White/Gold</span> + 4 AI Agents that book while you sleep
</p>
</td></tr>

<!-- AGENTS PILL -->
<tr><td style="padding:22px 36px 0 36px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:999px;padding:8px 14px;font-family:'Inter',sans-serif;font-size:11px;color:#aaa;letter-spacing:1px;">⚡ DISPATCH</td>
<td style="width:8px"></td>
<td style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:999px;padding:8px 14px;font-family:'Inter',sans-serif;font-size:11px;color:#aaa;letter-spacing:1px;">📸 DIAGNOSTICS</td>
<td style="width:8px"></td>
<td style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:999px;padding:8px 14px;font-family:'Inter',sans-serif;font-size:11px;color:#aaa;letter-spacing:1px;">🤖 CLOSER</td>
</tr></table>
</td></tr>

<!-- CTA -->
<tr><td style="padding:28px 36px;">
<a href="https://venus-ai-v8.vercel.app/p/24hrplumbinghouston-com" style="display:inline-block;background:#ffffff;color:#000000;font-family:'Inter',Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-decoration:none;padding:18px 32px;border-radius:999px;">VIEW LIVE PROPOSAL →</a>
<p style="margin:12px 0 0;font-family:'Inter',sans-serif;font-size:11px;color:#555;">Private link • Expires in 48h • No login needed</p>
</td></tr>

<!-- INVITATION BLACK BLOCK -->
<tr><td style="background:#000000;padding:36px;text-align:center;border-top:1px solid #1e1e1e;">
<p style="margin:0;font-family:'Inter',sans-serif;font-size:10px;letter-spacing:4px;color:#444;font-weight:600;">INVITATION TO LAUNCH</p>
<p style="margin:12px 0 0;font-family:'Playfair Display',serif;font-size:38px;line-height:1.1;font-weight:300;color:#ffffff;">Launch within<br><span style="color:#c9a86a;">24 hours.</span></p>
<a href="https://wa.me/17865880578?text=APPROVE%2024hrplumbinghouston.com%20%24497" style="display:inline-block;margin-top:24px;background:#25D366;color:#ffffff;font-family:'Inter',sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-decoration:none;padding:18px 36px;border-radius:999px;">CONFIRM VIA WHATSAPP</a>
<p style="margin:16px 0 0;font-family:'Inter',sans-serif;font-size:11px;letter-spacing:1px;color:#666;">DIRECT TO +1 (786) 588-0578 • <span style="text-decoration:line-through;color:#444;">$1999</span> <span style="color:#c9a86a;font-weight:700;">→ $497</span> FOUNDER RATE</p>
</td></tr>

</table>
<p style="margin:20px 0 0;font-family:'Inter',sans-serif;font-size:10px;color:#333;">Venus HQ • venusplaza7.com • Reply STOP to opt-out</p>
</td></tr>
</table>
</body>
</html>
  `

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { email: 'hello@venushq7.com', name: 'Venus HQ' },
      to: [{ email: 've9us1@gmail.com' }],
      replyTo: { email: 'venusailux@gmail.com' },
      subject: 'Ron — I rebuilt 24hrplumbinghouston.com (live preview)',
      htmlContent: html,
      textContent: 'Your new site for 24hrplumbinghouston.com is ready. View: https://venus-ai-v8.vercel.app/p/24hrplumbinghouston-com - Launch in 24h. WhatsApp +1 786 588 0578'
    })
  })

  const data = await res.text()
  return new Response(data, { status: res.status })
}









