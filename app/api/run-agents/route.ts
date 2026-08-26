import { kv } from '@vercel/kv';
export const dynamic = 'force-dynamic';
export async function GET(req: Request){
const url = new URL(req.url);
const to = url.searchParams.get('test') || 'venusailux@gmail.com';
const oldSite = 'https://24hrplumbinghouston.com';
const newSite = 'https://venus-ai-v8.vercel.app/p/24hrplumbinghouston-com';
const html = '<div style="font-family:Arial;max-width:600px;margin:auto;background:white;color:black;padding:20px"><h1>24hrplumbinghouston.com - Your 2015 site is losing you money</h1><p>Hi, I found your site ' + oldSite + ' from 2015</p><p>WHO: Venus AI rebuilds old sites</p><p>WHAT: Luxury preview: ' + newSite + '</p><p>WHY: OLD ' + oldSite + ' vs NEW ' + newSite + '</p><p>AI Tools: Booking, Chat, Review, SEO</p><p><b>Intro 497 was 1999</b></p><p><a href="' + newSite + '">See Preview Now</a></p><p>- Ron, Venus AI</p></div>';
const res = await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key': process.env.BREVO_API_KEY as string,'Content-Type':'application/json'},body: JSON.stringify({sender:{name:'Venus AI',email:'Venusplaza7@gmail.com'},to:[{email:to}],subject:'Your 2015 site rebuilt luxury Was 1999 Now 497',htmlContent:html})});
const data = await res.json();
return Response.json({sent:true,from:'Venusplaza7@gmail.com',to:to,brevo:data});
}

Commit -> Ready -> then open:
/api/run-agents?test=venusailux@gmail.com
