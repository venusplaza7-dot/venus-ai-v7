export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Dashboard(){
  let rawUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  let rawToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  const url = rawUrl.replace(/"/g,'').replace(/'/g,'').trim().replace(/\/$/,'');
  const token = rawToken.replace(/"/g,'').replace(/'/g,'').trim();

  let data:any = {sent:0, opens:0, clicks:0, cats:{}, recent:[]};

  if(url && token){
    const h = {Authorization:`Bearer ${token}`};
    try{
      const [s,o,c,cr,cp,ch,ro,rp,rh,recent] = await Promise.all([
        fetch(`${url}/get/sent_count`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:0})),
        fetch(`${url}/get/open_count`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:0})),
        fetch(`${url}/get/click_count`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:0})),
        fetch(`${url}/get/cat:roofers`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:0})),
        fetch(`${url}/get/cat:plumbers`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:0})),
        fetch(`${url}/get/cat:hvac`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:0})),
        fetch(`${url}/get/cat:roofers`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:0})),
        fetch(`${url}/get/last_link`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:''})),
        fetch(`${url}/lrange/recent_sends/0/9`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:[]}))
      ]);
      // Fix above - we need clean fetch
      const get = async (k:string) => { try{ const r = await fetch(`${url}/get/${k}`,{headers:h,cache:'no-store'}).then(r=>r.json()); return r.result || 0; }catch{return 0;} };
      data.sent = parseInt(await get('sent_count'));
      data.opens = parseInt(await get('open_count'));
      data.clicks = parseInt(await get('click_count'));
      data.cats = {
        roofers: parseInt(await get('cat:roofers')),
        plumbers: parseInt(await get('cat:plumbers')),
        hvac: parseInt(await get('cat:hvac')),
      };
      data.last = (await fetch(`${url}/get/last_link`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:''}))).result || 'No sends';
      const rec = await fetch(`${url}/lrange/recent_sends/0/9`,{headers:h,cache:'no-store'}).then(r=>r.json()).catch(()=>({result:[]}));
      data.recent = rec.result || [];
    }catch{}
  }

  const ctr = data.sent? ((data.clicks/data.sent)*100).toFixed(1) : '0';
  const openRate = data.sent? ((data.opens/data.sent)*100).toFixed(1) : '0';

  return (
    <div style={{padding:'20px',fontFamily:'sans-serif',background:'#0a0a0a',color:'#fff',minHeight:'100vh'}}>
      <h1>VENUS AI v8 - PRO DASHBOARD (Live)</h1>
      <p style={{color:'#0f0'}}>Redis: {url.split('.')[0].split('//')[1]} - Connected - FREE</p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'15px',marginTop:'20px'}}>
        <div style={{background:'#1a1a1a',padding:'20px',borderRadius:'12px',borderLeft:'4px solid #f59e0b'}}>
          <div style={{color:'#888'}}>Sent</div><div style={{fontSize:'36px',fontWeight:'bold'}}>{data.sent}</div>
        </div>
        <div style={{background:'#1a1a1a',padding:'20px',borderRadius:'12px',borderLeft:'4px solid #22c55e'}}>
          <div style={{color:'#888'}}>Opens {openRate}%</div><div style={{fontSize:'36px',fontWeight:'bold'}}>{data.opens}</div>
        </div>
        <div style={{background:'#1a1a1a',padding:'20px',borderRadius:'12px',borderLeft:'4px solid #3b82f6'}}>
          <div style={{color:'#888'}}>Clicks {ctr}%</div><div style={{fontSize:'36px',fontWeight:'bold'}}>{data.clicks}</div>
        </div>
        <div style={{background:'#1a1a1a',padding:'20px',borderRadius:'12px',borderLeft:'4px solid #a855f7'}}>
          <div style={{color:'#888'}}>Last Link</div><div style={{fontSize:'12px',wordBreak:'break-all',color:'#60a5fa'}}>{String(data.last).slice(0,60)}</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'15px',marginTop:'20px'}}>
        <div style={{background:'#2a1a0a',padding:'20px',borderRadius:'12px'}}><h3>ROOFERS (BROWN)</h3><div style={{fontSize:'32px'}}>{data.cats.roofers||0}</div><a href="/p/dallasroofexperts-com?cat=roofers" style={{color:'#f59e0b'}}>View</a></div>
        <div style={{background:'#2a2a0a',padding:'20px',borderRadius:'12px'}}><h3>PLUMBERS (GOLD)</h3><div style={{fontSize:'32px'}}>{data.cats.plumbers||0}</div><a href="/p/emergencyplumberhouston-com?cat=plumbers" style={{color:'#fbbf24'}}>View</a></div>
        <div style={{background:'#0a1a2a',padding:'20px',borderRadius:'12px'}}><h3>HVAC (BLUE)</h3><div style={{fontSize:'32px'}}>{data.cats.hvac||0}</div><a href="/p/houstonacheroes-com?cat=hvac" style={{color:'#60a5fa'}}>View</a></div>
      </div>

      <div style={{marginTop:'20px',display:'flex',gap:'10px',flexWrap:'wrap'}}>
        <a href="/api/real?cat=roofers" target="_blank" style={{background:'#78350f',color:'#fff',padding:'12px 18px',borderRadius:'8px',textDecoration:'none'}}>SEND ROOFER</a>
        <a href="/api/real?cat=plumbers" target="_blank" style={{background:'#854d0e',color:'#fff',padding:'12px 18px',borderRadius:'8px',textDecoration:'none'}}>SEND PLUMBER</a>
        <a href="/api/real?cat=hvac" target="_blank" style={{background:'#1e3a8a',color:'#fff',padding:'12px 18px',borderRadius:'8px',textDecoration:'none'}}>SEND HVAC</a>
        <a href="/dashboard" style={{background:'#333',color:'#fff',padding:'12px 18px',borderRadius:'8px',textDecoration:'none'}}>REFRESH</a>
      </div>

      <div style={{background:'#1a1a1a',padding:'20px',borderRadius:'12px',marginTop:'20px'}}>
        <h3>Recent Sends (Live from Redis)</h3>
        {data.recent.length===0?<p style={{color:'#666'}}>No recent - hit SEND buttons above</p>: data.recent.map((l:string,i:number)=><div key={i} style={{padding:'8px 0',borderBottom:'1px solid #222',fontSize:'12px',wordBreak:'break-all'}}><a href={l} target="_blank" style={{color:'#60a5fa'}}>{l}</a></div>)}
      </div>

      <div style={{marginTop:'20px',color:'#666',fontSize:'12px'}}>
        Open Tracking Pixel: /api/track?event=open&cat=roofers (add to emails) <br/>
        Click Tracking: /api/track?event=click&cat=roofers&url=... (wrap your links)
      </div>
    </div>
  );
}
