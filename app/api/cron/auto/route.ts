import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const NICHES = ["plumbers","roofers","lawyers","dentists","hvac"];
const CITIES = ["houston","dallas","austin","miami","la"];

export async function GET(req: Request){
  const key = new URL(req.url).searchParams.get("key");
  if(key !== process.env.CRON_SECRET && key !== "venus13") 
    return NextResponse.json({ok:false, error:"unauthorized - use ?key=venus13"}, {status:401});

  // 1. Pick lead
  const niche = NICHES[Math.floor(Math.random()*NICHES.length)];
  const city = CITIES[Math.floor(Math.random()*CITIES.length)];
  const slug = `${niche}-in-${city}-${Date.now()}`;
  const domain = `${city}${niche}pros.com`;
  const email = `contact@${domain}`;

  // 2. Send via Brevo
  const res = await fetch("https://api.brevo.com/v3/smtp/email",{
    method:"POST",
    headers:{ "api-key": process.env.BREVO_API_KEY!, "Content-Type":"application/json"},
    body: JSON.stringify({
      sender:{ email: process.env.SENDER_EMAIL || "venusplaza7@gmail.com", name:"Venus AI" },
      to:[{ email }],
      subject:`${city.toUpperCase()} ${niche} - Luxury site ready: /p/${slug}`,
      htmlContent:`<div style="font-family:serif"><h1>Luxury ${niche} site for ${city}</h1><p>Live preview: https://venus-ai-v8.vercel.app/p/${slug}</p><p>We built it for ${domain} - 24h delivery, $1500</p><p>Reply YES to claim.</p></div>`
    })
  });
  const brevo = await res.json();

  return NextResponse.json({
    ok:true,
    autonomous:true,
    sent_to: email,
    niche, city, slug,
    proposal_url: `https://venus-ai-v8.vercel.app/p/${slug}`,
    brevo_status: res.status,
    brevo_response: brevo,
    timestamp: new Date().toISOString(),
    next_in: "4 minutes"
  });
}
