import { motion } from 'framer-motion'
import { event, galleryImages } from '../lib/siteConfig'
import Sparkles from './Sparkles'
import CTAButtons from './CTAButtons'
import CountdownTimer from './CountdownTimer'
import DecorativeBorder from './DecorativeBorder'
import ImageFrame from './ImageFrame'

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  // Lead with the invitation image; fall back to first portrait.
  const heroImg = galleryImages[0]

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-choco-radial px-5 pb-12 pt-28 sm:px-8">
      <Sparkles />
      {/* soft gold radial glows */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-royal/15 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        {/* Text column */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <motion.p custom={0} variants={fade} initial="hidden" animate="show" className="eyebrow mb-5">
            You Are Invited To
          </motion.p>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="display text-4xl font-medium leading-[1.05] text-ivory sm:text-5xl lg:text-6xl"
          >
            {event.honoree}'s
            <span className="block text-foil">Birthday Thanksgiving</span>
          </motion.h1>

          <motion.div
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-5 flex items-center justify-center gap-4 md:justify-start"
          >
            <span className="rule-gold w-10" />
            <span className="display text-2xl italic text-gold-light sm:text-3xl">I'm Turning 60</span>
            <span className="rule-gold w-10" />
          </motion.div>

          <motion.p
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mx-auto mt-7 max-w-md font-body text-sm leading-relaxed text-ivory/70 sm:text-base md:mx-0"
          >
            With hearts full of gratitude, we invite you to join us in celebrating 60 years of life,
            grace, faith, and God's goodness in the life of {event.honoree}.
          </motion.p>

          <motion.div custom={4} variants={fade} initial="hidden" animate="show" className="mt-8">
            <CTAButtons
              className="md:justify-start"
              buttons={[
                { label: 'View Event Details', to: '/event-details' },
                { label: 'Leave a Wish or Prayer', to: '/wishes-prayers', variant: 'outline' },
              ]}
            />
          </motion.div>
        </div>

        {/* Portrait column */}
        <motion.div
          variants={fade}
          custom={2}
          initial="hidden"
          animate="show"
          className="order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-md"
        >
          <div className="animate-floatslow">
            <DecorativeBorder inset className="p-3">
              <ImageFrame
                src={heroImg.src}
                alt={heroImg.alt}
                ratio="aspect-[4/5]"
                className="rounded-lg"
              />
            </DecorativeBorder>
          </div>
        </motion.div>
      </div>

      {/* Countdown band */}
      <motion.div
        variants={fade}
        custom={5}
        initial="hidden"
        animate="show"
        className="relative mt-14 w-full px-1"
      >
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 text-center eyebrow text-gold/70">Counting Down To The Celebration</p>
          <CountdownTimer />
        </div>
      </motion.div>
    </section>
  )
}
