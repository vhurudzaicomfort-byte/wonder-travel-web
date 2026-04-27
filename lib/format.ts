export function formatUSD(amount: number, opts?: { compact?: boolean }) {
  if (opts?.compact) return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  return `USD ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatDate(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function formatDateTime(d: string | Date) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export function daysBetween(pickup: string | Date, dropoff: string | Date) {
  const a = new Date(pickup).getTime();
  const b = new Date(dropoff).getTime();
  if (!a || !b) return 0;
  const diff = Math.ceil((b - a) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 1);
}

export function generateBookingRef(seed?: string) {
  const year = new Date().getFullYear();
  const code = seed
    ? seed.slice(0, 4).toUpperCase().padStart(4, '0')
    : Math.floor(1000 + Math.random() * 9000).toString();
  return `WT-${year}-${code}`;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
