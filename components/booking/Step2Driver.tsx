'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { useBooking } from '@/lib/store';
import { PriceSummary } from './PriceSummary';

export function Step2Driver() {
  const router = useRouter();
  const { driver, setDriver } = useBooking();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/book/extras');
  };

  const set = (k: string, v: unknown) => setDriver({ [k]: v } as never);

  return (
    <section className="container-x py-8 md:py-12 grid gap-8 lg:grid-cols-[1fr_360px]">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="card p-5">
          <h2 className="text-lg font-medium">Primary driver</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="First name" required>
              <input className="field-input" required value={driver.firstName || ''} onChange={e => set('firstName', e.target.value)} />
            </Field>
            <Field label="Last name" required>
              <input className="field-input" required value={driver.lastName || ''} onChange={e => set('lastName', e.target.value)} />
            </Field>
            <Field label="Date of birth" required helper="Must be 23 or older">
              <input type="date" className="field-input" required value={driver.dob || ''} onChange={e => set('dob', e.target.value)} />
            </Field>
            <Field label="Email" required>
              <input type="email" className="field-input" required value={driver.email || ''} onChange={e => set('email', e.target.value)} />
            </Field>
            <Field label="WhatsApp phone" required helper="Include country code, e.g. +263">
              <input type="tel" placeholder="+263 77 123 4567" className="field-input" required pattern="^\+\d{6,15}$" value={driver.phone || ''} onChange={e => set('phone', e.target.value)} />
            </Field>
            <Field label="National ID or passport" required>
              <input className="field-input" required minLength={6} maxLength={20} value={driver.idNumber || ''} onChange={e => set('idNumber', e.target.value)} />
            </Field>
            <Field label="Driver's licence number" required>
              <input className="field-input" required value={driver.licenceNumber || ''} onChange={e => set('licenceNumber', e.target.value)} />
            </Field>
            <Field label="Licence issued in" required>
              <select className="field-input" value={driver.licenceCountry || 'ZW'} onChange={e => set('licenceCountry', e.target.value)}>
                <option value="ZW">Zimbabwe</option>
                <option value="ZA">South Africa</option>
                <option value="BW">Botswana</option>
                <option value="ZM">Zambia</option>
                <option value="UK">United Kingdom</option>
                <option value="US">United States</option>
                <option value="OTHER">Other</option>
              </select>
            </Field>
            <Field label="Held licence since" required helper="Must be 2+ years">
              <input type="number" min={1980} max={new Date().getFullYear()} className="field-input" required value={driver.licenceHeldSince || ''} onChange={e => set('licenceHeldSince', e.target.value)} />
            </Field>
          </div>
          <label className="mt-5 flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-brand h-4 w-4" checked={!!driver.addAdditionalDriver} onChange={e => set('addAdditionalDriver', e.target.checked)} />
            Add an additional driver (+ USD 5/day)
          </label>
        </div>

        <div className="card p-5">
          <h2 className="text-lg font-medium">Address</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Street" required>
              <input className="field-input" required value={driver.street || ''} onChange={e => set('street', e.target.value)} />
            </Field>
            <Field label="City" required>
              <input className="field-input" required value={driver.city || ''} onChange={e => set('city', e.target.value)} />
            </Field>
            <Field label="Country" required>
              <input className="field-input" required value={driver.country || ''} onChange={e => set('country', e.target.value)} />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Link href="/book" className="btn btn-ghost btn-md">
            <Icon name="arrow-left" size={16} /> Back
          </Link>
          <button type="submit" className="btn btn-primary btn-lg">
            Continue <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </form>

      <aside><PriceSummary /></aside>
    </section>
  );
}

function Field({ label, children, required, helper }: { label: string; children: React.ReactNode; required?: boolean; helper?: string }) {
  return (
    <div>
      <span className="field-label">
        {label}{required && <span className="text-ink-muted"> *</span>}
      </span>
      {children}
      {helper && <p className="field-helper">{helper}</p>}
    </div>
  );
}
