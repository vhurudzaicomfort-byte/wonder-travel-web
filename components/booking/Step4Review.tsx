'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { useBooking } from '@/lib/store';
import { usePricing } from './PriceSummary';
import { formatUSD } from '@/lib/format';

export function Step4Review() {
  const router = useRouter();
  const { trip, driver, extras, termsAccepted, setTerms } = useBooking();
  const p = usePricing();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    router.push('/book/payment');
  };

  if (!p.vehicle) {
    return (
      <section className="container-x py-12">
        <p className="text-ink-muted">Please pick a vehicle first.</p>
        <Link href="/vehicles" className="btn btn-secondary btn-md mt-3">Browse vehicles</Link>
      </section>
    );
  }

  return (
    <section className="container-x py-8 md:py-12">
      <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
        <div className="card p-5 space-y-4">
          <Block label="Vehicle" editHref="/vehicles">
            <p className="font-medium">{p.vehicle.year} {p.vehicle.make} {p.vehicle.model}</p>
            <p className="text-sm text-ink-muted">{p.vehicle.category} &middot; {p.vehicle.transmission}</p>
          </Block>
          <Block label="Pickup" editHref="/book">
            <p>{p.pickupLoc?.label}</p>
            <p className="text-sm text-ink-muted">{trip.pickupDate} &middot; {trip.pickupTime}</p>
          </Block>
          <Block label="Drop-off" editHref="/book">
            <p>{trip.sameDropoff ? p.pickupLoc?.label : p.dropoffLoc?.label}</p>
            <p className="text-sm text-ink-muted">{trip.returnDate} &middot; {trip.returnTime}</p>
          </Block>
          <Block label="Driver" editHref="/book/driver">
            <p>{driver.firstName} {driver.lastName}</p>
            <p className="text-sm text-ink-muted">{driver.email} &middot; {driver.phone}</p>
          </Block>
          {extras.length > 0 && (
            <Block label="Extras" editHref="/book/extras">
              <ul className="text-sm">
                {p.extras.map(e => <li key={e.id}>{e.label}</li>)}
              </ul>
            </Block>
          )}
        </div>

        <div className="card p-5">
          <h3 className="text-base font-medium">Price summary</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <RowL label={`${p.days} day${p.days !== 1 ? 's' : ''} × ${formatUSD(p.vehicle.rates.perDayUSD)}`} value={formatUSD(p.vehicleSubtotal)} />
            {p.extrasSubtotal > 0 && <RowL label="Extras" value={formatUSD(p.extrasSubtotal)} />}
            {p.locationFee > 0 && <RowL label="Location fees" value={formatUSD(p.locationFee)} />}
            <div className="h-px bg-line my-2" />
            <RowL label="Subtotal" value={formatUSD(p.subtotal)} bold />
            <RowL label="Refundable deposit" value={formatUSD(p.deposit)} muted />
            <div className="h-px bg-line my-2" />
            <RowL label="Due now" value={formatUSD(p.total)} large />
          </dl>
        </div>

        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="accent-brand h-5 w-5 mt-0.5"
            checked={termsAccepted}
            onChange={e => setTerms(e.target.checked)}
          />
          <span>
            I confirm I am {p.vehicle.minDriverAge}+, have held a valid licence for at least 2 years, and accept the{' '}
            <Link href="/terms" className="text-brand underline" target="_blank">Terms</Link> and{' '}
            <Link href="/cancellation" className="text-brand underline" target="_blank">Cancellation Policy</Link>.
          </span>
        </label>

        <div className="flex items-center justify-between gap-3">
          <Link href="/book/extras" className="btn btn-ghost btn-md">
            <Icon name="arrow-left" size={16} /> Back
          </Link>
          <button type="submit" className="btn btn-primary btn-lg" disabled={!termsAccepted}>
            Continue to payment <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}

function Block({ label, editHref, children }: { label: string; editHref: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4 border-b border-line last:border-0 last:pb-0">
      <div>
        <p className="text-xs uppercase tracking-wider text-ink-subtle font-medium">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
      <Link href={editHref} className="text-sm font-medium text-brand">Edit</Link>
    </div>
  );
}

function RowL({ label, value, bold, muted, large }: { label: string; value: string; bold?: boolean; muted?: boolean; large?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className={muted ? 'text-ink-muted' : ''}>{label}</dt>
      <dd className={`tabular ${bold ? 'font-medium' : ''} ${large ? 'text-lg font-bold' : ''} ${muted ? 'text-ink-muted' : ''}`}>{value}</dd>
    </div>
  );
}
