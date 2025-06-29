import React from 'react'
import { clsx } from 'clsx'

interface BaseCardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
  hover?: boolean
}

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = 'md',
  rounded = 'md',
  border = true,
  hover = false,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }

  const shadowClasses = {
    none: '',
    sm: 'shadow-modernize',
    md: 'shadow-modernize-lg',
    lg: 'shadow-modernize-xl',
  }

  const roundedClasses = {
    none: '',
    sm: 'rounded',
    md: 'rounded-modernize',
    lg: 'rounded-modernize-lg',
  }

  return (
    <div
      className={clsx(
        'bg-white dark:bg-dark-800',
        paddingClasses[padding],
        shadowClasses[shadow],
        roundedClasses[rounded],
        border && 'border border-gray-200 dark:border-dark-600',
        hover && 'transition-all duration-200 hover:shadow-modernize-xl hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}