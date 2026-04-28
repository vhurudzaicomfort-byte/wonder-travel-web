import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Icon, IconName } from '@/components/ui/Icon';
import { getEmergency } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Emergency services in Masvingo',
  description: 'Police, ambulance, fire, hospitals, and 24/7 roadside assistance in Masvingo, Zimbabwe. Real numbers, kept up to date.'
};

const ICON_FOR: Record<string, IconName> = {
  'Police': 'shield',
  'Ambulance & medical': 'headset',
  'Fire brigade': 'shield',
  'Tow trucks & breakdown': 'car',
  'Other': 'info'
};

export default function EmergencyPage() {
  const groups = getEmergency();

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Emergency services' }]} />
      </div>
      <section className="container-x py-10 md:py-16">
        <p className="eyebrow">Help, fast</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Emergency services in Masvingo</h1>
        <p className="mt-3 max-w-prose text-ink-muted">
          Real numbers for Masvingo and surrounds. Always call the national emergency line first
          (<a href="tel:995" className="text-brand underline">995 Police</a>,{' '}
          <a href="tel:994" className="text-brand underline">994 Ambulance</a>,{' '}
          <a href="tel:993" className="text-brand underline">993 Fire</a>) and confirm location.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {groups.map(g => (
            <div key={g.category} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={ICON_FOR[g.category] ?? 'info'} size={20} />
                </span>
                <h2 className="text-xl font-medium">{g.category}</h2>
              </div>
              <ul className="mt-5 divide-y divide-line">
                {g.items.map(it => (
                  <li key={it.name} className={`py-4 first:pt-0 last:pb-0 ${it.highlight ? 'bg-brand-50 -mx-6 px-6 rounded-xl my-2' : ''}`}>
                    <p className="font-medium">{it.name}</p>
                    {it.address && <p className="mt-0.5 text-xs text-ink-muted inline-flex items-center gap-1.5"><Icon name="pin" size={12} />{it.address}</p>}
                    {it.hours && <p className="mt-0.5 text-xs text-ink-muted inline-flex items-center gap-1.5"><Icon name="clock" size={12} />{it.hours}</p>}
                    <div className="mt-2 flex flex-wrap gap-2">
                      <a href={`tel:${it.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white px-3 py-1.5 text-xs font-medium">
                        <Icon name="phone" size={12} />{it.phone}
                      </a>
                      {it.alt && (
                        <a href={`tel:${it.alt.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink hover:border-brand-500">
                          <Icon name="phone" size={12} />{it.alt}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-brand text-white p-6 md:p-8 grid gap-4 md:grid-cols-[1fr_auto] items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">In a Wonder Travel rental?</h2>
            <p className="mt-1 text-white/85 text-sm md:text-base">Save the line: <span className="font-medium">+263 77 225 8979</span>. We&apos;ll arrange roadside assistance, replacement vehicle, or co-ordinate with police and insurers.</p>
          </div>
          <a href="https://wa.me/263772258979?text=Hi%20Wonder%20Travel%2C%20I%20need%20help." target="_blank" rel="noopener noreferrer" className="btn btn-md bg-white text-brand hover:bg-brand-50" style={{ height: 52, padding: '0 24px', fontSize: 16 }}>
            <Icon name="whatsapp" size={18} />
            WhatsApp now
          </a>
        </div>
      </section>
    </>
  );
}
