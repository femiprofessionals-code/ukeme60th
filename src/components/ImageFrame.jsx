// Renders a framed image with a readability gradient and optional caption.
export default function ImageFrame({ src, alt, caption, className = '', ratio = 'aspect-[3/4]' }) {
  return (
    <figure className={`group relative overflow-hidden rounded-xl border border-gold/25 bg-chocolate-card ${ratio} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

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
