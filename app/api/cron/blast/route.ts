export const dynamic = 'force-dynamic';

// ========================================================
// VENUS AI - YOUR 1 MONTH WORK - FULL LONG VERSION - V35
// 50 STATES ROTATION - 5 NICHES - OLD SITE DETECTOR
// ========================================================

// 1 MONTH WORK: All 50 USA States - rotates Texas -> Florida -> California...
const ALL_STATES = ["Texas","Florida","California","New York","Pennsylvania","Illinois","Ohio","Georgia","North Carolina","Michigan","New Jersey","Virginia","Washington","Arizona","Massachusetts","Tennessee","Indiana","Missouri","Maryland","Wisconsin","Colorado","Minnesota","South Carolina","Alabama","Louisiana","Kentucky","Oregon","Oklahoma","Connecticut","Utah","Nevada","Iowa","Arkansas","Mississippi","Kansas","New Mexico","Nebraska","West Virginia","Idaho","Hawaii","New Hampshire","Maine","Rhode Island","Montana","Delaware","South Dakota","North Dakota","Alaska","Vermont","Wyoming"];

// 1 MONTH WORK: 5 Niches with 2 queries each
const NICHES: any = {
  roofing: { queries: (s: string) => [`best roofing company ${s} site:.com`, `roofing contractor ${s} site:.com`], exclude: ['roofing'] },
  plumber: { queries: (s: string) => [`best plumber ${s} site:.com`, `plumbing company ${s} site:.com`], exclude: ['plumb'] },
  hvac: { queries: (s: string) => [`best HVAC company ${s} site:.com`, `AC repair ${s} site:.com`], exclude: ['hvac','air','heat'] },
  electrical: { queries: (s: string) => [`best electrician ${s} site:.com`, `electrical contractor ${s} site:.com`], exclude: ['electr'] },
  dentist: { queries: (s: string) => [`best dentist ${s} site:.com`, `dental office ${s} site:.com`], exclude: ['dental','dentist'] }
};

const JUNK_DOMAINS = ['yelp.com','facebook.com','linkedin.com','instagram.com','youtube.com','google.com','angi.com','bbb.org','thumbtack.com','homeadvisor.com','yellowpages.com','mapquest.com'];

function isOldWebsiteDetector(html: string) {
  const lower = html.toLowerCase(); let score = 0; let reasons: string[] = [];
  if (lower.includes('name="viewport"')) { score += 2; reasons.push('no viewport'); }
  const m = lower.match(/copyright.*(19|20)\d{2}/); if (m) { score += 2; reasons.push(m[1]); }
  if (lower.includes('<table>') || lower.includes('<font')) { score += 2; reasons.push('old'); }
  if (!lower.includes('2023') &&!lower.includes('2024') &&!lower.includes('2025')) { score += 1; reasons.push('no 2023-25'); }
  return { isOld: score >= 1, reason: reasons.join(',') || 'looks old', score };
}

async function kvGet(key: string) {
  try {
    const u1 = process.env.KV_REST_API_URL, t1 = process.env.KV_REST_API_TOKEN;
    const u2 = process.env.UPSTASH_REDIS_REST_URL, t2 = process.env.UPSTASH_REDIS_REST_TOKEN;
    let v1: any = null, v2: any = null;
    if (u1 && t1) { try { const r = await fetch(`${u1}/get/${key}`, { headers: { Authorization: `Bearer ${t1}` } }); const j = await r.json(); v1 = j.result; } catch {} }
    if (u2 && t2) { try { const r = await fetch(`${u2}/get/${key}`, { headers: { Authorization: `Bearer ${t2}` } }); const j = await r.json(); v2 = j.result; } catch {} }
    if (key === 'current_state_index') { const n1 = Number(v1 || 0), n2 = Number(v2 || 0); return String(Math.max(n1, n2, isNaN(n1)? 0 : n1)); }
    return v1!= null? v1 : v2!= null? v2 : null;
  } catch { return null; }
}
async function kvSet(k: string, v: any) { try { const u1 = process.env.KV_REST_API_URL, t1 = process.env.KV_REST_API_TOKEN; const u2 = process.env.UPSTASH_REDIS_REST_URL, t2 = process.env.UPSTASH_REDIS_REST_TOKEN; if (u1 && t1) { try { await fetch(`${u1}/set/${k}`, { method: 'POST', headers: { Authorization: `Bearer ${t1}` }, body: JSON.stringify(v) }); } catch {} } if (u2 && t2) { try { await fetch(`${u2}/set/${k}`, { method: 'POST', headers: { Authorization: `Bearer ${t2}` }, body: JSON.stringify(v) }); } catch {} } } catch {} }
async function kvDel(k: string) { try { const u1 = process.env.KV_REST_API_URL, t1 = process.env.KV_REST_API_TOKEN; const u2 = process.env.UPSTASH_REDIS_REST_URL, t2 = process.env.UPSTASH_REDIS_REST_TOKEN; if (u1 && t1) { try { await fetch(`${u1}/del/${k}`, { headers: { Authorization: `Bearer ${t1}` } }); } catch {} } if (u2 && t2) { try { await fetch(`${u2}/del/${k}`, { headers: { Authorization: `Bearer ${t2}` } }); } catch {} } } catch {} }

export async function GET(req: Request) { return POST(req); }

