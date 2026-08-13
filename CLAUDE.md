# ukemeturns60.com — working notes

A one-page-per-route site for Ukeme Falade's 60th. Read this before changing
anything; it records the conventions the site already follows and the things
that live outside this repo.

## What it is

Vite + React 18 + React Router 6 + Tailwind + Framer Motion. No backend — form
submissions POST to a Google Apps Script Web App that writes to a Google Sheet.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | `Home` | Hero, invitation summary, legacy quote |
| `/event-details` | `EventDetails` | |
| `/wishes-prayers` | `WishesPrayers` | Form + message wall |
| `/rsvp` | `RSVP` | Form |
| `/travel` | `Travel` | **Passphrase-gated** itinerary |
| `/gallery` | `Gallery` | Route commented out in `App.jsx`; component still present |

Routes are registered in `src/App.jsx`. The nav is driven by the single
exported `NAV_LINKS` array in `src/components/Navbar.jsx` — add a link there
once and it appears in both the desktop bar and the mobile menu.

## Where the content lives

**All event content is in `src/lib/siteConfig.js`** — honoree, date, venue,
calendar strings, gallery images, the sample messages wall. Change it there,
not in components.

**The travel itinerary is in `src/lib/travelData.js`** — legs, days, flights,
hotels, notes. Same idea: edit the data, not the markup.

## Design system

Do not introduce new colours or faces. Everything comes from
`tailwind.config.js` and the `@layer components` block in `src/index.css`:

- **Ground** — black marble: `chocolate` `#131316`, `chocolate-deep` `#0E0E10`,
  `chocolate-espresso` `#09090A`, `chocolate-card` `#161618`
- **Gold** — `gold` `#BE9650`, `gold-light` `#DEC894`, `gold-pale` `#EFE3C3`,
  `gold-deep` `#8E6A34`; `ivory` `#F3EAD6`
- **Type** — `display` = Cormorant Garamond (use the `.display` class),
  body = Jost
- **Utilities** — `.text-foil` (shimmering gold text), `.eyebrow`,
  `.rule-gold`, `.glass-card`, `.marble` (veined section background),
  `bg-choco-radial`, `bg-gold-gradient`

**Shared furniture — reuse these rather than rolling your own:**
`SectionHeading`, `GoldDivider`, `DecorativeBorder`, `Sparkles`,
`CelebrationLayer`, `CTAButtons`, `ImageFrame`, `BrandMark`.

**The house reveal.** Sections animate in with framer-motion using these exact
values (see `SectionHeading.jsx`). Match them for anything new:

```js
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-60px' }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
```

## The travel page

| File | Purpose |
| --- | --- |
| `src/lib/travelData.js` | The itinerary. Edit here. |
| `src/components/TravelItinerary.jsx` | Route chart, leg cards, day timeline |
| `src/components/PasswordGate.jsx` | The gate |
| `src/pages/Travel.jsx` | Route entry; lazily imports the itinerary |
| `src/lib/entryRequirements.js` | Visa / arrival-card rules. **Verified by the organiser, not by us** |
| `src/components/EntryAlerts.jsx` | Renders those rules with live countdowns |
| `src/components/LegWeather.jsx` | Open-Meteo forecast per city |
| `src/components/PlaceArt.jsx` | Eighteen drawn scenes — three per leg — and `ACCENTS` |
| `src/components/LegBackdrop.jsx` | The leg's background — photographs if any, else the drawings |
| `src/lib/placePhotos.js` | Globs `src/assets/places/` so dropped-in photos just appear |
| `src/components/Dialog.jsx` | Shared dialog shell — portal, focus trap, scroll lock |
| `src/components/ActionsModal.jsx` | The paperwork checklist, in a Dialog |

Its custom CSS sits at the end of `src/index.css`, every selector prefixed
`tv-` so it cannot collide with the rest of the site. Keep that prefix.

The gate stores only a **SHA-256 digest** of the passphrase, and the itinerary
is lazily imported so its chunk is never downloaded until the gate opens. To
change the passphrase, replace `DIGEST` in `PasswordGate.jsx`:

```bash
printf '%s' 'new-passphrase' | shasum -a 256
```

This is a deterrent, not security — the site is a static bundle with no server.
Anyone who reads the JavaScript can reach the chunk. For real protection, use
the host's built-in password feature.

### Entry requirements

