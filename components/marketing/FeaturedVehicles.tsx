import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { getFeaturedVehicles } from '@/lib/api';

export function FeaturedVehicles() {
  const vehicles = getFeaturedVehicles(4);
  return (
    <section className="section bg-white border-y border-line">
      <div className="container-x">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Top picks</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Featured vehicles</h2>
          </div>
          <Link href="/vehicles" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-600">
            See all
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vehicles.map(v => <VehicleCard key={v.id} v={v} />)}
        </div>
        <div className="mt-8 sm:hidden">
          <Link href="/vehicles" className="btn btn-secondary btn-md w-full">
            See all vehicles
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
