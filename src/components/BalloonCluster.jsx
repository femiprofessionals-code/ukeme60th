// A tasteful cluster of champagne-gold balloons with curling ribbons, gently
// bobbing. Positioned in a hero corner to echo the invitation (Image 2).
// Sits behind content at low opacity so it frames rather than competes.

const BALLOONS = [
  { cx: 70, cy: 58, rx: 30, ry: 37, light: '#EFE3C3', dark: '#8E6A34' },
  { cx: 118, cy: 40, rx: 26, ry: 33, light: '#DEC894', dark: '#8E6A34' },
  { cx: 44, cy: 104, rx: 24, ry: 30, light: '#BE9650', dark: '#74571F' },
  { cx: 104, cy: 96, rx: 22, ry: 28, light: '#DEC894', dark: '#8E6A34' },
]

export default function BalloonCluster({ className = '', flip = false }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <div className="animate-bob">
        <svg
          viewBox="0 0 170 230"
          width="100%"
          height="100%"
          style={flip ? { transform: 'scaleX(-1)' } : undefined}
        >
          <defs>
            {BALLOONS.map((b, i) => (
              <radialGradient key={i} id={`bc-${i}`} cx="38%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                <stop offset="38%" stopColor={b.light} />
                <stop offset="100%" stopColor={b.dark} />
              </radialGradient>
            ))}
          </defs>

          {/* ribbons gathering toward a knot */}
          {BALLOONS.map((b, i) => (
            <path
              key={`s-${i}`}
              d={`M${b.cx} ${b.cy + b.ry} Q ${b.cx + (i % 2 ? 14 : -14)} ${b.cy + b.ry + 50} 82 196`}
              fill="none"
              stroke="#BE9650"
              strokeWidth="1"
              opacity="0.5"
            />
          ))}

          {BALLOONS.map((b, i) => (
            <g key={`b-${i}`}>
              <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill={`url(#bc-${i})`} />
              <path
                d={`M${b.cx - 4} ${b.cy + b.ry} L${b.cx + 4} ${b.cy + b.ry} L${b.cx} ${b.cy + b.ry + 7} Z`}
                fill={b.dark}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
