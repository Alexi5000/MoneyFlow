import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface GlassmorphicCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  neonColor?: 'primary' | 'secondary' | 'accent' | 'warning'
  onClick?: () => void
  animate?: boolean
}

export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className,
  hover = false,
  glow = false,
  neonColor = 'primary',
  onClick,
  animate = true
}) => {
  const glowClasses = {
    primary: 'shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]',
    secondary: 'shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]',
    accent: 'shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]',
    warning: 'shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]'
  }

  const cardClasses = clsx(
    'glass rounded-xl border border-white/20 backdrop-blur-md',
    'bg-gradient-to-br from-white/10 to-white/5',
    'dark:from-white/5 dark:to-white/2',
    hover && 'hover:from-white/15 hover:to-white/8 dark:hover:from-white/8 dark:hover:to-white/4',
    hover && 'transition-all duration-300 cursor-pointer',
    hover && 'hover:scale-[1.02] hover:-translate-y-1',
    glow && glowClasses[neonColor],
    glow && 'transition-shadow duration-300',
    className
  )

  const CardComponent = animate ? motion.div : 'div'
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    whileHover: hover ? { scale: 1.02, y: -4 } : undefined,
    whileTap: onClick ? { scale: 0.98 } : undefined
  } : {}

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