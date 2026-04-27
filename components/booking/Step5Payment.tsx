'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon, IconName } from '@/components/ui/Icon';
import { useBooking } from '@/lib/store';
import { usePricing } from './PriceSummary';
import { formatUSD, generateBookingRef } from '@/lib/format';

const METHODS: { id: string; label: string; tagline: string; icon: IconName }[] = [
  { id: 'ecocash', label: 'EcoCash', tagline: 'Instant prompt to your phone', icon: 'mobile-money' },
  { id: 'paynow',  label: 'Paynow',  tagline: 'EcoCash, OneMoney, Visa, Zimswitch', icon: 'mobile-money' },
  { id: 'card',    label: 'Visa / Mastercard', tagline: 'Pay with a card', icon: 'card' },
  { id: 'zipit',   label: 'ZIPIT / bank transfer', tagline: 'Transfer and upload proof', icon: 'bank' },
  { id: 'manual',  label: 'Manual proof of payment', tagline: 'Cash, OneMoney, other', icon: 'upload' }
];

export function Step5Payment() {
  const router = useRouter();
  const { paymentMethod, setPaymentMethod, setBookingRef, driver } = useBooking();
  const p = usePricing();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!p.vehicle) {
    return (
      <section className="container-x py-12">
        <p className="text-ink-muted">Your booking session is empty. Start over.</p>
        <Link href="/vehicles" className="btn btn-secondary btn-md mt-3">Browse vehicles</Link>
      </section>
    );
  }

  const onPay = async () => {
    if (!paymentMethod) {
      setError('Pick a payment method to continue.');
      return;
    }
    setError(null);
    setSubmitting(true);
    // MOCK_PAYMENT — wire real provider here in Phase 2
    await new Promise(r => setTimeout(r, 1200));
    const ref = generateBookingRef(driver.lastName);
    setBookingRef(ref);
    router.push(`/book/confirmation/${ref}`);
  };

  return (
    <section className="container-x py-8 md:py-12 grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="card p-5">
          <h2 className="text-lg font-medium">Choose how you want to pay</h2>
          <p className="mt-1 text-sm text-ink-muted">Total due now: <span className="tabular font-medium">{formatUSD(p.total)}</span></p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {METHODS.map(m => {
              const selected = paymentMethod === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  aria-pressed={selected}
                  className={`text-left rounded-xl border p-4 transition-colors ${selected ? 'border-brand bg-brand-50' : 'border-line hover:bg-surface-3'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${selected ? 'bg-brand text-white' : 'bg-white text-brand border border-line'}`}>
                      <Icon name={m.icon} size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{m.label}</p>
                      <p className="text-xs text-ink-muted">{m.tagline}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {paymentMethod === 'ecocash' && (
          <PaymentPanel title="EcoCash">
            <Field label="EcoCash mobile number" defaultValue={driver.phone} />
            <p className="text-sm text-ink-muted">You will receive a {formatUSD(p.total)} prompt on your phone within 30 seconds. Approve it to confirm your booking.</p>
          </PaymentPanel>
        )}
        {paymentMethod === 'paynow' && (
          <PaymentPanel title="Paynow">
            <p className="text-sm text-ink-muted">You will be redirected to Paynow to complete payment securely. Booking is held for 30 minutes.</p>
          </PaymentPanel>
        )}
        {paymentMethod === 'card' && (
          <PaymentPanel title="Visa / Mastercard">
            <p className="text-sm text-ink-muted inline-flex items-center gap-2"><Icon name="lock" size={16} className="text-brand" /> Encrypted with TLS &middot; we never store your card details.</p>
            <div className="grid gap-3 sm:grid-cols-2 mt-4">
              <Field label="Card number" placeholder="•••• •••• •••• ••••" />
              <Field label="Cardholder name" />
              <Field label="Expiry (MM/YY)" placeholder="MM/YY" />
              <Field label="CVC" placeholder="•••" />
            </div>
          </PaymentPanel>
        )}
        {paymentMethod === 'zipit' && (
          <PaymentPanel title="ZIPIT / bank transfer">
            <dl className="grid grid-cols-[140px_1fr] gap-y-1 text-sm">
              <dt className="text-ink-muted">Bank</dt><dd>CABS</dd>
              <dt className="text-ink-muted">Account name</dt><dd>Wonder Travel Car Rental Services</dd>
              <dt className="text-ink-muted">Account number</dt><dd className="tabular">TBC — confirm with client</dd>
              <dt className="text-ink-muted">ZIPIT code</dt><dd className="tabular">TBC</dd>
              <dt className="text-ink-muted">Reference</dt><dd className="tabular">your booking ref</dd>
            </dl>
            <Field label="Upload proof of payment" type="file" />
          </PaymentPanel>
        )}
        {paymentMethod === 'manual' && (
          <PaymentPanel title="Manual proof of payment">
            <Field label="How did you pay?" placeholder="Cash deposit at branch, OneMoney, etc." />
            <Field label="Upload proof" type="file" />
          </PaymentPanel>
        )}

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex items-center justify-between gap-3">
          <Link href="/book/review" className="btn btn-ghost btn-md">
            <Icon name="arrow-left" size={16} /> Back
          </Link>
          <button type="button" className="btn btn-primary btn-lg" onClick={onPay} disabled={submitting || !paymentMethod}>
            {submitting ? (
              <>
                <Icon name="spinner" size={18} className="animate-spin" />
                Processing
              </>
            ) : (
              <>
                Pay {formatUSD(p.total)}
                <Icon name="lock" size={18} />
              </>
            )}
          </button>
        </div>

        <PaymentTrust />
      </div>
      <aside><PaymentSummary /></aside>
    </section>
  );
}

function PaymentPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <h3 className="text-base font-medium">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, defaultValue, placeholder, type = 'text' }: { label: string; defaultValue?: string; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input type={type} defaultValue={defaultValue} placeholder={placeholder} className="field-input" />
    </label>
  );
}

function PaymentTrust() {
  return (
    <div className="rounded-xl border border-line bg-surface-3 p-4 text-xs text-ink-muted">
      <p className="inline-flex items-center gap-2 font-medium text-ink"><Icon name="lock" size={14} className="text-brand" /> Your payment is secured.</p>
      <p className="mt-1">We never store your card details. By paying you accept our Terms and Cancellation Policy.</p>
    </div>
  );
}

function PaymentSummary() {
  const p = usePricing();
  if (!p.vehicle) return null;
  return (
    <div className="card p-5 sticky top-24">
      <h3 className="text-sm font-medium">Booking summary</h3>
      <p className="mt-3 text-sm font-medium">{p.vehicle.year} {p.vehicle.make} {p.vehicle.model}</p>
      <p className="text-xs text-ink-muted">{p.days} day{p.days !== 1 ? 's' : ''}</p>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-sm text-ink-muted">Total due</span>
        <span className="text-xl font-bold tabular">{formatUSD(p.total)}</span>
      </div>
    </div>
  );
}
