import { GOOGLE_SCRIPT_URL } from './siteConfig'

// Submits a payload to the Google Apps Script web app.
// `formType` must be "rsvp" or "wish" to route to the correct sheet tab.
//
// Apps Script web apps do not return CORS headers for cross-origin fetches,
// so we send the request and treat a completed network call as success.
// Using `text/plain` avoids a CORS preflight, letting the request go through.
export async function submitToSheet(formType, data) {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error(
      'Submission endpoint is not configured. Add VITE_GOOGLE_SCRIPT_URL to your .env file.'
    )
  }

  const payload = JSON.stringify({ formType, ...data })

  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: payload,
    redirect: 'follow',
  })

  if (!res.ok) {
    throw new Error('The server returned an error. Please try again.')
  }

  // Apps Script returns JSON; parse if available, otherwise assume success.
  try {
    const json = await res.json()
    if (json && json.success === false) {
      throw new Error(json.message || 'Submission failed.')
    }
    return json
  } catch {
    return { success: true }
  }
}
