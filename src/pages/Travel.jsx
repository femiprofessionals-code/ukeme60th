import { Suspense, lazy } from 'react'
import PasswordGate from '../components/PasswordGate'

/**
 * The itinerary is loaded lazily and only after the gate opens, so its
 * content ships as a separate chunk that is never fetched by a visitor who
 * does not have the passphrase.
 */
const TravelItinerary = lazy(() => import('../components/TravelItinerary'))

function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="eyebrow">Opening the itinerary…</p>
    </div>
  )
}

export default function Travel() {
  return (
    <PasswordGate>
      <Suspense fallback={<Loading />}>
        <TravelItinerary />
      </Suspense>
    </PasswordGate>
  )
}
