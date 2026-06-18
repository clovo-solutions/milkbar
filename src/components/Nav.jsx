import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';
import { getLenis } from '../lib/lenis';
import { Wordmark } from './Logo';

const links = ['Menu', 'About', 'Contact'];
const CAL_LINK = 'clovo-solutions-7teskm';
const WOLT_URL = 'https://wolt.com/en/cyp/limassol/restaurant/bowls-by-the-cookhouse?srsltid=AfmBOoo20hsnzdxaoxC_iB1Xg_UaeBxeWt6jyJxCV-WqUfeQ964kwzA7';
const BOLT_URL = 'https://food.bolt.eu/en/442-limassol/p/2992-the-cookhouse/';

function BurgerIcon({ open, color }) {
  return (
    <div style={{ width: 24, height: 16, position: 'relative', cursor: 'pointer' }}>
      <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} transition={{ duration: 0.25 }} style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: color, borderRadius: 2, display: 'block',
      }} />
      <motion.span animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.15 }} style={{
        position: 'absolute', top: 7, left: 0, right: 0, height: 1.5, background: color, borderRadius: 2, display: 'block',
      }} />
      <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} transition={{ duration: 0.25 }} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1.5, background: color, borderRadius: 2, display: 'block',
      }} />
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y > 120) {
        setHidden(y > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) setOrderOpen(false);
    const lenis = getLenis();
    if (!lenis) return;
    menuOpen ? lenis.stop() : lenis.start();
    return () => lenis.start();
  }, [menuOpen]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: '#1E3A2F' } },
      });
    })();
  }, []);

  function openBooking(e) {
    e.preventDefault();
    setMenuOpen(false);
    getCalApi().then(cal => cal('modal', { calLink: CAL_LINK }));
  }

  // Over the dark video hero (not scrolled, menu closed) → light text.
  const overHero = !scrolled && !menuOpen;
  const inkColor = overHero ? '#FAF7EF' : 'var(--color-ink)';
  const softColor = overHero ? 'rgba(255,255,255,0.85)' : 'var(--color-ink-soft)';

  return (
    <>
      <motion.nav
        initial={{ y: '-100%' }}
        animate={{ y: (!menuOpen && hidden) ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr auto' : '1fr auto 1fr',
          alignItems: 'center',
          padding: '18px 28px',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
          background: scrolled || menuOpen ? 'rgba(245,241,232,0.9)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${scrolled && !menuOpen ? 'rgba(30,58,47,0.1)' : 'transparent'}`,
        }}
      >
        {/* Left — wordmark */}
        <a href="#top" style={{ textDecoration: 'none', justifySelf: 'start' }}>
          <Wordmark sprigSize={32} fontSize={isMobile ? 16 : 18} color={inkColor} />
        </a>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifySelf: 'end' }}
            aria-label="Toggle menu"
          >
            <BurgerIcon open={menuOpen} color={menuOpen ? 'var(--color-ink)' : inkColor} />
          </button>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 36, justifySelf: 'center' }}>
              {links.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textDecoration: 'none',
                  color: inkColor,
                  textTransform: 'uppercase',
                  transition: 'color 0.3s',
                }}>
                  {link}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
              <a href="tel:+35725353434" style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: '0.12em',
                textDecoration: 'none',
                color: softColor,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                transition: 'color 0.3s',
              }}>
                Call us
              </a>
              <a href="#" onClick={openBooking} style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: '0.12em',
                textDecoration: 'none',
                color: overHero ? '#FAF7EF' : 'var(--color-cream)',
                background: overHero ? 'transparent' : 'var(--color-ink)',
                border: `1.5px solid ${overHero ? 'rgba(255,255,255,0.6)' : 'var(--color-ink)'}`,
                borderRadius: 100,
                padding: '8px 22px',
                textTransform: 'uppercase',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
              }}>
                Book a Table
              </a>
            </div>
          </>
        )}
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(245,241,232,0.98)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 48,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 38,
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    color: 'var(--color-ink)',
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <motion.a
                href="#"
                onClick={openBooking}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  color: 'var(--color-cream)',
                  background: 'var(--color-ink)',
                  borderRadius: 100,
                  padding: '13px 34px',
                  textTransform: 'uppercase',
                }}
              >
                Book a Table
              </motion.a>
              <motion.button
                onClick={() => setOrderOpen(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.29, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  color: 'var(--color-ink)',
                  background: 'transparent',
                  border: '1px solid rgba(30,58,47,0.35)',
                  borderRadius: 100,
                  padding: '12px 32px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Order Online
              </motion.button>
              <motion.a
                href="tel:+35725353434"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  color: 'var(--color-ink-faint)',
                  textTransform: 'uppercase',
                }}
              >
                Call us · +357 25 353 434
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order popup (mobile) — choose Wolt or Bolt */}
      <AnimatePresence>
        {orderOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOrderOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 120,
              background: 'rgba(10,18,14,0.55)',
              backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 28,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: 360,
                background: 'var(--color-cream)',
                borderRadius: 24,
                padding: '32px 24px 24px',
                display: 'flex', flexDirection: 'column', gap: 14,
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 26, color: 'var(--color-ink)', textAlign: 'center',
                textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: 4,
              }}>
                Order Online
              </p>
              {[{ label: 'Wolt', url: WOLT_URL }, { label: 'Bolt', url: BOLT_URL }].map(o => (
                <a
                  key={o.label}
                  href={o.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { setOrderOpen(false); setMenuOpen(false); }}
                  style={{
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
                    letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                    color: 'var(--color-cream)', background: 'var(--color-ink)',
                    borderRadius: 100, padding: '15px 24px', textAlign: 'center',
                  }}
                >
                  Order on {o.label}
                </a>
              ))}
              <button
                onClick={() => setOrderOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--color-ink-faint)', background: 'transparent',
                  border: 'none', cursor: 'pointer', padding: '8px', marginTop: 2,
                }}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
