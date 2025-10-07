import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useFinancialStore } from '../store/financialStore'
import { useUIStore } from '../store/uiStore'
import { DashboardHero } from '../components/Dashboard/DashboardHero'
import { ExpensePieChart3D } from '../components/Dashboard/ExpensePieChart3D'
import { LiquidBudgetGauge } from '../components/Dashboard/LiquidBudgetGauge'
import { PredictionPanel } from '../components/Dashboard/PredictionPanel'
import { TransactionFlow } from '../components/Transactions/TransactionFlow'
import { GlassmorphicCard } from '../components/UI/GlassmorphicCard'
import { LoadingSpinner } from '../components/UI/LoadingSpinner'

export const DashboardPage: React.FC = () => {
  const { 
    user, 
    budgets, 
    transactions, 
    isLoading, 
    error, 
    initializeData 
  } = useFinancialStore()
  const { theme } = useUIStore()

  useEffect(() => {
    // Initialize data from mock backend service
    if (!user || transactions.length === 0) {
      initializeData()
    }
  }, [user, transactions.length, initializeData])

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" text="Loading MoneyFlow..." />
          <p className="text-gray-400 mt-4">Initializing your financial dashboard</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassmorphicCard className="p-8 text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={initializeData}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
          >
            Try Again
          </button>
        </GlassmorphicCard>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white">Setting up MoneyFlow...</h2>
          <p className="text-gray-400">Please wait while we prepare your dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Hero */}
      <DashboardHero />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      {budgets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
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
      )}

      {/* Transaction Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <TransactionFlow />
      </motion.div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <GlassmorphicCard className="p-6">
            <LoadingSpinner size="lg" text="Updating data..." />
          </GlassmorphicCard>
        </div>
      )}
    </div>
  )
}