import fs from 'fs';
import path from 'path';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const BREVO_API = 'https://api.brevo.com/v3/smtp/email';
const SENT_FILE = '/tmp/sent_log.json'; // survives during cron run
const SITE500_PATH = path.join(process.cwd(), 'site500.json');
const LEADS_PATH = path.join(process.cwd(), 'leads.json');
const FACTORY_CLIENTS = path.join(process.cwd(), 'factory/clients.txt');

// get sent list (30 day window)
function getSentHistory() {
  let sent = [];
  try {
    if (fs.existsSync(SITE500_PATH)) {
      sent = JSON.parse(fs.readFileSync(SITE500_PATH, 'utf8'));
    }
  } catch {}
  try {
    if (fs.existsSync(SENT_FILE)) {
      const tmp = JSON.parse(fs.readFileSync(SENT_FILE, 'utf8'));
      sent = [...new Set([...sent, ...tmp])];
    }
  } catch {}
  return sent;
}

function saveSent(email) {
  try {
    let log = [];
    if (fs.existsSync(SENT_FILE)) log = JSON.parse(fs.readFileSync(SENT_FILE, 'utf8'));
    log.push({ email, date: new Date().toISOString() });
    // keep only last 500
    log = log.slice(-500);
    fs.writeFileSync(SENT_FILE, JSON.stringify(log));
  } catch {}
}

function getNextLead() {
  const sentHistory = getSentHistory();
  const sentEmails = sentHistory.map(s => typeof s === 'string' ? s : s.email);
  
  let leads = [];
  try {
    if (fs.existsSync(LEADS_PATH)) {
      leads = JSON.parse(fs.readFileSync(LEADS_PATH, 'utf8'));
    }
  } catch {}

  // fallback to factory/clients.txt
  if (leads.length === 0 && fs.existsSync(FACTORY_CLIENTS)) {
    const txt = fs.readFileSync(FACTORY_CLIENTS, 'utf8');
    leads = txt.split('\n').filter(Boolean).map(line => {
      const [email, company] = line.split(',');
      return { email: email?.trim(), company: company?.trim() };
    });
  }

  // find first not sent in 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000);
  const recentSent = new Set(
    getSentHistory()
      .filter(s => new Date(s.date || 0) > thirtyDaysAgo)
      .map(s => typeof s === 'string' ? s : s.email)
  );

  return leads.find(l => l.email && !recentSent.has(l.email)) || null;
}

async function sendViaBrevo(toEmail, company) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('Missing BREVO_API_KEY');

  const res = await fetch(BREVO_API, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sender: { name: 'Venus HQ', email: 'hello@venusplaza7.com' },
      to: [{ email: toEmail }],
      subject: `${company} - Private Luxury Audit | Venus HQ - HOUSTON`,
      htmlContent: `<p>Hi ${company} team,</p><p>We did a Private Luxury Audit for ${company} — quick 2-min breakdown of how to get high-ticket clients in Houston.</p><p>Want the audit video?</p><p>- Venus HQ</p>`
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const force = searchParams.get('force');
  const count = parseInt(force) || 1; // force=5 = send 5 new, force=1 = send 1

  const results = [];
  for (let i = 0; i < Math.min(count, 5); i++) {
    const lead = getNextLead();
    if (!lead) {
      results.push({ status: 'no_more_new_leads', total_sent_history: getSentHistory().length });
      break;
    }
    try {
      await sendViaBrevo(lead.email, lead.company || 'there');
      saveSent(lead.email);
      results.push({ sent: lead.email, company: lead.company });
      // small delay to avoid spam flag
      await new Promise(r => setTimeout(r, 1500));
    } catch (e) {
      results.push({ failed: lead.email, error: e.message });
      break;
    }
  }

  return Response.json({
    ok: true,
    sent_now: results.filter(r => r.sent).length,
    results,
    sent_history_count: getSentHistory().length,
    next_cron: 'every 5 min = 12/hr',
    note: 'Will never resend same email within 30 days'
  });
}





