import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const stub = fileURLToPath(new URL('./src/lib/emptyModule.js', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // jsPDF's optional HTML-rasterising dependencies. The itinerary PDF is
      // drawn as vector text and never calls doc.html(), so these would be
      // ~350 KB of dead weight in the download chunk. See src/lib/emptyModule.js.
      html2canvas: stub,
      canvg: stub,
      dompurify: stub,
    },
  },
})
