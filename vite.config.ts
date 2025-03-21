import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/mka-job-board/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    assetsInlineLimit: 0, // Ensure large files like CSV are not inlined
  },
  publicDir: 'public', // Ensure Vite serves the public directory properly
});