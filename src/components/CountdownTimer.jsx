import { useEffect, useState } from 'react'
import { event } from '../lib/siteConfig'

function getRemaining() {
  const diff = new Date(event.startUTC).getTime() - Date.now()
  if (diff <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    done: false,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass-card flex h-16 w-16 items-center justify-center rounded-xl sm:h-20 sm:w-20">
        <span className="display text-2xl font-medium text-foil sm:text-3xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 font-body text-[10px] uppercase tracking-[0.25em] text-ivory/55 sm:text-xs">
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer() {
  const [t, setT] = useState(getRemaining)

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  if (t.done) {
    return (
      <p className="display text-center text-2xl text-foil">
        Today we give thanks — the celebration has begun.
      </p>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5" aria-label="Countdown to the celebration">
      <Unit value={t.days} label="Days" />
      <Unit value={t.hours} label="Hours" />
      <Unit value={t.minutes} label="Minutes" />
      <Unit value={t.seconds} label="Seconds" />
    </div>
  )
}
