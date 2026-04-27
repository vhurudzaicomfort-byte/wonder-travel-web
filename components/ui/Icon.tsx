import clsx from 'clsx';

export type IconName =
  | 'pin' | 'calendar' | 'clock' | 'car' | 'suv' | '4wd' | 'van'
  | 'crown' | 'wallet' | 'seat' | 'gear' | 'fuel' | 'snow' | 'bluetooth'
  | 'shield' | 'lock' | 'phone' | 'whatsapp' | 'mail' | 'check' | 'x'
  | 'chevron-down' | 'chevron-right' | 'arrow-right' | 'arrow-left'
  | 'star' | 'info' | 'upload' | 'bank' | 'mobile-money' | 'card'
  | 'route' | 'headset' | 'menu' | 'search' | 'users' | 'luggage' | 'spinner';

type Props = {
  name: IconName;
  className?: string;
  size?: number;
  title?: string;
  decorative?: boolean;
};

export function Icon({ name, className, size = 20, title, decorative = true }: Props) {
  return (
    <svg
      width={size}
      height={size}
      className={clsx('inline-block shrink-0', className)}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={!decorative ? title : undefined}
    >
      {!decorative && title ? <title>{title}</title> : null}
      <use href={`/sprite.svg#i-${name}`} />
    </svg>
  );
}
