'use client'
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredStack, setHoveredStack] = useState<number | null>(null);
  const [hoveredInside, setHoveredInside] = useState<number | null>(null);
  const [toolLive, setToolLive] = useState<boolean[]>([true, true, true, true, true]);
  const [ctaHover, setCtaHover] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const insideTools = [
    {
      n: '01',
      title: 'AI BOOKING CHAT',
      what: 'Replaces contact form. Talks like human, books job while you sleep.',
      flow: '“What roof type? → When? → Address? → Booked.”',
      result: 'Conversion 8% → 34%.',
      implement: '1 line script.',
      script: 'venus.ai/tool-01.js',
      demo: ['Hi! What roof type needs work?', 'Shingle — leaking near chimney', 'Got it. When works? Tomorrow 9am?', 'Yes. 1420 Westheimer, Houston', 'Booked. Crew at 9am. $250 deposit held.'],
    },
    {
      n: '02',
      title: 'AI QUOTE ESTIMATOR',
      what: 'Instant price from photos. Customer uploads roof photo, AI gives $ range, captures lead.',
      flow: 'No waiting.',
      result: '“Upload → $4.2k-$5.8k → Book now?”',
      implement: 'drag-drop widget.',
      script: 'venus.ai/tool-02.js',
      demo: ['DRAG PHOTO HERE', 'Analyzing shingle wear...', 'ESTIMATE: $4,200 — $5,800', 'Book inspection to lock price?'],
    },
    {
      n: '03',
      title: 'AI MISSED-CALL TEXT BACK',
      what: 'Missed call? AI texts in 3 seconds.',
      flow: '“On a roof, can I call in 5? Reply YES to book.”',
      result: 'Saves $10k/mo lost calls.',
      implement: 'Twilio + Venus OS.',
      script: 'venus.ai/tool-03.js',
      demo: ['MISSED CALL 2:34pm — (713) 555-0142', '→ SMS sent in 3s', 'On a roof — can I call back in 5? Reply YES to book →', 'Customer: YES', 'Booked.'],
    },
    {
      n: '04',
      title: 'AI REVIEW ENGINE',
      what: 'Auto asks for review after job, auto replies to Google reviews with local SEO keywords.',
      flow: 'Job complete → review ask → auto-reply.',
      result: '4.2 → 4.9 stars in 30 days.',
      implement: 'Google API + Venus.',
      script: 'venus.ai/tool-04.js',
      demo: ['Job #2841 complete', '→ “Loved your new roof? Leave a review?” SMS sent', '★★★★★ “Fast, clean, Houston roofer fixed leak in 2hrs”', '↳ AI Reply: “Thanks! Proud to be Houston’s leak specialists... #HoustonRoofing”'],
    },
    {
      n: '05',
      title: 'AI UPSELL & REBOOK',
      what: 'After job, AI texts: “Gutter cleaning due? 15% off if booked this week.” Brings back old customers.',
      flow: '30 days after job → smart re-engage.',
      result: '22% rebook rate.',
      implement: 'Venus tracker.',
      script: 'venus.ai/tool-05.js',
      demo: ['Customer: Job done 31 days ago', '→ AI: “Hey Mike, gutter cleaning due? 15% off this week. Reply GUTTER”', 'Mike: GUTTER', 'Booked Thu 10am — $189'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] selection:bg-[#D4AF37] selection:text-black antialiased relative overflow-hidden flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');
        * { font-family: 'Space Grotesk', system-ui, sans-serif; }
       .syne { font-family: 'Syne', sans-serif; }
       .gold-text { color: #D4AF37; }
       .hero-outline { -webkit-text-stroke: 1px #D4AF37; color: transparent; }
        @media(min-width:768px){.hero-outline { -webkit-text-stroke: 1.5px #D4AF37; } }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0" style={{backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '96px 96px'}} />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 h-[64px] border-b border-white/[0.08] bg-black/80 backdrop-blur-xl">
        <div className="flex items-baseline gap-3">
          <span className="syne font-[800] text-[16px] tracking-[-0.02em]">VENUS HQ7</span>
          <span className="text-[9px] tracking-[0.2em] text-white/40">GEN — 2027</span>
        </div>
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06]">
          <span className="relative flex h-[6px] w-[6px]"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" /><span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-[#D4AF37]" /></span>
          <span className="text-[10px] tracking-[0.18em] font-semibold text-[#D4AF37]">SYSTEM LIVE</span>
        </div>
      </nav>

      <main className="relative z-10 flex-1 px-6 md:px-10 pt-16 md:pt-28 pb-20">
        <div className="max-w-[1400px]">
          <h1 className="syne font-[800] tracking-[-0.05em] leading-[0.86] text-[42px] md:text-[108px] uppercase">
            <span className="block">WE FIND OLD</span>
            <span className="block">WEBSITES.</span>
            <span className="block gold-text">YOU GET NEW</span>
            <span className="block hero-outline">CUSTOMERS.</span>
          </h1>
          <p className="mt-10 max-w-[420px] text-[15px] leading-[1.6] text-white/60">
            Scraper for <span className="text-white">2005—2020</span> businesses.<br/>Houston. Roofers. Plumbers. Ready.<br/><span className="text-white/40">We rebuild them for 2027. You keep the revenue.</span>
          </p>
        </div>

        <div className="mt-20 md:mt-32 max-w-[1400px]">
          <div className="flex items-center gap-3 mb-6"><span className="text-[10px] tracking-[0.2em] text-white/40">[ 02 — PROCESS ]</span><span className="h-px flex-1 bg-white/[0.06]" /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n:'01', t:'SCAN', d:'Find forgotten sites from 2005-2020. Domains with history, zero design.' },
              { n:'02', t:'BUILD', d:'AI rebuilds them for 2027. Brutalist. Fast. Booking-first.' },
              { n:'03', t:'BOOK', d:'Calls, bookings, revenue. Old traffic, new system.' },
            ].map((c,i)=>(
              <div key={i} onMouseEnter={()=>setHoveredCard(i)} onMouseLeave={()=>setHoveredCard(null)} className={`rounded-[20px] border p-7 md:p-8 transition-all ${hoveredCard===i? 'border-[#D4AF37]/50 bg-[#D4AF37]/[0.03]' : 'border-white/10 bg-white/[0.02]'}`}>
                <div className="flex justify-between"><span className="text-[10px] tracking-widest text-white/30">{c.n}</span><span className="w-1 h-1 rounded-full bg-white/30" /></div>
                <div className="mt-6 text-[18px] font-bold tracking-tight">{c.t}</div>
                <div className="mt-3 text-[13px] leading-[1.6] text-white/50">{c.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 max-w-[1400px]">
          <div className="flex items-center gap-3 mb-6"><span className="text-[10px] tracking-[0.2em] text-white/40">[ 03 — 2030 STACK ]</span><span className="h-px flex-1 bg-white/[0.06]" /></div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <h2 className="syne text-[32px] md:text-[56px] font-[800] leading-[0.9] tracking-[-0.04em] uppercase max-w-[14ch]">EVERYTHING TO COMPETE IN 2030</h2>
            <p className="text-[13px] leading-[1.6] text-white/40 max-w-[36ch]">All built-in. No extra tools. Built to compete in 2030, not 2020.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 rounded-[20px] overflow-hidden p-[1px]">
            {[
              { n:'01', t:'VENUS OS DASHBOARD', d:'Live: calls answered, jobs booked, revenue, reviews, ad ROI. See extra $12k/week made.' },
              { n:'02', t:'AI VOICE RECEPTIONIST', d:'Answers 24/7, books jobs, never misses $10k/mo calls. Old 2 bookings → AI 10-15.' },
              { n:'03', t:'AI ADS + 7x FOLLOW-UP', d:'$500 ads → 50 clicks. AI follows 7x → 10-15 bookings. $500 → $15k revenue.' },
              { n:'04', t:'AGENT-SCRAPER', d:'Finds old 2005-2020 sites. Houston roofers, plumbers, forgotten domains with history.' },
              { n:'05', t:'AGENT-BUILDER', d:'Rebuilds site for 2027. Brutalist, 1.1s load, booking-first, gold CTA.' },
              { n:'06', t:'AGENT-TRACKER', d:'Tracks leads, calls, bookings. Know which old site made you $.' },
              { n:'07', t:'BLAST5 + SEND-PREVIEW', d:'Auto email + SMS blast to 5 leads/day. Preview link, WhatsApp close.' },
              { n:'08', t:'VENUS FACTORY', d:'Autonomous loop. Scrapes, builds, tracks, blasts. You only click WhatsApp to make live.' },
            ].map((c,i)=>(
              <div key={i} onMouseEnter={()=>setHoveredStack(i)} onMouseLeave={()=>setHoveredStack(null)} className={`p-7 bg-black transition-colors ${hoveredStack===i? 'bg-[#111]' : ''}`}>
                <div className="text-[10px] tracking-[0.18em] text-[#D4AF37]">{c.n}</div>
                <div className="mt-4 text-[13px] font-bold tracking-wide leading-[1.2]">{c.t}</div>
                <div className="mt-3 text-[12px] leading-[1.5] text-white/40">{c.d}</div>
                <div className={`mt-6 h-px w-full transition-all ${hoveredStack===i? 'bg-[#D4AF37]/50' : 'bg-white/10'}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 max-w-[1400px]">
          <div className="flex items-center gap-3 mb-6"><span className="text-[10px] tracking-[0.2em] text-white/40">[ 04 — INSIDE YOUR SITE ]</span><span className="h-px flex-1 bg-white/[0.06]" /></div>
          <h2 className="syne text-[32px] md:text-[56px] font-[800] leading-[0.9] tracking-[-0.04em] uppercase">5 AI TOOLS ALREADY INSIDE.</h2>
          <p className="mt-4 text-white/40 text-[13px]">Not add-ons. Built into your rebuild. Works day 1.</p>
          <div className="mt-10 grid grid-cols-1 gap-[1px] bg-white/10 rounded-[20px] overflow-hidden p-[1px]">
            {insideTools.map((t,i)=>(
              <div key={i} onMouseEnter={()=>setHoveredInside(i)} onMouseLeave={()=>setHoveredInside(null)} className={`bg-black p-6 md:p-8 flex flex-col md:flex-row gap-6 transition-colors ${hoveredInside===i? 'bg-[#0F0F0F]' : ''}`}>
                <div className="md:w-[200px] shrink-0">
                  <div className="flex items-center gap-3"><span className="text-[#D4AF37] text-[11px]">{t.n}</span><span className={`w-2 h-2 rounded-full ${toolLive[i]? 'bg-[#D4AF37] animate-pulse' : 'bg-white/20'}`} /></div>
                  <div className="mt-3 font-bold text-[14px] tracking-wide">{t.title}</div>
                  <div className="mt-2 text-[11px] text-[#D4AF37]/70">&lt;script&gt; {t.script} &lt;/script&gt;</div>
                </div>
                <div className="flex-1">
                  <div className="text-[13px] text-white/70 leading-[1.5]">{t.what} {t.flow} <span className="text-white">{t.result}</span> {t.implement}</div>
                  <div className="mt-4 rounded-xl bg-white/[0.04] border border-white/10 p-4 font-mono text-[11px] leading-[1.6] text-white/50">
                    {t.demo.map((l,idx)=><div key={idx} className={idx===0? 'text-white/80' : ''}>{l}</div>)}
                  </div>
                </div>
                <div className="md:w-[80px] flex md:justify-end"><span className="h-6 px-3 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[10px] tracking-widest text-[#D4AF37] flex items-center">LIVE</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-[1400px]">
          <div className="flex items-center gap-3 mb-6"><span className="text-[10px] tracking-[0.2em] text-white/40">[ 05 — ACCESS ]</span><span className="h-px flex-1 bg-white/[0.06]" /></div>
          <div className="rounded-[24px] border border-white/10 p-8 md:p-12 bg-[#0A0A0A]">
            <h3 className="syne text-[28px] md:text-[42px] font-[800] leading-[0.9] tracking-[-0.04em] uppercase">READY TO SEE IT LIVE?</h3>
            <p className="mt-4 text-white/40 text-[14px] max-w-[40ch]">Houston Roofing Co. demo — loads in 0.8s. Before 2008 HTML tables, after 2027 booking-first.</p>
            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <button onClick={()=>setIsDemoOpen(true)} onMouseEnter={()=>setCtaHover(true)} onMouseLeave={()=>setCtaHover(false)} className={`inline-flex items-center gap-4 rounded-full px-10 h-[64px] text-[14px] tracking-[0.14em] font-semibold uppercase transition-all ${ctaHover? 'bg-[#D4AF37] text-black' : 'bg-white text-black'}`}>
                <span>View Live Demo</span><span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">→</span>
              </button>
              <div className="flex items-center gap-3 text-[10px] tracking-[0.18em] text-white/30 uppercase"><span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" /><span>Houston demo — loads in 0.8s</span></div>
            </div>
            <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] px-6 md:px-10 h-[64px] flex items-center justify-between text-[11px] tracking-[0.14em] text-white/40 uppercase">
        <span>© 2027 VENUS HQ7 — Built for Houston</span>
        <span className="flex gap-1"><span className="w-3 h-3 rounded-full bg-black border border-white/20" /><span className="w-3 h-3 rounded-full bg-white" /><span className="w-3 h-3 rounded-full bg-[#D4AF37]" /></span>
      </footer>

      {isDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-2xl overflow-hidden">
          <div className="relative w-full max-w-[1200px] max-h-[92vh] rounded-[24px] border border-white/10 bg-[#0A0A0A] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 h-[56px] border-b border-white/10 shrink-0">
              <span className="text-[11px] tracking-[0.18em] uppercase">Live Demo — Houston Roofing Co. (2008 → 2027)</span>
              <button onClick={()=>setIsDemoOpen(false)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">✕</button>
            </div>
            <div className="overflow-auto">
              <div className="bg-white text-black">
                <div className="h-14 px-6 flex items-center justify-between border-b border-black/10"><span className="font-bold">HOUSTON ROOFING CO.</span><span className="text-xs opacity-60">EST. 2008 → REBUILT 2027</span></div>
                <div className="p-8 md:p-12">
                  <h2 className="text-[42px] md:text-[64px] font-[800] leading-[0.9] uppercase max-w-[12ch]">ROOFS THAT DON'T LEAK. CALLS THAT DON'T STOP.</h2>
                  <p className="mt-6 max-w-[50ch] opacity-60">Original site had 4 pages, Comic Sans, and a Yahoo email. Now: instant booking, proof, and 1.1s load.</p>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="border rounded-2xl p-5"><div className="text-[10px] opacity-40">Leads / week</div><div className="mt-2 text-[22px] font-bold">27 → 84</div></div>
                    <div className="border rounded-2xl p-5"><div className="text-[10px] opacity-40">Booking rate</div><div className="mt-2 text-[22px] font-bold">11% → 38%</div></div>
                    <div className="border rounded-2xl p-5"><div className="text-[10px] opacity-40">Load time</div><div className="mt-2 text-[22px] font-bold">8.4s → 1.1s</div></div>
                  </div>
                  <div className="mt-10 h-[200px] rounded-2xl bg-black text-white p-6 flex flex-col justify-between"><span className="text-xs opacity-40">BEFORE / AFTER</span><div className="flex gap-4 text-sm"><div className="opacity-40 line-through">houstonroofing2008.biz — 2008 HTML tables, no mobile</div><span className="text-[#D4AF37]">→</span><div>Clean, brutalist, booking-first. Gold-accented CTAs.</div></div></div>
                  <div className="mt-10 grid md:grid-cols-4 gap-4">
                    <div className="border p-5 rounded-2xl"><div className="font-bold">Roof Repair</div><div className="text-xs opacity-60 mt-1">$450-$2k • AI Quote</div></div>
                    <div className="border p-5 rounded-2xl"><div className="font-bold">Full Replacement</div><div className="text-xs opacity-60 mt-1">$4.2k-$8k • AI Quote</div></div>
                    <div className="border p-5 rounded-2xl"><div className="font-bold">Emergency Leak</div><div className="text-xs opacity-60 mt-1">$350-$1.5k • 24/7</div></div>
                    <div className="border p-5 rounded-2xl"><div className="font-bold">Gutter + Inspect</div><div className="text-xs opacity-60 mt-1">$189-$450 • Rebook</div></div>
                  </div>
                </div>
                <div className="bg-black text-white px-6 py-6 border-t">
                  <div className="grid grid-cols-4 gap-[1px] bg-white/10 p-[1px] rounded-xl overflow-hidden">
                    <div className="bg-[#0A0A0A] p-5"><div className="text-[10px] opacity-40">Calls Today</div><div className="text-[28px] font-bold mt-1">23</div><div className="text-[11px] opacity-40 mt-1">18 AI • 5 human</div></div>
                    <div className="bg-[#101010] p-5"><div className="text-[10px] opacity-40">Booked</div><div className="text-[28px] font-bold mt-1">8</div><div className="text-[11px] opacity-40 mt-1">6 chat • 2 rebook</div></div>
                    <div className="bg-[#0A0A0A] p-5"><div className="text-[10px] opacity-40">Revenue</div><div className="text-[28px] font-bold mt-1">$4,200</div><div className="text-[11px] opacity-40 mt-1">$18.4k week</div></div>
                    <div className="bg-[#101010] p-5"><div className="text-[10px] opacity-40">Ad ROI</div><div className="text-[28px] font-bold mt-1">3.2x</div><div className="text-[11px] opacity-40 mt-1">$500 → $15k</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
