import React from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  MoreVertical
} from 'lucide-react'
import { PageContainer } from '../components/ui/PageContainer'
import { DashboardCard } from '../components/ui/DashboardCard'
import { BaseCard } from '../components/ui/BaseCard'
import { Button } from '../components/ui/Button'

const statsData = [
  {
    title: 'Total Balance',
    value: '$12,450.00',
    icon: DollarSign,
    trend: { value: 12.5, isPositive: true },
    color: 'primary' as const,
  },
  {
    title: 'Monthly Income',
    value: '$5,230.00',
    icon: TrendingUp,
    trend: { value: 8.2, isPositive: true },
    color: 'success' as const,
  },
  {
    title: 'Monthly Expenses',
    value: '$3,120.00',
    icon: TrendingDown,
    trend: { value: 3.1, isPositive: false },
    color: 'error' as const,
  },
  {
    title: 'Savings',
    value: '$2,110.00',
    icon: CreditCard,
    trend: { value: 15.3, isPositive: true },
    color: 'warning' as const,
  },
]

const recentTransactions = [
  {
    id: 1,
    description: 'Grocery Store',
    category: 'Food & Dining',
    amount: -85.50,
    date: '2024-01-15',
    type: 'expense' as const,
  },
  {
    id: 2,
    description: 'Salary Deposit',
    category: 'Income',
    amount: 5200.00,
    date: '2024-01-01',
    type: 'income' as const,
  },
  {
    id: 3,
    description: 'Netflix Subscription',
    category: 'Entertainment',
    amount: -12.99,
    date: '2024-01-10',
    type: 'expense' as const,
  },
  {
    id: 4,
    description: 'Gas Station',
    category: 'Transportation',
    amount: -45.20,
    date: '2024-01-14',
    type: 'expense' as const,
  },
]

export const DashboardPage: React.FC = () => {
  return (
    <PageContainer
      title="Dashboard"
      subtitle="Welcome back! Here's your financial overview."
      actions={
        <Button icon={Plus} iconPosition="left">
          Add Transaction
        </Button>
      }
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <BaseCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Transactions
              </h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-modernize hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-modernize ${
                      transaction.type === 'income' 
                        ? 'bg-success-50 text-success-500 dark:bg-success-900/20' 
                        : 'bg-error-50 text-error-500 dark:bg-error-900/20'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' 
                        ? 'text-success-500' 
                        : 'text-error-500'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </BaseCard>
        </div>

        {/* Quick Actions & Budget Overview */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <BaseCard>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" icon={Plus}>
                Add Income
              </Button>
              <Button variant="outline" className="w-full justify-start" icon={TrendingDown}>
                Add Expense
              </Button>
              <Button variant="outline" className="w-full justify-start" icon={CreditCard}>
                Transfer Money
              </Button>
              <Button variant="outline" className="w-full justify-start" icon={TrendingUp}>
                View Reports
              </Button>
            </div>
          </BaseCard>

          {/* Budget Overview */}
          <BaseCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Budget Overview
              </h3>
              <Button variant="ghost" size="sm" icon={MoreVertical} />
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Food & Dining</span>
                  <span className="text-gray-900 dark:text-white">$425 / $600</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Transportation</span>
                  <span className="text-gray-900 dark:text-white">$245 / $300</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                  <div className="bg-warning-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Entertainment</span>
                  <span className="text-gray-900 dark:text-white">$88 / $200</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '44%' }}></div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </PageContainer>
  )
}