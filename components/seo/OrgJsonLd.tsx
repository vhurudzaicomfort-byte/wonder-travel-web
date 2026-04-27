import { getBusiness } from '@/lib/api';

export function OrgJsonLd() {
  const b = getBusiness();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CarRental',
    name: b.name,
    url: 'https://wondertravel.co.zw',
    telephone: b.phones[0].value,
    email: b.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.address.street,
      addressLocality: b.address.city,
      addressCountry: 'ZW'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: b.address.geo.lat,
      longitude: b.address.geo.lng
    },
    sameAs: [b.social.facebook, b.social.twitter],
    priceRange: 'USD 38 - USD 180 / day'
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
