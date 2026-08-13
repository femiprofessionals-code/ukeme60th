import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LEGS, GROUPS, NOTES, TRIP } from '../lib/travelData'
import Sparkles from './Sparkles'
import SectionHeading from './SectionHeading'
import GoldDivider from './GoldDivider'
import DecorativeBorder from './DecorativeBorder'
import DestinationArt, { ACCENTS } from './DestinationArt'
import WeatherHero from './WeatherHero'
import DayWeather, { useLegWeather, dateForDay } from './LegWeather'
import EntryAlerts, { AlertsSummary } from './EntryAlerts'

/* The site's shared reveal: same offset, duration and easing as SectionHeading
   and the Home page paragraphs, so /travel scrolls like every other page. */
const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
}
function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      {...REVEAL}
      transition={{ ...REVEAL.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Drawn marks rather than emoji, so every device renders the same icon. */
function Sprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <symbol id="tv-plane" viewBox="0 0 24 24">
        <path d="M12 2.4c.9 0 1.5 1.1 1.5 2.9v3.4l7.6 4.4v1.9l-7.6-2.2v5.1l2.4 1.9v1.5L12 20.5l-3.9.8v-1.5l2.4-1.9v-5.1L2.9 15v-1.9l7.6-4.4V5.3c0-1.8.6-2.9 1.5-2.9Z" />
      </symbol>
      <symbol id="tv-moon" viewBox="0 0 24 24">
        <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" />
      </symbol>
      <symbol id="tv-sun" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4.1" />
        <path d="M12 2.6v2.2M12 19.2v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.4 19.6 6 18M18 6l1.6-1.6" />
      </symbol>
      <symbol id="tv-bag" viewBox="0 0 24 24">
        <rect x="3.4" y="7.6" width="17.2" height="13" rx="2.4" />
        <path d="M8.8 7.6V5.4a2 2 0 0 1 2-2h2.4a2 2 0 0 1 2 2v2.2M3.4 12.6h17.2" />
      </symbol>
      <symbol id="tv-home" viewBox="0 0 24 24">
        <path d="M3.6 10.4 12 3.4l8.4 7M5.6 12v8.6h12.8V12" />
      </symbol>
      <symbol id="tv-people" viewBox="0 0 24 24">
        <circle cx="8.6" cy="8" r="3" />
        <circle cx="16" cy="9.4" r="2.5" />
        <path d="M2.8 20.2c0-3.2 2.6-5.4 5.8-5.4s5.8 2.2 5.8 5.4M16.4 14.9c2.7.2 4.8 2.2 4.8 5.3" />
      </symbol>
      <symbol id="tv-city" viewBox="0 0 24 24">
        <path d="M3.4 20.6h17.2M5.6 20.6V8.2l5.2-3.4v15.8M10.8 20.6h7.6V11l-7.6-2.6" />
        <path d="M8 11.6h.01M8 15h.01M13.8 13h.01M13.8 16.4h.01M16.4 13h.01M16.4 16.4h.01" />
      </symbol>
      <symbol id="tv-arrow" viewBox="0 0 24 24">
        <path d="M15 5.4 8.4 12l6.6 6.6" />
      </symbol>
    </svg>
  )
}

const Ico = ({ name, className = '' }) => (
  <svg className={className} aria-hidden="true">
    <use href={`#tv-${name}`} />
  </svg>
)

/* ---------------- the route chart ---------------- */

const NODES = [
  { id: 'jakarta', n: 1, x: 293, y: 143, lx: 313, ly: 147, anchor: 'start', label: 'Jakarta' },
  { id: 'surabaya', n: 2, x: 297, y: 204, lx: 317, ly: 208, anchor: 'start', label: 'Surabaya' },
  { id: 'sydney', n: 3, x: 237, y: 273, lx: 237, ly: 299, anchor: 'middle', label: 'Sydney' },
  { id: 'bali', n: 4, x: 158, y: 271, lx: 158, ly: 297, anchor: 'middle', label: 'Bali' },
  { id: 'guangzhou', n: 5, x: 107, y: 218, lx: 87, ly: 222, anchor: 'end', label: 'Guangzhou' },
]

const TICKS = [
  { x: 245, y: 183, lx: 253, ly: 186, anchor: 'start', label: 'TPE' },
  { x: 259, y: 99, lx: 267, ly: 90, anchor: 'start', label: 'AUH' },
  { x: 275, y: 246, lx: 284, ly: 256, anchor: 'start', label: 'SIN' },
  { x: 101, y: 168, lx: 93, ly: 166, anchor: 'end', label: 'HKG' },
  { x: 126, y: 113, lx: 118, ly: 105, anchor: 'end', label: 'ICN' },
]

const CIRC = 2 * Math.PI * 100

