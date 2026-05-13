'use client';

import { useEffect, useRef, useState } from 'react';

function useCountUp(end, duration = 2000) {
  const [count, setCount]   = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, ref };
}

export default function StatCounter({ value, suffix = '', label, className, dark = true }) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className={className}>
      <div className={`text-5xl font-black mb-1 tabular-nums ${dark ? 'text-white' : 'text-brand-blue'}`}>
        {count.toLocaleString()}
        <span className={dark ? 'text-white/70' : 'text-brand-blue/70'}>{suffix}</span>
      </div>
      <div className={`text-sm uppercase tracking-wider ${dark ? 'text-white/60' : 'text-brand-sub'}`}>
        {label}
      </div>
    </div>
  );
}
