export const dynamic = 'force-dynamic';

export default async function Dashboard(){
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  let sent = 0, last = '', allLinks:any[] = [];

  try{
    if(url && token){
      const h = {Authorization:`Bearer ${token}`};
      const s = await fetch(`${url}/get/sent_count`,{headers:h,cache:'no-store'}).then(r=>r.json());
      const l = await fetch(`${url}/get/last_link`,{headers:h,cache:'no-store'}).then(r=>r.json());
      sent = parseInt(s.result||'0');
      last = l.result || 'No sends yet';
    }
  }catch{}

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
          <h2>Last Link (with cat color)</h2>
          <a href={last} target="_blank" style={{color:'#60a5fa',wordBreak:'break-all'}}>{last}</a>
          <div style={{marginTop:'10px'}}>
            {last.includes('roofers') && <span style={{background:'#78350f',padding:'5px 10px',borderRadius:'5px'}}>BROWN - ROOFERS</span>}
            {last.includes('plumbers') && <span style={{background:'#a16207',padding:'5px 10px',borderRadius:'5px'}}>GOLD - PLUMBERS</span>}
            {last.includes('hvac') && <span style={{background:'#1e40af',padding:'5px 10px',borderRadius:'5px'}}>BLUE - HVAC</span>}
            {last.includes('electricians') && <span style={{background:'#ca8a04',padding:'5px 10px',borderRadius:'5px'}}>YELLOW - ELECTRICIANS</span>}
            {last.includes('dentists') && <span style={{background:'#15803d',padding:'5px 10px',borderRadius:'5px'}}>GREEN - DENTISTS</span>}
          </div>
        </div>
      </div>

      <div style={{marginTop:'30px',background:'#222',padding:'20px',borderRadius:'12px'}}>
        <h2>Your 5 Fixed Links</h2>
        <ul style={{lineHeight:'2'}}>
          <li><a href="https://venus-ai-v8.vercel.app/p/dallasroofexperts-com?cat=roofers" style={{color:'#fff'}}>ROOFERS (BROWN) - dallasroofexperts</a></li>
          <li><a href="https://venus-ai-v8.vercel.app/p/emergencyplumberhouston-com?cat=plumbers" style={{color:'#fbbf24'}}>PLUMBERS (GOLD) - emergencyplumberhouston</a></li>
          <li><a href="https://venus-ai-v8.vercel.app/p/houstonacheroes-com?cat=hvac" style={{color:'#60a5fa'}}>HVAC (BLUE) - houstonacheroes</a></li>
          <li><a href="https://venus-ai-v8.vercel.app/p/houstonelectricpros-com?cat=electricians" style={{color:'#facc15'}}>ELECTRICIANS (YELLOW)</a></li>
          <li><a href="https://venus-ai-v8.vercel.app/p/dallassmiles-com?cat=dentists" style={{color:'#4ade80'}}>DENTISTS (GREEN)</a></li>
        </ul>
      </div>

      <div style={{marginTop:'20px'}}>
        <a href="/api/real?force=1" target="_blank" style={{background:'#f59e0b',color:'#000',padding:'12px 24px',borderRadius:'8px',textDecoration:'none',fontWeight:'bold'}}>TRIGGER NEW SEND (force=1)</a>
        <span style={{marginLeft:'15px',color:'#888'}}>This will incr Redis count - visible here after refresh</span>
      </div>
    </div>
  );
}
