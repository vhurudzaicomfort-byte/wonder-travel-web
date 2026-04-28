import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AddYourPlaceForm } from '@/components/masvingo/AddYourPlaceForm';
import { Icon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'Add your place — Visit Masvingo',
  description: 'List your Masvingo lodge, restaurant, bar, club, attraction or activity for free on Wonder Travel.'
};

export default function AddYourPlacePage() {
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Visit Masvingo', href: '/visit-masvingo' },
          { label: 'Add your place' }
        ]} />
      </div>
      <section className="container-x py-10 md:py-16 max-w-3xl">
        <p className="eyebrow">Free listing</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">List your place — for free.</h1>
        <p className="mt-3 text-ink-muted leading-relaxed max-w-prose">
          Run a lodge, restaurant, bar, club, attraction or activity in Masvingo? Submit it below and we&apos;ll
          feature it on the Visit Masvingo page after a quick review. No fees, no catch — free advertising
          for local operators.
        </p>

        <ul className="mt-6 space-y-1.5 text-sm text-ink-muted">
          <li className="inline-flex items-center gap-2"><Icon name="check" size={14} className="text-success" /> Reviewed within 48 hours</li>
          <li className="inline-flex items-center gap-2"><Icon name="check" size={14} className="text-success" /> Free traffic from travellers booking cars with us</li>
          <li className="inline-flex items-center gap-2"><Icon name="check" size={14} className="text-success" /> Edit or remove anytime by emailing wondertravelw@gmail.com</li>
        </ul>

        <div className="mt-10">
          <AddYourPlaceForm />
        </div>

        <div className="mt-10 rounded-2xl bg-surface-3 p-5 text-sm text-ink-muted">
          <p>
            Prefer to send photos and details by email or WhatsApp? Reach us on{' '}
            <a href="https://wa.me/263772258979" target="_blank" rel="noopener noreferrer" className="text-brand underline">+263 77 225 8979</a>{' '}
            or <a href="mailto:wondertravelw@gmail.com" className="text-brand underline">wondertravelw@gmail.com</a>.
            Or <Link href="/visit-masvingo" className="text-brand underline">browse what&apos;s already listed</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
