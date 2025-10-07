import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FestivalHeader } from './FestivalHeader'
import { FestivalSidebar } from './FestivalSidebar'
import { FestivalMobileNav } from './FestivalMobileNav'
import { RainbowStripes } from '../UI/RainbowStripes'

export const FestivalLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden">
      <RainbowStripes />
      
      {/* Header */}
      <FestivalHeader />
      
      {/* Sidebar */}
      <FestivalSidebar />
      
      {/* Main Content */}
      <main className="lg:ml-72 pb-24 lg:pb-8">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <FestivalMobileNav />
    </div>
  )
}