import { motion } from 'framer-motion'
import { event } from '../lib/siteConfig'
import DecorativeBorder from './DecorativeBorder'

function Row({ icon, label, value, sub }) {
  return (
    <div className="flex items-start gap-4 py-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold-soft text-gold-light">
        {icon}
      </span>
      <div>
        <p className="eyebrow mb-1 text-gold/80">{label}</p>
        <p className="display text-xl leading-snug text-ivory sm:text-2xl">{value}</p>
        {sub && <p className="font-body text-sm text-ivory/55">{sub}</p>}
      </div>
    </div>
  )
}

export default function EventDetailsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <DecorativeBorder>
        <div className="glass-card rounded-2xl px-7 py-8 sm:px-10 sm:py-10">
          <h3 className="display mb-2 text-center text-2xl text-foil sm:text-3xl">{event.title}</h3>
          <div className="mx-auto mb-4 h-px w-24 rule-gold" />
          <div className="divide-y divide-gold/15">
            <Row
              label="Date"
              value={event.dateLabel}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
                </svg>
              }
            />
            <Row
              label="Time"
              value={event.timeLabel}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <Row
              label="Venue"
              value={event.venue}
              sub={event.addressLine}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              }
            />
          </div>
        </div>
      </DecorativeBorder>
    </motion.div>
  )
}
