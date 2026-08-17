import nodemailer from "nodemailer";
export async function POST(req: Request) {
  const body = await req.json();
  const toEmail = body.testEmail || "ve9us1@gmail.com";
  const html = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head><body style="margin:0;background:#f5f5f5;font-family:Arial;">
<div style="max-width:600px;margin:0 auto;background:white;">
<div style="padding:40px;border-bottom:1px solid #eee;font-size:10px;letter-spacing:3px;color:#999;">VENUS AI STUDIO — PRIVATE PROPOSAL</div>
<div style="padding:60px 40px;"><h1 style="font-size:30px;font-weight:300;margin:0;color:black;">Your new website<br><b>is ready for review.</b></h1><p style="color:#666;font-size:14px;margin-top:20px;">Three refined concepts prepared for your consideration. Please select your preferred direction.</p></div>
<div style="padding:0 40px 40px 40px;">
<div style="border:1px solid black;padding:30px;margin-bottom:15px;"><div style="font-size:10px;color:#999;letter-spacing:2px;">CONCEPT 01 — HOUSTON</div><div style="font-size:18px;font-weight:600;margin:10px 0;">Houston Elite Plumber</div><a href="https://venus-agent-hq.vercel.app/demo/houston-elite-plumber" style="display:block;background:black;color:white;text-align:center;padding:15px;text-decoration:none;font-size:11px;letter-spacing:2px;">VIEW LIVE PROPOSAL →</a></div>
<div style="border:1px solid black;padding:30px;margin-bottom:15px;"><div style="font-size:10px;color:#999;letter-spacing:2px;">CONCEPT 02 — JEDDAH</div><div style="font-size:18px;font-weight:600;margin:10px 0;">Jeddah Luxury Salon</div><a href="https://venus-agent-hq.vercel.app/demo/jeddah-luxury-salon" style="display:block;background:black;color:white;text-align:center;padding:15px;text-decoration:none;font-size:11px;letter-spacing:2px;">VIEW LIVE PROPOSAL →</a></div>
<div style="border:1px solid black;padding:30px;margin-bottom:15px;"><div style="font-size:10px;color:#999;letter-spacing:2px;">CONCEPT 03 — RIYADH</div><div style="font-size:18px;font-weight:600;margin:10px 0;">Riyadh Premium Cafe</div><a href="https://venus-agent-hq.vercel.app/demo/riyadh-premium-cafe" style="display:block;background:black;color:white;text-align:center;padding:15px;text-decoration:none;font-size:11px;letter-spacing:2px;">VIEW LIVE PROPOSAL →</a></div>
</div>
<div style="background:black;color:white;padding:40px;text-align:center;"><div style="font-size:16px;">Reply via WhatsApp to launch within 24 hours.</div><div style="margin-top:10px;font-size:11px;color:#666;">+1 (786) 588-0578</div></div>
</div></body></html>`;
  const user = process.env.GMAIL_USER || "Venusplaza7@gmail.com";
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS;
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  const info = await transporter.sendMail({ from: user, to: toEmail, subject: "Your Website Proposal — Ready for Review", html });
  return Response.json({ success: true });
}
export async function GET(){ return Response.json({ ok: true }); }


