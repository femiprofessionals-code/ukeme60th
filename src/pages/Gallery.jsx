import { galleryImages } from '../lib/siteConfig'
import SectionHeading from '../components/SectionHeading'
import GalleryGrid from '../components/GalleryGrid'
import Sparkles from '../components/Sparkles'

export default function Gallery() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-chocolate px-5 pb-24 pt-32 sm:px-8">
      <Sparkles className="opacity-40" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="A Life In Pictures"
          title="Gallery"
          subtitle="Moments of grace, joy, and excellence across sixty years of God's faithfulness."
        />
        <div className="mt-14">
          <GalleryGrid images={galleryImages} />
        </div>
      </div>
    </section>
  )
}
