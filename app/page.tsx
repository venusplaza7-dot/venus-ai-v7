export default function Home(){
  return (
    <div style={{background:'#000',color:'#fff',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Arial'}}>
      <div style={{textAlign:'center',border:'2px solid #c5a059',padding:'30px',borderRadius:'14px'}}>
        <h1 style={{color:'#c5a059',letterSpacing:'6px'}}>VENUS HQ7</h1>
        <p>Scraper for OLD 2005-2020 sites</p>
        <p><a href="/api/real?action=mine5" style={{color:'#c5a059'}}>→ Mine Old Sites (mine5)</a></p>
        <p><a href="/api/real?action=status" style={{color:'#fff'}}>→ Status</a></p>
        <p><a href="/api/real?action=blast&live=0" style={{color:'#25D366'}}>→ Test Blast to ve9us1@gmail.com</a></p>
        <p style={{color:'#666',fontSize:'11px',marginTop:'20px'}}>+1 (786) 588-0578 • ron@venushq7.com</p>
      </div>
    </div>
  )
}