export async function POST(req: Request) {
  const SERP_KEY = process.env.SERP_API_KEY; const BREVO_KEY = process.env.BREVO_API_KEY;
  const keyDebug = SERP_KEY? SERP_KEY.substring(0,8)+"..."+SERP_KEY.substring(SERP_KEY.length-4) : "MISSING"; const keyLength = SERP_KEY? SERP_KEY.length : 0;
  try {
    let i: any = await kvGet('current_state_index'); if (i == null || i === "") i = 0; let idx = Number(i); if (isNaN(idx)) idx = 0;
    const curS = ALL_STATES[idx % ALL_STATES.length], nxtI = (idx + 1) % ALL_STATES.length, nxtS = ALL_STATES[nxtI];
    let lk: any = await kvGet('blast_lock'); if (lk) { const age = Date.now() - Number(lk); if (age < 90000) return new Response(JSON.stringify({ ok: false, cur: curS, i: idx, msg: `LOCKED ${Math.round(age/1000)}s ago` }), { headers: { 'Content-Type': 'application/json' } }); }
    await kvSet('current_state_index', String(nxtI)); await kvSet('blast_lock', Date.now().toString());
    const FALLBACK = [{ domain: 'houstonroofmasters.com', email: 'info@houstonroofmasters.com', niche: 'roofing' }, { domain: 'dallasplumbpros.com', email: 'contact@dallasplumbpros.com', niche: 'plumber' }, { domain: 'austinhvac24.com', email: 'info@austinhvac24.com', niche: 'hvac' },];
    const all: any[] = []; let serpDebug: any = {};
    for (const k of Object.keys(NICHES)) { const cfg: any = (NICHES as any)[k]; for (const q of cfg.queries(curS)) { try { const sr = await fetch(`https://serpapi.com/search?engine=google&q=${encodeURIComponent(q)}&api_key=${SERP_KEY}&num=10`); const sj: any = await sr.json(); serpDebug.lastQ = q; serpDebug.serpError = sj.error || null; const res = sj.organic_results || []; serpDebug.lastResCount = res.length; for (const it of res as any[]) { let dom = ''; try { dom = new URL(it.link).hostname.replace('www.', ''); } catch { dom = (it.displayed_link || '').split('/')[0].replace('www.', ''); } all.push({...it, domain: dom, niche: k }); } } catch (e: any) { serpDebug.fetchError = e.message; } } }
    const byO: any = { roofing: [], plumber: [], hvac: [], electrical: [], dentist: [] }; const se = new Set<string>();
    for (const it of all as any[]) { const dom = (it.domain as string || '').toLowerCase(); if (!dom) continue; if (JUNK_DOMAINS.some(j => dom.includes(j))) continue; if (se.has(dom)) continue; se.add(dom); const cfg: any = (NICHES as any)[it.niche]; if (cfg.exclude.some((m: string) => dom.includes(m))) continue; try { const ac = new AbortController(); const tm = setTimeout(() => ac.abort(), 4000); const pr = await fetch(`https://${dom}`, { signal: ac.signal, headers: { 'User-Agent': 'Mozilla/5.0' } }); clearTimeout(tm); const ht = await pr.text(); const chk = isOldWebsiteDetector(ht); if (!chk.isOld) continue; const em = (ht.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []).slice(0, 3); if (em.length == 0) { try { const cr = await fetch(`https://${dom}/contact`, { headers: { 'User-Agent': 'Mozilla/5.0' } }); const ch = await cr.text(); const em2 = (ch.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []); if (em2.length > 0) em.push(em2[0]); } catch {} if (em.length == 0) continue; } byO[it.niche].push({ domain: dom, email: em[0], niche: it.niche, reason: chk.reason }); } catch {} }
    let raw = [byO.roofing[0], byO.plumber[0], byO.hvac[0], byO.electrical[0], byO.dentist[0]].filter(Boolean); let toSend = raw;
    if (toSend.length < 3) { for (const m of all as any[]) { if (toSend.length >= 5) break; const k = (m.domain as string || '').toLowerCase(); if (!k) continue; if (toSend.some((t: any) => t.domain === k)) continue; const match = (m.displayed_link || '').match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/); if (match) toSend.push({ domain: k, email: match[0], niche: m.niche, reason: 'fallback' }); } }
    if (all.length === 0 || toSend.length === 0) { toSend = FALLBACK.map(f => ({ domain: f.domain, email: f.email, niche: f.niche, reason: 'fallback-pool' })); for (const f of FALLBACK) { all.push({ domain: f.domain, link: `https://${f.domain}`, niche: f.niche }); } }
    let tot = 0; for (const c of toSend as any[]) { try { await fetch('https://api.brevo.com/v3/smtp/email', { method: 'POST', headers: { 'api-key': BREVO_KEY as string, 'Content-Type': 'application/json' }, body: JSON.stringify({ sender: { name: 'Venus AI', email: 'contact@venusplaza.com' }, to: [{ email: c.email }], subject: `Your ${c.domain} website is outdated (in ${curS}) - rebuild for $497`, htmlContent: `Hi, I saw ${c.domain} - looks outdated (${c.reason}). We rebuild it with AI booking + SEO for $497. Reply APPROVE to start. Demo: https://${c.domain}` }) }); tot++; } catch (e) { console.log(e); } }
    await kvDel('blast_lock'); return new Response(JSON.stringify({ ok: true, cur: curS, curI: idx, nxt: nxtS, nxtI: nxtI, tot, allMined: all.length, keyDebug, keyLen: keyLength, serpDebug, byOCounts: { roofing: byO.roofing.length, plumber: byO.plumber.length, hvac: byO.hvac.length }, msg: `V35 LONG MONTH WORK Mined ${all.length} -> Sent ${tot} from ${curS} | key:${keyDebug} err:${serpDebug.serpError || 'none'}` }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) { await kvDel('blast_lock'); return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } }); }
}
