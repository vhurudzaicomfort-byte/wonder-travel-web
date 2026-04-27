import { Icon } from '@/components/ui/Icon';

const PINS = [
  { city: 'Masvingo (HQ)', x: 52, y: 70, primary: true },
  { city: 'Harare', x: 58, y: 32 },
  { city: 'Bulawayo', x: 30, y: 60 },
  { city: 'Victoria Falls', x: 18, y: 28 },
  { city: 'Beitbridge', x: 50, y: 90 },
  { city: 'Mutare', x: 76, y: 50 }
];

export function Coverage() {
  return (
    <section className="section">
      <div className="container-x grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <p className="eyebrow">Coverage</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Where we deliver</h2>
          <p className="mt-3 text-ink-muted max-w-prose">
            Pickup at our Masvingo HQ comes free. We can also deliver to airports
            and border posts countrywide for a flat per-trip fee.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
            {PINS.map(p => (
              <li key={p.city} className="inline-flex items-center gap-2">
                <Icon name="pin" size={16} className={p.primary ? 'text-zw-red' : 'text-brand'} />
                <span className={p.primary ? 'font-medium' : ''}>{p.city}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/5] sm:aspect-[5/4] rounded-2xl bg-brand-50 border border-line overflow-hidden">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-label="Map of Zimbabwe with pickup points">
            <path
              d="M14,22 Q22,12 36,14 L60,14 Q72,16 82,22 Q88,32 86,46 L86,70 Q80,84 70,90 L40,92 Q26,90 18,82 Q10,68 12,52 Z"
              fill="#1E3A8A" fillOpacity="0.15" stroke="#1E3A8A" strokeWidth="0.6"
            />
            {PINS.map(p => (
              <g key={p.city} transform={`translate(${p.x},${p.y})`}>
                <circle r={p.primary ? 2.4 : 1.6} fill={p.primary ? '#CE1126' : '#1E3A8A'} />
                {p.primary && <circle r="5" fill="#CE1126" fillOpacity="0.18" />}
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
