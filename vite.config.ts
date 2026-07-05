import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { rpaPlugin } from './vite-plugin-rpa.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), rpaPlugin()],
})
