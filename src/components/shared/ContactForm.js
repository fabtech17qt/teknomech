'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Valid phone number required'),
  company: z.string().min(1, 'Company name required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const SERVICES = [
  'Fire Protection', 'HVAC Systems', 'Electrical Systems',
  'Plumbing & Drainage', 'LV Systems', 'AMC & Maintenance', 'General Enquiry',
];

export default function ContactForm() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      reset();
    } catch {
      setError(t('error'));
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
          <span className="text-green-400 text-2xl">✓</span>
        </div>
        <h3 className="text-brand-text font-semibold text-xl mb-2">Message Sent!</h3>
        <p className="text-brand-subtext">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { name: 'name', label: t('name'), type: 'text' },
          { name: 'email', label: t('email'), type: 'email' },
          { name: 'phone', label: t('phone'), type: 'tel' },
          { name: 'company', label: t('company'), type: 'text' },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="text-brand-subtext text-xs mb-1.5 block">{label}</label>
            <input
              type={type}
              {...register(name)}
              className="w-full bg-brand-muted text-brand-text placeholder-brand-subtext/50 px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm transition-colors"
            />
            {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name].message}</p>}
          </div>
        ))}
      </div>

      <div>
        <label className="text-brand-subtext text-xs mb-1.5 block">{t('service')}</label>
        <select
          {...register('service')}
          className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm transition-colors"
        >
          <option value="">Select a service...</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
      </div>

      <div>
        <label className="text-brand-subtext text-xs mb-1.5 block">{t('message')}</label>
        <textarea
          {...register('message')}
          rows={5}
          className="w-full bg-brand-muted text-brand-text placeholder-brand-subtext/50 px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm transition-colors resize-none"
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : t('submit')}
      </button>
    </form>
  );
}
