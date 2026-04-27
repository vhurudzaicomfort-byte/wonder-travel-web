import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { VehicleListing } from '@/components/vehicles/VehicleListing';
import { getVehicles } from '@/lib/api';

export const metadata: Metadata = {
  title: 'All vehicles — hire a car in Masvingo & Zimbabwe',
  description:
    'Browse the Wonder Travel fleet. Sedans, SUVs, 4x4s, vans and luxury cars available for self-drive or chauffeur hire across Zimbabwe.'
};

export default function VehiclesPage() {
  const vehicles = getVehicles();
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Vehicles' }]} />
      </div>
      <VehicleListing vehicles={vehicles} />
    </>
  );
}
