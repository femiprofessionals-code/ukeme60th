import { useState } from 'react'
import { submitToSheet } from '../lib/submit'
import LoadingButton from './LoadingButton'
import SuccessMessage from './SuccessMessage'
import ErrorMessage from './ErrorMessage'

const MESSAGE_TYPES = ['Birthday Message', 'Prayer', 'Scripture', 'Memory', 'Note of Gratitude']

const empty = {
  name: '',
  relationship: '',
  messageType: 'Birthday Message',
  message: '',
  displayPublicly: true,
}

export default function WishesPrayerForm() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.message.trim()) {
      setError('Please share your name and a message.')
      return
    }

    setStatus('loading')
    try {
      await submitToSheet('wish', {
        name: form.name.trim(),
        relationship: form.relationship.trim(),
        messageType: form.messageType,
        message: form.message.trim(),
        displayPublicly: form.displayPublicly ? 'Yes' : 'No',
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
        Thank you for sharing your blessing. Your words are part of this celebration of grace and
        gratitude.
      </SuccessMessage>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="w-name" className="eyebrow mb-2 block text-gold/80">
            Name *
          </label>
          <input id="w-name" className="field" value={form.name} onChange={update('name')} placeholder="Your name" required />
        </div>
        <div>
          <label htmlFor="w-rel" className="eyebrow mb-2 block text-gold/80">
            Relationship to Ukeme
          </label>
          <input
            id="w-rel"
            className="field"
            value={form.relationship}
            onChange={update('relationship')}
            placeholder="Daughter, friend, pastor…"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="w-type" className="eyebrow mb-2 block text-gold/80">
          Message Type
        </label>
        <select id="w-type" className="field" value={form.messageType} onChange={update('messageType')}>
          {MESSAGE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="w-msg" className="eyebrow mb-2 block text-gold/80">
          Your Message *
        </label>
        <textarea
          id="w-msg"
          rows={5}
          className="field resize-none"
          value={form.message}
          onChange={update('message')}
          placeholder="Share a prayer, blessing, scripture, memory, or birthday message…"
          required
        />
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 font-body text-sm text-ivory/70">
        <input
          type="checkbox"
          checked={form.displayPublicly}
          onChange={update('displayPublicly')}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#BE9650]"
        />
        You may display this message publicly on the website
      </label>

      {error && (
        <div className="mt-5">
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      )}

      <div className="mt-7">
        <LoadingButton loading={status === 'loading'}>Share Your Blessing</LoadingButton>
      </div>
    </form>
  )
}
