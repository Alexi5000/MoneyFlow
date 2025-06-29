/**
 * WebGL Detection and Device Capability Utilities
 * Provides functions to detect WebGL support and device capabilities
 */

export interface DeviceCapabilities {
  hasWebGL: boolean
  hasWebGL2: boolean
  maxTextureSize: number
  maxVertexUniforms: number
  maxFragmentUniforms: number
  isMobile: boolean
  isLowEnd: boolean
  recommendedParticleCount: number
  recommendedQuality: 'low' | 'medium' | 'high'
}

/**
 * Detects if WebGL is supported in the current browser
 */
export const isWebGLSupported = (): boolean => {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!(gl && gl instanceof WebGLRenderingContext)
  } catch (e) {
    return false
  }
}

/**
 * Detects if WebGL2 is supported in the current browser
 */
export const isWebGL2Supported = (): boolean => {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2')
    return !!(gl && gl instanceof WebGL2RenderingContext)
  } catch (e) {
    return false
  }
}

/**
 * Detects if the device is mobile
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Estimates if the device is low-end based on various factors
 */
export const isLowEndDevice = (): boolean => {
  // Check for low memory
  const memory = (navigator as any).deviceMemory
  if (memory && memory < 4) return true
  
  // Check for slow connection
  const connection = (navigator as any).connection
  if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    return true
  }
  
  // Check for mobile device (generally less powerful)
  if (isMobileDevice()) return true
  
  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return true
  
  return false
}

/**
 * Gets WebGL context information and capabilities
 */
export const getWebGLCapabilities = (): Partial<DeviceCapabilities> => {
  if (!isWebGLSupported()) {
    return {
      hasWebGL: false,
      hasWebGL2: false,
      maxTextureSize: 0,
      maxVertexUniforms: 0,
      maxFragmentUniforms: 0
    }
  }

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      return {
        hasWebGL: false,
        hasWebGL2: false,
        maxTextureSize: 0,
        maxVertexUniforms: 0,
        maxFragmentUniforms: 0
      }
    }

    return {
      hasWebGL: true,
      hasWebGL2: isWebGL2Supported(),
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxVertexUniforms: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
      maxFragmentUniforms: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS)
    }
  } catch (e) {
    return {
      hasWebGL: false,
      hasWebGL2: false,
      maxTextureSize: 0,
      maxVertexUniforms: 0,
      maxFragmentUniforms: 0
    }
  }
}

/**
 * Analyzes device capabilities and returns recommendations
 */
export const analyzeDeviceCapabilities = (): DeviceCapabilities => {
  const webglCaps = getWebGLCapabilities()
  const mobile = isMobileDevice()
  const lowEnd = isLowEndDevice()
  
  let recommendedParticleCount = 1000
  let recommendedQuality: 'low' | 'medium' | 'high' = 'high'
  
  if (lowEnd || !webglCaps.hasWebGL) {
    recommendedParticleCount = 100
    recommendedQuality = 'low'
  } else if (mobile) {
    recommendedParticleCount = 300
    recommendedQuality = 'medium'
  } else if (webglCaps.hasWebGL2 && webglCaps.maxTextureSize && webglCaps.maxTextureSize >= 4096) {
    recommendedParticleCount = 1500
    recommendedQuality = 'high'
  }
  
  return {
    hasWebGL: webglCaps.hasWebGL || false,
    hasWebGL2: webglCaps.hasWebGL2 || false,
    maxTextureSize: webglCaps.maxTextureSize || 0,
    maxVertexUniforms: webglCaps.maxVertexUniforms || 0,
    maxFragmentUniforms: webglCaps.maxFragmentUniforms || 0,
    isMobile: mobile,
    isLowEnd: lowEnd,
    recommendedParticleCount,
    recommendedQuality
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private frameCount = 0
  private lastTime = 0
  private fps = 0
  private memoryUsage = 0
  
  constructor() {
    this.lastTime = performance.now()
  }
  
  update() {
    const currentTime = performance.now()
    this.frameCount++
    
    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
      this.frameCount = 0
      this.lastTime = currentTime
      
      // Update memory usage if available
      if ((performance as any).memory) {
        this.memoryUsage = (performance as any).memory.usedJSHeapSize / 1048576 // Convert to MB
      }
    }
  }
  
  getFPS(): number {
    return this.fps
  }
  
  getMemoryUsage(): number {
    return this.memoryUsage
  }
  
  isPerformanceGood(): boolean {
    return this.fps >= 30 && this.memoryUsage < 100 // Less than 100MB
  }
}