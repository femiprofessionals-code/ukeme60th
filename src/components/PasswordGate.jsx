import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * A passphrase gate for the travel page.
 *
 * WHAT THIS IS AND IS NOT
 * -----------------------
 * This site is a static React bundle with no server, so this gate is a
 * deterrent, not security. It keeps the itinerary away from casual visitors
 * and search engines; it will not stop anyone determined who reads the
 * JavaScript. Two things make it better than the usual version:
 *
 *   1. The passphrase is never in the bundle — only its SHA-256 digest is,
 *      so nobody learns the phrase by reading source.
 *   2. The itinerary is a lazily-imported chunk, so its content is not even
 *      downloaded until the gate opens.
 *
 * If the travel details are genuinely sensitive, move them behind real
 * server-side auth or your host's built-in password protection
 * (Netlify and Vercel both offer it on paid plans).
 */

// SHA-256 of the agreed passphrase.
const DIGEST = '2b6e11c4e109485ebfe925aa9c8f57a8b4d18e179c90defa6272ae11d19cd8aa'
const KEY = 'uk60-travel-unlocked'

async function digest(text) {
  const bytes = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === DIGEST) setUnlocked(true)
    } catch {
      /* private browsing — just show the gate */
    }
  }, [])

  useEffect(() => {
    if (!unlocked) inputRef.current?.focus()
  }, [unlocked])

  async function submit(e) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const entered = await digest(value.trim())
      if (entered === DIGEST) {
        try { sessionStorage.setItem(KEY, DIGEST) } catch { /* ignore */ }
        setUnlocked(true)
      } else {
        setError('That passphrase does not match. Check for stray spaces or capitals.')
        setValue('')
        inputRef.current?.focus()
      }
    } catch {
      setError('This browser could not check the passphrase. Try a different browser.')
    } finally {
      setBusy(false)
    }
  }

  if (unlocked) return children

  return (
    <section className="mx-auto flex min-h-[78vh] max-w-xl flex-col justify-center px-5 pb-24 pt-32 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-gold/20 bg-chocolate-card/70 px-6 py-10 shadow-card sm:px-10"
      >
        <p className="eyebrow text-center">Private</p>
        <h1 className="display mt-4 text-center text-4xl leading-none text-ivory sm:text-5xl">
          The Travel Itinerary
        </h1>
        <div className="rule-gold mx-auto mt-6 w-24" />
        <p className="mx-auto mt-6 max-w-sm text-center text-sm leading-relaxed text-ivory/70">
          This page holds flights, hotels and dates for the family trip. Enter the passphrase
          shared with you to open it.
        </p>

        <form onSubmit={submit} className="mx-auto mt-8 max-w-sm">
          <label htmlFor="passphrase" className="sr-only">Passphrase</label>
          <input
            id="passphrase"
            ref={inputRef}
            type="password"
            value={value}
            autoComplete="current-password"
            onChange={(e) => { setValue(e.target.value); if (error) setError('') }}
            placeholder="Passphrase"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'passphrase-error' : undefined}
            className={`w-full rounded-lg border bg-chocolate-espresso/80 px-4 py-3 text-center font-body tracking-[0.2em] text-ivory placeholder:tracking-normal placeholder:text-ivory/35 focus:outline-none focus:ring-2 focus:ring-gold/60 ${
              error ? 'border-red-400/60' : 'border-gold/25'
            }`}
          />

          {error && (
            <p id="passphrase-error" role="alert" className="mt-3 text-center text-sm text-red-300/90">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !value}
            className="mt-5 w-full rounded-lg bg-gold-gradient px-6 py-3 font-body text-sm font-medium uppercase tracking-[0.22em] text-chocolate-espresso transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? 'Checking…' : 'Open the itinerary'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs leading-relaxed text-ivory/45">
          Trouble getting in? Ask whoever shared the link — the passphrase is case sensitive.
        </p>
      </motion.div>
    </section>
  )
}
