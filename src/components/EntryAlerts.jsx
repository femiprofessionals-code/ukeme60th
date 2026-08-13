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

/** Items that need someone to go and do something. */
export const ACTIONABLE = REQUIREMENTS.filter((r) => !!r.action)
/** Items that need nothing in advance. */
export const PASSIVE = REQUIREMENTS.filter((r) => !r.action)

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
  const now = ACTIONABLE.filter((r) => ['open', 'anytime'].includes(statusOf(r).state)).length
  const soon = ACTIONABLE.filter((r) => statusOf(r).state === 'upcoming').length
  return (
    <ul className="tv-al-sum">
      <li className="is-now"><b>{now}</b><span>to do now</span></li>
      <li><b>{soon}</b><span>opening soon</span></li>
    </ul>
  )
}

/** The two things that need nothing in advance, kept out of the alert stack. */
export function NoActionNote() {
  if (!PASSIVE.length) return null
  return (
    <div className="tv-al-none">
      <span className="tv-al-none-h">Nothing to do in advance</span>
      <ul>
        {PASSIVE.map((r) => (
          <li key={r.id}>
            <b>{r.country}</b> — {r.title}. <span>{r.subtitle}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * A banner for anything open right now. Sits at the top of the page so an
 * open window is the first thing seen, not something found by scrolling.
 */
export function UrgentBanner({ onOpen }) {
  const live = order(ACTIONABLE.filter((r) => ['open', 'anytime'].includes(statusOf(r).state)))
  if (!live.length) return null
  const lead = live[0]
  const s = statusOf(lead)
  const country = COUNTRIES[lead.country] ?? {}

  return (
    <motion.aside
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{ '--c': country.key, '--c-tint': country.tint }}
      className="tv-urgent"
      role="status"
    >
      <span className="tv-urgent-pulse" aria-hidden="true" />
      <div className="tv-urgent-text">
        <strong>
          {live.length} {live.length === 1 ? 'thing needs' : 'things need'} doing now
        </strong>
        <span>
          Next: {lead.title} — {lead.country} · due {fmt(s.arrive)}
          {s.daysToArrival >= 0 && ` (${s.daysToArrival} day${s.daysToArrival === 1 ? '' : 's'})`}
        </span>
      </div>
      <button type="button" className="tv-urgent-go" onClick={onOpen}>
        See all
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 5.4 15.6 12 9 18.6" />
        </svg>
      </button>
    </motion.aside>
  )
}

export default function EntryAlerts({ leg = null, className = '', actionableOnly = false }) {
  const base = actionableOnly ? ACTIONABLE : REQUIREMENTS
  const items = leg ? base.filter((r) => r.leg === leg) : base
  if (!items.length) return null

  return (
    <ul className={`tv-al-list ${leg ? '' : 'is-grid'} ${className}`}>
      {order(items).map((r, i) => <Card key={r.id} req={r} i={i} />)}
    </ul>
  )
}
