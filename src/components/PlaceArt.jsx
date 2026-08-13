/*
 * A drawn scene for each landmark on the route — three per stop.
 *
 * These are vector, not photographs, for two reasons. The build environment
 * cannot reach any image host, and more usefully: nothing here can 404, go
 * blurry on a retina screen, or carry a licence question. Each is drawn from
 * the real thing — Monas and its flame, the Suramadu cable fans, the Opera
 * House shells, Tanah Lot's meru tiers, the Canton Tower's twist — with the
 * sky each place is known for at the hour the group is likely to see it.
 *
 * TO USE REAL PHOTOGRAPHS: drop a file in public/places/ and add `photo` to
 * the entry in travelData.js. PlaceGallery layers it over the drawing and
 * fades it in once it has loaded, so a missing or broken file leaves the
 * drawing showing rather than a broken image.
 *
 * All scenes are 400x300 and are cropped by the frame, so keep anything that
 * matters inside the middle band.
 */

/**
 * Each leg's colour, taken from its scenes. Drives the card's border, the
 * counts, the glyph and the node on the route chart, so a leg reads as one
 * place rather than as generic gold.
 */
export const ACCENTS = {
  outbound:  { key: '#6C8BD6', glow: 'rgba(108,139,214,.30)' },
  jakarta:   { key: '#E8843C', glow: 'rgba(232,132,60,.32)' },
  surabaya:  { key: '#E2565F', glow: 'rgba(226,86,95,.30)' },
  sydney:    { key: '#3FA8C4', glow: 'rgba(63,168,196,.30)' },
  bali:      { key: '#3FBB94', glow: 'rgba(63,187,148,.30)' },
  guangzhou: { key: '#C2569C', glow: 'rgba(194,86,156,.30)' },
}

const S = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }

/** Small fixed star field — fixed, not random, so it never flickers on re-render. */
const STARS = [
  [28, 34], [64, 18], [96, 52], [132, 26], [168, 44], [204, 16], [240, 38],
  [276, 22], [312, 48], [348, 30], [376, 60], [52, 72], [148, 68], [256, 62], [332, 78],
]
function Stars({ opacity = 0.9 }) {
  return (
    <g fill="#FFF6DD" opacity={opacity}>
      {STARS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1} opacity={i % 4 === 0 ? 1 : 0.65} />
      ))}
    </g>
  )
}

/** Sun or moon with a soft halo. */
function Orb({ cx, cy, r, core, halo }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r * 2.1} fill={halo} opacity=".13" />
      <circle cx={cx} cy={cy} r={r * 1.45} fill={halo} opacity=".2" />
      <circle cx={cx} cy={cy} r={r} fill={core} />
    </>
  )
}

/** Horizontal ripples, used for every stretch of water. */
function Ripples({ y, rows = 6, color = '#FFE6BA', opacity = 0.5, gap = 11, width = 400 }) {
  return (
    <g stroke={color} strokeWidth="1.4" opacity={opacity} {...S}>
      {Array.from({ length: rows }, (_, i) => {
        const yy = y + i * gap
        const inset = 20 + i * 12
        return <path key={i} d={`M${inset} ${yy}h${Math.max(30, width - inset * 2)}`} opacity={1 - i * 0.12} />
      })}
    </g>
  )
}

