'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import { MobileDrawer } from './MobileDrawer';
import { getBusiness } from '@/lib/api';

const NAV = [
  { href: '/vehicles',       label: 'Vehicles' },
  { href: '/services',       label: 'Services' },
  { href: '/about',          label: 'About' },
  { href: '/faq',            label: 'Help' },
  { href: '/contact',        label: 'Contact' },
  { href: '/visit-masvingo', label: 'Visit Masvingo' },
  { href: '/emergency',      label: 'Emergency' }
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const business = getBusiness();
  const phone = business.phones[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-40 transition-colors duration-200',
          scrolled
            ? 'bg-white/95 backdrop-blur shadow-sm border-b border-line'
            : 'bg-white border-b border-line'
        )}
      >
        <div className="container-x flex items-center justify-between gap-4 h-16 lg:h-20">
          <Link href="/" aria-label="Wonder Travel — home" className="flex items-center gap-3">
            <Logo variant="full" height={44} className="hidden sm:block" />
            <Logo variant="mark" height={36} className="sm:hidden" />
          </Link>
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-ink">
            {NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap hover:text-brand transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={phone.telLink}
              className="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand"
            >
              <Icon name="phone" size={18} />
              {phone.display}
            </a>
            <Link href="/book" className="btn btn-primary btn-md hidden sm:inline-flex">
              Book a car
            </Link>
            <button
              type="button"
              className="lg:hidden btn btn-ghost btn-sm"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} nav={NAV} />
    </>
  );
}
