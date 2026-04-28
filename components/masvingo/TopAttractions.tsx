import { PlaceCard } from './PlaceCard';
import { destinationImage } from '@/lib/destination-images';
import type { Destination } from '@/lib/types';

export function TopAttractions({ items }: { items: Destination[] }) {
  return (
    <section className="bg-white border-y border-line">
      <div className="container-x py-14 md:py-20">
        <p className="eyebrow">Don&apos;t miss</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Top picks in Masvingo Province</h2>
        <p className="mt-3 max-w-prose text-ink-muted">UNESCO heritage, two of the largest dams in the country, and one of Africa&apos;s wildest national parks — all within a few hours of our HQ.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(d => (
            <PlaceCard
              key={d.id}
              image={destinationImage(d)}
              title={d.name}
              type={d.district}
              body={d.summary}
              highlight={d.tier === 'iconic'}
              badges={d.tags?.slice(0, 3)}
              address={d.distanceFromMasvingoKm ? `${d.distanceFromMasvingoKm} km from Masvingo` : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
