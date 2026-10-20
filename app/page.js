"use client";
import { useState } from "react";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-black font-sans antialiased">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Instrument+Serif:ital@0;1&display=swap');`}</style>
      
      {/* HEADER */}
      <header className="border-b border-black px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          VENUS HQ7GEN — 2027 SYSTEM LIVE
        </div>
        <div className="font-mono text-[10px] opacity-50">HOUSTON DEMO 0.8s LOAD</div>
      </header>

      {/* HERO */}
      <section className="px-6 md:px-12 py-20 md:py-32 border-b border-black">
        <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter uppercase">
          WE FIND<br/>OLD<br/>WEBSITES.<br/>
          <span className="text-transparent" style={{WebkitTextStroke: "1px black"}}>YOU GET NEW</span><br/>
          CUSTOMERS.
        </h1>
        <p className="mt-8 max-w-xl font-mono text-sm leading-relaxed">
          Scraper for 2005-2020 businesses. Houston roofers & plumbers.<br/>
          We rebuild them for 2027. You keep the revenue.<br/>
          <span className="bg-black text-white px-2">0.8s load, booking-first, brutalist.</span>
        </p>
        <div className="mt-10 flex gap-3 font-mono text-xs">
          <a href="#demo" className="bg-black text-white px-6 py-3 uppercase">View Live Demo →</a>
          <a href="#stack" className="border border-black px-6 py-3 uppercase">See 2030 Stack</a>
        </div>
        <div className="mt-6 font-mono text-[11px] opacity-60">Before: 2008 HTML tables — After: 2027 booking-first</div>
      </section>

      {/* PROCESS */}
      <section className="px-6 md:px-12 py-16 border-b border-black">
        <div className="font-mono text-xs mb-8">[02 — PROCESS]</div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {n:"01", t:"SCAN", d:"Find forgotten sites from 2005-2020. Domains with history, zero design."},
            {n:"02", t:"BUILD", d:"AI rebuilds for 2027. Brutalist. Fast. Booking-first. 1.1s load."},
            {n:"03", t:"BOOK", d:"Calls, bookings, revenue. Old traffic, new system."},
          ].map(c=>(
            <div key={c.n} className="border border-black p-8">
              <div className="font-mono text-xs opacity-40">{c.n}</div>
              <div className="text-3xl font-black mt-2">{c.t}</div>
              <div className="font-mono text-xs mt-4 leading-relaxed opacity-70">{c.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2030 STACK */}
      <section id="stack" className="px-6 md:px-12 py-16 bg-black text-white border-b border-black">
        <h2 className="text-4xl md:text-6xl font-black uppercase leading-none">EVERYTHING TO<br/>COMPETE IN 2030</h2>
        <p className="font-mono text-xs mt-4 opacity-60">All built-in, no extra tools.</p>
        <div className="grid md:grid-cols-4 gap-px bg-white/20 mt-10 border border-white/20">
          {[
            ["01","VENUS OS DASHBOARD","Live: calls, jobs, revenue, reviews, ad ROI. See extra $12k/week"],
            ["02","AI VOICE RECEPTIONIST","Answers 24/7, books jobs. Old 2 bookings → AI 10-15"],
            ["03","AI ADS + 7x FOLLOW-UP","$500 ads → 50 clicks → AI follows 7x → $15k rev"],
            ["04","AGENT-SCRAPER","Finds old 2005-2020 sites"],
            ["05","AGENT-BUILDER","Rebuilds for 2027"],
            ["06","AGENT-TRACKER","Tracks leads, calls, bookings"],
            ["07","BLAST5 + SEND-PREVIEW","Auto email + SMS blast to 5 leads/day"],
            ["08","VENUS FACTORY","Autonomous loop. You only click WhatsApp to make live."],
          ].map(([n,t,d])=>(
            <div key={n} className="bg-black p-6">
              <div className="font-mono text-[10px] opacity-40">{n}</div>
              <div className="font-black text-sm mt-2">{t}</div>
              <div className="font-mono text-[11px] mt-3 opacity-60 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 TOOLS */}
      <section className="px-6 md:px-12 py-16 border-b border-black">
        <div className="font-mono text-xs mb-4">[04 — INSIDE YOUR SITE]</div>
        <h2 className="text-4xl md:text-5xl font-black uppercase">5 AI TOOLS ALREADY INSIDE.<br/>Not add-ons. Built-in.</h2>
        <div className="mt-10 grid gap-4">
          {[
            ["01","AI BOOKING CHAT","Replaces contact form. 8% → 34% conversion.","venus.ai/tool-01.js"],
            ["02","AI QUOTE ESTIMATOR","Instant price from photos. Upload → $4.2k-$5.8k","venus.ai/tool-02.js"],
            ["03","AI MISSED-CALL TEXT BACK","Missed call? AI texts in 3s. Saves $10k/mo","venus.ai/tool-03.js"],
            ["04","AI REVIEW ENGINE","Auto asks for review, 4.2 → 4.9 stars in 30 days","venus.ai/tool-04.js"],
            ["05","AI UPSELL & REBOOK","22% rebook rate after job","venus.ai/tool-05.js"],
          ].map(([n,t,d,s])=>(
            <div key={n} className="border border-black flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
              <div className="flex gap-6 items-center">
                <span className="font-mono text-xs">{n} <span className="bg-green-500 text-black px-2 ml-2">LIVE</span></span>
                <div>
                  <div className="font-black">{t}</div>
                  <div className="font-mono text-xs opacity-60 mt-1">{d}</div>
                </div>
              </div>
              <code className="font-mono text-[10px] bg-black text-white px-3 py-1">{s}</code>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 md:px-12 py-8 font-mono text-[10px] flex justify-between opacity-50">
        <span>© 2027 VENUS HQ7 — Built for Houston</span>
        <span>v7 code → v8 live prod</span>
      </footer>
    </main>
  );
}
