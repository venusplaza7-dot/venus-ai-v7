'use client'
import { useState, useEffect } from 'react'
const WA = '17865880578'

export default function Page({params, searchParams}: {params:{site:string}, searchParams:{industry?:string, city?:string}}){
  const slug = params.site
  const domain = slug.replace(/-com$/, '').replace(/-/g, '.').replace(/\.\./g, '-') + '' // 24hrplumbinghouston.com
  const cleanDomain = slug.replace('-com','').replace(/-/g,'')? `${slug.replace(/-/g,'.').replace('.com.com','.com')}` : '24hrplumbinghouston.com'
  const finalDomain = slug.includes('24hr')? '24hrplumbinghouston.com' : cleanDomain
  const industry = searchParams.industry || 'PLUMBING'
  const city = searchParams.city || 'Houston'
  const [t, setT] = useState(86400)

  useEffect(()=>{
    const s = Number(localStorage.getItem(`t_${finalDomain}`)) || Date.now()
    localStorage.setItem(`t_${finalDomain}`, String(s))
    const id=setInterval(()=>setT(Math.max(0,86400-Math.floor((Date.now()-s)/1000))),1000)
    return ()=>clearInterval(id)
  },[finalDomain])

  const h = Math.floor(t/3600), m = Math.floor((t%3600)/60)
  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(`APPROVE ${finalDomain} $497 ${industry}`)}`

  return (
    <div className="min-h-screen bg-[#080808] text-white" style={{colorScheme:'dark'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;600;700&display=swap');`}</style>

      {/* TOP BAR */}
      <div className="bg-black border-b border-zinc-900 text-center py-2 font-['Inter'] text-[10px] tracking-[0.3em] text-zinc-500">
        VENUS HQ • $1999 → $497 • {h}H {m}M • {finalDomain.toUpperCase()}
      </div>

      <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-10 md:py-16">
        {/* HERO */}
        <h1 className="font-['Playfair_Display'] text-[42px] md:text-[78px] leading-[0.9] tracking-[-2px] font-bold">
          {city}'s Most<br/>Trusted <span className="text-zinc-600">{industry}</span><br/>
          <span className="font-light italic text-[#c9a86a]">Gen-Z Luxury 2026</span>
        </h1>

        <div className="mt-8 grid md:grid-cols-3 gap-3 font-['Inter']">
          <div className="border border-zinc-800 rounded-[20px] bg-white text-black p-5 font-semibold">Dispatch Agent — {industry}</div>
          <div className="border border-zinc-800 rounded-[20px] bg-zinc-900 text-zinc-300 p-5">Photo-Diagnostics — instant quote</div>
          <div className="border border-zinc-800 rounded-[20px] bg-zinc-900 text-zinc-300 p-5">Quote & Closer — auto book</div>
        </div>

        <div className="mt-6 flex items-center gap-3 font-['Inter'] text-[12px] text-zinc-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> {finalDomain} LIVE • Review & Revenue — 5-star system
        </div>

        {/* LUXURY CARD */}
        <div className="mt-12 bg-[#fcfaf7] text-black rounded-[32px] p-8 md:p-12">
          <h2 className="font-['Playfair_Display'] text-[32px] md:text-[44px] leading-[0.95] font-bold">{city} {industry} Elite</h2>
          <p className="mt-4 font-['Inter'] text-zinc-600 max-w-[600px]">Complete new beautiful website — autonomous build as per {finalDomain} brand. Black/White/Gold luxury with 4 AI Agents.</p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <a href={waLink} className="bg-[#25D366] text-white font-['Inter'] font-bold tracking-[2px] text-[12px] px-8 py-5 rounded-full inline-block">
              WHATSAPP: APPROVE & LAUNCH →
            </a>
            <p className="font-['Inter'] text-[12px] text-zinc-500">Authorization {finalDomain}<br/>$1999 <span className="line-through">$1999</span> <span className="text-[#c9a86a] font-bold">$497</span> — Approve?</p>
          </div>
        </div>

        <div className="mt-8 text-center font-['Inter'] text-[10px] tracking-widest text-zinc-600">VENUS HQ • 4 AI AGENTS INCLUDED • LAUNCH IN 24H</div>
      </div>
    </div>
  )
