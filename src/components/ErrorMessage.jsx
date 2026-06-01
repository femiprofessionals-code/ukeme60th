export default function ErrorMessage({ children }) {
  if (!children) return null
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-950/30 px-4 py-3 font-body text-sm text-red-200"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7v6M12 16.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span>{children}</span>
    </div>
  )
}
