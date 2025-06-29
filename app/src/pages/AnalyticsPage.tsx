import React from 'react'
import { TrendingUp, BarChart3, PieChart } from 'lucide-react'
import { PageContainer } from '../components/ui/PageContainer'
import { BaseCard } from '../components/ui/BaseCard'
import { DashboardCard } from '../components/ui/DashboardCard'

export const AnalyticsPage: React.FC = () => {
  return (
    <PageContainer
      title="Analytics"
      subtitle="Detailed insights into your financial patterns"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard
          title="Average Monthly Spending"
          value="$3,245"
          icon={TrendingUp}
          trend={{ value: 5.2, isPositive: false }}
          color="primary"
        />
        <DashboardCard
          title="Savings Rate"
          value="32%"
          icon={PieChart}
          trend={{ value: 8.1, isPositive: true }}
          color="success"
        />
        <DashboardCard
          title="Budget Adherence"
          value="78%"
          icon={BarChart3}
          trend={{ value: 12.3, isPositive: true }}
          color="warning"
        />
      </div>

      <BaseCard>
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Analytics Coming Soon
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Detailed charts and insights will be available once you have more transaction data.
          </p>
        </div>
      </BaseCard>
    </PageContainer>
  )
}