const STEPS = [
  { n: 1, title: 'Search', body: 'Pick your dates and pickup location.' },
  { n: 2, title: 'Choose', body: 'Compare cars, photos, prices and inclusions.' },
  { n: 3, title: 'Pay', body: 'EcoCash, Paynow, Visa, ZIPIT or proof-of-payment.' },
  { n: 4, title: 'Drive', body: 'Collect the keys. We are here if you need us.' }
];

export function HowItWorks() {
  return (
    <section className="section bg-surface-3">
      <div className="container-x">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Book in under 4 minutes</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(s => (
            <div key={s.n} className="relative">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white text-base font-bold tabular">{s.n}</span>
              <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
