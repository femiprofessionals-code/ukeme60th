// A subtle, tasteful field of twinkling gold stars used behind hero/sections.
const STARS = [
  { top: '12%', left: '8%', size: 3, delay: '0s' },
  { top: '22%', left: '88%', size: 2, delay: '1.2s' },
  { top: '40%', left: '15%', size: 2, delay: '0.6s' },
  { top: '64%', left: '80%', size: 3, delay: '2s' },
  { top: '78%', left: '22%', size: 2, delay: '1.6s' },
  { top: '30%', left: '52%', size: 2, delay: '2.4s' },
  { top: '86%', left: '60%', size: 3, delay: '0.9s' },
  { top: '8%', left: '40%', size: 2, delay: '3s' },
  { top: '54%', left: '94%', size: 2, delay: '1.1s' },
  { top: '70%', left: '5%', size: 2, delay: '2.7s' },
]

export default function Sparkles({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {STARS.map((s, i) => (
        <svg
          key={i}
          className="absolute text-gold-light animate-twinkle"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
          width={s.size * 6}
          height={s.size * 6}
          viewBox="0 0 24 24"
        >
          <path
            d="M12 0c.6 5.6 5.8 10.8 12 12-6.2 1.2-11.4 6.4-12 12-.6-5.6-5.8-10.8-12-12C6.2 10.8 11.4 5.6 12 0z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  )
}
