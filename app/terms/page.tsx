import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms & conditions',
  description: 'The rental agreement terms governing all bookings made with Wonder Travel Car Rental Services.'
};

export default function TermsPage() {
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      </div>
      <section className="container-x py-10 md:py-16 max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Terms &amp; conditions</h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated: 28 April 2026.</p>

        <div className="mt-8 prose prose-base text-ink-muted leading-relaxed max-w-none">
          <p>These terms govern all rentals made with Wonder Travel Car Rental Services (&ldquo;we&rdquo;, &ldquo;us&rdquo;) at 697 Industria Rd, Masvingo, Zimbabwe.</p>

          <h2 className="text-ink">1. Eligibility</h2>
          <p>The primary driver must be at least 23 years old (25 for selected 4x4 and luxury vehicles) and must have held a valid driver&apos;s licence for at least 2 years.</p>

          <h2 className="text-ink">2. Documents required at pickup</h2>
          <ul>
            <li>Original (not photocopy) driver&apos;s licence</li>
            <li>National ID or passport</li>
            <li>Booking reference</li>
          </ul>

          <h2 className="text-ink">3. Deposit</h2>
          <p>A refundable security deposit is held at the start of the rental and refunded on safe return of the vehicle. The amount depends on the vehicle and is shown at checkout.</p>

          <h2 className="text-ink">4. Fuel policy</h2>
          <p>Full-to-full. We hand over a full tank; please return it full. If you cannot, we charge for fuel plus a small refuel fee.</p>

          <h2 className="text-ink">5. Insurance &amp; excess</h2>
          <p>All rentals include comprehensive insurance with an excess. Optional Excess Reduction is available at checkout. You remain liable for damage outside the insurance scope (e.g. wilful damage, driving under the influence).</p>

          <h2 className="text-ink">6. Cross-border driving</h2>
          <p>Permitted on selected vehicles with prior arrangement. Notify us at least 48 hours before pickup so we can prepare the cross-border permit.</p>

          <h2 className="text-ink">7. Modifications &amp; cancellations</h2>
          <p>See our Cancellation Policy.</p>

          <h2 className="text-ink">8. Liability</h2>
          <p>You are responsible for traffic fines, parking tickets, and toll fees incurred during the rental.</p>

          <h2 className="text-ink">9. Disputes</h2>
          <p>Any disputes are governed by the laws of Zimbabwe and resolved in the courts of Masvingo.</p>
        </div>
      </section>
    </>
  );
}
