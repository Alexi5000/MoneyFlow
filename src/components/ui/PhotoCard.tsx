import React from 'react'
import { motion } from 'framer-motion'

interface PhotoCardProps {
  src: string
  alt: string
  name: string
  bgColor?: 'pink' | 'yellow' | 'orange' | 'purple' | 'green'
  className?: string
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  src,
  alt,
  name,
  bgColor = 'pink',
  className = ''
}) => {
  const bgColors = {
    pink: 'bg-pink-400',
    yellow: 'bg-yellow-400',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500'
  }

  return (
    <motion.div 
      className={`photo-card ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, rotate: 0 }}
    >
      <div className={`photo-card-bg ${bgColors[bgColor]}`} />
      <div className="photo-card-content">
        <img 
          src={src} 
          alt={alt}
          className="w-full h-48 object-cover" 
        />
        <div className="p-4">
          <span className="bg-orange-400 text-black font-fredoka font-bold px-4 py-2 rounded-full inline-block transform -rotate-1">
            {name}
          </span>
        </div>
      </div>
    </motion.div>
  )
}