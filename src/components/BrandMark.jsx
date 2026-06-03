// Header seal: a champagne-gold medallion with "60th" in the center and the
// name "UKEME FALADE" curved around the top of the ring. Used in the navbar
// and mobile menu.
export default function BrandMark({ size = 50, className = '' }) {
  return (
    <span className={`inline-flex ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label="Ukeme Falade, 60th birthday"
      >
        <defs>
          <linearGradient id="bm-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#EFE3C3" />
            <stop offset="0.5" stopColor="#BE9650" />
            <stop offset="1" stopColor="#8E6A34" />
          </linearGradient>
          {/* arc for the curved name across the top */}
          <path id="bm-name-arc" d="M 17 50 A 33 33 0 0 1 83 50" fill="none" />
        </defs>

        {/* outer + inner rings */}
        <circle cx="50" cy="50" r="47" fill="none" stroke="url(#bm-gold)" strokeWidth="1.4" />
        <circle cx="50" cy="50" r="41.5" fill="none" stroke="url(#bm-gold)" strokeWidth="0.6" opacity="0.5" />

        {/* curved name */}
        <text
          fill="url(#bm-gold)"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="10.5"
          fontWeight="600"
          letterSpacing="1.6"
        >
          <textPath href="#bm-name-arc" startOffset="50%" textAnchor="middle">
            UKEME FALADE
          </textPath>
        </text>

        {/* center "60th" */}
        <text
          x="50"
          y="64"
          textAnchor="middle"
          fill="url(#bm-gold)"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontWeight="600"
        >
          <tspan fontSize="30">60</tspan>
          <tspan fontSize="12" dy="-13">th</tspan>
        </text>

        {/* side star caps where the name arc ends */}
        <g fill="url(#bm-gold)">
          <path d="M14 50l1-2.4 1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1z" />
          <path d="M86 50l1-2.4 1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1z" />
        </g>

        {/* bottom flourish */}
        <g fill="url(#bm-gold)">
          <circle cx="44" cy="80" r="1.1" />
          <path d="M50 76.5l1.1 2.6 2.6 1.1-2.6 1.1-1.1 2.6-1.1-2.6-2.6-1.1 2.6-1.1z" />
          <circle cx="56" cy="80" r="1.1" />
        </g>
      </svg>
    </span>
  )
}
