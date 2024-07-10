import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite.config.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/react-fontawesome'],
  },
})
