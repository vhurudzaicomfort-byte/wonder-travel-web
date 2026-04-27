import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon, IconName } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { getServices } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Services — self-drive, chauffeur, airport, corporate',
  description: 'Self-drive, chauffeur-driven, airport transfers, long-term rental, corporate accounts and wedding cars.'
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
      </div>
      <section className="container-x py-10 md:py-16">
        <p className="eyebrow">Services</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">More than just keys.</h1>
        <p className="mt-3 max-w-prose text-ink-muted">From self-drive weekend trips to chauffeured weddings — we cover it.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(s => (
            <article key={s.id} id={s.id} className="card p-6 flex flex-col">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name={s.icon as IconName} size={22} />
              </span>
              <h2 className="mt-4 text-xl font-medium">{s.title}</h2>
              <p className="mt-1 text-sm font-medium text-brand">{s.summary}</p>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed flex-1">{s.body}</p>
              <Link href={`/services/${s.id}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                Learn more <Icon name="arrow-right" size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
