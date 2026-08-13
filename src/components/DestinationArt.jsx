/*
 * A full-colour scene for each stop, drawn as SVG.
 *
 * These are meant to be looked at, not to sit behind the type as texture.
 * Each has its own sky drawn from the place — Jakarta at dusk, Sydney's
 * harbour morning, Bali in jade and coral, Guangzhou's neon night — with
 * layered silhouettes for depth and the landmark that city is known for.
 *
 * Still vector: no image weight, sharp at any size, no licensing question.
 * The gold of the site stays as the landmark colour so the page still reads
 * as part of ukemeturns60.com rather than a foreign postcard.
 */

export const ACCENTS = {
  outbound:  { key: '#6C8BD6', glow: 'rgba(108,139,214,.30)', label: 'Night flight' },
  jakarta:   { key: '#E8843C', glow: 'rgba(232,132,60,.32)',  label: 'Dusk over the capital' },
  surabaya:  { key: '#E2565F', glow: 'rgba(226,86,95,.30)',   label: 'Sunset on the strait' },
  sydney:    { key: '#3FA8C4', glow: 'rgba(63,168,196,.30)',  label: 'Harbour morning' },
  bali:      { key: '#3FBB94', glow: 'rgba(63,187,148,.30)',  label: 'Jade and coral' },
  guangzhou: { key: '#C2569C', glow: 'rgba(194,86,156,.30)',  label: 'Pearl River night' },
}

const S = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }

/* ---------------------------------------------------------------- Jakarta */
function Jakarta() {
  return (
    <>
      <defs>
        <linearGradient id="daJk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A1550" /><stop offset="52%" stopColor="#B14A3E" />
          <stop offset="100%" stopColor="#F0A254" />
        </linearGradient>
      </defs>
      <rect width="400" height="150" fill="url(#daJk)" />
      <circle cx="318" cy="96" r="21" fill="#FFD08A" opacity=".9" />
      <circle cx="318" cy="96" r="34" fill="#FFC178" opacity=".22" />
      {/* far skyline */}
      <path fill="#3A1F52" opacity=".85"
        d="M0 118h26V96h16v22h22V84h18v34h24V100h20v18h30V88h18v30h34V104h22v14h40V92h20v26h50V110h20v8h40v32H0z" />
      {/* Monas */}
      <g>
        <path fill="#4A2350" d="M186 118h28v32h-28z" />
        <path fill="#F3EAD6" d="M195 118V60h10v58z" />
        <path fill="#E8C874" d="M200 60c-6-6-5-14 0-19 5 5 6 13 0 19z" />
        <circle cx="200" cy="43" r="7" fill="#FFD98A" opacity=".35" />
      </g>
      {/* near rooftops */}
      <path fill="#26123A" d="M0 132h44v-14h20v14h34v-8h26v8h40v-12h22v12h48v-10h24v10h48v-14h22v14h72v18H0z" />
      <g stroke="#FFE1A8" strokeWidth="1" opacity=".5" {...S}>
        <path d="M52 124h4M60 124h4M132 130h4M140 130h4M262 126h4M270 126h4M336 124h4M344 124h4" />
      </g>
    </>
  )
}

/* --------------------------------------------------------------- Surabaya */
function Surabaya() {
  return (
    <>
      <defs>
        <linearGradient id="daSb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B1246" /><stop offset="45%" stopColor="#C0405C" />
          <stop offset="100%" stopColor="#F4A65C" />
        </linearGradient>
      </defs>
      <rect width="400" height="150" fill="url(#daSb)" />
      <circle cx="200" cy="104" r="19" fill="#FFDC96" opacity=".92" />
      <circle cx="200" cy="104" r="32" fill="#FFC97E" opacity=".2" />
      {/* Suramadu towers and cables */}
      <g stroke="#F3EAD6" strokeWidth="2.6" {...S}>
        <path d="M122 118V44M278 118V44" />
      </g>
      <g stroke="#FFE1A8" strokeWidth="1" opacity=".75" {...S}>
        <path d="M122 52 44 112M122 62 70 112M122 74 96 112M278 52l78 60M278 62l52 50M278 74l26 38" />
      </g>
      <path stroke="#F3EAD6" strokeWidth="2.4" {...S} d="M20 112h360" />
      {/* water */}
      <rect y="118" width="400" height="32" fill="#5B1E4C" opacity=".9" />
      <g stroke="#FFC97E" strokeWidth="1.4" opacity=".55" {...S}>
        <path d="M186 126h28M180 133h40M190 140h20" />
      </g>
      <g stroke="#F0D3B0" strokeWidth="1" opacity=".35" {...S}>
        <path d="M40 130h30M300 136h40M90 142h34" />
      </g>
    </>
  )
}

