import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PlaceArt, { ACCENTS } from './PlaceArt'
import { backdropFor } from '../lib/placePhotos'

/*
 * The country behind the leg.
 *
 * Photographs if any have been added for that leg (drop files into
 * src/assets/places/ — see the notes there), otherwise the drawn scenes. They
 * cross-fade slowly so the card has a background that moves rather than a
 * static banner, and the bottom fades into the card so type stays legible.
 *
 * Anyone who has asked their system for less motion gets the first one, held.
 */

const HOLD = 7000

export default function LegBackdrop({ leg }) {
  const scenes = backdropFor(leg)
  const [i, setI] = useState(0)
  const [failed, setFailed] = useState(() => new Set())
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
  // a photograph that will not load falls back to the drawing rather than to
  // an empty frame; if it has no drawing there is still the card's own ground
  const usePhoto = shown.photo && !failed.has(shown.photo)

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
          {shown.art && <PlaceArt art={shown.art} className="tv-bd-svg" align="xMidYMin" />}
          {usePhoto && (
            <img
              src={shown.photo}
              alt=""
              className="tv-bd-photo"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onError={() => setFailed((s) => new Set(s).add(shown.photo))}
            />
          )}
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
