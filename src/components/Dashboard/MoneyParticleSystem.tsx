import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

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
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
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
  }, [count, color])
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
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
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export const MoneyParticleSystem: React.FC<ParticleSystemProps> = (props) => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem {...props} />
      </Canvas>
    </div>
  )
}