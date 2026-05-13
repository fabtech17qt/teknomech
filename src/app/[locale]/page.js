import HeroSection from '@/components/home/HeroSection';
import TrustBarSection from '@/components/home/TrustBarSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import StatsSection from '@/components/home/StatsSection';
import ProductsSection from '@/components/home/ProductsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import CTASection from '@/components/home/CTASection';
import BlogSection from '@/components/home/BlogSection';
import ContactBannerSection from '@/components/home/ContactBannerSection';

export const metadata = {
  title: 'Teknomech MEP | Qatar MEP & Fire Protection Contractor',
  description:
    "Qatar's leading MEP and Fire Protection contractor — HVAC, electrical, plumbing, fire suppression and LV systems for commercial, industrial and government projects.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBarSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <ProductsSection />
      <ProjectsSection />
      <WhyUsSection />
      <CTASection />
      <BlogSection />
      <ContactBannerSection />
    </>
  );
}
