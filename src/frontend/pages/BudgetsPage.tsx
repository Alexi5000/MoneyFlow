import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useFinancialStore } from '../store/financialStore'
import { formatCurrency } from '../utils/formatters'

export const BudgetsPage: React.FC = () => {
  const { budgets, initializeData } = useFinancialStore()

  useEffect(() => {
    if (budgets.length === 0) {
      initializeData()
    }
  }, [budgets.length, initializeData])

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Budgets</h1>
            <p className="text-gray-400">Set limits and track your spending</p>
          </div>
          <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Budget
          </button>
        </div>

        {/* Budgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.allocated) * 100
            const remaining = budget.allocated - budget.spent

            return (
              <motion.div
                key={budget.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#111] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-2xl mb-2 block">{budget.icon}</span>
                    <h3 className="text-lg font-semibold text-white mb-1">{budget.category}</h3>
                    <p className="text-sm text-gray-500">
                      {remaining >= 0 ? `${formatCurrency(remaining)} left` : `${formatCurrency(Math.abs(remaining))} over`}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-white">{formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage > 100 ? 'bg-red-500' :
                        percentage > 90 ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">{percentage.toFixed(0)}% used</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
