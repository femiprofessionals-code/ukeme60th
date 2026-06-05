import { useId } from 'react'

// Header seal: "60th" centered with "UKEME FALADE" curved around the top of
// the ring. Solid champagne gold and heavier weights so it stays bold and
// legible at navbar size, on every page, including over the scrolled bar.
const GOLD = '#E2CC96'

export default function BrandMark({ size = 56, className = '' }) {
  // strip the colons React's useId emits; they can break SVG url() refs
  const arcId = 'seal-arc-' + useId().replace(/:/g, '')
  const goldId = 'seal-gold-' + useId().replace(/:/g, '')

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
          {/* metallic foil gradient for the 60th */}
          <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E8C874" />
            <stop offset="0.5" stopColor="#C9A24B" />
            <stop offset="1" stopColor="#B8860B" />
          </linearGradient>
          {/* arc for the curved name across the top */}
          <path id={arcId} d="M 15.5 50 A 34.5 34.5 0 0 1 84.5 50" fill="none" />
        </defs>

        {/* outer + inner rings */}
        <circle cx="50" cy="50" r="47" fill="none" stroke={GOLD} strokeWidth="2" />
        <circle cx="50" cy="50" r="41.5" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.6" />

        {/* curved name */}
        <text
          fill={GOLD}
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="11.5"
          fontWeight="700"
          letterSpacing="1.2"
        >
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            UKEME FALADE
          </textPath>
        </text>

        {/* center "60th" in metallic foil */}
        <text
          x="50"
          y="64"
          textAnchor="middle"
          fill={`url(#${goldId})`}
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontWeight="700"
        >
          <tspan fontSize="31">60</tspan>
          <tspan fontSize="12.5" dy="-13">th</tspan>
        </text>

        {/* side star caps where the name arc ends */}
        <g fill={GOLD}>
          <path d="M14 50l1-2.4 1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1z" />
          <path d="M86 50l1-2.4 1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1z" />
        </g>

        {/* bottom flourish */}
        <g fill={GOLD}>
          <circle cx="44" cy="80" r="1.2" />
          <path d="M50 76.2l1.2 2.7 2.7 1.2-2.7 1.2-1.2 2.7-1.2-2.7-2.7-1.2 2.7-1.2z" />
          <circle cx="56" cy="80" r="1.2" />
        </g>
      </svg>
    </span>
  )
}
