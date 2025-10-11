import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { useFinancialStore } from '../store/financialStore'
import { formatCurrency } from '../utils/formatters'

export const AnalyticsPage: React.FC = () => {
  const { 
    transactions, 
    initializeData,
    getTotalIncome,
    getTotalExpenses 
  } = useFinancialStore()

  useEffect(() => {
    if (transactions.length === 0) {
      initializeData()
    }
  }, [transactions.length, initializeData])

  const totalIncome = getTotalIncome()
  const totalExpenses = getTotalExpenses()
  const netIncome = totalIncome - totalExpenses

  const categoryData = transactions.reduce((acc, t) => {
    if (t.type === 'expense') {
      acc[t.category] = (acc[t.category] || 0) + t.amount
    }
    return acc
  }, {} as Record<string, number>)

  const topCategories = Object.entries(categoryData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Deep insights into your financial patterns</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-gray-400 text-sm">Total Income</span>
            </div>
            <div className="text-3xl font-bold text-white">{formatCurrency(totalIncome)}</div>
            <div className="text-sm text-green-500 mt-2">+8.2% from last month</div>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <span className="text-gray-400 text-sm">Total Expenses</span>
            </div>
            <div className="text-3xl font-bold text-white">{formatCurrency(totalExpenses)}</div>
            <div className="text-sm text-red-500 mt-2">+3.1% from last month</div>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-blue-500" />
              <span className="text-gray-400 text-sm">Net Income</span>
            </div>
            <div className={`text-3xl font-bold ${netIncome >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatCurrency(Math.abs(netIncome))}
            </div>
            <div className="text-sm text-gray-400 mt-2">{netIncome >= 0 ? 'Surplus' : 'Deficit'}</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-[#111] border border-gray-800 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Top Spending Categories</h2>
          <div className="space-y-4">
            {topCategories.map(([category, amount]) => {
              const percentage = (amount / totalExpenses) * 100
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{category}</span>
                    <span className="text-white font-medium">{formatCurrency(amount)}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
