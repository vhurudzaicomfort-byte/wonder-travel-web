import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import { getBusiness } from '@/lib/api';

export function Footer() {
  const business = getBusiness();
  const phone = business.phones[0];

  return (
    <footer className="bg-surface-dark text-white mt-24">
      <div className="border-b border-white/10">
        <div className="container-x py-8 md:py-10 grid gap-5 md:grid-cols-[1fr_auto] items-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-50">Earn extra income</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold">Rent out your car through us.</h2>
            <p className="mt-2 text-sm md:text-base text-white/70 max-w-prose">We handle marketing, bookings, payments and insurance. You earn a share. Onboard your vehicle in minutes.</p>
          </div>
          <Link
            href="/partners/list-your-vehicle"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 px-6 py-3 text-sm md:text-base font-medium text-white hover:bg-white/15 hover:border-white/60 transition-colors whitespace-nowrap"
          >
            <Icon name="upload" size={18} />
            Rent out your car
          </Link>
        </div>
      </div>
      <div className="container-x py-14 md:py-20 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo variant="full-dark" height={56} />
          <p className="mt-4 text-sm text-white/70 max-w-xs">{business.shortDescription}</p>
          <div className="mt-5 flex gap-3">
            <a href={business.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 p-2 hover:bg-white/10">
              <FacebookIcon />
            </a>
            <a href={business.social.twitter} aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/15 p-2 hover:bg-white/10">
              <XIcon />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Quick links</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link href="/vehicles" className="hover:text-white">Vehicles</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/visit-masvingo" className="hover:text-white">Visit Masvingo</Link></li>
            <li><Link href="/opportunities" className="hover:text-white">Opportunities</Link></li>
            <li><Link href="/emergency" className="hover:text-white">Emergency services</Link></li>
            <li><Link href="/about" className="hover:text-white">About us</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link href="/terms" className="hover:text-white">Terms &amp; conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy policy</Link></li>
            <li><Link href="/cancellation" className="hover:text-white">Cancellation policy</Link></li>
            <li><Link href="/faq" className="hover:text-white">Rental requirements</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Visit / talk to us</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <Icon name="pin" size={16} className="text-white/60 mt-0.5" />
              <span>{business.address.street}, {business.address.city}</span>
            </li>
            <li><a href={phone.telLink} className="flex items-center gap-2 hover:text-white"><Icon name="phone" size={16} className="text-white/60" />{phone.display}</a></li>
            <li><a href={phone.waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><Icon name="whatsapp" size={16} className="text-white/60" />WhatsApp</a></li>
            <li><a href={`mailto:${business.email}`} className="flex items-center gap-2 hover:text-white"><Icon name="mail" size={16} className="text-white/60" />{business.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Wonder Travel Car Rental Services. Proudly Zimbabwean.</p>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-2" style={{ background: '#006400' }} />
            <span className="inline-block w-3 h-2" style={{ background: '#FCD116' }} />
            <span className="inline-block w-3 h-2" style={{ background: '#CE1126' }} />
            <span className="ml-2">Masvingo, Zimbabwe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13v-2a1 1 0 0 1 1-1z"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 4h3l-7 8 8 8h-6.6l-5-6-5.4 6H2l7.5-8.5L2 4h6.7l4.5 5.5L18 4z"/>
    </svg>
  );
}
