import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { analyzeDeviceCapabilities } from '../../utils/webglDetection'
import { ErrorBoundary } from '../UI/ErrorBoundary'

interface ParticleSystemProps {
  count?: number
  speed?: number
  color?: string
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  count = 1000, 
  speed = 0.5,
  color = '#6366f1'
}) => {
  const meshRef = useRef<THREE.Points>(null)
  const deviceCaps = analyzeDeviceCapabilities()
  
  // Adjust particle count based on device capabilities
  const adjustedCount = Math.min(count, deviceCaps.recommendedParticleCount)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(adjustedCount * 3)
    const velocities = new Float32Array(adjustedCount * 3)
    const colors = new Float32Array(adjustedCount * 3)
    
    for (let i = 0; i < adjustedCount; i++) {
      const i3 = i * 3
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = Math.random() * 0.02 + 0.01 // Upward bias
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
      
      // Colors with some variation
      const colorObj = new THREE.Color(color)
      colors[i3] = colorObj.r + (Math.random() - 0.5) * 0.2
      colors[i3 + 1] = colorObj.g + (Math.random() - 0.5) * 0.2
      colors[i3 + 2] = colorObj.b + (Math.random() - 0.5) * 0.2
    }
    
    return { positions, velocities, colors }
  }, [adjustedCount, color])
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < adjustedCount; i++) {
      const i3 = i * 3
      
      // Update positions
      positions[i3] += particles.velocities[i3] * speed
      positions[i3 + 1] += particles.velocities[i3 + 1] * speed
      positions[i3 + 2] += particles.velocities[i3 + 2] * speed
      
      // Reset particles that go too far
      if (positions[i3 + 1] > 10) {
        positions[i3] = (Math.random() - 0.5) * 20
        positions[i3 + 1] = -10
        positions[i3 + 2] = (Math.random() - 0.5) * 20
      }
      
      if (Math.abs(positions[i3]) > 10 || Math.abs(positions[i3 + 2]) > 10) {
        positions[i3] = (Math.random() - 0.5) * 20
        positions[i3 + 1] = (Math.random() - 0.5) * 20
        positions[i3 + 2] = (Math.random() - 0.5) * 20
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <Points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={adjustedCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={adjustedCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={deviceCaps.isMobile ? 0.03 : 0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Fallback component for non-WebGL devices
const FallbackParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-30 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  )
}

export const MoneyParticleSystem: React.FC<ParticleSystemProps> = (props) => {
  const deviceCaps = analyzeDeviceCapabilities()
  
  // Use fallback for devices without WebGL or very low-end devices
  if (!deviceCaps.hasWebGL || (deviceCaps.isLowEnd && deviceCaps.isMobile)) {
    return <FallbackParticles />
  }
  
  return (
    <ErrorBoundary fallback={<FallbackParticles />}>
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<FallbackParticles />}>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            style={{ background: 'transparent' }}
            gl={{ 
              antialias: deviceCaps.recommendedQuality !== 'low',
              alpha: true,
              powerPreference: deviceCaps.isLowEnd ? 'low-power' : 'high-performance'
            }}
          >
            <ParticleSystem {...props} />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}