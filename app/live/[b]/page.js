export default function Page({params, searchParams}) {
  return <div style={{background:'black',color:'gold',padding:'50px',fontSize:'30px'}}>
    ACTIVATED ✅<br/>
    Business: {params.b}<br/>
    Old: {searchParams.old}<br/>
    CONF: {searchParams.conf || 'VENUS-2026-497'}<br/><br/>
    5 AI Tools LIVE - Booking, Quote, Missed-Call, Reviews, Upsell
  </div>
}
