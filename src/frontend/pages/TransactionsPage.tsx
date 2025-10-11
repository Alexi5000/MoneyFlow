import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search } from 'lucide-react'
import { useFinancialStore } from '../store/financialStore'
import { formatCurrency } from '../utils/formatters'

export const TransactionsPage: React.FC = () => {
  const { transactions, initializeData } = useFinancialStore()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (transactions.length === 0) {
      initializeData()
    }
  }, [transactions.length, initializeData])

  const filtered = transactions.filter(t =>
    t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Transactions</h1>
            <p className="text-gray-400">Track and manage all your financial activity</p>
          </div>
          <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-gray-800 rounded-md pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-[#111] border border-gray-800 rounded-lg overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No transactions found
            </div>
          ) : (
            filtered.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`p-4 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors ${
                  index !== 0 ? 'border-t border-gray-800' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                    <span className="text-lg">
                      {transaction.category === 'Food & Dining' ? '🍽️' :
                       transaction.category === 'Transportation' ? '🚗' :
                       transaction.category === 'Entertainment' ? '🎮' :
                       transaction.category === 'Shopping' ? '🛍️' : '💰'}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{transaction.description || transaction.category}</div>
                    <div className="text-sm text-gray-500">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-semibold ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-white'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
