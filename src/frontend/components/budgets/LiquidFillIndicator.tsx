import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface LiquidFillIndicatorProps {
  percentage: number
  color?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  showBubbles?: boolean
}

export const LiquidFillIndicator: React.FC<LiquidFillIndicatorProps> = ({
  percentage,
  color,
  size = 'md',
  animated = true,
  showBubbles = true
}) => {
  const liquidRef = useRef<SVGPathElement>(null)
  const bubbleRefs = useRef<(SVGCircleElement | null)[]>([])

  const sizeConfig = {
    sm: { width: 80, height: 100, strokeWidth: 2 },
    md: { width: 120, height: 150, strokeWidth: 3 },
    lg: { width: 160, height: 200, strokeWidth: 4 }
  }

  const config = sizeConfig[size]
  const clampedPercentage = Math.max(0, Math.min(100, percentage))
  
  // Dynamic color based on percentage
  const getLiquidColor = () => {
    if (color) return color
    
    if (clampedPercentage <= 60) return '#22c55e' // Green
    if (clampedPercentage <= 80) return '#f59e0b' // Yellow
    if (clampedPercentage <= 100) return '#f97316' // Orange
    return '#ef4444' // Red
  }

  const liquidColor = getLiquidColor()
  const fillHeight = (clampedPercentage / 100) * (config.height - 20)

  useEffect(() => {
    if (!animated || !liquidRef.current) return

    // Animate liquid fill
    const liquid = liquidRef.current
    const targetHeight = fillHeight
    
    liquid.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
    
    // Create wave animation
    let animationId: number
    const animateWave = (timestamp: number) => {
      const waveOffset = Math.sin(timestamp * 0.002) * 3
      const waveOffset2 = Math.cos(timestamp * 0.003) * 2
      
      const path = `
        M 10 ${config.height - targetHeight + waveOffset}
        Q ${config.width / 4} ${config.height - targetHeight + waveOffset2} ${config.width / 2} ${config.height - targetHeight + waveOffset}
        T ${config.width - 10} ${config.height - targetHeight + waveOffset2}
        L ${config.width - 10} ${config.height - 10}
        L 10 ${config.height - 10}
        Z
      `
      
      liquid.setAttribute('d', path)
      
      if (animated) {
        animationId = requestAnimationFrame(animateWave)
      }
    }

    if (targetHeight > 0) {
      animationId = requestAnimationFrame(animateWave)
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [fillHeight, animated, config])

  // Animate bubbles
  useEffect(() => {
    if (!showBubbles || !animated) return

    bubbleRefs.current.forEach((bubble, index) => {
      if (!bubble) return

      const animateBubble = () => {
        const startY = config.height - fillHeight + Math.random() * 20
        const endY = Math.max(20, startY - 50 - Math.random() * 30)
        const duration = 2000 + Math.random() * 1000
        
        bubble.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`
        bubble.style.transform = `translateY(${startY}px)`
        bubble.style.opacity = '0'
        
        setTimeout(() => {
          bubble.style.transform = `translateY(${endY}px)`
          bubble.style.opacity = '0.7'
          
          setTimeout(() => {
            bubble.style.opacity = '0'
            setTimeout(animateBubble, Math.random() * 2000)
          }, duration - 200)
        }, 100)
      }

      setTimeout(animateBubble, index * 500 + Math.random() * 1000)
    })
  }, [fillHeight, showBubbles, animated, config])

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="drop-shadow-lg"
      >
        {/* Container outline */}
        <rect
          x="5"
          y="5"
          width={config.width - 10}
          height={config.height - 10}
          rx="15"
          ry="15"
          fill="none"
          stroke="#1f2937"
          strokeWidth={config.strokeWidth}
          className="drop-shadow-md"
        />
        
        {/* Background gradient */}
        <defs>
          <linearGradient id={`bg-gradient-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.8" />
          </linearGradient>
          
          <linearGradient id={`liquid-gradient-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={liquidColor} stopOpacity="0.9" />
            <stop offset="50%" stopColor={liquidColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={liquidColor} stopOpacity="0.9" />
          </linearGradient>
          
          <filter id={`glow-${size}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <clipPath id={`container-clip-${size}`}>
            <rect x="5" y="5" width={config.width - 10} height={config.height - 10} rx="15" ry="15" />
          </clipPath>
        </defs>
        
        {/* Background */}
        <rect
          x="5"
          y="5"
          width={config.width - 10}
          height={config.height - 10}
          rx="15"
          ry="15"
          fill={`url(#bg-gradient-${size})`}
        />
        
        {/* Liquid fill */}
        <motion.path
          ref={liquidRef}
          fill={`url(#liquid-gradient-${size})`}
          filter={`url(#glow-${size})`}
          clipPath={`url(#container-clip-${size})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Bubbles */}
        {showBubbles && Array.from({ length: 5 }).map((_, index) => (
          <circle
            key={index}
            ref={(el) => (bubbleRefs.current[index] = el)}
            cx={15 + Math.random() * (config.width - 30)}
            cy={config.height - 10}
            r={1 + Math.random() * 2}
            fill="rgba(255, 255, 255, 0.8)"
            opacity="0"
          />
        ))}
        
        {/* Shine effect */}
        <rect
          x="8"
          y="8"
          width="8"
          height={config.height - 16}
          rx="4"
          fill="url(#shine-gradient)"
          opacity="0.3"
        />
        
        <defs>
          <linearGradient id="shine-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Percentage text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <div className={`font-bungee text-white drop-shadow-lg ${
            size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
          }`}>
            {clampedPercentage.toFixed(0)}%
          </div>
        </motion.div>
      </div>
    </div>
  )
}