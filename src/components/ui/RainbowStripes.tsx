import React from 'react'
import { motion } from 'framer-motion'

interface RainbowStripesProps {
  opacity?: number
  className?: string
}

export const RainbowStripes: React.FC<RainbowStripesProps> = ({
  opacity = 0.1,
  className = ''
}) => {
  const stripes = [
    { color: 'from-pink-500 to-pink-600', delay: 0 },
    { color: 'from-yellow-400 to-orange-500', delay: 0.2 },
    { color: 'from-green-500 to-emerald-600', delay: 0.4 },
    { color: 'from-blue-500 to-indigo-600', delay: 0.6 },
    { color: 'from-purple-500 to-violet-600', delay: 0.8 },
    { color: 'from-red-500 to-pink-500', delay: 1.0 },
  ]

  return (
    <div 
      className={`
        fixed
        inset-0
        pointer-events-none
        overflow-hidden
        ${className}
      `}
      style={{ opacity }}
    >
      {stripes.map((stripe, index) => (
        <motion.div
          key={index}
          className={`
            absolute
            w-full
            h-8
            bg-gradient-to-r
            ${stripe.color}
            transform
            -skew-y-12
          `}
          style={{
            top: `${index * 15}%`,
            left: '-20%',
            width: '140%',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 20,
            delay: stripe.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}