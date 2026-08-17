export const runtime='nodejs'; export const dynamic='force-dynamic';
import nodemailer from "nodemailer";

const SITES=[
 "https://www.joesautobodytx.com","https://www.alfalab.com.sa","https://www.tariqglass.com",
 "https://www.texasautoworx.com","https://www.saudieng.com","https://www.dallastxroofing.com",
 "https://www.jeddahclean.com","https://www.almajdouie.com.sa"
];

export async function GET(req:Request){
 const transporter=nodemailer.createTransport({service:"gmail", auth:{user:process.env.GMAIL_USER!, pass:process.env.GMAIL_APP_PASSWORD!}});
 let sent=0, logs:any[]=[];
 for(const site of SITES.slice(0,3)){
  try{
   const html=await (await fetch(site,{headers:{"User-Agent":"Mozilla/5.0"}})).text();
   const emails=[...new Set(html.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)||[])].filter(e=>!e.includes('wix')&&!e.toLowerCase().includes('example'));
   const real=emails.find(e=>!e.startsWith('info@')&&!e.startsWith('support@')) || emails[0];
   if(!real){ logs.push({site,status:"HIDDEN"}); continue; }
   await transporter.sendMail({from:`Venus <${process.env.GMAIL_USER}>`, to:real, subject:`${new URL(site).hostname} site`, html:`Hi, I saw ${site} needs update - can I send demo?`});
   sent++; logs.push({site,to:real,status:"SENT_REAL_OWNER"});
  }catch(e:any){ logs.push({site,error:e.message}); }
 }
 return Response.json({SENT:sent, logs, CHECK_GMAIL_SENT_NOW:true});
}
export async function POST(r:Request){ return GET(r); }




