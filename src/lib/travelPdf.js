import { jsPDF } from 'jspdf'
import { LEGS, GROUPS, NOTES, TRIP } from './travelData'
import { REQUIREMENTS, statusOf, fmt } from './entryRequirements'
import { CORMORANT_600, JOST_400, JOST_600 } from './pdfFonts'

/*
 * The itinerary as a document you can keep.
 *
 * Built as vector text rather than a screenshot of the page, so it stays sharp
 * at any zoom, the text can be searched and copied, and the whole file is
 * around a hundred kilobytes. It is laid out for paper — ivory ground, dark
 * ink, gold hairlines — because the page's black marble would drink a
 * cartridge and read badly printed.
 *
 * Everything comes from the same travelData.js and entryRequirements.js the
 * page uses, so the download cannot drift out of step with the site.
 *
 * This module and its fonts are imported dynamically, so none of it is
 * downloaded until someone asks for the PDF.
 */

/* ------------------------------------------------------------------ paper */

const PAGE = { w: 595.28, h: 841.89 }          // A4 portrait, points
const M = { l: 56, r: 56, t: 62, b: 58 }
const COL = PAGE.w - M.l - M.r

const INK = [26, 23, 18]
const SOFT = [92, 84, 70]
const FAINT = [138, 128, 112]
const GOLD = [166, 124, 46]
const GOLD_PALE = [226, 210, 176]
const PAPER = [251, 247, 239]
const CARD = [246, 240, 228]

const DISPLAY = 'Cormorant'
const BODY = 'Jost'

/* ------------------------------------------------------- drawing helpers */

function makeDoc() {
  const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true })
  doc.addFileToVFS('Cormorant-600.ttf', CORMORANT_600)
  doc.addFont('Cormorant-600.ttf', DISPLAY, 'normal')
  doc.addFileToVFS('Jost-400.ttf', JOST_400)
  doc.addFont('Jost-400.ttf', BODY, 'normal')
  doc.addFileToVFS('Jost-600.ttf', JOST_600)
  doc.addFont('Jost-600.ttf', BODY, 'bold')
  return doc
}

/** Jost has no arrow, so it is drawn: a hairline with a small head. */
function arrow(doc, x, y, len = 14) {
  doc.setDrawColor(...GOLD)
  doc.setLineWidth(0.8)
  doc.line(x, y, x + len, y)
  doc.line(x + len - 4, y - 2.6, x + len, y)
  doc.line(x + len - 4, y + 2.6, x + len, y)
}

/** "Washington → Abu Dhabi" with the arrow drawn rather than set. */
function textWithArrow(doc, str, x, y) {
  const parts = String(str).split('→')
  if (parts.length === 1) { doc.text(str, x, y); return }
  let cx = x
  parts.forEach((part, i) => {
    const t = i === 0 ? part.replace(/\s+$/, '') : part.replace(/^\s+/, '')
    doc.text(t, cx, y)
    cx += doc.getTextWidth(t)
    if (i < parts.length - 1) {
      arrow(doc, cx + 6, y - 3)
      cx += 26
    }
  })
}

/**
 * Letter-spaced small caps, used for every label on the document.
 *
 * Drawn with jsPDF's charSpace rather than one call per character. Setting the
 * letters individually looks identical but writes them as separate runs, and
 * the text then extracts and copies as "U K E M E" — which breaks searching
 * the PDF and reads badly to a screen reader.
 */
function eyebrow(doc, str, x, y, { size = 7.2, color = GOLD, gap = 1.7, align = 'left' } = {}) {
  doc.setFont(BODY, 'bold')
  doc.setFontSize(size)
  doc.setTextColor(...color)
  const s = String(str).toUpperCase()
  // getTextWidth knows nothing about charSpace, so the tracking is added on
  const width = doc.getTextWidth(s) + gap * Math.max(0, s.length - 1)
  const cx = align === 'center' ? x - width / 2 : align === 'right' ? x - width : x
  doc.text(s, cx, y, { charSpace: gap })
  return width
}

function rule(doc, x, y, w, { color = GOLD_PALE, weight = 0.7 } = {}) {
  doc.setDrawColor(...color)
  doc.setLineWidth(weight)
  doc.line(x, y, x + w, y)
}

/* ----------------------------------------------------------- the document */

