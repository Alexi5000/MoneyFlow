import React from 'react'
import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  className?: string
  variant?: 'card' | 'text' | 'circle' | 'button'
  count?: number
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '',
  variant = 'card',
  count = 1
}) => {
  const getSkeletonClasses = () => {
    const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse'
    
    switch (variant) {
      case 'card':
        return `${baseClasses} h-32 w-full rounded-2xl border-3 border-gray-300`
      case 'text':
        return `${baseClasses} h-4 w-3/4 rounded`
      case 'circle':
        return `${baseClasses} h-12 w-12 rounded-full`
      case 'button':
        return `${baseClasses} h-12 w-32 rounded-2xl`
      default:
        return baseClasses
    }
  }

  const skeletonClasses = `${getSkeletonClasses()} ${className}`

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={skeletonClasses}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </>
  )
}

// Specific skeleton components for common use cases
export const StatCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 border-3 border-gray-300 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <SkeletonLoader variant="circle" />
      <SkeletonLoader variant="text" className="w-20" />
    </div>
    <SkeletonLoader variant="text" className="h-8 w-32 mb-2" />
    <SkeletonLoader variant="text" className="h-4 w-24" />
  </div>
)

export const TransactionSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-4 border-3 border-gray-300 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <SkeletonLoader variant="circle" />
        <div>
          <SkeletonLoader variant="text" className="h-5 w-32 mb-2" />
          <SkeletonLoader variant="text" className="h-3 w-24" />
        </div>
      </div>
      <SkeletonLoader variant="text" className="h-6 w-20" />
    </div>
  </div>
)