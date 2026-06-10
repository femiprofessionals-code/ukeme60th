// Header seal: a bold gold badge. "60th" centered, "UKEME FALADE" curved
// around the top band, solid dark disc behind for definition.
//
// RELIABILITY: zero SVG references (no defs/gradients/textPath/ids). Every
// element is self-contained solid paint, so nothing can fade while scrolling.
const GOLD = '#F2DCA4'
const GOLD_BRIGHT = '#F7E3AC'
const GOLD_DEEP = '#9A7335'
const DISC = '#0C0B09'

const NAME = 'UKEME FALADE'
const RADIUS = 33.5
const SPREAD = 158 // degrees of arc the name occupies, centered at the top

const LETTERS = NAME.split('').map((ch, i) => {
  const a = -SPREAD / 2 + i * (SPREAD / (NAME.length - 1))
  const rad = (a * Math.PI) / 180
  return { ch, a, x: 50 + RADIUS * Math.sin(rad), y: 50 - RADIUS * Math.cos(rad) }
})

export default function BrandMark({ size = 72, className = '' }) {
  return (
    <span className={`inline-flex ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label="Ukeme Falade, 60th birthday"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}
      >
        {/* solid badge disc + bold outer ring */}
        <circle cx="50" cy="50" r="47" fill={DISC} stroke={GOLD} strokeWidth="3.4" />
        {/* inner ring enclosing the 60th */}
        <circle cx="50" cy="50" r="26.5" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.75" />

        {/* curved name, stroke-fattened for boldness */}
        {LETTERS.map((l, i) =>
          l.ch === ' ' ? null : (
            <text
              key={i}
              x={l.x}
              y={l.y}
              transform={`rotate(${l.a} ${l.x} ${l.y})`}
              textAnchor="middle"
              fill={GOLD}
              stroke={GOLD}
              strokeWidth="0.5"
              paintOrder="stroke"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="13"
              fontWeight="700"
            >
              {l.ch}
            </text>
          )
        )}

        {/* center "60th": deep underlayer + bright fattened top layer */}
        <text
          x="51"
          y="64.9"
          textAnchor="middle"
          fill={GOLD_DEEP}
          stroke={GOLD_DEEP}
          strokeWidth="0.7"
          paintOrder="stroke"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontWeight="700"
        >
          <tspan fontSize="32">60</tspan>
          <tspan fontSize="13" dy="-13">th</tspan>
        </text>
        <text
          x="50"
          y="64"
          textAnchor="middle"
          fill={GOLD_BRIGHT}
          stroke={GOLD_BRIGHT}
          strokeWidth="0.7"
          paintOrder="stroke"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontWeight="700"
        >
          <tspan fontSize="32">60</tspan>
          <tspan fontSize="13" dy="-13">th</tspan>
        </text>

        {/* side star caps */}
        <g fill={GOLD}>
          <path d="M13.4 50l1.2-2.8 1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2z" />
          <path d="M85.4 50l1.2-2.8 1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2z" />
        </g>

        {/* bottom flourish */}
        <g fill={GOLD}>
          <circle cx="43" cy="81" r="1.4" />
          <path d="M50 76.6l1.4 3 3 1.4-3 1.4-1.4 3-1.4-3-3-1.4 3-1.4z" />
          <circle cx="57" cy="81" r="1.4" />
        </g>
      </svg>
    </span>
  )
}
