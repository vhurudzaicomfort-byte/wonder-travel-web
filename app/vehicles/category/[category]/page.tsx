import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { VehicleListing } from '@/components/vehicles/VehicleListing';
import { getVehicles, CATEGORIES, categorySlug, categoryFromSlug } from '@/lib/api';

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ category: categorySlug(c) }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const cat = categoryFromSlug(params.category);
  if (!cat) return { title: 'Vehicles' };
  return {
    title: `${cat} hire in Zimbabwe`,
    description: `${cat} car rental from Masvingo, available across Zimbabwe.`
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = categoryFromSlug(params.category);
  if (!cat) notFound();
  const vehicles = getVehicles().filter(v => v.category === cat);
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Vehicles', href: '/vehicles' },
          { label: cat }
        ]} />
      </div>
      <VehicleListing vehicles={vehicles} presetCategory={cat} />
    </>
  );
}
