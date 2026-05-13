'use client';

import { useEffect, useRef, useState } from 'react';

function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, ref };
}

export default function StatCounter({ value, suffix = '', label, className }) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className={className}>
      <div className="text-5xl font-black text-white mb-1 tabular-nums">
        {count.toLocaleString()}
        <span className="text-brand-gold">{suffix}</span>
      </div>
      <div className="text-sm text-white/70 uppercase tracking-wider">{label}</div>
    </div>
  );
}
