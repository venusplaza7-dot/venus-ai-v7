'use client'
import { useParams, useSearchParams } from 'next/navigation'

const NICHE_CONFIG: any = {
  roofing: {
    color: '#D4AF37',
    hero: 'ROOFS THAT DON\'T LEAK. CALLS THAT DON\'T STOP.',
    services: ['Roof Repair', 'Full Replacement', 'Emergency Leak', 'Gutter + Inspect'],
    chatDemo: 'What roof type? Shingle leak?',
    quote: '$4.2k-$5.8k',
  },
  plumber: {
    color: '#0EA5E9',
    hero: 'PIPES THAT DON\'T BURST. BOOKINGS THAT DON\'T STOP.',
    services: ['Drain Cleaning', 'Emergency Leak', 'Water Heater', 'Pipe Replacement'],
    chatDemo: 'What\'s leaking? Kitchen drain?',
    quote: '$189-$850',
  },
  hvac: {
    color: '#FF6B00',
    hero: 'AC THAT DOESN\'T QUIT. BOOKINGS THAT DON\'T STOP.',
    services: ['AC Repair', 'Heating Fix', 'Install New Unit', 'Duct Cleaning'],
    chatDemo: 'AC not cooling? What temp?',
    quote: '$150-$4.5k',
  },
  dentist: {
    color: '#7ED7C1',
    hero: 'SMILES THAT DON\'T FADE. BOOKINGS THAT DON\'T STOP.',
    services: ['Cleaning', 'Whitening', 'Implants', 'Emergency Pain'],
    chatDemo: 'Tooth pain? Cleaning or emergency?',
    quote: '$99-$2.5k',
  },
}

export default function DemoPage() {
  const params = useParams()
  const search = useSearchParams()
  const id = params.id as string

  // You pass niche via?niche=plumber or detect from lead data
  const niche = (search.get('niche') || 'roofing') as keyof typeof NICHE_CONFIG
  const cfg = NICHE_CONFIG[niche] || NICHE_CONFIG.roofing
  const city = search.get('city') || 'Houston'

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
       .accent { color: ${cfg.color}; }
       .accent-bg { background: ${cfg.color}; }
       .accent-border { border-color: ${cfg.color}; }
      `}</style>

      {/* Header changes color by niche */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-white/10">
        <span className="font-bold">{city.toUpperCase()} {niche.toUpperCase()} CO.</span>
        <span className="text-xs opacity-60">EST. 2008 → REBUILT 2027</span>
      </div>

      <div className="p-12">
        <h1 className="text-[64px] font-[800] leading-[0.9] uppercase max-w-[12ch]">
          {cfg.hero}
        </h1>

        <div className="mt-8 grid grid-cols-4 gap-4">
          {cfg.services.map((s: string) => (
            <div key={s} className="border border-white/10 rounded-2xl p-5">
              <div className="font-bold">{s}</div>
              <div className="text-xs opacity-60 mt-1" style={{color: cfg.color}}>{cfg.quote} • AI Quote</div>
            </div>
          ))}
        </div>

        {/* AI Chat - niche specific */}
        <div className="mt-10 p-6 rounded-2xl border" style={{borderColor: cfg.color}}>
          <div className="text-xs tracking-widest opacity-40">AI BOOKING CHAT • LIVE</div>
          <div className="mt-3 font-mono text-sm">Customer: {cfg.chatDemo}</div>
          <div className="mt-2" style={{color: cfg.color}}>→ Booked. Crew at 9am.</div>
        </div>

        {/* 5 AI Tools - same template, color changes */}
        <div className="mt-10 text-xs opacity-40">
          Same template for all niches • Just color = {cfg.color} • Niche = {niche} • City = {city}
        </div>
      </div>

      <div className="accent-bg text-black px-8 py-5 flex justify-between">
        <span className="font-bold">Want yours? This is the system.</span>
        <span>VENUS HQ7 // {city.toUpperCase()}</span>
      </div>
    </div>
  )
}
