import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import ContactForm from '@/components/shared/ContactForm';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

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

      <section className="py-24 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact info */}
            <AnimateIn variant="fadeLeft" className="space-y-5">
              <div>
                <SectionLabel className="mb-3">Contact Info</SectionLabel>
                <h2 className="text-3xl font-black text-brand-text mb-2 leading-tight">
                  Let's <span className="text-brand-orange">Talk</span>
                </h2>
                <p className="text-brand-sub text-sm leading-relaxed">
                  Our team is available Saturday to Thursday, 7AM to 6PM. Emergency support is available 24/7.
                </p>
              </div>

              {INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4 bg-brand-blue-soft rounded-2xl border border-brand-blue/10 p-4 hover:border-brand-orange transition-all duration-300 group">
                  <div className="w-11 h-11 rounded-xl bg-brand-orange-soft flex items-center justify-center shrink-0 group-hover:bg-brand-orange transition-colors duration-300">
                    <Icon size={18} className="text-brand-orange group-hover:text-white transition-colors duration-300" />
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

              <a
                href="https://wa.me/97444445555"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark px-5 py-4 rounded-full text-sm font-bold transition-colors w-full shadow-lg shadow-brand-orange/25"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </AnimateIn>

            {/* Form */}
            <AnimateIn variant="fadeRight" className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-brand-border shadow-lg p-8">
                <div className="w-10 h-1 bg-brand-orange rounded-full mb-4" />
                <h3 className="text-2xl font-black text-brand-text mb-2">Send a Message</h3>
                <p className="text-brand-sub text-sm mb-6">We'll get back to you within 24 hours.</p>
                <ContactForm />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="h-64 bg-brand-blue-soft border-t border-brand-border flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-orange-soft flex items-center justify-center mx-auto mb-3">
            <MapPin size={26} className="text-brand-orange" />
          </div>
          <p className="text-brand-text font-bold">Building 15, Street 850, Industrial Area</p>
          <p className="text-brand-sub text-sm">Doha, Qatar</p>
        </div>
      </div>
    </>
  );
}
