import { cn } from '@/lib/utils';

export default function SectionLabel({ children, className }) {
  return (
    <div className={cn('section-label', className)}>
      <span className="w-6 h-0.5 bg-brand-blue inline-block rounded-full shrink-0" />
      <span>{children}</span>
    </div>
  );
}
