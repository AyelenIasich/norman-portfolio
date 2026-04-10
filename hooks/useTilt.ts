'use client'

import { useRef, useState, useCallback, RefObject } from 'react'

interface TiltOptions {
  max?: number
  scale?: number
  speed?: number
}

interface TiltValues {
  rotateX: number
  rotateY: number
  scale: number
}

export function useTilt<T extends HTMLElement>(
  options: TiltOptions = {}
): { ref: RefObject<T | null>; tiltValues: TiltValues; handlers: { onMouseMove: (e: React.MouseEvent<T>) => void; onMouseLeave: () => void } } {
  const { max = 10, scale = 1.02, speed = 400 } = options
  const ref = useRef<T>(null)
  const [tiltValues, setTiltValues] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const rotateX = ((mouseY / (rect.height / 2)) * -max).toFixed(2)
      const rotateY = ((mouseX / (rect.width / 2)) * max).toFixed(2)

      setTiltValues({
        rotateX: parseFloat(rotateX),
        rotateY: parseFloat(rotateY),
        scale,
      })
    },
    [max, scale]
  )

  const handleMouseLeave = useCallback(() => {
    setTiltValues({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    })
  }, [])

  return {
    ref,
    tiltValues,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}
