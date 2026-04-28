'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

type Status = 'idle' | 'submitting' | 'sent' | 'error';

const CATEGORIES: { value: string; label: string }[] = [
  { value: 'jobs',     label: 'Job listing' },
  { value: 'services', label: 'Third-party service' },
  { value: 'vehicles', label: 'Vehicle for sale' },
  { value: 'refer',    label: 'Refer & earn (claim referrals)' }
];

export function OpportunityForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+263 ');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('jobs');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const valid = name && phone.trim().length > 4 && email && title && description && location;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStatus('submitting');
    setError(null);
    try {
      let imageDataUrl: string | undefined;
      if (imageFile && imageFile.size <= 1.5 * 1024 * 1024) {
        imageDataUrl = await fileToDataUrl(imageFile);
      }
      const res = await fetch('/api/opportunity-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, category, title, description, location, imageDataUrl })
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Submission failed');
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-border bg-surface-1 p-8 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
          <Icon name="check" size={24} />
        </div>
        <h2 className="mt-4 text-2xl font-bold">Submission received</h2>
        <p className="mt-2 text-ink-muted max-w-md mx-auto">
          We&apos;ll review your post and publish it within 24 hours. We&apos;ll WhatsApp or email you once it&apos;s live.
        </p>
        <a href="/opportunities" className="btn btn-secondary btn-md mt-6 inline-flex">Back to opportunities</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-surface-1 p-6 md:p-8 space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name / company" required>
          <input className="field-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Moyo / Sparkle Auto" required />
        </Field>
        <Field label="Phone (with WhatsApp)" required>
          <input className="field-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+263 …" required />
        </Field>
        <Field label="Email" required>
          <input className="field-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        </Field>
        <Field label="Category" required>
          <select className="field-input" value={category} onChange={e => setCategory(e.target.value)} required>
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Title" required>
        <input className="field-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Class 4 driver — full time" required />
      </Field>

      <Field label="Description" required hint="Up to ~600 characters. Be specific.">
        <textarea
          className="field-input min-h-[120px] resize-y py-2"
          value={description}
          onChange={e => setDescription(e.target.value.slice(0, 600))}
          placeholder="What are you offering? Requirements, rates, working hours, etc."
          required
        />
      </Field>

      <Field label="Location" required>
        <input className="field-input" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Masvingo CBD" required />
      </Field>

      <Field label="Image (optional)" hint="JPG/PNG up to ~1.5MB. Helps the post stand out.">
        <input
          className="field-input"
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files?.[0] ?? null)}
        />
      </Field>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!valid || status === 'submitting'}
          className="btn btn-primary btn-lg disabled:opacity-50"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit for review'}
        </button>
        <p className="text-xs text-ink-muted">We review every post for quality before publishing.</p>
      </div>
    </form>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </label>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
