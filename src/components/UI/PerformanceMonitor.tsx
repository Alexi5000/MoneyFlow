import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Zap, AlertTriangle } from 'lucide-react'
import { PerformanceMonitor as PerfMonitor } from '../../utils/webglDetection'

interface PerformanceDisplayProps {
  show?: boolean
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export const PerformanceDisplay: React.FC<PerformanceDisplayProps> = ({
  show = false,
  position = 'top-right'
}) => {
  const [perfData, setPerfData] = useState({
    fps: 0,
    memory: 0,
    isGood: true
  })
  
  const [monitor] = useState(() => new PerfMonitor())

  useEffect(() => {
    if (!show) return

    const updatePerformance = () => {
      monitor.update()
      setPerfData({
        fps: monitor.getFPS(),
        memory: monitor.getMemoryUsage(),
        isGood: monitor.isPerformanceGood()
      })
    }

    const interval = setInterval(updatePerformance, 1000)
    return () => clearInterval(interval)
  }, [show, monitor])

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  }

  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={`fixed ${positionClasses[position]} z-50 bg-black/80 backdrop-blur-md rounded-lg p-3 text-white text-xs font-mono`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Monitor className="w-4 h-4" />
          <span className="font-semibold">Performance</span>
          {perfData.isGood ? (
            <Zap className="w-3 h-3 text-green-400" />
          ) : (
            <AlertTriangle className="w-3 h-3 text-red-400" />
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>FPS:</span>
            <span className={perfData.fps >= 30 ? 'text-green-400' : 'text-red-400'}>
              {perfData.fps}
            </span>
          </div>
          
          {perfData.memory > 0 && (
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className={perfData.memory < 100 ? 'text-green-400' : 'text-red-400'}>
                {perfData.memory.toFixed(1)}MB
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [monitor] = useState(() => new PerfMonitor())
  const [perfData, setPerfData] = useState({
    fps: 0,
    memory: 0,
    isGood: true
  })

  useEffect(() => {
    const updatePerformance = () => {
      monitor.update()
      setPerfData({
        fps: monitor.getFPS(),
        memory: monitor.getMemoryUsage(),
        isGood: monitor.isPerformanceGood()
      })
    }

    const interval = setInterval(updatePerformance, 1000)
    return () => clearInterval(interval)
  }, [monitor])

  return perfData
}