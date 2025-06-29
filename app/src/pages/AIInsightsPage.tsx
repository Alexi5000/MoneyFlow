import React from 'react'
import { Brain, Zap, TrendingUp } from 'lucide-react'
import { PageContainer } from '../components/ui/PageContainer'
import { BaseCard } from '../components/ui/BaseCard'
import { DashboardCard } from '../components/ui/DashboardCard'

export const AIInsightsPage: React.FC = () => {
  return (
    <PageContainer
      title="AI Insights"
      subtitle="Personalized financial recommendations powered by AI"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DashboardCard
          title="Financial Health Score"
          value="8.5/10"
          icon={Brain}
          color="success"
        />
        <DashboardCard
          title="Potential Monthly Savings"
          value="$245"
          icon={TrendingUp}
          color="primary"
        />
        <DashboardCard
          title="AI Recommendations"
          value="3 Active"
          icon={Zap}
          color="warning"
        />
      </div>

      <BaseCard>
        <div className="text-center py-12">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            AI Insights Coming Soon
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Our AI will analyze your spending patterns and provide personalized insights once you have more data.
          </p>
        </div>
      </BaseCard>
    </PageContainer>
  )
}