/** A palm, used across the tropical stops. */
function Palm({ x, y, h = 60, color = '#1B2A22', flip = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`} stroke={color} {...S}>
      <path d={`M0 0 C-3 ${-h * 0.5} 2 ${-h * 0.8} 6 ${-h}`} strokeWidth="3" />
      <g strokeWidth="2.4" fill="none">
        <path d={`M6 ${-h} c-14 -4 -26 2 -32 12`} />
        <path d={`M6 ${-h} c-8 -12 -22 -16 -32 -12`} />
        <path d={`M6 ${-h} c12 -8 26 -6 32 4`} />
        <path d={`M6 ${-h} c14 2 24 10 26 20`} />
        <path d={`M6 ${-h} c2 -14 -4 -22 -12 -26`} />
      </g>
    </g>
  )
}

/* ======================================================== Washington · Abu Dhabi */

function Capitol() {
  return (
    <>
      <defs>
        <linearGradient id="paCapSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E1832" /><stop offset="42%" stopColor="#46446E" />
          <stop offset="76%" stopColor="#C06B5E" /><stop offset="100%" stopColor="#F2AC70" />
        </linearGradient>
        <linearGradient id="paCapPool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A2C46" /><stop offset="100%" stopColor="#16101F" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paCapSky)" />
      <Stars opacity=".5" />
      <Orb cx={318} cy={182} r={24} core="#FFD79A" halo="#FF9E62" />

      {/* treeline */}
      <path fill="#241B33" opacity=".9"
        d="M0 196c18-8 26 2 40-4s22 6 36 2 24-8 40-2 26 4 44-2 30 6 46 0 26-6 44 0 28 8 44 2 30-6 46 2v104H0z" />

      {/* the building */}
      <g>
        <rect x="96" y="180" width="208" height="26" fill="#2B2340" />
        <rect x="96" y="170" width="56" height="36" fill="#332A4A" />
        <rect x="248" y="170" width="56" height="36" fill="#332A4A" />
        <rect x="150" y="158" width="100" height="48" fill="#3B3153" />
        {/* colonnades */}
        <g stroke="#EADFC4" strokeWidth="1.5" opacity=".6" {...S}>
          <path d="M104 178v26M114 178v26M124 178v26M134 178v26M144 178v26" />
          <path d="M256 178v26M266 178v26M276 178v26M286 178v26M296 178v26" />
          <path d="M160 172v32M172 172v32M184 172v32M216 172v32M228 172v32M240 172v32" />
        </g>
        {/* drum + dome */}
        <rect x="176" y="132" width="48" height="28" fill="#E7DBBE" />
        <g stroke="#B9A987" strokeWidth="1" opacity=".8" {...S}>
          <path d="M184 136v22M192 136v22M208 136v22M216 136v22" />
        </g>
        <path fill="#EFE4C8" d="M176 132c0-26 12-40 24-46 12 6 24 20 24 46z" />
        <g stroke="#C4B48F" strokeWidth=".9" opacity=".7" {...S}>
          <path d="M188 130c0-20 4-32 12-42M212 130c0-20-4-32-12-42M182 122h36M180 112h40" />
        </g>
        <rect x="193" y="74" width="14" height="14" fill="#EFE4C8" />
        <path fill="#EFE4C8" d="M200 62c4 4 5 8 4 12h-8c-1-4 0-8 4-12z" />
        <circle cx="200" cy="58" r="2.6" fill="#F6E6B4" />
      </g>

      {/* pool */}
      <rect y="212" width="400" height="88" fill="url(#paCapPool)" />
      <g opacity=".3">
        <path fill="#EFE4C8" d="M176 250c0 26 12 40 24 46 12-6 24-20 24-46z" />
        <rect x="176" y="222" width="48" height="28" fill="#E7DBBE" opacity=".7" />
      </g>
      <Ripples y={222} rows={7} color="#FFD5A0" opacity=".4" gap={11} />
    </>
  )
}

function GrandMosque() {
  const dome = (cx, w, top, base) => {
    const half = w / 2
    return `M${cx - half} ${base} C${cx - half - 3} ${base - (base - top) * 0.42} ${cx - half + 4} ${top + (base - top) * 0.2} ${cx} ${top} C${cx + half - 4} ${top + (base - top) * 0.2} ${cx + half + 3} ${base - (base - top) * 0.42} ${cx + half} ${base} Z`
  }
  const minaret = (x) => (
    <g key={x}>
      <rect x={x - 6} y="118" width="12" height="94" fill="#EDE3CB" />
      <rect x={x - 8} y="150" width="16" height="5" fill="#D8CBAA" />
      <rect x={x - 8} y="176" width="16" height="5" fill="#D8CBAA" />
      <path fill="#EDE3CB" d={`M${x - 8} 118 C${x - 8} 104 ${x} 96 ${x} 88 C${x} 96 ${x + 8} 104 ${x + 8} 118Z`} />
      <path stroke="#F6E6B4" strokeWidth="1.6" {...S} d={`M${x} 88v-8`} />
      <circle cx={x} cy="78" r="2.4" fill="#F6E6B4" />
    </g>
  )
  return (
    <>
      <defs>
        <linearGradient id="paAdSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080D2C" /><stop offset="48%" stopColor="#1D3A70" />
          <stop offset="100%" stopColor="#5C7FB4" />
        </linearGradient>
        <linearGradient id="paAdPool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A4576" /><stop offset="100%" stopColor="#0C1638" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paAdSky)" />
      <Stars />
      <g>
        <circle cx="70" cy="56" r="17" fill="#FFF3D4" />
        <circle cx="78" cy="50" r="16" fill="#132A5C" />
      </g>

      {[52, 92, 308, 348].map(minaret)}

      {/* arcade */}
      <rect x="104" y="182" width="192" height="30" fill="#E6DBC1" />
      <g fill="#20325F">
        {[116, 144, 172, 228, 256, 284].map((x) => (
          <path key={x} d={`M${x - 8} 212v-16c0-6 4-10 8-10s8 4 8 10v16z`} />
        ))}
      </g>
      {/* domes */}
      <path fill="#EFE5CD" d={dome(150, 46, 140, 184)} />
      <path fill="#EFE5CD" d={dome(250, 46, 140, 184)} />
      <path fill="#F3EAD6" d={dome(200, 76, 96, 186)} />
      <g stroke="#C9BC9A" strokeWidth="1" opacity=".65" {...S}>
        <path d="M200 100v84M176 122c8 22 8 44 4 62M224 122c-8 22-8 44-4 62" />
      </g>
      <path stroke="#F6E6B4" strokeWidth="1.8" {...S} d="M200 96v-12" />
      <circle cx="200" cy="80" r="3" fill="#F6E6B4" />

      {/* pool */}
      <rect y="214" width="400" height="86" fill="url(#paAdPool)" />
      <g opacity=".32">
        <path fill="#F3EAD6" d={dome(200, 76, 320, 230)} />
        <path fill="#EFE5CD" d={dome(150, 46, 276, 232)} />
        <path fill="#EFE5CD" d={dome(250, 46, 276, 232)} />
      </g>
      <Ripples y={224} rows={7} color="#BFD6F2" opacity=".45" gap={10} />
    </>
  )
}

function AboveClouds() {
  return (
    <>
      <defs>
        <linearGradient id="paWgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1740" /><stop offset="40%" stopColor="#4C3F7E" />
          <stop offset="72%" stopColor="#B0648A" /><stop offset="100%" stopColor="#F0A96A" />
        </linearGradient>
        <linearGradient id="paWgWing" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0D0D12" /><stop offset="100%" stopColor="#33323E" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paWgSky)" />
      <Stars opacity=".55" />
      <Orb cx={296} cy={168} r={20} core="#FFE0AE" halo="#FF9A5E" />

      {/* cloud sea */}
      <path fill="#C98C86" opacity=".7"
        d="M0 190c30-14 52 4 82-4s48-14 78-4 44 16 74 6 44-14 76-4 40 12 90 4v112H0z" />
      <path fill="#EBB791" opacity=".75"
        d="M0 216c34-12 56 6 88-2s50-12 80-2 46 14 76 4 46-10 78-2 46 8 78 2v84H0z" />
      <path fill="#F6D8B8" opacity=".85"
        d="M0 246c40-10 62 8 96 0s54-10 84 0 50 10 80 2 50-6 84 0 34 4 56 2v50H0z" />

      {/* wing */}
      <path fill="url(#paWgWing)" d="M-6 300v-44l232-70 46-14-8 26-52 20L44 300z" />
      <path fill="#22212B" d="M272 172l-6 24 26-42z" />
      <path stroke="#8F94A8" strokeWidth="1.4" opacity=".8" {...S} d="M-6 258 268 172" />
      <g stroke="#5A5A6E" strokeWidth="1" opacity=".7" {...S}>
        <path d="M56 268l108-36M96 282l112-40M18 254l96-32" />
      </g>
      <circle cx="120" cy="252" r="2.6" fill="#FF6B5E" />
    </>
  )
}

/* ================================================================== Jakarta */

function Monas() {
  return (
    <>
      <defs>
        <linearGradient id="paMoSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A1552" /><stop offset="46%" stopColor="#9E4152" />
          <stop offset="80%" stopColor="#E1804E" /><stop offset="100%" stopColor="#F7BE78" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paMoSky)" />
      <Orb cx={78} cy={208} r={20} core="#FFD79A" halo="#FF9A62" />
      <path fill="#3A1F52" opacity=".8"
        d="M0 222h30v-16h14v16h26v-24h16v24h30v-14h18v14h44v-20h16v20h40v-12h18v12h40v-18h16v18h60v78H0z" />

      {/* Monas: a slim marble shaft on a broad two-tier pedestal */}
      <g>
        <path fill="#241338" d="M112 262h176v14H112z" />
        <path fill="#2E1A3E" d="M136 240h128v22H136z" />
        <path fill="#3D2450" d="M162 218h76v22h-76z" />
        <g stroke="#8E6A34" strokeWidth="1.2" opacity=".5" {...S}>
          <path d="M150 250h100M124 268h152" />
        </g>
        {/* the shaft, tapering as it rises */}
        <path fill="#F1E7D0" d="M193 218 196.4 92h7.2l3.4 126z" />
        <path fill="#CFC0A0" d="M202 218 203 92h1.4l2.6 126z" opacity=".6" />
        {/* the gold flame, small against the shaft */}
        <circle cx="200" cy="82" r="13" fill="#FFC978" opacity=".3" />
        <circle cx="200" cy="82" r="22" fill="#FFC978" opacity=".13" />
        <path fill="#C79A3E" d="M194 92h12l-2-6h-8z" />
        <path fill="#F2C05A" d="M200 68c-5 8-7 13-7 17 0 4 3 7 7 7s7-3 7-7c0-4-2-9-7-17z" />
        <path fill="#FFEDB4" d="M200 78c-2 4-3 6-3 8s1 3 3 3 3-1 3-3-1-4-3-8z" />
      </g>

      {/* plaza */}
      <rect y="276" width="400" height="24" fill="#1E1030" />
      <g stroke="#FFCE92" strokeWidth="1.2" opacity=".35" {...S}>
        <path d="M40 284h320M70 292h260" />
      </g>
      <Palm x={40} y={276} h={56} color="#1E1030" />
      <Palm x={358} y={276} h={50} color="#1E1030" flip />
      <g fill="#1E1030" opacity=".9">
        {[86, 102, 118, 300, 318].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={262 + (i % 2)} r="3.2" />
            <path d={`M${x - 3} ${266 + (i % 2)}h6v11h-6z`} />
          </g>
        ))}
      </g>
    </>
  )
}

function Istiqlal() {
  return (
    <>
      <defs>
        <linearGradient id="paIsSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123A6E" /><stop offset="55%" stopColor="#4E8CBE" />
          <stop offset="100%" stopColor="#B9D8E6" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paIsSky)" />
      <g fill="#FFFFFF" opacity=".3">
        <ellipse cx="72" cy="66" rx="34" ry="13" />
        <ellipse cx="98" cy="58" rx="24" ry="11" />
        <ellipse cx="322" cy="96" rx="30" ry="11" />
      </g>

      {/* minaret */}
      <g>
        <rect x="310" y="112" width="20" height="126" fill="#E9E2D2" />
        <rect x="306" y="150" width="28" height="6" fill="#C8BFA8" />
        <rect x="306" y="186" width="28" height="6" fill="#C8BFA8" />
        <path fill="#E9E2D2" d="M310 112h20l-10-20z" />
        <path stroke="#F3EAD6" strokeWidth="2" {...S} d="M320 92V70" />
        <circle cx="320" cy="66" r="4" fill="#DEC894" />
      </g>

      {/* body */}
      <rect x="96" y="192" width="196" height="46" fill="#E4DCCA" />
      <g fill="#20456E" opacity=".75">
        {[112, 140, 168, 196, 224, 252, 274].map((x) => (
          <rect key={x} x={x} y="204" width="12" height="26" rx="6" />
        ))}
      </g>
      {/* dome */}
      <rect x="132" y="172" width="128" height="22" fill="#DCD3BF" />
      <path fill="#EFE7D3" d="M132 174a64 62 0 0 1 128 0z" />
      <g stroke="#B9AE93" strokeWidth="1" opacity=".7" {...S}>
        <path d="M196 112v62M164 122c-6 18-8 36-8 52M232 122c6 18 8 36 8 52M140 152h120" />
      </g>
      <path stroke="#DEC894" strokeWidth="2.4" {...S} d="M196 112V96" />
      <circle cx="196" cy="92" r="4" fill="#DEC894" />

      <rect y="238" width="400" height="62" fill="#2C4A5E" />
      <rect y="238" width="400" height="10" fill="#3E6076" />
      <g stroke="#CFE4EE" strokeWidth="1.2" opacity=".3" {...S}>
        <path d="M30 256h340M60 268h280M90 280h220" />
      </g>
    </>
  )
}

function KotaTua() {
  return (
    <>
      <defs>
        <linearGradient id="paKtSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2B4A7E" /><stop offset="58%" stopColor="#C98A64" />
          <stop offset="100%" stopColor="#F3C98E" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paKtSky)" />
      <Orb cx={330} cy={92} r={18} core="#FFE7B4" halo="#FFB273" />

      {/* facade */}
      <rect x="48" y="150" width="304" height="90" fill="#EDE3CB" />
      <path fill="#B4442F" d="M40 150l32-26h256l32 26z" />
      <path fill="#9C3826" d="M40 150l32-26h12l-24 26z" opacity=".6" />
      {/* clock tower */}
      <rect x="176" y="96" width="48" height="54" fill="#EDE3CB" />
      <path fill="#B4442F" d="M170 96l30-24 30 24z" />
      <path fill="#8E5A3C" d="M194 66h12v8h-12z" />
      <circle cx="200" cy="120" r="13" fill="#F7F1DF" stroke="#8E7A55" strokeWidth="1.6" />
      <path stroke="#4A3B24" strokeWidth="1.6" {...S} d="M200 120v-8M200 120l6 4" />
      {/* shutters */}
      <g fill="#2F5B45">
        {[66, 96, 126, 246, 276, 306].map((x) => <rect key={x} x={x} y="166" width="18" height="26" rx="2" />)}
        {[66, 96, 126, 246, 276, 306].map((x) => <rect key={`b${x}`} x={x} y="204" width="18" height="26" rx="2" />)}
        {[152, 182, 212, 242].map((x) => <rect key={`c${x}`} x={x} y="176" width="16" height="24" rx="2" />)}
      </g>
      <g stroke="#C7B893" strokeWidth="1" opacity=".8" {...S}>
        <path d="M48 160h304M48 198h304" />
      </g>

      {/* square */}
      <rect y="240" width="400" height="60" fill="#6B5843" />
      <g stroke="#8A7458" strokeWidth="1.2" opacity=".7" {...S}>
        <path d="M0 254h400M0 270h400M0 286h400M40 240v60M120 240v60M200 240v60M280 240v60M360 240v60" />
      </g>
      {/* the coloured rental bicycle Kota Tua is known for */}
      <g transform="translate(292 246)">
        <circle cx="0" cy="18" r="12" fill="none" stroke="#F3EAD6" strokeWidth="2.4" />
        <circle cx="34" cy="18" r="12" fill="none" stroke="#F3EAD6" strokeWidth="2.4" />
        <path stroke="#E2565F" strokeWidth="3" {...S} d="M0 18l12-16h12l10 16M12 2l-4 16h26" />
        <path stroke="#F3EAD6" strokeWidth="2.2" {...S} d="M24 2h8M8 0h8" />
      </g>
      {/* tree */}
      <g>
        <path stroke="#3A2A1E" strokeWidth="7" {...S} d="M62 250v-30" />
        <circle cx="62" cy="204" r="26" fill="#2F5B45" />
        <circle cx="44" cy="214" r="17" fill="#37674E" />
        <circle cx="80" cy="212" r="16" fill="#28503C" />
      </g>
    </>
  )
}

/* ================================================================= Surabaya */

function HeroesMonument() {
  return (
    <>
      <defs>
        <linearGradient id="paTgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D5088" /><stop offset="60%" stopColor="#79ADCE" />
          <stop offset="100%" stopColor="#D9E9EC" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paTgSky)" />
      <g fill="#FFFFFF" opacity=".34">
        <ellipse cx="86" cy="70" rx="40" ry="15" /><ellipse cx="118" cy="60" rx="26" ry="12" />
        <ellipse cx="316" cy="52" rx="34" ry="13" /><ellipse cx="292" cy="62" rx="22" ry="10" />
      </g>

      {/* obelisk, fluted and tapering */}
      <path fill="#EFE7D5" d="M186 236 192 66h16l6 170z" />
      <g stroke="#C3B79A" strokeWidth="1.1" opacity=".85" {...S}>
        <path d="M195 70l-4 166M200 68v168M205 70l4 166" />
      </g>
      <path fill="#DED2B4" d="M208 236 202 66h6l6 170z" opacity=".7" />
      <path fill="#EFE7D5" d="M190 66h20l-10-14z" />
      <rect x="176" y="236" width="48" height="14" fill="#D9CDB0" />
      <rect x="164" y="250" width="72" height="12" fill="#C7BB9E" />

      {/* flag */}
      <g>
        <path stroke="#E9E2D2" strokeWidth="2.6" {...S} d="M300 258V150" />
        <path fill="#D8323C" d="M300 152h44v14h-44z" />
        <path fill="#F5EFE0" d="M300 166h44v14h-44z" />
      </g>

      {/* park */}
      <rect y="262" width="400" height="38" fill="#3E6B45" />
      <path fill="#335B3B" d="M0 262c40 10 80-6 120 2s70 12 118 4 90-14 162-2v34H0z" />
      <g>
        <circle cx="64" cy="242" r="22" fill="#2E5A3C" />
        <circle cx="42" cy="252" r="15" fill="#376A46" />
        <path stroke="#33241A" strokeWidth="6" {...S} d="M64 262v-18" />
      </g>
      <g>
        <circle cx="356" cy="248" r="19" fill="#2E5A3C" />
        <path stroke="#33241A" strokeWidth="5" {...S} d="M356 264v-14" />
      </g>
    </>
  )
}

function Suramadu() {
  return (
    <>
      <defs>
        <linearGradient id="paSuSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#341046" /><stop offset="42%" stopColor="#A93C5C" />
          <stop offset="76%" stopColor="#E9764F" /><stop offset="100%" stopColor="#F8C077" />
        </linearGradient>
        <linearGradient id="paSuSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#742A54" /><stop offset="100%" stopColor="#2A0E32" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paSuSky)" />
      <Orb cx={200} cy={186} r={30} core="#FFDE9C" halo="#FF8F53" />

      {/* pylons */}
      <g fill="#F1E7D0">
        <path d="M112 200 118 92h6l6 108h-8l-4-72-4 72z" />
        <path d="M276 200 282 92h6l6 108h-8l-4-72-4 72z" />
      </g>
      <g stroke="#F3EAD6" strokeWidth="2.6" {...S}>
        <path d="M121 200V92M285 200V92" />
      </g>
      {/* cable fans */}
      <g stroke="#FFE3AC" strokeWidth="1.1" opacity=".85" {...S}>
        <path d="M121 100 40 196M121 112 62 196M121 124 84 196M121 136 106 196" />
        <path d="M121 100 202 196M121 112 180 196M121 124 158 196M121 136 136 196" />
        <path d="M285 100 204 196M285 112 226 196M285 124 248 196M285 136 270 196" />
        <path d="M285 100 366 196M285 112 344 196M285 124 322 196M285 136 300 196" />
      </g>
      <path stroke="#F3EAD6" strokeWidth="3.2" {...S} d="M0 198h400" />
      <g stroke="#FFE9BE" strokeWidth="1.6" opacity=".9" {...S}>
        <path d="M20 194h10M60 194h10M150 194h10M240 194h10M330 194h10M370 194h10" />
      </g>

      {/* strait */}
      <rect y="202" width="400" height="98" fill="url(#paSuSea)" />
      <path fill="#FFC079" opacity=".45" d="M186 202h28l16 98h-60z" />
      <Ripples y={212} rows={8} color="#FFCE92" opacity=".45" gap={11} />
      {/* fishing boat */}
      <g transform="translate(300 238)">
        <path fill="#180A22" d="M-18 0h36l-6 9h-24z" />
        <path stroke="#180A22" strokeWidth="2" {...S} d="M0 0v-18M0-18l12 14h-12" />
      </g>
    </>
  )
}

function AlAkbar() {
  return (
    <>
      <defs>
        <linearGradient id="paAkSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10294E" /><stop offset="52%" stopColor="#3E6E96" />
          <stop offset="100%" stopColor="#E3B384" />
        </linearGradient>
        <linearGradient id="paAkDome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#63C8C0" /><stop offset="100%" stopColor="#1E7E86" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paAkSky)" />
      <Stars opacity=".4" />
      <Orb cx={64} cy={200} r={16} core="#FFE0A8" halo="#FF9C5E" />

      {/* minaret */}
      <g>
        <rect x="330" y="106" width="18" height="130" fill="#EDE3CB" />
        <rect x="326" y="142" width="26" height="6" fill="#C9BDA0" />
        <rect x="326" y="180" width="26" height="6" fill="#C9BDA0" />
        <path fill="url(#paAkDome)" d="M330 106a9 9 0 0 1 18 0z" />
        <path stroke="#DEC894" strokeWidth="2" {...S} d="M339 96V78" />
        <circle cx="339" cy="74" r="3.4" fill="#DEC894" />
      </g>

      {/* body + small domes */}
      <rect x="70" y="196" width="240" height="42" fill="#E7DDC7" />
      <g fill="url(#paAkDome)">
        {[104, 148, 232, 276].map((x) => (
          <path key={x} d={`M${x - 20} 196a20 18 0 0 1 40 0z`} />
        ))}
      </g>
      <path fill="url(#paAkDome)" d="M132 194a68 62 0 0 1 136 0z" />
      <g stroke="#0F5A63" strokeWidth="1.2" opacity=".55" {...S}>
        <path d="M200 132v62M166 142c-8 16-12 34-12 52M234 142c8 16 12 34 12 52M146 170h108" />
      </g>
      <path stroke="#DEC894" strokeWidth="2.4" {...S} d="M200 132v-16" />
      <circle cx="200" cy="112" r="4" fill="#DEC894" />
      <g fill="#1B3A5E" opacity=".7">
        {[86, 116, 146, 254, 284].map((x) => <rect key={x} x={x} y="210" width="14" height="28" rx="7" />)}
      </g>

      <rect y="238" width="400" height="62" fill="#22354E" />
      <g stroke="#7FA8C4" strokeWidth="1.2" opacity=".35" {...S}>
        <path d="M20 252h360M50 266h300M80 282h240" />
      </g>
      <Palm x={40} y={244} h={48} color="#12202F" />
      <Palm x={374} y={248} h={42} color="#12202F" flip />
    </>
  )
}

/* =================================================================== Sydney */

function OperaHouse() {
  const shell = (x, s) =>
    `M${x} ${196} C${x} ${196 - 70 * s} ${x + 34 * s} ${196 - 96 * s} ${x + 62 * s} ${196 - 104 * s} C${x + 52 * s} ${196 - 60 * s} ${x + 44 * s} ${196 - 20 * s} ${x + 44 * s} 196 Z`
  return (
    <>
      <defs>
        <linearGradient id="paOpSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123B5E" /><stop offset="48%" stopColor="#4E8CAE" />
          <stop offset="82%" stopColor="#E7B98E" /><stop offset="100%" stopColor="#F6DCB4" />
        </linearGradient>
        <linearGradient id="paOpSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2B6C8E" /><stop offset="100%" stopColor="#0E2C44" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paOpSky)" />
      <Orb cx={68} cy={92} r={20} core="#FFEAC0" halo="#FFC489" />
      {/* far city */}
      <path fill="#1C3E5C" opacity=".85"
        d="M0 196h22v-40h12v40h20v-56h14v56h18v-30h14v30h22v-46h12v46h30v-24h14v24h22v-34h12v34h20v-52h12v52h30v-28h12v28h40v-20h12v20h34v104H0z" />

      {/* shells */}
      <g fill="#F4ECDA">
        <path d={shell(96, 0.62)} />
        <path d={shell(126, 0.82)} />
        <path d={shell(164, 1)} />
      </g>
      <g fill="#E3D8C0">
        <path d={shell(212, 0.55)} />
        <path d={shell(240, 0.76)} />
      </g>
      <g stroke="#C6B99B" strokeWidth=".9" opacity=".7" {...S}>
        <path d="M172 196c0-38 12-70 30-90M186 196c0-32 10-58 26-76M226 196c0-24 8-44 20-58" />
      </g>
      <rect x="80" y="192" width="200" height="12" fill="#D8CCB2" />
      <rect x="80" y="204" width="200" height="8" fill="#A99C80" />

      {/* harbour */}
      <rect y="212" width="400" height="88" fill="url(#paOpSea)" />
      <g opacity=".28" fill="#F4ECDA">
        <path d="M164 216c0 30 10 56 28 74-8-30-4-52 12-74z" />
      </g>
      <Ripples y={224} rows={7} color="#BFE2F2" opacity=".4" gap={11} />
      {/* ferry */}
      <g transform="translate(322 244)">
        <path fill="#F3EAD6" d="M-22 0h44l-6 10h-32z" />
        <rect x="-12" y="-10" width="24" height="10" fill="#F3EAD6" />
        <rect x="-3" y="-20" width="6" height="10" fill="#D8CCB2" />
      </g>
    </>
  )
}

function HarbourBridge() {
  return (
    <>
      <defs>
        <linearGradient id="paHbSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#153A64" /><stop offset="46%" stopColor="#5C8CB6" />
          <stop offset="84%" stopColor="#EAC091" /><stop offset="100%" stopColor="#F7DFBC" />
        </linearGradient>
        <linearGradient id="paHbSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E6B8E" /><stop offset="100%" stopColor="#0D2A42" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paHbSky)" />
      <g fill="#FFFFFF" opacity=".26">
        <ellipse cx="316" cy="58" rx="42" ry="14" /><ellipse cx="284" cy="66" rx="26" ry="10" />
      </g>
      <path fill="#1B3F5E" opacity=".7"
        d="M0 200h26v-34h12v34h24v-46h12v46h28v-26h12v26h286v100H0z" />

      {/* arch */}
      <path fill="none" stroke="#2C3140" strokeWidth="9" strokeLinecap="round" d="M44 198C104 96 296 96 356 198" />
      <path fill="none" stroke="#3C4354" strokeWidth="4" strokeLinecap="round" d="M44 198C104 118 296 118 356 198" />
      <g stroke="#2C3140" strokeWidth="2.6" {...S}>
        {[72, 100, 128, 156, 184, 212, 240, 268, 296, 324].map((x) => {
          const t = (x - 44) / 312
          const yTop = 198 - Math.sin(Math.PI * t) * 84
          return <path key={x} d={`M${x} 196V${yTop.toFixed(1)}`} />
        })}
      </g>
      <path stroke="#4A5164" strokeWidth="6" {...S} d="M0 196h400" />
      {/* pylons */}
      <g fill="#C9BFA6">
        <rect x="52" y="150" width="22" height="52" /><rect x="326" y="150" width="22" height="52" />
        <rect x="48" y="144" width="30" height="8" /><rect x="322" y="144" width="30" height="8" />
      </g>

      <rect y="202" width="400" height="98" fill="url(#paHbSea)" />
      <g opacity=".22">
        <path fill="none" stroke="#2C3140" strokeWidth="7" d="M44 206C104 300 296 300 356 206" />
      </g>
      <Ripples y={216} rows={8} color="#B7DEF2" opacity=".4" gap={11} />
      <g transform="translate(112 250)">
        <path fill="#F3EAD6" d="M-20 0h40l-6 9h-28z" />
        <rect x="-10" y="-9" width="20" height="9" fill="#F3EAD6" />
        <path stroke="#D8CCB2" strokeWidth="2" {...S} d="M0-9v-8" />
      </g>
    </>
  )
}

function Bondi() {
  return (
    <>
      <defs>
        <linearGradient id="paBdSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B5A92" /><stop offset="62%" stopColor="#7FB6D6" />
          <stop offset="100%" stopColor="#E8DCC0" />
        </linearGradient>
        <linearGradient id="paBdSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E7C96" /><stop offset="100%" stopColor="#3FB8B0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paBdSky)" />
      <Orb cx={306} cy={62} r={19} core="#FFF0CC" halo="#FFD08A" />
      <g fill="#FFFFFF" opacity=".3">
        <ellipse cx="88" cy="60" rx="36" ry="13" /><ellipse cx="120" cy="52" rx="22" ry="10" />
      </g>

      {/* headland */}
      <path fill="#4B6B4E" d="M300 148c26-6 60 2 100 10v46H286z" />
      <path fill="#6E6A50" d="M300 168c30-4 62 2 100 8v28H300z" />
      <g fill="#F1E7D0" opacity=".85">
        <rect x="330" y="150" width="10" height="8" /><rect x="352" y="146" width="12" height="12" />
        <rect x="376" y="150" width="10" height="8" />
      </g>

      {/* sea */}
      <rect y="150" width="400" height="86" fill="url(#paBdSea)" />
      <g stroke="#EAF7F4" strokeWidth="2" opacity=".8" {...S}>
        <path d="M0 176c40-8 78 8 120 0s78-10 120 0 78 6 160-4" />
        <path d="M0 196c46-8 84 8 128 0s82-10 126 0 78 6 146-4" />
      </g>
      {/* surf */}
      <path fill="#F6FBF9" d="M0 214c50-10 92 10 142 2s86-12 132-2 78 8 126 0v18H0z" />
      {/* sand */}
      <path fill="#EFDDB8" d="M0 230c52-8 96 10 148 2s88-10 132 0 76 6 120-2v70H0z" />
      <path fill="#E2CBA0" opacity=".7" d="M0 254c60-6 104 10 156 2s84-8 128 0 74 4 116-2v46H0z" />
      {/* umbrella + surfer */}
      <g transform="translate(88 258)">
        <path stroke="#8E7A55" strokeWidth="2.4" {...S} d="M0 0v-22" />
        <path fill="#E2565F" d="M-22-22a22 11 0 0 1 44 0z" />
      </g>
      <g transform="translate(232 236)" fill="#1F3138">
        <circle cx="0" cy="-16" r="4" />
        <path d="M-3-12h6v14h-6z" />
        <path stroke="#1F3138" strokeWidth="2.6" {...S} d="M-3 2l-6 10M3 2l6 10M-3-8l-9 4M3-8l10 3" />
        <path fill="#F1E7D0" d="M16 10a14 5 0 0 1-28 0z" opacity=".9" />
      </g>
    </>
  )
}

/* ===================================================================== Bali */

function TanahLot() {
  const meru = (x, y, w, tiers) => (
    <g>
      {Array.from({ length: tiers }, (_, i) => {
        const ww = w - i * (w / (tiers + 1.5))
        const yy = y - i * 13
        return (
          <path key={i} fill="#2A1A14" stroke="#12100E" strokeWidth="1"
                d={`M${x - ww / 2} ${yy} ${x} ${yy - 12} ${x + ww / 2} ${yy} Z`} />
        )
      })}
      <path stroke="#DEC894" strokeWidth="1.8" {...S} d={`M${x} ${y - tiers * 13 - 6}v-8`} />
    </g>
  )
  return (
    <>
      <defs>
        <linearGradient id="paTnSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E1250" /><stop offset="40%" stopColor="#A8395E" />
          <stop offset="74%" stopColor="#EE7B4E" /><stop offset="100%" stopColor="#FBCB84" />
        </linearGradient>
        <linearGradient id="paTnSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8C3559" /><stop offset="100%" stopColor="#33122F" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paTnSky)" />
      <Orb cx={310} cy={182} r={28} core="#FFE2A2" halo="#FF8C4E" />
      <g stroke="#FFD9A2" strokeWidth="1.6" opacity=".7" {...S}>
        <path d="M60 66c6-5 12-5 18 0M84 60c6-5 12-5 18 0M50 84c5-4 10-4 15 0" />
      </g>

      {/* rock */}
      <path fill="#2A1A22" d="M112 206c4-22 14-32 30-38 10-16 34-18 46-6 16-2 28 6 32 20 8 6 12 14 12 24z" />
      <path fill="#1C1018" d="M120 206c8-14 20-20 34-20s28 8 34 20z" opacity=".7" />
      {meru(168, 162, 46, 3)}
      {meru(206, 170, 32, 2)}
      <path fill="#2A1A14" d="M144 172h84v6h-84z" />

      {/* sea */}
      <rect y="206" width="400" height="94" fill="url(#paTnSea)" />
      <path fill="#FFC98A" opacity=".22" d="M296 206h28l30 94h-88z" />
      {/* surf breaking round the base of the rock */}
      <g fill="#F6E2CE">
        <ellipse cx="168" cy="209" rx="74" ry="6" opacity=".34" />
        <ellipse cx="168" cy="216" rx="94" ry="5" opacity=".2" />
      </g>
      <g stroke="#FBEEDD" strokeWidth="1.6" opacity=".4" {...S}>
        <path d="M104 212c22-6 44-7 64-6M206 207c22 1 40 4 58 8M84 224c40-8 84-9 122-4" />
      </g>
      <Ripples y={236} rows={6} color="#FFD09A" opacity=".4" gap={12} />
    </>
  )
}

function RiceTerraces() {
  const band = (y, h, from, to) => (
    <path fill={from} d={`M0 ${y} C90 ${y - 16} 220 ${y + 14} 400 ${y - 8} L400 ${y + h} C220 ${y + h + 12} 90 ${y + h - 14} 0 ${y + h} Z`} stroke={to} strokeWidth="1.2" />
  )
  return (
    <>
      <defs>
        <linearGradient id="paRcSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A5E7E" /><stop offset="60%" stopColor="#93C0BE" />
          <stop offset="100%" stopColor="#EAE0C2" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paRcSky)" />
      <Orb cx={92} cy={64} r={17} core="#FFF3D2" halo="#FFE0A0" />
      {/* far ridge + mist */}
      <path fill="#4E7A70" opacity=".75" d="M0 128c60-26 108 8 164-10s118-24 236 4v40H0z" />
      <path fill="#F0EBD8" opacity=".35" d="M0 146c80-12 130 12 200 4s120-16 200-6v22H0z" />

      {/* terraces */}
      {band(160, 20, '#5E9A63', '#3F6E48')}
      {band(184, 22, '#69A868', '#43764C')}
      {band(210, 24, '#74B46C', '#487C50')}
      {band(238, 26, '#7FC072', '#4C8254')}
      {band(268, 30, '#8ACB77', '#508857')}
      <g stroke="#F3F7E4" strokeWidth="1" opacity=".45" {...S}>
        <path d="M20 176c80-10 180 8 300-4M20 204c80-10 180 8 300-4M20 232c80-10 180 8 300-4M20 262c80-10 180 8 300-4" />
      </g>

      <Palm x={330} y={196} h={64} color="#2C5340" />
      <Palm x={362} y={210} h={50} color="#24462F" flip />
      {/* farmer in a conical hat */}
      <g transform="translate(140 224)" fill="#2F4A38">
        <path d="M-9 -14a9 9 0 0 1 18 0z" fill="#D8C48C" />
        <circle cx="0" cy="-8" r="3.4" />
        <path d="M-4-4h8v12h-8z" />
        <path stroke="#2F4A38" strokeWidth="2.2" {...S} d="M-4 8l-4 8M4 8l4 8" />
      </g>
    </>
  )
}

function Uluwatu() {
  // candi bentar: one gate split down the middle, each half stepped on its
  // outer edge and sheer on the face that looks through the gap.
  const GAP = 140
  const half = (mirror) => {
    const p = 'M92 208V190h6v-18h5v-16h5v-14h4v-14h19v70Z'
    return (
      <path key={String(mirror)} fill="#2C2233" stroke="#171021" strokeWidth="1" d={p}
            transform={mirror ? `translate(${GAP * 2} 0) scale(-1 1)` : undefined} />
    )
  }
  return (
    <>
      <defs>
        <linearGradient id="paUlSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241452" /><stop offset="40%" stopColor="#8E3A6E" />
          <stop offset="74%" stopColor="#E2734F" /><stop offset="100%" stopColor="#F9C57F" />
        </linearGradient>
        <linearGradient id="paUlSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5E2A62" /><stop offset="100%" stopColor="#1E0C2C" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paUlSky)" />
      <Orb cx={318} cy={168} r={26} core="#FFE0A0" halo="#FF8F52" />
      <g fill="#2A1638" opacity=".7">
        {[[62, 86], [86, 78], [110, 90]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y}c4-5 9-5 13 0-5-2-9-2-13 0z`} />
        ))}
      </g>

      {/* sea */}
      <rect y="196" width="400" height="104" fill="url(#paUlSea)" />
      <path fill="#FFC585" opacity=".22" d="M304 196h28l34 104h-96z" />
      <Ripples y={214} rows={7} color="#FFC98F" opacity=".3" gap={12} />

      {/* the cliff: a flat top to stand the gate on, then a sheer drop */}
      <path fill="#2A2033"
        d="M0 300V196c62-6 118-2 168 8 22 4 34 10 40 18 8 10 10 22 8 36 -2 16-6 28-10 42z" />
      <path fill="#1B1424" opacity=".85"
        d="M0 300V232c50-4 96 2 134 14 18 6 28 16 32 28 2 8 2 17 0 26z" />
      <g stroke="#4A3B54" strokeWidth="1.2" opacity=".75" {...S}>
        <path d="M14 240c30 2 58 8 82 20M4 268c28 0 54 6 76 16" />
      </g>
      <path stroke="#5C4A68" strokeWidth="1.6" opacity=".8" {...S} d="M0 208c58-4 112 0 160 8" />

      {/* the split gate, standing on the clifftop */}
      <rect x="80" y="208" width="120" height="8" fill="#241B2C" />
      {[false, true].map(half)}
      <g stroke="#DEC894" strokeWidth="1.3" opacity=".75" {...S}>
        <path d="M126 176v-10M154 176v-10" />
      </g>
      {/* steps down to the temple */}
      <g stroke="#3D3049" strokeWidth="2" {...S}>
        <path d="M204 224h20M210 234h20M216 244h20M222 254h20" />
      </g>
    </>
  )
}

