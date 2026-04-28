import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { VisitMasvingoHero } from '@/components/masvingo/VisitMasvingoHero';
import { TopAttractions } from '@/components/masvingo/TopAttractions';
import { MasvingoTabs } from '@/components/masvingo/MasvingoTabs';
import { CrossSell } from '@/components/masvingo/CrossSell';
import { Icon } from '@/components/ui/Icon';
import {
  getDestinations, getDestinationCategories, getTopDestinations,
  getStays, getChillSpots, getActivities
} from '@/lib/api';

export const metadata: Metadata = {
  title: 'Visit Masvingo — the Ancient City',
  description: 'Tourism, culture, adventure in Masvingo, Zimbabwe. Great Zimbabwe ruins, Lake Mutirikwi, Gonarezhou. Where to stay, eat and what to do.'
};

export default function VisitMasvingoPage() {
  const destinations = getDestinations();
  const categories = getDestinationCategories();
  const top = getTopDestinations(6);
  const stays = getStays();
  const chillSpots = getChillSpots();
  const activities = getActivities();

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Visit Masvingo' }]} />
      </div>
      <VisitMasvingoHero />
      <TopAttractions items={top} />

      <div id="explore" />
      <MasvingoTabs
        destinations={destinations}
        destinationCategories={categories}
        stays={stays}
        chillSpots={chillSpots}
        activities={activities}
      />

      <section className="bg-brand text-white">
        <div className="container-x py-14 md:py-16 grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div>
            <p className="eyebrow text-brand-50">For local businesses</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">Run a place in Masvingo? List it for free.</h2>
            <p className="mt-3 text-white/85 max-w-prose">
              Lodge, restaurant, club, attraction or activity — submit your business and we&apos;ll feature it after a quick review. Free advertising for local Masvingo operators.
            </p>
          </div>
          <Link href="/visit-masvingo/add-your-place" className="btn btn-md bg-white text-brand hover:bg-brand-50" style={{ height: 56, padding: '0 28px', fontSize: 16 }}>
            <Icon name="upload" size={18} />
            Add your place
          </Link>
        </div>
      </section>

      <CrossSell />

      <section className="bg-surface-3">
        <div className="container-x py-12 md:py-16 grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div>
            <p className="eyebrow">Need help</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold">Emergency services in Masvingo</h2>
            <p className="mt-2 text-ink-muted">Police, ambulance, fire, hospitals and 24/7 roadside assist — all in one place.</p>
          </div>
          <Link href="/emergency" className="btn btn-secondary btn-lg">
            <Icon name="shield" size={18} />
            View directory
          </Link>
        </div>
      </section>
    </>
  );
}
