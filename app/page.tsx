import { Hero } from '@/components/marketing/Hero';
import { CategoryTiles } from '@/components/marketing/CategoryTiles';
import { FeaturedVehicles } from '@/components/marketing/FeaturedVehicles';
import { WhyUs } from '@/components/marketing/WhyUs';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Coverage } from '@/components/marketing/Coverage';
import { VisitMasvingoBanner } from '@/components/marketing/VisitMasvingoBanner';
import { Testimonials } from '@/components/marketing/Testimonials';
import { CTABand } from '@/components/marketing/CTABand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <FeaturedVehicles />
      <WhyUs />
      <HowItWorks />
      <Coverage />
      <VisitMasvingoBanner />
      <Testimonials />
      <CTABand />
    </>
  );
}
