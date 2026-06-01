export default function LoadingButton({ loading, children, className = '', ...props }) {
  return (
    <button
      type={props.type || 'submit'}
      disabled={loading || props.disabled}
      className={`btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          Sending…
        </>
      ) : (
        children
      )}
    </button>
  )
}
