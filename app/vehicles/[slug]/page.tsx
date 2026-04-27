import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { VehicleDetail } from '@/components/vehicles/VehicleDetail';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { Icon } from '@/components/ui/Icon';
import { getVehicleBySlug, getSimilarVehicles, getVehicles } from '@/lib/api';

export function generateStaticParams() {
  return getVehicles().map(v => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const v = getVehicleBySlug(params.slug);
  if (!v) return { title: 'Vehicle' };
  return {
    title: `${v.year} ${v.make} ${v.model} — hire from USD ${v.rates.perDayUSD}/day`,
    description: v.shortDescription
  };
}

export default function VehiclePage({ params }: { params: { slug: string } }) {
  const v = getVehicleBySlug(params.slug);
  if (!v) notFound();
  const similar = getSimilarVehicles(params.slug, 3);

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${v.year} ${v.make} ${v.model}`,
    image: [v.images.cover],
    brand: { '@type': 'Brand', name: v.make },
    description: v.shortDescription,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: v.rates.perDayUSD,
      availability: v.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    },
    aggregateRating: v.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: v.rating,
      reviewCount: v.reviewCount
    } : undefined
  };

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicles', href: '/vehicles' },
          { label: `${v.year} ${v.make} ${v.model}` }
        ]} />
      </div>
      <VehicleDetail v={v} />

      {similar.length > 0 && (
        <section className="section bg-white border-t border-line">
          <div className="container-x">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl md:text-3xl font-bold">Similar vehicles</h2>
              <Link href="/vehicles" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                See all <Icon name="arrow-right" size={16} />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map(s => <VehicleCard key={s.id} v={s} />)}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
    </>
  );
}
