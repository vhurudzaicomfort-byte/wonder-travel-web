import { Icon } from '@/components/ui/Icon';

// Lat/lng → SVG x/y on a 100×100 viewBox covering Zimbabwe's bounding box
// lng range [25.0, 33.1] → x [0, 100]; lat range [-22.5, -15.6] → y [100, 0]
function project(lat: number, lng: number) {
  const x = ((lng - 25) / 8.1) * 100;
  const y = ((-15.6 - lat) / 6.9) * 100;
  return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
}

const CITIES = [
  { name: 'Masvingo (HQ)', lat: -20.0699, lng: 30.8276, primary: true },
  { name: 'Harare',        lat: -17.825,  lng: 31.045 },
  { name: 'Bulawayo',      lat: -20.150,  lng: 28.583 },
  { name: 'Victoria Falls',lat: -17.924,  lng: 25.857 },
  { name: 'Mutare',        lat: -18.973,  lng: 32.671 },
  { name: 'Beitbridge',    lat: -22.214,  lng: 30.000 }
];

// Approximated Zimbabwe boundary, traced clockwise from NW corner.
// Source: simplified from Wikimedia Commons / Natural Earth admin-0 boundaries.
const ZW_PATH = [
  [25.26, -17.79], [25.85, -17.91], [26.50, -17.85], [27.00, -17.40], [27.70, -16.90],
  [28.50, -16.55], [29.20, -15.95], [29.90, -15.65], [30.40, -15.65], [30.95, -16.05],
  [31.30, -16.10], [32.00, -16.30], [32.65, -16.45], [32.95, -16.70], [32.95, -17.00],
  [32.85, -17.45], [32.95, -17.95], [32.70, -18.45], [32.85, -18.85], [33.05, -19.40],
  [32.95, -19.95], [32.50, -20.55], [32.10, -21.20], [31.55, -21.95], [31.30, -22.30],
  [30.30, -22.30], [29.50, -22.05], [29.00, -22.00], [28.20, -21.65], [27.70, -21.10],
  [27.45, -20.45], [27.70, -19.85], [27.20, -19.30], [26.20, -19.05], [25.60, -18.60],
  [25.30, -18.10]
];

export function Coverage() {
  const projected = ZW_PATH.map(([lng, lat]) => project(lat, lng));
  const d = projected.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
  const pins = CITIES.map(c => ({ ...c, ...project(c.lat, c.lng) }));

  return (
    <section className="section">
      <div className="container-x grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <p className="eyebrow">Coverage</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Where we deliver</h2>
          <p className="mt-3 text-ink-muted max-w-prose">
            Pickup at our Masvingo HQ is free. We also deliver to airports
            and border posts countrywide for a flat per-trip fee.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
            {pins.map(p => (
              <li key={p.name} className="inline-flex items-center gap-2">
                <Icon name="pin" size={16} className={p.primary ? 'text-zw-red' : 'text-brand'} />
                <span className={p.primary ? 'font-medium' : ''}>{p.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[5/4] rounded-2xl bg-brand-50 border border-line overflow-hidden">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Map of Zimbabwe with Wonder Travel pickup points">
            <defs>
              <linearGradient id="zw-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.28" />
              </linearGradient>
              <filter id="zw-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="0.6" stdDeviation="0.6" floodColor="#0F172A" floodOpacity="0.08" />
              </filter>
            </defs>
            <path d={d} fill="url(#zw-fill)" stroke="#1E3A8A" strokeWidth="0.5" strokeLinejoin="round" filter="url(#zw-shadow)" />
            {pins.map(p => (
              <g key={p.name} transform={`translate(${p.x},${p.y})`}>
                <title>{p.name}</title>
                {p.primary && <circle r="5.5" fill="#CE1126" fillOpacity="0.18" className="zw-pulse" />}
                {p.primary && <circle r="3.4" fill="#CE1126" fillOpacity="0.32" />}
                <circle r={p.primary ? 1.9 : 1.4} fill={p.primary ? '#CE1126' : '#1E3A8A'} stroke="#fff" strokeWidth="0.5" />
                <text x={p.primary ? 0 : 2.3} y={p.primary ? -3.4 : 0.6} textAnchor={p.primary ? 'middle' : 'start'} className="zw-label">
                  {p.name.replace(' (HQ)', '')}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
