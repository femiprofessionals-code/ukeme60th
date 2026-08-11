// ===========================================================================
//  The travel itinerary shown on /travel.
//
//  Every value here was transcribed from the supplied PDF itinerary. Edit a
//  leg or a day below and the page updates. Each leg holds a `stay` and a list
//  of `days`; each day may carry a `flight` strip.
//
//  `arc` is the angle in degrees around the route circle at which the leg
//  sits, measured clockwise from Washington at the top. It drives the gold
//  progress arc on the chart.
// ===========================================================================

const F = (code, city, time) => ({ code, city, time })

export const TOTAL_DAYS = 17

export const TRIP = {
  span: 'August 14 — 30, 2026',
  kicker: 'East Asia & the Pacific',
  lede:
    'Seventeen days around the world — Washington to Jakarta, Surabaya, Sydney and Bali, ' +
    'then home the long way through Hong Kong and Seoul.',
  note: 'Two departures · one table in Bali',
  stats: [
    { n: 17, label: 'Days' },
    { n: 7, label: 'Cities' },
    { n: 5, label: 'Stays' },
    { n: 9, label: 'Flights' },
  ],
}

export const LEGS = [
  {
    id: 'outbound', num: null, icon: 'plane', name: 'Outbound',
    place: 'Washington · Abu Dhabi', span: 'Fri Aug 14 — Sun Aug 16', nights: '2 days in transit',
    arc: 40, stay: null,
    summary:
      'Two days in the air — Washington to Abu Dhabi, an evening connection, and into Jakarta on Sunday morning.',
    days: [
      { n: 1, when: 'Fri · Aug 14', icon: 'plane', what: 'Washington → Abu Dhabi',
        flight: { from: F('IAD', 'Washington', '3:10 PM'), to: F('AUH', 'Abu Dhabi', '12:15 PM'),
                  dur: 'Overnight', note: 'arrives Sat, Aug 15' }, chip: 'confirmed' },
      { n: 2, when: 'Sat · Aug 15', icon: 'moon', what: 'Abu Dhabi → Jakarta',
        detail: 'An evening connection out of Abu Dhabi.',
        flight: { from: F('AUH', 'Abu Dhabi', '9:25 PM'), to: F('CGK', 'Jakarta', '9:00 AM'),
                  dur: 'Red-eye', note: 'arrives Sun, Aug 16' }, chip: 'confirmed' },
    ],
  },
  {
    id: 'jakarta', num: 1, icon: 'city', name: 'Jakarta',
    place: 'Indonesia', span: 'Sun Aug 16 — Mon Aug 17', nights: '1 night', arc: 68,
    stay: {
      name: 'Four Seasons Hotel Jakarta',
      addr: 'Jalan Jend Gatot Subroto Kav 18, Jakarta 12710',
      in: 'Sun, Aug 16 · 3:00 PM', out: 'Mon, Aug 17 · 12:00 PM',
    },
    summary: 'One night in the capital before the afternoon hop east to Surabaya.',
    days: [
      { n: 3, when: 'Sun · Aug 16', icon: 'plane', what: 'Arrive Jakarta',
        detail: 'Land CGK 9:00 AM · Four Seasons check-in from 3:00 PM', chip: 'confirmed' },
      { n: 4, when: 'Mon · Aug 17', icon: 'bag', what: 'Check out',
        detail: 'Out by 12:00 PM · on to Halim for the afternoon flight', chip: 'confirmed' },
    ],
  },
  {
    id: 'surabaya', num: 2, icon: 'city', name: 'Surabaya',
    place: 'East Java · Indonesia', span: 'Mon Aug 17 — Wed Aug 19', nights: '2 nights', arc: 104,
    stay: {
      name: 'JW Marriott Hotel Surabaya',
      addr: 'Jalan Embong Malang 85–89, Surabaya 60261',
      in: 'Mon, Aug 17 · 2:00 PM', out: 'Wed, Aug 19 · before 12:00 PM',
    },
    summary: 'Two nights in East Java, then an evening flight out through Singapore.',
    days: [
      { n: 4, when: 'Mon · Aug 17', icon: 'plane', what: 'Jakarta → Surabaya',
        detail: 'JW Marriott check-in from 2:00 PM.',
        flight: { from: F('HLP', 'Jakarta Halim', '1:35 PM'), to: F('SUB', 'Surabaya', '3:00 PM'),
                  dur: '1h 25m' }, chip: 'confirmed' },
      { n: 5, when: 'Tue · Aug 18', icon: 'sun', what: 'Surabaya',
        detail: 'Full day · JW Marriott Surabaya', chip: 'confirmed' },
      { n: 6, when: 'Wed · Aug 19', icon: 'plane', what: 'Surabaya → Singapore',
        detail: 'Check out before 12:00 PM.',
        flight: { from: F('SUB', 'Surabaya', '7:15 PM'), to: F('SIN', 'Singapore', '10:45 PM'),
                  dur: '3h 30m' }, chip: 'confirmed' },
    ],
  },
  {
    id: 'sydney', num: 3, icon: 'city', name: 'Sydney',
    place: 'The Rocks · Australia', span: 'Thu Aug 20 — Sat Aug 22', nights: '2 nights', arc: 158,
    stay: {
      name: 'Shangri-La Sydney',
      addr: '176 Cumberland Street, The Rocks, NSW · +61 2 9250 6111',
      in: 'Thu, Aug 20 · 3:00 PM', out: 'Sat, Aug 22 · 11:00 AM',
    },
    summary: 'A late connection in Singapore, a red-eye south, and two nights over the harbour.',
    days: [
      { n: 6, when: 'Wed · Aug 19', icon: 'moon', what: 'Singapore',
        detail: 'Land SIN 10:45 PM · a late connection straight through to Sydney', chip: 'confirmed' },
      { n: 7, when: 'Thu · Aug 20', icon: 'plane', what: 'Arrive Sydney',
        detail: 'Shangri-La check-in from 3:00 PM.',
        flight: { from: F('SIN', 'Singapore', '12:45 AM'), to: F('SYD', 'Sydney', '10:25 AM'),
                  dur: '7h 40m', note: 'red-eye' }, chip: 'confirmed' },
      { n: 8, when: 'Fri · Aug 21', icon: 'sun', what: 'Sydney',
        detail: 'Full day · Shangri-La, The Rocks', chip: 'confirmed' },
      { n: 9, when: 'Sat · Aug 22', icon: 'plane', what: 'Sydney → Bali',
        detail: 'Check out 11:00 AM.',
        flight: { from: F('SYD', 'Sydney', '5:45 PM'), to: F('DPS', 'Bali', '10:30 PM'),
                  dur: '6h 45m' }, chip: 'confirmed' },
    ],
  },
  {
    id: 'bali', num: 4, icon: 'people', name: 'Bali',
    place: 'Denpasar · Indonesia', span: 'Sat Aug 22 — Thu Aug 27', nights: '5 nights', arc: 205,
    stay: null,
    summary: 'Five nights, everyone together — the two departures converge in Bali on Aug 22–23.',
    days: [
      { n: 9, when: 'Sat · Aug 22', icon: 'plane', what: 'First group arrives',
        detail: 'The second group leaves Washington at 1:50 AM for Taipei — 15h 55m in the air.',
        flight: { from: F('SYD', 'Sydney', '5:45 PM'), to: F('DPS', 'Bali', '10:30 PM'),
                  dur: '6h 45m' }, chip: 'confirmed' },
      { n: 10, when: 'Sun · Aug 23', icon: 'people', what: 'Second group lands — everyone together',
        flight: { from: F('TPE', 'Taipei', '9:50 AM'), to: F('DPS', 'Bali', '3:15 PM'),
                  dur: '5h 25m', note: 'group complete' }, chip: 'confirmed', star: true },
      { n: 11, when: 'Mon · Aug 24', icon: 'sun', what: 'Bali', detail: 'Full day, all together', chip: 'confirmed' },
      { n: 12, when: 'Tue · Aug 25', icon: 'sun', what: 'Bali', detail: 'Full day, all together', chip: 'confirmed' },
      { n: 13, when: 'Wed · Aug 26', icon: 'moon', what: 'Last full day',
        detail: 'A midnight departure ahead — wheels up 12:40 AM on Thursday', chip: 'confirmed' },
    ],
  },
  {
    id: 'guangzhou', num: 5, icon: 'city', name: 'Guangzhou',
    place: 'Guangdong · China', span: 'Thu Aug 27 — Sun Aug 30', nights: '3 nights', arc: 248,
    stay: {
      name: 'Rosewood Guangzhou',
      addr: 'Guangzhou, Guangdong · ground transfer to Hong Kong for the flight home',
      in: 'Thu, Aug 27 · from 5:55 AM', out: 'Sun, Aug 30 · 12:45 AM departure',
    },
    summary: 'Three nights in Guangzhou, then the long way home through Hong Kong and Seoul.',
    days: [
      { n: 14, when: 'Thu · Aug 27', icon: 'plane', what: 'Arrive Guangzhou',
        flight: { from: F('DPS', 'Bali', '12:40 AM'), to: F('CAN', 'Guangzhou', '5:55 AM'),
                  dur: '5h 15m' }, chip: 'confirmed' },
      { n: 15, when: 'Fri · Aug 28', icon: 'sun', what: 'Guangzhou',
        detail: 'Full day · Rosewood Guangzhou', chip: 'confirmed' },
      { n: 16, when: 'Sat · Aug 29', icon: 'sun', what: 'Guangzhou',
        detail: 'Full day · Rosewood Guangzhou', chip: 'confirmed' },
      { n: 17, when: 'Sun · Aug 30', icon: 'home', what: 'Hong Kong → Seoul → home',
        detail: 'Ground transfer to Hong Kong, then home through Seoul.',
        flight: { from: F('HKG', 'Hong Kong', '12:45 AM'), to: F('IAD', 'Washington', '11:15 AM'),
                  dur: 'via Seoul', note: 'lands same day' }, chip: 'confirmed' },
    ],
  },
]

export const GROUPS = [
  { tag: 'Main',
    text: 'Leaves Washington Aug 14 via Abu Dhabi, then Jakarta, Surabaya and Sydney — into Bali on Aug 22.' },
  { tag: 'Second',
    text: 'Leaves Washington Aug 22 at 1:50 AM via Taipei — lands Bali Aug 23 at 3:15 PM.' },
]

export const NOTES = [
  { h: 'Documents',
    p: 'Passports valid 6+ months past return. Check visa and transit rules for Indonesia, Australia, Taiwan transit, mainland China (Guangzhou entry) and Hong Kong.' },
  { h: 'Weather',
    p: 'Tropical heat and humidity in Indonesia and Bali; Sydney is late winter — pack layers and a warm jacket for Aug 20–22.' },
  { h: 'Money & power',
    p: 'Five currencies en route — rupiah, Singapore and Australian dollars, HK dollars, won. A universal adapter covers the four plug standards.' },
  { h: 'Packing',
    p: 'Offline maps for each city, meds and chargers in carry-on for the long legs, one warm layer accessible for Sydney and the red-eyes.' },
]
