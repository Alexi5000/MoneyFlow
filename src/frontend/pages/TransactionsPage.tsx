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
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-[48px] font-normal text-white mb-3 leading-tight">Transactions</h1>
            <p className="text-[16px] text-gray-400">Track and manage all your financial activity</p>
          </div>
          <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 font-medium text-[15px] inline-flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#222] rounded-lg pl-12 pr-4 py-3.5 text-white text-[15px] placeholder-gray-500 focus:border-[#333] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-16 text-center text-gray-500 text-[15px]">
              No transactions found
            </div>
          ) : (
            filtered.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`p-5 flex items-center justify-between hover:bg-[#0f0f0f] transition-colors ${
                  index !== 0 ? 'border-t border-[#222]' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#111] border border-[#222] rounded-lg flex items-center justify-center">
                    <span className="text-xl">
                      {transaction.category === 'Food & Dining' ? '🍽️' :
                       transaction.category === 'Transportation' ? '🚗' :
                       transaction.category === 'Entertainment' ? '🎮' :
                       transaction.category === 'Shopping' ? '🛍️' : '💰'}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-[15px]">{transaction.description || transaction.category}</div>
                    <div className="text-[13px] text-gray-500 mt-0.5">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={`text-[18px] font-semibold ${
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
