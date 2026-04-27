'use client';

import { useMemo, useState } from 'react';
import { VehicleCard } from './VehicleCard';
import { Icon } from '@/components/ui/Icon';
import type { Vehicle } from '@/lib/types';

type Sort = 'recommended' | 'price-asc' | 'price-desc' | 'newest';

export function VehicleListing({ vehicles, presetCategory }: { vehicles: Vehicle[]; presetCategory?: string }) {
  const [categories, setCategories] = useState<string[]>(presetCategory ? [presetCategory] : []);
  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [seatsMin, setSeatsMin] = useState<number>(0);
  const [features, setFeatures] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sort, setSort] = useState<Sort>('recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...vehicles];
    if (categories.length) list = list.filter(v => categories.some(c => c.toLowerCase() === v.category.toLowerCase()));
    if (transmissions.length) list = list.filter(v => transmissions.includes(v.transmission));
    if (seatsMin > 0) list = list.filter(v => v.seats >= seatsMin);
    if (features.includes('AC')) list = list.filter(v => v.ac);
    if (features.includes('4WD')) list = list.filter(v => v.fourWheelDrive);
    if (features.includes('Bluetooth')) list = list.filter(v => v.bluetooth);
    list = list.filter(v => v.rates.perDayUSD <= maxPrice);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.rates.perDayUSD - b.rates.perDayUSD); break;
      case 'price-desc': list.sort((a, b) => b.rates.perDayUSD - a.rates.perDayUSD); break;
      case 'newest': list.sort((a, b) => b.year - a.year); break;
      default: list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [vehicles, categories, transmissions, seatsMin, features, maxPrice, sort]);

  const toggle = (arr: string[], v: string, setter: (n: string[]) => void) =>
    setter(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const FiltersBody = (
    <>
      <FilterGroup title="Category">
        {['Sedan', 'SUV', '4x4', 'Van', 'Luxury', 'Budget'].map(c => (
          <Check key={c} label={c} checked={categories.includes(c)} onChange={() => toggle(categories, c, setCategories)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Transmission">
        <Check label="Automatic" checked={transmissions.includes('automatic')} onChange={() => toggle(transmissions, 'automatic', setTransmissions)} />
        <Check label="Manual" checked={transmissions.includes('manual')} onChange={() => toggle(transmissions, 'manual', setTransmissions)} />
      </FilterGroup>
      <FilterGroup title="Seats">
        {[2, 4, 5, 7, 9].map(s => (
          <label key={s} className="flex items-center gap-2 text-sm py-1.5">
            <input type="radio" name="seats" checked={seatsMin === s} onChange={() => setSeatsMin(s)} />
            {s}+ seats
          </label>
        ))}
        <button type="button" className="text-xs text-brand mt-1" onClick={() => setSeatsMin(0)}>Any</button>
      </FilterGroup>
      <FilterGroup title="Max price / day">
        <input type="range" min={30} max={250} step={5} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-brand" />
        <p className="mt-1 text-sm tabular">Up to <span className="font-medium">USD {maxPrice}</span></p>
      </FilterGroup>
      <FilterGroup title="Features">
        {['AC', '4WD', 'Bluetooth'].map(f => (
          <Check key={f} label={f} checked={features.includes(f)} onChange={() => toggle(features, f, setFeatures)} />
        ))}
      </FilterGroup>
      <button
        type="button"
        className="btn btn-ghost btn-sm w-full mt-2"
        onClick={() => { setCategories([]); setTransmissions([]); setSeatsMin(0); setFeatures([]); setMaxPrice(200); }}
      >
        Reset filters
      </button>
    </>
  );

  return (
    <section className="container-x py-8 md:py-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Fleet</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-bold">Find your car</h1>
          <p className="mt-1 text-sm text-ink-muted">{filtered.length} of {vehicles.length} vehicles available</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="btn btn-secondary btn-sm md:hidden" onClick={() => setFiltersOpen(true)}>
            <Icon name="menu" size={16} /> Filters
          </button>
          <label className="text-sm text-ink-muted hidden sm:inline">Sort</label>
          <select className="field-input !h-10 !text-sm w-auto" value={sort} onChange={e => setSort(e.target.value as Sort)}>
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr]">
        <aside className="hidden md:block">
          <div className="card p-5 sticky top-24">{FiltersBody}</div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="card p-10 text-center">
              <h2 className="text-xl font-medium">No vehicles match those filters</h2>
              <p className="mt-2 text-ink-muted">Try widening your dates or contact us on WhatsApp.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(v => <VehicleCard key={v.id} v={v} />)}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-white rounded-t-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} className="btn btn-ghost btn-sm" aria-label="Close filters">
                <Icon name="x" size={20} />
              </button>
            </div>
            {FiltersBody}
            <button type="button" className="btn btn-primary btn-lg w-full mt-5" onClick={() => setFiltersOpen(false)}>Show {filtered.length} cars</button>
          </div>
        </div>
      )}
    </section>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-4 first:pt-0 last:border-b-0">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 text-sm py-1.5 cursor-pointer">
      <input type="checkbox" className="accent-brand h-4 w-4" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
