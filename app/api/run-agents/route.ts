import { kv } from '@vercel/kv'
export const dynamic = 'force-dynamic'
export async function GET(req: Request){
const url = new URL(req.url)
const to = 'venusailux@gmail.com'
const from = 'Venusplaza7@gmail.com'
const oldSite = 'https://24hrplumbinghouston.com'
const newSite = 'https://venus-ai-v8.vercel.app/p/24hrplumbinghouston-com'
const html = '<h1>Your 2015 site rebuilt</h1><p>OLD: ' + oldSite + '</p><p>NEW: ' + newSite + '</p><p>AI Tools: Booking Chat Review SEO</p><p>Price: 497 was 1999</p><a href="' + newSite + '">See Preview</a>'
const r = await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key': process.env.BREVO_API_KEY as string,'Content-Type':'application/json'},body: JSON.stringify({sender:{name:'Venus AI',email:from},to:[{email:to}],subject:'Your site rebuilt Was 1999 Now 497',htmlContent:html})})
const j = await r.json()
return Response.json({sent:true,to:from,to2:to,brevo:j})
}
