// ===========================================================================
//  Photographs for the leg backdrops.
//
//  Drop image files into src/assets/places/ and they appear on the site. No
//  code change, no list to keep in step — Vite picks up whatever is in the
//  folder at build time, hashes it, and serves it.
//
//  NAME THE FILE AFTER THE LEG, and add anything you like after a dash:
//
//      jakarta.jpg                 -> Jakarta
//      jakarta-monas.jpg           -> Jakarta, captioned "Monas"
//      sydney-opera-house.jpg      -> Sydney, captioned "Opera House"
//      bali-1.jpg, bali-2.jpg      -> Bali, two photographs, no caption
//
//  The leg ids are: outbound, jakarta, surabaya, sydney, bali, guangzhou.
//
//  As soon as one photograph exists for a leg, that leg's backdrop uses
//  photographs only — the drawn scenes are not mixed in with them. Legs with
//  no photograph keep their drawings, so this can be done a country at a time.
// ===========================================================================

const FILES = import.meta.glob(
  '../assets/places/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' },
)

/** "opera-house" -> "Opera House"; digits alone are treated as no caption. */
function captionFrom(rest) {
  if (!rest || /^\d+$/.test(rest)) return null
  return rest
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => (w.length <= 2 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(' ')
}

/** { legId: [{ id, name, photo }] }, ordered by filename so it is predictable. */
export const PHOTOS = (() => {
  const byLeg = {}
  for (const path of Object.keys(FILES).sort()) {
    const file = path.split('/').pop()
    const base = file.replace(/\.[^.]+$/, '')
    const dash = base.indexOf('-')
    const leg = (dash === -1 ? base : base.slice(0, dash)).toLowerCase()
    const caption = captionFrom(dash === -1 ? '' : base.slice(dash + 1))
    ;(byLeg[leg] ||= []).push({ id: `photo-${base}`, name: caption, photo: FILES[path] })
  }
  return byLeg
})()

/**
 * What the backdrop should show for a leg: its photographs if any have been
 * added, otherwise the drawn scenes from travelData.
 */
export function backdropFor(leg) {
  const shot = PHOTOS[leg.id]
  if (shot?.length) return shot.map((p) => ({ ...p, name: p.name ?? leg.name }))
  return leg.places ?? []
}
