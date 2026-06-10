// ===========================================================================
//  EDIT EVERYTHING HERE.  All event content for the site lives in this file.
//  Change a value here and it updates everywhere on the website.
// ===========================================================================

export const event = {
  honoree: 'Ukeme Falade',
  title: "Ukeme Falade's 60th Birthday",
  theme: 'Turning 60',
  tagline: 'A Birthday Marked by Family and Gratitude',
  milestone: 60,

  dateLabel: 'Sunday, September 27, 2026',
  timeLabel: '10:00 AM ET',

  venue: 'RCCG Word of Life Center',
  addressLine: '11313 Lockwood Dr, Silver Spring, MD 20904',
  cityShort: 'Silver Spring, Maryland',

  // ISO start/end. ET on Sep 27, 2026 is EDT (UTC-4).
  // 10:00 AM EDT == 14:00 UTC,  1:00 PM EDT == 17:00 UTC.
  startUTC: '2026-09-27T14:00:00Z',
  endUTC: '2026-09-27T17:00:00Z',

  calendarTitle: "Ukeme Falade's 60th Birthday",
  calendarDescription:
    "Join us for Ukeme Falade's 60th Birthday, a joyful celebration of 60 years of life, grace, and faith, marked by family and gratitude.",
  calendarLocation: 'RCCG Word of Life Center, 11313 Lockwood Dr, Silver Spring, MD 20904',
}

// Google Apps Script Web App URL (see README for setup).
export const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

// Google Maps link for the venue.
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('RCCG Word of Life Center, 11313 Lockwood Dr, Silver Spring, MD 20904')

// ---------------------------------------------------------------------------
//  Gallery. A single featured portrait (the black-dress photo). This same
//  image is used on the home hero. To swap it, change the one src below and
//  drop the matching file into /public/images.
// ---------------------------------------------------------------------------
export const galleryImages = [
  {
    src: '/images/ukeme-falade.jpg',
    alt: 'Ukeme Falade in her black dress',
    caption: 'Turning 60',
    feature: true,
  },
]

// ---------------------------------------------------------------------------
//  Approved messages shown on the Messages and Prayers wall. Edit, add, or
//  remove freely. (See WishesPrayers page + README to connect a live source.)
// ---------------------------------------------------------------------------
export const sampleMessages = [
  {
    name: 'Pastor Emmanuel A.',
    relationship: 'Pastor',
    type: 'Scripture',
    message:
      '"The righteous shall flourish like the palm tree." Your life is the living proof of that promise, Ukeme. Sixty years of fruit, all to the glory of God.',
  },
  {
    name: 'Grace O.',
    relationship: 'Daughter',
    type: 'Birthday Message',
    message:
      'Happy 60th, Mummy. You taught us faith before you taught us anything else. We celebrate the gift of your love, your wisdom, and your prayers over our lives.',
  },
  {
    name: 'Deacon Samuel I.',
    relationship: 'Family Friend',
    type: 'Prayer',
    message:
      'Father, we honor You for sixty years of grace over Ukeme. Crown these new years with long life, deeper joy, and the continued favor of Heaven. In Jesus name, amen.',
  },
  {
    name: 'Aunty Ruth',
    relationship: 'Sister',
    type: 'Memory',
    message:
      'I still remember your quiet kindness when we had little more than each other. You have always carried light into every room. Sixty years, and still shining.',
  },
  {
    name: 'The Adeyemi Family',
    relationship: 'Church Family',
    type: 'Note of Gratitude',
    message:
      'We are grateful for a life of service and humility. Our church family is richer for your faithfulness. Congratulations on this beautiful milestone, with love.',
  },
  {
    name: 'Daniel K.',
    relationship: 'Nephew',
    type: 'Birthday Message',
    message:
      'To the one who prays for all of us by name, happy 60th. May the God you serve so faithfully fill these years ahead with peace, family, and gladness.',
  },
]
