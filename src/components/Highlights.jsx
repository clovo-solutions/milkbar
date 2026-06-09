import { motion } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';

const highlights = [
  { name: 'Ashwagandha',     benefit: 'Adaptogen — supports stress relief & energy' },
  { name: 'Spirulina',       benefit: 'Protein-rich superfood — natural detox' },
  { name: 'Matcha',          benefit: 'Antioxidant powerhouse — sustained focus' },
  { name: 'Ginger',          benefit: 'Anti-inflammatory — gut health & immunity' },
  { name: 'Avocado',         benefit: 'Heart-healthy fats — creamy, filling' },
  { name: 'Halloumi',        benefit: 'Cypriot tradition — high protein, salty joy' },
  { name: 'Coconut Milk',    benefit: 'Dairy-free creaminess — medium-chain fats' },
  { name: 'Free-Range Eggs', benefit: 'Complete protein — locally sourced, rich yolk' },
];

// Stagger heights for desktop wave effect
const HEIGHTS = [260, 200, 290, 220, 220, 290, 200, 260];

function IngredientCard({ h, index, isMobile }) {
  const isLight = index % 2 === 1;
  const bg       = isLight ? '#F0F0EC' : '#141414';
  const num      = isLight ? 'rgba(10,10,10,0.12)'    : 'rgba(240,240,236,0.1)';
  const heading  = isLight ? '#0A0A0A'                 : '#F0F0EC';
  const body     = isLight ? 'rgba(10,10,10,0.5)'      : 'rgba(240,240,236,0.45)';
  const divider  = isLight ? 'rgba(10,10,10,0.15)'     : 'rgba(240,240,236,0.15)';
  const ordinal  = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={!isMobile ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
      style={{
        background: bg,
        borderRadius: 18,
        padding: isMobile ? '24px 20px' : '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: isMobile ? 170 : HEIGHTS[index],
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Ghost ordinal — large background number */}
      <span style={{
        position: 'absolute',
        bottom: -10,
        right: 12,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: isMobile ? 72 : 96,
        color: num,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '-0.04em',
      }}>
        {ordinal}
      </span>

      {/* Top: small ordinal label */}
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.12em',
        color: body,
        textTransform: 'uppercase',
      }}>
        {ordinal}
      </span>

      {/* Bottom: name + divider + benefit */}
      <div>
        <h3 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: isMobile ? 17 : 22,
          color: heading,
          lineHeight: 1.2,
          marginBottom: 10,
          position: 'relative',
          zIndex: 1,
        }}>
          {h.name}
        </h3>
        <div style={{ width: 24, height: 1, background: divider, marginBottom: 10 }} />
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: isMobile ? 11 : 12,
          color: body,
          lineHeight: 1.55,
          position: 'relative',
          zIndex: 1,
          maxWidth: 200,
        }}>
          {h.benefit}
        </p>
      </div>
    </motion.div>
  );
}

export default function Highlights() {
  const isMobile = useIsMobile();

  return (
    <section style={{
      background: 'var(--color-sky-light)',
      padding: isMobile ? '60px 30px 80px' : '80px 60px 100px',
      maxWidth: 1400,
      margin: '0 auto',
    }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: isMobile ? 36 : 56 }}
      >
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(34px, 4vw, 52px)',
          color: 'var(--color-heading)',
          lineHeight: 1.1,
        }}>
          A little more about<br />
          <em style={{ fontFamily: "'Great Vibes', cursive", fontStyle: 'normal', fontWeight: 400, fontSize: '1.15em' }}>
            what&apos;s inside
          </em>
        </h2>
      </motion.div>

      {isMobile ? (
        /* Mobile: 2-column uniform grid */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}>
          {highlights.map((h, i) => (
            <IngredientCard key={h.name} h={h} index={i} isMobile />
          ))}
        </div>
      ) : (
        /* Desktop: 4-column staggered-height grid */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          alignItems: 'start',
        }}>
          {highlights.map((h, i) => (
            <IngredientCard key={h.name} h={h} index={i} isMobile={false} />
          ))}
        </div>
      )}
    </section>
  );
}
