import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const approve = searchParams.get('approve') === 'true';
  const statePath = path.join(process.cwd(), 'public', 'agent-state.json');
  let state = { approved: false, sentTonight: 0, lastSentAt: 0, lastDate: new Date().toDateString() };
  if(fs.existsSync(statePath)) state = JSON.parse(fs.readFileSync(statePath,'utf8'));
  
  state.approved = approve;
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));

  return NextResponse.json({ok:true, approved: approve, message: approve ? "APPROVED - Agents will now send 1 proposal every 5 min, max 275/night" : "REJECTED - Send new sample"});
}












