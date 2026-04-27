import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CTABand } from '@/components/marketing/CTABand';

export const metadata: Metadata = {
  title: 'About — Masvingo-rooted, Zimbabwe-wide',
  description: 'Wonder Travel Car Rental Services is a locally owned operator based at 697 Industria Rd, Masvingo. We rent cars across Zimbabwe.'
};

export default function AboutPage() {
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      </div>
      <section className="container-x py-10 md:py-16 max-w-3xl">
        <p className="eyebrow">About us</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Masvingo-rooted. Zimbabwe-wide.</h1>
        <div className="mt-6 prose prose-base text-ink-muted leading-relaxed max-w-none">
          <p className="text-ink text-lg">
            Wonder Travel Car Rental Services is a locally owned operator based at 697 Industria Rd, Masvingo &mdash;
            five minutes from the heart of town and the road to Great Zimbabwe.
          </p>
          <p>
            We started by helping diaspora visitors and international tourists rent reliable, well-maintained cars
            for the Great Zimbabwe / Lake Mutirikwi corridor. Today we serve corporate accounts, NGOs working out
            of Gonarezhou, weekend travellers, and wedding parties &mdash; from Harare to Vic Falls.
          </p>
          <p>
            We believe rental cars in Zimbabwe should be simple. Visible USD pricing. Real photos. EcoCash and Visa
            equally easy. And a real human on WhatsApp when you need one.
          </p>
        </div>

        <h2 className="mt-12 text-2xl md:text-3xl font-bold">Why us</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { icon: 'shield', title: 'Locally owned', body: 'Decisions made in Masvingo — by people who use these roads.' },
            { icon: 'check', title: 'Fully insured', body: 'Comprehensive insurance with reasonable excess on every rental.' },
            { icon: 'gear', title: 'Road-tested fleet', body: 'Every car is serviced before each rental. No surprises on the highway.' },
            { icon: 'whatsapp', title: 'WhatsApp anytime', body: 'A real human on +263 77 225 8979 — day, night, weekends.' }
          ].map(it => (
            <li key={it.title} className="card p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name={it.icon as 'shield'} size={20} />
              </span>
              <h3 className="mt-3 font-medium">{it.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{it.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold">Areas we serve</h2>
          <p className="mt-3 text-ink-muted">Pickup at our HQ is free. We can deliver to airports and border posts countrywide:</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {['Masvingo (HQ)', 'Harare (RGM Airport)', 'Bulawayo (JM Nkomo)', 'Victoria Falls', 'Beitbridge', 'Mutare', 'Great Zimbabwe', 'Lake Mutirikwi'].map(p => (
              <li key={p} className="pill">{p}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex gap-3">
          <Link href="/vehicles" className="btn btn-primary btn-md">See the fleet</Link>
          <Link href="/contact" className="btn btn-secondary btn-md">Contact us</Link>
        </div>
      </section>
      <CTABand />
    </>
  );
}
