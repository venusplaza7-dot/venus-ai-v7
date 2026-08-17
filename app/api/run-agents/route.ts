import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({ ok: true, route: "run-agents", status: "fixed", time: new Date().toISOString() });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
