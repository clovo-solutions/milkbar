import { motion } from 'framer-motion';
import { img } from '../data/menu';

const items = [
  { label: 'Juices', category: 'Juices & Smoothies', img: img('S1'), rot: '-6deg' },
  { label: 'Smoothie Bowls', category: 'Smoothie Bowls', img: img('Acai'), rot: '4deg' },
  { label: 'Veggie Dishes', category: 'Veggie Dishes', img: img('Mango Salad'), rot: '-3deg' },
  { label: 'Oats & Chia', category: 'Oats & Chia', img: img('Porridge'), rot: '7deg' },
  { label: 'Granola', category: 'Granola Bowls', img: img('Yoghurt, Banana & Maple'), rot: '-5deg' },
  { label: 'Coffee', category: 'Hot & Cold', img: img('Freddo Espresso'), rot: '3deg' },
  { label: 'Desserts', category: 'Desserts', img: img('Carrot Muffin'), rot: '-4deg' },
  { label: 'Bakery', category: 'Bakery', img: img('Almond Croissant'), rot: '6deg' },
];

const ArrowCircle = () => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '2px solid rgba(30,58,47,0.25)',
    color: 'var(--color-accent)',
    fontSize: 20,
    flexShrink: 0,
    marginLeft: 20,
    marginRight: 20,
  }}>
    →
  </span>
);

function MarqueeItem({ item, index, onCategoryClick }) {
  return (
    <div
      onClick={() => onCategoryClick(item.category)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 0, flexShrink: 0, cursor: 'pointer' }}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 'clamp(60px, 7vw, 100px)',
        color: 'var(--color-ink)',
        opacity: 0.13,
        whiteSpace: 'nowrap',
        lineHeight: 1,
        userSelect: 'none',
        marginRight: 24,
      }}>
        {item.label}
      </span>
      <motion.img
        src={item.img}
        alt={item.label}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 80,
          height: 80,
          objectFit: 'cover',
          borderRadius: 14,
          rotate: item.rot,
          flexShrink: 0,
          marginRight: 16,
          boxShadow: '0 10px 24px -10px rgba(30,58,47,0.45)',
          border: '3px solid var(--color-cream)',
        }}
      />
      <ArrowCircle />
    </div>
  );
}

export default function MenuMarquee({ onCategoryClick }) {
  const doubled = [...items, ...items];

  return (
    <section style={{
      background: 'var(--color-bg-warm)',
      overflow: 'hidden',
      padding: '22px 0',
      borderTop: '1px solid rgba(30,58,47,0.1)',
      borderBottom: '1px solid rgba(30,58,47,0.1)',
    }}>
      <div className="marquee-track" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <MarqueeItem key={`${item.label}-${i}`} item={item} index={i % items.length} onCategoryClick={onCategoryClick} />
        ))}
      </div>
    </section>
  );
}
