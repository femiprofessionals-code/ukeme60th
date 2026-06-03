import { useMemo } from 'react'
import { motion } from 'framer-motion'

// A tasteful, palette-matched celebration overlay: gold / royal-blue / ivory
// balloons, drifting "60" medallions, and a little gold confetti rising up.
// Fills its nearest positioned parent (use inside a `relative` section).
// `density` scales the number of pieces (1 = subtle, 2 = lively).

const BALLOON_COLORS = [
  ['#EFE3C3', '#8E6A34'], // pale champagne
  ['#DEC894', '#8E6A34'], // light gold
  ['#BE9650', '#74571F'], // champagne gold
  ['#DEC894', '#8E6A34'], // warm gold
]

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function Balloon({ light, dark, size }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 90" aria-hidden="true">
      <defs>
        <radialGradient id={`b-${light}-${dark}`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="35%" stopColor={light} />
          <stop offset="100%" stopColor={dark} />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="32" rx="26" ry="31" fill={`url(#b-${light}-${dark})`} />
      <path d="M27 62 L33 62 L30 68 Z" fill={dark} />
      <path d="M30 68 q6 12 -2 22" fill="none" stroke="#BE9650" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

function Medallion({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="med" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EFE3C3" />
          <stop offset="0.5" stopColor="#BE9650" />
          <stop offset="1" stopColor="#8E6A34" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="none" stroke="url(#med)" strokeWidth="2" opacity="0.85" />
      <circle cx="32" cy="32" r="23" fill="none" stroke="url(#med)" strokeWidth="0.8" opacity="0.5" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="26"
        fontWeight="600"
        fill="url(#med)"
      >
        60
      </text>
    </svg>
  )
}

function Confetti({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
      <rect x="2" y="2" width="8" height="8" rx="1.5" fill={color} transform="rotate(20 6 6)" />
    </svg>
  )
}

export default function CelebrationLayer({ density = 1 }) {
  const pieces = useMemo(() => {
    const balloons = Math.round(7 * density)
    const medallions = Math.round(3 * density)
    const confetti = Math.round(9 * density)
    const items = []

    for (let i = 0; i < balloons; i++) {
      const [light, dark] = BALLOON_COLORS[i % BALLOON_COLORS.length]
      items.push({
        kind: 'balloon',
        light,
        dark,
        size: rand(30, 52),
        left: rand(2, 94),
        duration: rand(16, 26),
        delay: rand(0, 14),
        sway: rand(14, 34),
      })
    }
    for (let i = 0; i < medallions; i++) {
      items.push({
        kind: 'medallion',
        size: rand(34, 54),
        left: rand(8, 88),
        duration: rand(18, 28),
        delay: rand(2, 16),
        sway: rand(10, 26),
      })
    }
    for (let i = 0; i < confetti; i++) {
      items.push({
        kind: 'confetti',
        size: rand(8, 14),
        color: ['#DEC894', '#BE9650', '#8E6A34', '#EFE3C3'][i % 4],
        left: rand(2, 96),
        duration: rand(12, 20),
        delay: rand(0, 12),
        sway: rand(20, 50),
      })
    }
    return items
  }, [density])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: `${p.left}%` }}
          initial={{ y: '12vh', opacity: 0 }}
          animate={{
            y: '-118vh',
            x: [0, p.sway, -p.sway / 1.5, 0],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            x: { duration: p.duration / 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
            opacity: { duration: p.duration, delay: p.delay, repeat: Infinity, times: [0, 0.1, 0.85, 1] },
          }}
        >
          {p.kind === 'balloon' && <Balloon light={p.light} dark={p.dark} size={p.size} />}
          {p.kind === 'medallion' && (
            <motion.div
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Medallion size={p.size} />
            </motion.div>
          )}
          {p.kind === 'confetti' && (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: rand(4, 8), repeat: Infinity, ease: 'linear' }}
            >
              <Confetti size={p.size} color={p.color} />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
