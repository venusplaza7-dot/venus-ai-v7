export async function GET(){return Response.json({count:0,mode:'SMART scrape+ping'});} export async function POST(req:Request){const d=await req.json(); return Response.json({success:true,to:d.to});}
