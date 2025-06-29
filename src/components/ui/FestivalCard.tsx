import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface FestivalCardProps {
  children: React.ReactNode
  color?: 'pink' | 'yellow' | 'orange' | 'purple' | 'green'
  className?: string
  hover?: boolean
  onClick?: () => void
  animate?: boolean
  rotation?: number
}

export const FestivalCard: React.FC<FestivalCardProps> = ({
  children,
  color = 'pink',
  className,
  hover = true,
  onClick,
  animate = true,
  rotation = 1
}) => {
  const cardClasses = clsx(
    'festival-card',
    color,
    hover && 'cursor-pointer',
    className
  )

  const CardComponent = animate ? motion.div : 'div'
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20, rotate: rotation },
    animate: { opacity: 1, y: 0, rotate: rotation },
    transition: { duration: 0.5 },
    whileHover: hover ? { 
      scale: 1.05, 
      rotate: 0,
      boxShadow: '12px 12px 0 var(--black)'
    } : undefined,
    whileTap: onClick ? { scale: 0.95 } : undefined
  } : {
    style: { transform: `rotate(${rotation}deg)` }
  }

  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick}
      {...animationProps}
    >
      {children}
    </CardComponent>
  )
}