import { NextResponse } from 'next/server';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
export async function GET() {
  const slot = Math.floor(Date.now() / 300000) % 300;
  await resend.emails.send({
    from: 'Venus AI <onboarding@resend.dev>',
    to: 'venusplaza7@gmail.com',
    subject: `AUTONOMOUS slot ${slot}/300 fixed no repeat`,
    html: `<p>Fixed autonomous slot ${slot} - ${new Date().toISOString()}</p>`
  });
  return NextResponse.json({ ok:true, autonomous:true, slot, fixed:true });
}
