import { BookingWidget } from './BookingWidget';
import { TrustStrip } from './TrustStrip';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero/home-hero.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/40 to-ink/70" aria-hidden="true" />
      <div className="relative container-x pt-16 pb-12 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24">
        <p className="eyebrow text-brand-50">Masvingo &middot; Zimbabwe</p>
        <h1 className="mt-3 text-white font-bold leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}>
          Drive Zimbabwe.<br />
          The Wonder way.
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-white/85">
          Self-drive and chauffeur car rentals from Masvingo. Available across Zimbabwe.
          EcoCash, Visa &amp; Paynow accepted. Instant confirmation.
        </p>
        <div className="mt-7 max-w-5xl">
          <BookingWidget />
        </div>
        <div className="mt-6">
          <TrustStrip variant="dark" />
        </div>
      </div>
    </section>
  );
}