/* ----------------------------------------------------------------- Sydney */
function Sydney() {
  return (
    <>
      <defs>
        <linearGradient id="daSy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E4C6B" /><stop offset="60%" stopColor="#2E93B4" />
          <stop offset="100%" stopColor="#8ED4DC" />
        </linearGradient>
      </defs>
      <rect width="400" height="150" fill="url(#daSy)" />
      <circle cx="72" cy="44" r="15" fill="#FFF2CE" opacity=".85" />
      {/* bridge */}
      <g stroke="#F3EAD6" strokeWidth="2.4" {...S}>
        <path d="M232 106c0-30 24-48 52-48s52 18 52 48" />
        <path d="M224 106h120" />
        <path d="M252 74v32M284 64v42M316 74v32" />
      </g>
      <path fill="#EAE0C8" d="M242 106V80h-14v26zm88 0V80h14v26z" />
      {/* opera house */}
      <g fill="#F7F1E0">
        <path d="M96 106c0-24 14-38 30-42-7 13-9 27-9 42z" />
        <path d="M120 106c0-20 12-32 26-36-6 12-8 23-8 36z" />
        <path d="M144 106c0-15 10-26 20-29-5 10-7 19-7 29z" />
      </g>
      <g stroke="#9CCBDA" strokeWidth="1" opacity=".7" {...S}>
        <path d="M106 104c2-15 8-26 17-32M130 104c2-13 8-22 15-27" />
      </g>
      <path fill="#C8B98F" d="M84 106h96v6H84z" />
      {/* harbour */}
      <rect y="112" width="400" height="38" fill="#12617F" />
      <g stroke="#BFE6EC" strokeWidth="1.3" opacity=".5" {...S}>
        <path d="M30 124h44M120 132h56M250 126h60M60 142h48M300 140h56" />
      </g>
      <g stroke="#F3EAD6" strokeWidth="1.2" opacity=".8" {...S}>
        <path d="M196 120v-12l12 12z" fill="#F3EAD6" />
      </g>
    </>
  )
}

/* ------------------------------------------------------------------- Bali */
function Bali() {
  return (
    <>
      <defs>
        <linearGradient id="daBa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#124A46" /><stop offset="50%" stopColor="#2E9E7E" />
          <stop offset="100%" stopColor="#F6B98A" />
        </linearGradient>
      </defs>
      <rect width="400" height="150" fill="url(#daBa)" />
      <circle cx="200" cy="88" r="22" fill="#FFE0A8" opacity=".9" />
      <circle cx="200" cy="88" r="36" fill="#FFCE92" opacity=".22" />
      {/* terraced hills */}
      <path fill="#176153" opacity=".9" d="M0 108c60-16 120 6 200-2s140 10 200 0v44H0z" />
      <path fill="#0F4A44" d="M0 124c70-12 130 8 200 2s130 6 200-2v26H0z" />
      {/* split gate */}
      <g>
        <path fill="#F3EAD6" d="M164 124V54l-16 5v65z" />
        <path fill="#F3EAD6" d="M236 124V54l16 5v65z" />
        <path fill="#E8C874" d="m148 59 8-13 8 13zM236 59l8-13 8 13z" />
        <g stroke="#2E7A67" strokeWidth="1.2" opacity=".7" {...S}>
          <path d="M150 70h14M150 82h14M150 94h14M150 106h14M236 70h14M236 82h14M236 94h14M236 106h14" />
        </g>
      </g>
      {/* palms */}
      <g stroke="#0E3F3A" strokeWidth="3" {...S}><path d="M56 150c0-26 8-42 20-52M344 150c0-22 -7-36-18-46" /></g>
      <g fill="#1D7A63">
        <path d="M76 98c-12-6-26-2-31 6 11 3 23 2 31-6zM76 98c-7-12-4-26 4-31 4 11 4 23-4 31zM76 98c12-6 26-2 31 6-11 3-23 2-31-6z" />
        <path d="M326 104c-11-5-23-2-27 5 10 3 20 2 27-5zM326 104c-6-10-3-23 4-27 3 10 3 20-4 27zM326 104c11-5 23-2 27 5-10 3-20 2-27-5z" />
      </g>
    </>
  )
}

