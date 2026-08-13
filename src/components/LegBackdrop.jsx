import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PlaceArt, { ACCENTS } from './PlaceArt'

/*
 * The country behind the leg.
 *
 * Each leg carries a few scenes of where it is going; they cross-fade slowly
 * so the card has a background that moves rather than a static banner. The
 * bottom fades into the card so type stays legible over it.
 *
 * Anyone who has asked their system for less motion gets the first scene,
 * held still.
 */

const HOLD = 7000

export default function LegBackdrop({ leg }) {
  const scenes = leg.places?.length ? leg.places : []
  const [i, setI] = useState(0)
  const accent = ACCENTS[leg.id]

  // a new leg starts from its first scene
  useEffect(() => { setI(0) }, [leg.id])

  useEffect(() => {
    if (scenes.length < 2) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % scenes.length), HOLD)
    return () => clearInterval(t)
  }, [leg.id, scenes.length])

  if (!scenes.length) return null
  const shown = scenes[i] ?? scenes[0]

  return (
    <div className="tv-bd" style={{ '--accent': accent?.key }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={`${leg.id}-${shown.id}`}
          className="tv-bd-slide"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.5 }, scale: { duration: HOLD / 1000 + 1.5, ease: 'linear' } }}
        >
          <PlaceArt art={shown.art} className="tv-bd-svg" align="xMidYMin" />
          {shown.photo && <img src={shown.photo} alt="" className="tv-bd-photo" loading="lazy" decoding="async" />}
        </motion.div>
      </AnimatePresence>

      <span className="tv-bd-veil" aria-hidden="true" />

      <p className="tv-bd-cap">
        <span>{shown.name}</span>
        {scenes.length > 1 && (
          <span className="tv-bd-dots" aria-hidden="true">
            {scenes.map((s, n) => <i key={s.id} className={n === i ? 'is-on' : ''} />)}
          </span>
        )}
      </p>
    </div>
  )
}
