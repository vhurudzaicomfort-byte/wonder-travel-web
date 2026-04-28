'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { useBooking } from '@/lib/store';
import { formatUSD } from '@/lib/format';
import type { Vehicle } from '@/lib/types';

const TABS = ['Overview', 'Included', 'Requirements', 'Cancellation'] as const;
type Tab = typeof TABS[number];

export function VehicleDetail({ v }: { v: Vehicle }) {
  const setVehicle = useBooking(s => s.setVehicle);
  const [tab, setTab] = useState<Tab>('Overview');
  const gallery = v.images.gallery.length > 0 ? v.images.gallery : [v.images.cover];
  const [activeImg, setActiveImg] = useState(0);

  return (
    <section className="container-x pt-6 pb-12 md:pb-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="overflow-hidden rounded-2xl bg-surface-3" style={{ aspectRatio: '16 / 10' }}>
            <img
              src={gallery[activeImg]}
              alt={`${v.year} ${v.make} ${v.model}`}
              width={1600}
              height={1000}
              className="h-full w-full object-cover"
              onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80'; }}
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`overflow-hidden rounded-lg border-2 ${i === activeImg ? 'border-brand' : 'border-transparent'}`}
                >
                  <img src={g} alt="" className="h-16 w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <h1 className="mt-6 text-3xl md:text-4xl font-bold">{v.year} {v.make} {v.model}</h1>
          {v.descriptor && <p className="mt-1 text-base font-medium text-brand">{v.descriptor}</p>}
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="pill">{v.category}</span>
            <span className="pill">{v.transmission === 'automatic' ? 'Automatic' : 'Manual'}</span>
            <span className="pill">{v.seats} seats</span>
            <span className="pill capitalize">{v.fuel}</span>
            {v.ac && <span className="pill">AC</span>}
            {v.fourWheelDrive && <span className="pill">4WD</span>}
            {v.crossBorderAllowed && <span className="pill">Cross-border</span>}
          </div>

          {v.reviewCount > 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="inline-flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={16} className={i < Math.round(v.rating) ? 'text-warning' : 'text-line'} />
                ))}
              </span>
              <span className="font-medium">{v.rating.toFixed(1)}</span>
              <span className="text-ink-subtle">({v.reviewCount} reviews)</span>
            </div>
          )}

          <div className="mt-8 border-b border-line">
            <div className="flex gap-1 overflow-x-auto -mb-px">
              {TABS.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-brand text-brand' : 'border-transparent text-ink-muted hover:text-ink'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 prose prose-sm max-w-none text-ink-muted leading-relaxed">
            {tab === 'Overview' && <p className="text-base text-ink">{v.longDescription}</p>}
            {tab === 'Included' && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 not-prose">
                {v.features.map(f => (
                  <li key={f} className="inline-flex items-center gap-2 text-sm text-ink">
                    <Icon name="check" size={16} className="text-success" />{f}
                  </li>
                ))}
                <li className="inline-flex items-center gap-2 text-sm text-ink"><Icon name="check" size={16} className="text-success" />Comprehensive insurance</li>
                <li className="inline-flex items-center gap-2 text-sm text-ink"><Icon name="check" size={16} className="text-success" />24/7 WhatsApp support</li>
              </ul>
            )}
            {tab === 'Requirements' && (
              <ul className="space-y-2 not-prose text-sm">
                <li>Minimum driver age: <strong>{v.minDriverAge}</strong></li>
                <li>Valid driver&apos;s licence held for at least <strong>2 years</strong></li>
                <li>National ID or passport</li>
                <li>Refundable deposit: <strong className="tabular">{formatUSD(v.depositUSD)}</strong> held at pickup</li>
                <li>
                  Free mileage: <strong>{v.freeKmPerDay ?? 250} km / day</strong>.{' '}
                  Extra mileage: <strong className="tabular">${v.extraKmUSD ?? 1} / km</strong>.
                </li>
              </ul>
            )}
            {tab === 'Cancellation' && (
              <ul className="space-y-2 not-prose text-sm">
                <li>Free cancellation up to <strong>24 hours</strong> before pickup.</li>
                <li>Within 24 hours of pickup: a one-day rate is retained, the remainder refunded.</li>
                <li>No-show: full first-day rate retained; remainder refunded.</li>
              </ul>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="card p-6">
            <p className="text-sm text-ink-muted">From</p>
            <p className="mt-1 text-3xl font-bold tabular">{formatUSD(v.rates.perDayUSD)}<span className="text-base font-medium text-ink-muted"> / day</span></p>
            <p className="mt-1 text-xs text-ink-subtle">Per week {formatUSD(v.rates.perWeekUSD)} &middot; per month {formatUSD(v.rates.perMonthUSD)}</p>

            <ul className="mt-5 space-y-2 text-sm text-ink-muted">
              <li className="inline-flex items-center gap-2"><Icon name="check" size={16} className="text-success" />Free cancellation up to 24h before pickup</li>
              <li className="inline-flex items-center gap-2"><Icon name="check" size={16} className="text-success" />Comprehensive insurance included</li>
              <li className="inline-flex items-center gap-2"><Icon name="route" size={16} className="text-brand" />{v.freeKmPerDay ?? 250} km/day included &middot; ${v.extraKmUSD ?? 1}/km after</li>
              <li className="inline-flex items-center gap-2"><Icon name="check" size={16} className="text-success" />Refundable deposit {formatUSD(v.depositUSD)}</li>
            </ul>

            <Link
              href="/book"
              onClick={() => setVehicle(v.slug)}
              className="btn btn-primary btn-lg w-full mt-6"
            >
              Book this vehicle
            </Link>
            <a
              href={`https://wa.me/263772258979?text=${encodeURIComponent(`Hi Wonder Travel, I'd like to ask about the ${v.year} ${v.make} ${v.model}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg w-full mt-2"
            >
              <Icon name="whatsapp" size={18} />
              WhatsApp us
            </a>

            <div className="mt-5 pt-5 border-t border-line text-xs text-ink-muted space-y-1">
              <p className="inline-flex items-center gap-2"><Icon name="pin" size={14} /> Pickup at our Masvingo HQ included</p>
              <p className="inline-flex items-center gap-2"><Icon name="shield" size={14} /> Insured fleet, serviced before each rental</p>
            </div>
          </div>
        </aside>
      </div>

      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
        <Link
          href="/book"
          onClick={() => setVehicle(v.slug)}
          className="btn btn-primary btn-lg w-full shadow-lg"
        >
          Book {formatUSD(v.rates.perDayUSD)} / day
        </Link>
      </div>
    </section>
  );
}
