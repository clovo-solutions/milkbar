import { motion } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';
import MilkbarLogo from './MilkbarLogo';

const navLinks = [ 'Menu', 'About', 'Contact'];
const ticker = 'Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  ';

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer id="contact" style={{ background: 'var(--color-sky-light)', overflowX: 'hidden' }}>
      {/* Two-tone section */}
      <div style={{ position: 'relative', paddingBottom: 0 }}>
        {/* Top strip - sky-light */}
        <div style={{
          background: 'var(--color-sky-light)',
          height: 200,
          position: 'relative',
        }} />

        {/* Dark panel — checkerboard */}
        <div style={{
          backgroundColor: '#0A0A0A',
          backgroundImage: `
            linear-gradient(45deg, #ffffff 25%, transparent 25%),
            linear-gradient(135deg, #ffffff 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ffffff 75%),
            linear-gradient(135deg, transparent 75%, #ffffff 75%)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 0, 30px -30px, 0px 30px',
          padding: isMobile ? '0 30px 60px' : '0 60px 60px',
          position: 'relative',
        }}>
          {/* Gradient overlay: transparent → 50% black, keeps content readable */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(20,20,20,0) 0%, rgba(20,20,20,1) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }} />

          {/* Floating signup circle */}
          <div style={{
            position: 'absolute',
            top: -160,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}>
            {/* Entry fade/scale wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Continuous spin wrapper */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: 'min(420px, 88vw)',
                  height: 'min(420px, 88vw)',
                  borderRadius: '50%',
                  background: '#141414',
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: '0 12px 60px rgba(0,0,0,0.6)',
                }}
              >
                {/* Counter-rotate so logo stays upright */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                >
                  <MilkbarLogo size={300} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer content — sits above the gradient overlay */}
          {isMobile ? (
            /* Mobile: brand centered top, nav+social separated at bottom */
            <div style={{ paddingTop: 280, position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 32 }}>
              {/* Brand */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400, fontSize: 'clamp(52px, 16vw, 80px)', color: '#fff', letterSpacing: 0, lineHeight: 0.9 }}>
                  milkbar
                </span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Limassol, Cyprus
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.12)' }} />

              {/* Nav + social */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {navLinks.map(link => (
                    <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: '#fff', textDecoration: 'none', letterSpacing: '0.06em' }}>
                      {link}
                    </a>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/>
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop: 3-column grid */
            <div style={{ paddingTop: 280, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', position: 'relative', zIndex: 2 }}>
              {/* Left nav */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {navLinks.map(link => (
                  <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: '#fff', textDecoration: 'none', letterSpacing: '0.06em' }}>
                    {link}
                  </a>
                ))}
              </div>

              {/* Center: brand text */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400, fontSize: 'clamp(48px, 7vw, 100px)', color: '#fff', letterSpacing: 0, lineHeight: 0.9 }}>
                  milkbar
                </span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Limassol, Cyprus
                </p>
              </div>

              {/* Right: social icons */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Brand ticker */}
      <div style={{
        background: 'var(--color-sky-footer)',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        overflow: 'hidden',
        padding: '20px 0',
      }}>
        <div
          className="ticker-track"
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(60px, 8vw, 110px)',
            color: 'rgba(255,255,255,0.18)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            {ticker}{ticker}
          </span>
        </div>
      </div>
    </footer>
  );
}
