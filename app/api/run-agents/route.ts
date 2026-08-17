export const runtime='nodejs'; export const dynamic='force-dynamic';
import nodemailer from "nodemailer";

const USA_SITES=["https://www.bloodbrosbbq.com","https://www.goodecompany.com","https://www.truthbbq.com","https://www.franklinbarbecue.com","https://www.snowbbq.com"];
const KSA_SITES=["https://www.albaik.com","https://www.kudu.com.sa","https://www.herfy.com","https://www.alromansiah.com.sa","https://www.barncafe.com"];

const GENERIC=["info@","support@","admin@","sales@","hello@","contact@","info@","noreply@"];

function extractRealEmails(html:string, domain:string){
  const all=(html.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)||[]).map(e=>e.toLowerCase());
  const unique=[...new Set(all)].filter(e=>e.includes(domain.replace('www.','').split('/')[0]) ||!e.includes('wix')&&!e.includes('gmail')&&!e.includes('sentry'));
  // Prefer personal: not in GENERIC list
  const personal=unique.find(e=>!GENERIC.some(g=>e.startsWith(g)));
  return personal || unique.find(e=>!e.startsWith('info@')) || unique[0] || null;
}

export async function GET(req:Request){
 const count=parseInt(new URL(req.url).searchParams.get('count')||'10');
 const region=new URL(req.url).searchParams.get('region')||'USA'; //?region=KSA
 const sites=region==='KSA'?KSA_SITES:USA_SITES;
 const transporter=nodemailer.createTransport({service:"gmail", auth:{user:process.env.GMAIL_USER!, pass:process.env.GMAIL_APP_PASSWORD!}});
 let sent=0, logs:any[]=[];

 for(const site of sites.slice(0,count)){
  try{
   let htmlAll="";
   for(const path of ['','/contact','/contact-us','/about','/about-us']){
     try{ const r=await fetch(site+path,{headers:{"User-Agent":"Mozilla/5.0"}, signal:AbortSignal.timeout(6000)}); if(r.ok) htmlAll+=await r.text()+"\n"; }catch{}
   }
   const domain=new URL(site).hostname;
   const realEmail=extractRealEmails(htmlAll, domain);
   if(!realEmail){ logs.push({site,status:"NO_REAL_EMAIL_FOUND_SKIPPED_INFO"}); continue; }
   if(realEmail.startsWith('info@')){ logs.push({site,email:realEmail,status:"SKIPPED_BECAUSE_INFO"}); continue; }

   await transporter.sendMail({
     from:`"Venus Plaza" <${process.env.GMAIL_USER}>`,
     to:realEmail,
     subject:`${domain} - quick idea`,
     html:`<p>Hi, I saw ${site} - I rebuilt a faster version for you. Can I send demo?</p><p>- Venus</p>`
   });
   sent++; logs.push({site,email:realEmail,status:"SENT_REAL"});
  }catch(e:any){ logs.push({site,error:e.message}); }
 }
 return Response.json({MODE:`${region}_REAL_OWNER_NO_INFO`, SENT:sent, logs, time:new Date().toISOString()});
}
export async function POST(r:Request){ return GET(r); }
