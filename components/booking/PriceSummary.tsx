'use client';

import { useBooking } from '@/lib/store';
import { getVehicleBySlug, getExtras, getBusiness } from '@/lib/api';
import { formatUSD, daysBetween } from '@/lib/format';

export function usePricing() {
  const { vehicleSlug, trip, extras: chosen } = useBooking();
  const vehicle = vehicleSlug ? getVehicleBySlug(vehicleSlug) : undefined;
  const extras = getExtras().filter(e => chosen.includes(e.id));
  const business = getBusiness();

  const start = trip.pickupDate && trip.pickupTime ? `${trip.pickupDate}T${trip.pickupTime}` : '';
  const end = trip.returnDate && trip.returnTime ? `${trip.returnDate}T${trip.returnTime}` : '';
  const days = start && end ? daysBetween(start, end) : 1;

  const vehicleSubtotal = (vehicle?.rates.perDayUSD ?? 0) * days;
  const extrasPerDay = extras.reduce((sum, e) => sum + (e.perDayUSD ?? 0), 0) * days;
  const extrasOneOff = extras.reduce((sum, e) => sum + (e.oneOffUSD ?? 0), 0);
  const extrasSubtotal = extrasPerDay + extrasOneOff;

  const pickupLoc = business.pickupLocations.find(l => l.id === trip.pickupLocationId);
  const dropoffLoc = trip.sameDropoff ? pickupLoc : business.pickupLocations.find(l => l.id === trip.dropoffLocationId);
  const locationFee = (pickupLoc?.feeUSD ?? 0) + (trip.sameDropoff ? 0 : (dropoffLoc?.feeUSD ?? 0));

  const subtotal = vehicleSubtotal + extrasSubtotal + locationFee;
  const deposit = vehicle?.depositUSD ?? 0;
  const total = subtotal + deposit;

  return { vehicle, extras, days, vehicleSubtotal, extrasSubtotal, locationFee, subtotal, deposit, total, pickupLoc, dropoffLoc };
}

export function PriceSummary({ compact = false }: { compact?: boolean }) {
  const p = usePricing();
  if (!p.vehicle) return null;
  return (
    <div className={`card p-5 ${compact ? '' : 'sticky top-24'}`}>
      <h3 className="text-sm font-medium">Price summary</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <Row label={`${p.days} day${p.days !== 1 ? 's' : ''} × ${formatUSD(p.vehicle.rates.perDayUSD)}`} value={formatUSD(p.vehicleSubtotal)} />
        {p.extrasSubtotal > 0 && <Row label="Extras" value={formatUSD(p.extrasSubtotal)} />}
        {p.locationFee > 0 && <Row label="Location fees" value={formatUSD(p.locationFee)} />}
        <div className="h-px bg-line my-2" />
        <Row label="Subtotal" value={formatUSD(p.subtotal)} bold />
        <Row label="Refundable deposit" value={formatUSD(p.deposit)} muted />
        <div className="h-px bg-line my-2" />
        <Row label="Due now" value={formatUSD(p.total)} large />
      </dl>
    </div>
  );
}

function Row({ label, value, bold, muted, large }: { label: string; value: string; bold?: boolean; muted?: boolean; large?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className={muted ? 'text-ink-muted' : ''}>{label}</dt>
      <dd className={`tabular ${bold ? 'font-medium' : ''} ${large ? 'text-lg font-bold' : ''} ${muted ? 'text-ink-muted' : ''}`}>{value}</dd>
    </div>
  );
}
