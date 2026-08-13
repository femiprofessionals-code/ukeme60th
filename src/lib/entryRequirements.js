// ===========================================================================
//  Entry paperwork for the trip.
//
//  PROVENANCE: the requirements below were checked and supplied by the trip
//  organiser, not derived here. Rules change and depend on passport and visa
//  type, so every item links to the official source and the page tells the
//  reader to confirm there before travelling. Do not add an item to this file
//  unless someone has verified it against the official site.
//
//  `opensDaysBefore` drives the countdown: the page works out the window and
//  the urgency from the arrival date, so nothing here goes stale on its own.
// ===========================================================================

/** Arrival dates that paperwork hangs off. Kept here so a date change ripples. */
export const ARRIVALS = {
  jakarta: '2026-08-16',
  singapore: '2026-08-19',
  sydney: '2026-08-20',
  baliMain: '2026-08-22',
  baliSecond: '2026-08-23',
  guangzhou: '2026-08-27',
}

/** Country colour + drawn mark, so each card reads as a place at a glance. */
export const COUNTRIES = {
  'Indonesia':      { key: '#E8543C', tint: 'rgba(232,84,60,.16)',  mark: 'doc' },
  'Singapore':      { key: '#EF5B5B', tint: 'rgba(239,91,91,.16)',  mark: 'card' },
  'Australia':      { key: '#3E86D6', tint: 'rgba(62,134,214,.16)', mark: 'passport' },
  'Hong Kong':      { key: '#D46A93', tint: 'rgba(212,106,147,.14)',mark: 'check' },
  'Mainland China': { key: '#D9434A', tint: 'rgba(217,67,74,.16)',  mark: 'alert' },
}

export const REQUIREMENTS = [
  // ---------------------------------------------------------------- Indonesia
  {
    id: 'id-declaration-1',
    leg: 'jakarta',
    country: 'Indonesia',
    title: 'All Indonesia arrival declaration',
    subtitle: 'First entry — Jakarta',
    body:
      'The electronic customs and health declaration for arrival in Indonesia. ' +
      'It must be completed within the three days before you land.',
    arrival: ARRIVALS.jakarta,
    arrivalLabel: 'Sun 16 Aug · Jakarta (CGK)',
    opensDaysBefore: 3,
    action: 'Complete the declaration',
    href: 'https://allindonesia.beacukai.go.id/',
    severity: 'action',
  },
  {
    id: 'id-declaration-2',
    leg: 'bali',
    country: 'Indonesia',
    title: 'All Indonesia arrival declaration',
    subtitle: 'Second entry — Bali',
    body:
      'You enter Indonesia a second time in Bali, so the declaration has to be ' +
      'done again. The first one does not carry over. Both travelling groups ' +
      'need their own — the main group arrives on the 22nd, the second on the 23rd.',
    arrival: ARRIVALS.baliMain,
    arrivalLabel: 'Sat 22 Aug (main) · Sun 23 Aug (second group) · Bali (DPS)',
    opensDaysBefore: 3,
    action: 'Complete the declaration',
    href: 'https://allindonesia.beacukai.go.id/',
    severity: 'action',
  },
  {
    id: 'id-visa',
    leg: 'bali',
    country: 'Indonesia',
    title: 'Second Indonesian visa may be required',
    subtitle: 'Depends on which visa you hold',
    body:
      'This trip enters Indonesia twice. On a standard single-entry e-VOA the ' +
      'first visa is used up in Jakarta, so a new one is needed before landing ' +
      'in Bali. A multiple-entry visa covers both. Check which one you hold ' +
      'before you fly — this cannot be fixed at the Bali border.',
    arrival: ARRIVALS.baliMain,
    arrivalLabel: 'Needed before Sat 22 Aug',
    opensDaysBefore: null,
    action: 'Check or apply — official e-Visa portal',
    href: 'https://evisa.imigrasi.go.id/',
    severity: 'critical',
  },

  // ---------------------------------------------------------------- Singapore
  {
    id: 'sg-arrival-card',
    leg: 'sydney',
    country: 'Singapore',
    title: 'SG Arrival Card',
    subtitle: 'Only if you clear immigration',
    body:
      'Required if you enter Singapore. Your connection is a short one — SIN ' +
      '10:45 PM to a 12:45 AM departure — so if you stay airside in transit ' +
      'you do not need it. Submit it if there is any chance of leaving the ' +
      'transit area. It is free and takes a few minutes.',
    arrival: ARRIVALS.singapore,
    arrivalLabel: 'Wed 19 Aug · Singapore (SIN)',
    opensDaysBefore: 3,
    action: 'Submit the SG Arrival Card',
    href: 'https://eservices.ica.gov.sg/sgarrivalcard/',
    severity: 'conditional',
  },

  // ---------------------------------------------------------------- Australia
  {
    id: 'au-eta',
    leg: 'sydney',
    country: 'Australia',
    title: 'Australian ETA',
    subtitle: 'Must be granted before you board',
    body:
      'An Electronic Travel Authority has to be held before departure — you ' +
      'will not be allowed to board without one. It is applied for through the ' +
      'Australian ETA app rather than a web form. Approval is usually quick but ' +
      'is not guaranteed to be instant, so do not leave it to the airport.',
    arrival: ARRIVALS.sydney,
    arrivalLabel: 'Thu 20 Aug · Sydney (SYD)',
    opensDaysBefore: null,
    action: 'Apply for the ETA',
    href: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601',
    severity: 'critical',
  },
  {
    id: 'au-ipc',
    leg: 'sydney',
    country: 'Australia',
    title: 'Incoming Passenger Card',
    subtitle: 'Filled in on the plane',
    body:
      'Handed out by cabin crew before landing and given to the border officer ' +
      'on arrival. Declare food, wood, and plant or animal products — Australia ' +
      'enforces this strictly and fines are issued for undeclared items.',
    arrival: ARRIVALS.sydney,
    arrivalLabel: 'Thu 20 Aug · on arrival',
    opensDaysBefore: null,
    action: null,
    href: null,
    severity: 'info',
  },

  // ---------------------------------------------------------------- Hong Kong
  {
    id: 'hk-visa',
    leg: 'guangzhou',
    country: 'Hong Kong',
    title: 'No visitor visa needed',
    subtitle: 'US passport holders',
    body:
      'Hong Kong does not normally require a visitor visa for a US passport ' +
      'holder. Nothing to do in advance for the Hong Kong portion.',
    arrival: null,
    arrivalLabel: 'Sun 30 Aug · Hong Kong (HKG)',
    opensDaysBefore: null,
    action: null,
    href: null,
    severity: 'info',
  },

  // ------------------------------------------------------------------- China
  {
    id: 'cn-entry',
    leg: 'guangzhou',
    country: 'Mainland China',
    title: 'Guangzhou entry — not yet verified',
    subtitle: 'Three nights in mainland China',
    body:
      'The trip lands at Guangzhou on 27 August and stays three nights, which ' +
      'is an entry into mainland China and separate from Hong Kong. This was ' +
      'not covered in the checks supplied, and mainland China has its own visa ' +
      'rules for US passport holders. Confirm what you need before you fly.',
    arrival: ARRIVALS.guangzhou,
    arrivalLabel: 'Thu 27 Aug · Guangzhou (CAN)',
    opensDaysBefore: null,
    action: 'Check with the Chinese embassy',
    href: 'http://us.china-embassy.gov.cn/eng/',
    severity: 'unverified',
  },
]

