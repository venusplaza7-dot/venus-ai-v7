export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Dashboard(){
  let rawUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || ''
  let rawToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ''
  const url = rawUrl.replace(/"/g,'').replace(/\/$/,'')
  const token = rawToken.replace(/"/g,'').trim()

  let data:any = {sent:0, opens:0, clicks:0, cats:{roofers:0,plumbers:0,hvac:0}, last:'', recent:[]}

  if(url && token){
    const h = {Authorization:`Bearer ${token}`}
    try{
      const get = async (k:string) => {
        try{
          const r = await fetch(`${url}/get/${k}`,{headers:h, cache:'no-store'})
          const j = await r.json()
          return j.result || '0'
        }catch{return '0'}
      }
      data.sent = parseInt(await get('sent_count'));
      data.opens = parseInt(await get('open_count'));
      data.clicks = parseInt(await get('click_count'));
      data.cats = {
        roofers: parseInt(await get('cat:roofers')),
        plumbers: parseInt(await get('cat:plumbers')),
        hvac: parseInt(await get('cat:hvac')),
      };
      data.last = await get('last_link');
      const rec = await fetch(`${url}/lrange/recent_sends/0/9`,{headers:h, cache:'no-store'}).then(r=>r.json()).catch(()=>({result:[]}))
      data.recent = rec.result || [];
    }catch{}
  }

  const ctr = data.sent? ((data.clicks/data.sent)*100).toFixed(1):'0'
  const openRate = data.sent? ((data.opens/data.sent)*100).toFixed(1):'0'

  return (
  <div style={{padding:'20px',fontFamily:'sans-serif',background:'#000',color:'#fff',minHeight:'100vh'}}>
    <h1>VENUS AI v8 - PRO DASHBOARD (Live)</h1>
    <p style={{color:'#0f0'}}>Redis: {url.split('.')[0]}... | Sent: {data.sent}</p>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}}>
      <div style={{background:'#1a1a1a',padding:'20px'}}><div style={{color:'#888'}}>Sent</div><div style={{fontSize:'30px'}}>{data.sent}</div></div>
      <div style={{background:'#1a1a1a',padding:'20px'}}><div style={{color:'#888'}}>Opens {openRate}%</div><div style={{fontSize:'30px'}}>{data.opens}</div></div>
      <div style={{background:'#1a1a1a',padding:'20px'}}><div style={{color:'#888'}}>Clicks {ctr}%</div><div style={{fontSize:'30px'}}>{data.clicks}</div></div>
      <div style={{background:'#1a1a1a',padding:'20px'}}><div style={{color:'#888'}}>Last Link</div><div style={{wordBreak:'break-all'}}>{data.last}</div></div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px',marginTop:'20px'}}>
      <div style={{background:'#2a1a0a',padding:'20px'}}>Roofers: {data.cats.roofers}</div>
      <div style={{background:'#2a2a0a',padding:'20px'}}>Plumbers: {data.cats.plumbers}</div>
      <div style={{background:'#0a1a2a',padding:'20px'}}>HVAC: {data.cats.hvac}</div>
    </div>
    <div style={{marginTop:'20px',display:'flex',gap:'10px'}}>
      <a href="/api/real?cat=roofers" target="_blank" style={{background:'#0f0',padding:'10px',color:'#000'}}>Test Roofers</a>
      <a href="/api/real?cat=plumbers" target="_blank" style={{background:'#0f0',padding:'10px',color:'#000'}}>Test Plumbers</a>
      <a href="/api/real?cat=hvac" target="_blank" style={{background:'#0f0',padding:'10px',color:'#000'}}>Test HVAC</a>
      <a href="/dashboard" style={{background:'#333',padding:'10px',color:'#fff'}}>Refresh</a>
    </div>
    <div style={{background:'#1a1a1a',padding:'20px',marginTop:'20px'}}>
      <h3>Recent Sends (Live from Redis)</h3>
      {data.recent.length===0?<p style={{color:'#666'}}>No sends yet</p>:data.recent.map((r:any,i:number)=><div key={i} style={{borderBottom:'1px solid #333',padding:'5px'}}>{r}</div>)}
    </div>
  </div>
  )
}
