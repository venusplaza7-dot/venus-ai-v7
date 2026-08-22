const fs=require('fs');
fs.mkdirSync('app/p/[business]',{recursive:true});
fs.writeFileSync('app/page.js',`export default function Home(){return (<div style={{background:'#0a0a0a',minHeight:'100vh',color:'#fff',fontFamily:'Helvetica',padding:'60px 20px'}}><div style={{maxWidth:800,margin:'0 auto',textAlign:'center'}}><p style={{color:'#FF6B00',letterSpacing:'4px',fontSize:11,fontWeight:800}}>VENUS HQ</p><h1 style={{fontSize:56,fontWeight:800,marginTop:20}}>LUXURY WEBSITES<br/><span style={{color:'#FF6B00'}}>IN 24H</span></h1><a href='/p/houston-elite-plumber' style={{display:'inline-block',marginTop:30,background:'#A8FF53',color:'#000',padding:'16px 32px',textDecoration:'none',fontWeight:800}}>VIEW DEMO</a></div></div>);}`);

fs.writeFileSync('app/layout.js',`export default function RootLayout({children}){return (<html><body style={{margin:0,background:'#0a0a0a'}}>{children}</body></html>);}`);

fs.writeFileSync('app/p/[business]/page.js',`"use client";
import { useParams } from "next/navigation";
export default function Page(){
  const params = useParams();
  const b = params?.business || "houston-elite-plumber";
  const n = b.replace(/-/g," ").toUpperCase();
  return (
    <div style={{background:"#0a0a0a",minHeight:"100vh",color:"#fff",fontFamily:"Helvetica",padding:"50px 20px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <p style={{color:"#FF6B00",fontSize:11,letterSpacing:4,fontWeight:800}}>VENUS HQ — {n}</p>
        <h1 style={{fontSize:68,lineHeight:0.9,fontWeight:800,marginTop:20}}>{n}<br/>LUXURY<br/><span style={{color:"#FF6B00"}}>PLUMBER.</span></h1>
        <p style={{color:"#CCC",marginTop:20}}>{b}.com — rebuilt into luxury. Ready 24h.</p>
        <div style={{background:"#000",padding:60,textAlign:"center",marginTop:40,border:"1px solid #222"}}>
          <h2 style={{fontSize:42,fontWeight:800}}>Launch {n}<br/>in 24h.</h2>
          <a href="https://wa.me/17865880578" style={{display:"inline-block",marginTop:30,background:"#A8FF53",color:"#000",padding:"20px 40px",textDecoration:"none",fontWeight:900}}>CONFIRM</a>
        </div>
      </div>
    </div>
  );
}
`);
console.log("FILES FIXED");


