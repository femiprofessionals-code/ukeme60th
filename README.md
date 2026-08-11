# Ukeme Falade's 60th Birthday Thanksgiving — Event Website

A premium, mobile-first event website built with **Vite + React + React Router + Tailwind CSS + Framer Motion**. RSVP and Wishes & Prayers forms submit to **Google Sheets** via a Google Apps Script backend.

> Design language: deep chocolate / espresso backgrounds, champagne-gold foil accents, ivory & cream typography, royal-blue highlights, Cormorant Garamond + Jost, thin gold rules and ornamental corners. A luxury church-gala invitation — dignified, faith-filled, celebratory.

---

## 1. Quick start (run it locally)

You need **Node.js 18+** installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173). The forms will not save anywhere yet — that needs the Google Sheets backend below.

To make a production build:

```bash
npm run build      # output goes to /dist
npm run preview    # preview the production build locally
```

---

## 2. Add your images

Put **6 image files** into `public/images/` using these exact names:

| File             | Used for                                   | Caption                              |
| ---------------- | ------------------------------------------ | ------------------------------------ |
| `invitation.jpg` | Hero portrait + gallery feature + OG image | "You Are Invited"                    |
| `ukeme-1.jpg`    | Gallery                                    | "A Life of Grace"                    |
| `ukeme-2.jpg`    | Gallery                                    | "60 Years of Thanksgiving"           |
| `ukeme-3.jpg`    | Gallery                                    | "Family, Faith & Legacy"             |
| `ukeme-4.jpg`    | Gallery                                    | "A Celebration of God's Faithfulness"|
| `ukeme-5.jpg`    | Gallery                                    | "Grace, Joy & Excellence"            |

Tips:
- **Portrait orientation** (e.g. 1200 × 1500 px) looks best in the gold frames.
- Compress each to **under ~400 KB** (e.g. tinypng.com) so the site loads fast on phones.
- Until you add the files, the site shows tasteful **gold placeholders** — nothing breaks.
- To change filenames or captions, edit `galleryImages` in `src/lib/siteConfig.js`.

---

## 3. Google Sheets backend (RSVP + Wishes & Prayers)

### Step 1 — Create the Google Sheet
1. Go to https://sheets.google.com and create a new blank spreadsheet.
2. Create **two tabs** named **exactly** (capitalization matters):
   - `RSVP Responses`
   - `Wishes and Prayers`

   (You can rename "Sheet1" and add a second tab. The script also auto-creates them and writes headers on first submission if they are missing.)

### Step 2 — Add the Apps Script
3. In the spreadsheet menu: **Extensions → Apps Script**.
4. Delete any sample code in the editor.
5. Open `google-apps-script.gs` from this project, copy **all** of it, and paste it in.
6. Click the **Save** (disk) icon.

### Step 3 — Deploy as a Web App
7. Click **Deploy → New deployment**.
8. Click the gear icon next to "Select type" and choose **Web app**.
9. Set:
   - **Description:** Ukeme 60th forms
   - **Execute as:** Me
   - **Who has access:** **Anyone**
10. Click **Deploy**, then **Authorize access** and approve the permissions for your Google account (you may need to click "Advanced → Go to (project) → Allow").
11. **Copy the Web App URL** it gives you. It looks like:
    `https://script.google.com/macros/s/AKfyc.../exec`
12. (Optional check) Paste that URL into a browser. It should return:
    `{"success":true,"message":"Ukeme 60th form endpoint is live."}`

