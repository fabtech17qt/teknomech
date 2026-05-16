import { Link } from '@/i18n/navigation';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Phone, Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimateIn variant="fadeUp">
          <div
            className="relative bg-brand-orange overflow-hidden py-20 px-10 md:px-20"
            style={{ borderRadius: '120px 8px 8px 120px / 120px 8px 120px 8px' }}
          >
            {/* White blurred glow top-right */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
            {/* Dark glow bottom-left */}
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-orange-dark/40 rounded-full blur-3xl pointer-events-none" />
            {/* Stripe pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.15) 12px, rgba(255,255,255,0.15) 13px)',
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              {/* Heading */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2">
                  Have a project in Qatar?
                </h2>
                <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white/80 leading-tight">
                  Let's engineer it together.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a
                  href="tel:+97444445555"
                  className="inline-flex items-center gap-2 bg-white text-brand-orange-dark font-bold rounded-full px-7 py-4 hover:bg-brand-blue-deep hover:text-white transition-all duration-300 text-sm"
                >
                  <Phone size={15} />
                  Call Now +974 4444 5555
                </a>
                <a
                  href="mailto:info@teknomech.qa"
                  className="inline-flex items-center gap-2 border-2 border-white text-white font-bold rounded-full px-7 py-4 hover:bg-white hover:text-brand-orange-dark transition-all duration-300 text-sm"
                >
                  <Mail size={15} />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
