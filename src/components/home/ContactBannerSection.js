'use client';

import { useState } from 'react';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { WaveTop } from '@/components/ui/WaveDivider';

const SERVICES_LIST = [
  'Fire Protection Systems',
  'HVAC Systems',
  'Electrical Installation',
  'Plumbing Systems',
  'LV & Security Systems',
  'AMC & Maintenance',
];

export default function ContactBannerSection() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, email: 'quick-form@teknomech.com', company: '' }),
      });
    } catch {}
    setLoading(false);
    setSent(true);
  }

  const inputCls =
    'w-full bg-white/95 text-brand-text rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/60 placeholder:text-brand-sub/60 border-0';

  return (
    <section className="relative bg-brand-light overflow-hidden">
      <WaveTop fill="#ffffff" height={60} />

      <div className="container-max pb-16 pt-4">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* ── LEFT : navy card ── */}
          <AnimateIn variant="fadeRight" className="flex-1 lg:w-3/5">
            <div
              className="relative h-full bg-brand-blue-deep overflow-hidden rounded-3xl"
              style={{ minHeight: 460 }}
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="absolute top-0 left-0 w-64 h-64 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

              <div className="px-10 md:px-14 py-16 relative z-10 h-full flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                  Get in Touch With<br />
                  <span className="text-brand-orange">Our Engineering Team</span>
                </h2>
                <p className="text-white/70 mb-10 leading-relaxed text-sm max-w-md">
                  Our team is available round the clock to discuss your project requirements, provide technical guidance and deliver rapid proposals.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    { icon: MapPin, label: 'Barwa Commercial Avenue, Doha, Qatar' },
                    { icon: Phone,  label: '+974 3044 3229' },
                    { icon: Mail,   label: 'info@teknomech.com' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-white" />
                      </div>
                      <span className="text-white/80 text-sm">{label}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/97430443229"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold rounded-full px-7 py-3.5 hover:bg-brand-orange-dark transition-colors duration-300 text-sm w-fit"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </AnimateIn>

          {/* ── RIGHT : gold card, curved ── */}
          <AnimateIn variant="fadeLeft" className="lg:w-2/5">
            <div
              className="relative h-full bg-brand-orange overflow-hidden"
              style={{
                borderRadius: '32px 100px 32px 100px',
                minHeight: 460,
              }}
            >
              {/* Stripe pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.2) 12px, rgba(255,255,255,0.2) 13px)',
                }}
              />
              {/* Glow accents */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-orange-dark/30 rounded-full blur-2xl pointer-events-none" />

              <div className="px-10 py-14 relative z-10 h-full flex flex-col justify-center">
                <h3 className="text-2xl font-black text-white mb-7">Quick Enquiry</h3>

                {sent ? (
                  <div className="bg-white/20 rounded-2xl p-8 text-center">
                    <p className="text-white font-black text-2xl mb-2">Message Sent!</p>
                    <p className="text-white/80 text-sm">Our team will contact you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      className={inputCls}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className={inputCls}
                    />
                    <select
                      value={form.service}
                      onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                      className={inputCls}
                    >
                      <option value="">Select Service</option>
                      {SERVICES_LIST.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Your Message"
                      rows={3}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                      className={`${inputCls} resize-none`}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-white text-brand-orange-dark font-bold rounded-full py-4 hover:bg-brand-blue-deep hover:text-white transition-all duration-300 disabled:opacity-60"
                    >
                      {loading ? 'Sending…' : <>Send Enquiry <ArrowRight size={16} /></>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
}
