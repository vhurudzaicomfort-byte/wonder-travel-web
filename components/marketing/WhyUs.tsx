import { Icon, IconName } from '@/components/ui/Icon';

const ITEMS: { title: string; body: string; icon: IconName }[] = [
  { title: 'Local expertise', body: 'Masvingo-rooted operators who know every road, lodge and border post.', icon: 'pin' },
  { title: 'Transparent pricing', body: 'USD/day visible up-front. No "call for price". No surprise fees at checkout.', icon: 'wallet' },
  { title: 'Insured & maintained', body: 'Every vehicle is comprehensively insured and serviced before each rental.', icon: 'shield' },
  { title: 'WhatsApp anytime', body: 'A real human on +263 77 225 8979, day or night, before and during your trip.', icon: 'whatsapp' }
];

export function WhyUs() {
  return (
    <section className="section">
      <div className="container-x">
        <p className="eyebrow">Why us</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Why Wonder Travel</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(it => (
            <div key={it.title} className="card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name={it.icon} size={22} />
              </span>
              <h3 className="mt-4 text-lg font-medium">{it.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
