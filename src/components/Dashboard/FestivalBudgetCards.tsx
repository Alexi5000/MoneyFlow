import React from 'react'
import { motion } from 'framer-motion'
import { FestivalCard } from '../UI/FestivalCard'
import { useFinancialStore } from '../../store/financialStore'

export const FestivalBudgetCards: React.FC = () => {
  const { budgets } = useFinancialStore()

  const getCardColor = (percentage: number): 'green' | 'yellow' | 'orange' | 'pink' => {
    if (percentage < 50) return 'green'
    if (percentage < 75) return 'yellow'
    if (percentage < 90) return 'orange'
    return 'pink'
  }

  const getEmoji = (category: string): string => {
    const emojiMap: Record<string, string> = {
      'Food & Dining': '🍕',
      'Transportation': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Health & Fitness': '💪',
      'Housing': '🏠',
    }
    return emojiMap[category] || '💰'
  }

  const getStatusText = (percentage: number): string => {
    if (percentage < 50) return 'Looking good! 😎'
    if (percentage < 75) return 'On track! 👍'
    if (percentage < 90) return 'Watch out! ⚠️'
    return 'Party over! 🚨'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="text-center mb-6">
        <h2 className="wavy-text text-4xl mb-2">
          <span className="word-1 text-pink-500">Spending</span>
          <span className="word-2 text-yellow-500">Vibes</span>
          <span className="word-3 text-orange-500">Check!</span>
        </h2>
        <p className="font-fredoka text-lg text-gray-700">
          How's your money party going? 🎉
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget, index) => (
          <motion.div
            key={budget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FestivalCard 
              color={getCardColor(budget.percentage)}
              rotation={index % 2 === 0 ? 1 : -1}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">
                  {getEmoji(budget.category)}
                </div>
                
                <h3 className="font-bungee text-lg text-white mb-2">
                  {budget.category}
                </h3>
                
                <div className="bg-white rounded-2xl p-4 border-3 border-black mb-3">
                  <div className="text-2xl font-bungee text-black mb-1">
                    ${budget.spent.toFixed(0)}
                  </div>
                  <div className="text-sm font-fredoka text-gray-600">
                    of ${budget.allocated.toFixed(0)} budget
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white rounded-full h-4 border-3 border-black mb-3">
                  <motion.div
                    className="h-full rounded-full border-2 border-black"
                    style={{ 
                      backgroundColor: budget.percentage > 90 ? '#E91E63' : 
                                     budget.percentage > 75 ? '#FF5722' : 
                                     budget.percentage > 50 ? '#FFC107' : '#4CAF50'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(budget.percentage, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="font-bungee text-lg text-white">
                    {budget.percentage.toFixed(0)}%
                  </div>
                  <div className="font-fredoka text-sm text-white">
                    {getStatusText(budget.percentage)}
                  </div>
                  <div className="font-fredoka text-xs text-white">
                    ${budget.remaining.toFixed(0)} left to party!
                  </div>
                </div>
              </div>
            </FestivalCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}