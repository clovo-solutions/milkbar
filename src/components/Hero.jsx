import { useRef, useState, useCallback, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

const VIDEOS = ['/videos/cookhouse-1.mp4', '/videos/cookhouse-2.mp4'];
const WORD = 'THE COOKHOUSE';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const refs = [ref0, ref1];

  // Measure the rendered headline so the line + ΚΥΠΡΟΣ row matches its width exactly.
  const headlineRef = useRef(null);
  const [lineW, setLineW] = useState(0);

  useLayoutEffect(() => {
    const measure = () => { if (headlineRef.current) setLineW(headlineRef.current.offsetWidth); };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready?.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handleEnded = useCallback((endedIndex) => {
    const next = (endedIndex + 1) % 2;
    if (refs[endedIndex].current) {
      refs[endedIndex].current.currentTime = 0;
    }
    setActiveIndex(next);
    refs[next].current?.play();
  }, []);

  return (
    <section
      id="top"
      style={{
        height: '100vh',
        minHeight: 600,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Video backgrounds — both in DOM, only the active one is visible */}
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={refs[i]}
          src={src}
          muted
          playsInline
          autoPlay={i === 0}
          preload="auto"
          onEnded={() => handleEnded(i)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: activeIndex === i ? 1 : 0,
            transition: 'opacity 0.8s ease',
            zIndex: 0,
          }}
        />
      ))}

      {/* Overlays for legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.35)',
        zIndex: 1, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.35) 100%)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* Brand name */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none',
          userSelect: 'none',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Letter-by-letter reveal */}
        <div ref={headlineRef} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {WORD.split('').map((char, i) => (
            <span key={i} style={{ display: 'inline-block', width: char === ' ' ? 'clamp(18px, 3.5vw, 48px)' : 'auto' }}>
              <motion.span
                initial={{ opacity: 0, y: 18, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 1.2,
                  delay: 0.15 + i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: 'clamp(46px, 10vw, 140px)',
                  color: '#fff',
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                  display: 'inline-block',
                  textShadow: '0 4px 60px rgba(0,0,0,0.35)',
                }}
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            </span>
          ))}
        </div>

        {/* Animated line + ΚΥΠΡΟΣ, matched to the headline width */}
        {lineW > 0 && (
          <div style={{ width: lineW, display: 'flex', alignItems: 'center', gap: 16, marginTop: 'clamp(14px, 2vw, 26px)' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.5)', transformOrigin: 'left center' }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 'clamp(11px, 2.4vw, 17px)',
                letterSpacing: '0.24em',
                color: 'rgba(255,255,255,0.92)',
                whiteSpace: 'nowrap',
                lineHeight: 1,
              }}
            >
              ΚΥΠΡΟΣ
            </motion.span>
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 'clamp(9px, 2.2vw, 13px)',
            color: 'rgba(255,255,255,0.88)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: 22,
          }}
        >
          Breakfast &nbsp;·&nbsp; Brunch &nbsp;·&nbsp; Lunch &nbsp;·&nbsp; Specialty Coffee
        </motion.p>
      </div>
    </section>
  );
}
