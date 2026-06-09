import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLenis } from '../lib/lenis';

const links = ['Menu', 'About', 'Contact'];

function BurgerIcon({ open }) {
  return (
    <div style={{ width: 24, height: 16, position: 'relative', cursor: 'pointer' }}>
      <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} transition={{ duration: 0.25 }} style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: '#fff', borderRadius: 2, display: 'block',
      }} />
      <motion.span animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.15 }} style={{
        position: 'absolute', top: 7, left: 0, right: 0, height: 1.5, background: '#fff', borderRadius: 2, display: 'block',
      }} />
      <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} transition={{ duration: 0.25 }} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1.5, background: '#fff', borderRadius: 2, display: 'block',
      }} />
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Stop/start Lenis scroll when mobile menu opens/closes
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    menuOpen ? lenis.stop() : lenis.start();
    return () => lenis.start();
  }, [menuOpen]);

  const logo = (
    <img
      src="/logo.svg"
      alt="Milkbar"
      style={{ width: 44, height: 44, filter: 'brightness(0) invert(1)', display: 'block' }}
    />
  );

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
          padding: '20px 28px',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled || menuOpen ? 'rgba(10,10,10,0.95)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        }}
      >
        {/* Left — logo */}
        <div>{logo}</div>

        {isMobile ? (
          /* Mobile: burger button */
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            aria-label="Toggle menu"
          >
            <BurgerIcon open={menuOpen} />
          </button>
        ) : (
          <>
            {/* Desktop center: nav links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
              {links.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 12,
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  color: scrolled ? 'var(--color-heading)' : '#fff',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s',
                }}>
                  {link}
                </a>
              ))}
            </div>

            {/* Desktop right: Call us + Book a Table */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
              <a href="tel:+35725354100" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 12,
                letterSpacing: '0.1em',
                textDecoration: 'none',
                color: scrolled ? 'var(--color-heading)' : '#fff',
                textTransform: 'uppercase',
                transition: 'color 0.3s',
                whiteSpace: 'nowrap',
              }}>
                Call us
              </a>
              <a href="#contact" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 12,
                letterSpacing: '0.1em',
                textDecoration: 'none',
                color: scrolled ? 'var(--color-heading)' : '#fff',
                border: `1px solid ${scrolled ? 'var(--color-heading)' : '#fff'}`,
                borderRadius: 100,
                padding: '8px 20px',
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
              background: 'rgba(10,10,10,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 48,
            }}
          >
            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 32,
                    letterSpacing: '0.06em',
                    textDecoration: 'none',
                    color: '#fff',
                    textTransform: 'uppercase',
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.4 }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRadius: 100,
                  padding: '12px 32px',
                  textTransform: 'uppercase',
                }}
              >
                Book a Table
              </motion.a>
              <motion.a
                href="tel:+35725354100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  textTransform: 'uppercase',
                }}
              >
                Call us · +357 25 354 100
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
