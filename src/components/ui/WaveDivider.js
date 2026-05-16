/**
 * Wave / curve section dividers for smooth transitions between sections.
 * Place inside a `relative` positioned section.
 *
 * `fill` = the background color of the NEXT section (what you're transitioning into).
 */

export function WaveBottom({ fill = '#ffffff', height = 70, className = '' }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none ${className}`} style={{ height }}>
      <svg
        viewBox="0 0 1440 70"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full block"
        style={{ height }}
      >
        <path d="M0,35 C180,70 360,0 540,35 C720,70 900,0 1080,35 C1260,70 1380,20 1440,35 L1440,70 L0,70 Z" fill={fill} />
      </svg>
    </div>
  );
}

export function WaveTop({ fill = '#ffffff', height = 70, className = '' }) {
  return (
    <div className={`absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none ${className}`} style={{ height }}>
      <svg
        viewBox="0 0 1440 70"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute top-0 w-full block"
        style={{ height }}
      >
        <path d="M0,35 C180,0 360,70 540,35 C720,0 900,70 1080,35 C1260,0 1380,50 1440,35 L1440,0 L0,0 Z" fill={fill} />
      </svg>
    </div>
  );
}

export function CurveBottom({ fill = '#ffffff', height = 80, className = '' }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none ${className}`} style={{ height }}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full block"
        style={{ height }}
      >
        <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill={fill} />
      </svg>
    </div>
  );
}

export function CurveTop({ fill = '#0A2342', height = 80, className = '' }) {
  return (
    <div className={`absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none ${className}`} style={{ height }}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute top-0 w-full block"
        style={{ height }}
      >
        <path d="M0,80 Q720,0 1440,80 L1440,0 L0,0 Z" fill={fill} />
      </svg>
    </div>
  );
}
