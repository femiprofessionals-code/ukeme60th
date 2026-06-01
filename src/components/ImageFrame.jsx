import { useState } from 'react'

// Renders an image; if the file is missing it shows an elegant gold
// placeholder so the layout never breaks before photos are added.
export default function ImageFrame({ src, alt, caption, className = '', ratio = 'aspect-[3/4]' }) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className={`group relative overflow-hidden rounded-xl border border-gold/25 bg-chocolate-card ${ratio} ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-choco-radial p-6 text-center">
          <svg width="34" height="34" viewBox="0 0 24 24" className="mb-3 text-gold/60">
            <path d="M12 2l1.6 7.4L21 12l-7.4 2.6L12 22l-1.6-7.4L3 12l7.4-2.6z" fill="currentColor" />
          </svg>
          <p className="eyebrow text-gold/60">Photo</p>
          <p className="mt-1 font-body text-[11px] text-ivory/40">{alt}</p>
        </div>
      )}

      {/* readability gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-chocolate-espresso/85 via-transparent to-transparent" />

      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 p-5">
          <span className="display text-lg text-ivory drop-shadow sm:text-xl">{caption}</span>
        </figcaption>
      )}
    </figure>
  )
}
