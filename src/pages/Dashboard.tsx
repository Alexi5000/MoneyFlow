import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FestivalCard } from '../components/ui/FestivalCard'
import { ChunkyButton } from '../components/ui/ChunkyButton'
import { WavyText } from '../components/ui/WavyText'
import { ConfettiEffect } from '../components/ui/ConfettiEffect'
import { useFinancialStore } from '../store/financialStore'
import { formatCurrency } from '../utils/formatters'

export const Dashboard: React.FC = () => {
  const { 
    user, 
    transactions, 
    budgets, 
    isLoading, 
    error,
    initializeData,
    getTotalIncome,
    getTotalExpenses,
    getSavingsRate,
    getRecentTransactions
  } = useFinancialStore()

  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (!user) {
      initializeData()
    }
  }, [user, initializeData])

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4 animate-festival-bounce">💰</div>
          <WavyText size="lg">Loading Your Money Party...</WavyText>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <FestivalCard color="pink" className="text-center">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="font-bungee text-2xl text-black mb-4">Oops! Something went wrong</h2>
          <p className="font-fredoka text-gray-700 mb-6">{error}</p>
          <ChunkyButton color="yellow" onClick={() => initializeData()}>
            Try Again! 🔄
          </ChunkyButton>
        </FestivalCard>
      </div>
    )
  }

  const totalIncome = getTotalIncome()
  const totalExpenses = getTotalExpenses()
  const savingsRate = getSavingsRate()
  const recentTransactions = getRecentTransactions()

  const statsData = [
    {
      title: 'Total Balance',
      value: user?.totalBalance || 0,
      emoji: '💰',
      color: 'yellow' as const,
      trend: '+12.5%'
    },
    {
      title: 'Monthly Income',
      value: totalIncome,
      emoji: '📈',
      color: 'green' as const,
      trend: '+8.2%'
    },
    {
      title: 'Monthly Expenses',
      value: totalExpenses,
      emoji: '💸',
      color: 'pink' as const,
      trend: '+3.1%'
    },
    {
      title: 'Savings Rate',
      value: savingsRate,
      emoji: '🎯',
      color: 'purple' as const,
      trend: '+15.3%',
      isPercentage: true
    }
  ]

  return (
    <>
      <ConfettiEffect trigger={showConfetti} />
      <div className="min-h-screen bg-cream p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WavyText size="xl" className="mb-4">
              Your Financial Festival!
            </WavyText>
            <motion.p
              className="font-fredoka text-xl text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Welcome to the most fun way to manage your money! 🎉 
              Let's turn your finances into a celebration!
            </motion.p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FestivalCard color={stat.color} rotation={index % 2 === 0 ? 2 : -2}>
                  <div className="text-center">
                    <div className="text-4xl mb-3">{stat.emoji}</div>
                    <h3 className="font-bungee text-lg text-white mb-2">{stat.title}</h3>
                    <div className="bg-white rounded-2xl p-4 border-3 border-black mb-3">
                      <div className="text-2xl font-bungee text-black">
                        {stat.isPercentage 
                          ? `${stat.value.toFixed(1)}%`
                          : formatCurrency(stat.value)
                        }
                      </div>
                      <div className="text-sm font-fredoka text-green-600">
                        {stat.trend} from last month
                      </div>
                    </div>
                  </div>
                </FestivalCard>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-bungee text-3xl text-festival-purple-500 mb-6 transform -rotate-1">
              Quick Party Actions! 🎪
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <ChunkyButton 
                color="pink" 
                emoji="💸" 
                onClick={triggerConfetti}
                rotation={2}
              >
                Add Transaction
              </ChunkyButton>
              <ChunkyButton 
                color="yellow" 
                emoji="📊" 
                rotation={-1}
              >
                View Reports
              </ChunkyButton>
              <ChunkyButton 
                color="green" 
                emoji="🤖" 
                rotation={1}
              >
                AI Insights
              </ChunkyButton>
              <ChunkyButton 
                color="purple" 
                emoji="🎯" 
                rotation={-2}
              >
                Set Goals
              </ChunkyButton>
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <FestivalCard color="orange" className="p-6">
              <div className="text-center mb-6">
                <h2 className="font-bungee text-2xl text-white mb-2">
                  Recent Money Moves! 💃
                </h2>
                <p className="font-fredoka text-white">
                  Check out your latest financial dance moves!
                </p>
              </div>

              <div className="space-y-4">
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      className="bg-white rounded-2xl p-4 border-3 border-black transform hover:scale-105 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`text-2xl p-2 rounded-full ${
                            transaction.type === 'income' 
                              ? 'bg-green-100' 
                              : 'bg-red-100'
                          }`}>
                            {transaction.type === 'income' ? '💰' : '💸'}
                          </div>
                          <div>
                            <h3 className="font-bungee text-black">
                              {transaction.description}
                            </h3>
                            <p className="font-fredoka text-gray-600 text-sm">
                              {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className={`font-bungee text-xl ${
                          transaction.type === 'income' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🎭</div>
                    <p className="font-bungee text-white text-xl">No moves yet!</p>
                    <p className="font-fredoka text-white">Time to start your money party!</p>
                  </div>
                )}
              </div>

              {recentTransactions.length > 0 && (
                <div className="text-center mt-6">
                  <ChunkyButton color="yellow" emoji="👀">
                    See All Transactions
                  </ChunkyButton>
                </div>
              )}
            </FestivalCard>
          </motion.div>

          {/* Fun Call to Action */}
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="font-bungee text-4xl text-festival-green-500 mb-6 transform rotate-1">
              Ready to Party with Your Money? 🎉
            </h3>
            <p className="font-fredoka text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              MoneyFlow makes managing your finances as fun as a festival! 
              Track, budget, and grow your wealth with style! 🚀
            </p>
            <ChunkyButton 
              color="pink" 
              size="lg" 
              emoji="🎊" 
              onClick={triggerConfetti}
            >
              Let's Celebrate Your Success!
            </ChunkyButton>
          </motion.div>
        </div>
      </div>
    </>
  )
}