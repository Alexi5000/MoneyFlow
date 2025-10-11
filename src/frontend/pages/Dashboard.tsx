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
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Portfolio</h2>
          <p className="text-gray-400">Fetching your financial data...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <motion.div
          className="glass-card text-center max-w-md mx-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-white mb-4">Connection Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => initializeData()}
            className="btn-primary"
          >
            Retry Connection
          </button>
        </motion.div>
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
    <div className="min-h-screen bg-primary p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Your Portfolio
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Track, manage, and grow your crypto investments with real-time insights and analytics.
          </motion.p>
        </motion.div>

        {/* Portfolio Overview */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
          {/* Portfolio Ring Chart */}
          <motion.div
            className="portfolio-ring"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <svg viewBox="0 0 200 200" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
              />
              {/* Progress circles for different assets */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="8"
                strokeDasharray="150 350"
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="8"
                strokeDasharray="100 350"
                strokeDashoffset="-150"
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="8"
                strokeDasharray="80 350"
                strokeDashoffset="-250"
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="center-text">
              <div className="amount">${user?.totalBalance?.toLocaleString() || '12,048'}</div>
              <div className="label">Total Balance</div>
            </div>
          </motion.div>

          {/* Asset Breakdown */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="asset-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="asset-icon">
                    <span className="text-white font-bold">₿</span>
                  </div>
                  <div className="asset-info">
                    <h3 className="font-medium">Bitcoin</h3>
                    <p className="text-sm text-gray-400">BTC</p>
                  </div>
                </div>
                <div className="asset-value">
                  <div className="price">$103,794.44</div>
                  <div className="change positive">+5.67%</div>
                </div>
              </div>
            </div>

            <div className="asset-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="asset-icon">
                    <span className="text-white font-bold">Ξ</span>
                  </div>
                  <div className="asset-info">
                    <h3 className="font-medium">Ethereum</h3>
                    <p className="text-sm text-gray-400">ETH</p>
                  </div>
                </div>
                <div className="asset-value">
                  <div className="price">$2,730.89</div>
                  <div className="change positive">+12.34%</div>
                </div>
              </div>
            </div>

            <div className="asset-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="asset-icon">
                    <span className="text-white font-bold">$</span>
                  </div>
                  <div className="asset-info">
                    <h3 className="font-medium">USD Coin</h3>
                    <p className="text-sm text-gray-400">USDC</p>
                  </div>
                </div>
                <div className="asset-value">
                  <div className="price">$1,000.00</div>
                  <div className="change neutral">0.00%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-card hover-lift">
                <div className="text-center">
                  <div className="text-3xl mb-3">
                    {stat.title === 'Total Balance' && '💰'}
                    {stat.title === 'Monthly Income' && '📈'}
                    {stat.title === 'Monthly Expenses' && '💸'}
                    {stat.title === 'Savings Rate' && '🎯'}
                  </div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">
                    {stat.title}
                  </h3>
                  <div className="bg-white/5 rounded-lg p-3 mb-3">
                    <div className="text-xl font-bold text-white">
                      {stat.isPercentage
                        ? `${stat.value.toFixed(1)}%`
                        : formatCurrency(stat.value)
                      }
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.trend} from last month
                    </div>
                  </div>
                </div>
              </div>
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
          <h2 className="text-2xl font-bold text-white mb-6">
            Quick Actions
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="btn-primary"
              onClick={() => {/* Navigate to add transaction */}}
            >
              Add Transaction
            </button>
            <button className="btn-secondary">
              View Reports
            </button>
            <button className="btn-primary">
              AI Insights
            </button>
            <button className="btn-secondary">
              Set Goals
            </button>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="glass-card p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">
                Recent Transactions
              </h2>
              <p className="text-gray-400">
                Your latest financial activity
              </p>
            </div>

            <div className="space-y-3">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'income'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '↓' : '↑'}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          {transaction.description}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'income'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4 text-gray-400">📊</div>
                  <p className="text-gray-400 text-lg">No transactions yet</p>
                  <p className="text-gray-500">Start by adding your first transaction</p>
                </div>
              )}
            </div>

            {recentTransactions.length > 0 && (
              <div className="text-center mt-6">
                <button className="btn-secondary">
                  View All Transactions
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Portfolio Overview */}
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="gradient-card max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Optimize Your Portfolio? 🚀
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              MoneyFlow provides powerful insights and tools to help you make smarter financial decisions.
              Track performance, analyze trends, and grow your wealth with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary">
                Explore Analytics
              </button>
              <button className="btn-secondary">
                Set New Goals
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}