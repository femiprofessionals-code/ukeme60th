import { event } from '../lib/siteConfig'
import SectionHeading from '../components/SectionHeading'
import WishesPrayerForm from '../components/WishesPrayerForm'
import Sparkles from '../components/Sparkles'

export default function WishesPrayers() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-choco-radial px-5 pb-24 pt-32 sm:px-8">
      <Sparkles className="opacity-50" />
      <div className="relative mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="With Gratitude"
          title={`Messages and Prayers for ${event.honoree.split(' ')[0]}`}
          subtitle={`Share a prayer, blessing, scripture, memory, or birthday message as we celebrate 60 years of grace, family, and gratitude in the life of ${event.honoree}.`}
        />
        <div className="mt-12">
          <WishesPrayerForm />
        </div>
      </div>
    </section>
  )
}
