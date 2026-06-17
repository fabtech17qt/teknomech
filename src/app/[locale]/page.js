import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProcessSection from '@/components/home/ProcessSection';
import StatsSection from '@/components/home/StatsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import CTASection from '@/components/home/CTASection';
import ProductsSection from '@/components/home/ProductsSection';
import BlogSection from '@/components/home/BlogSection';
import ContactBannerSection from '@/components/home/ContactBannerSection';

export const metadata = {
  title: 'Teknomech MEP | Qatar MEP & Fire Protection Contractor',
  description:
    "Qatar's certified MEP & Fire Protection contractor for HVAC, electrical, plumbing, fire suppression and LV systems across Doha and Qatar.",
};

export default function HomePage() {
  return (
    <>
      {/* 1+2 — Hero + Quick Action cards */}
      <HeroSection />
      {/* 3 — About */}
      <AboutSection />
      {/* 4 — Services grid */}
      <ServicesSection />
      {/* 5 — 3-step process */}
      <ProcessSection />
      {/* 6 — Stats counter strip */}
      <StatsSection />
      {/* 7 — Projects magazine grid */}
      <ProjectsSection />
      {/* 8 — Why choose us */}
      <WhyUsSection />
      {/* 9 — CTA curved orange band */}
      <CTASection />
      {/* 10 — Logo marquee */}
      <ProductsSection />
      {/* 11 — Blog cards */}
      <BlogSection />
      {/* 12 — Contact dual split */}
      <ContactBannerSection />
    </>
  );
}
