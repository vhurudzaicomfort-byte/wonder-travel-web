import Link from 'next/link';
import { Icon, IconName } from '@/components/ui/Icon';
import { categorySlug } from '@/lib/api';

const CATS: { label: string; icon: IconName; sub: string }[] = [
  { label: 'Class A',              icon: 'car',     sub: 'Fuel-saver hatchback' },
  { label: 'Class B',              icon: 'van',     sub: 'Light commercial van' },
  { label: 'Class C',              icon: 'car',     sub: 'Mid-size sedan' },
  { label: 'Off Road Double Cab',  icon: '4wd',     sub: 'Off-road double cab' },
  { label: 'Off Road Single Cab',  icon: '4wd',     sub: 'Off-road single cab' },
  { label: 'Mini Bus',             icon: 'van',     sub: 'Group transfers' },
  { label: 'SUV',                  icon: 'suv',     sub: 'Family SUV' },
  { label: 'Luxury',               icon: 'crown',   sub: 'Executive & weddings' },
  { label: 'Budget',               icon: 'wallet',  sub: 'Most affordable' },
  { label: 'Others',               icon: 'route',   sub: 'Coach, truck' }
];

export function CategoryTiles() {
  return (
    <section className="section">
      <div className="container-x">
        <p className="eyebrow">Browse</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Browse by category</h2>
        <p className="mt-2 text-ink-muted max-w-prose">Ten fleet classes — from fuel-saver hatchbacks to coaches and trucks.</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {CATS.map(c => (
            <Link
              key={c.label}
              href={`/vehicles/category/${categorySlug(c.label)}`}
              className="card flex flex-col items-center justify-center text-center p-4 hover:shadow transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand">
                <Icon name={c.icon} size={22} />
              </span>
              <span className="mt-2.5 text-sm font-medium leading-tight">{c.label}</span>
              <span className="mt-0.5 text-[11px] text-ink-muted leading-tight">{c.sub}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
