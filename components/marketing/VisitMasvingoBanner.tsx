import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export function VisitMasvingoBanner() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1535082623926-b39352a03fb7?auto=format&fit=crop&w=2000&q=80')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/45" aria-hidden="true" />
          <div className="relative px-6 py-14 md:px-12 md:py-20 lg:px-16 lg:py-24 max-w-3xl">
            <p className="eyebrow text-brand-50">The Ancient City</p>
            <h2 className="mt-2 text-white font-bold leading-[1.1]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              While you&apos;re here — discover Masvingo.
            </h2>
            <p className="mt-3 text-white/85 text-base md:text-lg max-w-xl">
              Great Zimbabwe ruins, Lake Mutirikwi, Gonarezhou&apos;s elephant herds, and Masvingo&apos;s
              best lodges, restaurants and clubs — all in one premium guide.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/visit-masvingo" className="btn btn-md bg-white text-brand hover:bg-brand-50" style={{ height: 52, padding: '0 24px', fontSize: 16 }}>
                <Icon name="search" size={18} />
                Visit Masvingo
              </Link>
              <Link href="/visit-masvingo/add-your-place" className="btn btn-md border-[1.5px] border-white/40 text-white hover:bg-white/10" style={{ height: 52, padding: '0 24px', fontSize: 16 }}>
                Add your place
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
