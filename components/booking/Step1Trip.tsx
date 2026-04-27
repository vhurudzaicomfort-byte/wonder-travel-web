'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { useBooking } from '@/lib/store';
import { getBusiness, getVehicleBySlug } from '@/lib/api';
import { PriceSummary } from './PriceSummary';
import { formatUSD } from '@/lib/format';

export function Step1Trip() {
  const router = useRouter();
  const business = getBusiness();
  const { vehicleSlug, trip, setTrip } = useBooking();
  const vehicle = vehicleSlug ? getVehicleBySlug(vehicleSlug) : undefined;

  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/book/driver');
  };

  return (
    <section className="container-x py-8 md:py-12 grid gap-8 lg:grid-cols-[1fr_360px]">
      <form onSubmit={onSubmit} className="space-y-6">
        {vehicle ? (
          <div className="card p-4 flex items-center gap-4">
            <img src={vehicle.images.cover} alt="" className="h-16 w-24 rounded-md object-cover" />
            <div className="flex-1">
              <p className="text-sm text-ink-muted">Selected vehicle</p>
              <p className="font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</p>
              <p className="text-sm tabular">{formatUSD(vehicle.rates.perDayUSD)} / day</p>
            </div>
            <Link href="/vehicles" className="text-sm font-medium text-brand">Change</Link>
          </div>
        ) : (
          <div className="card p-5">
            <p className="font-medium">No vehicle selected</p>
            <p className="text-sm text-ink-muted mt-1">Pick one to continue.</p>
            <Link href="/vehicles" className="btn btn-secondary btn-md mt-3">Browse vehicles</Link>
          </div>
        )}

        <div className="card p-5">
          <h2 className="text-lg font-medium">Pickup location</h2>
          <div className="mt-3 space-y-2">
            {business.pickupLocations.map(l => (
              <label key={l.id} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-3 cursor-pointer hover:bg-surface-3">
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pickupLocationId"
                    className="accent-brand"
                    checked={trip.pickupLocationId === l.id}
                    onChange={() => setTrip({ pickupLocationId: l.id, ...(trip.sameDropoff ? { dropoffLocationId: l.id } : {}) })}
                  />
                  <span className="text-sm">{l.label}</span>
                </span>
                {l.feeUSD > 0 && <span className="text-xs text-ink-muted tabular">+ {formatUSD(l.feeUSD)}</span>}
              </label>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-lg font-medium">Drop-off location</h2>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-brand h-4 w-4"
              checked={!!trip.sameDropoff}
              onChange={e => setTrip({ sameDropoff: e.target.checked, ...(e.target.checked ? { dropoffLocationId: trip.pickupLocationId } : {}) })}
            />
            Same as pickup
          </label>
          {!trip.sameDropoff && (
            <div className="mt-3 space-y-2">
              {business.pickupLocations.map(l => (
                <label key={l.id} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-3 cursor-pointer hover:bg-surface-3">
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="dropoffLocationId"
                      className="accent-brand"
                      checked={trip.dropoffLocationId === l.id}
                      onChange={() => setTrip({ dropoffLocationId: l.id })}
                    />
                    <span className="text-sm">{l.label}</span>
                  </span>
                  {l.feeUSD > 0 && <span className="text-xs text-ink-muted tabular">+ {formatUSD(l.feeUSD)}</span>}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="pdate">Pickup date</label>
            <input id="pdate" type="date" min={minDate} className="field-input" required value={trip.pickupDate || ''} onChange={e => setTrip({ pickupDate: e.target.value })} />
          </div>
          <div>
            <label className="field-label" htmlFor="ptime">Pickup time</label>
            <input id="ptime" type="time" step={1800} className="field-input" required value={trip.pickupTime || ''} onChange={e => setTrip({ pickupTime: e.target.value })} />
          </div>
          <div>
            <label className="field-label" htmlFor="rdate">Return date</label>
            <input id="rdate" type="date" min={trip.pickupDate || minDate} className="field-input" required value={trip.returnDate || ''} onChange={e => setTrip({ returnDate: e.target.value })} />
          </div>
          <div>
            <label className="field-label" htmlFor="rtime">Return time</label>
            <input id="rtime" type="time" step={1800} className="field-input" required value={trip.returnTime || ''} onChange={e => setTrip({ returnTime: e.target.value })} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Link href="/vehicles" className="btn btn-ghost btn-md">
            <Icon name="arrow-left" size={16} /> Back
          </Link>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={!vehicle || !trip.pickupLocationId || !trip.pickupDate || !trip.pickupTime || !trip.returnDate || !trip.returnTime}
          >
            Continue <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </form>

      <aside className="lg:block">
        <PriceSummary />
      </aside>
    </section>
  );
}
