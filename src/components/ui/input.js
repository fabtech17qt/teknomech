import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-white/10 bg-brand-muted px-3 py-2 text-sm text-brand-text',
        'placeholder:text-brand-subtext/50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:border-brand-red/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
