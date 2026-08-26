'use client'
import { useState, useEffect } from 'react'
const WA = '17865880578'

export default function Page({params}: {params:{site:string}}){
  const slug = params.site
  const domain = '24hrplumbinghouston.com'
  const industry = 'PLUMBING'
  const city = 'Houston'
  const [t, setT] = useState(86400)

  useEffect(()=>{
    const key = `t_${domain}`
    const s = Number(localStorage.getItem(key)) || Date.now()
    localStorage.setItem(key, String(s))
    const id = setInterval(()=>{
      const diff = Math.floor((Date.now()-s)/1000)
      setT(Math.max(0, 86400-diff))
    },1000)
    return ()=>clearInterval(id)
  },[domain])

  const h = Math.floor(t/3600)
  const m = Math.floor((t%3600)/60)
  const waLink = `https://wa.me/${WA}?text=APPROVE%20${domain}%20%24497`

  return (
    <div className="min-h-screen bg-[#080808] text-white" style={{colorScheme:'dark'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;600;700&display=swap');`}</style>
      
      <div className="bg-black border-b border-zinc-900 text-center py-2 font-mono text-[10px] tracking-[0.3em] text-zinc-500">
        VENUS HQ • $1999 → $497 • {h}H {m}M • {domain}
      </div>

      <div className="max-w-[1180px] mx-auto px-6 py-12">
        <h1 className="text-[48px] md:text-[72px] leading-[0.9] tracking-[-2px] font-bold" style={{fontFamily:'Playfair Display, serif'}}>
          {city}&apos;s Most<br/>Trusted {industry}<br/>
          <span className="font-light italic text-[#c9a86a]">Gen-Z Luxury 2026</span>
        </h1>

        <div className="mt-8 grid md:grid-cols-3 gap-3">
          <div className="border border-zinc-800 rounded-[20px] bg-white text-black p-5 font-bold">Dispatch Agent — {industry}</div>
          <div className="border border-zinc-800 rounded-[20px] bg-zinc-900 text-zinc-300 p-5">Photo-Diagnostics — instant quote</div>
          <div className="border border-zinc-800 rounded-[20px] bg-zinc-900 text-zinc-300 p-5">Quote & Closer — auto book</div>
        </div>

        <div className="mt-8 bg-[#fcfaf7] text-black rounded-[32px] p-8 md:p-12">
          <h2 className="text-[36px] font-bold" style={{fontFamily:'Playfair Display, serif'}}>{city} {industry} Elite</h2>
          <p className="mt-3 text-zinc-600 max-w-[600px]">Complete new beautiful website — autonomous build. Black/White/Gold luxury with 4 AI Agents.</p>
          <a href={waLink} className="mt-6 inline-block bg-[#25D366] text-white font-bold tracking-widest text-[12px] px-8 py-5 rounded-full">
            WHATSAPP: APPROVE & LAUNCH
          </a>
          <p className="mt-4 text-[12px] text-zinc-500">Authorization {domain} — $1999 → $497 — Approve?</p>
        </div>
      </div>
    </div>
  )
}
