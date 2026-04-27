export type VehicleCategory = 'Sedan' | 'SUV' | '4x4' | 'Van' | 'Luxury' | 'Budget';

export type Vehicle = {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  category: VehicleCategory;
  transmission: 'automatic' | 'manual';
  fuel: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  seats: number;
  doors: number;
  luggage: number;
  ac: boolean;
  bluetooth: boolean;
  fourWheelDrive: boolean;
  crossBorderAllowed: boolean;
  mileagePolicy: 'unlimited' | 'limited';
  minDriverAge: number;
  rates: { perDayUSD: number; perWeekUSD: number; perMonthUSD: number };
  depositUSD: number;
  images: { cover: string; gallery: string[] };
  features: string[];
  available: boolean;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  longDescription: string;
  placeholder?: boolean;
};

export type Extra = {
  id: string;
  label: string;
  perDayUSD?: number;
  oneOffUSD?: number;
  icon: string;
};

export type PickupLocation = { id: string; label: string; feeUSD: number };

export type Business = {
  name: string;
  tagline: string;
  shortDescription: string;
  address: { street: string; city: string; country: string; geo: { lat: number; lng: number } };
  phones: { label: string; value: string; waLink: string; telLink: string; display: string }[];
  email: string;
  social: { facebook: string; twitter: string };
  hours: { day: string; hours: string }[];
  pickupLocations: PickupLocation[];
};

export type Service = {
  id: string;
  title: string;
  icon: string;
  summary: string;
  body: string;
};

export type FaqGroup = { group: string; items: { q: string; a: string }[] };

export type Testimonial = {
  id: string;
  name: string;
  city: string;
  quote: string;
  placeholder?: boolean;
};
