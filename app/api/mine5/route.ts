import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(){
  const res = await fetch(`${process.env.VERCEL_URL? 'https://'+process.env.VERCEL_URL : 'https://venus-ai-v8.vercel.app'}/api/real?action=mine5`);
  const data = await res.json();
  return NextResponse.json(data);
}
