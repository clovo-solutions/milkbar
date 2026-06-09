import { motion } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';

const row1 = [
  { type: 'quote', text: '"Great food with enormous portions. Big variety of tea also."', name: 'Daria S.' },
  { type: 'rating', score: '4.9', label: 'Google Reviews', stars: 5 },
  { type: 'quote', text: '"Classic breakfast with 100% satisfaction guaranteed. Plus the best coffee in Limassol."', name: 'Vladimir P.' },
  { type: 'stat', value: '2,500+', label: 'happy guests a month' },
  { type: 'quote', text: '"Very nice vibe and lovely food and drinks."', name: 'Ella E.' },
  { type: 'quote', text: '"Incredible service. Our waitress was nothing less than amazing! We will definitely go back!"', name: 'ES' },
];

const row2 = [
  { type: 'stat', value: '#1', label: 'brunch spot in Limassol' },
  { type: 'quote', text: '"The Burger is that damn amazing!!! Highly recommend if you\'re in Limassol."', name: 'Aaron W.' },
  { type: 'quote', text: '"I really love this place. Very tasty — my favourite is beef sausage. Just top."', name: 'Tatiana A.' },
  { type: 'stat', value: '5★', label: 'rated on Google' },
  { type: 'quote', text: '"Had a really nice breakfast. Special dishes and very tasty."', name: 'Yaron E.' },
  { type: 'quote', text: '"9 people, different choices — everyone had a great meal. The food was delicious and the service superb."', name: 'Chen S.' },
];

const CARD_H = 200;

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#F0F0EC', fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

function Card({ item }) {
  const base = {
    background: 'var(--color-sky-medium)',
    borderRadius: 16,
    flexShrink: 0,
    marginRight: 20,
    height: CARD_H,
  };

  if (item.type === 'quote') {
    return (
      <div style={{ ...base, minWidth: 300, maxWidth: 300, padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 42, color: 'rgba(255,255,255,0.15)', lineHeight: 0.8, display: 'block', marginBottom: 8 }}>&ldquo;</span>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 13, color: 'var(--color-body)', lineHeight: 1.6, flex: 1 }}>
          {item.text}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: 'var(--color-heading)', marginTop: 12, letterSpacing: '0.04em' }}>
          — {item.name}
        </p>
      </div>
    );
  }

  if (item.type === 'rating') {
    return (
      <div style={{ ...base, minWidth: 200, maxWidth: 200, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Stars count={item.stars} />
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 52, color: 'var(--color-heading)', lineHeight: 1, letterSpacing: '-0.03em' }}>
            {item.score}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--color-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 6 }}>
            {item.label}
          </p>
        </div>
      </div>
    );
  }

  if (item.type === 'stat') {
    return (
      <div style={{ ...base, minWidth: 200, maxWidth: 200, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 44, color: 'var(--color-heading)', lineHeight: 1, letterSpacing: '-0.03em' }}>
          {item.value}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--color-body)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 8, lineHeight: 1.5 }}>
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
    <section style={{ background: 'var(--color-sky-light)', padding: isMobile ? '60px 0' : '100px 0', overflow: 'hidden', maxWidth: 1400, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 60, padding: isMobile ? '0 30px' : '0 60px' }}
      >
        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 'clamp(36px, 4vw, 54px)', color: 'var(--color-heading)', lineHeight: 1.1 }}>
          Our Customers<br />
          <em style={{ fontFamily: "'Great Vibes', cursive", fontStyle: 'normal', fontWeight: 400, fontSize: '1.15em' }}>Love Us</em>
        </h2>
      </motion.div>

      {/* Marquee rows with edge fade */}
      <div style={{ position: 'relative' }}>
        {/* Left fade */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to right, var(--color-sky-light) 0%, transparent 100%)',
        }} />
        {/* Right fade */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to left, var(--color-sky-light) 0%, transparent 100%)',
        }} />

        {/* Row 1 — scrolls left */}
        <div style={{ overflow: 'hidden', marginBottom: 20 }}>
          <div className="marquee-track" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {doubled1.map((item, i) => <Card key={i} item={item} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track-rev" style={{ display: 'inline-flex', alignItems: 'center' }}>
            {doubled2.map((item, i) => <Card key={i} item={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
