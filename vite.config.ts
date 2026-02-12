
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Matches your GitHub repository name for correct routing
  base: '/Personal-Web3.0/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
