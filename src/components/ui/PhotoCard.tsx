import React from 'react'
import { motion } from 'framer-motion'

interface PhotoCardProps {
  src: string
  alt: string
  borderColor?: 'pink' | 'yellow' | 'purple' | 'green' | 'blue'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  src,
  alt,
  borderColor = 'pink',
  size = 'md',
  className = ''
}) => {
  const getBorderColorStyles = () => {
    switch (borderColor) {
      case 'pink':
        return 'border-pink-500 bg-pink-500'
      case 'yellow':
        return 'border-yellow-400 bg-yellow-400'
      case 'purple':
        return 'border-purple-500 bg-purple-500'
      case 'green':
        return 'border-green-500 bg-green-500'
      case 'blue':
        return 'border-blue-500 bg-blue-500'
      default:
        return 'border-pink-500 bg-pink-500'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-16 h-16'
      case 'md':
        return 'w-24 h-24'
      case 'lg':
        return 'w-32 h-32'
      default:
        return 'w-24 h-24'
    }
  }

  return (
    <motion.div
      className={`
        relative
        ${getSizeStyles()}
        ${className}
      `}
      whileHover={{ 
        scale: 1.1,
        rotate: 5
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background sticker effect */}
      <div 
        className={`
          absolute
          inset-0
          ${getBorderColorStyles()}
          rounded-2xl
          transform
          rotate-3
          border-4
          border-black
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        `}
      />
      
      {/* Main photo container */}
      <div className="
        relative
        w-full
        h-full
        bg-white
        rounded-2xl
        border-4
        border-black
        overflow-hidden
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        transform
        -rotate-1
      ">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        
        {/* Sticker shine effect */}
        <div className="
          absolute
          top-2
          right-2
          w-4
          h-4
          bg-white
          rounded-full
          opacity-60
          blur-sm
        " />
      </div>
    </motion.div>
  )
}