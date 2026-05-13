'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Invalid email address'),
  phone:   z.string().min(8, 'Valid phone number required'),
  company: z.string().min(1, 'Company name required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const SERVICES = [
  'Fire Protection', 'HVAC Systems', 'Electrical Systems',
  'Plumbing & Drainage', 'LV Systems', 'AMC & Maintenance', 'General Enquiry',
];

const inputCls = 'w-full bg-white text-brand-text placeholder-brand-sub/50 px-4 py-3 rounded-xl border border-brand-border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 focus:outline-none text-sm transition-all';
const labelCls = 'text-brand-text text-xs font-semibold mb-1.5 block';
const errorCls = 'text-red-500 text-xs mt-1';

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
      <div className="text-center py-14">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-brand-text font-bold text-xl mb-2">Message Sent!</h3>
        <p className="text-brand-sub">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { name: 'name',    label: t('name'),    type: 'text'  },
          { name: 'email',   label: t('email'),   type: 'email' },
          { name: 'phone',   label: t('phone'),   type: 'tel'   },
          { name: 'company', label: t('company'), type: 'text'  },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className={labelCls}>{label}</label>
            <input type={type} {...register(name)} placeholder={label} className={cn(inputCls, errors[name] && 'border-red-400 focus:border-red-400')} />
            {errors[name] && <p className={errorCls}>{errors[name].message}</p>}
          </div>
        ))}
      </div>

      <div>
        <label className={labelCls}>{t('service')}</label>
        <select {...register('service')} className={cn(inputCls, errors.service && 'border-red-400')}>
          <option value="">Select a service...</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p className={errorCls}>{errors.service.message}</p>}
      </div>

      <div>
        <label className={labelCls}>{t('message')}</label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us about your project..."
          className={cn(inputCls, 'resize-none', errors.message && 'border-red-400')}
        />
        {errors.message && <p className={errorCls}>{errors.message.message}</p>}
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-blue text-white rounded-full py-3.5 font-semibold hover:bg-brand-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {isSubmitting ? 'Sending...' : t('submit')}
      </button>
    </form>
  );
}
