import vehiclesData from '@/data/vehicles.json';
import businessData from '@/data/business.json';
import extrasData from '@/data/extras.json';
import servicesData from '@/data/services.json';
import faqData from '@/data/faq.json';
import testimonialsData from '@/data/testimonials.json';
import type { Vehicle, Business, Extra, Service, FaqGroup, Testimonial } from './types';

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

export const CATEGORIES = ['Sedan', 'SUV', '4x4', 'Van', 'Luxury', 'Budget'] as const;
