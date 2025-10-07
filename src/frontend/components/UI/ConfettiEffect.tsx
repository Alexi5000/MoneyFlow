import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
}

export const ConfettiEffect: React.FC<{ trigger?: boolean; count?: number }> = ({ 
  trigger = false, 
  count = 50 
}) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (trigger) {
      const pieces = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        color: ['#E91E63', '#FFC107', '#FF5722', '#9C27B0'][Math.floor(Math.random() * 4)],
        delay: Math.random() * 2
      }))
      
      setConfetti(pieces)
      
      // Clear confetti after animation
      setTimeout(() => setConfetti([]), 3000)
    }
  }, [trigger, count])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded"
            style={{
              backgroundColor: piece.color,
              left: piece.x,
              top: -20
            }}
            initial={{ y: -20, rotate: 0, opacity: 1 }}
            animate={{ 
              y: window.innerHeight + 20, 
              rotate: 360,
              opacity: 0
            }}
            transition={{
              duration: 3,
              delay: piece.delay,
              ease: 'linear'
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}