/* =========================================================== Guangzhou · HK */

function CantonTower() {
  // A hyperboloid is a straight-sided shape: every member is a straight line
  // from the base ring to the top ring, offset by a twist. Drawing it that way
  // — rather than as two curves — is what gives it the pinched waist.
  const BASE_Y = 254, TOP_Y = 74, RB = 44, RT = 19, RW = 13, WAIST = 0.6, TWIST = 1.05
  const xAt = (r, a) => 200 + r * Math.cos(a)
  const members = []
  for (let k = 0; k <= 14; k++) {
    const a = (Math.PI * k) / 14
    members.push([xAt(RB, a), xAt(RT, a + TWIST)])
    members.push([xAt(RB, a), xAt(RT, a - TWIST)])
  }
  const radiusAt = (t) =>
    t < WAIST
      ? RW + (RB - RW) * Math.pow((WAIST - t) / WAIST, 1.5)
      : RW + (RT - RW) * Math.pow((t - WAIST) / (1 - WAIST), 1.5)
  const rings = Array.from({ length: 15 }, (_, i) => {
    const t = i / 14
    return [BASE_Y - t * (BASE_Y - TOP_Y), radiusAt(t)]
  })
  return (
    <>
      <defs>
        <linearGradient id="paCtSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0B28" /><stop offset="52%" stopColor="#2B1C52" />
          <stop offset="100%" stopColor="#6B2C63" />
        </linearGradient>
        <linearGradient id="paCtSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A1B4E" /><stop offset="100%" stopColor="#100A22" />
        </linearGradient>
        <linearGradient id="paCtTwr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF7FC4" /><stop offset="50%" stopColor="#B769D8" />
          <stop offset="100%" stopColor="#5FC8E2" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paCtSky)" />
      <Stars opacity=".55" />

      {/* skyline behind */}
      <path fill="#1A1236" opacity=".95"
        d="M0 250h30v-56h16v56h22v-84h16v84h24v-44h14v44h26v-70h14v70h130v-60h16v60h32v-88h16v88h44v104H0z" />
      <g fill="#FFE9A8" opacity=".5">
        {[10, 34, 74, 118, 158, 300, 344].map((x, i) =>
          Array.from({ length: 4 }, (_, j) => (
            <rect key={`${x}-${j}`} x={x + 4} y={210 - j * 12 - (i % 2) * 6} width="3" height="5" />
          )))}
      </g>

      {/* the lattice: straight members, base ring to top ring, twisted */}
      <g stroke="url(#paCtTwr)" strokeWidth="1.5" opacity=".9" {...S}>
        {members.map(([xb, xt], i) => (
          <path key={i} d={`M${xb.toFixed(1)} ${BASE_Y}L${xt.toFixed(1)} ${TOP_Y}`}
                opacity={0.35 + 0.5 * Math.abs(Math.cos((Math.PI * (i % 15)) / 14))} />
        ))}
      </g>
      {/* the two outermost members carry the silhouette */}
      <g stroke="#FF9ED8" strokeWidth="2.6" opacity=".95" {...S}>
        <path d={`M${200 - RB} ${BASE_Y}L${(200 - RW * 1.5).toFixed(1)} 170`} />
        <path d={`M${200 + RB} ${BASE_Y}L${(200 + RW * 1.5).toFixed(1)} 170`} />
        <path d={`M${(200 - RW * 1.5).toFixed(1)} 170L${200 - RT} ${TOP_Y}`} />
        <path d={`M${(200 + RW * 1.5).toFixed(1)} 170L${200 + RT} ${TOP_Y}`} />
      </g>
      <g stroke="#7FE2F0" strokeWidth="1.1" opacity=".7" {...S}>
        {rings.map(([y, r], i) => (
          <path key={i} d={`M${(200 - r).toFixed(1)} ${y.toFixed(1)}h${(r * 2).toFixed(1)}`} />
        ))}
      </g>
      {/* observation pod at the waist, and the spire */}
      <ellipse cx="200" cy={BASE_Y - (BASE_Y - TOP_Y) * WAIST} rx="17" ry="5" fill="#FFE9A8" opacity=".8" />
      <path stroke="#FFE9A8" strokeWidth="2" {...S} d={`M200 ${TOP_Y}V26`} />
      <g stroke="#FFF0C4" strokeWidth="1.2" opacity=".8" {...S}>
        <path d="M194 48h12M196 36h8" />
      </g>
      <circle cx="200" cy="22" r="3.4" fill="#FFF0C4" />
      <circle cx="200" cy="22" r="13" fill="#FFD98A" opacity=".25" />

      {/* river */}
      <rect y={BASE_Y} width="400" height={300 - BASE_Y} fill="url(#paCtSea)" />
      <g opacity=".4">
        <path stroke="url(#paCtTwr)" strokeWidth="2.4" {...S}
              d={`M${200 - RB} 256c14 16 20 28 24 44M${200 + RB} 256c-14 16-20 28-24 44`} />
      </g>
      <Ripples y={262} rows={4} color="#E39BE0" opacity=".35" gap={10} />
    </>
  )
}

