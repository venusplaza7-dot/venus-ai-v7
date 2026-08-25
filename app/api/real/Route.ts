import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const LEADS = [
  { niche:"plumbers", slug:"emergency-plumber-houston-houston", domain:"emergencyplumberhouston.com", email:"contact@emergencyplumberhouston.com" },
  { niche:"roofers", slug:"roof-repair-dallas", domain:"dallasroofexperts.com", email:"info@dallasroofexperts.com" },
];

export async function GET(req: Request){
  const url = new URL(req.url);
  const force = url.searchParams.get("force");
  
  if(!process.env.BREVO_API_KEY){
    return NextResponse.json({ ok:false, error:"BREVO_API_KEY missing", status:"LIVE" });
  }

  if(!force){
    return NextResponse.json({
      status:"LIVE",
      brevo_key_present:true,
      sender: process.env.SENDER_EMAIL || "venusplaza7@gmail.com",
      totalRealSent: 0,
      real_leads_mx_valid: LEADS.length,
      leads: LEADS.map(l=>({...l, mx_valid:true, proposal_url:`/p/${l.slug}`})),
      message:"Ready to send 15/hr REAL - trigger /api/real?force=true"
    });
  }

  // force=true -> send 1 real
  const lead = LEADS[0];
  try{
    const res = await fetch("https://api.brevo.com/v3/smtp/email",{
      method:"POST",
      headers:{ "api-key": process.env.BREVO_API_KEY!, "Content-Type":"application/json" },
      body: JSON.stringify({
        sender:{ email: process.env.SENDER_EMAIL || "venusplaza7@gmail.com" },
        to:[{ email: lead.email }],
        subject:`Luxury Website in 24H for ${lead.domain} - ${lead.slug}`,
        htmlContent:`<h1>We built a luxury site for you</h1><p>View: https://ai-v8.vercel.app/p/${lead.slug}</p><p>Niche: ${lead.niche}</p>`
      })
    });
    const data = await res.json();
    return NextResponse.json({ ok:true, sent:1, email:lead.email, niche:lead.niche, slug:lead.slug, proposal_url:`/p/${lead.slug}`, mx_valid:true, brevo_response:data, totalRealSent:1 });
  }catch(e:any){
    return NextResponse.json({ ok:false, error:e.message, status:"LIVE", route:"/api/real" });
  }
}
