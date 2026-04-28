import { Icon } from '@/components/ui/Icon';
import type { Opportunity } from '@/lib/opportunities';

const CATEGORY_LABEL: Record<string, string> = {
  jobs: 'Job',
  services: 'Service',
  vehicles: 'Vehicle for sale',
  refer: 'Refer & earn'
};

const CATEGORY_ACCENT: Record<string, string> = {
  jobs: '#1F6FEB',
  services: '#0F8D5A',
  vehicles: '#C9410B',
  refer: '#7A2BC0'
};

export function OpportunityCard({ op }: { op: Opportunity }) {
  const accent = CATEGORY_ACCENT[op.category] ?? '#1F6FEB';
  return (
    <article
      className="group flex flex-col rounded-2xl border border-border bg-surface-1 p-5 transition-shadow hover:shadow-md"
      style={{ borderTopWidth: 3, borderTopColor: accent }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: accent }}
        >
          {CATEGORY_LABEL[op.category]}
        </span>
        <time className="text-xs text-ink-muted" dateTime={op.postedAt}>
          {formatPosted(op.postedAt)}
        </time>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-ink leading-snug">{op.title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{op.company}</p>
      <p className="mt-3 text-sm text-ink/85 leading-relaxed">{op.description}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
        <Icon name="pin" size={14} />
        <span>{op.location}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={`tel:${op.phone.replace(/\s+/g, '')}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-ink hover:bg-surface-2"
        >
          <Icon name="phone" size={14} /> {op.phone}
        </a>
        <a
          href={`mailto:${op.email}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-ink hover:bg-surface-2"
        >
          <Icon name="mail" size={14} /> Email
        </a>
        <a
          href={`https://wa.me/${op.phone.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-medium text-white hover:opacity-90"
        >
          <Icon name="whatsapp" size={14} /> WhatsApp
        </a>
      </div>
    </article>
  );
}

function formatPosted(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  } catch {
    return iso;
  }
}
