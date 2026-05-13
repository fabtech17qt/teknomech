'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function QuickContactForm() {
  const [form, setForm]         = useState({ name: '', phone: '', message: '' });
  const [submitting, setSubmit] = useState(false);
  const [done, setDone]         = useState(false);

  const update = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: 'Quick Contact' }),
      });
      setDone(true);
    } catch {
      setSubmit(false);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
          <Send size={20} className="text-green-400" />
        </div>
        <p className="text-white font-semibold">Message received!</p>
        <p className="text-white/60 text-sm">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 text-sm transition-colors min-h-[44px]';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Your Name"
        required
        value={form.name}
        onChange={update('name')}
        className={inputCls}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        required
        value={form.phone}
        onChange={update('phone')}
        className={inputCls}
      />
      <textarea
        placeholder="Brief Message"
        required
        rows={3}
        value={form.message}
        onChange={update('message')}
        className={`${inputCls} resize-none min-h-[80px]`}
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brand-blue text-white rounded-xl py-3 font-semibold hover:bg-brand-blue-dark transition-colors text-sm disabled:opacity-60 min-h-[44px] flex items-center justify-center gap-2"
      >
        <Send size={15} />
        {submitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
