import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';
import { menuData, categories, categorySubtitles } from '../data/menu';

function MenuCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      style={{
        background: 'var(--color-cream)',
        border: '1px solid rgba(30,58,47,0.08)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 14px 30px -22px rgba(30,58,47,0.45)',
      }}
    >
      <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
        <img
          src={item.img}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        {item.popular && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 10,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--color-cream)', background: 'var(--color-accent)',
            padding: '5px 10px', borderRadius: 100,
          }}>
            Popular
          </span>
        )}
      </div>
      <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 17,
            color: 'var(--color-ink)',
            lineHeight: 1.25,
          }}>
            {item.name}
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: 15,
            color: 'var(--color-accent)',
            whiteSpace: 'nowrap',
          }}>
            {item.price}
          </span>
        </div>
        {item.description && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 12.5,
            color: 'var(--color-ink-soft)',
            lineHeight: 1.55,
          }}>
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function MenuGrid({ activeCategory, setActiveCategory }) {
  const active = activeCategory;
  const setActive = setActiveCategory;
  const isMobile = useIsMobile();
  const items = menuData[active] || [];

  return (
    <section id="menu" style={{ background: 'var(--color-bg)', padding: isMobile ? '70px 30px' : '120px 60px', maxWidth: 1400, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
          letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 16,
        }}>
          The Menu
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(38px, 4.2vw, 60px)',
          color: 'var(--color-ink)',
          lineHeight: 1.05,
          marginBottom: 40,
        }}>
          Everything we<br />
          <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 500, color: 'var(--color-accent)' }}>love to make</em>
        </h2>
      </motion.div>

      {/* Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 18 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: active === cat ? 600 : 500,
              fontSize: 13,
              letterSpacing: '0.02em',
              padding: '9px 20px',
              borderRadius: 100,
              border: `1.5px solid ${active === cat ? 'var(--color-ink)' : 'rgba(30,58,47,0.2)'}`,
              background: active === cat ? 'var(--color-ink)' : 'transparent',
              color: active === cat ? 'var(--color-cream)' : 'var(--color-ink-soft)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Greek section subtitle */}
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 500,
        fontSize: 18, color: 'var(--color-ink-faint)', marginBottom: 40,
      }}>
        {categorySubtitles[active]}
      </p>

      {/* Cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {items.map((item, i) => (
            <MenuCard key={item.name} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
