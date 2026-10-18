// MoneyFlow Vite Configuration
// Created by: Alex Cinovoj
// Copyright (c) 2025 Alex Cinovoj

// MoneyFlow Vite Configuration
// Created by: Alex Cinovoj
// Copyright (c) 2025 Alex Cinovoj

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/frontend'),
    },
  },
  server: {
    port: 5173,
    host: 'localhost',
    hmr: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router-dom)\//.test(id)) return 'vendor-react'
          if (id.includes('node_modules/recharts/')) return 'vendor-charts'
          if (id.includes('node_modules/framer-motion/')) return 'vendor-motion'
        },
      },
    },
  }
})

