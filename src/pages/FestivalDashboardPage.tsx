import React from 'react'
import { motion } from 'framer-motion'
import { FestivalDashboardHero } from '../components/Dashboard/FestivalDashboardHero'
import { FestivalBudgetCards } from '../components/Dashboard/FestivalBudgetCards'
import { FestivalTransactionFlow } from '../components/Transactions/FestivalTransactionFlow'
import { ChunkyButton } from '../components/UI/ChunkyButton'

export const FestivalDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <FestivalDashboardHero />

      {/* Budget Cards */}
      <FestivalBudgetCards />

      {/* Transaction Flow */}
      <FestivalTransactionFlow />

      {/* Fun Call to Action */}
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="wavy-text text-3xl mb-4">
          <span className="word-1 text-purple-500">Keep</span>
          <span className="word-2 text-green-500">The</span>
          <span className="word-3 text-orange-500">Party</span>
          <span className="word-1 text-pink-500">Going!</span>
        </h3>
        
        <div className="flex flex-wrap justify-center gap-4">
          <ChunkyButton color="purple" emoji="🎯" rotation={2}>
            Set New Goals
          </ChunkyButton>
          <ChunkyButton color="green" emoji="📊" rotation={-1}>
            View Reports
          </ChunkyButton>
          <ChunkyButton color="orange" emoji="🎪" rotation={1}>
            Invite Friends
          </ChunkyButton>
        </div>
      </motion.div>
    </div>
  )
}