function PearlRiver() {
  return (
    <>
      <defs>
        <linearGradient id="paPrSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080A24" /><stop offset="56%" stopColor="#241748" />
          <stop offset="100%" stopColor="#54235A" />
        </linearGradient>
        <linearGradient id="paPrSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3C1C50" /><stop offset="100%" stopColor="#0C0820" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paPrSky)" />
      <Stars opacity=".5" />
      <g>
        <circle cx="336" cy="52" r="15" fill="#FFF3D4" opacity=".9" />
        <circle cx="336" cy="52" r="26" fill="#FFE9A8" opacity=".16" />
      </g>

      {/* skyline */}
      <path fill="#150E30"
        d="M0 206h24v-38h14v38h20v-64h16v64h18v-28h12v28h26v-78h18v78h24v-46h14v46h28v-92h18v92h26v-34h14v34h30v-58h16v58h26v-42h14v42h38v94H0z" />
      <g fill="#FFD98A" opacity=".65">
        {[4, 30, 66, 100, 132, 176, 214, 254, 288, 330, 364].map((x, i) =>
          Array.from({ length: 5 }, (_, j) => (
            <rect key={`${x}-${j}`} x={x + 5} y={196 - j * 11 - (i % 3) * 5} width="3.4" height="5" opacity={(j % 2) ? 0.6 : 1} />
          )))}
      </g>
      <g stroke="#7FE2E8" strokeWidth="1.6" opacity=".7" {...S}>
        <path d="M100 142v-4M176 128v-4M254 116v-4M330 148v-4" />
      </g>

      {/* bridge */}
      <g stroke="#E39BE0" strokeWidth="1.8" opacity=".8" {...S}>
        <path d="M0 214h400" />
        <path d="M60 214v-22M340 214v-22" />
        <path d="M0 206c60-16 120-16 180 0M220 206c60-16 120-16 180 0" opacity=".6" />
      </g>

      {/* river */}
      <rect y="216" width="400" height="84" fill="url(#paPrSea)" />
      <g fill="#FFD98A" opacity=".18">
        {[30, 100, 176, 254, 330].map((x) => <rect key={x} x={x} y="216" width="8" height="84" />)}
      </g>
      {/* lit cruise boat */}
      <g transform="translate(196 252)">
        <path fill="#2A1240" stroke="#FFD98A" strokeWidth="1.4" d="M-46 0h92l-10 16h-72z" />
        <rect x="-32" y="-14" width="64" height="14" fill="#2A1240" stroke="#FFD98A" strokeWidth="1.2" />
        <g fill="#FFE9A8">
          {[-26, -16, -6, 4, 14, 24].map((x) => <rect key={x} x={x} y="-11" width="5" height="7" />)}
        </g>
        <path stroke="#FF9ED2" strokeWidth="1.4" {...S} d="M-46-2h92" />
        <circle cx="0" cy="-20" r="2.4" fill="#FFF0C4" />
      </g>
      <Ripples y={272} rows={3} color="#FFD98A" opacity=".28" gap={10} />
    </>
  )
}

