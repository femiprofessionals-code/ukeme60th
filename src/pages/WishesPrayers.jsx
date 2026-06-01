import { event, sampleMessages } from '../lib/siteConfig'
import SectionHeading from '../components/SectionHeading'
import WishesPrayerForm from '../components/WishesPrayerForm'
import MessageWall from '../components/MessageWall'
import GoldDivider from '../components/GoldDivider'
import Sparkles from '../components/Sparkles'

export default function WishesPrayers() {
  return (
    <>
      <section className="relative overflow-hidden bg-choco-radial px-5 pb-16 pt-32 sm:px-8">
        <Sparkles className="opacity-50" />
        <div className="relative mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="With Gratitude"
            title={`Wishes & Prayers for ${event.honoree.split(' ')[0]}`}
            subtitle={`Share a prayer, blessing, scripture, memory, or birthday message as we celebrate 60 years of God's faithfulness in the life of ${event.honoree}.`}
          />
          <div className="mt-12">
            <WishesPrayerForm />
          </div>
        </div>
      </section>

      <section className="bg-chocolate px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="A Wall of Blessings" title="Words of Grace & Gratitude" />
          <GoldDivider className="mb-12 mt-2" icon={false} />
          <MessageWall messages={sampleMessages} />
        </div>
      </section>
    </>
  )
}
