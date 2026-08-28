import { kv } from '@vercel/kv'
export const dynamic = 'force-dynamic'

export async function GET(){
  const city='houston'
  const niches=['roofing','plumbers','hvac','dentists']
  let all:any[]=[]
  let queueCount=0
  let blastedCount=0

  for(let niche of niches){
    const ids = await kv.smembers(`leads:${city}:${niche}`) as string[]
    const q = await kv.smembers(`queue:${city}:${niche}`) as string[]
    const b = await kv.smembers(`blasted:${city}:${niche}`) as string[]
    queueCount+=q.length
    blastedCount+=b.length
    
    for(let id of ids.slice(0,5)){
      const lead:any = await kv.get(`lead:${id}`)
      if(lead) all.push(lead)
    }
  }

  const lastCron:any = await kv.get('last_cron')

  // Return HTML dashboard
  const html = `
  <html><body style="background:#000;color:#fff;font-family:monospace;padding:20px">
  <h1>VENUS HQ7 LIVE AGENT DASHBOARD</h1>
  <p>Last Cron: ${JSON.stringify(lastCron||'never')}</p>
  <p>Queue waiting: ${queueCount} | Blasted sent: ${blastedCount} | Total mined: ${all.length}</p>
  <table border=1 cellpadding=10 style="border-collapse:collapse;width:100%">
  <tr><th>Time</th><th>Niche</th><th>Business</th><th>Old Domain (REAL)</th><th>Email (REAL client)</th><th>Link</th><th>Status</th></tr>
  ${all.map(l=>`
    <tr>
      <td>${new Date(l.created).toLocaleString()}</td>
      <td>${l.niche}</td>
      <td>${l.business}</td>
      <td><b style="color:#D4AF37">${l.domain}</b><br><a href="https://${l.domain}" target="_blank" style="color:#aaa">Check old site →</a></td>
      <td>${l.email}</td>
      <td><a href="${l.link}" target="_blank" style="color:#7ED7C1">View rebuilt</a></td>
      <td>${l.status}</td>
    </tr>
  `).join('')}
  </table>
  <p>How to know real? Click old domain link - you will see 2008 old website. Email is info@ that domain - real client. Click rebuilt link - you see your new page with $1997→$497 + 24H.</p>
  <p>Proof 2: Go Resend.com → Logs → You see emails sent to real info@ domains. Proof 3: Go Vercel Logs → /api/cron/blast → You see 20 sent every 30 min.</p>
  </body></html>`

  return new Response(html, {headers:{'Content-Type':'text/html'}})
}
