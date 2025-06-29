import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './Navbar'

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-0"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}