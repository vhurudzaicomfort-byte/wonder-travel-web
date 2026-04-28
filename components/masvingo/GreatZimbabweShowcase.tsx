import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { GREAT_ZIMBABWE_GALLERY } from '@/lib/destination-images';

const CAPTIONS = [
  'Conical Tower at the Great Enclosure',
  'Aerial view across the Valley Ruins',
  'Outer wall, Great Enclosure',
  'Boulder & dry-stone walls of the Hill Complex',
  'Trees rising through the inner ruins',
  'Detail — coursed dry-stone masonry',
  'Inner wall at twilight'
];

export function GreatZimbabweShowcase() {
  return (
    <section className="container-x py-10 md:py-12">
      <div className="grid gap-3 md:gap-4 md:grid-cols-12 md:auto-rows-[180px]">
        {/* Hero image (large) */}
        <figure className="relative overflow-hidden rounded-2xl md:col-span-7 md:row-span-2 group">
          <img src={GREAT_ZIMBABWE_GALLERY[0]} alt={CAPTIONS[0]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent p-5 md:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-50">UNESCO World Heritage</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-bold text-white leading-tight">Great Zimbabwe.</h2>
            <p className="mt-1 text-sm md:text-base text-white/85 max-w-md">{CAPTIONS[0]}</p>
            <Link href="#explore" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white">
              Explore the ruins <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </figure>

        {/* Tile 2 */}
        <figure className="relative overflow-hidden rounded-2xl md:col-span-5 group">
          <img src={GREAT_ZIMBABWE_GALLERY[1]} alt={CAPTIONS[1]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 py-2.5 text-xs font-medium text-white">{CAPTIONS[1]}</figcaption>
        </figure>

        {/* Tile 3 */}
        <figure className="relative overflow-hidden rounded-2xl md:col-span-5 group">
          <img src={GREAT_ZIMBABWE_GALLERY[2]} alt={CAPTIONS[2]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 py-2.5 text-xs font-medium text-white">{CAPTIONS[2]}</figcaption>
        </figure>

        {/* Tile 4-7 thumbnail strip */}
        {[3, 4, 5, 6].map(i => (
          <figure key={i} className="relative overflow-hidden rounded-2xl md:col-span-3 group" style={{ aspectRatio: '4 / 3' }}>
            <img src={GREAT_ZIMBABWE_GALLERY[i]} alt={CAPTIONS[i]} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 py-2 text-[11px] font-medium text-white">{CAPTIONS[i]}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
