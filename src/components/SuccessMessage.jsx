import { motion } from 'framer-motion'

export default function SuccessMessage({ children }) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card mx-auto flex max-w-lg flex-col items-center rounded-2xl px-8 py-12 text-center"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold-soft">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-gold-light">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="display text-xl leading-relaxed text-ivory sm:text-2xl">{children}</p>
    </motion.div>
  )
}
