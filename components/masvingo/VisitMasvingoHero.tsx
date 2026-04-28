import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export function VisitMasvingoHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1535082623926-b39352a03fb7?auto=format&fit=crop&w=2400&q=80')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/45 to-ink/75" aria-hidden="true" />
      <div className="relative container-x pt-16 pb-14 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24">
        <p className="eyebrow text-brand-50">The Ancient City &middot; Zimbabwe&apos;s oldest city</p>
        <h1 className="mt-3 text-white font-bold leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}>
          Visit Masvingo
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-white/85">
          Tourism, culture, adventure. Great Zimbabwe ruins, lakes, big skies and the warmest welcome
          in the country. Plan your trip — and let us drive.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#explore" className="btn btn-md bg-white text-brand hover:bg-brand-50" style={{ height: 52, padding: '0 24px', fontSize: 16 }}>
            <Icon name="search" size={18} />
            Explore Masvingo
          </a>
          <Link href="/visit-masvingo/add-your-place" className="btn btn-md border-[1.5px] border-white/40 text-white hover:bg-white/10" style={{ height: 52, padding: '0 24px', fontSize: 16 }}>
            <Icon name="upload" size={18} />
            Add your place
          </Link>
        </div>
      </div>
    </section>
  );
}
