# Photographs for the place galleries

The galleries under each leg on /travel are drawn as vector scenes
(`src/components/PlaceArt.jsx`). To use a real photograph instead:

1. Put the file in this folder, e.g. `public/places/monas.jpg`.
2. Add `photo` to that place in `src/lib/travelData.js`:

       { id: 'monas', name: 'Monas', note: 'Merdeka Square',
         blurb: '…', art: 'monas', photo: '/places/monas.jpg' }

The gallery layers the photo over the drawing and fades it in only once the
browser reports it loaded, so a file that is missing, slow or broken leaves
the drawing showing — there is never a broken image on the page.

Guidance:

- Landscape, 4:3 or wider. 1600px on the long edge is plenty; anything larger
  is wasted bytes on a phone.
- Save as JPEG at ~75% quality, or WebP. Aim under 300 KB each.
- Use photographs you have the right to publish. The drawn scenes exist partly
  so the site carries no licensing question — please do not replace them with
  images pulled from a search results page.

Mixing is fine: any place without a `photo` keeps its drawing.
