import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';

const slideVariants = {
  topLeft:    { initial: { x: -80, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  topRight:   { initial: { x:  80, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  bottomLeft: { initial: { x: -80, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  bottomRight:{ initial: { x:  80, opacity: 0 }, animate: { x: 0, opacity: 1 } },
};

function BentoCell({ variant, children, style }) {
  const v = slideVariants[variant];
  return (
    <motion.div
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const cellBase = { borderRadius: 20, overflow: 'hidden' };

export default function About() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const img1Y    = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const img2Y    = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const headingY = useTransform(scrollYProgress, [0, 1], [55, -55]);

  return (
    <section ref={sectionRef} id="about" style={{ background: 'var(--color-sky-light)', padding: isMobile ? '60px 30px' : '100px 60px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Parallax wrapper keeps y separate from the opacity whileInView */}
      <motion.div style={{ y: headingY }}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(34px, 4vw, 52px)',
            color: 'var(--color-heading)',
            lineHeight: 1.1,
            marginBottom: 48,
          }}
        >
          Who we are
        </motion.h2>
      </motion.div>

      <div className="bento-grid" style={{ alignItems: 'start' }}>
        {/* Top-left: photo */}
        <BentoCell variant="topLeft" style={{ ...cellBase, height: 420 }}>
          <motion.img
            src="/milkbar-story-interior.png"
            alt="Café interior"
            style={{ width: '100%', height: '120%', objectFit: 'cover', display: 'block', y: img1Y }}
          />
        </BentoCell>

        {/* Top-right: Our Story */}
        <BentoCell variant="topRight" style={{
          ...cellBase,
          background: 'var(--color-sky-medium)',
          padding: isMobile ? 30 : 40,
          minHeight: 420,
        }}>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(28px, 3vw, 40px)',
            color: 'var(--color-heading)',
            lineHeight: 1.2,
            marginBottom: 24,
          }}>
            Our Story
          </h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: 'var(--color-body)',
            lineHeight: 1.75,
            marginBottom: 16,
          }}>
            Milkbar started with a simple idea — a place in Limassol where great coffee, honest food, and good company come together. We&apos;re an all-day bar open from breakfast at 7am through to late-night cocktails, because every hour deserves something worth sitting down for.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: 'var(--color-body)',
            lineHeight: 1.75,
            marginBottom: 28,
          }}>
            Whether you&apos;re kicking off the morning with freshly scrambled eggs and a cold brew, or winding down the week with cocktails and good conversation — this is your place.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Breakfast', 'Lunch', 'Dinner', 'Cocktails', 'All-day'].map(tag => (
              <span key={tag} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--color-body)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 100,
                padding: '5px 14px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </BentoCell>

        {/* Bottom-left: Our Vibe */}
        <BentoCell variant="bottomLeft" style={{
          ...cellBase,
          background: 'var(--color-sky-medium)',
          padding: isMobile ? 30 : 40,
          minHeight: 420,
        }}>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(28px, 3vw, 40px)',
            color: 'var(--color-heading)',
            lineHeight: 1.2,
            marginBottom: 24,
          }}>
            Our Vibe
          </h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: 'var(--color-body)',
            lineHeight: 1.75,
            marginBottom: 16,
          }}>
            Crispy golden waffles in the morning, cold brews to rescue your afternoon, and cocktails that carry you into the evening. We&apos;ve got a corner table with your name on it — and we&apos;re always open.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: 'var(--color-body)',
            lineHeight: 1.75,
            marginBottom: 24,
          }}>
            On sunny Limassol days it&apos;s 100% chance of &ldquo;let&apos;s sit outside.&rdquo; Our terrace is made for long lunches, lazy Fridays, and those mornings when nowhere else will do.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 20,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.4,
          }}>
            &ldquo;If your love language is waffles, you&apos;re in the right place.&rdquo;
          </p>
        </BentoCell>

        {/* Bottom-right: photo */}
        <BentoCell variant="bottomRight" style={{ ...cellBase, height: 420 }}>
          <motion.img
            src="/milkbar-story-coffetable.png"
            alt="Table with food and drinks"
            style={{ width: '100%', height: '120%', objectFit: 'cover', display: 'block', y: img2Y }}
          />
        </BentoCell>
      </div>
    </section>
  );
}
