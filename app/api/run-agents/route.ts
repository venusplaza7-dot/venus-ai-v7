export const runtime='nodejs'; export const dynamic='force-dynamic'; export const maxDuration=300;
import nodemailer from "nodemailer";
import sites from "./sites500.json";

function getProposal(site:string, email:string){
 // Proposal according to their site - which we approved
 const isRest = site.includes("rest")||site.includes("bbq")||site.includes("food");
 const isClinic = site.includes("clinic")||site.includes("dental");
 const isSalon = site.includes("salon")||site.includes("beauty");

 if(isRest) return `Hi, I saw ${site} - your menu is old images. I can build you online ordering + AI booking. We built 40+ restaurant sites. Want demo?`;
 if(isClinic) return `Hi, I saw ${site} - patients can't book online. I can build AI appointment + WhatsApp.`;
 if(isSalon) return `Hi, I saw ${site} - no online booking. I can build booking system + Instagram sync.`;
 return `Hi, I saw ${site} (${email}) - your site is 10 years old. I can rebuild modern + mobile + AI chat. We approved proposal attached.`;
}

async function scrape(site:string){
 let html="";
 for(const p of ["","/contact","/about"]){
   try{
     const r = await fetch(`http://${site}${p}`, {headers:{"User-Agent":"Mozilla/5.0"}, signal:AbortSignal.timeout(8000)});
     if(r.ok) html+=await r.text();
   }catch{}
 }
 const m = html.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || [];
 return [...new Set(m)].filter(e=>!e.includes(".png")&&!e.includes("wix")).slice(0,3);
}

export async function GET(req:Request){
 const url = new URL(req.url);
 const batch = parseInt(url.searchParams.get("batch")||"0"); // 0-19
 const PER_RUN = 25; // 25 sites x 20 runs = 500 daily

 const batchSites = sites.slice(batch*PER_RUN, (batch+1)*PER_RUN);
 const transport = nodemailer.createTransport({service:"gmail", auth:{user:process.env.GMAIL_USER!, pass:process.env.GMAIL_APP_PASSWORD!}});

 let sent=0, skipped=0, logs:any[]=[];
 for(const site of batchSites){
   try{
     const emails = await Promise.race([scrape(site), new Promise<string[]>((_,r)=>setTimeout(()=>r(new Error("5min")), 30000))]) as string[];
     if(emails.length===0){ skipped++; logs.push({site, status:"SKIP"}); continue; }

     const to = emails[0];
     const proposal = getProposal(site, to);

     await transport.sendMail({
       from:`Venus AI Studio <${process.env.GMAIL_USER}>`,
       to,
       subject:`Your website ${site} - Proposal ready`,
       html:`<div><p>${proposal}</p><p>Demo: https://venus-ai-studio.com/demo?site=${site}</p><p>Venus Plaza<br>venus-ai-studio.com</p></div>`
     });
     sent++; logs.push({site, to, status:"SENT"});
   }catch{ skipped++; }
 }

 return Response.json({BATCH:batch, ATTEMPTED:batchSites.length, SENT:sent, SKIPPED:skipped, TOTAL_TARGET:"500/day => 450 sends", logs});
}




