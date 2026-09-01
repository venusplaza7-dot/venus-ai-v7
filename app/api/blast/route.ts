import { kv } from '@vercel/kv';
export const dynamic='force-dynamic';

const RESEND_KEY = process.env.RESEND_API_KEY!;
const WHATSAPP = '17865880578';

export async function GET(req: Request){
 return POST(req);
}

export async function POST(req: Request){
 try{
  let body:any={}; try{ body=await req.json(); }catch{ body={}; }
  const url=new URL(req.url);
  const niche=body.niche || url.searchParams.get('niche') || 'roofing';
  const city=body.city || url.searchParams.get('city') || 'houston';
  const limit=Number(body.limit || url.searchParams.get('limit') || 5);

  const ids = await kv.smembers(`leads:${city}:${niche}`) as string[];
  const toBlast = ids.slice(0, limit);
  let sent=0;

  for(let id of toBlast){
   const lead:any = await kv.get(`lead:${id}`);
   if(!lead || lead.status==='blasted') continue;

   const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi VENUS HQ7! Business: ${lead.business} Domain: ${lead.domain}`)}`;
   
   const html = `
   <div style="font-family:sans-serif;background:#000;color:#fff;padding:32px;max-width:600px">
    <div style="font-size:11px;letter-spacing:0.2em;opacity:0.5">VENUS HQ7 // WHO WE ARE // WHAT WE DO</div>
    <h1 style="font-size:32px;font-weight:800;line-height:0.9;margin-top:16px">WE FOUND YOUR OLD WEBSITE<br><span style="color:#888">in ${city.toUpperCase()}</span></h1>
    <div style="margin-top:24px;border:1px solid rgba(255,255,255,0.15);padding:20px;border-radius:16px;background:#0a0a0a">
     <div style="font-size:10px;opacity:0.5">WHO WE ARE</div>
     <p style="font-size:13px;line-height:1.6;color:rgba(255,255,255,0.7)">We are VENUS HQ7 - VENUS AI LAB - Gen-Z Luxury AI Agency. We rebuild old websites with AI.</p>
    </div>
    <div style="margin-top:16px;border:1px solid rgba(255,255,255,0.1);padding:20px;border-radius:16px;background:#111">
     <div style="font-size:10px;opacity:0.5">WHAT WE DO</div>
     <p style="font-size:13px;line-height:1.6">01 SCAN - Found ${lead.domain} history since 2008<br>02 REBUILT - AI Booking + SEO + Mobile + Speed</p>
    </div>
    <div style="margin-top:16px;background:#fff;color:#000;padding:20px;border-radius:16px">
     <div style="font-size:28px;font-weight:800">ORIGINAL <span style="text-decoration:line-through;opacity:0.5">$1997</span> -> $497</div>
     <p style="font-size:13px;margin-top:8px">For ${lead.business} - All 5 AI tools + Venus OS + Hosting + SSL included.</p>
     <a href="${lead.link}" style="display:block;margin-top:16px;height:48px;background:#000;color:#fff;border-radius:999px;line-height:48px;text-align:center;text-decoration:none;font-weight:700">View Live Demo</a>
     <a href="${waLink}" style="display:block;margin-top:10px;height:48px;background:#25D366;color:#000;border-radius:999px;line-height:48px;text-align:center;text-decoration:none;font-weight:700">Approve on WhatsApp</a>
    </div>
    <p style="font-size:11px;opacity:0.4;margin-top:16px">ID: ${id} - ${lead.domain} - ${lead.city.toUpperCase()} - Venus AI v8</p>
   </div>`;

   await fetch('https://api.resend.com/emails',{
     method:'POST',
     headers:{'Authorization':`Bearer ${RESEND_KEY}`,'Content-Type':'application/json'},
     body:JSON.stringify({
       from:'Venus HQ7 <activate@venus-ai-v8.vercel.app>',
       to:lead.email,
       subject:`We found ${lead.domain} - Rebuilt for ${lead.business} - $1997 -> $497 - 24H activation`,
       html
     })
   });

   lead.status='blasted';
   lead.blastedAt=Date.now();
   await kv.set(`lead:${id}`, lead);
   sent++;
  }

  return Response.json({ok:true,sent,niche,city,totalIds:ids.length});
 }catch(e:any){
  return Response.json({ok:false,error:e.message},{status:500});
 }
}
