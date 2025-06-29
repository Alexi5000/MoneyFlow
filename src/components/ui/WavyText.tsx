import React from 'react'
import { motion } from 'framer-motion'

interface WavyTextProps {
  children: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const WavyText: React.FC<WavyTextProps> = ({
  children,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  }

  const words = children.split(' ')

  return (
    <div className={`wavy-text ${sizeClasses[size]} ${className}`}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className={`word-${(wordIndex % 3) + 1} inline-block mr-4`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: wordIndex * 0.2,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}