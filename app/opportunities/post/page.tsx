import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { OpportunityForm } from '@/components/opportunities/OpportunityForm';

export const metadata: Metadata = {
  title: 'Post an opportunity — Wonder Travel',
  description: 'Submit a job, service, vehicle for sale or referral claim. Free. Reviewed before publishing.'
};

export default function PostOpportunityPage() {
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Opportunities', href: '/opportunities' }, { label: 'Post' }]} />
      </div>
      <section className="container-x pt-4 pb-12 md:pb-16">
        <p className="eyebrow">Free to post</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Post an opportunity</h1>
        <p className="mt-3 text-ink-muted max-w-2xl">
          Tell us what you&apos;re posting — a job, service, vehicle for sale, or referral claim. We&apos;ll review and publish within 24 hours.
        </p>
        <div className="mt-6 max-w-3xl">
          <OpportunityForm />
        </div>
      </section>
    </>
  );
}
