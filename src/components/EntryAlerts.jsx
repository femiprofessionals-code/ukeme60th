import { motion } from 'framer-motion'
import { REQUIREMENTS, statusOf, fmt } from '../lib/entryRequirements'

/*
 * Entry paperwork, with the timing worked out live against today's date so a
 * card reads "open now" or "opens in 4 days" rather than a sentence that goes
 * stale. Filtered per leg, or shown whole on the summary.
 */

const TONE = {
  critical:   { ring: 'ring-red-400/35',    dot: 'bg-red-300',    label: 'Before you fly' },
  action:     { ring: 'ring-gold/40',       dot: 'bg-gold-light', label: 'Action needed' },
  conditional:{ ring: 'ring-gold/25',       dot: 'bg-gold/70',    label: 'If it applies' },
  unverified: { ring: 'ring-amber-300/40',  dot: 'bg-amber-300',  label: 'Please confirm' },
  info:       { ring: 'ring-ivory/12',      dot: 'bg-ivory/40',   label: 'For information' },
}

function Timing({ req }) {
  const s = statusOf(req)

  if (s.state === 'open') {
    return (
      <p className="tv-alert-when is-now">
        Window open now — do it before {fmt(s.arrive)}
        {s.daysToArrival >= 0 && ` (${s.daysToArrival} day${s.daysToArrival === 1 ? '' : 's'} away)`}
      </p>
    )
  }
  if (s.state === 'upcoming') {
    return (
      <p className="tv-alert-when">
        Opens {fmt(s.opens)} — {s.daysToOpen} day{s.daysToOpen === 1 ? '' : 's'} from now.
        Must be done before {fmt(s.arrive)}.
      </p>
    )
  }
  if (s.state === 'anytime') {
    return (
      <p className="tv-alert-when">
        Do this now — needed before {fmt(s.arrive)}
        {s.daysToArrival >= 0 && ` (${s.daysToArrival} day${s.daysToArrival === 1 ? '' : 's'} away)`}
      </p>
    )
  }
  if (s.state === 'past') return <p className="tv-alert-when is-past">Arrival date has passed</p>
  return null
}

function Card({ req, i }) {
  const tone = TONE[req.severity] ?? TONE.info
  const s = statusOf(req)
  const urgent = s.state === 'open' || (s.state === 'anytime' && s.daysToArrival <= 7)

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
      className={`tv-alert glass-card rounded-xl p-5 ring-1 ${tone.ring} ${urgent ? 'is-urgent' : ''}`}
    >
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${tone.dot} ${urgent ? 'tv-alert-pulse' : ''}`} />
        <span className="tv-alert-tag">{tone.label}</span>
        <span className="tv-alert-country">{req.country}</span>
      </div>

      <h4 className="mt-3 font-body text-base font-semibold leading-snug text-ivory">{req.title}</h4>
      {req.subtitle && <p className="tv-alert-sub">{req.subtitle}</p>}

      <Timing req={req} />

      <p className="mt-3 text-sm leading-relaxed text-ivory/72">{req.body}</p>

      <p className="tv-alert-arrival">{req.arrivalLabel}</p>

      {req.href && (
        <a
          href={req.href}
          target="_blank"
          rel="noopener noreferrer"
          className="tv-alert-link mt-4 inline-flex items-center gap-2"
        >
          {req.action}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 4h6v6M20 4 10.5 13.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
          </svg>
          <span className="sr-only"> (opens the official site in a new tab)</span>
        </a>
      )}
    </motion.li>
  )
}

export default function EntryAlerts({ leg = null, className = '' }) {
  const items = leg ? REQUIREMENTS.filter((r) => r.leg === leg) : REQUIREMENTS
  if (!items.length) return null

  const order = { critical: 0, action: 1, unverified: 2, conditional: 3, info: 4 }
  const sorted = [...items].sort((a, b) => {
    const ao = statusOf(a).state === 'open' ? -1 : 0
    const bo = statusOf(b).state === 'open' ? -1 : 0
    return ao - bo || (order[a.severity] ?? 9) - (order[b.severity] ?? 9)
  })

  return (
    <ul className={`grid list-none gap-4 p-0 ${leg ? '' : 'sm:grid-cols-2'} ${className}`}>
      {sorted.map((r, i) => <Card key={r.id} req={r} i={i} />)}
    </ul>
  )
}
