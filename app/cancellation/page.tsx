import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cancellation policy',
  description: 'How to cancel or modify a booking with Wonder Travel Car Rental Services and what fees apply.'
};

export default function CancellationPage() {
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cancellation' }]} />
      </div>
      <section className="container-x py-10 md:py-16 max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Cancellation policy</h1>

        <div className="mt-8 prose prose-base text-ink-muted leading-relaxed max-w-none">
          <h2 className="text-ink">Cancellations</h2>
          <ul>
            <li><strong>More than 24 hours before pickup:</strong> full refund. Free of charge.</li>
            <li><strong>Within 24 hours of pickup:</strong> a one-day rate is retained; the remainder is refunded.</li>
            <li><strong>No-show:</strong> the first day&apos;s rate is retained; remainder is refunded if applicable.</li>
          </ul>

          <h2 className="text-ink">Modifications</h2>
          <p>You can change pickup/return dates, times or location free of charge up to 24 hours before pickup. WhatsApp us with your booking reference. Subject to vehicle availability for the new dates.</p>

          <h2 className="text-ink">How to cancel</h2>
          <p>WhatsApp +263 77 225 8979 or email wondertravelw@gmail.com with your booking reference. We confirm cancellations within 2 hours during business hours.</p>

          <h2 className="text-ink">Refunds</h2>
          <p>Refunds are processed via the original payment method within 5 working days. EcoCash refunds may take longer depending on the network.</p>
        </div>
      </section>
    </>
  );
}
