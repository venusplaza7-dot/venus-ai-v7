const fs=require('fs'); const path=require('path');
const args=process.argv; const domainArg=args.find(a=>a.includes('--domain='))?.split('=')[1] || 'houston-elite-plumber.com';
const nameArg=args.find(a=>a.includes('--name='))?.split('=')[1] || domainArg;

const domain=domainArg.replace(/^https?:\/\//,'').split('/')[0].toLowerCase();
const slug=domain.replace(/[^a-z0-9]/gi,'').toLowerCase().slice(0,18);
console.log(`\n🚀 Making LIVE for ${domain} (${nameArg}) slug:${slug}`);

const demoPath=path.join(process.cwd(),'app','demo','[business]','page.tsx');
let template='';
if(fs.existsSync(demoPath)) template=fs.readFileSync(demoPath,'utf8');
else template=`export default function Page(){return <div style={{background:'#000',color:'#fff',padding:'40px'}}><h1>${nameArg} - Luxury B&W</h1><p>Intelligent Concierge | Visual Assessment | Voice Operations</p></div>}`;

// Replace example.com with real domain everywhere
template=template.replace(/example\.com/g,domain).replace(/examplecom/g,slug).replace(/EXAMPLE/g,nameArg.toUpperCase());

const liveDir=path.join(process.cwd(),'app','live',slug);
fs.mkdirSync(liveDir,{recursive:true});

const livePage=`import type { Metadata } from 'next';
export const metadata: Metadata = { title: \`${nameArg} — Gen-Z Luxury — Live\` };
export default function LivePage(){
  const domain="${domain}";
  const waText=encodeURIComponent(\`Hi Venus HQ, launch \${domain} now - \${'https://'+domain} - add all Gen Z tools\`);
  const waLink=\`https://wa.me/17865880578?text=\${waText}\`;
  return (
    <div style={{background:'#0a0a0a',color:'#fff',minHeight:'100vh',fontFamily:'Inter,Arial'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',border:'1px solid #222'}}>
        <div style={{padding:'40px'}}>
          <p style={{fontSize:'10px',letterSpacing:'4px',color:'#555'}}>LIVE — ${domain}</p>
          <h1 style={{fontWeight:200,fontSize:'48px',lineHeight:1}}>${nameArg}<br/>is now live.</h1>
          <p style={{color:'#888'}}>Gen-Z Luxury B&W + Intelligent Concierge + Visual Assessment + Voice Operations</p>
          <a href={waLink} style={{display:'inline-block',background:'#fff',color:'#000',padding:'16px 32px',marginTop:'20px',textDecoration:'none',fontWeight:700,letterSpacing:'2px',fontSize:'12px'}}>MANAGE VIA WHATSAPP — +1 (786) 588-0578</a>
          <p style={{color:'#444',fontSize:'10px',marginTop:'12px'}}>Tracking domain: {domain} | Ready in 15 min</p>
        </div>
      </div>
    </div>
  )
}
`;

