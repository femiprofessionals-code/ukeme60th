/*
 * A deliberate stub.
 *
 * jsPDF can rasterise HTML into a page, which pulls in html2canvas, canvg and
 * dompurify — about 350 KB. The itinerary PDF is drawn as vector text and
 * never calls that path, so those three are aliased here in vite.config.js.
 *
 * If anyone ever calls doc.html(), remove the aliases or it will fail here.
 */
export default {}
