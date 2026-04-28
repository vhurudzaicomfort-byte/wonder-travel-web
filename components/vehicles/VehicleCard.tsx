'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { formatUSD } from '@/lib/format';
import { useBooking } from '@/lib/store';
import type { Vehicle } from '@/lib/types';

const FALLBACK = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80';

export function VehicleCard({ v }: { v: Vehicle }) {
  const router = useRouter();
  const setVehicle = useBooking(s => s.setVehicle);
  const [imgSrc, setImgSrc] = useState(v.images.cover || FALLBACK);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVehicle(v.slug);
    router.push('/book');
  };

  return (
    <Link
      href={`/vehicles/${v.slug}`}
      className="card group flex flex-col overflow-hidden transition-all duration-200 hover:shadow hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden bg-surface-3" style={{ aspectRatio: '16 / 10' }}>
        <img
          src={imgSrc}
          alt={`${v.year} ${v.make} ${v.model} — Wonder Travel Car Rental`}
          loading="lazy"
          width={800}
          height={500}
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
          onError={() => setImgSrc(FALLBACK)}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="pill bg-white/95">{v.category}</span>
          {v.crossBorderAllowed && <span className="pill bg-white/95">Cross-border</span>}
          {v.fourWheelDrive && <span className="pill bg-white/95">4WD</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-medium leading-tight">{v.year} {v.make} {v.model}</h3>
        {v.descriptor && <p className="mt-0.5 text-xs font-medium text-brand">{v.descriptor}</p>}
        <p className="mt-2 text-sm text-ink-muted">
          {v.transmission === 'automatic' ? 'Auto' : 'Manual'} &middot; {v.seats} seats &middot; {v.fuel} &middot; {v.ac ? 'AC' : 'No AC'}
        </p>
        {v.freeKmPerDay && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-muted">
            <Icon name="route" size={12} className="text-brand" />
            {v.freeKmPerDay} km/day included &middot; <span className="font-medium">${v.extraKmUSD ?? 1}/km</span> after
          </p>
        )}
        {v.reviewCount > 0 && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            <Icon name="star" size={14} className="text-warning" />
            <span className="font-medium">{v.rating.toFixed(1)}</span>
            <span className="text-ink-subtle">({v.reviewCount} reviews)</span>
          </div>
        )}
        <div className="mt-auto pt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-[11px] text-ink-subtle">From</p>
            <p className="text-xl font-bold tabular">{formatUSD(v.rates.perDayUSD)} <span className="text-xs font-medium text-ink-muted">/ day</span></p>
          </div>
          <button
            type="button"
            onClick={onAdd}
            aria-label={`Add ${v.make} ${v.model} to booking`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white text-2xl font-light leading-none hover:bg-brand-600 active:scale-[0.96] transition-all pb-0.5"
          >
            +
            <span className="sr-only">Add to booking</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
