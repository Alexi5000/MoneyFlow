import React, { useState, useCallback } from 'react'
import { User } from 'lucide-react'
import { motion } from 'framer-motion'

interface ImageWithFallbackProps {
  src?: string
  alt: string
  className?: string
  fallbackIcon?: React.ReactNode
  width?: number
  height?: number
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackIcon,
  width,
  height
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoading(false)
  }, [])

  const handleImageLoad = useCallback(() => {
    setImageLoading(false)
    setImageError(false)
  }, [])

  // If no src provided or image failed to load, show fallback
  if (!src || imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500 ${className}`}
        style={{ width, height }}
      >
        {fallbackIcon || <User className="w-1/2 h-1/2 text-white" />}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
          <div className="w-1/3 h-1/3 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
      )}
      
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

// Avatar component with built-in fallback
export const Avatar: React.FC<{
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}> = ({ src, name, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <ImageWithFallback
      src={src}
      alt={`${name}'s avatar`}
      className={`${sizeClasses[size]} rounded-full border-2 border-primary-500/50 ${className}`}
      fallbackIcon={
        <div className="flex items-center justify-center w-full h-full text-white font-bold text-sm">
          {initials}
        </div>
      }
    />
  )
}