import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const VIDEOS = ['/videos/milkbar.mp4', '/videos/milkbar-2.mp4'];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const refs = [ref0, ref1];

  const handleEnded = useCallback((endedIndex) => {
    const next = (endedIndex + 1) % 2;
    // Reset the video that just ended so it's ready for its next turn
    if (refs[endedIndex].current) {
      refs[endedIndex].current.currentTime = 0;
    }
    setActiveIndex(next);
    refs[next].current?.play();
  }, []);

  return (
    <section
      id="breakfast"
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

      {/* Black overlay + gradient for text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.35)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.3) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
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
        }}
      >
        {/* Letter-by-letter reveal — each char has its own overflow:hidden clip */}
        <div style={{ display: 'flex' }}>
          {'milkbar'.split('').map((char, i) => (
            <span key={i} style={{ display: 'inline-block' }}>
              <motion.span
                initial={{ opacity: 0, y: 18, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 1.2,
                  delay: 0.15 + i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontWeight: 400,
                  fontSize: 'clamp(90px, 14vw, 200px)',
                  color: '#fff',
                  letterSpacing: 0,
                  lineHeight: 1,
                  display: 'inline-block',
                  textShadow: '0 4px 60px rgba(0,0,0,0.25)',
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(9px, 2.2vw, 13px)',
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: 20,
          }}
        >
          Est. in Limassol &nbsp;·&nbsp; Café &nbsp;·&nbsp; Kitchen &nbsp;·&nbsp; Bar
        </motion.p>
      </div>
    </section>
  );
}
