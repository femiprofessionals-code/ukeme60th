import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ImageFrame from './ImageFrame'

export default function GalleryGrid({ images = [] }) {
  const [active, setActive] = useState(null)

  const single = images.length === 1

  const tile = (img, i) => (
    <motion.button
      key={img.src}
      type="button"
      onClick={() => setActive(img)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="block w-full break-inside-avoid text-left"
    >
      <ImageFrame src={img.src} alt={img.alt} caption={img.caption} ratio="aspect-[4/5]" />
    </motion.button>
  )

  return (
    <>
      {single ? (
        <div className="mx-auto w-full max-w-sm">{tile(images[0], 0)}</div>
      ) : (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {images.map((img, i) => tile(img, i))}
        </div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-5 top-5 text-gold-light"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageFrame src={active.src} alt={active.alt} caption={active.caption} ratio="aspect-[4/5]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
