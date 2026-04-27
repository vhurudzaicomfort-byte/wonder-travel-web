import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How Wonder Travel Car Rental Services collects, stores and uses your personal information.'
};

export default function PrivacyPage() {
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      </div>
      <section className="container-x py-10 md:py-16 max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Privacy policy</h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated: 28 April 2026.</p>

        <div className="mt-8 prose prose-base text-ink-muted leading-relaxed max-w-none">
          <p>This policy describes how Wonder Travel Car Rental Services collects, stores, uses, and shares your personal information when you book a vehicle with us.</p>

          <h2 className="text-ink">What we collect</h2>
          <ul>
            <li>Name, email, phone number, address</li>
            <li>National ID or passport number, driver&apos;s licence details</li>
            <li>Date of birth, licence-held-since year</li>
            <li>Payment method information (processed by our payment partners; we never see or store your full card number)</li>
            <li>Booking history</li>
          </ul>

          <h2 className="text-ink">How we use it</h2>
          <ul>
            <li>To complete and manage your rental</li>
            <li>To meet legal and regulatory obligations (e.g. proof of identity for the rental)</li>
            <li>To send booking-related communication via email, WhatsApp, or SMS</li>
          </ul>

          <h2 className="text-ink">How we store it</h2>
          <p>ID and licence numbers are stored encrypted at rest. We do not share your information with third parties beyond what is required to deliver your rental (e.g. our insurer if there is an incident).</p>

          <h2 className="text-ink">Your rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by emailing wondertravelw@gmail.com.</p>

          <h2 className="text-ink">Cookies</h2>
          <p>We use only essential cookies (booking session state). No third-party tracking is loaded on first page visit.</p>
        </div>
      </section>
    </>
  );
}
