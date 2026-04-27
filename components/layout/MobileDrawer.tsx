'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/brand/Logo';
import { getBusiness } from '@/lib/api';

type Props = {
  open: boolean;
  onClose: () => void;
  nav: { href: string; label: string }[];
};

export function MobileDrawer({ open, onClose, nav }: Props) {
  const business = getBusiness();
  const phone = business.phones[0];

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm bg-white shadow-lg flex flex-col">
        <div className="flex items-center justify-between px-5 h-16 border-b border-line">
          <Logo variant="mark" height={32} />
          <button onClick={onClose} className="btn btn-ghost btn-sm" aria-label="Close menu">
            <Icon name="x" size={22} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            {nav.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface-3"
                >
                  {item.label}
                  <Icon name="chevron-right" size={18} className="text-ink-subtle" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-3">
            <Link href="/book" onClick={onClose} className="btn btn-primary btn-lg w-full">
              Book a car
            </Link>
            <a href={phone.waLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg w-full">
              <Icon name="whatsapp" size={18} />
              WhatsApp us
            </a>
          </div>
        </nav>
        <div className="border-t border-line px-5 py-4 text-sm text-ink-muted">
          <a href={phone.telLink} className="flex items-center gap-2 mb-1">
            <Icon name="phone" size={16} /> {phone.display}
          </a>
          <a href={`mailto:${business.email}`} className="flex items-center gap-2">
            <Icon name="mail" size={16} /> {business.email}
          </a>
        </div>
      </div>
    </div>
  );
}
