import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { formatUSD } from '@/lib/format';
import type { Vehicle } from '@/lib/types';

export function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <Link
      href={`/vehicles/${v.slug}`}
      className="card group flex flex-col overflow-hidden transition-all duration-200 hover:shadow hover:-translate-y-0.5"
    >
      <div className="relative overflow-hidden bg-surface-3" style={{ aspectRatio: '16 / 10' }}>
        <img
          src={v.images.cover}
          alt={`${v.year} ${v.make} ${v.model} — Wonder Travel Car Rental`}
          loading="lazy"
          width={800}
          height={500}
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="pill bg-white/95">{v.category}</span>
          {v.crossBorderAllowed && <span className="pill bg-white/95">Cross-border</span>}
          {v.fourWheelDrive && <span className="pill bg-white/95">4WD</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-medium leading-tight">{v.year} {v.make} {v.model}</h3>
        <p className="mt-1 text-sm text-ink-muted">
          {v.category} &middot; {v.transmission} &middot; {v.seats} seats &middot; {v.ac ? 'AC' : 'No AC'}
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1"><Icon name="users" size={14} />{v.seats}</span>
          <span className="inline-flex items-center gap-1"><Icon name="luggage" size={14} />{v.luggage}</span>
          <span className="inline-flex items-center gap-1"><Icon name="gear" size={14} />{v.transmission === 'automatic' ? 'Auto' : 'Manual'}</span>
          <span className="inline-flex items-center gap-1"><Icon name="fuel" size={14} />{v.fuel}</span>
        </div>
        {v.reviewCount > 0 && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Icon name="star" size={16} className="text-warning" />
            <span className="font-medium">{v.rating.toFixed(1)}</span>
            <span className="text-ink-subtle">({v.reviewCount} reviews)</span>
          </div>
        )}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-ink-subtle">From</p>
            <p className="text-xl font-bold tabular">{formatUSD(v.rates.perDayUSD)} <span className="text-sm font-medium text-ink-muted">/ day</span></p>
          </div>
          <span className="btn btn-secondary btn-sm group-hover:bg-brand-50">View</span>
        </div>
      </div>
    </Link>
  );
}
