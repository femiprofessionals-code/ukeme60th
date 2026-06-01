import { motion } from 'framer-motion'
import GoldDivider from './GoldDivider'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${alignment}`}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="display text-3xl font-medium leading-tight text-ivory sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-ivory/65 sm:text-base">
          {subtitle}
        </p>
      )}
      {align === 'center' && <GoldDivider className="mt-7" />}
    </motion.div>
  )
}
