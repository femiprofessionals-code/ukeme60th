import { Link } from 'react-router-dom'
import { event, MAPS_URL } from '../lib/siteConfig'
import { NAV_LINKS } from './Navbar'
import GoldDivider from './GoldDivider'

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/20 bg-chocolate-espresso px-5 pb-10 pt-14 sm:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow mb-3">A Celebration of Grace</p>
        <h3 className="display text-3xl text-foil sm:text-4xl">{event.honoree}</h3>
        <p className="mt-1 display text-lg text-ivory/70">Turning 60</p>

        <GoldDivider className="my-8" />

        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-body text-sm tracking-wide text-ivory/70 transition-colors hover:text-gold-light"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="space-y-1 font-body text-sm text-ivory/55">
          <p>{event.dateLabel} · {event.timeLabel}</p>
          <p>{event.venue}</p>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="text-gold/80 hover:text-gold-light">
            {event.addressLine}
          </a>
        </div>

        <p className="mt-10 font-body text-xs tracking-wide text-ivory/35">
          With hearts full of gratitude · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
