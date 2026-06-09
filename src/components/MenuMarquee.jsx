import { motion } from 'framer-motion';

const items = [
  { label: 'Smoothies', category: 'Smoothies', img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=200&auto=format&fit=crop', rot: '-6deg' },
  { label: 'Coffees', category: 'Drinks', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop', rot: '4deg' },
  { label: 'Mains', category: 'Mains', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&auto=format&fit=crop', rot: '-3deg' },
  { label: 'Burgers', category: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop', rot: '7deg' },
  { label: 'Cocktails', category: 'Cocktails', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&auto=format&fit=crop', rot: '-5deg' },
  { label: 'Brunch', category: 'Breakfast', img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=200&auto=format&fit=crop', rot: '3deg' },
  { label: 'Pasta', category: 'Pasta', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&auto=format&fit=crop', rot: '-4deg' },
  { label: 'Desserts', category: 'Desserts', img: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=200&auto=format&fit=crop', rot: '6deg' },
];

const ArrowCircle = () => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.25)',
    color: 'rgba(255,255,255,0.6)',
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
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        flexShrink: 0,
        cursor: 'pointer',
      }}
    >
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        fontSize: 'clamp(70px, 8vw, 110px)',
        color: '#ffffff',
        opacity: 0.07,
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
          borderRadius: 12,
          rotate: item.rot,
          flexShrink: 0,
          marginRight: 16,
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
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
      background: 'var(--color-sky-light)',
      overflow: 'hidden',
      padding: '16px 0',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div
        className="marquee-track"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {doubled.map((item, i) => (
          <MarqueeItem key={`${item.label}-${i}`} item={item} index={i % items.length} onCategoryClick={onCategoryClick} />
        ))}
      </div>
    </section>
  );
}