function Chart({ current, onPick }) {
  const leg = LEGS.find((l) => l.id === current)
  const shown = CIRC * ((leg?.arc ?? 0) / 360)

  return (
    <div className="tv-chart relative overflow-hidden rounded-2xl border border-gold/15 shadow-card">
      <svg viewBox="0 0 400 344" role="img"
           aria-label="Route: Washington, Jakarta, Surabaya, Sydney, Bali, Guangzhou, home via Hong Kong and Seoul">
        <defs>
          <radialGradient id="tvGlow">
            <stop offset="0%" stopColor="#DEC894" stopOpacity=".45" />
            <stop offset="100%" stopColor="#DEC894" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="tv-guilloche">
          {[0, 30, 60, 90, 120, 150].map((r) => (
            <ellipse key={r} cx="200" cy="180" rx="97" ry="58" transform={`rotate(${r} 200 180)`} />
          ))}
        </g>

        <circle className="tv-bezel" cx="200" cy="180" r="121" />
        <circle className="tv-bezel-in" cx="200" cy="180" r="114" />
        <circle className="tv-orbit" cx="200" cy="180" r="100" />
        <circle className="tv-progress" cx="200" cy="180" r="100"
                transform="rotate(-90 200 180)"
                style={{ strokeDasharray: `${shown} ${CIRC - shown}` }} />

        <path className="tv-second" d="M200,80 C272,134 262,236 158,271" />

        {TICKS.map((t) => (
          <g key={t.label}>
            <circle className="tv-tick" cx={t.x} cy={t.y} r="3.5" />
            <text className="tv-tick-label" x={t.lx} y={t.ly} textAnchor={t.anchor}>{t.label}</text>
          </g>
        ))}

        <circle className="tv-home-ring" cx="200" cy="80" r="13" />
        <circle className="tv-home" cx="200" cy="80" r="5.5" />
        <text className="tv-node-label tv-home-label" x="200" y="58" textAnchor="middle">Washington</text>
        <text className="tv-chart-label" x="200" y="46" textAnchor="middle">HOME</text>

        {NODES.map((nd) => {
          const on = nd.id === current
          return (
            <g key={nd.id} className={`tv-node ${on ? 'is-on' : ''}`} role="button" tabIndex={0}
               aria-label={`Stop ${nd.n}, ${nd.label}`}
               onClick={() => onPick(nd.id)}
               onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(nd.id) } }}>
              <circle className="tv-node-glow" cx={nd.x} cy={nd.y} r="30" fill="url(#tvGlow)" />
              <circle className="tv-node-disc" cx={nd.x} cy={nd.y} r="12" />
              <text className="tv-node-num" x={nd.x} y={nd.y + 4} textAnchor="middle">{nd.n}</text>
              <text className="tv-node-label" x={nd.lx} y={nd.ly} textAnchor={nd.anchor}>{nd.label}</text>
            </g>
          )
        })}

        <g transform="translate(20,326)">
          <line className="tv-key" x1="0" y1="0" x2="16" y2="0" />
          <text className="tv-chart-label" x="22" y="3">MAIN ROUTE</text>
          <line className="tv-key tv-key-d" x1="104" y1="0" x2="120" y2="0" />
          <text className="tv-chart-label" x="126" y="3">VIA TAIPEI</text>
        </g>
        <text className="tv-chart-label" x="382" y="329" textAnchor="end">17 DAYS</text>
      </svg>
    </div>
  )
}

/* ---------------- flight strip ---------------- */

function Flight({ f }) {
  if (!f) return null
  return (
    <div className="tv-flight mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-xl px-4 py-3">
      <div>
        <div className="tv-code">{f.from.code}</div>
        <div className="tv-time">{f.from.time}</div>
        <div className="tv-city">{f.from.city}</div>
      </div>
      <div className="min-w-0 text-center">
        <div className="tv-dur">{f.dur}</div>
        <div className="my-1.5 flex items-center gap-1">
          <span className="tv-rule" />
          <Ico name="plane" className="tv-track-icon" />
          <span className="tv-rule" />
        </div>
        <div className="tv-fnote">{f.note || ' '}</div>
      </div>
      <div className="text-right">
        <div className="tv-code">{f.to.code}</div>
        <div className="tv-time">{f.to.time}</div>
        <div className="tv-city">{f.to.city}</div>
      </div>
    </div>
  )
}

/* ---------------- one leg ---------------- */

