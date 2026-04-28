'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

type Status = 'idle' | 'submitting' | 'sent' | 'error';

export function AddYourPlaceForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      businessName: fd.get('businessName'),
      category: fd.get('category'),
      description: fd.get('description'),
      location: fd.get('location'),
      contactName: fd.get('contactName'),
      phone: fd.get('phone'),
      email: fd.get('email'),
      website: fd.get('website'),
      imageUrl: fd.get('imageUrl')
    };

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('sent');
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'sent') {
    return (
      <div className="card p-8 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success">
          <Icon name="check" size={36} />
        </span>
        <h2 className="mt-4 text-2xl font-bold">Thanks — we&apos;ve got it.</h2>
        <p className="mt-2 text-ink-muted">We&apos;ll review your submission within 48 hours and reach out by email or phone if we need anything else.</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn btn-secondary btn-md mt-6">Add another place</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-5">
      <Field label="Business name" name="businessName" required />
      <Select label="Category" name="category" required>
        <option value="">Select a category</option>
        <option value="stay">Stay (lodge, hotel, guest house)</option>
        <option value="eat">Eat &amp; drink (restaurant, bar, club)</option>
        <option value="activity">Activity (tour, experience)</option>
        <option value="attraction">Attraction</option>
        <option value="other">Other</option>
      </Select>
      <Textarea label="Description" name="description" required helper="2–3 sentences. What makes your place worth a visit?" rows={4} />
      <Field label="Location" name="location" required helper="Address or area, e.g. 'Hillside Extension, Masvingo'" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="contactName" required />
        <Field label="Phone / WhatsApp" name="phone" type="tel" required placeholder="+263 ..." />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" />
        <Field label="Website or social link" name="website" type="url" placeholder="https://..." />
      </div>
      <Field label="Image URL (optional)" name="imageUrl" type="url" placeholder="Link to a photo of your place" helper="We&apos;ll resize and rehost. JPG / PNG / WebP." />

      {status === 'error' && error && <p className="text-sm text-danger">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-xs text-ink-subtle">By submitting you agree we may contact you and feature your place on Wonder Travel.</p>
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Icon name="spinner" size={18} className="animate-spin" />
              Sending
            </>
          ) : (
            <>Submit listing <Icon name="arrow-right" size={18} /></>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, required, type = 'text', placeholder, helper }: { label: string; name: string; required?: boolean; type?: string; placeholder?: string; helper?: string }) {
  return (
    <div>
      <label className="field-label" htmlFor={name}>{label}{required && <span className="text-ink-muted"> *</span>}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} className="field-input" />
      {helper && <p className="field-helper">{helper}</p>}
    </div>
  );
}

function Select({ label, name, required, children }: { label: string; name: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="field-label" htmlFor={name}>{label}{required && <span className="text-ink-muted"> *</span>}</label>
      <select id={name} name={name} required={required} className="field-input" defaultValue="">{children}</select>
    </div>
  );
}

function Textarea({ label, name, required, rows = 4, helper }: { label: string; name: string; required?: boolean; rows?: number; helper?: string }) {
  return (
    <div>
      <label className="field-label" htmlFor={name}>{label}{required && <span className="text-ink-muted"> *</span>}</label>
      <textarea id={name} name={name} required={required} rows={rows} className="field-input !h-auto py-3" />
      {helper && <p className="field-helper">{helper}</p>}
    </div>
  );
}
