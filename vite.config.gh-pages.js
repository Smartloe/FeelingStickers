import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/FeelingStickers/',
  build: {
    outDir: 'dist',
  },
  server: {
    host: '::',
    port: '8080',
  },
})