function LegCard({ leg, onGo }) {
  const i = LEGS.indexOf(leg)
  const prev = LEGS[i - 1]
  const next = LEGS[i + 1]
  const wx = useLegWeather(leg)
  const accent = ACCENTS[leg.id]

  return (
    <motion.article
      key={leg.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ '--accent': accent?.key, '--accent-glow': accent?.glow }}
      className="tv-leg glass-card relative overflow-hidden rounded-2xl shadow-card"
    >
      <div className="relative">
        <DestinationArt id={leg.id} name={leg.name} />
        <WeatherHero leg={leg} wx={wx} />
      </div>
      <div className="relative p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="tv-glyph">
          {leg.num ? leg.num : <Ico name="plane" className="h-5 w-5" />}
        </span>
        <div className="text-right">
          <div className="tv-span">{leg.span}</div>
          <div className="tv-nights mt-2">{leg.nights}</div>
        </div>
      </div>

      <h3 className="display mt-4 text-4xl leading-none text-ivory sm:text-5xl">{leg.name}</h3>
      <p className="eyebrow mt-3 !text-[0.62rem] !tracking-[0.28em]">{leg.place}</p>
      <div className="rule-gold mt-4 w-16" />

      <div className="tv-stay mt-5 rounded-xl px-4 py-4">
        <div className="tv-k">Staying at</div>
        {leg.stay ? (
          <>
            <div className="mt-1.5 font-body text-base font-medium text-ivory">{leg.stay.name}</div>
            <div className="mt-1 text-sm leading-relaxed text-ivory/60">{leg.stay.addr}</div>
            <div className="mt-3 grid gap-3 border-t border-gold/12 pt-3 sm:grid-cols-2">
              <div><div className="tv-k">Check in</div><div className="tv-val">{leg.stay.in}</div></div>
              <div><div className="tv-k">Check out</div><div className="tv-val">{leg.stay.out}</div></div>
            </div>
          </>
        ) : (
          <div className="mt-1.5 font-body text-base italic text-ivory/50">
            {leg.id === 'outbound' ? 'In transit' : 'Accommodation to be confirmed'}
          </div>
        )}
      </div>

      <p className="display mt-5 text-xl italic leading-snug text-ivory/90 sm:text-2xl">{leg.summary}</p>

      <EntryAlerts leg={leg.id} className="mt-5" />

      <ul className="mt-6 list-none p-0">
        {leg.days.map((d, idx) => (
          <li key={`${d.n}-${idx}`}
              className={`tv-day relative grid grid-cols-[34px_1fr] gap-x-4 pb-6 ${d.star ? 'is-star' : ''} ${
                idx === leg.days.length - 1 ? 'is-last' : ''
              }`}>
            <span className="tv-mark"><Ico name={d.icon} className="h-4 w-4" /></span>
            <div className="tv-when">
              <b>Day {String(d.n).padStart(2, '0')}</b> · {d.when}
              <DayWeather wx={wx[dateForDay(d.n)]} />
            </div>
            <div className="tv-what">{d.what}</div>
            <div>
              {d.detail && <p className="tv-detail">{d.detail}</p>}
              {d.chip && <span className="tv-chip mt-2 inline-block">Confirmed</span>}
              <Flight f={d.flight} />
            </div>
          </li>
        ))}
      </ul>

      {(prev || next) && (
        <nav className="mt-2 grid grid-cols-2 gap-3 border-t border-gold/12 pt-5" aria-label="Move between legs">
          {prev ? (
            <button type="button" onClick={() => onGo(prev.id)} className="tv-lnav">
              <Ico name="arrow" className="h-4 w-4 shrink-0" />
              <span className="min-w-0"><i>Previous</i><b>{prev.name}</b></span>
            </button>
          ) : <span />}
          {next && (
            <button type="button" onClick={() => onGo(next.id)} className="tv-lnav is-next col-start-2">
              <Ico name="arrow" className="h-4 w-4 shrink-0 rotate-180" />
              <span className="min-w-0"><i>Next</i><b>{next.name}</b></span>
            </button>
          )}
        </nav>
      )}
      </div>
    </motion.article>
  )
}

/* ---------------- the page body ---------------- */

