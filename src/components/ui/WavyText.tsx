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
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-2xl'
      case 'md':
        return 'text-4xl'
      case 'lg':
        return 'text-6xl'
      case 'xl':
        return 'text-8xl'
      default:
        return 'text-4xl'
    }
  }

  const letters = children.split('')

  return (
    <div className={`
      font-bungee
      ${getSizeStyles()}
      flex
      items-center
      justify-center
      ${className}
    `}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{
            background: `linear-gradient(45deg, 
              hsl(${(index * 30) % 360}, 70%, 60%), 
              hsl(${(index * 30 + 60) % 360}, 70%, 60%)
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            delay: index * 0.1,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  )
}