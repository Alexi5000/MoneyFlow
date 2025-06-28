import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useFinancialStore } from './store/financialStore'
import { useUIStore } from './store/uiStore'
import { DashboardHero } from './components/Dashboard/DashboardHero'
import { ExpensePieChart3D } from './components/Dashboard/ExpensePieChart3D'
import { LiquidBudgetGauge } from './components/Dashboard/LiquidBudgetGauge'
import { PredictionPanel } from './components/Dashboard/PredictionPanel'
import { TransactionFlow } from './components/Transactions/TransactionFlow'
import { GlassmorphicCard } from './components/UI/GlassmorphicCard'
import mockData from './data/mockFinancialData.json'

function App() {
  const { user, budgets, setUser, setBudgets, transactions, addTransaction } = useFinancialStore()
  const { theme, setTheme } = useUIStore()

  useEffect(() => {
    // Initialize with mock data
    if (!user) {
      setUser(mockData.user as any)
      setBudgets(mockData.budgets as any)
      
      // Add mock transactions
      mockData.transactions.forEach((transaction) => {
        addTransaction(transaction as any)
      })
    }
  }, [user, setUser, setBudgets, addTransaction])

  useEffect(() => {
    // Set initial theme
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white">Loading MoneyFlow...</h2>
          <p className="text-gray-400">Initializing your financial dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">MoneyFlow</h1>
              <p className="text-sm text-gray-400">AI-Powered Budget Tracker</p>
            </div>
          </div>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </motion.header>

        {/* Dashboard Hero */}
        <DashboardHero />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 3D Expense Chart */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassmorphicCard className="p-6" glow neonColor="primary">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Expense Breakdown</h2>
                <div className="text-sm text-gray-400">Interactive 3D View</div>
              </div>
              <ExpensePieChart3D />
            </GlassmorphicCard>
          </motion.div>

          {/* AI Predictions Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PredictionPanel />
          </motion.div>
        </div>

        {/* Budget Gauges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <GlassmorphicCard className="p-6" glow neonColor="accent">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Budget Status</h2>
              <div className="text-sm text-gray-400">Liquid Fill Indicators</div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {budgets.map((budget) => (
                <LiquidBudgetGauge
                  key={budget.id}
                  category={budget.category}
                  spent={budget.spent}
                  allocated={budget.allocated}
                  percentage={budget.percentage}
                  color={budget.color}
                  icon={budget.icon}
                />
              ))}
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Transaction Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <TransactionFlow />
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-12 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-sm">
            MoneyFlow - Revolutionizing personal finance with AI and 3D visualizations
          </p>
          <p className="text-xs mt-2">
            Built with React, Three.js, and cutting-edge web technologies
          </p>
        </motion.footer>
      </div>
    </div>
  )
}

export default App