import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface ChunkyButtonProps {
  children: React.ReactNode
  color?: 'pink' | 'yellow' | 'orange' | 'purple' | 'green'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  emoji?: string
  rotation?: number
}

export const ChunkyButton: React.FC<ChunkyButtonProps> = ({
  children,
  color = 'pink',
  size = 'md',
  className,
  onClick,
  disabled = false,
  loading = false,
  emoji,
  rotation = -1
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const buttonClasses = clsx(
    'chunky-btn',
    color,
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      initial={{ rotate: rotation }}
      whileHover={{ 
        scale: 1.1, 
        rotate: rotation * -1,
        boxShadow: '8px 8px 0 var(--black)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {loading && (
        <motion.div
          className="inline-block mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          🌀
        </motion.div>
      )}
      {emoji && <span className="mr-2">{emoji}</span>}
      {children}
    </motion.button>
  )
}