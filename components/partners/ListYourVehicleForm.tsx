'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

type Status = 'idle' | 'submitting' | 'sent' | 'error';
type Step = 1 | 2 | 3 | 4;

const STEP_LABELS = ['You', 'Vehicle', 'Rental terms', 'Documents'];

const VEHICLE_TYPES = [
  'Class A — Hatchback',
  'Class B — Van',
  'Class C — Sedan',
  'Off Road Double Cab',
  'Off Road Single Cab',
  'Mini Bus',
  'SUV',
  'Luxury',
  'Budget',
  'Coach Bus',
  'Truck'
];

// Suggested daily rate band by vehicle type
function suggestedRate(type: string): string {
  if (type.startsWith('Class A') || type === 'Budget') return 'USD 35 – 50';
  if (type.startsWith('Class B')) return 'USD 55 – 75';
  if (type.startsWith('Class C')) return 'USD 50 – 70';
  if (type.startsWith('Off Road')) return 'USD 75 – 110';
  if (type === 'Mini Bus') return 'USD 100 – 140';
  if (type === 'SUV') return 'USD 70 – 150';
  if (type === 'Luxury') return 'USD 150 – 250';
  if (type === 'Coach Bus' || type === 'Truck') return 'USD 200 – 300';
  return 'USD 35 – 250';
}

