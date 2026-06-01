import { event } from '../lib/siteConfig'
import SectionHeading from '../components/SectionHeading'
import RSVPForm from '../components/RSVPForm'
import Sparkles from '../components/Sparkles'

export default function RSVP() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-choco-radial px-5 pb-24 pt-32 sm:px-8">
      <Sparkles className="opacity-50" />
      <div className="relative mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Kindly Respond"
          title="RSVP"
          subtitle={`We would be honored by your presence as we give thanks for 60 years of grace in the life of ${event.honoree}.`}
        />
        <div className="mt-12">
          <RSVPForm />
        </div>
      </div>
    </section>
  )
}
