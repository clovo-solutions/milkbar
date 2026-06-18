import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';

const INSTAGRAM_URL = 'https://www.instagram.com/thecookhouse_cy';
const HANDLE = '@thecookhouse_cy';

// Per-post Instagram links, keyed by image number (instagram-postN.jpg).
// Replace each value with the real post URL; any left empty falls back to the profile.
const PERMALINKS = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: '',
  10: '',
};

// Load all instagram-post images from /assets, ordered numerically.
const modules = import.meta.glob('../assets/instagram-post*.jpg', { eager: true, query: '?url', import: 'default' });
const POSTS = Object.entries(modules)
  .map(([path, url]) => ({ n: Number(path.match(/instagram-post(\d+)/)[1]), url }))
  .sort((a, b) => a.n - b.n)
  .map(({ n, url }) => ({
    id: `ig-${n}`,
    mediaUrl: url,
    permalink: PERMALINKS[n] || INSTAGRAM_URL,
  }));

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
        background: 'var(--color-bg-warm)',
        border: '1px solid rgba(30,58,47,0.08)',
      }}
    >
      <img
        src={post.mediaUrl}
        alt="The Cookhouse on Instagram"
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

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(30,58,47,0.65) 0%, transparent 60%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s ease',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '16px',
        pointerEvents: 'none',
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(250,247,239,0.9)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          View on Instagram ↗
        </span>
      </div>

      <div style={{
        position: 'absolute', top: 12, right: 12,
        width: 28, height: 28, borderRadius: '50%',
        background: 'rgba(30,58,47,0.5)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FAF7EF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="#FAF7EF" stroke="none"/>
        </svg>
      </div>
    </div>
  );
}

export default function InstagramFeed() {
  const [posts] = useState(POSTS);
  const isMobile = useIsMobile();
  const trackRef = useRef(null);

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
      background: 'var(--color-bg)',
      padding: isMobile ? '70px 0' : '90px 0',
      overflow: 'hidden',
      maxWidth: 1400,
      margin: '0 auto',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: isMobile ? '0 30px' : '0 60px', marginBottom: isMobile ? 32 : 48 }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(36px, 4.2vw, 56px)',
          color: 'var(--color-ink)',
          lineHeight: 1.05,
        }}>
          Follow along on<br />
          <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 500, color: 'var(--color-accent)' }}>
            Instagram
          </em>
        </h2>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: 12,
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            textDecoration: 'none',
          }}
        >
          {HANDLE} ↗
        </a>
      </motion.div>

      {isMobile ? (
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 8 }} className="no-scrollbar">
          <div style={{ display: 'flex', gap: 10, paddingLeft: 30, paddingRight: 30, width: 'max-content' }}>
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to left, var(--color-bg) 0%, transparent 100%)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ overflow: 'hidden' }}>
              <div ref={trackRef} style={{ display: 'inline-flex', gap: 12, willChange: 'transform' }}>
                {doubled.map((p, i) => (
                  <PostCard key={`r1-${p.id}-${i}`} post={p} />
                ))}
              </div>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <div style={{
                display: 'inline-flex',
                gap: 12,
                willChange: 'transform',
                animation: `scrollLeft ${posts.length * 6}s linear infinite`,
                transform: 'translateX(-140px)',
              }}>
                {[...doubled].reverse().map((p, i) => (
                  <PostCard key={`r2-${p.id}-${i}`} post={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
