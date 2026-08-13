import Dialog from './Dialog'
import EntryAlerts, { ACTIONABLE, NoActionNote } from './EntryAlerts'
import { statusOf } from '../lib/entryRequirements'

/* The action list as a dialog rather than a section of the page. The shell —
   portal, focus trap, scroll lock — lives in Dialog. */

export default function ActionsModal({ open, onClose }) {
  const now = ACTIONABLE.filter((r) => ['open', 'anytime'].includes(statusOf(r).state)).length
  const soon = ACTIONABLE.filter((r) => statusOf(r).state === 'upcoming').length

  return (
    <Dialog open={open} onClose={onClose} labelledBy="tv-modal-title">
      <header className="tv-modal-head">
        <div>
          <p className="eyebrow !text-[0.58rem]">Paperwork &amp; deadlines</p>
          <h2 id="tv-modal-title" className="display tv-modal-title">Action Required</h2>
          <p className="tv-modal-counts">
            <b>{now}</b> to do now
            {soon > 0 && <> · <b>{soon}</b> opening soon</>}
          </p>
        </div>
        <button type="button" className="tv-modal-x" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </header>

      <div className="tv-modal-body">
        <p className="tv-modal-note">
          Timings count back from each arrival. Every link opens the official site —
          confirm there, as rules change and depend on your passport and visa type.
        </p>
        <EntryAlerts actionableOnly className="mt-5" />
        <NoActionNote />
      </div>

      <footer className="tv-modal-foot">
        <button type="button" className="tv-modal-done" onClick={onClose}>Close</button>
      </footer>
    </Dialog>
  )
}
