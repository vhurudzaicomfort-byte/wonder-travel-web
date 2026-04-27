import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export function CTABand() {
  return (
    <section className="bg-brand text-white">
      <div className="container-x py-16 md:py-20 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <p className="eyebrow text-brand-50">Ready to drive?</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">Book a car in under 4 minutes.</h2>
          <p className="mt-3 text-white/80 max-w-md">
            Pick a vehicle, fill in your details, pay how you like, and you are done.
            Talk to a human on WhatsApp if you would rather.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
          <Link href="/book" className="btn btn-md bg-white text-brand hover:bg-brand-50 active:scale-[0.98]" style={{ height: 52, padding: '0 24px', fontSize: 16 }}>
            Start booking
            <Icon name="arrow-right" size={18} />
          </Link>
          <a href="https://wa.me/263772258979" target="_blank" rel="noopener noreferrer" className="btn btn-md border-[1.5px] border-white/40 text-white hover:bg-white/10" style={{ height: 52, padding: '0 24px', fontSize: 16 }}>
            <Icon name="whatsapp" size={18} />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