### Step 4 — Connect the website to the URL
13. In the project root, copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```
14. Open `.env` and paste your Web App URL:
    ```env
    VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfyc.../exec
    ```
15. Restart the dev server (`npm run dev`) so it picks up the new variable.

That's it — RSVPs land in the `RSVP Responses` tab and wishes land in the `Wishes and Prayers` tab, each with a timestamp.

> **If you ever edit the Apps Script**, you must redeploy: **Deploy → Manage deployments → (edit) → Version: New version → Deploy**. The `/exec` URL stays the same.

### What gets saved

**RSVP Responses tab:** Timestamp · Full Name · Email or Phone · Number of Guests · Attendance Status · Message to Host

**Wishes and Prayers tab:** Timestamp · Name · Relationship to Ukeme · Message Type · Message · Permission to Display Publicly

---

## 4. Showing real wishes on the public wall

The Wishes & Prayers page currently displays a set of **sample message cards** (in `src/lib/siteConfig.js` → `sampleMessages`). To feature real, approved messages:

- **Simplest:** read your `Wishes and Prayers` sheet, pick the ones marked "Yes" for public display, and paste them into the `sampleMessages` array (name, relationship, type, message). Redeploy the site.
- **Live (later):** the form layer is isolated in `src/lib/submit.js` and the wall reads from a plain array, so you can swap in a fetch to Google Sheets (published as JSON), Supabase, Firebase, or Airtable without touching the UI. Keep an "approved" column and only return approved rows.

---

## 5. Deploy the website

The build is a static site (`/dist`), so any static host works. Two easy options:

### Vercel
1. Push this folder to a GitHub repo.
2. Import the repo at https://vercel.com.
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
4. Add an **Environment Variable**: `VITE_GOOGLE_SCRIPT_URL` = your Web App URL.
5. Deploy.

### Netlify
1. Push to GitHub, import at https://netlify.com.
2. Build command `npm run build`, publish directory `dist`.
3. Add the env var `VITE_GOOGLE_SCRIPT_URL` in **Site settings → Environment variables**.
4. Deploy.

> **Client-side routing note:** so that refreshing `/rsvp` etc. doesn't 404, a fallback to `index.html` is needed. Vercel/Netlify handle Vite SPAs automatically with their Vite preset. If your host doesn't, add a redirect rule sending all paths to `/index.html`.

---

## 6. Updating event content later

Almost everything lives in **one file**: `src/lib/siteConfig.js`.

- **Date, time, venue, address, names, theme** → the `event` object.
- **Countdown / calendar times** → `startUTC` and `endUTC` (note: ET in late September is EDT = UTC−4, so 12:00 PM ET = `16:00:00Z`).
- **Google Maps link** → `MAPS_URL`.
- **Gallery images and captions** → `galleryImages`.
- **Sample wall messages** → `sampleMessages`.

Colors and fonts are in `tailwind.config.js`; global styles and button/card looks are in `src/index.css`.

The social-share title/description and Open Graph image are in `index.html`.

---

## 7. Project structure

```
ukeme-60th/
├─ index.html                 # SEO + Open Graph meta, font links
├─ google-apps-script.gs      # Paste into Google Apps Script (backend)
├─ .env.example               # Copy to .env and add your Web App URL
├─ public/
│  ├─ favicon.svg
│  └─ images/                 # <-- drop your 6 photos here
├─ src/
│  ├─ main.jsx                # entry + BrowserRouter
│  ├─ App.jsx                 # routes + page transitions
│  ├─ index.css               # theme, buttons, fields, cards
│  ├─ lib/
│  │  ├─ siteConfig.js        # ALL editable content
│  │  ├─ calendar.js          # Google Calendar link + .ics download
│  │  └─ submit.js            # posts forms to Google Apps Script
│  ├─ components/             # Navbar, Hero, forms, cards, decorative bits
│  └─ pages/                  # Home, EventDetails, WishesPrayers, Gallery, RSVP
└─ tailwind.config.js         # palette, fonts, animations
```

---

## 8. Notes

- **Accessibility:** semantic HTML, labelled form fields, focus styles, readable contrast, `alt` text on images.
- **Performance:** lazy-loaded images, single CSS/JS bundle, system-friendly fonts via Google Fonts with preconnect.
- **No dress code section**, by design.
- **Apps Script + CORS:** Apps Script web apps don't send CORS headers, so the forms post as `text/plain` (no preflight) and treat a completed request as success. Data still writes correctly to the sheet.

With hearts full of gratitude. 🤍

## Travel itinerary (`/travel`)

A private page holding the seventeen-day trip: 14–30 August 2026, Washington to
Jakarta, Surabaya, Sydney, Bali and Guangzhou, home via Hong Kong and Seoul.

| File | Purpose |
| --- | --- |
| `src/lib/travelData.js` | **Edit the itinerary here.** Legs, days, flights, hotels, notes. |
| `src/components/TravelItinerary.jsx` | The page body: route chart, leg cards, timeline. |
| `src/components/PasswordGate.jsx` | The passphrase gate. |
| `src/pages/Travel.jsx` | Route entry; lazily loads the itinerary once unlocked. |

Styles live at the end of `src/index.css`, all prefixed `tv-` so they cannot
collide with the rest of the site.

### About the passphrase

The gate stores only a **SHA-256 digest** of the passphrase, so the phrase itself
is never in the JavaScript bundle. The itinerary is a lazily-imported chunk, so
its content is not downloaded at all until the gate opens.

To change the passphrase, replace `DIGEST` in `PasswordGate.jsx` with a new hash:

```bash
printf '%s' 'your-new-passphrase' | shasum -a 256
```

**This is a deterrent, not security.** The site is a static bundle with no server,
so a determined visitor who reads the JavaScript can reach the chunk directly. It
keeps the page away from casual visitors and search engines. If the details are
genuinely sensitive, use real server-side auth or your host's built-in password
protection (Netlify and Vercel both offer it on paid plans).
