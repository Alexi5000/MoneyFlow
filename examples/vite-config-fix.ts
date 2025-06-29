// vite.config.ts - Ensure proper module resolution

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    // Pre-bundle lucide-react for better performance
    include: ['lucide-react']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate lucide icons into their own chunk
          'lucide': ['lucide-react']
        }
      }
    }
  }
})