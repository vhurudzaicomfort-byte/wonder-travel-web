import type { MetadataRoute } from 'next';
import { getVehicles, getServices, CATEGORIES } from '@/lib/api';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wondertravel.co.zw';
  const today = new Date();

  const staticRoutes = ['/', '/vehicles', '/services', '/about', '/contact', '/faq', '/terms', '/privacy', '/cancellation', '/visit-masvingo', '/emergency'].map(path => ({
    url: `${base}${path}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1.0 : 0.7
  }));

  const vehicleRoutes = getVehicles().map(v => ({
    url: `${base}/vehicles/${v.slug}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));

  const categoryRoutes = CATEGORIES.map(c => ({
    url: `${base}/vehicles/category/${c.toLowerCase()}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }));

  const serviceRoutes = getServices().map(s => ({
    url: `${base}/services/${s.id}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...vehicleRoutes, ...categoryRoutes, ...serviceRoutes];
}
