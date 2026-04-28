import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/book/', '/api/'] }],
    sitemap: 'https://wondertravel.vercel.app/sitemap.xml'
  };
}
