import { motion } from 'framer-motion'

function MessageCard({ msg, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex break-inside-avoid flex-col rounded-2xl border border-gold/35 bg-cream p-6 text-chocolate-deep shadow-card"
    >
      {/* ornamental top corner accents */}
      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-gold/60" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-gold/60" />

      <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-gold-deep">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.6 7.4L21 12l-7.4 2.6L12 22l-1.6-7.4L3 12l7.4-2.6z" />
        </svg>
        {msg.type}
      </span>

      <p
        className={`font-body text-[15px] leading-relaxed text-chocolate-warm ${
          msg.type === 'Scripture' ? 'display text-lg italic leading-relaxed' : ''
        }`}
      >
        {msg.message}
      </p>

      <div className="mt-5 border-t border-gold/25 pt-4">
        <p className="display text-lg font-semibold text-chocolate-deep">{msg.name}</p>
        {msg.relationship && (
          <p className="font-body text-xs uppercase tracking-[0.18em] text-gold-deep/80">
            {msg.relationship}
          </p>
        )}
      </div>
    </motion.article>
  )
}

export default function MessageWall({ messages = [] }) {
  if (!messages.length) {
    return (
      <p className="text-center font-body text-ivory/55">
        Be the first to share a blessing for Ukeme.
      </p>
    )
  }
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
      {messages.map((m, i) => (
        <MessageCard key={i} msg={m} index={i} />
      ))}
    </div>
  )
}
