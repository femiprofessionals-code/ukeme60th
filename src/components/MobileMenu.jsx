import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Sparkles from './Sparkles'

export default function MobileMenu({ open, onClose, links }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-[78%] max-w-xs flex-col bg-chocolate-deep md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
          >
            <Sparkles className="opacity-40" />
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />

            <div className="flex items-center justify-between px-6 py-6">
              <span className="display text-xl text-foil">Ukeme · 60</span>
              <button onClick={onClose} aria-label="Close menu" className="text-gold-light">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="relative mt-4 flex flex-col gap-1 px-4">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06 }}
                >
                  <NavLink
                    to={l.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 font-body text-base tracking-wide transition-colors ${
                        isActive ? 'text-gold-light' : 'text-ivory/80 hover:text-gold-light'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto px-6 py-8">
              <div className="mb-4 h-px w-full rule-gold" />
              <p className="display text-center text-lg text-ivory/70">I'm Turning 60</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
