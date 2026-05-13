import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TestimonialCard({ name, company, quote, className }) {
  return (
    <div className={cn('card-dark p-6', className)}>
      <Quote size={28} className="text-brand-red/40 mb-4" />
      <p className="text-brand-subtext text-sm leading-relaxed mb-5 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-muted flex items-center justify-center text-brand-gold font-bold text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-brand-text font-semibold text-sm">{name}</p>
          <p className="text-brand-subtext text-xs">{company}</p>
        </div>
      </div>
    </div>
  );
}
