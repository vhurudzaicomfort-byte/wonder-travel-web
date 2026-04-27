import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { getFaq } from '@/lib/api';

export const metadata: Metadata = {
  title: 'FAQ — booking, payment, insurance, cross-border',
  description: 'Answers to common questions about renting a car with Wonder Travel in Masvingo and across Zimbabwe.'
};

export default function FaqPage() {
  const groups = getFaq();
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups.flatMap(g =>
      g.items.map(i => ({
        '@type': 'Question',
        name: i.q,
        acceptedAnswer: { '@type': 'Answer', text: i.a }
      }))
    )
  };
  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      </div>
      <section className="container-x py-10 md:py-16 max-w-3xl">
        <p className="eyebrow">Help</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Frequently asked questions</h1>

        {groups.map(g => (
          <div key={g.group} className="mt-10">
            <h2 className="text-xl md:text-2xl font-medium">{g.group}</h2>
            <div className="mt-4 divide-y divide-line border border-line rounded-2xl bg-white">
              {g.items.map((it, i) => (
                <details key={i} className="group p-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-medium">
                    <span>{it.q}</span>
                    <span className="ml-3 text-ink-muted group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{it.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
