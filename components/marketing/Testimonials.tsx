import { Icon } from '@/components/ui/Icon';
import { getTestimonials } from '@/lib/api';

export function Testimonials() {
  const items = getTestimonials();
  return (
    <section className="section bg-white border-y border-line">
      <div className="container-x">
        <p className="eyebrow">Customers</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">What customers say</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {items.map(t => (
            <figure key={t.id} className="card p-6">
              <div className="flex gap-0.5 text-warning" aria-label="5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={16} />
                ))}
              </div>
              <blockquote className="mt-4 text-base leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-ink-muted">
                <span className="font-medium text-ink">{t.name}</span> &middot; {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
