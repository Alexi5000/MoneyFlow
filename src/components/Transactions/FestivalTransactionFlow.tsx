import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FestivalCard } from '../UI/FestivalCard'
import { ChunkyButton } from '../UI/ChunkyButton'
import { ConfettiEffect } from '../UI/ConfettiEffect'
import { useFinancialStore } from '../../store/financialStore'

export const FestivalTransactionFlow: React.FC = () => {
  const { transactions, getRecentTransactions } = useFinancialStore()
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [showConfetti, setShowConfetti] = useState(false)
  
  const recentTransactions = getRecentTransactions(10)
  
  const filteredTransactions = recentTransactions.filter(transaction => {
    return filter === 'all' || transaction.type === filter
  })
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(Math.abs(amount))
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const getCategoryEmoji = (category: string) => {
    const icons: Record<string, string> = {
      'Food & Dining': '🍕',
      'Transportation': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Health & Fitness': '💪',
      'Housing': '🏠',
      'Income': '💰',
    }
    return icons[category] || '💳'
  }

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }
  
  return (
    <>
      <ConfettiEffect trigger={showConfetti} />
      <FestivalCard color="purple" className="p-6">
        <div className="text-center mb-6">
          <h2 className="wavy-text text-3xl mb-2">
            <span className="word-1 text-yellow-400">Money</span>
            <span className="word-2 text-pink-400">Moves</span>
            <span className="word-3 text-orange-400">Party!</span>
          </h2>
          <p className="font-fredoka text-lg text-white">
            Check out your latest financial dance moves! 💃
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          {[
            { key: 'all', label: 'All Moves', emoji: '🎪' },
            { key: 'income', label: 'Money In', emoji: '💰' },
            { key: 'expense', label: 'Money Out', emoji: '💸' }
          ].map(({ key, label, emoji }) => (
            <ChunkyButton
              key={key}
              color={filter === key ? 'yellow' : 'pink'}
              size="sm"
              emoji={emoji}
              onClick={() => setFilter(key as any)}
              className={filter === key ? 'scale-110' : ''}
            >
              {label}
            </ChunkyButton>
          ))}
        </div>
        
        {/* Transaction List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div className={`p-4 rounded-2xl border-4 border-black transform transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                  transaction.type === 'income' 
                    ? 'bg-green-400 hover:bg-green-300' 
                    : 'bg-pink-400 hover:bg-pink-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Transaction Icon */}
                      <div className="text-3xl">
                        {getCategoryEmoji(transaction.category)}
                      </div>
                      
                      {/* Transaction Details */}
                      <div>
                        <h3 className="font-bungee text-lg text-black">
                          {transaction.description}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-fredoka text-black bg-white px-2 py-1 rounded-full border-2 border-black">
                            {transaction.category}
                          </span>
                          {transaction.merchant && (
                            <span className="font-fredoka text-black">
                              @ {transaction.merchant}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Amount and Date */}
                    <div className="text-right">
                      <div className="font-bungee text-xl text-black">
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                      <div className="font-fredoka text-sm text-black">
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎭</div>
              <div className="font-bungee text-xl text-white mb-2">No moves found!</div>
              <div className="font-fredoka text-white">
                Time to start your money party!
              </div>
            </div>
          )}
        </div>
        
        {/* Add Transaction Button */}
        <div className="text-center mt-6">
          <ChunkyButton
            color="yellow"
            emoji="🎉"
            onClick={triggerConfetti}
            size="lg"
          >
            Add New Money Move!
          </ChunkyButton>
        </div>
      </FestivalCard>
    </>
  )
}