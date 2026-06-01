import { event } from './siteConfig'

// Format an ISO UTC string into the YYYYMMDDTHHMMSSZ form calendars expect.
function toCalStamp(iso) {
  return iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export function googleCalendarUrl() {
  const dates = `${toCalStamp(event.startUTC)}/${toCalStamp(event.endUTC)}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.calendarTitle,
    dates,
    details: event.calendarDescription,
    location: event.calendarLocation,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function buildICS() {
  const stamp = toCalStamp(new Date().toISOString())
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ukeme Falade 60th//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:ukeme-60th-${stamp}@thanksgiving`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toCalStamp(event.startUTC)}`,
    `DTEND:${toCalStamp(event.endUTC)}`,
    `SUMMARY:${event.calendarTitle}`,
    `DESCRIPTION:${event.calendarDescription}`,
    `LOCATION:${event.calendarLocation}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

export function downloadICS() {
  const blob = new Blob([buildICS()], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ukeme-60th-thanksgiving.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
