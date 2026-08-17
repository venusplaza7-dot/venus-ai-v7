export const runtime='nodejs'; 
export const dynamic='force-dynamic';
import nodemailer from "nodemailer";

export async function GET(req:Request){
 const url=new URL(req.url);
 const count=parseInt(url.searchParams.get('count')||'10');
 const transporter=nodemailer.createTransport({
   service:"gmail",
   auth:{user:process.env.GMAIL_USER!, pass:process.env.GMAIL_APP_PASSWORD!}
 });

 const sites=[
  "http://www.bloodbrosbbq.com",
  "http://www.goodecompany.com",
  "http://www.theoriginalblacks.com",
  "http://www.smittymarket.com",
  "http://www.kreuzmarket.com",
  "http://www.snowbbq.com",
  "http://www.franklinbarbecue.com",
  "http://www.coopersoldtimepit.com",
  "http://www.pinkertonsbarbecue.com",
  "http://www.harrysoo.com"
 ];

 let sent=0;
 let logs:any[]=[];

 for(const site of sites.slice(0,count)){
  try{
   const r=await fetch(site,{headers:{"User-Agent":"Mozilla/5.0"}, signal:AbortSignal.timeout(8000)});
   const html=await r.text();
   let emails=html.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)||[];
   let email=emails.find(e=>!e.toLowerCase().includes('wix')&&!e.toLowerCase().includes('example')&&!e.includes('.png'))||null;

   if(!email){
    try{
     const r2=await fetch(site.replace(/\/$/,'')+'/contact',{headers:{"User-Agent":"Mozilla/5.0"}, signal:AbortSignal.timeout(5000)});
     if(r2.ok){
      const h2=await r2.text();
      const e2=h2.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)||[];
      email=e2.find(e=>!e.toLowerCase().includes('wix'))||null;
     }
    }catch{}
   }

   if(!email){ logs.push({site,status:"NO_EMAIL"}); continue; }

   await transporter.sendMail({
     from:`"Venus Plaza" <${process.env.GMAIL_USER}>`,
     to:email,
     subject:`Your website ${new URL(site).hostname} - quick question`,
     html:`<p>Hi team at ${new URL(site).hostname},</p><p>I was looking at ${site} and I built a faster AI version for you as a demo.</p><p>Want me to send the link?</p><p>- Venus<br>Venus AI Studio</p>`
   });
   sent++;
   logs.push({site,email,status:"SENT"});
  }catch(e:any){
   logs.push({site,error:e.message});
  }
 }
 return Response.json({MODE:`${count}_PER_HOUR_LIVE`, SENT:sent, logs, time:new Date().toISOString()});
}

export async function POST(req:Request){ return GET(req); }



