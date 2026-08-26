import { kv } from '@vercel/kv';
export const dynamic = 'force-dynamic';

export async function GET(req:Request){
  const url = new URL(req.url);
  const site = url.searchParams.get('site');
  if(!site) return Response.json({ error: 'need?site=https://...' });

  const slug = site.replace(/https?:\/\//,'').replace(/[^a-z0-9]/g,'-').toLowerCase();
  const lead = { site, slug, year: url.searchParams.get('year') || '2015' };

  // BUILD LUXURY DATA WITH MAX INFO FROM OLD SITE
  const preview = {
    oldSite: site,
    oldYear: lead.year,
    newSite: `https://venus-ai-v8.vercel.app/p/${slug}`,
    headline: `${site.replace('https://','')} — Reborn 2026 Luxury`,
    aiTools: [
      { name: 'AI Booking Assistant', desc: 'Books jobs 24/7 while you sleep, +40% leads' },
      { name: 'AI Chat Support', desc: 'Answers pricing, hours, FAQs instantly' },
      { name: 'AI Review Booster', desc: 'Auto-asks happy clients for Google reviews' },
      { name: 'AI SEO Engine', desc: 'Ranks you for "near me" searches' }
    ],
    comparison: { old: `Old © ${lead.year} — slow, not mobile, no booking`, new: 'New 2026 — 1.2s load, luxury, AI booking' },
    status: 'preview_ready',
    price: 199
  };
  await kv.set(`preview:${slug}`, preview);
  await kv.set(`client:${slug}`, {...preview, email: url.searchParams.get('email'), paymentStatus: 'pending', createdAt: new Date().toISOString() });

  return Response.json({ agent: 'BUILDER', previewLink: preview.newSite, data: preview });
}