function ChenClan() {
  return (
    <>
      <defs>
        <linearGradient id="paCcSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B3560" /><stop offset="58%" stopColor="#8B7A9E" />
          <stop offset="100%" stopColor="#E8C3A0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#paCcSky)" />
      <Orb cx={330} cy={72} r={16} core="#FFE9C0" halo="#FFC084" />

      {/* wall, columns and doorway — the roof sits on these */}
      <rect x="66" y="196" width="268" height="66" fill="#B4A891" />
      <rect x="66" y="196" width="268" height="7" fill="#8B816F" />
      <g stroke="#9A9080" strokeWidth="1" opacity=".7" {...S}>
        <path d="M66 218h268M66 240h268" />
      </g>
      <g fill="#8E3A2E">
        <rect x="90" y="200" width="12" height="62" /><rect x="298" y="200" width="12" height="62" />
      </g>
      <path fill="#5E2A24" d="M170 262v-40a30 30 0 0 1 60 0v40z" />
      <path stroke="#DEC894" strokeWidth="1.3" opacity=".85" {...S} d="M200 224v38" />
      <circle cx="189" cy="240" r="2.6" fill="#DEC894" />
      <circle cx="211" cy="240" r="2.6" fill="#DEC894" />
      <g fill="#3E5458" stroke="#DEC894" strokeWidth=".8" opacity=".9">
        <rect x="114" y="210" width="38" height="30" rx="2" />
        <rect x="248" y="210" width="38" height="30" rx="2" />
      </g>
      <g stroke="#DEC894" strokeWidth=".7" opacity=".5" {...S}>
        <path d="M133 210v30M114 225h38M267 210v30M248 225h38" />
      </g>

      {/* the roof: a flat ridge across the middle, straight-ish slopes, and
          corners that flick up — the Lingnan silhouette */}
      <path fill="#3A3A46" stroke="#1D1D26" strokeWidth="1.2"
        d="M132 158 H268 C302 164 330 178 350 194 L366 184 L358 200 L42 200 L34 184 L50 194
           C70 178 98 164 132 158 Z" />
      <g stroke="#25252F" strokeWidth="1" opacity=".7" {...S}>
        {[62, 86, 110, 134, 158, 182, 206, 230, 254, 278, 302, 326, 350].map((x) => {
          const d = (x - 200) / 150
          return <path key={x} d={`M${(200 + d * 68).toFixed(0)} ${(158 + Math.abs(d) * 6).toFixed(0)}L${x} 199`} />
        })}
      </g>
      <path stroke="#55556A" strokeWidth="1.6" opacity=".9" {...S} d="M42 199h316" />

      {/* the painted pottery ridge the hall is known for */}
      <rect x="132" y="150" width="136" height="8" fill="#7A5C2C" />
      <g fill="#DEC894">
        {[142, 160, 178, 196, 214, 232, 250, 262].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy="143" r="3.6" opacity={0.92 - i * 0.04} />
            <path d={`M${x - 3.4} 150v-4h6.8v4z`} opacity={0.85 - i * 0.04} />
          </g>
        ))}
      </g>
      <g fill="#C24A3E">
        {[151, 187, 223, 256].map((x) => <path key={x} d={`M${x} 146c0-5 2.6-8 5-8s5 3 5 8z`} />)}
      </g>

      {/* lanterns under the eave */}
      {[122, 278].map((x) => (
        <g key={x}>
          <path stroke="#2A2A34" strokeWidth="1.4" {...S} d={`M${x} 200v6`} />
          <ellipse cx={x} cy="217" rx="8.5" ry="10.5" fill="#D8323C" />
          <path stroke="#DEC894" strokeWidth="1" {...S} d={`M${x - 8.5} 217h17M${x} 228v5`} />
        </g>
      ))}

      {/* courtyard */}
      <rect y="262" width="400" height="38" fill="#6E6558" />
      <g stroke="#867C6C" strokeWidth="1.2" opacity=".8" {...S}>
        <path d="M0 276h400M0 290h400M60 262v38M160 262v38M260 262v38M340 262v38" />
      </g>
      <g>
        <path stroke="#3A2A1E" strokeWidth="6" {...S} d="M370 268v-24" />
        <circle cx="370" cy="228" r="22" fill="#2F5B45" />
        <circle cx="352" cy="240" r="14" fill="#37674E" />
      </g>
    </>
  )
}

