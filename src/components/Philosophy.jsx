import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';

const qualities = [
  'Fresh Daily Ingredients',
  'Locally Sourced When Possible',
  'Made-from-Scratch Sauces',
  'Organic Coffee Beans',
  'No Artificial Flavours',
];

function RevealImage({ src, alt, delay = 0, parallaxY, style = {} }) {
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
        style={{ width: '100%', height: '120%', objectFit: 'cover', display: 'block', y: parallaxY }}
      />
    </motion.div>
  );
}

export default function Philosophy() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  const headingY   = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const listY      = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const imgCenterY        = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const imgTopY           = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const imgBottomY        = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const imgTopYMobile     = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const imgBottomYMobile  = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const heading = (
    <>
      Good food, honest<br />
      <em style={{ fontFamily: "'Great Vibes', cursive", fontStyle: 'normal', fontWeight: 400, fontSize: '1.15em' }}>
        ingredients &amp; care
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
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        color: i === 0 ? 'var(--color-heading)' : 'var(--color-body)',
        letterSpacing: '0.04em',
        fontWeight: i === 0 ? 600 : 400,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{
        width: 20, height: 1,
        background: i === 0 ? 'var(--color-heading)' : 'var(--color-body)',
        display: 'inline-block', flexShrink: 0,
      }} />
      {q}
    </motion.p>
  ));

  return (
    <section ref={sectionRef} style={{
      background: 'var(--color-sky-light)',
      padding: isMobile ? '60px 30px 80px' : '100px 60px 120px',
      maxWidth: 1400,
      margin: '0 auto',
    }}>

      {isMobile ? (
        /* ── Mobile: editorial stack ── */
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* 1. Large hero image — waffles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 320,
              borderRadius: 20,
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
              marginBottom: -48,
            }}
          >
            <motion.img
              src="/milkbar-waffles.jpg"
              alt="Waffles"
              style={{ width: '100%', height: '115%', objectFit: 'cover', display: 'block', y: imgCenterY }}
            />
          </motion.div>

          {/* 2. Text card overlapping image from below */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              background: 'var(--color-sky-medium)',
              borderRadius: 20,
              padding: '56px 28px 36px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 7vw, 40px)',
              color: 'var(--color-heading)',
              lineHeight: 1.15,
              marginBottom: 28,
            }}>
              {heading}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {qualitiesList}
            </div>
          </motion.div>

          {/* 3. Two smaller images side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ height: 180, borderRadius: 16, overflow: 'hidden', background: '#f4f5f4' }}
            >
              <motion.img
                src="/milkbar-pancakes.jpg"
                alt="Pancakes"
                style={{ width: '100%', height: '120%', objectFit: 'cover', display: 'block', y: imgTopYMobile }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ height: 180, borderRadius: 16, overflow: 'hidden', background: '#f4f5f4' }}
            >
              <motion.img
                src="/milkbar-coffee.jpg"
                alt="Coffee"
                style={{ width: '100%', height: '120%', objectFit: 'cover', display: 'block', y: imgBottomYMobile }}
              />
            </motion.div>
          </div>
        </div>

      ) : (
        /* ── Desktop: 3-column editorial grid ── */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr 0.9fr',
          gridTemplateRows: '1fr 1fr',
          gap: 16,
          height: 560,
        }}>
          {/* Col 1, row 1: heading */}
          <motion.div style={{
            gridColumn: 1, gridRow: 1,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            paddingBottom: 8, paddingRight: 24,
            y: headingY,
          }}>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(32px, 3.2vw, 50px)',
                color: 'var(--color-heading)',
                lineHeight: 1.1,
              }}
            >
              {heading}
            </motion.h2>
          </motion.div>

          {/* Col 1, row 2: qualities list */}
          <motion.div style={{
            gridColumn: 1, gridRow: 2,
            paddingTop: 8, paddingRight: 24,
            display: 'flex', flexDirection: 'column', gap: 10,
            y: listY,
          }}>
            {qualitiesList}
          </motion.div>

          {/* Col 2, rows 1–2: tall centre image */}
          <div style={{ gridColumn: 2, gridRow: '1 / 3', background: '#f4f3f3', borderRadius: 16 }}>
            <RevealImage src="/milkbar-waffles.jpg" alt="Waffles" delay={0.05} parallaxY={imgCenterY} />
          </div>

          {/* Col 3, row 1 */}
          <div style={{ gridColumn: 3, gridRow: 1, background: '#f4f3f3', borderRadius: 16 }}>
            <RevealImage src="/milkbar-pancakes.jpg" alt="Pancakes" delay={0.15} parallaxY={imgTopY} />
          </div>

          {/* Col 3, row 2 */}
          <div style={{ gridColumn: 3, gridRow: 2, background: '#f4f3f3', borderRadius: 16 }}>
            <RevealImage src="/milkbar-coffee.jpg" alt="Coffee" delay={0.25} parallaxY={imgBottomY} />
          </div>
        </div>
      )}
    </section>
  );
}
