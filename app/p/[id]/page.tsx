export default function DemoPage({ params, searchParams }: any) {
  const cat = searchParams?.cat || 'roofers';
  const domain = searchParams?.domain || 'your business';
  const id = params?.id || 'demo';

  return (
    <div style={{background:'#0a0a0a', minHeight:'100vh', color:'#fff', fontFamily:'Arial', padding:'20px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{color:'#666', fontSize:'10px', letterSpacing:'3px'}}>VENUS HQ — LIVE DEMO FOR {domain.toUpperCase()}</div>
        <h1 style={{fontSize:'48px', marginTop:'20px'}}>Your new <i style={{color:'#d4b57a', fontWeight:300}}>luxury</i><br/>website is ready.</h1>
        <div style={{height:'2px', width:'40px', background:'#d4b57a', margin:'20px 0'}}></div>
        <p style={{color:'#888'}}>Old: {domain} — 8s load, no AI, no booking<br/>New: Gen-Z Luxury + 4 AI Agents for {cat}</p>
        <div style={{background:'#111', border:'1px solid #222', borderRadius:'16px', padding:'30px', marginTop:'30px'}}>
          <p>✓ AI Receptionist 24/7<br/>✓ Instant Quote Bot<br/>✓ Review Booster<br/>✓ SEO + Luxury Design</p>
          <a href={`https://wa.me/17865880578?text=Launch ${domain} ${id}`} style={{display:'inline-block', marginTop:'20px', background:'#00d26a', color:'#000', padding:'16px 32px', borderRadius:'100px', textDecoration:'none', fontWeight:800}}>LAUNCH NOW — $497</a>
        </div>
        <p style={{color:'#444', fontSize:'12px', marginTop:'30px'}}>Demo ID: {id} — Built for {domain} ({cat}) — Houston TX</p>
      </div>
    </div>
  );
}
