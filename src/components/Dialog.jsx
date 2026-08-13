import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

/*
 * The shell every dialog on /travel sits in.
 *
 * Portalled to <body> on purpose: the leg cards and the scenes use
 * overflow:hidden and transforms, and a fixed element inside either of those
 * is clipped or re-anchored. Rendering outside them is the only reliable way
 * to sit above the site's fixed navbar.
 *
 * The scroll lock is fussier than it looks and is the reason this is shared
 * rather than written twice. See the comments in the effect.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function Dialog({
  open,
  onClose,
  labelledBy,
  label,
  className = '',
  panelClassName = '',
  children,
}) {
  const panelRef = useRef(null)
  const returnTo = useRef(null)

  // Held in a ref so the effect depends on `open` alone. Callers pass an
  // inline arrow, so depending on onClose directly would tear the scroll lock
  // down and re-arm it on every render, and the page drifts each time.
  const close = useRef(onClose)
  close.current = onClose

  useEffect(() => {
    if (!open) return

    returnTo.current = document.activeElement

    // Stop the page behind from scrolling.
    //
    // overflow:hidden is not enough here. body is clipped sideways, and on
    // engines without `overflow-x: clip` that makes body a scroll container of
    // its own alongside <html> — the scroll position then splits between the
    // two and hiding overflow on either collapses the scrollable height,
    // throwing the reader hundreds of pixels up the page. Pinning body and
    // offsetting it by the current scroll holds what is behind the scrim
    // exactly where it was, whichever engine is running.
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

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`tv-modal-root ${className}`}
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
            aria-labelledby={labelledBy}
            aria-label={labelledBy ? undefined : label}
            className={`tv-modal ${panelClassName}`}
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
