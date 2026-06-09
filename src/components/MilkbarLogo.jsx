import { useEffect, useRef, useState } from 'react';
import { motion, useAnimate, useInView } from 'framer-motion';

// Phase timing (seconds)
const T_DRAW  = 1.2;
const T_FILL  = 2.8;
const STAGGER = 0.15;

const CAP_D  = 'M88,42 L88,36 Q88,32 92,32 L108,32 Q112,32 112,36 L112,42 Z';
const NECK_D = 'M88,42 L88,58 L112,58 L112,42';
const BODY_D = 'M88,58 Q78,68 76,90 L76,158 Q76,166 84,166 L116,166 Q124,166 124,158 L124,90 Q122,68 112,58';
const PATHS  = [CAP_D, NECK_D, BODY_D];

// Wave spans full SVG width so the clipPath handles ALL edge clipping —
// no sub-pixel mismatch at the bottle walls.
function wavePath(y, phase) {
  const A = 4;
  return [
    `M0,${y}`,
    `C50,${y - A * Math.sin(phase)} 100,${y + A * Math.sin(phase + 1.5)} 150,${y}`,
    `C175,${y - A * Math.sin(phase + 2)} 190,${y + A * Math.sin(phase + 3)} 200,${y}`,
    `L200,200 L0,200 Z`,
  ].join(' ');
}

export default function MilkbarLogo({ size = 220, className = '', onAnimationComplete }) {
  const [scope, animate] = useAnimate();
  const [fillY, setFillY]         = useState(170);
  const [wavePhase, setWavePhase] = useState(0);
  const rafRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px -80px 0px' });

  const reduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setFillY(100);
      onAnimationComplete?.();
      return;
    }

    let cancelled = false;

    async function run() {
      // Phase 1: draw bottle outline
      await animate('[data-bp]', { pathLength: [0, 1] }, {
        duration: T_DRAW,
        delay: (i) => i * STAGGER,
        ease: 'easeOut',
      });
      if (cancelled) return;

      // Phase 2: milk rises from y=162 → y=100
      const fillDuration = (T_FILL - T_DRAW) * 1000;
      const fillFrom = 162, fillTo = 100;
      const fillStart = performance.now();

      await new Promise(resolve => {
        function tick(now) {
          if (cancelled) return resolve();
          const t = Math.min((now - fillStart) / fillDuration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setFillY(fillFrom + (fillTo - fillFrom) * ease);
          if (t < 1) rafRef.current = requestAnimationFrame(tick);
          else resolve();
        }
        rafRef.current = requestAnimationFrame(tick);
      });
      if (cancelled) return;

      onAnimationComplete?.();
    }

    run();

    // Continuous wave ripple (runs throughout)
    let waveRaf;
    function tickWave() {
      if (cancelled) return;
      setWavePhase(p => p + 0.05);
      waveRaf = requestAnimationFrame(tickWave);
    }
    waveRaf = requestAnimationFrame(tickWave);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(waveRaf);
    };
  }, [isInView]);

  const CLIP_ID = 'mblogo-fill-clip';

  return (
    <svg
      ref={(el) => { scope.current = el; containerRef.current = el; }}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      aria-label="Milkbar logo"
    >
      <defs>
        <clipPath id={CLIP_ID}>
          <path d={BODY_D} />
        </clipPath>
      </defs>

      {/* Background circle */}
      <circle cx="100" cy="100" r="100" fill="#0A0A0A" />

      {/* Bottle group */}
      <g>
        {/* Milk fill clipped to bottle body */}
        <g clipPath={`url(#${CLIP_ID})`}>
          <path d={wavePath(fillY, wavePhase)} fill="rgba(255,255,255,0.9)" />
        </g>

        {/* Bottle outline drawn on top */}
        {PATHS.map((d, idx) => (
          <motion.path
            key={idx}
            data-bp=""
            d={d}
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
          />
        ))}
      </g>
    </svg>
  );
}
