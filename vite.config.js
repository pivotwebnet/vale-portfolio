import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Para GitHub Pages: base: '/nombre-del-repo/',
})