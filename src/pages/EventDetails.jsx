import { motion } from 'framer-motion'
import { event, MAPS_URL } from '../lib/siteConfig'
import { googleCalendarUrl, downloadICS } from '../lib/calendar'
import SectionHeading from '../components/SectionHeading'
import EventDetailsCard from '../components/EventDetailsCard'
import CTAButtons from '../components/CTAButtons'
import GoldDivider from '../components/GoldDivider'
import Sparkles from '../components/Sparkles'

export default function EventDetails() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-choco-radial px-5 pb-24 pt-32 sm:px-8">
      <Sparkles className="opacity-50" />
      <div className="relative mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Join Us"
          title="Event Details"
          subtitle="A joyful gathering of prayer, worship, and celebration, marked by family and gratitude."
        />

        <div className="mt-12">
          <EventDetailsCard />
        </div>

        {/* Calendar + Maps */}
        <div className="mt-10">
          <p className="mb-5 text-center eyebrow text-gold/70">Add To Your Calendar</p>
          <CTAButtons
            buttons={[
              { label: 'Google Calendar', href: googleCalendarUrl(), external: true },
              { label: 'Download .ics', onClick: downloadICS, variant: 'outline' },
            ]}
          />
        </div>

        <GoldDivider className="my-10" />

        <CTAButtons
          buttons={[
            { label: 'Open in Google Maps', href: MAPS_URL, external: true },
            { label: 'RSVP', to: '/rsvp' },
            { label: 'Leave a Message or Prayer', to: '/wishes-prayers', variant: 'outline' },
          ]}
        />

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 rounded-2xl border border-gold/25 bg-gold-soft px-6 py-6 text-center"
        >
          <p className="display text-lg italic leading-relaxed text-ivory/85 sm:text-xl">
            Please arrive early and join us for a joyful time of prayer, worship, and celebration,
            marked by family and gratitude.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
