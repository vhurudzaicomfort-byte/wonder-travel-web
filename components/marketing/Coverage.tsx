import { Icon } from '@/components/ui/Icon';
import zwPaths from '@/lib/zimbabwe-paths.json';

// Real Zimbabwe SVG (provincial boundaries) supplied by user.
// Source SVG viewBox derived from width=654.63501 height=600
// geoViewBox="25.236468 -15.608473 33.056935 -22.420971" (lng_min, lat_max, lng_max, lat_min)
const VIEW_W = 654.63501;
const VIEW_H = 600;
const LNG_MIN = 25.236468;
const LNG_MAX = 33.056935;
const LAT_MAX = -15.608473;
const LAT_MIN = -22.420971;

function project(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * VIEW_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VIEW_H;
  return { x, y };
}

const CITIES = [
  { name: 'Masvingo (HQ)', lat: -20.0699, lng: 30.8276, primary: true },
  { name: 'Harare',        lat: -17.825,  lng: 31.045 },
  { name: 'Bulawayo',      lat: -20.150,  lng: 28.583 },
  { name: 'Victoria Falls',lat: -17.924,  lng: 25.857 },
  { name: 'Mutare',        lat: -18.973,  lng: 32.671 },
  { name: 'Beitbridge',    lat: -22.214,  lng: 30.000 }
];

export function Coverage() {
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
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Map of Zimbabwe with Wonder Travel pickup points"
          >
            <defs>
              <linearGradient id="zw-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.32" />
              </linearGradient>
              <filter id="zw-shadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.12" />
              </filter>
            </defs>

            <g filter="url(#zw-shadow)">
              {(zwPaths as { d: string; title: string; id: string }[]).map(p => (
                <path
                  key={p.id}
                  d={p.d}
                  fill="url(#zw-fill)"
                  stroke="#1E3A8A"
                  strokeWidth="1"
                  strokeLinejoin="round"
                  className="transition-colors duration-200 hover:fill-brand-500/40"
                >
                  <title>{p.title}</title>
                </path>
              ))}
            </g>

            {pins.map(p => {
              const r = p.primary ? 9 : 7;
              const labelOffset = p.primary ? -16 : 4;
              const textAnchor = p.primary ? 'middle' : 'start';
              return (
                <g key={p.name} transform={`translate(${p.x},${p.y})`}>
                  <title>{p.name}</title>
                  {p.primary && (
                    <>
                      <circle r="28" fill="#CE1126" fillOpacity="0.18" className="zw-pulse" />
                      <circle r="16" fill="#CE1126" fillOpacity="0.32" />
                    </>
                  )}
                  <circle r={r} fill={p.primary ? '#CE1126' : '#1E3A8A'} stroke="#fff" strokeWidth="2.5" />
                  <text
                    x={p.primary ? 0 : r + 4}
                    y={labelOffset}
                    textAnchor={textAnchor}
                    className="zw-label"
                  >
                    {p.name.replace(' (HQ)', '')}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