/** A running state object beats threading `y` and `page` through everything. */
function makeCursor(doc) {
  const st = { y: M.t, page: 1 }

  function paint() {
    doc.setFillColor(...PAPER)
    doc.rect(0, 0, PAGE.w, PAGE.h, 'F')
  }

  return {
    get y() { return st.y },
    set y(v) { st.y = v },
    get page() { return st.page },
    /** Start a new page and reset to the top margin. */
    next() {
      doc.addPage()
      st.page += 1
      paint()
      st.y = M.t
    },
    /** Break if `need` points will not fit, so blocks are not orphaned. */
    room(need) {
      if (st.y + need > PAGE.h - M.b) this.next()
    },
    paint,
  }
}

function cover(doc) {
  doc.setFillColor(...PAPER)
  doc.rect(0, 0, PAGE.w, PAGE.h, 'F')

  // a double hairline border, the way the invitation is framed
  doc.setDrawColor(...GOLD)
  doc.setLineWidth(1.1)
  doc.rect(34, 34, PAGE.w - 68, PAGE.h - 68)
  doc.setDrawColor(...GOLD_PALE)
  doc.setLineWidth(0.6)
  doc.rect(41, 41, PAGE.w - 82, PAGE.h - 82)

  const cx = PAGE.w / 2

  // monogram
  doc.setDrawColor(...GOLD)
  doc.setLineWidth(1)
  doc.circle(cx, 150, 34, 'S')
  doc.setDrawColor(...GOLD_PALE)
  doc.setLineWidth(0.5)
  doc.circle(cx, 150, 39, 'S')
  doc.setFont(DISPLAY, 'normal')
  doc.setFontSize(34)
  doc.setTextColor(...GOLD)
  doc.text('60', cx, 162, { align: 'center' })

  eyebrow(doc, 'Ukeme Falade', cx, 232, { size: 9, color: SOFT, gap: 3.4, align: 'center' })

  doc.setFont(DISPLAY, 'normal')
  doc.setFontSize(44)
  doc.setTextColor(...INK)
  const title = doc.splitTextToSize(TRIP.kicker, COL - 60)
  let ty = 288
  title.forEach((line) => { doc.text(line, cx, ty, { align: 'center' }); ty += 46 })

  rule(doc, cx - 60, ty + 4, 120, { color: GOLD, weight: 0.9 })

  doc.setFont(DISPLAY, 'normal')
  doc.setFontSize(17)
  doc.setTextColor(...SOFT)
  doc.text(TRIP.span, cx, ty + 38, { align: 'center' })

  doc.setFont(BODY, 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(...SOFT)
  const lede = doc.splitTextToSize(TRIP.lede, COL - 96)
  let ly = ty + 76
  lede.forEach((line) => { doc.text(line, cx, ly, { align: 'center' }); ly += 15 })

  // the four counts
  const stats = TRIP.stats
  const boxW = (COL - 60) / stats.length
  const bx = M.l + 30
  const by = ly + 40
  rule(doc, M.l + 30, by - 22, COL - 60, { color: GOLD_PALE })
  stats.forEach((s, i) => {
    const x = bx + boxW * i + boxW / 2
    doc.setFont(DISPLAY, 'normal')
    doc.setFontSize(26)
    doc.setTextColor(...GOLD)
    doc.text(String(s.n), x, by + 12, { align: 'center' })
    eyebrow(doc, s.label, x, by + 28, { size: 6.6, color: FAINT, gap: 1.4, align: 'center' })
  })
  rule(doc, M.l + 30, by + 42, COL - 60, { color: GOLD_PALE })

  doc.setFont(DISPLAY, 'normal')
  doc.setFontSize(13)
  doc.setTextColor(...SOFT)
  doc.text(TRIP.note, cx, by + 80, { align: 'center' })

  eyebrow(doc, 'ukemeturns60.com/travel', cx, PAGE.h - 76, { size: 7, color: FAINT, gap: 2, align: 'center' })
}

function sectionHead(doc, cur, label, title) {
  cur.room(96)
  eyebrow(doc, label, M.l, cur.y, { size: 7 })
  doc.setFont(DISPLAY, 'normal')
  doc.setFontSize(27)
  doc.setTextColor(...INK)
  doc.text(title, M.l, cur.y + 30)
  rule(doc, M.l, cur.y + 42, 54, { color: GOLD, weight: 1 })
  cur.y += 66
}

function departures(doc, cur) {
  sectionHead(doc, cur, 'Before anything else', 'Two departures')
  GROUPS.forEach((g) => {
    doc.setFont(BODY, 'normal')
    doc.setFontSize(9.5)
    const lines = doc.splitTextToSize(g.text, COL - 84)
    cur.room(lines.length * 14 + 22)
    doc.setFillColor(...CARD)
    doc.roundedRect(M.l, cur.y - 12, 62, 18, 3, 3, 'F')
    eyebrow(doc, g.tag, M.l + 8, cur.y, { size: 6.8, color: GOLD, gap: 1.4 })
    doc.setFont(BODY, 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(...INK)
    lines.forEach((line, i) => doc.text(line, M.l + 84, cur.y + i * 14))
    cur.y += Math.max(lines.length * 14, 20) + 16
  })
  cur.y += 6
}

function flightStrip(doc, cur, f) {
  const h = 40
  cur.room(h + 8)
  const y = cur.y
  doc.setFillColor(...CARD)
  doc.roundedRect(M.l + 24, y, COL - 24, h, 4, 4, 'F')

  const inner = M.l + 38
  doc.setFont(BODY, 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...INK)
  doc.text(f.from.code, inner, y + 18)
  doc.setFont(BODY, 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...SOFT)
  doc.text(`${f.from.time} · ${f.from.city}`, inner, y + 30)

  const rightX = PAGE.w - M.r - 14
  doc.setFont(BODY, 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...INK)
  doc.text(f.to.code, rightX, y + 18, { align: 'right' })
  doc.setFont(BODY, 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...SOFT)
  doc.text(`${f.to.time} · ${f.to.city}`, rightX, y + 30, { align: 'right' })

  // the run between them
  const midL = inner + 62
  const midR = rightX - 62
  rule(doc, midL, y + 15, midR - midL, { color: GOLD_PALE, weight: 0.6 })
  arrow(doc, midR - 14, y + 15, 14)
  const mid = (midL + midR) / 2
  eyebrow(doc, f.dur, mid, y + 11, { size: 6.4, color: GOLD, gap: 1.2, align: 'center' })
  if (f.note) eyebrow(doc, f.note, mid, y + 29, { size: 6.2, color: FAINT, gap: 1.2, align: 'center' })

  cur.y += h + 10
}

function leg(doc, cur, l) {
  cur.room(150)

  // header
  eyebrow(doc, l.num ? `Stop ${l.num}` : 'In transit', M.l, cur.y, { size: 6.8 })
  doc.setFont(DISPLAY, 'normal')
  doc.setFontSize(30)
  doc.setTextColor(...INK)
  doc.text(l.name, M.l, cur.y + 32)

  doc.setFont(BODY, 'normal')
  doc.setFontSize(8.6)
  doc.setTextColor(...SOFT)
  doc.text(l.span, PAGE.w - M.r, cur.y + 4, { align: 'right' })
  doc.setFont(BODY, 'bold')
  doc.setTextColor(...GOLD)
  doc.text(l.nights, PAGE.w - M.r, cur.y + 20, { align: 'right' })

  eyebrow(doc, l.place, M.l, cur.y + 46, { size: 6.6, color: FAINT, gap: 1.5 })
  rule(doc, M.l, cur.y + 58, COL, { color: GOLD, weight: 0.8 })
  cur.y += 78

  // where they sleep
  if (l.stay) {
    doc.setFont(BODY, 'normal')
    doc.setFontSize(8.4)
    const addr = doc.splitTextToSize(l.stay.addr, COL - 40)
    const boxH = 71 + addr.length * 11
    cur.room(boxH + 10)
    doc.setFillColor(...CARD)
    doc.roundedRect(M.l, cur.y - 12, COL, boxH, 4, 4, 'F')
    eyebrow(doc, 'Staying at', M.l + 16, cur.y + 4, { size: 6.4, color: FAINT, gap: 1.4 })
    doc.setFont(BODY, 'bold')
    doc.setFontSize(11)
    doc.setTextColor(...INK)
    doc.text(l.stay.name, M.l + 16, cur.y + 21)
    doc.setFont(BODY, 'normal')
    doc.setFontSize(8.4)
    doc.setTextColor(...SOFT)
    addr.forEach((line, i) => doc.text(line, M.l + 16, cur.y + 35 + i * 11))
    const cy = cur.y + 37 + addr.length * 11
    eyebrow(doc, 'Check in', M.l + 16, cy, { size: 6, color: FAINT, gap: 1.2 })
    eyebrow(doc, 'Check out', M.l + COL / 2, cy, { size: 6, color: FAINT, gap: 1.2 })
    doc.setFont(BODY, 'bold')
    doc.setFontSize(8.6)
    doc.setTextColor(...INK)
    doc.text(l.stay.in, M.l + 16, cy + 12)
    doc.text(l.stay.out, M.l + COL / 2, cy + 12)
    cur.y += boxH + 6
  } else {
    doc.setFont(BODY, 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...FAINT)
    doc.text(l.id === 'outbound' ? 'In transit' : 'Accommodation to be confirmed', M.l, cur.y)
    cur.y += 20
  }

  // the line about the leg
  doc.setFont(DISPLAY, 'normal')
  doc.setFontSize(14)
  doc.setTextColor(...SOFT)
  const sum = doc.splitTextToSize(l.summary, COL)
  cur.room(sum.length * 18 + 12)
  sum.forEach((line, i) => doc.text(line, M.l, cur.y + i * 18))
  cur.y += sum.length * 18 + 16

  // day by day
  l.days.forEach((d) => {
    cur.room(52)
    doc.setFillColor(...GOLD)
    doc.circle(M.l + 5, cur.y - 3, 2.2, 'F')

    doc.setFont(BODY, 'bold')
    doc.setFontSize(7.6)
    doc.setTextColor(...GOLD)
    doc.text(`DAY ${String(d.n).padStart(2, '0')}`, M.l + 16, cur.y)
    doc.setFont(BODY, 'normal')
    doc.setTextColor(...FAINT)
    doc.text(`· ${d.when}`, M.l + 52, cur.y)

    doc.setFont(BODY, 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...INK)
    textWithArrow(doc, d.what, M.l + 16, cur.y + 16)
    cur.y += 30

    if (d.detail) {
      doc.setFont(BODY, 'normal')
      doc.setFontSize(8.8)
      doc.setTextColor(...SOFT)
      const det = doc.splitTextToSize(d.detail, COL - 16)
      cur.room(det.length * 12 + 6)
      det.forEach((line, i) => doc.text(line, M.l + 16, cur.y + i * 12))
      cur.y += det.length * 12 + 4
    }
    if (d.flight) flightStrip(doc, cur, d.flight)
    cur.y += 8
  })

  cur.y += 14
}

function paperwork(doc, cur) {
  cur.next()
  sectionHead(doc, cur, 'Paperwork & deadlines', 'Action required')

  doc.setFont(BODY, 'normal')
  doc.setFontSize(8.8)
  doc.setTextColor(...SOFT)
  const note = doc.splitTextToSize(
    'Timings count back from each arrival, and were correct on the day this was made. ' +
    'Every link below is the official site — confirm there, as rules change and depend ' +
    'on your passport and visa type.', COL)
  note.forEach((line, i) => doc.text(line, M.l, cur.y + i * 12))
  cur.y += note.length * 12 + 18

  REQUIREMENTS.forEach((r) => {
    doc.setFont(BODY, 'normal')
    doc.setFontSize(8.6)
    const body = doc.splitTextToSize(r.body, COL - 32)
    const s = statusOf(r)
    // Hong Kong has no deadline of its own, so that line is absent and the
    // card closes up rather than leaving a hole where it would have been
    const hasWhen = statusOf(r).state !== 'none'
    const bodyTop = hasWhen ? 46 : 36
    const cardH = body.length * 12 + (hasWhen ? 66 : 56)
    cur.room(cardH + 12)

    doc.setFillColor(...CARD)
    doc.roundedRect(M.l, cur.y - 14, COL, cardH, 4, 4, 'F')
    doc.setFillColor(...GOLD)
    doc.rect(M.l, cur.y - 14, 2.4, cardH, 'F')

    eyebrow(doc, r.country, M.l + 16, cur.y, { size: 6.6 })
    doc.setFont(BODY, 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...INK)
    doc.text(r.title, M.l + 16, cur.y + 17)

    doc.setFont(BODY, 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...FAINT)
    doc.text(r.arrivalLabel, PAGE.w - M.r - 16, cur.y, { align: 'right' })

    // when it has to happen
    let when = ''
    if (s.state === 'open') when = `Window open now — before ${fmt(s.arrive)}`
    else if (s.state === 'upcoming') when = `Opens ${fmt(s.opens)} — before ${fmt(s.arrive)}`
    else if (s.state === 'anytime') when = `Do this now — needed before ${fmt(s.arrive)}`
    else if (s.state === 'passive') when = 'No action needed in advance'
    if (when) {
      doc.setFont(BODY, 'bold')
      doc.setFontSize(8.2)
      doc.setTextColor(...GOLD)
      doc.text(when, M.l + 16, cur.y + 31)
    }

    doc.setFont(BODY, 'normal')
    doc.setFontSize(8.6)
    doc.setTextColor(...SOFT)
    body.forEach((line, i) => doc.text(line, M.l + 16, cur.y + bodyTop + i * 12))

    if (r.href) {
      const y = cur.y + bodyTop + 2 + body.length * 12
      doc.setFont(BODY, 'bold')
      doc.setFontSize(7.8)
      doc.setTextColor(...GOLD)
      doc.textWithLink(r.href, M.l + 16, y, { url: r.href })
    }
    cur.y += cardH + 8
  })
}

function notes(doc, cur) {
  cur.room(200)
  cur.y += 10
  sectionHead(doc, cur, 'Worth knowing', 'Travel notes')
  NOTES.forEach((n) => {
    doc.setFont(BODY, 'normal')
    doc.setFontSize(8.8)
    const p = doc.splitTextToSize(n.p, COL - 120)
    cur.room(p.length * 12 + 24)
    doc.setFont(BODY, 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...INK)
    doc.text(n.h, M.l, cur.y)
    doc.setFont(BODY, 'normal')
    doc.setFontSize(8.8)
    doc.setTextColor(...SOFT)
    p.forEach((line, i) => doc.text(line, M.l + 120, cur.y + i * 12))
    cur.y += Math.max(p.length * 12, 14) + 14
  })

  // sign off
  cur.room(80)
  cur.y += 16
  rule(doc, M.l, cur.y, COL, { color: GOLD_PALE })
  doc.setFont(DISPLAY, 'normal')
  doc.setFontSize(15)
  doc.setTextColor(...GOLD)
  doc.text('Happy sixtieth, Ukeme.', PAGE.w / 2, cur.y + 28, { align: 'center' })
  eyebrow(doc, 'ukemeturns60.com/travel', PAGE.w / 2, cur.y + 46,
    { size: 6.6, color: FAINT, gap: 1.8, align: 'center' })
}

/** Footer on every page but the cover, numbered from the first content page. */
function stampChrome(doc) {
  const total = doc.getNumberOfPages()
  for (let i = 2; i <= total; i++) {
    doc.setPage(i)
    eyebrow(doc, 'Ukeme Falade · Sixtieth', M.l, PAGE.h - 30, { size: 6.4, color: FAINT, gap: 1.4 })
    doc.setFont(BODY, 'normal')
    doc.setFontSize(7.4)
    doc.setTextColor(...FAINT)
    doc.text(`${i - 1} of ${total - 1}`, PAGE.w - M.r, PAGE.h - 30, { align: 'right' })
    rule(doc, M.l, PAGE.h - 42, COL, { color: [232, 224, 208], weight: 0.5 })
  }
}

/* --------------------------------------------------------------- exported */

export const PDF_FILENAME = 'Ukeme-Falade-60th-Itinerary.pdf'

/** Build the document and hand it to the browser as a download. */
export function downloadItineraryPdf() {
  const doc = makeDoc()

  doc.setProperties({
    title: 'Ukeme Falade · 60th — Travel Itinerary',
    subject: `${TRIP.kicker} · ${TRIP.span}`,
    author: 'ukemeturns60.com',
    keywords: 'itinerary, travel, 60th birthday',
  })

  cover(doc)

  const cur = makeCursor(doc)
  cur.next()

  departures(doc, cur)
  LEGS.forEach((l) => leg(doc, cur, l))
  paperwork(doc, cur)
  notes(doc, cur)
  stampChrome(doc)

  doc.save(PDF_FILENAME)
  return doc.getNumberOfPages()
}
