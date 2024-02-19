import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './public',
  },
  publicDir:'./src/assets',
  base:"/nantes2024/bretons-1/"
})
