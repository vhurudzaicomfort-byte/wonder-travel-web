import { Icon, IconName } from '@/components/ui/Icon';

const ITEMS: { icon: IconName; label: string }[] = [
  { icon: 'check', label: 'Instant confirmation' },
  { icon: 'mobile-money', label: 'EcoCash & Visa' },
  { icon: 'whatsapp', label: '24/7 WhatsApp support' },
  { icon: 'shield', label: 'Insured fleet' }
];

export function TrustStrip({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const text = variant === 'dark' ? 'text-white/85' : 'text-ink-muted';
  const icon = variant === 'dark' ? 'text-white' : 'text-brand';
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium ${text}`}>
      {ITEMS.map(it => (
        <li key={it.label} className="inline-flex items-center gap-2">
          <Icon name={it.icon} size={18} className={icon} />
          {it.label}
        </li>
      ))}
    </ul>
  );
}
