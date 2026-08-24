import { NextResponse } from 'next/server';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

function generateLead(n) {
  const niches = ["PLUMBING","ROOFING","ELECTRICAL","HVAC","PAINTING","LANDSCAPING"];
  const cities = ["Houston","Dallas","Austin","San Antonio","Fort Worth"];
  return {
    id: n,
    business: `Business ${n} ${cities[n%5]} ${niches[n%6]}`,
    niche: niches[n%6],
    email: `contact${n}@business${n}.com`
  };
}
