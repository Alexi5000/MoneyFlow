// MoneyFlow Vite Configuration
// Created by: Alex Cinovoj & TechTide AI
// Copyright (c) 2025 Alex Cinovoj & TechTide AI

// MoneyFlow Vite Configuration
// Created by: Alex Cinovoj & TechTide AI
// Copyright (c) 2025 Alex Cinovoj & TechTide AI

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
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei']
  },
  server: {
    port: 5173,
    host: 'localhost',
    hmr: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
})

