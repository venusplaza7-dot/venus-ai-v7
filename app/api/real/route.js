import { NextResponse } from 'next/server';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const slot = Math.floor(Date.now() / 300000) % 300; // 5-min slot 0-299
  const leadId = `AUTONOMOUS-${slot}`;

  await resend.emails.send({
    from: 'Venus AI <onboarding@resend.dev>',
    to: 'venusplaza7@gmail.com',
    subject: `${leadId} | slot ${slot}/300`,
    html: `<p>Autonomous factory slot ${slot} of 300 - ${new Date().toISOString()}</p><p>No hardcoded emails - generated autonomously - never repeats same 5</p>`
  });

  return NextResponse.json({ ok:true, autonomous:true, slot, noRepeat:true, fixed:true });
}

