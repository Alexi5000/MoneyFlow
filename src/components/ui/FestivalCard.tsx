import React from 'react'
import { motion } from 'framer-motion'

interface FestivalCardProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
  rotation?: number
  className?: string
  onClick?: () => void
}

export const FestivalCard: React.FC<FestivalCardProps> = ({
  children,
  variant = 'primary',
  rotation = 1,
  className = '',
  onClick
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600'
      case 'secondary':
        return 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500'
      case 'accent':
        return 'bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-600'
      default:
        return 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600'
    }
  }

  return (
    <motion.div
      className={`
        ${getVariantStyles()}
        border-4 border-black
        rounded-3xl
        p-6
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        transform
        transition-all
        duration-300
        hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
        hover:scale-105
        cursor-pointer
        ${className}
      `}
      style={{ 
        transform: `rotate(${rotation}deg)`,
      }}
      whileHover={{ 
        rotate: rotation * -0.5,
        scale: 1.05 
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="text-white font-fredoka">
        {children}
      </div>
    </motion.div>
  )
}