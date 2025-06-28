import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { useFinancialStore } from '../../store/financialStore'

interface PieSliceProps {
  startAngle: number
  endAngle: number
  color: string
  radius: number
  height: number
  category: string
  amount: number
  percentage: number
  isHovered: boolean
  onHover: (hovered: boolean) => void
  onClick: () => void
}

const PieSlice: React.FC<PieSliceProps> = ({
  startAngle,
  endAngle,
  color,
  radius,
  height,
  category,
  amount,
  percentage,
  isHovered,
  onHover,
  onClick
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Group>(null)
  
  const geometry = React.useMemo(() => {
    const shape = new THREE.Shape()
    const segments = 32
    const angleStep = (endAngle - startAngle) / segments
    
    shape.moveTo(0, 0)
    
    for (let i = 0; i <= segments; i++) {
      const angle = startAngle + i * angleStep
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      shape.lineTo(x, y)
    }
    
    shape.lineTo(0, 0)
    
    const extrudeSettings = {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02
    }
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [startAngle, endAngle, radius, height])
  
  useFrame((state) => {
    if (meshRef.current) {
      const targetZ = isHovered ? 0.3 : 0
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1)
      
      if (isHovered) {
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.02
      }
    }
    
    if (textRef.current && isHovered) {
      textRef.current.rotation.z = -meshRef.current!.rotation.z
    }
  })
  
  const midAngle = (startAngle + endAngle) / 2
  const textRadius = radius * 0.7
  const textX = Math.cos(midAngle) * textRadius
  const textY = Math.sin(midAngle) * textRadius
  
  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={isHovered ? 0.9 : 0.8}
          emissive={color}
          emissiveIntensity={isHovered ? 0.2 : 0.1}
        />
      </mesh>
      
      {isHovered && (
        <group ref={textRef} position={[textX, textY, height + 0.1]}>
          <Text
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.woff"
          >
            {category}
          </Text>
          <Text
            position={[0, -0.2, 0]}
            fontSize={0.12}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-regular.woff"
          >
            ${amount.toFixed(0)} ({percentage.toFixed(1)}%)
          </Text>
        </group>
      )}
    </group>
  )
}

const Scene: React.FC = () => {
  const { budgets } = useFinancialStore()
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null)
  
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  
  let currentAngle = 0
  const slices = budgets.map((budget) => {
    const percentage = (budget.spent / totalSpent) * 100
    const angle = (budget.spent / totalSpent) * Math.PI * 2
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle
    
    return {
      ...budget,
      startAngle,
      endAngle,
      percentage
    }
  })
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#6366f1" />
      
      {slices.map((slice) => (
        <PieSlice
          key={slice.id}
          startAngle={slice.startAngle}
          endAngle={slice.endAngle}
          color={slice.color}
          radius={2}
          height={0.3}
          category={slice.category}
          amount={slice.spent}
          percentage={slice.percentage}
          isHovered={hoveredSlice === slice.id}
          onHover={(hovered) => setHoveredSlice(hovered ? slice.id : null)}
          onClick={() => console.log(`Clicked on ${slice.category}`)}
        />
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

export const ExpensePieChart3D: React.FC = () => {
  const { budgets } = useFinancialStore()
  
  if (budgets.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No expense data available
      </div>
    )
  }
  
  return (
    <motion.div
      className="h-64 w-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </motion.div>
  )
}