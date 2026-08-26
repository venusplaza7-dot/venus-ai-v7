import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { domain, slug } = await req.json()
  const cleanDomain = domain || '24hrplumbinghouston.com'
  const prettySlug = slug || cleanDomain.replace('.com','-com').replace(/\./g,'-')
  const previewLink = `https://venus-ai-v8.vercel.app/p/${prettySlug}`

  const htmlContent = `
<div style="margin:0;padding:0;background:#f6f6f6">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6;padding:40px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
<tr><td style="background:#0a0a0a;padding:32px;text-align:center">
<p style="margin:0;color:#c9a86a;letter-spacing:4px;font-size:11px">VENUS AI • LUXURY STUDIO</p>
<h1 style="margin:12px 0 0;color:#ffffff;font-size:24px;font-weight:700">${cleanDomain}<br/>rebuilt for 2026</h1>
</td></tr>
<tr><td style="padding:36px">
<p style="font-size:15px;color:#111">Hi ${cleanDomain} Team,</p>
<p style="font-size:15px;line-height:24px;color:#333">I audited <b>${cleanDomain}</b> — live since 2015. Mobile is slow and customers who want instant photo-quote leave.</p>
<p style="font-size:15px;line-height:24px;color:#333">I rebuilt it as private luxury preview — Apple white, not dark. Same business, $50k brand feel.</p>
<div style="text-align:center;margin:28px 0">
<a href="${previewLink}" style="background:#0a0a0a;color:#fff;padding:16px 32px;border-radius:100px;text-decoration:none;font-weight:700;display:inline-block">See Your Private Preview →</a>
</div>
<div style="background:#fafaf7;border:1px solid #eee;border-radius:12px;padding:20px">
<p style="margin:0;font-weight:700;font-size:14px">What changes:</p>
<ul style="margin:12px 0 0;padding-left:18px;line-height:26px;color:#222;font-size:14px">
<li><b>Photo → Quote → Booked</b> — leak photo, instant price</li>
<li><b>20-min booking</b> — Apple Pay, no phone tag</li>
<li><b>Google reviews</b> on autopilot</li>
</ul>
</div>
<div style="background:#0a0a0a;border-radius:12px;padding:20px;text-align:center;margin:24px 0">
<p style="margin:0;color:#c9a86a;letter-spacing:2px;font-size:11px">FOUNDER OFFER — THIS WEEK</p>
<p style="margin:8px 0;color:#fff;font-size:28px;font-weight:800">$497 <span style="font-size:16px;color:#666;text-decoration:line-through;font-weight:400">$1999</span></p>
<p style="margin:0;color:#888;font-size:12px">Live on your domain in 24h</p>
</div>
<p style="font-size:14px;color:#333">Reply YES and I'll push live to ${cleanDomain} this week.</p>
<p style="margin-top:24px;font-size:14px;color:#111">Ron — Venus AI<br/><span style="color:#666">Venusplaza7@gmail.com</span></p>
</td></tr>
</table>
</td></tr>
</table>
</div>
  `

  // YOUR BREVO SEND LOGIC HERE - use htmlContent as html
  // await fetch('https://api.brevo.com/v3/smtp/email', { body: JSON.stringify({ htmlContent }) })

  return NextResponse.json({ ok: true, previewLink, htmlContent })
}
