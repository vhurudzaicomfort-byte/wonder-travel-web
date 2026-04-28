'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

type Props = {
  image: string;
  fallback?: string;
  title: string;
  type?: string;
  body: string;
  badges?: string[];
  highlight?: boolean;
  phone?: string;
  address?: string;
  href?: string;
};

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1535082623926-b39352a03fb7?auto=format&fit=crop&w=1200&q=80';

export function PlaceCard({ image, fallback, title, type, body, badges, highlight, phone, address, href }: Props) {
  const fb = fallback || DEFAULT_FALLBACK;
  const [src, setSrc] = useState(image && image.startsWith('http') ? image : fb);
  const content = (
    <article className={`card group flex h-full flex-col overflow-hidden transition-all duration-200 hover:shadow hover:-translate-y-0.5 ${highlight ? 'ring-1 ring-brand/40' : ''}`}>
      <div className="relative overflow-hidden bg-surface-3" style={{ aspectRatio: '5 / 3' }}>
        <img
          src={src}
          alt={title}
          loading="lazy"
          width={1000}
          height={600}
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
          referrerPolicy="no-referrer"
          onError={() => { if (src !== fb) setSrc(fb); }}
        />
        {highlight && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-warning/95 px-2.5 py-0.5 text-[11px] font-medium text-white">
            <Icon name="star" size={11} /> Top pick
          </span>
        )}
        {type && (
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-medium text-brand">
            {type}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-medium leading-tight">{title}</h3>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed flex-1">{body}</p>
        {(address || phone) && (
          <div className="mt-3 space-y-1 text-xs text-ink-muted">
            {address && <p className="inline-flex items-start gap-1.5"><Icon name="pin" size={12} className="mt-0.5 text-brand" />{address}</p>}
            {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-brand"><Icon name="phone" size={12} className="text-brand" />{phone}</a>}
          </div>
        )}
        {badges && badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {badges.slice(0, 4).map(b => (
              <span key={b} className="rounded-full bg-surface-3 px-2 py-0.5 text-[11px] text-ink-muted">{b}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
  return href ? <Link href={href} className="block h-full">{content}</Link> : content;
}
