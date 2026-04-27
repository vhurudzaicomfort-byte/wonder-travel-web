import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Icon, IconName } from '@/components/ui/Icon';
import { CTABand } from '@/components/marketing/CTABand';
import { getServiceById, getServices } from '@/lib/api';

export function generateStaticParams() {
  return getServices().map(s => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = getServiceById(params.slug);
  if (!s) return { title: 'Service' };
  return { title: s.title, description: s.summary };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getServiceById(params.slug);
  if (!s) notFound();

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: s.title }
        ]} />
      </div>
      <section className="container-x py-10 md:py-16 max-w-3xl">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
          <Icon name={s.icon as IconName} size={26} />
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold">{s.title}</h1>
        <p className="mt-3 text-lg text-brand font-medium">{s.summary}</p>
        <p className="mt-4 text-base text-ink-muted leading-relaxed">{s.body}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/book" className="btn btn-primary btn-md">Book now</Link>
          <Link href="/contact" className="btn btn-secondary btn-md">Get a quote</Link>
        </div>
      </section>
      <CTABand />
    </>
  );
}
