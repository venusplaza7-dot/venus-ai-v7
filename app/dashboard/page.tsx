'use client';
import { useEffect, useState } from 'react';

export default function Dashboard(){
  const [clients, setClients] = useState<any[]>([]);

  useEffect(()=>{
    fetch('/api/agent-tracker')
      .then(r=>r.json())
      .then(d=>setClients(d.clients || []))
      .catch(()=>setClients([]));
  },[]);

  return (
    <div style={{padding:'20px', fontFamily:'Arial'}}>
      <h1>Venus Agent HQ - Track All Agents</h1>
      <h3>Agent 1 Scraper: {clients.length} leads (2010-2020)</h3>
      <h3>Agent 2 Builder: {clients.filter((c:any)=>c.status==='preview_ready').length} previews</h3>
      <h3>Agent 3 Tracker: {clients.filter((c:any)=>c.paymentStatus==='paid').length} paid</h3>
      
      <table border={1} cellPadding={8} style={{marginTop:'20px', width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr><th>Site</th><th>Year</th><th>Preview</th><th>Old vs New</th><th>Payment</th><th>Action</th></tr>
        </thead>
        <tbody>
          {clients.map((c:any)=>(
            <tr key={c.slug}>
              <td>{c.oldSite}</td>
              <td>{c.oldYear}</td>
              <td><a href={c.newSite} target="_blank">{c.newSite}</a></td>
              <td><a href={c.oldSite} target="_blank">OLD</a> vs <a href={c.newSite} target="_blank">NEW</a></td>
              <td>{c.paymentStatus}</td>
              <td>
                {c.paymentStatus !== 'paid' ? (
                  <button onClick={()=>fetch(`/api/agent-tracker?slug=${c.slug}&action=paid`).then(()=>location.reload())}>
                    Mark Paid
                  </button>
                ) : 'Live'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
