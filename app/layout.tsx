import type { Metadata } from 'next';
import { Ubuntu, Ubuntu_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { OrgJsonLd } from '@/components/seo/OrgJsonLd';
import './globals.css';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-ubuntu'
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-ubuntu-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wondertravel.vercel.app'),
  title: {
    default: 'Car Rental in Masvingo & Zimbabwe | Wonder Travel',
    template: '%s | Wonder Travel Car Rental'
  },
  description:
    'Self-drive and chauffeur car rentals from Masvingo, available across Zimbabwe. EcoCash, Visa & Paynow accepted. Instant confirmation.',
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    siteName: 'Wonder Travel Car Rental Services',
    title: 'Car Rental in Masvingo & Zimbabwe | Wonder Travel',
    description:
      'Self-drive and chauffeur car rentals from Masvingo, available across Zimbabwe.'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WonderTravel_zw'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZW" className={`${ubuntu.variable} ${ubuntuMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <OrgJsonLd />
      </body>
    </html>
  );
}
