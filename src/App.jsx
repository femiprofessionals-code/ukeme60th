import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import EventDetails from './pages/EventDetails'
import WishesPrayers from './pages/WishesPrayers'
// import Gallery from './pages/Gallery' // hidden for now
import RSVP from './pages/RSVP'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function PageTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-chocolate-espresso">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/event-details" element={<PageTransition><EventDetails /></PageTransition>} />
          <Route path="/wishes-prayers" element={<PageTransition><WishesPrayers /></PageTransition>} />
          {/* Gallery hidden for now; uncomment to restore */}
          {/* <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} /> */}
          <Route path="/rsvp" element={<PageTransition><RSVP /></PageTransition>} />
          <Route path="*" element={<PageTransition><Home /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
