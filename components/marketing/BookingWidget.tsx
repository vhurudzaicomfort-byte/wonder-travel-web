'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { getBusiness } from '@/lib/api';

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const business = getBusiness();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(today.getDate() + 4);

  const [pickup, setPickup] = useState('hq');
  const [dropoff, setDropoff] = useState('hq');
  const [pickupDate, setPickupDate] = useState(tomorrow.toISOString().slice(0, 10));
  const [pickupTime, setPickupTime] = useState('09:00');
  const [returnDate, setReturnDate] = useState(dayAfter.toISOString().slice(0, 10));
  const [returnTime, setReturnTime] = useState('17:00');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      pickup, dropoff, pickupDate, pickupTime, returnDate, returnTime
    });
    router.push(`/vehicles?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className={`bg-white rounded-2xl shadow-lg border border-line p-4 md:p-5 ${compact ? '' : 'animate-fade-up'}`}
      aria-label="Search availability"
    >
      <div className="grid gap-3 md:grid-cols-5 md:gap-3">
        <div className="md:col-span-1">
          <label htmlFor="pickup" className="field-label">Pickup</label>
          <div className="relative">
            <Icon name="pin" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <select id="pickup" className="field-input pl-9" value={pickup} onChange={e => setPickup(e.target.value)}>
              {business.pickupLocations.map(l => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:col-span-1">
          <label htmlFor="dropoff" className="field-label">Drop-off</label>
          <div className="relative">
            <Icon name="pin" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <select id="dropoff" className="field-input pl-9" value={dropoff} onChange={e => setDropoff(e.target.value)}>
              {business.pickupLocations.map(l => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:col-span-1">
          <label htmlFor="pickupDate" className="field-label">Pickup date</label>
          <div className="grid grid-cols-2 gap-2">
            <input id="pickupDate" type="date" className="field-input" value={pickupDate} onChange={e => setPickupDate(e.target.value)} />
            <input aria-label="Pickup time" type="time" step={1800} className="field-input" value={pickupTime} onChange={e => setPickupTime(e.target.value)} />
          </div>
        </div>

        <div className="md:col-span-1">
          <label htmlFor="returnDate" className="field-label">Return date</label>
          <div className="grid grid-cols-2 gap-2">
            <input id="returnDate" type="date" className="field-input" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
            <input aria-label="Return time" type="time" step={1800} className="field-input" value={returnTime} onChange={e => setReturnTime(e.target.value)} />
          </div>
        </div>

        <div className="md:col-span-1 flex items-end">
          <button type="submit" className="btn btn-primary btn-lg w-full">
            <Icon name="search" size={18} />
            Search availability
          </button>
        </div>
      </div>
    </form>
  );
}
