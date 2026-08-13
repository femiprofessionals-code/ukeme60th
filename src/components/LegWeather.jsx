import { useEffect, useState } from 'react'

/*
 * Projected weather for the days spent in a city.
 *
 * Source: Open-Meteo — free, no API key, CORS-enabled, so it works from a
 * static site with nothing on the server. The forecast horizon is about
 * sixteen days, so days beyond that simply do not come back; the component
 * renders whatever it gets and says nothing about the rest.
 *
 * It fails silently. If the request errors or the network is unavailable the
 * strip does not render at all, because a broken widget is worse than no
 * widget on a page people are relying on for travel information.
 */

const CODES = {
  0: ['Clear', 'sun'], 1: ['Mainly clear', 'sun'], 2: ['Partly cloudy', 'cloud'],
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

function Glyph({ kind }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (kind === 'sun')
    return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="4.2" /><path d="M12 2.4v2.4M12 19.2v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.4 12h2.4M19.2 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" /></svg>
  if (kind === 'cloud')
    return <svg viewBox="0 0 24 24" {...common}><path d="M7.2 18.4h9.9a4 4 0 0 0 .5-8 5.6 5.6 0 0 0-10.7 1.4 3.4 3.4 0 0 0 .3 6.6Z" /></svg>
  if (kind === 'rain')
    return <svg viewBox="0 0 24 24" {...common}><path d="M7.4 14.6h9.4a3.7 3.7 0 0 0 .4-7.4 5.2 5.2 0 0 0-9.9 1.3 3.2 3.2 0 0 0 .1 6.1Z" /><path d="M9 17.6l-.9 2.6M13 17.6l-.9 2.6M17 17.6l-.9 2.6" /></svg>
  if (kind === 'storm')
    return <svg viewBox="0 0 24 24" {...common}><path d="M7.4 14.2h9.4a3.7 3.7 0 0 0 .4-7.4 5.2 5.2 0 0 0-9.9 1.3 3.2 3.2 0 0 0 .1 6.1Z" /><path d="m12.6 16-2.4 3.4h2.9L11.4 22" /></svg>
  return <svg viewBox="0 0 24 24" {...common}><path d="M7.2 15h9.9a4 4 0 0 0 .5-8 5.6 5.6 0 0 0-10.7 1.4A3.4 3.4 0 0 0 7.2 15Z" /><path d="M9 18h.01M12 19.5h.01M15 18h.01" /></svg>
}

export default function LegWeather({ leg }) {
  const [days, setDays] = useState(null)

  useEffect(() => {
    if (!leg?.coords || !leg?.range) { setDays(null); return }

    const key = `uk60-wx-${leg.id}`
    try {
      const hit = JSON.parse(sessionStorage.getItem(key) || 'null')
      // reuse for an hour so switching legs does not re-request
      if (hit && Date.now() - hit.at < 3600e3) { setDays(hit.days); return }
    } catch { /* ignore a bad cache entry */ }

    const ctrl = new AbortController()
    const { lat, lon } = leg.coords
    const [start, end] = leg.range
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
      `&timezone=auto&start_date=${start}&end_date=${end}`

    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((j) => {
        const d = j?.daily
        if (!d?.time?.length) return
        const out = d.time.map((t, i) => ({
          date: t,
          code: d.weather_code?.[i],
          hi: d.temperature_2m_max?.[i],
          lo: d.temperature_2m_min?.[i],
          pop: d.precipitation_probability_max?.[i],
        })).filter((x) => x.hi != null)
        if (!out.length) return
        setDays(out)
        try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), days: out })) } catch { /* full or blocked */ }
      })
      .catch(() => { /* offline, blocked, or out of forecast range — show nothing */ })

    return () => ctrl.abort()
  }, [leg])

  if (!days?.length) return null

  return (
    <section className="tv-wx mt-5 rounded-xl px-4 py-4" aria-label={`Projected weather in ${leg.name}`}>
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="tv-k">Projected weather</h4>
        <span className="tv-wx-src">Updates automatically</span>
      </div>

      <ul className="tv-wx-row mt-3 flex list-none gap-2 overflow-x-auto p-0">
        {days.map((d) => {
          const [label, kind] = CODES[d.code] ?? ['—', 'cloud']
          const day = new Date(d.date + 'T00:00:00')
          return (
            <li key={d.date} className="tv-wx-day shrink-0 rounded-lg px-3 py-3 text-center">
              <div className="tv-wx-dow">{day.toLocaleDateString('en-GB', { weekday: 'short' })}</div>
              <div className="tv-wx-date">{day.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
              <div className="tv-wx-icon mx-auto my-2"><Glyph kind={kind} /></div>
              <div className="tv-wx-temp">
                {Math.round(d.hi)}°<span className="tv-wx-lo"> / {Math.round(d.lo)}°</span>
              </div>
              <div className="tv-wx-label">{label}</div>
              {d.pop != null && <div className="tv-wx-pop">{d.pop}% rain</div>}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
