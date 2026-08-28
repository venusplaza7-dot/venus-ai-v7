'use client'
import { useParams, useSearchParams } from 'next/navigation'

const NICHE_CONFIG: any = {
  roofing: {
    color: '#D4AF37',
    hero: "ROOFS THAT DON'T LEAK. CALLS THAT DON'T STOP.",
    services: ['Roof Repair', 'Full Replacement', 'Emergency Leak', 'Gutter + Inspect'],
    chatDemo: 'What roof type? Shingle leak?',
    quote: '$4.2k-$5.8k',
  },
  roofers: {
    color: '#D4AF37',
    hero: "ROOFS THAT DON'T LEAK. CALLS THAT DON'T STOP.",
    services: ['Roof Repair', 'Full Replacement', 'Emergency Leak', 'Gutter + Inspect'],
    chatDemo: 'What roof type? Shingle leak?',
    quote: '$4.2k-$5.8k',
  },
  plumber: {
    color: '#0EA5E9',
    hero: "PIPES THAT DON'T BURST. BOOKINGS THAT DON'T STOP.",
    services: ['Drain Cleaning', 'Emergency Leak', 'Water Heater', 'Pipe Replacement'],
    chatDemo: "What's leaking? Kitchen drain?",
    quote: '$189-$850',
  },
  plumbers: {
    color: '#0EA5E9',
    hero: "PIPES THAT DON'T BURST. BOOKINGS THAT DON'T STOP.",
    services: ['Drain Cleaning', 'Emergency Leak', 'Water Heater', 'Pipe Replacement'],
    chatDemo: "What's leaking? Kitchen drain?",
    quote: '$189-$850',
  },
  hvac: {
    color: '#FF6B00',
    hero: "AC THAT DOESN'T QUIT. BOOKINGS THAT DON'T STOP.",
    services: ['AC Repair', 'Heating Fix', 'Install New Unit', 'Duct Cleaning'],
    chatDemo: 'AC not cooling? What temp?',
    quote: '$150-$4.5k',
  },
  dentist: {
    color: '#7ED7C1',
    hero: "SMILES THAT DON'T FADE. BOOKINGS THAT DON'T STOP.",
    services: ['Cleaning', 'Whitening', 'Implants', 'Emergency Pain'],
    chatDemo: 'Tooth pain? Cleaning or emergency?',
    quote: '$99-$2.5k',
  },
  dentists: {
    color: '#7ED7C1',
    hero: "SMILES THAT DON'T FADE. BOOKINGS THAT DON'T STOP.",
    services: ['Cleaning', 'Whitening', 'Implants', 'Emergency Pain'],
    chatDemo: 'Tooth pain? Cleaning or emergency?',
    quote: '$99-$2.5k',
  },
}

export default function DemoPage() {
  const params = useParams()
  const search = useSearchParams()

  // FIX: handle null and array types
  const idParam = params?.id
  const id = Array.isArray(idParam)? idParam[0] : (idParam as string) || 'demo'

  const nicheParam = search?.get('niche') || 'roofing'
  const cityParam = search?.get('city') || 'houston'

  const niche = nicheParam.toLowerCase() as keyof typeof NICHE_CONFIG
  const city = cityParam.toLowerCase()

  const cfg = NICHE_CONFIG[niche] || NICHE_CONFIG.roofing

  // FIX: ensure toUpperCase exists
  const cityUpper = city? city.toUpperCase() : 'HOUSTON'
  const nicheUpper = niche? niche.toUpperCase() : 'ROOFING'

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
      .accent { color: ${cfg.color}; }
      .accent-bg { background: ${cfg.color}; }
      .accent-border { border-color: ${cfg.color}; }
      `}</style>

      <div className="h-14 px-6 flex items-center justify-between border-b border-white/10">
        <span className="font-bold">{cityUpper} {nicheUpper} CO.</span>
        <span className="text-xs opacity-60">EST. 2008 → REBUILT 2027</span>
      </div>

      <div className="p-8 md:p-12">
        <h1 className="text-[32px] md:text-[64px] font-[800] leading-[0.9] uppercase max-w-[12ch]">
          {cfg.hero}
        </h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {cfg.services.map((s: string) => (
            <div key={s} className="border border-white/10 rounded-2xl p-5">
              <div className="font-bold">{s}</div>
              <div className="text-xs mt-1" style={{color: cfg.color}}>{cfg.quote} • AI Quote</div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-2xl border bg-white/[0.02]" style={{borderColor: cfg.color}}>
          <div className="text-xs tracking-widest opacity-40">AI BOOKING CHAT • LIVE • {id}</div>
          <div className="mt-3 font-mono text-sm">Customer: {cfg.chatDemo}</div>
          <div className="mt-2" style={{color: cfg.color}}>→ Booked. Crew at 9am.</div>
        </div>

        <div className="mt-10 text-xs opacity-40">
          Same template • Color = {cfg.color} • Niche = {nicheUpper} • City = {cityUpper} • ID = {id}
        </div>
      </div>

      <div className="px-8 py-5 flex justify-between accent-bg text-black">
        <span className="font-bold text-sm">Want yours? This is the system.</span>
        <span className="text-xs">VENUS HQ7 // {cityUpper}</span>
      </div>
    </div>
  )
}
