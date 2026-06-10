import { motion } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';

const navLinks = [ 'Menu', 'About', 'Contact'];
const ticker = 'Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  Milkbar  ·  ';

function ContactInfo() {
  const labelStyle = { color: 'rgba(255,255,255,0.5)' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, textAlign: 'left' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Limassol, Cyprus
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: '#fff', letterSpacing: '0.04em' }}>
        <span style={labelStyle}>Address:</span> Arch. Makarios III Avenue 226, Limassol 3030
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>
        <span style={labelStyle}>Phone:</span> 25 354100
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', lineHeight: 1.7 }}>
        <span style={labelStyle}>Hours:</span><br />Tue–Sun 7:30 am–11 pm<br />Mon 7:30 am–8 pm
      </p>
    </div>
  );
}

function FooterBottom({ isMobile }) {
  return (
    <div style={{
      background: 'var(--color-sky-footer)',
      borderTop: '1px solid rgba(255,255,255,0.12)',
      padding: isMobile ? '40px 30px' : '60px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'flex-start',
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      gap: isMobile ? 32 : 60,
    }}>
      {/* Nav links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {navLinks.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: 13, color: '#fff', textDecoration: 'none', letterSpacing: '0.06em' }}>
            {link}
          </a>
        ))}
      </div>

      {/* Contact info */}
      <ContactInfo />

      {/* Social icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href="https://www.instagram.com/milkbarcy/" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/>
          </svg>
        </a>
        <a href="https://www.facebook.com/milkbarcy/" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        <a
          href="https://wolt.com/en/cyp/limassol/restaurant/milkbar-pns?srsltid=AfmBOopShmEmM5CoL3i_XwYMg0CL73y3D4N_G9AFB1pK0NnoDkcvR42n"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            height: 44,
            padding: '0 18px',
            borderRadius: 22,
            border: '1.5px solid rgba(255,255,255,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: 13,
            color: '#fff',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Order on Wolt
        </a>
      </div>
    </div>
  );
}

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
          display: 'flex',
          flexDirection: 'column',
          minHeight: 346,
        }}>
          {/* Gradient overlay: transparent → 50% black, keeps content readable */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(20,20,20,0) 0%, rgba(20,20,20,1) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }} />

          {/* Floating logo */}
          <div style={{
            position: 'absolute',
            top: -110,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                width: 'min(220px, 48vw)',
                height: 'min(220px, 48vw)',
                borderRadius: '50%',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src="/logo.svg"
                alt="Milkbar"
                style={{
                  width: '62%',
                  height: 'auto',
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </motion.div>
          </div>
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

      {/* Bottom bar: nav, contact info, socials */}
      <FooterBottom isMobile={isMobile} />
    </footer>
  );
}
