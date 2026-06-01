import { Link } from 'react-router-dom'

// Renders a row of call-to-action buttons. Each item: { label, to?, href?, variant }
export default function CTAButtons({ buttons = [], className = '' }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      {buttons.map((b, i) => {
        const cls = b.variant === 'outline' ? 'btn-outline' : 'btn-gold'
        if (b.to) {
          return (
            <Link key={i} to={b.to} className={cls}>
              {b.label}
            </Link>
          )
        }
        if (b.href) {
          return (
            <a key={i} href={b.href} target={b.external ? '_blank' : undefined} rel="noreferrer" className={cls}>
              {b.label}
            </a>
          )
        }
        return (
          <button key={i} type="button" onClick={b.onClick} className={cls}>
            {b.label}
          </button>
        )
      })}
    </div>
  )
}
