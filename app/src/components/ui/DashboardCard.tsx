import React from 'react'
import { BaseCard } from './BaseCard'
import type { LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'

interface DashboardCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'primary' | 'success' | 'error' | 'warning'
  className?: string
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'primary',
  className,
}) => {
  const colorClasses = {
    primary: 'text-primary-500 bg-primary-50 dark:bg-primary-900/20',
    success: 'text-success-500 bg-success-50 dark:bg-success-900/20',
    error: 'text-error-500 bg-error-50 dark:bg-error-900/20',
    warning: 'text-warning-500 bg-warning-50 dark:bg-warning-900/20',
  }

  const trendColorClasses = trend?.isPositive 
    ? 'text-success-500' 
    : 'text-error-500'

  return (
    <BaseCard className={clsx('hover:shadow-modernize-xl transition-all duration-200', className)} hover>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {trend && (
            <div className={clsx('flex items-center text-sm font-medium', trendColorClasses)}>
              <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={clsx('p-3 rounded-modernize', colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </BaseCard>
  )
}