'use client'
import { useState, useEffect } from 'react'
const WA = '17865880578'

export default function Page({params, searchParams}:{params:{site:string},searchParams:{industry?:string,city?:string}}){
  const slug = params.site
  const domain = slug.replace(/-com$/,'').replace(/-/g,'.')+'.com'
  const industry = searchParams.industry || 'PLUMBING'
  const city = searchParams.city || 'Houston'
  const [t,setT] = useState(86400)
  useEffect(()=>{
    const s = Number(localStorage.getItem(`t_${domain}`)||Date.now()); localStorage.setItem(`t_${domain}`,String(s))
    const id=setInterval(()=>setT(Math.max(0,86400-Math.floor((Date.now()-s)/1000))),1000); return()=>clearInterval(id)
  },[domain])
  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(`APPROVE ${domain} $${497} ${industry} ${city} Preview: https://venus-ai-v8.vercel.app/p/${slug}`)}`
  return(
    <div className="min-h-screen bg-[#fcfcfb] text-black">
      <div className="bg-black text-white text-[10px] tracking-[0.3em] text-center py-2">VENUS HQ • <span className="line-through opacity-40">$1999</span> <span className="text-[#c9a86a]">→ $497</span> • {Math.floor(t/3600)}H {Math.floor(t%3600/60)}M • {industry}</div>
      <div className="max-w-[1100px] mx-auto p-8">
        <h1 className="text-[50px] leading-[0.9]">{city}'s Most Trusted {industry}<br/><span className="text-black/30">Gen-Z Luxury 2026</span></h1>
        <div className="grid md:grid-cols-2 gap-4 mt-10">
          <div className="border p-6 rounded-[20px] bg-white">Dispatch Agent — {industry}</div>
          <div className="border p-6 rounded-[20px] bg-white">Photo-Diagnostics — instant quote</div>
          <div className="border p-6 rounded-[20px] bg-white">Quote & Closer — auto book</div>
          <div className="border p-6 rounded-[20px] bg-white">Review & Revenue — 5-star</div>
        </div>
        <div className="mt-14 rounded-[24px] border-[8px] border-black overflow-hidden bg-white shadow-2xl">
          <div className="bg-black text-white px-4 py-2 text-[10px] flex justify-between"><span>● ● ●</span><span>{domain}</span><span className="text-[#c9a86a]">LIVE</span></div>
          <div className="p-8"><h3 className="text-3xl">{city} {industry} Elite</h3><p className="opacity-50 mt-2">Complete new beautiful website — autonomous build as per work</p></div>
        </div>
      </div>
      <div className="bg-black text-white mt-10">
        <div className="max-w-[1100px] mx-auto p-6 flex justify-between items-center flex-wrap gap-4">
          <div><div className="text-[10px] tracking-[0.2em] opacity-40">AUTHORIZATION {domain}</div><div className="text-2xl mt-1"><span className="line-through opacity-30 text-lg">$1999</span> <span className="text-[#c9a86a]">$497</span> — Approve?</div></div>
          <a href={waLink} className="bg-[#86efac] text-black px-8 py-4 rounded-full font-bold">WHATSAPP: APPROVE & LAUNCH</a>
        </div>
      </div>
    </div>
  )
}
