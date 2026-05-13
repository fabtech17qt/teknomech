import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import ContactForm from '@/components/shared/ContactForm';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const metadata = {
  title: 'Contact Us | Teknomech',
  description: "Get in touch with Teknomech MEP — Qatar's trusted MEP and fire protection contractor.",
};

export default function ContactPage() {
  const t    = useTranslations('contact');
  const tNav = useTranslations('nav');

  const INFO = [
    { icon: Phone,  label: 'Phone',   value: tNav('phone'),                                           href: `tel:${tNav('phone')}` },
    { icon: Mail,   label: 'Email',   value: tNav('email'),                                           href: `mailto:${tNav('email')}` },
    { icon: MapPin, label: 'Address', value: 'Building 15, Street 850, Industrial Area, Doha, Qatar', href: null },
    { icon: Clock,  label: 'Hours',   value: 'Sat–Thu: 7AM–6PM | Emergency: 24/7',                    href: null },
  ];

  return (
    <>
      <PageHero
        title={t('heading')}
        subtitle="Reach out to our engineering team — we respond to all enquiries within 24 hours."
        breadcrumbs={[{ label: t('pageTitle') }]}
      />

      <section className="section-padding bg-brand-light">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact info */}
            <AnimateIn variant="fadeLeft" className="space-y-6">
              <div>
                <SectionLabel className="mb-3">Contact Info</SectionLabel>
                <h2 className="heading-md mb-2">Let's Talk</h2>
                <p className="text-brand-sub text-sm leading-relaxed">
                  Our team is available Saturday to Thursday, 7AM to 6PM. Emergency support is available 24/7.
                </p>
              </div>

              {INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4 bg-white rounded-2xl border border-brand-border p-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-light flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-brand-sub text-xs mb-0.5 font-medium">{label}</p>
                    {href ? (
                      <a href={href} className="text-brand-text text-sm font-semibold hover:text-brand-blue transition-colors">{value}</a>
                    ) : (
                      <p className="text-brand-text text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="space-y-3">
                <a href="https://wa.me/97444445555" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 px-5 py-3.5 rounded-full text-sm font-semibold transition-colors w-full">
                  <FaWhatsapp size={16} /> Chat on WhatsApp
                </a>
                <div className="flex items-center justify-center gap-4 pt-2">
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-sub hover:text-brand-blue hover:border-brand-blue transition-colors">
                    <FaLinkedin size={16} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-sub hover:text-brand-blue hover:border-brand-blue transition-colors">
                    <FaInstagram size={16} />
                  </a>
                </div>
              </div>
            </AnimateIn>

            {/* Form */}
            <AnimateIn variant="fadeRight" className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-brand-border shadow-md p-8">
                <SectionLabel className="mb-2">Send a Message</SectionLabel>
                <h3 className="heading-md mb-6">We'll Get Back to You in 24 Hours</h3>
                <ContactForm />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="h-72 bg-brand-blue-light border-t border-brand-border flex items-center justify-center">
        <div className="text-center">
          <MapPin size={32} className="text-brand-blue mx-auto mb-3" />
          <p className="text-brand-text font-semibold">Building 15, Street 850, Industrial Area</p>
          <p className="text-brand-sub text-sm">Doha, Qatar</p>
        </div>
      </div>
    </>
  );
}