/* -------------------------------------------------------------- Guangzhou */
function Guangzhou() {
  return (
    <>
      <defs>
        <linearGradient id="daGz" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B0C3A" /><stop offset="55%" stopColor="#6A2168" />
          <stop offset="100%" stopColor="#C4568F" />
        </linearGradient>
        <linearGradient id="daGzT" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD9F0" /><stop offset="100%" stopColor="#8FD8F0" />
        </linearGradient>
      </defs>
      <rect width="400" height="150" fill="url(#daGz)" />
      <g fill="#FFE7B0" opacity=".85">
        <circle cx="60" cy="30" r="1.6" /><circle cx="130" cy="20" r="1.3" />
        <circle cx="300" cy="26" r="1.5" /><circle cx="356" cy="46" r="1.2" />
        <circle cx="228" cy="16" r="1.2" />
      </g>
      {/* far towers */}
      <path fill="#2C1152" opacity=".9" d="M0 120h30V86h18v34h26V96h20v24h34V78h20v42h40V92h22v28h44V84h20v36h56v-24h20v24h50v30H0z" />
      {/* Canton Tower */}
      <g>
        <path fill="url(#daGzT)" opacity=".92"
          d="M191 124c0-28 5-44 7-58 1-9 2-14 4-22h-4l2-10 2 10h-4c2 8 3 13 4 22 2 14 7 30 7 58z" />
        <g stroke="#1B0C3A" strokeWidth=".9" opacity=".45" {...S}>
          <path d="M193 114h14M192 102h16M193 90h14M195 78h10M197 66h6" />
        </g>
        <path stroke="#FFE7B0" strokeWidth="1.6" {...S} d="M200 34V16" />
        <circle cx="200" cy="14" r="3" fill="#FFE7B0" />
      </g>
      {/* near buildings with lit windows */}
      <path fill="#190A33" d="M0 132h48v-16h22v16h40v-10h26v10h44v-14h22v14h50v-12h24v12h50v-16h22v16h52v18H0z" />
      <g fill="#FFD98A" opacity=".8">
        <rect x="14" y="136" width="3" height="4" /><rect x="24" y="136" width="3" height="4" />
        <rect x="80" y="138" width="3" height="4" /><rect x="90" y="138" width="3" height="4" />
        <rect x="176" y="136" width="3" height="4" /><rect x="186" y="136" width="3" height="4" />
        <rect x="286" y="136" width="3" height="4" /><rect x="296" y="136" width="3" height="4" />
      </g>
      {/* river reflection */}
      <g stroke="#FFB4E0" strokeWidth="1.4" opacity=".45" {...S}>
        <path d="M186 142h28M178 148h44" />
      </g>
    </>
  )
}

/* --------------------------------------------------------------- Outbound */
function Outbound() {
  return (
    <>
      <defs>
        <linearGradient id="daOb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080B26" /><stop offset="60%" stopColor="#1C2A5E" />
          <stop offset="100%" stopColor="#3C5C9B" />
        </linearGradient>
      </defs>
      <rect width="400" height="150" fill="url(#daOb)" />
      <g fill="#FFF3D0">
        <circle cx="44" cy="26" r="1.6" opacity=".9" /><circle cx="96" cy="48" r="1.2" opacity=".7" />
        <circle cx="150" cy="22" r="1.4" opacity=".85" /><circle cx="248" cy="34" r="1.3" opacity=".8" />
        <circle cx="316" cy="20" r="1.6" opacity=".9" /><circle cx="360" cy="54" r="1.2" opacity=".65" />
        <circle cx="200" cy="58" r="1.1" opacity=".6" />
      </g>
      {/* curve of the earth */}
      <path fill="#0B1F4D" d="M0 150c40-52 120-84 200-84s160 32 200 84z" />
      <path stroke="#7FA8E8" strokeWidth="1.6" opacity=".55" {...S}
        d="M0 150c40-52 120-84 200-84s160 32 200 84" />
      <path stroke="#FFD98A" strokeWidth="1.4" opacity=".35" {...S}
        d="M0 146c44-46 122-74 200-74s156 28 200 74" />
      {/* two departures */}
      <path stroke="#FFE1A8" strokeWidth="1.6" strokeDasharray="4 6" opacity=".9" {...S}
        d="M60 128C120 66 264 58 344 96" />
      <path stroke="#8FD8F0" strokeWidth="1.5" strokeDasharray="3 7" opacity=".8" {...S}
        d="M60 138C130 96 250 96 336 118" />
      <g fill="#FFF3D0">
        <path d="M338 92c2 0 3 2 3 5v3l8 4v2l-8-2v5l3 2v2l-6-1-6 1v-2l3-2v-5l-8 2v-2l8-4v-3c0-3 1-5 3-5z"
              transform="rotate(64 338 96)" />
      </g>
    </>
  )
}

const ART = { outbound: Outbound, jakarta: Jakarta, surabaya: Surabaya, sydney: Sydney, bali: Bali, guangzhou: Guangzhou }

export default function DestinationArt({ id, name }) {
  const Art = ART[id]
  if (!Art) return null
  const accent = ACCENTS[id]
  return (
    <figure className="tv-scene" style={{ '--accent': accent?.key }}>
      <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" role="img"
           aria-label={`Illustration of ${name}`}>
        <Art />
      </svg>
      <figcaption className="tv-scene-cap">{accent?.label}</figcaption>
    </figure>
  )
}