`entryRequirements.js` holds the paperwork. Each item stores an arrival date and
`opensDaysBefore`; `statusOf()` works out the window against today, so a card
says "open now" or "opens in 4 days" without anyone editing copy. Change a date
in `ARRIVALS` and every countdown follows.

**Do not add an item unless a human has verified it against the official site.**
Rules change and depend on passport and visa type. Every item carries a link to
the source, and the page tells readers to confirm there.

### The leg backdrop

Selecting a city gives its leg a large background image of the country. Each
leg carries a `places` array in `travelData.js`; `LegBackdrop` cross-fades
through them every seven seconds, names the current one top-left, and fades the
bottom into the card so the type over it stays readable. `prefers-reduced-
motion` holds the first scene still.

Two things that will bite if changed:

- The scenes are 400x300 and drawn with `preserveAspectRatio="xMidYMin slice"`,
  so a wide box crops the foreground rather than the top of the landmark.
- `.tv-bd` pins `width: 100%` alongside its `aspect-ratio`. Without it,
  `min-height` on a narrow phone inflates the *width* past the card instead of
  the height.

**Photographs.** Drop image files into `src/assets/places/` named after the
leg — `sydney.jpg`, `sydney-opera-house.jpg`, `bali-1.jpg` — and they appear.
`src/lib/placePhotos.js` globs the folder at build time, so there is no list to
keep in step; Vite hashes and optimises each file. As soon as one photograph
exists for a leg, that leg shows photographs only, so this can be done a
country at a time. A photograph that fails to load falls back to the drawing.
See `src/assets/places/README.md`.

The drawn scenes are the fallback, and the reason there is one: nothing can
404, blur on a retina screen, or raise a licensing question.

### Dialogs and the scroll lock

Every dialog goes through `Dialog.jsx`. Do not hand-roll another one — the
scroll lock is where the bodies are buried:

- `body` is clipped sideways. With `overflow-x: hidden` that makes body a
  second scroll container next to `<html>`, the scroll position splits between
  them, and `overflow: hidden` on either collapses the page height and throws
  the reader hundreds of pixels up. Body now uses `overflow-x: clip`, which
  clamps without creating a scroller. **Do not change that back.**
- The lock pins `body` at `-scrollY` rather than hiding overflow, so it holds
  on engines without `clip` too.
- `html` has `scroll-behavior: smooth`, so the position is restored with
  `behavior: 'instant'` — otherwise closing animates the page back.
- The effect depends on `open` alone; `onClose` is held in a ref. Depending on
  it directly re-arms the lock on every render and the page drifts.

### Weather

`LegWeather.jsx` calls Open-Meteo — free, no API key, CORS-enabled, so it works
from a static host. It caches per leg in `sessionStorage` for an hour and
**fails silently**: if the request errors the strip does not render, because a
broken widget is worse than none on a page people rely on. The forecast horizon
is roughly sixteen days, so dates further out simply return nothing.

## Deployment

Pushes to `main` build automatically on the host. `vercel.json` and
`public/_redirects` provide the SPA fallback — **do not remove them**, or every
deep link (`/rsvp`, `/travel`) will 404 on refresh.

## Things that are NOT in this repo

Anyone picking this up needs to know these exist elsewhere:

1. **`VITE_GOOGLE_SCRIPT_URL`** — the Apps Script endpoint the forms POST to.
   Must be set as an environment variable in the host dashboard. There is no
   `.env` in the repo (and `.env` is gitignored).
2. **The Google Apps Script itself** — `google-apps-script.gs` is a copy of the
   source, but the deployed Web App and the Google Sheet behind it live in the
   owner's Google account. Editing the `.gs` here changes nothing until it is
   redeployed there (see README).
3. **Host configuration** — which branch is production, the custom domain, and
   any dashboard-level settings.

## Open questions on the itinerary

Both are one-line edits in `src/lib/travelData.js`:

- **Bali has no hotel.** The source PDF says "Accommodation to be confirmed",
  so the page says the same. It is the only stay without one.
- **Guangzhou vs Hong Kong.** The PDF says "transfer to Hong Kong" on Aug 27
  but also places the party at the Rosewood Guangzhou on the 28th and 29th,
  departing HKG at 12:45 AM on the 30th. The page reads that as three nights in
  Guangzhou with the ground transfer on departure day. Worth confirming.

Note the trip (14–30 Aug 2026) is separate from the celebration itself, which
`siteConfig.js` gives as Sunday 27 September 2026. No birthday is marked inside
the itinerary; 23 August is highlighted because it is the day both travelling
groups meet in Bali.
