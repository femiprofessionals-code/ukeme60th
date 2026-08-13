# Photographs of each country

Drop image files in this folder and they appear as the background of that
country's leg on /travel. Nothing else to edit — the build picks up whatever
is here, and Vite hashes and optimises it.

## Naming

Name the file after the leg, then anything you like after a dash:

| File | Result |
| --- | --- |
| `jakarta.jpg` | Jakarta, captioned "Jakarta" |
| `jakarta-monas.jpg` | Jakarta, captioned "Monas" |
| `sydney-opera-house.jpg` | Sydney, captioned "Opera House" |
| `bali-1.jpg`, `bali-2.jpg` | Bali, two photographs, no caption |

The leg ids are **outbound, jakarta, surabaya, sydney, bali, guangzhou**.
Add as many per leg as you like; they cross-fade every seven seconds.

As soon as one photograph exists for a leg, that leg uses photographs only —
the drawings are not mixed in with them. Legs with no photograph keep their
drawings, so you can do this one country at a time.

## What to use

- **Landscape, 3:2 or thereabouts** — that is the shape of the backdrop.
- **Keep the subject in the upper half.** On wide screens the crop comes off
  the bottom.
- 1600–2000px on the long edge is plenty. Aim under 400 KB each: save as JPEG
  at about 75% quality, or WebP.
- Use photographs you have the right to publish — your own, or something
  licensed for it. Please don't paste in images from a search results page.

After adding files, commit and push; the host rebuilds and they go live.
