import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ListYourVehicleForm } from '@/components/partners/ListYourVehicleForm';
import { Icon } from '@/components/ui/Icon';

export const metadata: Metadata = {
  title: 'List your vehicle — Rent out your car through Wonder Travel',
  description: 'Earn extra income from your car. Wonder Travel handles marketing, bookings and insurance. Onboard your vehicle in minutes.'
};

export default function ListYourVehiclePage() {
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Partners', href: '/partners/list-your-vehicle' },
          { label: 'List your vehicle' }
        ]} />
      </div>
      <section className="container-x py-10 md:py-16 max-w-3xl">
        <p className="eyebrow">Partner onboarding</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Rent out your car through us.</h1>
        <p className="mt-3 text-ink-muted leading-relaxed max-w-prose">
          Tell us about your vehicle and we&apos;ll add it to the Wonder Travel fleet. We handle marketing,
          customer enquiries, bookings, payments and insurance — you earn a share of every rental.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Pill icon="wallet" title="Earn passive income" body="Your car earns when you don&apos;t need it." />
          <Pill icon="headset" title="We handle bookings" body="Marketing, customer service, payments." />
          <Pill icon="shield" title="Comprehensive cover" body="Every rental is insured before keys change hands." />
        </div>

        <div className="mt-10">
          <ListYourVehicleForm />
        </div>

        <div className="mt-10 rounded-2xl bg-surface-3 p-5 text-sm text-ink-muted">
          <p>
            Questions? WhatsApp us on{' '}
            <a href="https://wa.me/263772258979" target="_blank" rel="noopener noreferrer" className="text-brand underline">+263 77 225 8979</a>{' '}
            or email <a href="mailto:wondertravelw@gmail.com" className="text-brand underline">wondertravelw@gmail.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}

function Pill({ icon, title, body }: { icon: 'wallet' | 'headset' | 'shield'; title: string; body: string }) {
  return (
    <div className="card p-4">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand">
        <Icon name={icon} size={18} />
      </span>
      <p className="mt-2 text-sm font-medium">{title}</p>
      <p className="mt-0.5 text-xs text-ink-muted">{body}</p>
    </div>
  );
}