export default function TravelItinerary() {
  const [current, setCurrent] = useState('outbound')
  const [counted, setCounted] = useState(false)
  const statsRef = useRef(null)
  const stageRef = useRef(null)
  const touch = useRef({ x: 0, y: 0, on: false })

  const leg = useMemo(() => LEGS.find((l) => l.id === current), [current])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setCounted(true); io.disconnect() } }),
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function go(id) {
    setCurrent(id)
    stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /* a decisive horizontal flick moves between legs; vertical scroll is untouched */
  function onTouchStart(e) {
    if (e.touches.length !== 1) { touch.current.on = false; return }
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, on: true }
  }
  function onTouchEnd(e) {
    if (!touch.current.on) return
    touch.current.on = false
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.7) return
    const i = LEGS.findIndex((l) => l.id === current)
    const j = dx < 0 ? i + 1 : i - 1
    if (j >= 0 && j < LEGS.length) setCurrent(LEGS[j].id)
  }

  return (
    <>
      <Sprite />

      <section className="marble relative overflow-hidden bg-choco-radial px-5 pb-10 pt-28 text-center sm:px-8 sm:pt-32">
        <Sparkles className="opacity-60" />
        <div className="relative mx-auto max-w-6xl">
          <motion.p {...REVEAL} className="eyebrow">{TRIP.span}</motion.p>
          <motion.h1
            {...REVEAL}
            transition={{ ...REVEAL.transition, delay: 0.08 }}
            className="display mt-4 text-5xl leading-[0.95] sm:text-7xl"
          >
            <span className="text-foil">The Travel Itinerary</span>
          </motion.h1>

          <Reveal delay={0.16}><GoldDivider className="mt-6" /></Reveal>

          <Reveal delay={0.22}>
            <p className="mt-6 font-body text-xs uppercase tracking-[0.28em] text-gold/85">{TRIP.kicker}</p>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="display mx-auto mt-6 max-w-2xl text-xl italic leading-relaxed text-ivory/85 sm:text-2xl">
              {TRIP.lede}
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <p className="mt-5 font-body text-xs uppercase tracking-[0.26em] text-gold">{TRIP.note}</p>
          </Reveal>

          <Reveal delay={0.4} className="mx-auto mt-12 max-w-2xl">
            <DecorativeBorder>
              <div ref={statsRef} className="glass-card grid grid-cols-4 rounded-2xl px-2 py-7">
                {TRIP.stats.map((s2) => (
                  <div key={s2.label} className="px-1 text-center">
                    <b className="display block text-3xl leading-none text-gold-light sm:text-4xl">
                      <Counter to={s2.n} run={counted} />
                    </b>
                    <i className="mt-2 block font-body text-[0.6rem] not-italic uppercase tracking-[0.2em] text-ivory/60">
                      {s2.label}
                    </i>
                  </div>
                ))}
              </div>
            </DecorativeBorder>
          </Reveal>
        </div>
      </section>

      <section className="marble relative overflow-hidden bg-chocolate px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Paperwork & deadlines"
            title="Before You Fly"
            subtitle="Timings count back from each arrival, so these update themselves as the trip approaches. Every link goes to the official site — confirm there, as rules change and depend on your passport and visa type."
          />
          <Reveal delay={0.06}><AlertsSummary /></Reveal>
          <Reveal delay={0.12}>
            <EntryAlerts className="mt-10" />
          </Reveal>
        </div>
      </section>

      <section className="marble relative bg-chocolate px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(320px,390px)_1fr] lg:items-start lg:gap-12">
        <Reveal className="min-w-0 lg:sticky lg:top-24">
          <Chart current={current} onPick={go} />
          <p className="mt-3 text-center font-body text-[0.62rem] uppercase tracking-[0.28em] text-ivory/50">
            Tap a city to open the leg
          </p>

          <div className="mt-5 rounded-xl border border-gold/15 bg-chocolate-card/50 px-4 py-4">
            <h2 className="eyebrow !text-[0.6rem]">Two departures</h2>
            <dl className="mt-3 grid gap-3">
              {GROUPS.map((g) => (
                <div key={g.tag} className="grid grid-cols-[auto_1fr] items-start gap-3">
                  <dt className="rounded border border-gold/25 px-2 py-1 font-body text-[0.58rem] uppercase tracking-[0.14em] text-gold-light">
                    {g.tag}
                  </dt>
                  <dd className="m-0 text-sm leading-relaxed text-ivory/70">{g.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="tv-rail mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
            {LEGS.map((l) => (
              <button key={l.id} type="button" onClick={() => setCurrent(l.id)}
                      aria-current={l.id === current ? 'true' : undefined}
                      className={`tv-pill ${l.id === current ? 'is-on' : ''}`}>
                <span className="tv-pill-n">{l.num ? l.num : <Ico name="plane" className="h-3 w-3" />}</span>
                {l.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div ref={stageRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="min-w-0 scroll-mt-24">
          <LegCard leg={leg} onGo={go} />
        </div>
        </div>
      </section>

      <section className="marble relative overflow-hidden bg-choco-radial px-5 py-20 sm:px-8 sm:py-24">
        <Sparkles className="opacity-50" />
        <div className="relative mx-auto max-w-4xl">
          <SectionHeading eyebrow="Before you go" title="Travel Notes" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {NOTES.map((n, i) => (
              <Reveal key={n.h} delay={i * 0.08}>
                <div className="glass-card h-full rounded-xl px-5 py-5">
                  <h3 className="eyebrow !text-[0.6rem]">{n.h}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/75">{n.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <GoldDivider className="mt-12" />
        </div>
      </section>

    </>
  )
}

function Counter({ to, run }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
    let raf, t0 = null
    const step = (ts) => {
      if (t0 === null) t0 = ts
      const k = Math.min(1, (ts - t0) / 900)
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [run, to])
  return <>{v}</>
}
