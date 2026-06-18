// The Cookhouse botanical sprig — inline so it inherits `color` (currentColor).
export function Sprig({ size = 40, style = {}, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={style}
      aria-label="The Cookhouse"
    >
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 86 L50 30" />
        <path d="M50 30 C44 24 44 16 50 11 C56 16 56 24 50 30 Z" fill="currentColor" stroke="none" />
        <path d="M50 70 C40 70 33 64 31 54 C42 53 50 59 50 70 Z" />
        <path d="M50 70 C60 70 67 64 69 54 C58 53 50 59 50 70 Z" />
        <path d="M50 56 C41 56 35 50 33 41 C43 41 50 46 50 56 Z" />
        <path d="M50 56 C59 56 65 50 67 41 C57 41 50 46 50 56 Z" />
        <path d="M50 44 C43 44 38 39 36 31 C44 32 50 37 50 44 Z" />
        <path d="M50 44 C57 44 62 39 64 31 C56 32 50 37 50 44 Z" />
      </g>
    </svg>
  );
}

// Lockup: sprig + wordmark, used in the nav bar.
export function Wordmark({ color = 'var(--color-ink)', sprigSize = 34, fontSize = 19 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color }}>
      <Sprig size={sprigSize} />
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}>
        The Cookhouse
      </span>
    </span>
  );
}
