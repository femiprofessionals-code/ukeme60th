import { event, galleryImages } from '../lib/siteConfig'
import SectionHeading from '../components/SectionHeading'
import WishesPrayerForm from '../components/WishesPrayerForm'
import ImageFrame from '../components/ImageFrame'
import Sparkles from '../components/Sparkles'

export default function WishesPrayers() {
  const portrait = galleryImages[0]

  return (
    <section className="marble relative min-h-screen overflow-hidden bg-choco-radial px-5 pb-24 pt-32 sm:px-8">
      <Sparkles className="opacity-50" />
      <div className="relative mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="With Gratitude"
          title={`Messages and Prayers for ${event.honoree.split(' ')[0]}`}
          subtitle={`Share a prayer, blessing, scripture, memory, or birthday message as we celebrate 60 years of grace, family, and gratitude in the life of ${event.honoree}.`}
        />

        <div className="mx-auto mt-10 w-full max-w-xs">
          <ImageFrame src={portrait.src} alt={portrait.alt} ratio="aspect-[4/5]" />
        </div>

        <div className="mt-12">
          <WishesPrayerForm />
        </div>
      </div>
    </section>
  )
}
