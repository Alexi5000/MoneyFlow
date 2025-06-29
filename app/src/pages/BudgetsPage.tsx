import React from 'react'
import { Plus, Target } from 'lucide-react'
import { PageContainer } from '../components/ui/PageContainer'
import { BaseCard } from '../components/ui/BaseCard'
import { Button } from '../components/ui/Button'

export const BudgetsPage: React.FC = () => {
  return (
    <PageContainer
      title="Budgets"
      subtitle="Set and track your spending limits"
      actions={
        <Button icon={Plus}>
          Create Budget
        </Button>
      }
    >
      <BaseCard>
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No budgets yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Create your first budget to start tracking your spending goals.
          </p>
          <Button icon={Plus}>
            Create Your First Budget
          </Button>
        </div>
      </BaseCard>
    </PageContainer>
  )
}