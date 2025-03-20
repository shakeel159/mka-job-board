import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detect if running in production (GitHub Pages)
const isGitHubPages = process.env.NODE_ENV === 'production';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/mka-job-board/' : '/',
})
