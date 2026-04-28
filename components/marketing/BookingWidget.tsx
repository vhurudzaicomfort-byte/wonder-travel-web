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
      className={`bg-white rounded-2xl shadow-lg border border-line p-3 sm:p-4 ${compact ? '' : 'animate-fade-up'}`}
      aria-label="Search availability"
    >
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-2">
        <Cell>
          <Label htmlFor="pickup" icon="pin">Pickup</Label>
          <select id="pickup" className="bw-control" value={pickup} onChange={e => setPickup(e.target.value)}>
            {business.pickupLocations.map(l => (
              <option key={l.id} value={l.id}>{shortLabel(l.label)}</option>
            ))}
          </select>
        </Cell>

        <Cell>
          <Label htmlFor="dropoff" icon="pin">Drop-off</Label>
          <select id="dropoff" className="bw-control" value={dropoff} onChange={e => setDropoff(e.target.value)}>
            {business.pickupLocations.map(l => (
              <option key={l.id} value={l.id}>{shortLabel(l.label)}</option>
            ))}
          </select>
        </Cell>

        <Cell>
          <Label htmlFor="pickupDate" icon="calendar">Pickup</Label>
          <div className="grid grid-cols-[1fr_auto] gap-1.5">
            <input id="pickupDate" type="date" className="bw-control" value={pickupDate} onChange={e => setPickupDate(e.target.value)} />
            <input aria-label="Pickup time" type="time" step={1800} className="bw-control bw-time" value={pickupTime} onChange={e => setPickupTime(e.target.value)} />
          </div>
        </Cell>

        <Cell>
          <Label htmlFor="returnDate" icon="calendar">Return</Label>
          <div className="grid grid-cols-[1fr_auto] gap-1.5">
            <input id="returnDate" type="date" className="bw-control" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
            <input aria-label="Return time" type="time" step={1800} className="bw-control bw-time" value={returnTime} onChange={e => setReturnTime(e.target.value)} />
          </div>
        </Cell>
      </div>

      <button type="submit" className="bw-submit mt-3">
        <Icon name="search" size={18} className="shrink-0" />
        <span className="bw-submit-label">Search availability</span>
      </button>
    </form>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-surface-2 border border-transparent p-2.5 transition-colors hover:border-line focus-within:border-brand-500">
      {children}
    </div>
  );
}

function Label({ htmlFor, icon, children }: { htmlFor?: string; icon: 'pin' | 'calendar'; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-1">
      <Icon name={icon} size={13} className="text-brand" />
      {children}
    </label>
  );
}

function shortLabel(label: string) {
  if (label.includes('—')) return label.split('—')[0].trim();
  if (label.includes('(')) return label.split('(')[0].trim();
  return label;
}
