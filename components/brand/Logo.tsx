import clsx from 'clsx';

type Variant = 'full' | 'mark' | 'full-dark' | 'mark-dark';

type Props = {
  variant?: Variant;
  className?: string;
  height?: number;
  ariaLabel?: string;
};

export function Logo({ variant = 'full', className, height = 44, ariaLabel = 'Wonder Travel Car Rental Services' }: Props) {
  const dark = variant.endsWith('dark');
  const wing = dark ? '#3B82F6' : '#1E3A8A';
  const wheel = dark ? '#FFFFFF' : '#0F172A';
  const star = dark ? '#FFFFFF' : '#1E3A8A';
  const word = dark ? '#FFFFFF' : '#0F172A';

  if (variant === 'mark' || variant === 'mark-dark') {
    return (
      <svg
        viewBox="0 0 200 140"
        height={height}
        className={clsx('block', className)}
        role="img"
        aria-label={ariaLabel}
        focusable="false"
      >
        <Mark wing={wing} wheel={wheel} star={star} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 200"
      height={height}
      className={clsx('block', className)}
      role="img"
      aria-label={ariaLabel}
      focusable="false"
    >
      <g transform="translate(80,0)">
        <Mark wing={wing} wheel={wheel} star={star} />
      </g>
      <g fill={word} fontFamily="Ubuntu, system-ui, sans-serif">
        <text x="180" y="170" textAnchor="middle" fontSize="28" fontWeight="700" letterSpacing="2">WONDER TRAVEL</text>
        <text x="180" y="190" textAnchor="middle" fontSize="13" fontWeight="500" letterSpacing="3">CAR RENTAL SERVICES</text>
      </g>
    </svg>
  );
}

function Mark({ wing, wheel, star }: { wing: string; wheel: string; star: string }) {
  return (
    <g>
      <g fill={star}>
        <Star cx={70} cy={20} r={5} />
        <Star cx={100} cy={14} r={6} />
        <Star cx={130} cy={20} r={5} />
      </g>
      <g fill={wing}>
        <path d="M100 50 C 60 30, 30 50, 10 80 C 35 70, 60 70, 80 80 C 70 70, 75 60, 100 60 Z" />
        <path d="M100 50 C 140 30, 170 50, 190 80 C 165 70, 140 70, 120 80 C 130 70, 125 60, 100 60 Z" />
      </g>
      <g>
        <circle cx="100" cy="80" r="28" fill={wheel} />
        <circle cx="100" cy="80" r="22" fill="none" stroke={wing} strokeWidth="3" />
        <circle cx="100" cy="80" r="6" fill={wing} />
        <g stroke={wing} strokeWidth="3" strokeLinecap="round">
          <line x1="100" y1="62" x2="100" y2="74" />
          <line x1="100" y1="86" x2="100" y2="98" />
          <line x1="82" y1="80" x2="94" y2="80" />
          <line x1="106" y1="80" x2="118" y2="80" />
          <line x1="87" y1="67" x2="95" y2="75" />
          <line x1="105" y1="85" x2="113" y2="93" />
          <line x1="113" y1="67" x2="105" y2="75" />
          <line x1="95" y1="85" x2="87" y2="93" />
        </g>
      </g>
    </g>
  );
}

function Star({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.45;
    points.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`);
  }
  return <polygon points={points.join(' ')} />;
}
