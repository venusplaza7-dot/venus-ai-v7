
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const dynamic = 'force-dynamic';

export async function GET() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD }
  });

  const leads = [
    { company: "ABC Roofing", email: "info@abc-roofing-houston.com", demo: "https://venus-agent-hq.vercel.app/demos/abc-roofing" }
  ];

  let sent = 0;
  for (const lead of leads) {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: lead.email, // In production: lead.email
      subject: `I rebuilt ${lead.company} - AI version (+ chatbot)`,
      html: `
        <p>Hi ${lead.company} team,</p>
        <p>I found your site from 2015 - amazing work!</p>
        <p>I rebuilt it with 2025 AI features:</p>
        <p>✅ AI Chatbot that books jobs at 2AM<br/>
        ✅ Instant Estimator - customer gets quote in 30 sec<br/>
        ✅ Mobile-first, premium design<br/>
        ✅ Online booking</p>
        <p><b>Live preview:</b> <a href="${lead.demo}">${lead.demo}</a></p>
        <p>Old: 2015, no booking. New: 2025, 3x more leads.</p>
        <p>Can I show you 2 min on call tomorrow? $2.5K one-time, I keep all your content.</p>
        <p>- Ron<br/>Venus Plaza<br/>venus-agent-hq.vercel.app</p>
      `
    });
    sent++;
  }

  return NextResponse.json({ success: true, agent: "OUTREACH Rico", sent: sent, auto: "You only reply to replies!" });
}
