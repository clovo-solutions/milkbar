import { motion } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';
import { Sprig } from './Logo';

const navLinks = ['Menu', 'About', 'Contact'];
const ticker = 'The Cookhouse  ·  ';
const INSTAGRAM_URL = 'https://www.instagram.com/thecookhouse_cy';
const FACEBOOK_URL = 'https://www.facebook.com/p/The-Cookhouse-61550531594194/';
const WOLT_URL = 'https://wolt.com/en/cyp/limassol/restaurant/bowls-by-the-cookhouse?srsltid=AfmBOoo20hsnzdxaoxC_iB1Xg_UaeBxeWt6jyJxCV-WqUfeQ964kwzA7';
const BOLT_URL = 'https://food.bolt.eu/en/442-limassol/p/2992-the-cookhouse/';

const cream = 'var(--color-cream)';
const muted = 'rgba(250,247,239,0.6)';
const faint = 'rgba(250,247,239,0.4)';

const eyebrow = {
  fontFamily: 'var(--font-body)',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: faint,
  marginBottom: 12,
};

function ContactInfo() {
  const labelStyle = { color: faint };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, textAlign: 'left' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Limassol, Cyprus
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 12, color: cream, letterSpacing: '0.02em' }}>
        <span style={labelStyle}>Address:</span> Gladstonos 112, Limassol 3032
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 12, color: muted, letterSpacing: '0.02em' }}>
        <span style={labelStyle}>Phone:</span> 25 353434
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 11, color: muted, letterSpacing: '0.02em', lineHeight: 1.7 }}>
        <span style={labelStyle}>Hours:</span><br />Tue–Fri 7:30 am–4 pm<br />Sat 8:30 am–4 pm<br />Sun–Mon Closed
      </p>
    </div>
  );
}

function SocialButton({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      width: 44, height: 44, borderRadius: '50%', border: '1.5px solid rgba(250,247,239,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none',
    }}>
      {children}
    </a>
  );
}

function FooterBottom({ isMobile }) {
  return (
    <div style={{
      borderTop: '1px solid rgba(250,247,239,0.15)',
      padding: isMobile ? '40px 30px' : '56px 60px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'flex-start',
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      gap: isMobile ? 32 : 60,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {navLinks.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 13, color: cream, textDecoration: 'none', letterSpacing: '0.06em' }}>
            {link}
          </a>
        ))}
      </div>

      <ContactInfo />

      <div style={{
        display: 'flex', flexDirection: 'column', gap: 20,
        width: isMobile ? '100%' : 'auto',
      }}>
        {/* Follow */}
        <div>
          <p style={eyebrow}>Follow</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <SocialButton href={INSTAGRAM_URL}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={cream} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill={cream} stroke="none"/>
              </svg>
            </SocialButton>
            <SocialButton href={FACEBOOK_URL}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill={cream}>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </SocialButton>
          </div>
        </div>

        {/* Order delivery */}
        <div style={{ width: '100%' }}>
          <p style={eyebrow}>Order delivery</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[{ label: 'Wolt', url: WOLT_URL }, { label: 'Bolt', url: BOLT_URL }].map(o => (
              <a
                key={o.label}
                href={o.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: '1 1 120px', minWidth: 0,
                  height: 44, padding: '0 18px', borderRadius: 22,
                  border: '1.5px solid rgba(250,247,239,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: cream,
                  letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                }}
              >
                {o.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer id="contact" style={{ background: 'var(--color-bg)', overflowX: 'hidden' }}>
      {/* Forest-green branded block (replaces the old checkerboard) */}
      <div style={{
        background: 'var(--color-ink)',
        borderTopLeftRadius: isMobile ? 32 : 56,
        borderTopRightRadius: isMobile ? 32 : 56,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative sprig watermarks */}
        <div style={{ position: 'absolute', top: -30, left: -20, color: cream, opacity: 0.05, pointerEvents: 'none' }}>
          <Sprig size={isMobile ? 180 : 300} />
        </div>
        <div style={{ position: 'absolute', bottom: 40, right: -30, color: 'var(--color-accent)', opacity: 0.1, pointerEvents: 'none', transform: 'rotate(180deg)' }}>
          <Sprig size={isMobile ? 200 : 320} />
        </div>

        {/* Centered brand lockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'relative', zIndex: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center',
            padding: isMobile ? '64px 30px 40px' : '96px 60px 60px',
          }}
        >
          <div style={{ color: cream, marginBottom: 20 }}>
            <Sprig size={isMobile ? 52 : 64} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(44px, 11vw, 150px)',
            lineHeight: 0.92,
            color: cream,
            letterSpacing: '-0.01em',
            margin: 0,
            textTransform: 'uppercase',
          }}>
            The <span style={{ fontStyle: 'normal', fontWeight: 500, color: 'var(--color-accent)' }}>Cookhouse</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 500,
            fontSize: 'clamp(10px, 2.4vw, 13px)',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: muted, marginTop: isMobile ? 18 : 24,
          }}>
            Breakfast · Brunch · Lunch · Limassol
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 400,
            fontSize: 'clamp(12px, 2.6vw, 15px)',
            color: faint, marginTop: 10,
          }}>
            Freshly baked goods &amp; specialty coffee
          </p>
        </motion.div>

        {/* Brand ticker */}
        <div style={{
          borderTop: '1px solid rgba(250,247,239,0.15)',
          overflow: 'hidden',
          padding: '18px 0',
        }}>
          <div className="ticker-track" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: 'rgba(250,247,239,0.14)',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}>
              {ticker.repeat(8)}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <FooterBottom isMobile={isMobile} />

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(250,247,239,0.1)',
          padding: isMobile ? '20px 30px' : '24px 60px',
          fontFamily: 'var(--font-body)', fontSize: 11, color: faint, letterSpacing: '0.04em',
        }}>
          © {new Date().getFullYear()} The Cookhouse · Limassol, Cyprus
        </div>
      </div>
    </footer>
  );
}
