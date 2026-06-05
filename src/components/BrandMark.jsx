import { useId } from 'react'

// Header seal: "60th" centered with "UKEME FALADE" curved around the top.
// All fills are SOLID colors. Browser bugs can drop SVG gradient paint inside
// a fixed/transitioning navbar, so the metallic look on the "60th" is built
// from two layered solid-gold texts (deep gold beneath, bright gold on top),
// which cannot lose their paint while scrolling.
const GOLD = '#E2CC96'
const GOLD_BRIGHT = '#E8C874'
const GOLD_DEEP = '#8E6A34'

export default function BrandMark({ size = 56, className = '' }) {
  // strip the colons React's useId emits; they can break SVG refs in Safari
  const arcId = 'seal-arc-' + useId().replace(/:/g, '')

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

        {/* center "60th": deep-gold underlayer for metallic depth */}
        <text
          x="50.9"
          y="64.9"
          textAnchor="middle"
          fill={GOLD_DEEP}
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontWeight="700"
        >
          <tspan fontSize="31">60</tspan>
          <tspan fontSize="12.5" dy="-13">th</tspan>
        </text>
        {/* bright gold top layer */}
        <text
          x="50"
          y="64"
          textAnchor="middle"
          fill={GOLD_BRIGHT}
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
