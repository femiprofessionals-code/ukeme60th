// Concept A header mark: a champagne-gold "60" medallion with a small
// "Birthday Thanksgiving" tagline. Used in the navbar and mobile menu.
export default function BrandMark({ tagline = true, size = 42, className = '' }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" aria-label="60th Birthday Thanksgiving" role="img">
        <defs>
          <linearGradient id="bm-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#EFE3C3" />
            <stop offset="0.5" stopColor="#BE9650" />
            <stop offset="1" stopColor="#8E6A34" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="none" stroke="url(#bm-gold)" strokeWidth="1.4" />
        <circle cx="24" cy="24" r="18" fill="none" stroke="url(#bm-gold)" strokeWidth="0.6" opacity="0.55" />
        <text
          x="24"
          y="31"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="19"
          fontWeight="600"
          fill="url(#bm-gold)"
        >
          60
        </text>
      </svg>
      {tagline && (
        <span className="flex flex-col leading-[1.35]">
          <span className="font-body text-[9px] uppercase tracking-[0.34em] text-gold/85">Birthday</span>
          <span className="font-body text-[9px] uppercase tracking-[0.34em] text-gold/85">Thanksgiving</span>
        </span>
      )}
    </span>
  )
}
