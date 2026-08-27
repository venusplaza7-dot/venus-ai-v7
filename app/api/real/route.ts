import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const BREVO_KEY = process.env.BREVO_API_KEY!;
const QUEUE_KEY = 'venus_real_queue_v1';

type Lead = { business: string; domain: string; realEmail: string; city: string; cat: string; source: string; };

// KV helpers
async function getQueue(): Promise<Lead[]> {
  const q = await kv.get<Lead[]>(QUEUE_KEY);
  return q || [];
}
async function setQueue(q: Lead[]) {
  await kv.set(QUEUE_KEY, q);
}

function luxuryHtml(biz: string, cat: string) {
  const isRoofPlumbElec = ['roofers','plumbers','electricians'].includes(cat);
  return `
<div style="font-family:Inter,Arial,sans-serif;background:#0a0a0a;color:#fff;padding:0;margin:0">
  <div style="max-width:600px;margin:0 auto;background:#0a0a0a;border:1px solid #222">
    <div style="padding:32px;text-align:center;border-bottom:1px solid #222">
      <div style="font-size:12px;letter-spacing:4px;color:#888">VENUS HQ</div>
      <div style="font-size:24px;font-weight:800;margin-top:8px;letter-spacing:-1px">Hey ${biz} 👋 — your ${cat} competitors are stealing your customers online</div>
    </div>
    <div style="padding:32px">
      <p style="color:#ccc;line-height:1.6">I checked <b style="color:#fff">${biz}</b> — you're invisible when people search "${cat} near me".</p>
      <p style="color:#ccc;line-height:1.6">Your competitors with a Gen-Z luxury site + AI booking get the calls. You get nothing.</p>
      ${isRoofPlumbElec ? `<div style="background:#111;border:1px solid #333;border-radius:12px;padding:16px;margin:20px 0"><div style="color:#fff;font-weight:700">For ${cat} only:</div><div style="color:#aaa;font-size:13px;margin-top:6px">✓ Luxury website that closes • ✓ AI agent that books 24/7 • ✓ Live permit + damage tracker</div></div>` : ''}
      <div style="margin:24px 0;text-align:center">
        <a href="https://venus-ai-v8.vercel.app/p/${encodeURIComponent(biz.toLowerCase().replace(/\\s+/g,'-'))}" style="display:inline-block;background:#fff;color:#000;padding:14px 28px;border-radius:999px;font-weight:800;text-decoration:none">SEE YOUR LIVE PREVIEW →</a>
      </div>
      <p style="color:#666;font-size:12px;text-align:center;margin-top:24px">No pitch. Just proof. If you like it, we launch in 24h. If not, we delete it.</p>
      <p style="color:#666;font-size:11px;text-align:center;margin-top:16px">Venus HQ, Lahore — reply STOP to opt out<br/>Reply to hello@venushq7.com</p>
    </div>
  </div>
</div>`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action') || 'status';
  const live = searchParams.get('live') === '1';

  // CLEAR
  if (action === 'clear') {
    await setQueue([]);
    return NextResponse.json({ status: 'CLEARED', queue: 0 });
  }

  // STATUS
  if (action === 'status') {
    const q = await getQueue();
    const byCat: any = {};
    q.forEach(l => byCat[l.cat] = (byCat[l.cat]||0)+1);
    return NextResponse.json({ status: 'QUEUE_STATUS', total: q.length, byCat, sample: q.slice(0,3) });
  }

  // MINE5 - get 5 per cat from your scraper APIs (you already have logic)
  if (action === 'mine5') {
    // call your existing agent-scraper logic here - keeping your old mine code
    // for now we just return queue
    const q = await getQueue();
    return NextResponse.json({ status: 'MINE5_SKIPPED_USE_AGENT_SCRAPER', total: q.length });
  }

  // BLAST - 1 per cat = 5 total REAL
  if (action === 'blast') {
    let queue = await getQueue();
    if (queue.length === 0) {
      return NextResponse.json({ status: 'QUEUE_EMPTY', msg: 'Run ?action=mine5 first or ?action=clear then mine' });
    }

    // group by cat and take 1 per cat
    const cats = ['roofers','plumbers','electricians','dentists','contractors'];
    const toSend: Lead[] = [];
    for (const cat of cats) {
      const leadsInCat = queue.filter(l => l.cat === cat);
      if (leadsInCat.length > 0) toSend.push(...leadsInCat.slice(0,1));
    }

    const blasted: any[] = [];
    for (const lead of toSend) {
      const toEmail = live ? lead.realEmail : 've9us1@gmail.com';
      
      const payload = {
        sender:{email:'ron@venushq7.com',name:'Ron - Venus HQ'},
        from:{email:'ron@venushq7.com',name:'Ron - Venus HQ'},
        replyTo:{email:'hello@venushq7.com',name:'Venus HQ'},
        to:[{email:toEmail}],
        subject:`${lead.business} — you're losing ${lead.cat} jobs daily`,
        htmlContent: luxuryHtml(lead.business, lead.cat),
        headers:{'X-Venus-Cat': lead.cat}
      };

      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method:'POST',
        headers:{'api-key': BREVO_KEY,'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      blasted.push({ cat: lead.cat, business: lead.business, realEmail: lead.realEmail, sent_to: toEmail, brevo: data });
      
      // remove from queue
      queue = queue.filter(l => !(l.business===lead.business && l.cat===lead.cat));
      await new Promise(r=>setTimeout(r,800));
    }

    await setQueue(queue);
    return NextResponse.json({ status:'BLAST_5_LIVE_1_PER_CAT', live: live ? 'REAL_CUSTOMERS' : 'TEST_ve9us1', total: blasted.length, blasted, remaining: queue.length });
  }

  return NextResponse.json({ status:'UNKNOWN_ACTION', actions:['clear','status','mine5','blast?live=1'] });
}