/**
 * Works out where a requirement stands relative to today.
 * Returns the window, days remaining, and a state the UI colours by.
 */
export function statusOf(req, today = new Date()) {
  const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const now = midnight(today)

  if (!req.arrival) return { state: 'none' }

  const [y, m, d] = req.arrival.split('-').map(Number)
  const arrive = new Date(y, m - 1, d)
  const daysToArrival = Math.round((arrive - now) / 86400000)

  // informational items have no deadline of their own — the arrival line says
  // when they matter, and telling someone to "do this now" would be wrong
  if (!req.action) {
    return { state: daysToArrival < 0 ? 'past' : 'passive', daysToArrival, arrive }
  }

  if (req.opensDaysBefore == null) {
    return {
      state: daysToArrival < 0 ? 'past' : 'anytime',
      daysToArrival,
      arrive,
    }
  }

  const opens = new Date(arrive)
  opens.setDate(opens.getDate() - req.opensDaysBefore)
  const daysToOpen = Math.round((opens - now) / 86400000)

  let state = 'upcoming'
  if (daysToArrival < 0) state = 'past'
  else if (daysToOpen <= 0) state = 'open'

  return { state, opens, arrive, daysToOpen, daysToArrival }
}

export const fmt = (d) =>
  d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

/** The date an item must be finished by — used to order the list. */
export function deadlineOf(req) {
  if (!req.arrival) return Infinity
  const [y, m, d] = req.arrival.split('-').map(Number)
  return new Date(y, m - 1, d).getTime()
}

/** Urgency 0..1 across the two weeks before the deadline, for the meter. */
export function urgencyOf(req, today = new Date()) {
  const s = statusOf(req, today)
  if (!s.arrive || s.state === 'past' || s.state === 'passive') return null
  const days = s.daysToArrival
  if (days <= 0) return 1
  return Math.max(0, Math.min(1, 1 - days / 14))
}
