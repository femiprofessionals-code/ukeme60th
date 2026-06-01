// Wraps children in a thin gold frame with ornamental corners.
function Corner({ className }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 40 40"
      className={`absolute text-gold/70 ${className}`}
      aria-hidden="true"
    >
      <path d="M2 14V6a4 4 0 0 1 4-4h8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="6" r="1.6" fill="currentColor" />
    </svg>
  )
}

export default function DecorativeBorder({ children, className = '', inset = false }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`pointer-events-none absolute rounded-[14px] border border-gold/30 ${
          inset ? 'inset-3' : 'inset-0'
        }`}
      />
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      <div className="relative">{children}</div>
    </div>
  )
}
