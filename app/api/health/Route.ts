import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(){
  return NextResponse.json({
    status: "LIVE",
    time: new Date().toISOString(),
    brevo_key_present: !!process.env.BREVO_API_KEY,
    sender: process.env.SENDER_EMAIL || "venusplaza7@gmail.com",
    routes: ["/api/health","/api/real","/api/leads"],
    totalRealSent: 0,
    message: "v9 self-healing active - use /api/real?force=true to send"
  });
}
