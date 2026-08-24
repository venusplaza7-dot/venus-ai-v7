mport { NextResponse } from 'next/server';
import { Resend } from 'resend';
import leads from '../../../data/leads.json';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const lead = leads.find(l =>!l.sent) || leads[0]; // autonomous pick next unsent

  await resend.emails.send({
    from: 'Venus AI <onboarding@resend.dev>',
    to: 'venusplaza7@gmail.com',
    subject: `Autonomous lead: ${lead.business}`,
    html: `Factory picked this autonomously: ${lead.business} - ${lead.niche} - ${lead.email}`
  });

  return NextResponse.json({ ok:true, autonomous:true, picked: lead });
}
