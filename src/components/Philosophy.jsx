import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';

import IMG_BOWL from '../assets/intro-section1.png';
import IMG_JUICE from '../assets/intro-section2.png';
import IMG_SALAD from '../assets/intro-section3.png';

const qualities = [
  'Freshly Baked Every Morning',
  'Specialty Coffee, Properly Made',
  'Seasonal & Locally Sourced',
  'Nothing Artificial — Ever',
  'Made From Scratch, Daily',
];

function RevealImage({ src, alt, delay = 0, parallaxY, objectPosition = 'center', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 16, ...style }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition, display: 'block', y: parallaxY, scale: 1.1 }}
      />
    </motion.div>
  );
}

export default function Philosophy() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const headingY   = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const listY      = useTransform(scrollYProgress, [0, 1], [15, -15]);
  // Subtle, slightly varied drift on each image.
  const imgCenterY        = useTransform(scrollYProgress, [0, 1], [-12, 15]);
  const imgTopY           = useTransform(scrollYProgress, [0, 1], [14, -12]);   // inverted drift
  const imgBottomY        = useTransform(scrollYProgress, [0, 1], [-18, 15]);
  const imgTopYMobile     = useTransform(scrollYProgress, [0, 1], [11, -11]);   // inverted drift
  const imgBottomYMobile  = useTransform(scrollYProgress, [0, 1], [-14, 12]);

  const heading = (
    <>
      Real food, grown<br />
      <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 500, color: 'var(--color-accent)' }}>
        with intention
      </em>
    </>
  );

  const qualitiesList = qualities.map((q, i) => (
    <motion.p
      key={q}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        color: i === 0 ? 'var(--color-ink)' : 'var(--color-ink-soft)',
        letterSpacing: '0.02em',
        fontWeight: i === 0 ? 600 : 400,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span style={{
        width: 22, height: 1.5,
        background: i === 0 ? 'var(--color-accent)' : 'var(--color-ink-faint)',
        display: 'inline-block', flexShrink: 0,
      }} />
      {q}
    </motion.p>
  ));

  return (
    <section ref={sectionRef} style={{
      background: 'var(--color-bg)',
      padding: isMobile ? '70px 30px 80px' : '120px 60px',
      maxWidth: 1400,
      margin: '0 auto',
    }}>

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 320, borderRadius: 20, overflow: 'hidden', position: 'relative', zIndex: 1, marginBottom: -48 }}
          >
            <motion.img src={IMG_BOWL} alt="Smoothie bowl"
              style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center 90%', display: 'block', y: imgCenterY, scale: 1.1 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              background: 'var(--color-cream)',
              border: '1px solid rgba(30,58,47,0.08)',
              borderRadius: 20,
              padding: '56px 28px 36px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(30px, 8vw, 42px)',
              color: 'var(--color-ink)',
              lineHeight: 1.1,
              marginBottom: 28,
            }}>
              {heading}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {qualitiesList}
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ height: 180, borderRadius: 16, overflow: 'hidden', background: 'var(--color-bg-warm)' }}
            >
              <motion.img src={IMG_JUICE} alt="Fresh juice"
                style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center 90%', display: 'block', y: imgTopYMobile, scale: 1.1 }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ height: 180, borderRadius: 16, overflow: 'hidden', background: 'var(--color-bg-warm)' }}
            >
              <motion.img src={IMG_SALAD} alt="Salad"
                style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center 90%', display: 'block', y: imgBottomYMobile, scale: 1.1 }} />
            </motion.div>
          </div>
        </div>

      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 16,
          height: 560,
          minHeight: 0,
        }}>
          <motion.div style={{
            gridColumn: 1, gridRow: 1,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            paddingBottom: 8, paddingRight: 24,
            y: headingY,
          }}>
            <motion.h2
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(34px, 3.4vw, 54px)',
                color: 'var(--color-ink)',
                lineHeight: 1.05,
              }}
            >
              {heading}
            </motion.h2>
          </motion.div>

          <motion.div style={{
            gridColumn: 1, gridRow: 2,
            paddingTop: 8, paddingRight: 24,
            display: 'flex', flexDirection: 'column', gap: 12,
            y: listY,
          }}>
            {qualitiesList}
          </motion.div>

          <div style={{ gridColumn: 2, gridRow: '1 / 3', background: 'var(--color-bg-warm)', borderRadius: 16 }}>
            <RevealImage src={IMG_BOWL} alt="Smoothie bowl" delay={0.05} parallaxY={imgCenterY} objectPosition="center 90%" />
          </div>

          <div style={{ gridColumn: 3, gridRow: 1, background: 'var(--color-bg-warm)', borderRadius: 16 }}>
            <RevealImage src={IMG_JUICE} alt="Fresh juice" delay={0.15} parallaxY={imgTopY} objectPosition="center 90%" />
          </div>

          <div style={{ gridColumn: 3, gridRow: 2, background: 'var(--color-bg-warm)', borderRadius: 16 }}>
            <RevealImage src={IMG_SALAD} alt="Salad" delay={0.25} parallaxY={imgBottomY} objectPosition="center 90%" />
          </div>
        </div>
      )}
    </section>
  );
}
