import { motion } from 'framer-motion'
import { REQUIREMENTS, COUNTRIES, statusOf, deadlineOf, urgencyOf, fmt } from '../lib/entryRequirements'

/*
 * Entry paperwork, ordered by deadline so the section reads as a to-do list
 * rather than a reference table, with the timing worked out live against
 * today's date. Each card takes its colour from the country it belongs to.
 */

const TONE = {
  critical:    { label: 'Before you fly',  cls: 'is-critical' },
  action:      { label: 'Action needed',   cls: 'is-action' },
  conditional: { label: 'If it applies',   cls: 'is-conditional' },
  unverified:  { label: 'Please confirm',  cls: 'is-unverified' },
  info:        { label: 'For information', cls: 'is-info' },
}

const MARKS = {
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><path d="M9 12h6M9 16h6" /></>,
  card: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 14h4" /></>,
  passport: <><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M9 16h6" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
  alert: <><path d="M12 4 2.6 20h18.8z" /><path d="M12 10v4M12 17h.01" /></>,
}

function Mark({ kind }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {MARKS[kind] ?? MARKS.doc}
    </svg>
  )
}

function Timing({ req }) {
  const s = statusOf(req)

  if (s.state === 'open')
    return (
      <p className="tv-al-when is-now">
        <span className="tv-al-dot" />
        Window open now — do it before {fmt(s.arrive)}
        {s.daysToArrival >= 0 && ` · ${s.daysToArrival} day${s.daysToArrival === 1 ? '' : 's'} away`}
      </p>
    )

  if (s.state === 'upcoming')
    return (
      <p className="tv-al-when">
        Opens {fmt(s.opens)} — {s.daysToOpen} day{s.daysToOpen === 1 ? '' : 's'} from now.
        Must be done before {fmt(s.arrive)}.
      </p>
    )

  if (s.state === 'anytime')
    return (
      <p className="tv-al-when is-now">
        <span className="tv-al-dot" />
        Do this now — needed before {fmt(s.arrive)}
        {s.daysToArrival >= 0 && ` · ${s.daysToArrival} day${s.daysToArrival === 1 ? '' : 's'} away`}
      </p>
    )

  // 'passive' — nothing to do in advance, so no imperative
  if (s.state === 'passive')
    return <p className="tv-al-when is-passive">No action needed in advance</p>

  if (s.state === 'past') return <p className="tv-al-when is-passive">Arrival date has passed</p>
  return null
}

function Card({ req, i }) {
  const tone = TONE[req.severity] ?? TONE.info
  const country = COUNTRIES[req.country] ?? {}
  const s = statusOf(req)
  const urgency = urgencyOf(req)
  const live = s.state === 'open' || s.state === 'anytime'

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
      style={{ '--c': country.key, '--c-tint': country.tint }}
      className={`tv-al ${tone.cls} ${live ? 'is-live' : ''}`}
    >
      <div className="tv-al-head">
        <span className="tv-al-mark"><Mark kind={country.mark} /></span>
        <div className="min-w-0">
          <span className="tv-al-country">{req.country}</span>
          <span className="tv-al-tag">{tone.label}</span>
        </div>
      </div>

      <h4 className="tv-al-title">{req.title}</h4>
      {req.subtitle && <p className="tv-al-sub">{req.subtitle}</p>}

      <Timing req={req} />

      {urgency != null && (
        <div className="tv-al-meter" role="presentation">
          <span style={{ width: `${Math.round(urgency * 100)}%` }} />
        </div>
      )}

      <p className="tv-al-body">{req.body}</p>

      <p className="tv-al-arrival">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
             strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
        {req.arrivalLabel}
      </p>

      {req.href && (
        <a href={req.href} target="_blank" rel="noopener noreferrer" className="tv-al-btn">
          {req.action}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 4h6v6M20 4 10.5 13.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
          </svg>
          <span className="sr-only"> (opens the official site in a new tab)</span>
        </a>
      )}
    </motion.li>
  )
}

/** Ordered by when it must be done, so the list reads top to bottom as a plan. */
function order(items) {
  const rank = (r) => {
    const st = statusOf(r).state
    if (st === 'open' || st === 'anytime') return 0
    if (st === 'upcoming') return 1
    return 2 // passive / none / past
  }
  return [...items].sort((a, b) => rank(a) - rank(b) || deadlineOf(a) - deadlineOf(b))
}

export function AlertsSummary() {
  const now = REQUIREMENTS.filter((r) => ['open', 'anytime'].includes(statusOf(r).state)).length
  const soon = REQUIREMENTS.filter((r) => statusOf(r).state === 'upcoming').length
  const info = REQUIREMENTS.length - now - soon
  return (
    <ul className="tv-al-sum">
      <li className="is-now"><b>{now}</b><span>to do now</span></li>
      <li><b>{soon}</b><span>opening soon</span></li>
      <li><b>{info}</b><span>for information</span></li>
    </ul>
  )
}

export default function EntryAlerts({ leg = null, className = '' }) {
  const items = leg ? REQUIREMENTS.filter((r) => r.leg === leg) : REQUIREMENTS
  if (!items.length) return null

  return (
    <ul className={`tv-al-list ${leg ? '' : 'is-grid'} ${className}`}>
      {order(items).map((r, i) => <Card key={r.id} req={r} i={i} />)}
    </ul>
  )
}
