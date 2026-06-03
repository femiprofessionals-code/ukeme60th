import { useState } from 'react'
import { submitToSheet } from '../lib/submit'
import LoadingButton from './LoadingButton'
import SuccessMessage from './SuccessMessage'
import ErrorMessage from './ErrorMessage'

const empty = {
  fullName: '',
  contact: '',
  guests: '1',
  attendance: 'Yes',
  message: '',
}

const ATTENDANCE = [
  { value: 'Yes', label: 'Yes, joyfully' },
  { value: 'No', label: 'No, with regret' },
  { value: 'Not Sure', label: 'Not sure yet' },
]

export default function RSVPForm() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.fullName.trim() || !form.contact.trim()) {
      setError('Please share your name and a way to reach you.')
      return
    }

    setStatus('loading')
    try {
      await submitToSheet('rsvp', {
        fullName: form.fullName.trim(),
        contact: form.contact.trim(),
        guests: form.guests,
        attendance: form.attendance,
        message: form.message.trim(),
      })
      setStatus('success')
      setForm(empty)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <SuccessMessage>
        Thank you. Your RSVP has been received. We look forward to celebrating this joyful
        milestone with you.
      </SuccessMessage>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="r-name" className="eyebrow mb-2 block text-gold/80">
            Full Name *
          </label>
          <input id="r-name" className="field" value={form.fullName} onChange={update('fullName')} placeholder="Your full name" required />
        </div>
        <div>
          <label htmlFor="r-contact" className="eyebrow mb-2 block text-gold/80">
            Email or Phone *
          </label>
          <input id="r-contact" className="field" value={form.contact} onChange={update('contact')} placeholder="So we can reach you" required />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="r-guests" className="eyebrow mb-2 block text-gold/80">
            Number of Guests
          </label>
          <select id="r-guests" className="field" value={form.guests} onChange={update('guests')}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="r-attend" className="eyebrow mb-2 block text-gold/80">
            Will You Attend?
          </label>
          <select id="r-attend" className="field" value={form.attendance} onChange={update('attendance')}>
            {ATTENDANCE.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="r-msg" className="eyebrow mb-2 block text-gold/80">
          Message to Host <span className="normal-case tracking-normal text-ivory/40">(optional)</span>
        </label>
        <textarea
          id="r-msg"
          rows={4}
          className="field resize-none"
          value={form.message}
          onChange={update('message')}
          placeholder="A note for the family…"
        />
      </div>

      {error && (
        <div className="mt-5">
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      )}

      <div className="mt-7">
        <LoadingButton loading={status === 'loading'}>Send My RSVP</LoadingButton>
      </div>
    </form>
  )
}
