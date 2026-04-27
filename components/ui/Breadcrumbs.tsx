import Link from 'next/link';
import { Icon } from './Icon';

type Item = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Item[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            {it.href ? (
              <Link href={it.href} className="hover:text-brand">{it.label}</Link>
            ) : (
              <span className="text-ink">{it.label}</span>
            )}
            {i < items.length - 1 && <Icon name="chevron-right" size={14} className="text-ink-subtle" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
