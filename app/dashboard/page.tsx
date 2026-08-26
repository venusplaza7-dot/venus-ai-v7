export const dynamic = 'force-dynamic';

export default async function Dashboard(){
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  let sent = 0; let last = 'No sends yet - click TRIGGER';

  if(url && token){
    const h = {Authorization:`Bearer ${token}`};
    try{
      const res = await fetch(`${url}/mget/sent_count/last_link`,{headers:h,cache:'no-store'}).then(r=>r.json());
      // res.result is array [sent_count, last_link]
      if(res.result){
        sent = parseInt(res.result[0]||'0');
        last = res.result[1] || last;
      }
    }catch{}
  }

  return (
    <div style={{padding:'20px',fontFamily:'sans-serif',background:'#111',color:'#fff',minHeight:'100vh'}}>
      <h1>VENUS AI v8 - FREE DASHBOARD (Live)</h1>
      <p style={{color:'#0f0'}}>Redis: Available - Free - upstash-kv-time-field - Connected</p>
      <div style={{display:'flex',gap:'20px',marginTop:'20px'}}>
        <div style={{background:'#222',padding:'20px',borderRadius:'12px',flex:1}}>
          <h2>Sent Count</h2>
          <h1 style={{fontSize:'48px',color:'#f59e0b'}}>{sent}</h1>
        </div>
        <div style={{background:'#222',padding:'20px',borderRadius:'12px',flex:2}}>
          <h2>Last Link</h2>
          <a href={last} target="_blank" style={{color:'#60a5fa',wordBreak:'break-all'}}>{last}</a>
        </div>
      </div>
      <div style={{marginTop:'20px',background:'#222',padding:'20px',borderRadius:'12px'}}>
        <h3>Your 5 Fixed Links</h3>
        <p><a href="/p/dallasroofexperts-com?cat=roofers" style={{color:'#fff'}}>ROOFERS (BROWN)</a> | <a href="/p/emergencyplumberhouston-com?cat=plumbers" style={{color:'#fbbf24'}}>PLUMBERS (GOLD)</a> | <a href="/p/houstonacheroes-com?cat=hvac" style={{color:'#60a5fa'}}>HVAC (BLUE)</a></p>
      </div>
      <div style={{marginTop:'20px'}}>
        <a href="/api/real?force=1" target="_blank" style={{background:'#f59e0b',color:'#000',padding:'12px 24px',borderRadius:'8px',textDecoration:'none',fontWeight:'bold'}}>TRIGGER NEW SEND (force=1)</a>
      </div>
    </div>
  );
}
