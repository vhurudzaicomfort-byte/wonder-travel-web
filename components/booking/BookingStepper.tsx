import clsx from 'clsx';

const STEPS = ['Trip', 'Driver', 'Extras', 'Review', 'Payment'] as const;

export function BookingStepper({ current }: { current: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="container-x pt-6">
      <p className="text-xs text-ink-muted">Step {current} of 5</p>
      <h1 className="mt-1 text-2xl md:text-3xl font-bold">{STEPS[current - 1]} {current === 5 ? '' : ''}</h1>
      <ol className="mt-4 flex items-center gap-2" aria-label="Booking progress">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const state = n < current ? 'done' : n === current ? 'active' : 'todo';
          return (
            <li key={label} className="flex items-center gap-2 flex-1">
              <span
                className={clsx(
                  'inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-medium tabular',
                  state === 'done' && 'bg-brand text-white',
                  state === 'active' && 'bg-brand text-white ring-4 ring-brand-50',
                  state === 'todo' && 'bg-surface-3 text-ink-subtle'
                )}
              >
                {n}
              </span>
              <span className={clsx('hidden sm:inline text-xs font-medium', state === 'todo' ? 'text-ink-subtle' : 'text-ink')}>{label}</span>
              {i < STEPS.length - 1 && (
                <span className={clsx('flex-1 h-px', n < current ? 'bg-brand' : 'bg-line')} />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
