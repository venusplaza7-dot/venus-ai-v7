'use client';
import { useEffect, useState } from 'react';
export default function Dashboard(){
const [clients, setClients] = useState<any[]>([]);
useEffect(()=>{
fetch('/api/agent-tracker').then(r=>r.json()).then(d=>setClients(d.clients||[]));
},[]);
return (
<div style={{padding:'20px', fontFamily:'Arial', background:'white', color:'black', minHeight:'100vh'}}>
<h1>Venus Agent HQ - Track All Agents</h1>
<p>Intro Price: $497 (Original $1999) | Agent 1: Scraper | Agent 2: Luxury Builder | Agent 3: Tracker</p>
<p>Total Leads: {clients.length} | Preview Ready: {clients.filter((c:any)=>c.status==='preview_ready').length} | Paid: {clients.filter((c:any)=>c.paymentStatus==='paid').length}</p>
{clients.length===0 && <div style={{marginTop:'30px', padding:'20px', border:'1px dashed #999'}}>No clients yet. Run /api/agent-scraper first, then /api/run-agents?count=1 to see data here.</div>}
<table border={1} cellPadding={8} style={{marginTop:'20px', width:'100%', borderCollapse:'collapse', background:'white'}}>
<thead><tr><th>Site</th><th>Year</th><th>Preview (Luxury $1999)</th><th>Old vs New</th><th>Payment $497</th><th>Action</th></tr></thead>
<tbody>
{clients.map((c:any)=>(
<tr key={c.slug}>
<td>{c.oldSite}</td><td>{c.oldYear}</td>
<td><a href={c.newSite} target="_blank">{c.newSite}</a></td>
<td><a href={c.oldSite} target="_blank">OLD {c.oldYear}</a> vs <a href={c.newSite} target="_blank">NEW 2026</a></td>
<td style={{fontWeight:'bold'}}>{c.paymentStatus} - $497</td>
<td>{c.paymentStatus!=='paid'?<button onClick={()=>fetch(`/api/agent-tracker?slug=${c.slug}&action=paid`).then(()=>location.reload())}>Mark Paid $497 & Activate</button>:'Live'}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}

