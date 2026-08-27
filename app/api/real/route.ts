import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const BREVO_KEY = process.env.BREVO_API_KEY || '';
const QUEUE_KEY = 'venus_real_queue_v1';
const BASE = 'https://venus-ai-v8.vercel.app';

type Lead = { business: string; domain: string; realEmail: string; city: string; cat: string; };

async function getQueue(): Promise<Lead[]> {
  try {
    const q = await kv.get<Lead[]>(QUEUE_KEY);
    return q || [];
  } catch { return []; }
}

async function setQueue(q: Lead[]) {
  try { await kv.set(QUEUE_KEY, q); } catch {}
}

function luxuryHtml(biz: string, cat: string) {
  const demoLink = `${BASE}/p/${encodeURIComponent(biz.toLowerCase().replace(/[^a-z0-9]+/g,'-'))}`;
  const trackOpen = `${BASE}/api/track?event=open&cat=${cat}`;
  const trackClick = `${BASE}/api/track?event=click&cat=${cat}&url=${encodeURIComponent(demoLink)}`;
  const isTrade = ['roofers','plumbers','electricians'].includes(cat);
  return `
<div style="font-family:Inter,Helvetica,Arial,sans-serif;background:#050505;color:#fff;padding:0;margin:0">
<div style="max-width:600px;margin:0 auto;background:#0a0a0a;border:1px solid #1f1f1f">
<div style="padding:28px 32px;border-bottom:1px solid #1f1f1f">
<div style="font-size:11px;letter-spacing:3px;color:#666;font-weight:700">VENUS HQ • LAHORE</div>
<h1 style="font-size:26px;line-height:1.1;font-weight:900;letter-spacing:-1px;margin:16px 0 0;color:#fff">Hey ${biz} 👋</h1>
</div>
<div style="padding:32px">
<p style="color:#bdbdbd;font-size:15px;line-height:1.7;margin:0 0 16px">I searched <b style="color:#fff">${biz}</b> — your competitors with a Gen-Z luxury site are winning.</p>
<p style="color:#bdbdbd;font-size:15px;line-height:1.7;margin:0 0 16px">Your competitors with a Gen-Z luxury site is trade?</p>
<div style="background:#111;border:1px solid #2a2a2a;border-radius:16px;padding:18px;margin:24px 0">
<div style="color:#fff;font-weight:800;font-size:12px;letter-spacing:1px;margin-bottom:10px">FOR ${cat.toUpperCase()}</div>
<div style="color:#aaa;font-size:13px;line-height:1.6">✓ <b style="color:#fff">Luxury website</b> that closes high ticket • AI books appointments 24/7</div>
</div>
<div style="background:#111;border:1px solid #2a2a2a;border-radius:16px;padding:18px;margin:24px 0">
<div style="color:#aaa;font-size:13px;line-height:1.6">Luxury site that converts • ✓ AI books appointments 24/7</div>
</div>
<p style="color:#bdbdbd;font-size:14px;line-height:1.6;margin:0 0 24px">I built you a live preview — no pitch, just result.</p>
<div style="text-align:center;margin:28px 0">
<a href="${trackClick}" style="display:inline-block;background:#fff;color:#000;padding:16px 32px;border-radius:999px;text-decoration:none;font-weight:900;font-size:13px;letter-spacing:1px">SEE YOUR LIVE PREVIEW →</a>
<div style="margin-top:12px;color:#555;font-size:11px">Takes 17 seconds • No call needed</div>
</div>
<p style="color:#777;font-size:12px;line-height:1.5;text-align:center;margin-top:20px;border-top:1px solid #1a1a1a;padding-top:20px">If you like it, we launch in 24h. Reply STOP to opt-out. Venus HQ Lahore.</p>
</div>
</div>
<img src="${trackOpen}" width="1" height="1" style="display:none"/>
</div>`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action') || 'status';
    const live = searchParams.get('live') === '1';

    if (action === 'clear') {
      await setQueue([]);
      return NextResponse.json({ status: 'CLEARED', queue: 0, msg: 'Stopped 350 loop to ve9us1. Queue empty. Luxury intact' });
    }

    if (action === 'status') {
      const q = await getQueue();
      const byCat: Record<string,number> = {};
      q.forEach(a => byCat[a.cat] = (byCat[a.cat]||0)+1);
      return NextResponse.json({ status: 'QUEUE_STATUS', total: q.length, byCat, sample: q.slice(0,3), senders: { from: 'ron@venushq7.com' } });
    }

    if (action === 'blast') {
      if (!BREVO_KEY) return NextResponse.json({ status: 'NO_BREVO_KEY', msg: 'Set BREVO_API_KEY in Vercel Env' }, { status: 200 });
      let queue = await getQueue();
      if (queue.length === 0) return NextResponse.json({ status: 'QUEUE_EMPTY', msg: 'No leads. Mine first.' });

      const cats = ['roofers','plumbers','electricians','dentists','contractors'];
      const toSend: Lead[] = [];
      for (const cat of cats) {
        const inCat = queue.filter(l => l.cat === cat);
        if (inCat.length > 0) toSend.push(...inCat.slice(0,1));
      }

      const blasted: any[] = [];
      for (const lead of toSend) {
        const toEmail = live ? lead.realEmail : 've9us1@gmail.com';
        const payload = {
          sender: { email: 'ron@venushq7.com', name: 'Ron - Venus HQ' },
          replyTo: { email: 'hello@venushq7.com', name: 'Venus HQ' },
          to: [{ email: toEmail }],
          subject: `${lead.business} — you're losing ${lead.cat} jobs daily`,
          htmlContent: luxuryHtml(lead.business, lead.cat),
          headers: { 'X-Mailin-Tag': lead.cat },
        };
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: { 'api-key': BREVO_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(()=>({}));
        blasted.push({ cat: lead.cat, business: lead.business, realEmail: lead.realEmail, sent_to: toEmail, brevo: data });
        queue = queue.filter(l => !(l.business===lead.business && l.cat===lead.cat));
        await new Promise(r=>setTimeout(r,800));
      }
      await setQueue(queue);
      return NextResponse.json({ status: 'BLAST_5_LIVE_1_PER_CAT', live: live ? 'REAL_CUSTOMERS' : 'TEST_ve9us1', total: blasted.length, blasted, remaining: queue.length });
    }

    return NextResponse.json({ status: 'READY_LUXURY', actions: ['clear','status','blast','blast?live=1'], luxury: 'restored' });
  } catch (e:any) {
    return NextResponse.json({ status: 'ERROR', error: e.message }, { status: 200 });
  }
}
