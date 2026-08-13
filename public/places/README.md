# Photographs for the leg backdrops

The background behind each leg on /travel is drawn as vector scenes
(`src/components/PlaceArt.jsx`), cross-fading through the few that belong to
that country. To use a real photograph instead:

1. Put the file in this folder, e.g. `public/places/monas.jpg`.
2. Add `photo` to that place in `src/lib/travelData.js`:

       { id: 'monas', name: 'Monas', note: 'Merdeka Square',
         blurb: '…', art: 'monas', photo: '/places/monas.jpg' }

The backdrop layers the photo over the drawing and fades it in only once the
browser reports it loaded, so a file that is missing, slow or broken leaves
the drawing showing — there is never a broken image on the page.

Guidance:

- Landscape, 3:2 or thereabouts — that is the shape of the backdrop. 1600px on
  the long edge is plenty; anything larger is wasted bytes on a phone.
- Keep the subject in the upper half. The backdrop crops from the bottom on
  wide screens.
- Save as JPEG at ~75% quality, or WebP. Aim under 300 KB each.
- Use photographs you have the right to publish. The drawn scenes exist partly
  so the site carries no licensing question — please do not replace them with
  images pulled from a search results page.

Mixing is fine: any scene without a `photo` keeps its drawing.
