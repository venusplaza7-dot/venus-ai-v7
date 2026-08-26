'use client'
import { useEffect, useState } from 'react'
const WA_NUMBER = '17865880578' // +1 (786) 588-0578

export default function Page({params, searchParams}:{params:{site:string}, searchParams:{industry?:string, city?:string}}){
  const slug = params.site || '24hrplumbinghouston-com'
  const domain = slug.replace(/-com$/,'').replace(/-/g,'.')+'.com'
  const industry = searchParams.industry || (domain.includes('hvac')?'HVAC': domain.includes('roof')?'ROOFING':'PLUMBING')
  const city = searchParams.city || 'Houston'
  const [timeLeft,setTimeLeft]=useState(24*3600)

  useEffect(()=>{
    const start = localStorage.getItem(`offer_${domain}`) || String(Date.now())
    localStorage.setItem(`offer_${domain}`,start)
    const id=setInterval(()=>{
      const elapsed = Math.floor((Date.now()-Number(start))/1000)
      const left = Math.max(0,24*3600-elapsed)
      setTimeLeft(left)
    },1000)
    return ()=>clearInterval(id)
  },[domain])

  const h=Math.floor(timeLeft/3600), m=Math.floor((timeLeft%3600)/60), s=timeLeft%60
  const previewLink = `https://venus-ai-v8.vercel.app/p/${slug}`
  const waMsg = `APPROVE ${domain} - $497 luxury rebuild with 4 AI agents. Preview: ${previewLink} - Original $1999. Activate within 24h. Industry: ${industry} City: ${city}`
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`

  return(
    <div className="min-h-screen bg-[#FCFCFB] text-black">
      {/* 24H TICKER */}
      <div className="bg-black text-white text-[11px] tracking-[0.2em] text-center py-2">
        VENUS HQ • SPECIAL OFFER <span className="line-through opacity-50">$1999</span> → <span className="text-[#c9a86a]">$497</span> • EXPIRES IN {String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')} • {industry} • {city}
      </div>

      {/* YOUR LUXURY WHITE/GOLD/BLACK CONTENT */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <h1 className="text-[48px] leading-[0.9]">{city}'s Most Trusted {industry}<br/><span className="text-black/30">Gen-Z Luxury 2026</span></h1>
        <p className="mt-4 text-black/50">Scraped from {domain} • Rebuilt for {industry} • Complete new beautiful website below</p>

        {/* 4 AI AGENTS */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="border bg-white p-6 rounded-[24px]"><b>Dispatch Agent</b> — assigns tech in 9s for {industry}</div>
          <div className="border bg-white p-6 rounded-[24px]"><b>Photo-Diagnostics</b> — {industry} photo → instant quote</div>
          <div className="border bg-white p-6 rounded-[24px]"><b>Quote & Closer</b> — $247 fixed, books while you sleep</div>
          <div className="border bg-white p-6 rounded-[24px]"><b>Review & Revenue</b> — 5-star + $97/mo plan</div>
        </div>

        {/* COMPLETE NEW WEBSITE PREVIEW AT BOTTOM */}
        <div className="mt-16">
          <h2 className="text-[11px] tracking-[0.2em] opacity-50">COMPLETE NEW BEAUTIFUL WEBSITE — LIVE PREVIEW FOR {domain}</h2>
          <div className="mt-4 rounded-[24px] border-[8px] border-black shadow-2xl overflow-hidden bg-white">
            <div className="bg-black text-white px-4 py-2 text-[10px] flex justify-between"><span>● ● ●</span><span>{domain}</span><span className="text-[#c9a86a]">LIVE</span></div>
            <div className="p-8">
              <h3 className="text-[32px]">{city} {industry} — Elite Service</h3>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="border p-4 rounded-xl">Emergency {industry}</div>
                <div className="border p-4 rounded-xl">{industry} Repair</div>
                <div className="border p-4 rounded-xl">{industry} Install</div>
              </div>
              <div className="mt-8 bg-black text-white p-6 rounded-xl text-center">This is what customers see — Apple luxury, not old WordPress</div>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL BLACK BAR WITH WHATSAPP */}
      <div className="bg-black text-white mt-16">
        <div className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="text-[11px] tracking-[0.2em] opacity-50">AUTHORIZATION • {domain}</div>
            <div className="mt-2 text-[28px]">Approve luxury rebuild? <span className="line-through opacity-30 text-[16px]">$1999</span> <span className="text-[#c9a86a]">$497</span></div>
            <div className="text-[10px] mt-2 opacity-50">Offer expires in {h}h {m}m — Reminders at 12h, 6h, 1h — Share link with Venus team after payment, we activate in 24h</div>
          </div>
          <a href={waLink} target="_blank" className="bg-[#25D366] text-black px-8 py-4 rounded-full font-bold text-center">WHATSAPP: APPROVE SITE — $497</a>
        </div>
      </div>
    </div>
  )
}




