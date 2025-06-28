import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

interface LiquidBudgetGaugeProps {
  category: string
  spent: number
  allocated: number
  percentage: number
  color: string
  icon: string
}

export const LiquidBudgetGauge: React.FC<LiquidBudgetGaugeProps> = ({
  category,
  spent,
  allocated,
  percentage,
  color,
  icon
}) => {
  const liquidRef = useRef<SVGPathElement>(null)
  const bubbleRefs = useRef<(SVGCircleElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!liquidRef.current) return
    
    const fillHeight = (percentage / 100) * 200
    const waveAmplitude = 8
    const waveFrequency = 0.02
    
    // Animate liquid fill
    gsap.to(liquidRef.current, {
      attr: {
        d: `M 0 ${200 - fillHeight} 
            Q 50 ${200 - fillHeight - waveAmplitude} 100 ${200 - fillHeight}
            T 200 ${200 - fillHeight}
            L 200 200
            L 0 200 Z`
      },
      duration: 2,
      ease: "power2.out"
    })
    
    // Animate wave motion
    const waveAnimation = () => {
      if (!liquidRef.current) return
      
      gsap.to(liquidRef.current, {
        attr: {
          d: `M 0 ${200 - fillHeight + Math.sin(Date.now() * waveFrequency) * waveAmplitude} 
              Q 50 ${200 - fillHeight + Math.sin(Date.now() * waveFrequency + 1) * waveAmplitude} 100 ${200 - fillHeight + Math.sin(Date.now() * waveFrequency + 2) * waveAmplitude}
              T 200 ${200 - fillHeight + Math.sin(Date.now() * waveFrequency + 3) * waveAmplitude}
              L 200 200
              L 0 200 Z`
        },
        duration: 0.1,
        ease: "none",
        onComplete: waveAnimation
      })
    }
    
    setTimeout(waveAnimation, 2000)
    
    // Animate bubbles
    bubbleRefs.current.forEach((bubble, index) => {
      if (!bubble) return
      
      gsap.set(bubble, {
        y: 200,
        opacity: 0
      })
      
      gsap.to(bubble, {
        y: 50,
        opacity: 1,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
        ease: "power1.out",
        repeat: -1,
        repeatDelay: Math.random() * 3
      })
    })
  }, [percentage])
  
  const getStatusColor = () => {
    if (percentage >= 90) return '#ef4444' // Red
    if (percentage >= 75) return '#f59e0b' // Yellow
    return color // Original color
  }
  
  const getStatusText = () => {
    if (percentage >= 100) return 'Over Budget'
    if (percentage >= 90) return 'Almost Full'
    if (percentage >= 75) return 'Getting High'
    return 'On Track'
  }
  
  return (
    <motion.div
      ref={containerRef}
      className="relative p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-4">
        <div className="text-2xl mb-2">{icon}</div>
        <h3 className="text-lg font-semibold text-white">{category}</h3>
        <p className="text-sm text-gray-400">{getStatusText()}</p>
      </div>
      
      <div className="relative mx-auto w-32 h-48">
        <svg
          width="128"
          height="192"
          viewBox="0 0 128 200"
          className="absolute inset-0"
        >
          {/* Container outline */}
          <rect
            x="4"
            y="4"
            width="120"
            height="192"
            rx="60"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          
          {/* Liquid fill */}
          <defs>
            <linearGradient id={`liquid-gradient-${category}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={getStatusColor()} stopOpacity="0.8" />
              <stop offset="100%" stopColor={getStatusColor()} stopOpacity="0.4" />
            </linearGradient>
            <filter id={`glow-${category}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            ref={liquidRef}
            fill={`url(#liquid-gradient-${category})`}
            filter={`url(#glow-${category})`}
            clipPath="url(#container-clip)"
          />
          
          {/* Bubbles */}
          {[...Array(5)].map((_, index) => (
            <circle
              key={index}
              ref={(el) => (bubbleRefs.current[index] = el)}
              cx={20 + Math.random() * 88}
              cy={200}
              r={2 + Math.random() * 3}
              fill="rgba(255, 255, 255, 0.6)"
              opacity="0"
            />
          ))}
          
          {/* Clip path for container shape */}
          <defs>
            <clipPath id="container-clip">
              <rect x="4" y="4" width="120" height="192" rx="60" />
            </clipPath>
          </defs>
        </svg>
        
        {/* Percentage text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {percentage.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-300">
              ${spent.toFixed(0)} / ${allocated.toFixed(0)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress indicators */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Spent</span>
          <span className="text-white font-medium">${spent.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Remaining</span>
          <span className={`font-medium ${allocated - spent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${(allocated - spent).toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}