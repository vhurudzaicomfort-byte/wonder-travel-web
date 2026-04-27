'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon, IconName } from '@/components/ui/Icon';
import { useBooking } from '@/lib/store';
import { getExtras } from '@/lib/api';
import { formatUSD } from '@/lib/format';
import { PriceSummary } from './PriceSummary';

export function Step3Extras() {
  const router = useRouter();
  const extras = getExtras();
  const { extras: chosen, toggleExtra } = useBooking();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/book/review');
  };

  return (
    <section className="container-x py-8 md:py-12 grid gap-8 lg:grid-cols-[1fr_360px]">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="card p-5">
          <h2 className="text-lg font-medium">Optional extras</h2>
          <p className="mt-1 text-sm text-ink-muted">Add what you need. Skip everything else.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {extras.map(e => {
              const selected = chosen.includes(e.id);
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => toggleExtra(e.id)}
                    aria-pressed={selected}
                    className={`w-full text-left rounded-xl border p-4 transition-colors ${selected ? 'border-brand bg-brand-50' : 'border-line hover:bg-surface-3'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${selected ? 'bg-brand text-white' : 'bg-white text-brand border border-line'}`}>
                        <Icon name={(e.icon as IconName) ?? 'check'} size={18} />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{e.label}</p>
                        <p className="text-xs text-ink-muted tabular">
                          {e.perDayUSD ? `${formatUSD(e.perDayUSD)} / day` : ''}
                          {e.oneOffUSD ? `${formatUSD(e.oneOffUSD)} once` : ''}
                        </p>
                      </div>
                      {selected && <Icon name="check" size={20} className="text-brand" />}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Link href="/book/driver" className="btn btn-ghost btn-md">
            <Icon name="arrow-left" size={16} /> Back
          </Link>
          <button type="submit" className="btn btn-primary btn-lg">
            Continue <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </form>
      <aside><PriceSummary /></aside>
    </section>
  );
}
