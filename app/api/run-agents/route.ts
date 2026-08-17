export const runtime = 'nodejs'; export const dynamic = 'force-dynamic';
import nodemailer from "nodemailer";

function isOutdated(html:string){
  const m = html.match(/©|copyright[^0-9]*((?:19|20)\d{2})/i);
  const y = m? parseInt(m[1]) : 0;
  return y>0 && y<=2015;
}

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const count = parseInt(searchParams.get('count')||'10');

  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{ user: process.env.GMAIL_USER!, pass: process.env.GMAIL_APP_PASSWORD! }
  });

  const allSites = ["http://www.bloodbrosbbq.com","http://truthbbq.com","http://www.goodecompany.com","http://www.harrysoo.com","http://www.pinkertonsbarbecue.com","http://www.theoriginalblacks.com","http://www.coopersoldtimepit.com","http://www.smittymarket.com","http://www.kreuzmarket.com","http://www.snowbbq.com","http://www.franklinbarbecue.com","http://www.laBarbecue.com"];

  let sent=0, found=0; const logs:any[]=[];

  for(const site of allSites.slice(0,count)){
    try{
      const r = await fetch(site,{headers:{"User-Agent":"Mozilla/5.0"}, signal: AbortSignal.timeout(8000)});
      const html = await r.text();
      if(!isOutdated(html)){ logs.push({site, status:"NOT OUTDATED - SKIP"}); continue; }

      let contactHtml=html;
      try{ const r2=await fetch(site.replace(/\/$/,'')+'/contact',{signal: AbortSignal.timeout(5000)}); if(r2.ok) contactHtml+=await r2.text(); }catch{}
      const email = (contactHtml.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)||[]).find(e=>!e.includes('example')&&!e.includes('wix')) || null;

      if(!email){ logs.push({site, status:"OUTDATED BUT NO EMAIL"}); continue; }
      found++;

      await transporter.sendMail({
        from:`"Venus Plaza" <${process.env.GMAIL_USER}>`,
        to: email,
        subject:`Your site ${new URL(site).hostname} - copyright ${html.match(/©.*?(\d{4})/)?.[1]||'2015'}`,
        html:`<p>Hi, saw ${site} footer still shows ${html.match(/©.*?(\d{4})/)?.[1]||'2015'} - I build AI sites. Made a demo for you.</p>`
      });
      sent++; logs.push({site, REAL_EMAIL:email, status:"EMAILED"});
    }catch(e:any){ logs.push({site, error:e.message}); }
  }

  return Response.json({ MODE:`${count} SITES PER HOUR`, REAL_OUTDATED_FOUND:found, REAL_SENT:sent, logs, time:new Date().toISOString() });
}
export async function POST(req: Request){ return GET(req); }



