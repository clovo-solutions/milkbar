import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';

const INSTAGRAM_URL = 'https://instagram.com/milkbarcy';

const POSTS = [
  { id: 'post-1', mediaUrl: '/milkbar-post1.jpg', permalink: 'https://www.instagram.com/p/DZUlJp5itam/' },
  { id: 'post-2', mediaUrl: '/milkbar-post2.jpg', permalink: 'https://www.instagram.com/p/DZMiTQXDWVk/' },
  { id: 'post-3', mediaUrl: '/milkbar-post3.jpg', permalink: 'https://www.instagram.com/p/DY1T1MwiEn9/' },
  { id: 'post-4', mediaUrl: '/milkbar-post4.jpg', permalink: 'https://www.instagram.com/p/DYtlfEZjMFk/?img_index=1' },
  { id: 'post-5', mediaUrl: '/milkbar-post5.jpg', permalink: 'https://www.instagram.com/p/DYrAo-jjrhe/' },
  { id: 'post-6', mediaUrl: '/milkbar-post6.jpg', permalink: 'https://www.instagram.com/p/DYl2_RNCITl/' },
  { id: 'post-7', mediaUrl: '/milkbar-post7.jpg', permalink: 'https://www.instagram.com/p/DYWaOsAjS94/' },
  { id: 'post-8', mediaUrl: '/milkbar-post8.jpg', permalink: 'https://www.instagram.com/p/DYRXkl_AQZx/' },
  { id: 'post-8', mediaUrl: '/milkbar-post9.jpg', permalink: 'https://www.instagram.com/milkbarcy/p/DYEYvwfCUBC/' },
  { id: 'post-8', mediaUrl: '/milkbar-post10.jpg', permalink: 'https://www.instagram.com/milkbarcy/p/DX_ScHHgTJc/' },
  { id: 'post-8', mediaUrl: '/milkbar-post11.jpg', permalink: 'https://www.instagram.com/milkbarcy/p/DXqoyOql0in/' },
];

function PostCard({ post }) {
  const [hovered, setHovered] = useState(false);

  function handleClick(e) {
    e.stopPropagation();
    window.open(post.permalink, '_blank', 'noopener,noreferrer');
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 280,
        height: 280,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        background: '#1a1a1a',
      }}
    >
      <img
        src={post.mediaUrl}
        alt="Instagram post"
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.5s ease',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Hover overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s ease',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '16px',
        pointerEvents: 'none',
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          View post ↗
        </span>
      </div>

      {/* Instagram icon badge */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        width: 28, height: 28, borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/>
        </svg>
      </div>
    </div>
  );
}

export default function InstagramFeed() {
  const [posts] = useState(POSTS);
  const isMobile = useIsMobile();
  const trackRef = useRef(null);

  // Auto-scroll on desktop
  useEffect(() => {
    const track = trackRef.current;
    if (!track || isMobile) return;
    let pos = 0;
    let raf;
    let paused = false;

    const step = () => {
      if (!paused) {
        pos += 0.5;
        if (pos >= track.scrollWidth / 2) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    track.parentElement?.addEventListener('mouseenter', pause);
    track.parentElement?.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(raf);
      track.parentElement?.removeEventListener('mouseenter', pause);
      track.parentElement?.removeEventListener('mouseleave', resume);
    };
  }, [posts, isMobile]);

  const doubled = [...posts, ...posts];

  return (
    <section style={{
      background: 'var(--color-sky-light)',
      padding: isMobile ? '60px 0' : '80px 0',
      overflow: 'hidden',
      maxWidth: 1400,
      margin: '0 auto',
    }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: isMobile ? '0 30px' : '0 60px', marginBottom: isMobile ? 32 : 48 }}
      >
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(34px, 4vw, 52px)',
          color: 'var(--color-heading)',
          lineHeight: 1.1,
        }}>
          Follow us on<br />
          <em style={{ fontFamily: "'Great Vibes', cursive", fontStyle: 'normal', fontWeight: 400, fontSize: '1.15em' }}>
            Instagram
          </em>
        </h2>
        <a
          href="https://instagram.com/milkbarcy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-body)',
            textDecoration: 'none',
          }}
        >
          @milkbarcy ↗
        </a>
      </motion.div>

      {isMobile ? (
        /* Mobile: touch-scroll single row */
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 8 }} className="no-scrollbar">
          <div style={{ display: 'flex', gap: 10, paddingLeft: 30, paddingRight: 30, width: 'max-content' }}>
            {posts.map((p, i) => (
              <PostCard key={p.id} post={p} index={i} />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop: two rows, auto-scrolling */
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Row 1 — scrolls left */}
            <div style={{ overflow: 'hidden' }}>
              <div ref={trackRef} style={{ display: 'inline-flex', gap: 12, willChange: 'transform' }}>
                {doubled.map((p, i) => (
                  <PostCard key={`r1-${p.id}-${i}`} post={p} index={i % posts.length} />
                ))}
              </div>
            </div>

            {/* Row 2 — offset, scrolls left slightly slower via CSS */}
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                display: 'inline-flex',
                gap: 12,
                willChange: 'transform',
                animation: `scrollLeft ${posts.length * 6}s linear infinite`,
                transform: 'translateX(-140px)',
              }}>
                {[...doubled].reverse().map((p, i) => (
                  <PostCard key={`r2-${p.id}-${i}`} post={p} index={i % posts.length} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
