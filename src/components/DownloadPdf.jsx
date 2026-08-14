import { useState } from 'react'

/*
 * Builds the itinerary as a PDF in the browser and hands it over as a
 * download. The generator and its embedded fonts are around 150 KB, so they
 * are imported only when someone actually asks — the page itself never pays
 * for them.
 */

export default function DownloadPdf({ className = '' }) {
  const [state, setState] = useState('idle')   // idle | working | done | error

  async function run() {
    if (state === 'working') return
    setState('working')
    try {
      const { downloadItineraryPdf } = await import('../lib/travelPdf')
      await downloadItineraryPdf()
      setState('done')
      setTimeout(() => setState('idle'), 4000)
    } catch (err) {
      console.error('Could not build the itinerary PDF', err)
      setState('error')
      setTimeout(() => setState('idle'), 6000)
    }
  }

  const label = {
    idle: 'Download the itinerary',
    working: 'Preparing…',
    done: 'Saved to your downloads',
    error: 'Could not build it — try again',
  }[state]

  return (
    <div className={className}>
      <button
        type="button"
        onClick={run}
        className="tv-dl"
        disabled={state === 'working'}
        aria-live="polite"
      >
        <span className={`tv-dl-ic ${state === 'working' ? 'is-busy' : ''}`} aria-hidden="true">
          {state === 'done' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                 strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15" />
            </svg>
          )}
        </span>
        {label}
      </button>
      <p className="tv-dl-note">
        A print-ready PDF — every day, flight, hotel and deadline
      </p>
    </div>
  )
}
