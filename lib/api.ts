import vehiclesData from '@/data/vehicles.json';
import businessData from '@/data/business.json';
import extrasData from '@/data/extras.json';
import servicesData from '@/data/services.json';
import faqData from '@/data/faq.json';
import testimonialsData from '@/data/testimonials.json';
import destinationsData from '@/data/destinations.json';
import accommodationData from '@/data/accommodation.json';
import chillspotsData from '@/data/chillspots.json';
import activitiesData from '@/data/activities.json';
import emergencyData from '@/data/emergency.json';
import type {
  Vehicle, Business, Extra, Service, FaqGroup, Testimonial,
  Destination, Stay, ChillSpot, Activity, EmergencyGroup
} from './types';

export function getVehicles(): Vehicle[] {
  return vehiclesData as Vehicle[];
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return (vehiclesData as Vehicle[]).find(v => v.slug === slug);
}

export function getVehiclesByCategory(category: string): Vehicle[] {
  return (vehiclesData as Vehicle[]).filter(
    v => v.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedVehicles(limit = 4): Vehicle[] {
  return [...(vehiclesData as Vehicle[])]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getSimilarVehicles(slug: string, limit = 3): Vehicle[] {
  const current = getVehicleBySlug(slug);
  if (!current) return [];
  return (vehiclesData as Vehicle[])
    .filter(v => v.slug !== slug && v.category === current.category)
    .slice(0, limit);
}

export function getBusiness(): Business {
  return businessData as Business;
}

export function getExtras(): Extra[] {
  return extrasData as Extra[];
}

export function getServices(): Service[] {
  return servicesData as Service[];
}

export function getServiceById(id: string): Service | undefined {
  return (servicesData as Service[]).find(s => s.id === id);
}

export function getFaq(): FaqGroup[] {
  return faqData as FaqGroup[];
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

export const CATEGORIES = [
  'Class A',
  'Class B',
  'Class C',
  'Off Road Double Cab',
  'Off Road Single Cab',
  'Mini Bus',
  'SUV',
  'Luxury',
  'Budget',
  'Others'
] as const;

export function categorySlug(c: string) {
  return c.toLowerCase().replace(/\s+/g, '-');
}
export function categoryFromSlug(slug: string): string | undefined {
  return (CATEGORIES as readonly string[]).find(c => categorySlug(c) === slug.toLowerCase());
}

export function getDestinations(): Destination[] {
  return ((destinationsData as { destinations: Destination[] }).destinations) as Destination[];
}
export function getDestinationCategories(): { id: string; label: string }[] {
  return (destinationsData as { categories: { id: string; label: string }[] }).categories;
}
export function getDestinationById(id: string): Destination | undefined {
  return getDestinations().find(d => d.id === id);
}
export function getTopDestinations(limit = 6): Destination[] {
  return [...getDestinations()]
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
    .slice(0, limit);
}

export function getStays(): Stay[] {
  return accommodationData as Stay[];
}
export function getChillSpots(): ChillSpot[] {
  return chillspotsData as ChillSpot[];
}
export function getActivities(): Activity[] {
  return activitiesData as Activity[];
}
export function getEmergency(): EmergencyGroup[] {
  return emergencyData as EmergencyGroup[];
}
