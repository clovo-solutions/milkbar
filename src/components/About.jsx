import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';

import IMG_PLATES from '../assets/history-section2.jpg';
import IMG_TABLE from '../assets/history-section1.jpg';

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
const panelBase = {
  ...cellBase,
  background: 'var(--color-bg-warm)',
  border: '1px solid rgba(30,58,47,0.08)',
};

export default function About() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const img1Y    = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const img2Y    = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const headingY = useTransform(scrollYProgress, [0, 1], [55, -55]);

  const h3Style = {
    fontFamily: 'var(--font-display)',
    fontWeight: 500,
    fontSize: 'clamp(28px, 3vw, 40px)',
    color: 'var(--color-ink)',
    lineHeight: 1.15,
    marginBottom: 24,
  };
  const pStyle = {
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    fontSize: 15,
    color: 'var(--color-ink-soft)',
    lineHeight: 1.75,
    marginBottom: 16,
  };

  return (
    <section ref={sectionRef} id="about" style={{ background: 'var(--color-bg)', padding: isMobile ? '70px 30px' : '120px 60px', maxWidth: 1400, margin: '0 auto' }}>
      <motion.div style={{ y: headingY }}>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16 }}
        >
          Our Story
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.2vw, 56px)',
            color: 'var(--color-ink)',
            lineHeight: 1.05,
            marginBottom: 48,
          }}
        >
          Good for you,<br />
          <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 500, color: 'var(--color-accent)' }}>never a compromise</em>
        </motion.h2>
      </motion.div>

      <div className="bento-grid" style={{ alignItems: 'start' }}>
        {/* Top-left: photo */}
        <BentoCell variant="topLeft" style={{ ...cellBase, height: 420 }}>
          <motion.img
            src={IMG_PLATES}
            alt="Fresh plates at The Cookhouse"
            style={{ width: '100%', height: '106%', objectFit: 'cover', display: 'block', y: img1Y }}
          />
        </BentoCell>

        {/* Top-right: Our Story */}
        <BentoCell variant="topRight" style={{ ...panelBase, padding: isMobile ? 30 : 40, minHeight: 420 }}>
          <h3 style={h3Style}>The Cookhouse</h3>
          <p style={pStyle}>
            The Cookhouse began with one belief — that a good breakfast, brunch or lunch should never feel like a compromise. We&apos;re an all-day kitchen in the heart of Limassol, serving freshly baked goods, specialty coffee and seasonal plates made from real ingredients, every single day.
          </p>
          <p style={{ ...pStyle, marginBottom: 28 }}>
            From an early flat white and a warm pastry to a long, slow brunch, we keep things honest, seasonal and unhurried — the kind of place you settle into and lose track of the morning.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Breakfast', 'Brunch', 'Lunch', 'Bakery', 'Specialty Coffee', 'All-day'].map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--color-ink-soft)',
                border: '1px solid rgba(30,58,47,0.18)',
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
        <BentoCell variant="bottomLeft" style={{ ...panelBase, padding: isMobile ? 30 : 40, minHeight: 420 }}>
          <h3 style={h3Style}>Our Vibe</h3>
          <p style={pStyle}>
            Sunlight, greenery and the smell of fresh baking. Mornings start with specialty coffee and something warm from the oven; afternoons slow right down over brunch and good conversation. There&apos;s a corner table with your name on it.
          </p>
          <p style={{ ...pStyle, marginBottom: 24 }}>
            On bright Limassol days it&apos;s a 100% chance of &ldquo;let&apos;s sit outside.&rdquo; Our terrace is built for lazy brunches, fresh starts, and the kind of lunch you never want to rush.
          </p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 21,
            fontStyle: 'normal',
            color: 'var(--color-accent)',
            lineHeight: 1.4,
          }}>
            &ldquo;If your love language is brunch, you&apos;re in the right place.&rdquo;
          </p>
        </BentoCell>

        {/* Bottom-right: photo */}
        <BentoCell variant="bottomRight" style={{ ...cellBase, height: 420 }}>
          <motion.img
            src={IMG_TABLE}
            alt="Brunch at The Cookhouse"
            style={{ width: '100%', height: '106%', objectFit: 'cover', display: 'block', y: img2Y }}
          />
        </BentoCell>
      </div>
    </section>
  );
}
