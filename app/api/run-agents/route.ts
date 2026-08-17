mport { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "route_fixed", 
    sent: 0, 
    now: new Date().toISOString() 
  });
}

