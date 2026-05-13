import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import ContactForm from '@/components/shared/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Teknomech MEP — Qatar\'s trusted MEP and fire protection contractor.',
};

export default function ContactPage() {
  const t = useTranslations('contact');
  const tNav = useTranslations('nav');

  return (
    <>
      <PageHero
        title={t('heading')}
        subtitle="Reach out to our engineering team — we respond to all enquiries within 24 hours."
        breadcrumbs={[{ label: t('pageTitle') }]}
      />

      <section className="section-padding bg-brand-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <SectionLabel variant="red" className="mb-3">Contact Info</SectionLabel>
                <h2 className="heading-md text-brand-text mb-2">Let's Talk</h2>
                <p className="text-brand-subtext text-sm leading-relaxed">
                  Our team is available Saturday to Thursday, 7AM to 6PM. Emergency support is available 24/7.
                </p>
              </div>
              {[
                { icon: Phone, label: 'Phone', value: tNav('phone'), href: `tel:${tNav('phone')}` },
                { icon: Mail, label: 'Email', value: tNav('email'), href: `mailto:${tNav('email')}` },
                { icon: MapPin, label: 'Address', value: 'Building 15, Street 850, Industrial Area, Doha, Qatar', href: null },
                { icon: Clock, label: 'Hours', value: 'Sat–Thu: 7AM–6PM | Emergency: 24/7', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-red" />
                  </div>
                  <div>
                    <p className="text-brand-subtext text-xs mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-brand-text text-sm hover:text-brand-gold transition-colors">{value}</a>
                    ) : (
                      <p className="text-brand-text text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
              <a
                href="https://wa.me/97444445555"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-900/20 border border-green-800/30 text-green-400 hover:bg-green-800/30 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full justify-center"
              >
                <FaWhatsapp size={18} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 card-dark p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
