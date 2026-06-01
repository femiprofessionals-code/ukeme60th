// ===========================================================================
//  EDIT EVERYTHING HERE.  All event content for the site lives in this file.
//  Change a value here and it updates everywhere on the website.
// ===========================================================================

export const event = {
  honoree: 'Ukeme Falade',
  title: "Ukeme Falade's Birthday Thanksgiving",
  theme: "I'm Turning 60",
  milestone: 60,

  dateLabel: 'Sunday, September 27, 2026',
  timeLabel: '12:00 PM ET – 1:00 PM ET',

  venue: 'RCCG Word of Life Center',
  addressLine: '11313 Lockwood Dr, Silver Spring, MD 20904',
  cityShort: 'Silver Spring, Maryland',

  // ISO start/end. ET on Sep 27, 2026 is EDT (UTC-4).
  // 12:00 PM EDT == 16:00 UTC,  1:00 PM EDT == 17:00 UTC.
  startUTC: '2026-09-27T16:00:00Z',
  endUTC: '2026-09-27T17:00:00Z',

  calendarTitle: "Ukeme Falade's Birthday Thanksgiving",
  calendarDescription:
    "Join us for Ukeme Falade's 60th Birthday Thanksgiving — a joyful celebration of life, grace, faith, and God's goodness.",
  calendarLocation: 'RCCG Word of Life Center, 11313 Lockwood Dr, Silver Spring, MD 20904',
}

// Google Apps Script Web App URL (see README for setup).
export const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

// Google Maps link for the venue.
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('RCCG Word of Life Center, 11313 Lockwood Dr, Silver Spring, MD 20904')

// ---------------------------------------------------------------------------
//  Gallery images. Replace the files in /public/images with the same names,
//  or change the src strings below. The invitation image leads the set.
// ---------------------------------------------------------------------------
export const galleryImages = [
  {
    src: '/images/invitation.jpg',
    alt: 'Ukeme Falade 60th birthday thanksgiving invitation',
    caption: 'You Are Invited',
    feature: true,
  },
  {
    src: '/images/ukeme-1.jpg',
    alt: 'Ukeme Falade celebration portrait',
    caption: 'A Life of Grace',
  },
  {
    src: '/images/ukeme-2.jpg',
    alt: 'Ukeme Falade birthday thanksgiving image',
    caption: '60 Years of Thanksgiving',
  },
  {
    src: '/images/ukeme-3.jpg',
    alt: 'Ukeme Falade family and legacy image',
    caption: 'Family, Faith & Legacy',
  },
  {
    src: '/images/ukeme-4.jpg',
    alt: 'Ukeme Falade milestone celebration image',
    caption: "A Celebration of God's Faithfulness",
  },
  {
    src: '/images/ukeme-5.jpg',
    alt: 'Ukeme Falade elegant portrait',
    caption: 'Grace, Joy & Excellence',
  },
]

// ---------------------------------------------------------------------------
//  Sample approved messages for the Wishes & Prayers wall. Replace or connect
//  to a live datastore later (see WishesPrayers page + README).
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
    type: 'Birthday Wish',
    message:
      'Happy 60th, Mummy. You taught us faith before you taught us anything else. We thank God for the gift of your love and your prayers over our lives.',
  },
  {
    name: 'Deacon Samuel I.',
    relationship: 'Family Friend',
    type: 'Prayer',
    message:
      'Father, we thank You for sixty years of grace. Crown these years with long life, deeper joy, and the continued favor of Heaven. In Jesus name, amen.',
  },
  {
    name: 'Aunty Ruth',
    relationship: 'Sister',
    type: 'Memory',
    message:
      'I still remember your quiet kindness when we had nothing but each other. You have always carried light into every room. Sixty years and still shining.',
  },
  {
    name: 'The Adeyemi Family',
    relationship: 'Church Family',
    type: 'Thanksgiving Note',
    message:
      'We give thanks for a life of service and humility. The Word of Life Center is richer for your faithfulness. Congratulations on this beautiful milestone.',
  },
  {
    name: 'Daniel K.',
    relationship: 'Nephew',
    type: 'Birthday Wish',
    message:
      'To the one who prays for all of us by name — happy 60th. May the God you serve so faithfully fill these new years with peace and gladness.',
  },
]
