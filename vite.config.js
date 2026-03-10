import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Phải có dòng này

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
     // <-- Phải thêm vào mảng plugins
  ],
  base: '/my-english-app/',
})