import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import BrandMark from './BrandMark'

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/event-details', label: 'Event Details' },
  { to: '/wishes-prayers', label: 'Messages & Prayers' },
  // { to: '/gallery', label: 'Gallery' }, // hidden for now; uncomment to restore
  { to: '/rsvp', label: 'RSVP' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
          scrolled
            ? 'border-b border-gold/20 bg-chocolate-espresso/95'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <Link to="/" className="group flex items-center gap-2" aria-label="Home">
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative font-body text-sm tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-gold-light after:w-full'
                      : 'text-ivory/75 after:w-0 hover:text-gold-light hover:after:w-full'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="text-gold-light md:hidden"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  )
}
