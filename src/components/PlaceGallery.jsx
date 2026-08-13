import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PlaceArt from './PlaceArt'
import Dialog from './Dialog'
import { ACCENTS } from './DestinationArt'

/*
 * The places attached to a leg: a row of cards under the summary, each
 * opening full size in a dialog with arrows to move between them.
 *
 * A place may carry a `photo`. It is layered over the drawing and only fades
 * in once the browser reports it loaded, so a file that is missing, slow or
 * broken leaves the drawing in place — there is never a broken image.
 */

function PlaceImage({ place, className = '', eager = false }) {
  const [loaded, setLoaded] = useState(false)

  // a new place means a new photo to wait for
  useEffect(() => { setLoaded(false) }, [place.photo])

  return (
    <span className={`tv-pl-img ${className}`}>
      <PlaceArt art={place.art} className="tv-pl-svg" />
      {place.photo && (
        <img
          src={place.photo}
          alt={place.name}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`tv-pl-photo ${loaded ? 'is-in' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
        />
      )}
    </span>
  )
}

export default function PlaceGallery({ leg }) {
  const places = leg.places ?? []
  const [openAt, setOpenAt] = useState(-1)
  const accent = ACCENTS[leg.id]

  // close the viewer when the leg changes underneath it
  useEffect(() => { setOpenAt(-1) }, [leg.id])

  const step = useCallback(
    (d) => setOpenAt((i) => (i < 0 ? i : (i + d + places.length) % places.length)),
    [places.length],
  )

  useEffect(() => {
    if (openAt < 0) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openAt, step])

  if (!places.length) return null
  const shown = places[openAt] ?? null

  return (
    <section className="tv-pl" style={{ '--accent': accent?.key, '--accent-glow': accent?.glow }}>
      <header className="tv-pl-head">
        <h4 className="tv-pl-h">While you are there</h4>
        <span className="tv-pl-count">{places.length} places</span>
      </header>

      <ul className="tv-pl-grid">
        {places.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.06 + i * 0.07 }}
          >
            <button type="button" className="tv-pl-card" onClick={() => setOpenAt(i)}>
              <PlaceImage place={p} eager={i === 0} />
              <span className="tv-pl-scrim" aria-hidden="true" />
              <span className="tv-pl-cap">
                <b>{p.name}</b>
                <i>{p.note}</i>
              </span>
              <span className="tv-pl-zoom" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 4 4M11 8v6M8 11h6" />
                </svg>
              </span>
              <span className="sr-only">Open {p.name}</span>
            </button>
          </motion.li>
        ))}
      </ul>

      <Dialog
        open={openAt >= 0}
        onClose={() => setOpenAt(-1)}
        labelledBy="tv-pl-title"
        panelClassName="tv-pl-modal"
      >
        {shown && (
          <>
            <div className="tv-pl-stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={shown.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="tv-pl-stage-in"
                >
                  <PlaceImage place={shown} eager />
                </motion.div>
              </AnimatePresence>

              <button type="button" className="tv-modal-x tv-pl-x" onClick={() => setOpenAt(-1)}
                      aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>

              {places.length > 1 && (
                <>
                  <button type="button" className="tv-pl-nav is-prev" onClick={() => step(-1)}
                          aria-label="Previous place">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 5.4 8.4 12 15 18.6" />
                    </svg>
                  </button>
                  <button type="button" className="tv-pl-nav is-next" onClick={() => step(1)}
                          aria-label="Next place">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 5.4 15.6 12 9 18.6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <div className="tv-pl-info">
              <p className="eyebrow !text-[0.56rem]">{leg.name} · {shown.note}</p>
              <h3 id="tv-pl-title" className="display tv-pl-title">{shown.name}</h3>
              <p className="tv-pl-blurb">{shown.blurb}</p>
              {places.length > 1 && (
                <div className="tv-pl-dots" role="tablist" aria-label="Places">
                  {places.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={i === openAt}
                      aria-label={p.name}
                      className={`tv-pl-dot ${i === openAt ? 'is-on' : ''}`}
                      onClick={() => setOpenAt(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </Dialog>
    </section>
  )
}
