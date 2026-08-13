/*
 * A drawn skyline for each stop.
 *
 * Line art rather than photography: it keeps the gold-on-black identity, adds
 * no image weight to the page, stays sharp on any screen, and sidesteps the
 * licensing question entirely. Each is the landmark that city is actually
 * known for, not a generic skyline.
 */

const BASE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/* Monas — the National Monument, with its flame */
const Jakarta = () => (
  <>
    <path {...BASE} d="M188 96V52m24 44V52" />
    <path {...BASE} d="M182 96h36M176 100h48" />
    <path {...BASE} d="M194 52h12" />
    <path {...BASE} d="M200 52V34" />
    <path {...BASE} d="M200 34c-5-4-4-11 0-15 4 4 5 11 0 15Z" />
    <path {...BASE} strokeWidth="1.1" d="M120 100V72h22v28M150 100V80h16v20M242 100V78h18v22M268 100V86h20v14M92 100V84h20v16" />
    <path {...BASE} strokeWidth="0.9" opacity="0.5" d="M126 78h4M134 78h4M126 86h4M134 86h4M248 84h4M256 84h4M248 92h4M256 92h4" />
    <path {...BASE} strokeWidth="1.1" d="M40 100h320" />
  </>
)

/* Suramadu — the cable-stayed bridge to Madura */
const Surabaya = () => (
  <>
    <path {...BASE} d="M150 100V40m100 60V40" />
    <path {...BASE} d="M142 40h16m84 0h16" />
    <path {...BASE} d="M60 84h280" />
    <path {...BASE} strokeWidth="0.9" opacity="0.75"
      d="M150 46 78 84M150 54 100 84M150 62l-28 22M150 70l-14 14M250 46l72 38M250 54l50 30M250 62l28 22M250 70l14 14" />
    <path {...BASE} strokeWidth="1.1" d="M150 84h100" />
    <path {...BASE} strokeWidth="0.9" opacity="0.45" d="M60 100h280" />
    <path {...BASE} strokeWidth="0.9" opacity="0.6" d="M74 94c8-3 16-3 24 0s16 3 24 0M278 94c8-3 16-3 24 0" />
  </>
)

/* The Opera House shells and the Harbour Bridge arch */
const Sydney = () => (
  <>
    <path {...BASE} d="M60 88h120" />
    <path {...BASE} d="M96 88c0-22 12-34 26-38-6 12-8 24-8 38" />
    <path {...BASE} d="M118 88c0-18 11-30 24-34-6 11-8 21-8 34" />
    <path {...BASE} d="M140 88c0-14 9-24 19-27-5 9-6 17-6 27" />
    <path {...BASE} strokeWidth="0.9" opacity="0.55" d="M104 88c2-14 8-24 16-30M126 88c2-12 7-21 14-26" />
    <path {...BASE} d="M214 88c0-26 22-42 46-42s46 16 46 42" />
    <path {...BASE} d="M206 88h108" />
    <path {...BASE} strokeWidth="1.1" d="M232 62V88m28-34v34m28 26V62" />
    <path {...BASE} strokeWidth="1.2" d="M238 88V72h-12v16m56 0V72h12v16" />
    <path {...BASE} strokeWidth="0.9" opacity="0.45" d="M40 100h320" />
  </>
)

/* Candi Bentar — the split temple gate */
const Bali = () => (
  <>
    <path {...BASE} d="M162 100V44l-14 4v52m14-56h-14" />
    <path {...BASE} d="M238 100V44l14 4v52m-14-56h14" />
    <path {...BASE} strokeWidth="0.9" opacity="0.7"
      d="M150 58h12m-12 10h12m-12 10h12m-12 10h12M238 58h12m-12 10h12m-12 10h12m-12 10h12" />
    <path {...BASE} d="M140 100h32m56 0h32" />
    <path {...BASE} d="M148 48l7-10 7 10M238 48l7-10 7 10" />
    <path {...BASE} strokeWidth="1.1" d="M92 100c0-18 6-30 14-38" />
    <path {...BASE} strokeWidth="0.9" opacity="0.8"
      d="M106 62c-8-4-18-2-22 4 8 2 16 2 22-4Zm0 0c-6-8-4-18 2-22 3 8 3 16-2 22Zm0 0c8-4 18-2 22 4-8 2-16 2-22-4Z" />
    <path {...BASE} strokeWidth="1.1" d="M300 100c0-16 5-26 12-33" />
    <path {...BASE} strokeWidth="0.9" opacity="0.8"
      d="M312 67c-7-3-15-1-19 4 7 2 14 1 19-4Zm0 0c-5-7-3-15 2-19 3 7 2 14-2 19Zm0 0c7-3 15-1 19 4-7 2-14 1-19-4Z" />
    <path {...BASE} strokeWidth="1.1" d="M40 100h320" />
  </>
)

/* Canton Tower, with its twisted lattice */
const Guangzhou = () => (
  <>
    <path {...BASE} d="M186 100c0-30 6-46 8-62 1-10 2-16 6-24" />
    <path {...BASE} d="M214 100c0-30-6-46-8-62-1-10-2-16-6-24" />
    <path {...BASE} strokeWidth="0.8" opacity="0.6"
      d="M188 88h24M187 76h26M188 64h24M191 52h18M194 42h12M196 34h8" />
    <path {...BASE} d="M200 14V4" />
    <path {...BASE} strokeWidth="1.1" d="M120 100V64h20v36M146 100V76h16v24M246 100V60h20v40M272 100V80h18v20" />
    <path {...BASE} strokeWidth="0.9" opacity="0.5"
      d="M126 72h3M134 72h3M126 82h3M134 82h3M252 68h3M260 68h3M252 80h3M260 80h3" />
    <path {...BASE} strokeWidth="1.1" d="M40 100h320" />
    <path {...BASE} strokeWidth="0.9" opacity="0.45" d="M60 108c10-3 20-3 30 0s20 3 30 0M280 108c10-3 20-3 30 0" />
  </>
)

/* Two departures crossing the world */
const Outbound = () => (
  <>
    <circle {...BASE} cx="200" cy="58" r="38" />
    <path {...BASE} strokeWidth="0.9" opacity="0.6" d="M200 20v76M162 58h76" />
    <path {...BASE} strokeWidth="0.9" opacity="0.6" d="M200 20c-14 12-14 64 0 76M200 20c14 12 14 64 0 76" />
    <path {...BASE} strokeDasharray="3 5" d="M120 92c30-44 130-56 168-14" />
    <path {...BASE} strokeWidth="1.2" d="M292 74l6-3-1 4 5 2-6 2 1 4-6-3-2-3z" />
    <path {...BASE} strokeWidth="1.1" d="M40 106h320" />
  </>
)

const ART = {
  outbound: Outbound,
  jakarta: Jakarta,
  surabaya: Surabaya,
  sydney: Sydney,
  bali: Bali,
  guangzhou: Guangzhou,
}

export default function DestinationArt({ id, className = '' }) {
  const Art = ART[id]
  if (!Art) return null
  return (
    <div className={`tv-art ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 116" preserveAspectRatio="xMidYMax meet">
        <Art />
      </svg>
    </div>
  )
}
