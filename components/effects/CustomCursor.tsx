'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const rawX = useSpring(0, { stiffness: 800, damping: 40, mass: 0.1 })
  const rawY = useSpring(0, { stiffness: 800, damping: 40, mass: 0.1 })

  const x = useTransform(rawX, (v) => `calc(${v}px - 50%)`)
  const y = useTransform(rawY, (v) => `calc(${v}px - 50%)`)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      )
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
    }
  }, [isVisible, rawX, rawY])

  if (isTouchDevice) return null

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* Main cursor dot — mix-blend-difference mantenido */}
      <motion.div
        className="fixed pointer-events-none z-[10001] mix-blend-difference"
        style={{
          translateX: x,
          translateY: y,
          willChange: 'transform',
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 500, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="w-3 h-3 rounded-full bg-red"
          style={{
            boxShadow: '0 0 10px rgba(192, 57, 43, 0.8), 0 0 20px rgba(192, 57, 43, 0.4)',
          }}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed pointer-events-none z-[10000]"
        style={{
          translateX: x,
          translateY: y,
          willChange: 'transform',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
          opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <div
          className="w-8 h-8 rounded-full border border-red"
          style={{
            boxShadow: isHovering
              ? '0 0 20px rgba(192, 57, 43, 0.4), inset 0 0 20px rgba(192, 57, 43, 0.1)'
              : '0 0 10px rgba(192, 57, 43, 0.2)',
          }}
        />
      </motion.div>

      {/* Trailing effect */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          translateX: x,
          translateY: y,
          willChange: 'transform',
        }}
        animate={{
          opacity: isVisible ? 0.2 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 20,
          mass: 0.5,
        }}
      >
        <div
          className="w-12 h-12 rounded-full border border-red/30"
          style={{
            filter: 'blur(4px)',
          }}
        />
      </motion.div>
    </>
  )
}
