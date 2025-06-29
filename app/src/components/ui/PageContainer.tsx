import React from 'react'
import { clsx } from 'clsx'

interface PageContainerProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  actions?: React.ReactNode
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  className,
  actions,
}) => {
  return (
    <div className={clsx('space-y-6', className)}>
      {(title || subtitle || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && (
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="mt-4 sm:mt-0">
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  )
}