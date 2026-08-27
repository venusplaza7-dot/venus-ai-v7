mport { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

// In-memory kill switch
let KILLED = true;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const action = url.searchParams.get('action');

  if (action === 'clear') {
    KILLED = true;
    return NextResponse.json({ status: 'CLEARED', message: 'Loop killed, no more emails to ve9us1' });
  }

  if (KILLED) {
    return NextResponse.json({ status: 'STOPPED', message: 'Real blast is stopped. Use ?action=clear done' });
  }

  return NextResponse.json({ status: 'IDLE' });
}

export async function POST(req: Request) {
  return GET(req);
}
