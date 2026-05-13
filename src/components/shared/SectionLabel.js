import { cn } from '@/lib/utils';

export default function SectionLabel({ children, variant = 'red', className }) {
  return (
    <div className={cn('section-label', className)}>
      <span
        className={cn(
          'w-6 h-0.5 inline-block rounded-full',
          variant === 'red' ? 'bg-brand-red' : 'bg-brand-gold'
        )}
      />
      <span className={variant === 'red' ? 'text-brand-red' : 'text-brand-gold'}>
        {children}
      </span>
    </div>
  );
}
