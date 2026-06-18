import { motion } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';

const row1 = [
  { type: 'quote', text: '"The smoothie bowls are unreal — fresh, generous and genuinely beautiful."', name: 'Daria S.' },
  { type: 'rating', score: '4.9', label: 'Google Reviews', stars: 5 },
  { type: 'quote', text: '"Best cold-pressed juices in Limassol, hands down. The Super Greens is my ritual."', name: 'Vladimir P.' },
  { type: 'stat', value: '2,500+', label: 'happy guests a month' },
  { type: 'quote', text: '"Everything tastes clean and full of life. My new go-to spot."', name: 'Ella E.' },
  { type: 'quote', text: '"Lovely service and the Acai bowl is perfection. We will definitely be back!"', name: 'ES' },
];

const row2 = [
  { type: 'stat', value: '#1', label: 'brunch spot in Limassol' },
  { type: 'quote', text: '"The Cosmic Cacao bowl is that good. Highly recommend if you\'re in Limassol."', name: 'Aaron W.' },
  { type: 'quote', text: '"I really love this place — a Mixed Lentil Bowl and a juice, every single time."', name: 'Tatiana A.' },
  { type: 'stat', value: '5★', label: 'rated on Google' },
  { type: 'quote', text: '"Fresh, healthy and actually delicious. A rare combination done right."', name: 'Yaron E.' },
  { type: 'quote', text: '"Nine of us, all different orders — every single plate was a hit."', name: 'Chen S.' },
];

const CARD_H = 200;

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: 'var(--color-accent)', fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

function Card({ item }) {
  const base = {
    background: 'var(--color-cream)',
    border: '1px solid rgba(30,58,47,0.08)',
    borderRadius: 16,
    flexShrink: 0,
    marginRight: 20,
    height: CARD_H,
    boxShadow: '0 14px 30px -24px rgba(30,58,47,0.4)',
  };

  if (item.type === 'quote') {
    return (
      <div style={{ ...base, minWidth: 300, maxWidth: 300, padding: '26px 28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'rgba(197,107,69,0.3)', lineHeight: 0.7, display: 'block', marginBottom: 6 }}>&ldquo;</span>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 13.5, color: 'var(--color-ink-soft)', lineHeight: 1.6, flex: 1 }}>
          {item.text}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, color: 'var(--color-ink)', marginTop: 12, letterSpacing: '0.02em' }}>
          — {item.name}
        </p>
      </div>
    );
  }

  if (item.type === 'rating') {
    return (
      <div style={{ ...base, minWidth: 200, maxWidth: 200, padding: '26px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Stars count={item.stars} />
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 52, color: 'var(--color-ink)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            {item.score}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--color-ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 6 }}>
            {item.label}
          </p>
        </div>
      </div>
    );
  }

  if (item.type === 'stat') {
    return (
      <div style={{ ...base, minWidth: 200, maxWidth: 200, padding: '26px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'var(--color-bg-deep)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 46, color: 'var(--color-accent)', lineHeight: 1, letterSpacing: '-0.02em' }}>
          {item.value}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--color-ink-soft)', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 8, lineHeight: 1.5 }}>
          {item.label}
        </p>
      </div>
    );
  }
}

export default function Testimonials() {
  const doubled1 = [...row1, ...row1];
  const doubled2 = [...row2, ...row2];
  const isMobile = useIsMobile();

  return (
    <section style={{ background: 'var(--color-bg)', padding: isMobile ? '70px 0' : '110px 0', overflow: 'hidden', maxWidth: 1400, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 60, padding: isMobile ? '0 30px' : '0 60px' }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(38px, 4.2vw, 58px)', color: 'var(--color-ink)', lineHeight: 1.05 }}>
          Our guests<br />
          <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 500, color: 'var(--color-accent)' }}>keep coming back</em>
        </h2>
      </motion.div>

      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to left, var(--color-bg) 0%, transparent 100%)',
        }} />

        <div style={{ overflow: 'hidden', marginBottom: 20 }}>
          <div className="marquee-track" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {doubled1.map((item, i) => <Card key={i} item={item} />)}
          </div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track-rev" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {doubled2.map((item, i) => <Card key={i} item={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
