import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Icon, type IconName } from '@/components/ui/Icon';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { getOpportunityCategories, getOpportunities, getOpportunityCounts } from '@/lib/opportunities';

export const metadata: Metadata = {
  title: 'Opportunities — Jobs, services, vehicles for sale & referrals',
  description: 'Find jobs, third-party services, vehicles for sale and referral rewards in Masvingo. Free to post. Reviewed before publishing.'
};

export default function OpportunitiesPage() {
  const categories = getOpportunityCategories();
  const listings = getOpportunities();
  const counts = getOpportunityCounts();

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Opportunities' }]} />
      </div>

      <section className="container-x pt-4 pb-8 md:pt-6 md:pb-10">
        <p className="eyebrow">For our community</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Opportunities</h1>
        <p className="mt-3 text-ink-muted max-w-2xl">
          Jobs, services, vehicles and referral rewards — all in one place. Free to post, reviewed before publishing.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/opportunities/post" className="btn btn-primary btn-md">
            <Icon name="upload" size={16} /> Post an opportunity
          </Link>
          <a href="#listings" className="btn btn-secondary btn-md">
            <Icon name="search" size={16} /> Browse listings
          </a>
        </div>
      </section>

      <section className="container-x pb-10 md:pb-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map(c => (
            <a
              key={c.id}
              href={`#cat-${c.id}`}
              className="group rounded-2xl border border-border bg-surface-1 p-5 transition-shadow hover:shadow-md"
              style={{ borderTopWidth: 3, borderTopColor: c.accent }}
            >
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: c.accent }}
              >
                <Icon name={c.icon as IconName} size={20} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{c.label}</h3>
              <p className="mt-1 text-sm text-ink-muted">{c.blurb}</p>
              <p className="mt-3 text-xs font-medium text-ink-muted">
                {counts[c.id]} {counts[c.id] === 1 ? 'listing' : 'listings'}
                <span className="ml-2 inline-flex items-center gap-1 text-brand group-hover:translate-x-0.5 transition-transform">
                  View <Icon name="arrow-right" size={12} />
                </span>
              </p>
            </a>
          ))}
        </div>
      </section>

      <section id="listings" className="container-x pb-12 md:pb-16">
        {categories.map(c => {
          const items = listings.filter(l => l.category === c.id);
          if (!items.length) return null;
          return (
            <div key={c.id} id={`cat-${c.id}`} className="mb-12 scroll-mt-24">
              <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: c.accent }}>{c.label}</p>
                  <h2 className="mt-1 text-xl md:text-2xl font-bold">{c.blurb}</h2>
                </div>
                <span className="text-sm text-ink-muted">{items.length} {items.length === 1 ? 'listing' : 'listings'}</span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map(op => <OpportunityCard key={op.id} op={op} />)}
              </div>
            </div>
          );
        })}
      </section>

      <section className="bg-brand text-white">
        <div className="container-x py-12 md:py-14 grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div>
            <p className="eyebrow text-brand-50">Got something to post?</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold">Free advertising for Masvingo.</h2>
            <p className="mt-2 text-white/85 max-w-prose">
              Hiring? Selling a vehicle? Running a complementary service? Submit your post — we&apos;ll publish after a quick review.
            </p>
          </div>
          <Link href="/opportunities/post" className="btn btn-md bg-white text-brand hover:bg-brand-50" style={{ height: 52, padding: '0 24px', fontSize: 16 }}>
            <Icon name="upload" size={18} />
            Post an opportunity
          </Link>
        </div>
      </section>
    </>
  );
}
