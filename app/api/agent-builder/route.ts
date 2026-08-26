import { kv } from '@vercel/kv';
export const dynamic = 'force-dynamic';
export async function GET(req: Request){
const url = new URL(req.url);
const site = url.searchParams.get('site');
if(!site) return Response.json({error:'need site'});
const slug = site.replace(/https?:\/\//,'').replace(/[^a-z0-9]/g,'-').toLowerCase();
const previewLink = 'https://venus-ai-v8.vercel.app/p/' + slug;
const preview = {
oldSite: site,
oldYear: url.searchParams.get('year') || '2015',
newSite: previewLink,
headline: site + ' Reborn 2026 Luxury',
status: 'preview_ready',
price: 497,
originalPrice: 1999
};
await kv.set('preview:' + slug, preview);
await kv.set('client:' + slug, {oldSite: site, slug: slug, email: url.searchParams.get('email'), paymentStatus:'pending', newSite: previewLink, oldYear: '2015', price: 497, originalPrice: 1999, status:'preview_ready'});
return Response.json({agent:'BUILDER', price:'497 intro was 1999', previewLink: previewLink});
}
