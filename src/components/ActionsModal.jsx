import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import EntryAlerts, { ACTIONABLE, NoActionNote } from './EntryAlerts'
import { statusOf } from '../lib/entryRequirements'

/*
 * The action list as a dialog rather than a section of the page.
 *
 * Portalled to <body> on purpose: the leg cards and the scene use
 * overflow:hidden and transforms, and a fixed element inside either of those
 * is clipped or re-anchored. Rendering outside them is the only reliable way
 * to sit above the site's fixed navbar.
 *
 * Behaves like a dialog should: focus moves in and is trapped, Escape closes,
 * the background cannot scroll behind it, and focus returns to whatever
 * opened it.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function ActionsModal({ open, onClose }) {
  const panelRef = useRef(null)
  const returnTo = useRef(null)

  // Held in a ref so the effect below depends on `open` alone. Callers pass an
  // inline arrow, so depending on onClose directly would tear the scroll lock
  // down and re-arm it on every render, and the page drifts each time.
  const close = useRef(onClose)
  close.current = onClose

  useEffect(() => {
    if (!open) return

    returnTo.current = document.activeElement

    // Stop the page behind from scrolling.
    //
    // Setting overflow:hidden is not enough on this page: body carries
    // overflow-x:hidden, so it is its own scroll box, and hiding overflow on
    // either element collapses the scrollable height and clamps the reader
    // hundreds of pixels up the page. Pinning body instead and offsetting it
    // by the current scroll keeps what is behind the scrim exactly where it
    // was, and the position is restored on close.
    const body = document.body
    const keep = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    }
    const y = window.scrollY
    const gap = window.innerWidth - document.documentElement.clientWidth
    body.style.position = 'fixed'
    body.style.top = `-${y}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    if (gap > 0) body.style.paddingRight = `${gap}px`

    const panel = panelRef.current
    panel?.querySelector(FOCUSABLE)?.focus?.()

    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close.current(); return }
      if (e.key !== 'Tab' || !panel) return
      const items = [...panel.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      Object.assign(body.style, keep)
      // instant, not smooth: the page has scroll-behavior:smooth, and an
      // animated restore reads as the page sliding away under the reader
      window.scrollTo({ top: y, left: 0, behavior: 'instant' })
      returnTo.current?.focus?.({ preventScroll: true })
    }
  }, [open])

  const now = ACTIONABLE.filter((r) => ['open', 'anytime'].includes(statusOf(r).state)).length
  const soon = ACTIONABLE.filter((r) => statusOf(r).state === 'upcoming').length

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="tv-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="tv-modal-scrim" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tv-modal-title"
            className="tv-modal"
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="tv-modal-head">
              <div>
                <p className="eyebrow !text-[0.58rem]">Paperwork &amp; deadlines</p>
                <h2 id="tv-modal-title" className="display tv-modal-title">Action Required</h2>
                <p className="tv-modal-counts">
                  <b>{now}</b> to do now
                  {soon > 0 && <> · <b>{soon}</b> opening soon</>}
                </p>
              </div>
              <button type="button" className="tv-modal-x" onClick={onClose} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </header>

            <div className="tv-modal-body">
              <p className="tv-modal-note">
                Timings count back from each arrival. Every link opens the official site —
                confirm there, as rules change and depend on your passport and visa type.
              </p>
              <EntryAlerts actionableOnly className="mt-5" />
              <NoActionNote />
            </div>

            <footer className="tv-modal-foot">
              <button type="button" className="tv-modal-done" onClick={onClose}>Close</button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
