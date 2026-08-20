import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    let raw = fs.readFileSync(path.join(process.cwd(),'site500.json'),'utf8');
    let sites = JSON.parse(raw);
    sites = sites.filter((s:any)=> s.domain && !s.domain.includes('example'));
    
    return NextResponse.json({
      ok: true,
      total: sites.length,
      message: "5 Agents Ready",
      leads: sites.slice(0,3),
      liveSites: ["houston-elite-plumber is in app/live/ - push it!"]
    });
  } catch(e:any){
    return NextResponse.json({ok:false, error:e.message}, {status:500});
  }
}



