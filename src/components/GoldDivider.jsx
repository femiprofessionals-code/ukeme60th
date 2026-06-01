export default function GoldDivider({ className = '', icon = true }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="rule-gold w-16 sm:w-24" />
      {icon && (
        <svg width="20" height="20" viewBox="0 0 24 24" className="text-gold shrink-0">
          <path
            d="M12 2l1.6 7.4L21 12l-7.4 2.6L12 22l-1.6-7.4L3 12l7.4-2.6z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      )}
      <span className="rule-gold w-16 sm:w-24" />
    </div>
  )
}
