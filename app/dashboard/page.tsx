use client';
import { useEffect, useState } from 'react';
export default function Dashboard(){
  const [clients,setClients] = useState<any[]>([]);
  useEffect(()=>{ fetch('/api/agent-tracker').then(r=>r.json()).then(d=>setClients(d.clients||[])) },[]);
  return (
    <div style={{padding:20,fontFamily:'Arial'}}>
      <h1>Venus Agent HQ - Track All</h1>
      <h3>Agent 1 Scraper: {clients.length} leads (2010-2020)</h3>
      <h3>Agent 2 Builder: {clients.filter(c=>c.status==='preview_ready').length} previews built</h3>
      <h3>Agent 3 Tracker: {clients.filter(c=>c.paymentStatus==='paid').length} paid / {clients.filter(c=>c.paymentStatus==='pending').length} pending</h3>
      <table border={1} cellPadding={8} style={{marginTop:20,width:'100%'}}>
        <tr><th>Site</th><th>Year</th><th>Preview (Clickable)</th><th>Old vs New</th><th>Payment</th><th>Activate</th></tr>
        {clients.map((c:any)=><tr key={c.slug}>
          <td>{c.oldSite}</td><td>{c.oldYear}</td>
          <td><a href={c.newSite} target="_blank">{c.newSite}</a></td>
          <td><a href={c.oldSite} target="_blank">OLD</a> vs <a href={c.newSite} target="_blank">NEW</a></td>
          <td>{c.paymentStatus}</td>
          <td>{c.paymentStatus!=='paid'? <button onClick={()=>fetch(`/api/agent-tracker?slug=${c.slug}&action=paid`).then(()=>location.reload())}>Mark Paid & Activate</button> : '✅ Live'}</td>
        </tr>)}
      </table>
    </div>
  );
}



