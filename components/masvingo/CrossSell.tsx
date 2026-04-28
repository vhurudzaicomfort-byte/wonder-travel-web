import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export function CrossSell() {
  return (
    <section className="container-x py-14 md:py-20">
      <p className="eyebrow">Travelling with us</p>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold">Cars &amp; shuttles for every trip.</h2>
      <p className="mt-3 max-w-prose text-ink-muted">
        Refer your clients to our transport &amp; car-hire services. Self-drive, chauffeur-driven, or pre-booked airport shuttles from Harare, Bulawayo and Vic Falls into Masvingo.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Link href="/vehicles" className="card p-6 hover:shadow hover:-translate-y-0.5 transition-all">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand"><Icon name="car" size={22} /></span>
          <h3 className="mt-4 text-lg font-medium">Hire a car</h3>
          <p className="mt-1 text-sm text-ink-muted">Self-drive sedans, SUVs, 4x4s and vans across our 8-vehicle fleet.</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand">Browse fleet <Icon name="arrow-right" size={16} /></span>
        </Link>
        <Link href="/services/airport-transfers" className="card p-6 hover:shadow hover:-translate-y-0.5 transition-all">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand"><Icon name="pin" size={22} /></span>
          <h3 className="mt-4 text-lg font-medium">Airport shuttle</h3>
          <p className="mt-1 text-sm text-ink-muted">Door-to-door from RGM, JM Nkomo or Vic Falls into Masvingo and Great Zimbabwe.</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand">Book a shuttle <Icon name="arrow-right" size={16} /></span>
        </Link>
        <Link href="/services/chauffeur-driven" className="card p-6 hover:shadow hover:-translate-y-0.5 transition-all">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand"><Icon name="users" size={22} /></span>
          <h3 className="mt-4 text-lg font-medium">Chauffeur-driven</h3>
          <p className="mt-1 text-sm text-ink-muted">Sit back. We drive. Hourly, daily and multi-day rates for tours and events.</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand">Book chauffeur <Icon name="arrow-right" size={16} /></span>
        </Link>
      </div>
    </section>
  );
}