/* ------------------------------------------------------------------ export */

export const PLACE_ART = {
  capitol: Capitol,
  grandMosque: GrandMosque,
  aboveClouds: AboveClouds,
  monas: Monas,
  istiqlal: Istiqlal,
  kotaTua: KotaTua,
  heroes: HeroesMonument,
  suramadu: Suramadu,
  alAkbar: AlAkbar,
  opera: OperaHouse,
  harbourBridge: HarbourBridge,
  bondi: Bondi,
  tanahLot: TanahLot,
  riceTerraces: RiceTerraces,
  uluwatu: Uluwatu,
  cantonTower: CantonTower,
  pearlRiver: PearlRiver,
  chenClan: ChenClan,
}

/**
 * One scene, cropped to whatever box it is given.
 * Decorative by default — the caption next to it carries the meaning.
 */
export default function PlaceArt({ art, className = '', title, align = 'xMidYMid' }) {
  const Scene = PLACE_ART[art]
  if (!Scene) return null
  // In a box wider than 4:3 the scene is cropped top and bottom. `xMidYMin`
  // keeps the sky and the top of the landmark and crops the foreground
  // instead, which is what the backdrop wants.
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio={`${align} slice`}
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : 'true'}
    >
      {title && <title>{title}</title>}
      <Scene />
    </svg>
  )
}
