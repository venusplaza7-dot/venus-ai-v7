import type { Metadata } from 'next';
export const metadata: Metadata = { title: `Houston Elite Plumber — Live` };
export default function Page(){
  const domain="houston-elite-plumber.com";
  const wa=encodeURIComponent("Hi Venus HQ, launch "+domain+" now - https://"+domain+" - add all Gen Z tools");
  return (<div style={{background:'#0a0a0a',color:'#fff',minHeight:'100vh',fontFamily:'Arial'}}><div style={{maxWidth:'680px',margin:'0 auto',border:'1px solid #222',padding:'40px'}}><p style={{fontSize:'10px',letterSpacing:'4px',color:'#555'}}>LIVE — houston-elite-plumber.com</p><h1 style={{fontWeight:200,fontSize:'48px'}}>Houston Elite Plumber<br/>is now live.</h1><p style={{color:'#888'}}>Gen-Z Luxury B&W + AI Concierge + Visual + Voice</p><a href={`https://wa.me/17865880578?text=${wa}`} style={{display:'inline-block',background:'#fff',color:'#000',padding:'16px 32px',marginTop:'20px',textDecoration:'none',fontWeight:700}}>WHATSAPP +1 (786) 588-0578 — ${domain}</a></div></div>)
}
