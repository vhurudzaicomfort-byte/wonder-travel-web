'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useBooking } from '@/lib/store';
import { usePricing } from './PriceSummary';
import { formatUSD } from '@/lib/format';

export function Confirmation({ bookingRef }: { bookingRef: string }) {
  const { driver, trip, reset } = useBooking();
  const p = usePricing();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <section className="container-x py-12 md:py-20 max-w-2xl">
      <div className="text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success-50 text-success">
          <Icon name="check" size={48} />
        </span>
        <h1 className="mt-5 text-3xl md:text-4xl font-bold">
          You&apos;re all set{driver.firstName ? `, ${driver.firstName}` : ''}.
        </h1>
        <p className="mt-2 text-ink-muted">Booking reference</p>
        <p className="mt-1 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-base font-medium tabular text-brand">
          {bookingRef}
        </p>
      </div>

      <div className="card p-6 mt-8 space-y-3 text-sm">
        {p.vehicle && (
          <Row label="Vehicle" value={`${p.vehicle.year} ${p.vehicle.make} ${p.vehicle.model}`} />
        )}
        <Row label="Pickup" value={`${trip.pickupDate ?? ''} · ${trip.pickupTime ?? ''} · ${p.pickupLoc?.label ?? ''}`} />
        <Row label="Drop-off" value={`${trip.returnDate ?? ''} · ${trip.returnTime ?? ''}`} />
        {p.vehicle && <Row label="Total paid" value={formatUSD(p.total)} bold />}
      </div>

      <div className="mt-8 rounded-2xl bg-surface-3 p-6">
        <p className="text-sm">
          We&apos;ve sent a confirmation to <span className="font-medium">{driver.email || 'your email'}</span> and a WhatsApp
          message to <span className="font-medium">{driver.phone || 'your phone'}</span>.
        </p>
        <h2 className="mt-5 text-base font-medium">What to bring on pickup</h2>
        <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
          <li className="inline-flex items-center gap-2"><Icon name="check" size={14} className="text-success" /> Original driver&apos;s licence</li>
          <li className="inline-flex items-center gap-2"><Icon name="check" size={14} className="text-success" /> National ID or passport</li>
          <li className="inline-flex items-center gap-2"><Icon name="check" size={14} className="text-success" /> This booking reference</li>
        </ul>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <a
          href={`https://wa.me/263772258979?text=${encodeURIComponent(`Hi Wonder Travel, my booking reference is ${bookingRef}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-md"
        >
          <Icon name="whatsapp" size={18} /> WhatsApp us
        </a>
        <a href={`mailto:wondertravelw@gmail.com?subject=Booking%20${bookingRef}`} className="btn btn-secondary btn-md">
          <Icon name="mail" size={18} /> Email
        </a>
        <Link href="/" className="btn btn-ghost btn-md">Back to home</Link>
      </div>
    </section>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-ink-muted text-xs uppercase tracking-wider font-medium">{label}</span>
      <span className={`tabular ${bold ? 'font-bold text-base' : ''}`}>{value}</span>
    </div>
  );
}
