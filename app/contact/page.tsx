import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Icon } from '@/components/ui/Icon';
import { getBusiness } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Contact — call, WhatsApp, visit our office',
  description: 'Visit us at 697 Industria Rd, Echo Engineering, Masvingo. Call or WhatsApp +263 77 225 8979.'
};

export default function ContactPage() {
  const b = getBusiness();
  const phone = b.phones[0];

  return (
    <>
      <div className="container-x pt-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      </div>

      <section className="container-x py-10 md:py-16">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Talk to a real human.</h1>
        <p className="mt-3 max-w-prose text-ink-muted">Call, WhatsApp, email, or drop in to our Masvingo office.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="card p-5">
              <h2 className="text-lg font-medium">Visit us</h2>
              <p className="mt-2 inline-flex items-start gap-2 text-sm">
                <Icon name="pin" size={18} className="text-brand mt-0.5" />
                <span>{b.address.street}<br />{b.address.city}, {b.address.country}</span>
              </p>
            </div>

            <div className="card p-5">
              <h2 className="text-lg font-medium">Call or message</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href={phone.telLink} className="inline-flex items-center gap-2 hover:text-brand"><Icon name="phone" size={16} className="text-brand" /> {phone.display}</a></li>
                <li><a href={phone.waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand"><Icon name="whatsapp" size={16} className="text-brand" /> WhatsApp</a></li>
                <li><a href={`mailto:${b.email}`} className="inline-flex items-center gap-2 hover:text-brand"><Icon name="mail" size={16} className="text-brand" /> {b.email}</a></li>
              </ul>
            </div>

            <div className="card p-5">
              <h2 className="text-lg font-medium">Hours</h2>
              <ul className="mt-3 space-y-1.5 text-sm">
                {b.hours.map(h => (
                  <li key={h.day} className="flex justify-between gap-3">
                    <span className="text-ink-muted">{h.day}</span>
                    <span>{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form action="mailto:wondertravelw@gmail.com" method="post" encType="text/plain" className="card p-6 self-start">
            <h2 className="text-lg font-medium">Send a message</h2>
            <p className="mt-1 text-sm text-ink-muted">We&apos;ll reply within 2 hours during business hours.</p>
            <div className="mt-5 grid gap-4">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <label className="block">
                <span className="field-label">Message <span className="text-ink-muted">*</span></span>
                <textarea name="message" rows={5} required className="field-input !h-auto py-3" />
              </label>
              <button type="submit" className="btn btn-primary btn-lg w-full sm:w-auto">Send message</button>
            </div>
          </form>
        </div>

        <div className="mt-12 card overflow-hidden">
          <iframe
            title="Map of Wonder Travel office"
            className="w-full h-72 md:h-96"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=30.79%2C-20.10%2C30.86%2C-20.04&layer=mapnik&marker=${b.address.geo.lat}%2C${b.address.geo.lng}`}
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = 'text', required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="field-label">{label} {required && <span className="text-ink-muted">*</span>}</span>
      <input name={name} type={type} required={required} className="field-input" />
    </label>
  );
}
