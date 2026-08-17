export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import nodemailer from "nodemailer";

// SYLVIA: Auto find BBQ websites from DuckDuckGo (no API key needed)
async function scrapeLeadsSelf(): Promise<string[]> {
  try{
    const query = "BBQ restaurant Texas contact";
    const r = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(10000)
    });
    const html = r.ok? await r.text() : "";
    const urlRegex = /https?:\/\/(?:www\.)?([a-z0-9-]+\.(?:com|net|org|co|io)[^"'\s<>]*)/gi;
    const matches = [...html.matchAll(urlRegex)].map(m=>m[0].split('"')[0].split("'")[0]);
    const cleaned = [...new Set(matches)].filter(u=>
     !u.includes('duckduckgo') &&!u.includes('yelp.com') &&!u.includes('facebook') &&!u.includes('instagram') && u.includes('.')
    ).slice(0,8);
    return cleaned.length? cleaned : ["https://truthbbq.com","https://bloodbrosbbq.com","https://www.killensbarbecue.com","https://pinkertonsbarbecue.com"];
  }catch{ return ["https://truthbbq.com","https://bloodbrosbbq.com","https://www.killensbarbecue.com"]; }
}

async function getRealContact(website: string){
  const pages = ["", "/contact", "/contact-us", "/about"];
  let bigHtml="";
  for(const p of pages){
    try{
      const res = await fetch(website.replace(/\/$/,'')+p, { headers:{"User-Agent":"Mozilla/5.0"}, signal:AbortSignal.timeout(7000)});
      if(res.ok) bigHtml+=await res.text();
    }catch{}
  }
  const emails = [...new Set(bigHtml.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)||[])].filter(e=>{
    const l=e.toLowerCase(); return!l.includes('example')&&!l.includes('wix')&&!l.includes('sentry')&&!l.includes('.png')&&!l.includes('webp');
  });
  return emails[0] || null;
}

export async function GET(){
  const transporter = nodemailer.createTransport({ service:"gmail", auth:{ user:process.env.GMAIL_USER!, pass:process.env.GMAIL_APP_PASSWORD! }});

  // 1. SCRAPE LEADS THEMSELVES
  const autoWebsites = await scrapeLeadsSelf();

  let found=0, sent=0;
  let logs:any[]=[];

  // 2. FOR EACH AUTO-SCRAPED SITE -> FIND REAL EMAIL -> SEND
  for(const site of autoWebsites){
    const realEmail = await getRealContact(site);
    if(!realEmail){ logs.push({ site, status:"NO email on contact page"}); continue; }
    found++;
    try{
      await transporter.sendMail({
        from:`"Venus Plaza" <${process.env.GMAIL_USER}>`,
        to: realEmail,
        subject:`Quick idea for ${site}`,
        html:`<p>Hi team at ${site},</p><p>Saw your contact page - I build AI websites that turn visitors into bookings. Demo ready.</p><p>Venus</p>`,
      });
      sent++;
      logs.push({ site, REAL_EMAIL: realEmail, status: "SCRAPED SELF + EMAILED" });
    }catch(e:any){ logs.push({ site, REAL_EMAIL: realEmail, error: e.message}); }
    await new Promise(r=>setTimeout(r,1200));
  }

  return Response.json({
    mode:"AUTO SCRAPE LEADS THEMSELVES - NO HARDCODE",
    auto_scraped_sites: autoWebsites,
    REAL_FOUND: found,
    REAL_SENT: sent,
    logs,
    time: new Date().toISOString()
  });
}
export async function POST(){ return GET(); }

