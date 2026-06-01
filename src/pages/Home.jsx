import { motion } from 'framer-motion'
import { event } from '../lib/siteConfig'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import GoldDivider from '../components/GoldDivider'
import CTAButtons from '../components/CTAButtons'
import DecorativeBorder from '../components/DecorativeBorder'
import Sparkles from '../components/Sparkles'

function SummaryItem({ label, value }) {
  return (
    <div className="text-center">
      <p className="eyebrow mb-1 text-gold/75">{label}</p>
      <p className="display text-lg text-ivory sm:text-xl">{value}</p>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* About / Honoree */}
      <section className="relative bg-chocolate px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="A Thanksgiving" title="More Than a Birthday" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="mt-8 text-center font-body text-base leading-relaxed text-ivory/75 sm:text-lg"
          >
            This milestone is more than a birthday. It is a thanksgiving — a celebration of God's
            faithfulness, a life of love, strength, service, family, and grace.
          </motion.p>
        </div>
      </section>

      {/* Summary card */}
      <section className="relative overflow-hidden bg-choco-radial px-5 py-20 sm:px-8 sm:py-24">
        <Sparkles className="opacity-60" />
        <div className="relative mx-auto max-w-3xl">
          <DecorativeBorder>
            <div className="glass-card rounded-2xl px-6 py-10 sm:px-12">
              <p className="mb-8 text-center eyebrow">You Are Invited</p>
              <div className="grid gap-8 sm:grid-cols-2">
                <SummaryItem label="Date" value={event.dateLabel} />
                <SummaryItem label="Time" value={event.timeLabel} />
                <SummaryItem label="Venue" value={event.venue} />
                <SummaryItem label="Location" value={event.cityShort} />
              </div>
              <GoldDivider className="my-9" />
              <CTAButtons
                buttons={[
                  { label: 'View Event Details', to: '/event-details' },
                  { label: 'RSVP', to: '/rsvp', variant: 'outline' },
                ]}
              />
            </div>
          </DecorativeBorder>
        </div>
      </section>

      {/* Legacy line */}
      <section className="bg-chocolate-deep px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9 }}
            className="display text-2xl leading-relaxed text-ivory/90 sm:text-3xl"
          >
            "Sixty years is a testimony of grace, strength, and divine faithfulness. This celebration
            honors not only a birthday, but a life beautifully marked by love, service, family, and
            thanksgiving."
          </motion.blockquote>
          <GoldDivider className="mt-9" />
        </div>
      </section>
    </>
  )
}
