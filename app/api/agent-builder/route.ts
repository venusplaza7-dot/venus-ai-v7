import { kv } from '@vercel/kv';
export const dynamic = 'force-dynamic';
export async function GET(req: Request){
const url = new URL(req.url);
const site = url.searchParams.get('site');
if(!site) return Response.json({error:'need ?site=https://...'});
const slug = site.replace(/https?:\/\//,'').replace(/[^a-z0-9]/g,'-').toLowerCase();
const preview = {
oldSite: site,
oldYear: url.searchParams.get('year') || '2015',
newSite: `https://venus-ai-v8.vercel.app/p/${slug}`,
headline: `${site.replace('https://','')} - Reborn 2026 Luxury - Was $1999 Now $497`,
aiTools: ['AI Booking Assistant','AI Chat Support','AI Review Booster','AI SEO Engine'],
status: 'preview_ready',
price: 497,
originalPrice: 1999,
introOffer: 'Introductory $497 for first 20 clients only - Original $1999'
};
await kv.set(`preview:${slug}`, preview);
await kv.set(`client:${slug}`, {...preview, slug, email: url.searchParams.get('email'), paymentStatus:'pending', createdAt: new Date().toISOString()});
return Response.json({agent:'BUILDER', price:'$497 intro (was $1999)', previewLink: preview.newSite, data: preview});
