import React from 'react'
import { Plus, Filter, Download, Search } from 'lucide-react'
import { PageContainer } from '../components/ui/PageContainer'
import { BaseCard } from '../components/ui/BaseCard'
import { Button } from '../components/ui/Button'

export const TransactionsPage: React.FC = () => {
  return (
    <PageContainer
      title="Transactions"
      subtitle="Manage and track all your financial transactions"
      actions={
        <div className="flex space-x-3">
          <Button variant="outline" icon={Filter} size="sm">
            Filter
          </Button>
          <Button variant="outline" icon={Download} size="sm">
            Export
          </Button>
          <Button icon={Plus} size="sm">
            Add Transaction
          </Button>
        </div>
      }
    >
      <BaseCard>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Transactions
          </h3>
          <div className="mt-4 sm:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-modernize bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No transactions found. Start by adding your first transaction.
          </p>
          <Button className="mt-4" icon={Plus}>
            Add Your First Transaction
          </Button>
        </div>
      </BaseCard>
    </PageContainer>
  )
}