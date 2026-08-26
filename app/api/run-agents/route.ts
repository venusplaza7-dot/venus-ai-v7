import { kv } from '@vercel/kv';
export const dynamic = 'force-dynamic';
export async function GET(req: Request){
const url = new URL(req.url);
const testEmail = url.searchParams.get('test') || url.searchParams.get('to');
const count = parseInt(url.searchParams.get('count') || '1');

// FAKE OLD SITE FOR TEST
const site = 'https://24hrplumbinghouston.com';
const slug = '24hrplumbinghouston-com';
const previewLink = `https://venus-ai-v8.vercel.app/p/${slug}`;
const oldSite = site;

// BUILD LUXURY EMAIL - This is what customer receives
const emailHtml = `
<div style="font-family:Arial; max-width:600px; margin:auto; background:white; color:black; padding:20px; border:1px solid #ddd">
<h1 style="color:#111">${site.replace('https://','')} - Your 2015 site is losing you money</h1>
<p>Hi, I found your site <a href="${oldSite}">${oldSite}</a> from ${2015} — it's still showing your old ${2015} design.</p>
<p><b>WHO:</b> Venus AI - we rebuild old sites into luxury AI-powered sites.</p>
<p><b>WHAT:</b> I rebuilt yours as luxury preview: <a href="${previewLink}">${previewLink}</a></p>
<p><b>WHY:</b> See OLD vs NEW: <a href="${oldSite}">${oldSite}</a> (old ${2015}) vs <a href="${previewLink}">${previewLink}</a> (new 2026 luxury with AI)</p>
<div style="background:#f9f9f9; padding:15px; margin:20px 0">
<h3>Your New Site Includes:</h3>
<ul>
<li>✅ AI Booking Assistant (24/7)</li>
<li>✅ AI Chat Support</li>
<li>✅ AI Review Booster</li>
<li>✅ AI SEO Engine</li>
</ul>
</div>
<p style="font-size:18px"><b>Introductory Offer: $497</b> <span style="text-decoration:line-through; color:#888">Original $1999</span> - For first 20 clients only</p>
<p><a href="${previewLink}" style="background:black; color:white; padding:12px 24px; text-decoration:none; display:inline-block">See Your Luxury Preview Now</a></p>
<p>Reply YES and I will activate it for $497 (was $1999) in 24 hours.</p>
<p>— Ron, Venus AI</p>
</div>
`;

if(testEmail){
  // Send via Brevo
  await fetch('https://api.brevo.com/v3/smtp/email',{
    method:'POST',
    headers:{'api-key': process.env.BREVO_API_KEY as string, 'Content-Type':'application/json'},
    body: JSON.stringify({
      sender:{name:'Venus AI - Ron', email:'ron@venusplaza.com'},
      to:[{email:testEmail}],
      subject:`${site} - Your 2015 site rebuilt as luxury (Was $1999, Now $497)`,
      htmlContent: emailHtml
    })
  });
  return Response.json({sent:true, to:testEmail, preview: previewLink, emailPreview: 'Check your inbox'});
}

return Response.json({info:'Add ?test=venusailux@gmail.com to send sample to yourself', sampleHtml: emailHtml, previewLink});
}
