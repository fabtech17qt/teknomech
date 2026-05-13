'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export default function WhatsAppFAB({ className }) {
  return (
    <a
      href="https://wa.me/97444445555"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        'fixed bottom-6 end-6 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-400',
        'flex items-center justify-center shadow-lg shadow-green-500/20',
        'transition-all duration-300 hover:scale-110',
        className
      )}
    >
      <FaWhatsapp size={26} className="text-white" />
    </a>
  );
}
