import { useEffect, useState } from 'react'

/*
 * Projected weather, attached to individual days.
 *
 * Source: Open-Meteo — free, no API key, CORS-enabled, so it works from a
 * static site with nothing on the server. One request per leg; the result is
 * keyed by date so each day row can pull its own.
 *
 * It fails silently. If the request errors, or a date is past the forecast
 * horizon (about sixteen days), that day simply shows nothing — a broken or
 * guessed forecast is worse than none on a page people are trusting.
 */

const CODES = {
  0: ['Clear', 'sun'], 1: ['Mainly clear', 'sun'], 2: ['Partly cloudy', 'partly'],
  3: ['Overcast', 'cloud'], 45: ['Fog', 'cloud'], 48: ['Rime fog', 'cloud'],
  51: ['Light drizzle', 'rain'], 53: ['Drizzle', 'rain'], 55: ['Heavy drizzle', 'rain'],
  56: ['Freezing drizzle', 'rain'], 57: ['Freezing drizzle', 'rain'],
  61: ['Light rain', 'rain'], 63: ['Rain', 'rain'], 65: ['Heavy rain', 'rain'],
  66: ['Freezing rain', 'rain'], 67: ['Freezing rain', 'rain'],
  71: ['Light snow', 'snow'], 73: ['Snow', 'snow'], 75: ['Heavy snow', 'snow'],
  77: ['Snow grains', 'snow'],
  80: ['Showers', 'rain'], 81: ['Showers', 'rain'], 82: ['Heavy showers', 'rain'],
  85: ['Snow showers', 'snow'], 86: ['Snow showers', 'snow'],
  95: ['Thunderstorm', 'storm'], 96: ['Thunderstorm', 'storm'], 99: ['Thunderstorm', 'storm'],
}

const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function WxGlyph({ kind }) {
  if (kind === 'sun')
    return <svg viewBox="0 0 24 24"><circle {...P} cx="12" cy="12" r="4.2" /><path {...P} d="M12 2.6v2.2M12 19.2v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.4 19.6 6 18M18 6l1.6-1.6" /></svg>
  if (kind === 'partly')
    return <svg viewBox="0 0 24 24"><circle {...P} cx="9" cy="8.6" r="3.2" /><path {...P} d="M9 2.6v1.6M3.6 8.6H2M4.9 4.5 3.8 3.4M13.1 4.5l1.1-1.1" /><path {...P} d="M9.4 19.6h8.4a3.4 3.4 0 0 0 .4-6.8 4.8 4.8 0 0 0-9.1 1.2 2.9 2.9 0 0 0 .3 5.6Z" /></svg>
  if (kind === 'rain')
    return <svg viewBox="0 0 24 24"><path {...P} d="M7.4 14.4h9.4a3.7 3.7 0 0 0 .4-7.4 5.2 5.2 0 0 0-9.9 1.3 3.2 3.2 0 0 0 .1 6.1Z" /><path {...P} d="M9.2 17.4 8.4 20M13 17.4l-.8 2.6M16.8 17.4l-.8 2.6" /></svg>
  if (kind === 'storm')
    return <svg viewBox="0 0 24 24"><path {...P} d="M7.4 13.8h9.4a3.7 3.7 0 0 0 .4-7.4 5.2 5.2 0 0 0-9.9 1.3 3.2 3.2 0 0 0 .1 6.1Z" /><path {...P} d="m12.8 15.6-2.6 3.6h3.1L11.6 22" /></svg>
  if (kind === 'snow')
    return <svg viewBox="0 0 24 24"><path {...P} d="M7.4 14.4h9.4a3.7 3.7 0 0 0 .4-7.4 5.2 5.2 0 0 0-9.9 1.3 3.2 3.2 0 0 0 .1 6.1Z" /><path {...P} d="M9 18h.01M12.2 19.6h.01M15.4 18h.01" /></svg>
  return <svg viewBox="0 0 24 24"><path {...P} d="M7.2 17.4h9.9a4 4 0 0 0 .5-8 5.6 5.6 0 0 0-10.7 1.4 3.4 3.4 0 0 0 .3 6.6Z" /></svg>
}

/** ISO date for a trip day number. Day 1 is 14 Aug 2026. */
export const dateForDay = (n) => `2026-08-${String(13 + n).padStart(2, '0')}`

/**
 * One request per leg, returning { [isoDate]: {code, hi, lo, pop} }.
 * Returns an empty object until it resolves, and stays empty if it cannot.
 */
export function useLegWeather(leg) {
  const [byDate, setByDate] = useState({})

  useEffect(() => {
    setByDate({})
    if (!leg?.coords || !leg?.range) return

    const key = `uk60-wx-f-${leg.id}`
    try {
      const hit = JSON.parse(sessionStorage.getItem(key) || 'null')
      if (hit && Date.now() - hit.at < 3600e3) { setByDate(hit.byDate); return }
    } catch { /* ignore a bad cache entry */ }

    const ctrl = new AbortController()
    const { lat, lon } = leg.coords
    const [start, end] = leg.range
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
      `&temperature_unit=fahrenheit&timezone=auto&start_date=${start}&end_date=${end}`

    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((j) => {
        const d = j?.daily
        if (!d?.time?.length) return
        const map = {}
        d.time.forEach((t, i) => {
          if (d.temperature_2m_max?.[i] == null) return
          map[t] = {
            code: d.weather_code?.[i],
            hi: d.temperature_2m_max[i],
            lo: d.temperature_2m_min?.[i],
            pop: d.precipitation_probability_max?.[i],
          }
        })
        if (!Object.keys(map).length) return
        setByDate(map)
        try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), byDate: map })) } catch { /* ignore */ }
      })
      .catch(() => { /* offline, blocked, or beyond the forecast — show nothing */ })

    return () => ctrl.abort()
  }, [leg])

  return byDate
}

/** The chip that sits on a day row. Renders nothing without a forecast. */
export default function DayWeather({ wx }) {
  if (!wx) return null
  const [label, kind] = CODES[wx.code] ?? ['—', 'cloud']
  return (
    <span className="tv-daywx" title={`${label} · high ${Math.round(wx.hi)}°F, low ${Math.round(wx.lo)}°F`}>
      <span className="tv-daywx-ic"><WxGlyph kind={kind} /></span>
      <span className="tv-daywx-t">{Math.round(wx.hi)}°</span>
      <span className="tv-daywx-lo">{Math.round(wx.lo)}°</span>
      {wx.pop != null && wx.pop >= 30 && <span className="tv-daywx-pop">{wx.pop}%</span>}
      <span className="sr-only"> — {label}</span>
    </span>
  )
}
