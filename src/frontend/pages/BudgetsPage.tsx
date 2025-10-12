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
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-[48px] font-normal text-white mb-3 leading-tight">Budgets</h1>
            <p className="text-[16px] text-gray-400">Set limits and track your spending</p>
          </div>
          <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 font-medium text-[15px] inline-flex items-center gap-2 transition-all">
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
                className="bg-[#0a0a0a] border border-[#222] rounded-lg p-8 hover:border-[#333] transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-3xl mb-3 block">{budget.icon}</span>
                    <h3 className="text-[20px] font-medium text-white mb-2">{budget.category}</h3>
                    <p className="text-[14px] text-gray-500">
                      {remaining >= 0 ? `${formatCurrency(remaining)} remaining` : `${formatCurrency(Math.abs(remaining))} over budget`}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3 text-[14px]">
                    <span className="text-gray-500 font-medium">Spent</span>
                    <span className="text-white font-medium">{formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}</span>
                  </div>
                  <div className="w-full bg-[#222] rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${
                        percentage > 100 ? 'bg-red-500' :
                        percentage > 90 ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-[13px] text-gray-500 font-medium">{percentage.toFixed(0)}% of budget used</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
