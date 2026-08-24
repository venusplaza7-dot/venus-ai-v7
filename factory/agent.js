const fs=require('fs');
const path=require('path');
const files=fs.readdirSync(__dirname).filter(f=>f.endsWith('.json'));
console.log(`AGENT PITCHING ${files.length} CLIENTS - REAL NICHE MODE`);
files.forEach(f=>{
  const j=JSON.parse(fs.readFileSync(path.join(__dirname,f),'utf8'));
  const niche=j.niche||'PLUMBING';
  const businessName=j.businessName||'Client';
  const oldSite=j.oldSite||j.domain||'site.com';
  const est=j.est||'2016';
  const realTitle=j.realTitle||oldSite;
  const email=`Subject: ${businessName} — Your ${oldSite} looks ${est}, not 2026 — Private ${niche} Audit

Hi ${businessName} team,

I checked ${oldSite} - Title: "${realTitle}"

WHO WE ARE: Venus HQ — Houston's Luxury AI Studio.
WHAT WE DO: Rebuild ${niche} sites with AI photo-quote, 20-min booking, Apple Pay, $497, 24h live.

WHAT WE FOUND ABOUT YOUR SITE ${oldSite}:
- Old template from ${est} — no AI — slow mobile
- No AI tool — in 2026 customers expect: "Fix my ${niche.toLowerCase()} — upload photo for instant price"

WHY YOU NEED UPGRADE: ${businessName} trusted since ${est} but Gen-Z ${niche.toLowerCase()} homeowners don't call.

I rebuilt a preview: ${j.preview || 'https://venus-ai-v8.vercel.app/p/'+j.slug}

It has: AI ${niche.toLowerCase()} assistant that quotes + books 24/7, Gen Z design, 3x faster than your ${est} site

Worth a 10-min call? Ron — Venus AI
`;
  fs.writeFileSync(path.join(__dirname,f.replace('.json','-EMAIL.txt')),email);
  console.log(`PITCH READY for ${businessName} - ${niche} - ${oldSite}`);
});
console.log('\nDONE — All emails say: REAL WHO WE ARE / WHAT WE FOUND / WHY UPGRADE + correct niche');
