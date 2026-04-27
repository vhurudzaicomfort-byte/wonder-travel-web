import Link from 'next/link';
import { Icon, IconName } from '@/components/ui/Icon';

const CATS: { label: string; slug: string; icon: IconName }[] = [
  { label: 'Sedan',   slug: 'sedan',   icon: 'car' },
  { label: 'SUV',     slug: 'suv',     icon: 'suv' },
  { label: '4x4',     slug: '4x4',     icon: '4wd' },
  { label: 'Van',     slug: 'van',     icon: 'van' },
  { label: 'Luxury',  slug: 'luxury',  icon: 'crown' },
  { label: 'Budget',  slug: 'budget',  icon: 'wallet' }
];

export function CategoryTiles() {
  return (
    <section className="section">
      <div className="container-x">
        <p className="eyebrow">Browse</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Browse by category</h2>
        <p className="mt-2 text-ink-muted max-w-prose">Six fleet types — from city-friendly sedans to safari-ready 4x4s.</p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {CATS.map(c => (
            <Link
              key={c.slug}
              href={`/vehicles/category/${c.slug}`}
              className="card flex flex-col items-center justify-center text-center p-5 hover:shadow transition-all duration-200 hover:-translate-y-0.5"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand">
                <Icon name={c.icon} size={26} />
              </span>
              <span className="mt-3 text-sm font-medium">{c.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
