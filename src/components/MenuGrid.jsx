import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';
import { menuData, categories } from '../data/menu';

function MenuCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      style={{
        background: 'var(--color-sky-medium)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: 180, overflow: 'hidden' }}>
        <img
          src={item.img}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
      </div>
      <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: 'var(--color-heading)',
            lineHeight: 1.3,
          }}>
            {item.name}
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: 'var(--color-sky-solid)',
            whiteSpace: 'nowrap',
          }}>
            {item.price}
          </span>
        </div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: 12,
          color: 'var(--color-body)',
          lineHeight: 1.5,
        }}>
          {item.description}
        </p>
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
    <section id="menu" style={{ background: 'var(--color-sky-light)', padding: isMobile ? '60px 30px' : '100px 60px', maxWidth: 1400, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(36px, 4vw, 54px)',
          color: 'var(--color-heading)',
          lineHeight: 1.1,
          marginBottom: 40,
        }}>
          Everything we<br />
          <em style={{ fontFamily: "'Great Vibes', cursive", fontStyle: 'normal', fontWeight: 400, fontSize: '1.15em' }}>love to make</em>
        </h2>
      </motion.div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 48,
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: active === cat ? 600 : 400,
              fontSize: 13,
              letterSpacing: '0.04em',
              padding: '8px 20px',
              borderRadius: 100,
              border: `1.5px solid ${active === cat ? 'var(--color-heading)' : 'rgba(255,255,255,0.15)'}`,
              background: active === cat ? 'var(--color-heading)' : 'transparent',
              color: active === cat ? '#0A0A0A' : 'var(--color-heading)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

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
