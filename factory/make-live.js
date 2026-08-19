const fs=require('fs'); const path=require('path');
const d=process.argv[2]||'houston-elite-plumber.com'; const n=process.argv[3]||d;
const domain=d.replace(/^https?:\/\//,'').split('/')[0].toLowerCase();
const slug=domain.replace(/[^a-z0-9]/gi,'').toLowerCase().slice(0,18);
console.log('Making LIVE for',domain,slug);
const liveDir=path.join(process.cwd(),'app','live',slug);
fs.mkdirSync(liveDir,{recursive:true});
const page=`import type { Metadata } from 'next';
export const metadata: Metadata = { title: \`${n} — Live\` };
export default function Page(){
  const domain="${domain}";
  const wa=encodeURIComponent("Hi Venus HQ, launch "+domain+" now - https://"+domain+" - add all Gen Z tools");
  return (<div style={{background:'#0a0a0a',color:'#fff',minHeight:'100vh',fontFamily:'Arial'}}><div style={{maxWidth:'680px',margin:'0 auto',border:'1px solid #222',padding:'40px'}}><p style={{fontSize:'10px',letterSpacing:'4px',color:'#555'}}>LIVE — ${domain}</p><h1 style={{fontWeight:200,fontSize:'48px'}}>${n}<br/>is now live.</h1><p style={{color:'#888'}}>Gen-Z Luxury B&W + AI Concierge + Visual + Voice</p><a href={\`https://wa.me/17865880578?text=\${wa}\`} style={{display:'inline-block',background:'#fff',color:'#000',padding:'16px 32px',marginTop:'20px',textDecoration:'none',fontWeight:700}}>WHATSAPP +1 (786) 588-0578 — \${domain}</a></div></div>)
}
`;
fs.writeFileSync(path.join(liveDir,'page.tsx'),page);
console.log('Created',liveDir);
