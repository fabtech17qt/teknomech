'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function ModelViewer({ src, alt, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const mv = document.createElement('model-viewer');
    mv.setAttribute('src', src);
    mv.setAttribute('alt', alt);
    mv.setAttribute('auto-rotate', '');
    mv.setAttribute('camera-controls', '');
    mv.setAttribute('shadow-intensity', '1');
    mv.setAttribute('environment-image', 'neutral');
    mv.style.width = '100%';
    mv.style.height = '100%';
    mv.style.background = 'transparent';
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(mv);
  }, [src, alt]);

  return (
    <>
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
        strategy="lazyOnload"
      />
      <div ref={containerRef} className={className} />
    </>
  );
}
