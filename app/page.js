import Link from 'next/link';

export default function Page() {
  return (
    <main style={{
      minHeight:'100vh',
      background:'black',
      color:'white',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      textAlign:'center',
      padding:'20px'
    }}>
      <p style={{letterSpacing:'8px', fontSize:'12px', opacity:0.6}}>VENUS HQ</p>
      <h1 style={{fontSize:'60px', fontWeight:'300', margin:'20px 0'}}>VENUS AI IS<br/>LIVE</h1>
      <p>Fixed. No more 404.</p>
      <Link href="/p/alliance-plumbing-houston" style={{marginTop:'30px'}}>
        <button style={{padding:'16px 32px', background:'white', color:'black', border:'none', fontWeight:'bold', cursor:'pointer'}}>
          VIEW ALLIANCE DEMO
        </button>
      </Link>
    </main>
  );
}