export function ListYourVehicleForm() {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+263 ');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [transmission, setTransmission] = useState<'automatic' | 'manual' | ''>('');
  const [fuel, setFuel] = useState('');
  const [seats, setSeats] = useState('');
  const [condition, setCondition] = useState<'Excellent' | 'Good' | 'Needs Work' | ''>('');

  const [dailyRate, setDailyRate] = useState('');
  const [availability, setAvailability] = useState<'Always available' | 'Specific dates' | ''>('');
  const [willingSelfDrive, setWillingSelfDrive] = useState(true);
  const [willingChauffeur, setWillingChauffeur] = useState(false);
  const [managedByWT, setManagedByWT] = useState(true);

  const [imageUrls, setImageUrls] = useState('');
  const [registrationNote, setRegistrationNote] = useState('');
  const [licenceNote, setLicenceNote] = useState('');

  const validStep1 = fullName && phone.trim().length > 4 && email && location;
  const validStep2 = make && model && year && vehicleType && transmission && fuel && seats && condition;
  const validStep3 = availability && (willingSelfDrive || willingChauffeur);

  const next = () => setStep(s => (Math.min(4, s + 1) as Step));
  const prev = () => setStep(s => (Math.max(1, s - 1) as Step));

  const submit = async () => {
    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/api/partner-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName, phone, email, location,
          vehicle: { make, model, year, type: vehicleType, transmission, fuel, seats, condition },
          terms: { dailyRate, availability, willingSelfDrive, willingChauffeur, managedByWT },
          documents: { imageUrls, registrationNote, licenceNote }
        })
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('sent');
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
        <p className="mt-2 text-ink-muted">Our team will review your vehicle and contact you on WhatsApp within 48 hours to confirm next steps and arrange an inspection.</p>
        <p className="mt-2 text-sm text-ink-subtle">Our team will review and contact you before listing your vehicle.</p>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-7">
      {/* Stepper */}
      <ol className="flex items-center gap-2 mb-6" aria-label="Form progress">
        {STEP_LABELS.map((label, i) => {
          const n = (i + 1) as Step;
          const state = n < step ? 'done' : n === step ? 'active' : 'todo';
          return (
            <li key={label} className="flex items-center gap-2 flex-1">
              <span className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-medium tabular ${
                state === 'done' ? 'bg-brand text-white' :
                state === 'active' ? 'bg-brand text-white ring-4 ring-brand-50' :
                'bg-surface-3 text-ink-subtle'
              }`}>{n}</span>
              <span className={`hidden sm:inline text-xs font-medium ${state === 'todo' ? 'text-ink-subtle' : 'text-ink'}`}>{label}</span>
              {i < STEP_LABELS.length - 1 && <span className={`flex-1 h-px ${n < step ? 'bg-brand' : 'bg-line'}`} />}
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your details</h3>
          <Field label="Full name" required value={fullName} onChange={setFullName} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone (WhatsApp)" required type="tel" value={phone} onChange={setPhone} placeholder="+263 ..." />
            <Field label="Email" required type="email" value={email} onChange={setEmail} />
          </div>
          <Field label="Location (city / town)" required value={location} onChange={setLocation} placeholder="Masvingo, Harare, Bulawayo, etc." />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Vehicle details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Make" required value={make} onChange={setMake} placeholder="Toyota" />
            <Field label="Model" required value={model} onChange={setModel} placeholder="Fortuner" />
            <Field label="Year" required type="number" value={year} onChange={setYear} placeholder="2020" />
            <Field label="Number of seats" required type="number" value={seats} onChange={setSeats} placeholder="5" />
          </div>
          <Select label="Vehicle type" required value={vehicleType} onChange={setVehicleType}>
            <option value="">Choose a class</option>
            {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Transmission" required value={transmission} onChange={v => setTransmission(v as 'automatic' | 'manual')}>
              <option value="">Choose</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </Select>
            <Select label="Fuel" required value={fuel} onChange={setFuel}>
              <option value="">Choose</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </Select>
          </div>
          <Select label="Condition" required value={condition} onChange={v => setCondition(v as 'Excellent' | 'Good' | 'Needs Work')}>
            <option value="">Choose</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Needs Work">Needs work</option>
          </Select>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Rental terms</h3>
          {vehicleType && (
            <div className="rounded-xl bg-brand-50 border border-brand/20 p-3 text-sm">
              <p className="inline-flex items-center gap-2 font-medium text-brand"><Icon name="info" size={14} />Suggested daily rate</p>
              <p className="mt-1 text-ink-muted">For <span className="font-medium text-ink">{vehicleType}</span> we typically rent at <span className="font-medium text-ink">{suggestedRate(vehicleType)}</span> per day.</p>
            </div>
          )}
          <Field label="Preferred daily rate (USD)" type="number" value={dailyRate} onChange={setDailyRate} placeholder="Optional — we can recommend" helper="Leave blank if you'd like Wonder Travel to suggest a rate." />
          <Select label="Availability" required value={availability} onChange={v => setAvailability(v as 'Always available' | 'Specific dates')}>
            <option value="">Choose</option>
            <option value="Always available">Always available</option>
            <option value="Specific dates">Specific dates only</option>
          </Select>
          <fieldset>
            <legend className="text-sm font-medium mb-2">Willing for</legend>
            <label className="flex items-center gap-2 text-sm py-1.5 cursor-pointer">
              <input type="checkbox" className="accent-brand h-4 w-4" checked={willingSelfDrive} onChange={e => setWillingSelfDrive(e.target.checked)} />
              Self-drive rentals
            </label>
            <label className="flex items-center gap-2 text-sm py-1.5 cursor-pointer">
              <input type="checkbox" className="accent-brand h-4 w-4" checked={willingChauffeur} onChange={e => setWillingChauffeur(e.target.checked)} />
              Chauffeur-driven rentals
            </label>
          </fieldset>
          <label className="flex items-start gap-2 text-sm py-2 cursor-pointer rounded-lg bg-surface-3 px-3">
            <input type="checkbox" className="accent-brand h-4 w-4 mt-0.5" checked={managedByWT} onChange={e => setManagedByWT(e.target.checked)} />
            <span><span className="font-medium">I want Wonder Travel to manage everything</span> — marketing, bookings, customer service, payments and insurance. Recommended.</span>
          </label>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Documents &amp; photos</h3>
          <p className="text-sm text-ink-muted">For now, send links to your photos and documents (Google Drive, Dropbox, WhatsApp share). We&apos;ll move them to our secure storage on listing.</p>
          <Textarea label="Vehicle image URLs" rows={3} value={imageUrls} onChange={setImageUrls} helper="Paste 3–6 photo links, one per line — exterior, interior, dashboard, boot." />
          <Textarea label="Registration book — share method" rows={2} value={registrationNote} onChange={setRegistrationNote} placeholder="e.g. 'I'll WhatsApp it' or paste a Drive link" />
          <Textarea label="Driver's licence (optional but recommended)" rows={2} value={licenceNote} onChange={setLicenceNote} placeholder="Same — link or note" />
          <p className="text-xs text-ink-muted rounded-xl bg-surface-3 p-3">
            <Icon name="lock" size={12} className="inline-block mr-1 text-brand" />
            Our team will review and contact you before listing your vehicle. Documents are kept confidential.
          </p>
          {error && <p className="text-sm text-danger">{error}</p>}
        </div>
      )}

      <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <button type="button" onClick={prev} className="btn btn-ghost btn-md" disabled={step === 1}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        {step < 4 ? (
          <button
            type="button"
            onClick={next}
            disabled={(step === 1 && !validStep1) || (step === 2 && !validStep2) || (step === 3 && !validStep3)}
            className="btn btn-primary btn-md"
          >
            Continue <Icon name="arrow-right" size={16} />
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={status === 'submitting'} className="btn btn-primary btn-md">
            {status === 'submitting' ? <><Icon name="spinner" size={16} className="animate-spin" /> Sending</> : <>Submit listing <Icon name="check" size={16} /></>}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder, helper, required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; helper?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="field-label">{label}{required && <span className="text-ink-muted"> *</span>}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="field-input" />
      {helper && <p className="field-helper">{helper}</p>}
    </div>
  );
}

function Select({ label, value, onChange, children, required }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="field-label">{label}{required && <span className="text-ink-muted"> *</span>}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className="field-input">{children}</select>
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 3, placeholder, helper }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; helper?: string }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="field-input !h-auto py-3" />
      {helper && <p className="field-helper">{helper}</p>}
    </div>
  );
}
