// Header seal: "60th" centered with "UKEME FALADE" curved around the top.
//
// RELIABILITY: this SVG contains ZERO references (no <defs>, no gradients,
// no textPath, no ids). Chrome can drop reference-based SVG paint inside a
// fixed navbar while scrolling; every element here is self-contained solid
// paint, so the seal stays at full boldness permanently.
//
// The curve is built by placing each letter on the ring individually.
const GOLD = '#E6CD92'
const GOLD_BRIGHT = '#EBD49B'
const GOLD_DEEP = '#8E6A34'

const NAME = 'UKEME FALADE'
const RADIUS = 34.5
const SPREAD = 150 // degrees of arc the name occupies, centered at the top

function letterPlacements() {
  const step = SPREAD / (NAME.length - 1)
  return NAME.split('').map((ch, i) => {
    const a = -SPREAD / 2 + i * step
    const rad = (a * Math.PI) / 180
    return {
      ch,
      a,
      x: 50 + RADIUS * Math.sin(rad),
      y: 50 - RADIUS * Math.cos(rad),
    }
  })
}

const LETTERS = letterPlacements()

export default function BrandMark({ size = 56, className = '' }) {
  return (
    <span className={`inline-flex ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label="Ukeme Falade, 60th birthday"
      >
        {/* outer + inner rings */}
        <circle cx="50" cy="50" r="47" fill="none" stroke={GOLD} strokeWidth="2.2" />
        <circle cx="50" cy="50" r="41.5" fill="none" stroke={GOLD} strokeWidth="0.9" opacity="0.65" />

        {/* curved name, one self-contained letter at a time */}
        {LETTERS.map((l, i) =>
          l.ch === ' ' ? null : (
            <text
              key={i}
              x={l.x}
              y={l.y}
              transform={`rotate(${l.a} ${l.x} ${l.y})`}
              textAnchor="middle"
              fill={GOLD}
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="12"
              fontWeight="700"
            >
              {l.ch}
            </text>
          )
        )}

        {/* center "60th": deep-gold underlayer + bright top layer (embossed) */}
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

        {/* side star caps */}
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
