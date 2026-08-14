import { WxGlyph, dateForDay } from './LegWeather'

/*
 * The weather laid over the destination scene, so the illustration and the
 * forecast are one panel rather than two things near each other.
 *
 * Big temperature, the condition in words, and the days of the stay along the
 * bottom. If the forecast has not arrived — offline, or past the roughly
 * sixteen-day horizon — the scene simply shows without it.
 */

const CODES = {
  0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Rime fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  56: 'Freezing drizzle', 57: 'Freezing drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  66: 'Freezing rain', 67: 'Freezing rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains',
  80: 'Showers', 81: 'Showers', 82: 'Heavy showers',
  85: 'Snow showers', 86: 'Snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm',
}
const KIND = {
  0: 'sun', 1: 'sun', 2: 'partly', 3: 'cloud', 45: 'cloud', 48: 'cloud',
  51: 'rain', 53: 'rain', 55: 'rain', 56: 'rain', 57: 'rain',
  61: 'rain', 63: 'rain', 65: 'rain', 66: 'rain', 67: 'rain',
  71: 'snow', 73: 'snow', 75: 'snow', 77: 'snow',
  80: 'rain', 81: 'rain', 82: 'rain', 85: 'snow', 86: 'snow',
  95: 'storm', 96: 'storm', 99: 'storm',
}

export default function WeatherHero({ leg, wx }) {
  // the days of this stay that actually have a forecast
  const days = leg.days
    .map((d) => ({ n: d.n, iso: dateForDay(d.n), f: wx[dateForDay(d.n)] }))
    .filter((d, i, arr) => d.f && arr.findIndex((x) => x.iso === d.iso) === i)

  if (!days.length) return null

  const lead = days[0].f
  const label = CODES[lead.code] ?? ''
  const kind = KIND[lead.code] ?? 'cloud'

  return (
    <div className="tv-wxhero">
      <div className="tv-wxhero-top">
        <div className="tv-wxhero-now">
          <span className="tv-wxhero-ic"><WxGlyph kind={kind} /></span>
          <span className="tv-wxhero-deg">{Math.round(lead.hi)}°<i className="tv-wxhero-u">F</i></span>
        </div>
        <div className="tv-wxhero-meta">
          <span className="tv-wxhero-cond">{label}</span>
          <span className="tv-wxhero-range">
            Low {Math.round(lead.lo)}°F
            {lead.pop != null && ` · ${lead.pop}% rain`}
          </span>
        </div>
      </div>

      <ul className="tv-wxhero-days">
        {days.map((d) => {
          const dt = new Date(d.iso + 'T00:00:00')
          return (
            <li key={d.iso}>
              <span className="tv-wxhero-dow">
                {dt.toLocaleDateString('en-GB', { weekday: 'short' })}
              </span>
              <span className="tv-wxhero-dic"><WxGlyph kind={KIND[d.f.code] ?? 'cloud'} /></span>
              <span className="tv-wxhero-dt">{Math.round(d.f.hi)}°</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
