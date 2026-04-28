'use client';

import { useState, useMemo } from 'react';
import { Icon } from '@/components/ui/Icon';
import { PlaceCard } from './PlaceCard';
import { destinationImage } from '@/lib/destination-images';
import type { Destination, Stay, ChillSpot, Activity } from '@/lib/types';

type Tab = 'attractions' | 'stay' | 'eat' | 'do';

type Props = {
  destinations: Destination[];
  destinationCategories: { id: string; label: string }[];
  stays: Stay[];
  chillSpots: ChillSpot[];
  activities: Activity[];
};

export function MasvingoTabs({ destinations, destinationCategories, stays, chillSpots, activities }: Props) {
  const [tab, setTab] = useState<Tab>('attractions');
  const [query, setQuery] = useState('');
  const [destCategory, setDestCategory] = useState<string>('all');
  const q = query.trim().toLowerCase();

  const filteredAttractions = useMemo(() => {
    let list = destinations;
    if (destCategory !== 'all') list = list.filter(d => d.categories.includes(destCategory));
    if (q) list = list.filter(d => d.name.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q));
    return list.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));
  }, [destinations, destCategory, q]);

  const filteredStays = useMemo(() => {
    if (!q) return stays;
    return stays.filter(s => s.name.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q));
  }, [stays, q]);

  const filteredChill = useMemo(() => {
    if (!q) return chillSpots;
    return chillSpots.filter(c => c.name.toLowerCase().includes(q) || c.vibe.toLowerCase().includes(q));
  }, [chillSpots, q]);

  const filteredActivities = useMemo(() => {
    if (!q) return activities;
    return activities.filter(a => a.name.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));
  }, [activities, q]);

  return (
    <section className="container-x py-10 md:py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-1.5 rounded-2xl border border-line bg-white p-1.5">
          {[
            { id: 'attractions', label: 'Attractions', count: destinations.length, icon: 'pin' as const },
            { id: 'stay',        label: 'Stay',        count: stays.length,        icon: 'shield' as const },
            { id: 'eat',         label: 'Eat & drink', count: chillSpots.length,   icon: 'fuel' as const },
            { id: 'do',          label: 'Things to do',count: activities.length,   icon: 'route' as const }
          ].map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id as Tab)}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${tab === t.id ? 'bg-brand text-white' : 'text-ink hover:bg-surface-3'}`}
            >
              <Icon name={t.icon} size={16} />
              {t.label}
              <span className={`text-[11px] font-normal ${tab === t.id ? 'text-brand-50' : 'text-ink-subtle'}`}>{t.count}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80">
          <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search places in Masvingo..."
            className="field-input pl-9"
            aria-label="Search Masvingo destinations"
          />
        </div>
      </div>

      {tab === 'attractions' && (
        <div className="mt-5 -mx-1.5 flex flex-wrap gap-1.5 px-1.5">
          <CategoryPill active={destCategory === 'all'} onClick={() => setDestCategory('all')}>All</CategoryPill>
          {destinationCategories.map(c => (
            <CategoryPill key={c.id} active={destCategory === c.id} onClick={() => setDestCategory(c.id)}>{c.label}</CategoryPill>
          ))}
        </div>
      )}

      <div className="mt-8">
        {tab === 'attractions' && <AttractionsGrid items={filteredAttractions} />}
        {tab === 'stay' && <StaysGrid items={filteredStays} />}
        {tab === 'eat'  && <ChillGrid items={filteredChill} />}
        {tab === 'do'   && <ActivitiesGrid items={filteredActivities} />}
      </div>
    </section>
  );
}

function CategoryPill({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${active ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-muted hover:border-brand-500 hover:text-brand'}`}
    >
      {children}
    </button>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="card p-10 text-center">
      <h3 className="text-lg font-medium">No {label} match</h3>
      <p className="mt-2 text-sm text-ink-muted">Try a different search term, or clear the filter.</p>
    </div>
  );
}

function AttractionsGrid({ items }: { items: Destination[] }) {
  if (items.length === 0) return <EmptyState label="attractions" />;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}

function StaysGrid({ items }: { items: Stay[] }) {
  if (items.length === 0) return <EmptyState label="places to stay" />;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(s => (
        <PlaceCard
          key={s.id}
          image={s.image}
          title={s.name}
          type={s.type}
          body={s.summary}
          phone={s.phone}
          address={s.address}
          highlight={s.highlight || s.tier === 'premium'}
          badges={s.tags}
        />
      ))}
    </div>
  );
}

function ChillGrid({ items }: { items: ChillSpot[] }) {
  if (items.length === 0) return <EmptyState label="venues" />;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(c => (
        <PlaceCard
          key={c.id}
          image={c.image}
          title={c.name}
          type={c.type}
          body={c.vibe}
          phone={c.phone}
          address={c.address}
          highlight={c.highlight}
          badges={c.tags}
        />
      ))}
    </div>
  );
}

function ActivitiesGrid({ items }: { items: Activity[] }) {
  if (items.length === 0) return <EmptyState label="activities" />;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(a => (
        <PlaceCard
          key={a.id}
          image={a.image}
          title={a.name}
          type={a.category}
          body={a.summary}
          highlight={a.highlight}
          badges={[a.duration, `From ${a.priceFrom}`, ...(a.tags ?? [])].slice(0, 3)}
        />
      ))}
    </div>
  );
}
