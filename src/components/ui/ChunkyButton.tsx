import React from 'react'
import { motion } from 'framer-motion'

interface ChunkyButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export const ChunkyButton: React.FC<ChunkyButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = ''
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
      case 'secondary':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'
      case 'accent':
        return 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
      case 'warning':
        return 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
      default:
        return 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm'
      case 'md':
        return 'px-6 py-3 text-base'
      case 'lg':
        return 'px-8 py-4 text-lg'
      default:
        return 'px-6 py-3 text-base'
    }
  }

  return (
    <motion.button
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        font-bungee
        text-white
        border-4
        border-black
        rounded-2xl
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        transform
        transition-all
        duration-200
        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        active:translate-x-1
        active:translate-y-1
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={{ 
        scale: 1.05,
        y: -2
      }}
      whileTap={{ 
        scale: 0.95,
        y: 0
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}