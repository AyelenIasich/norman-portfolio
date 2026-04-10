'use client'

import { useEffect, useState, useCallback } from 'react'

type KonamiCallback = () => void

export function useKonamiCode(callback: KonamiCallback, delay = 1000) {
  const [sequence, setSequence] = useState<string[]>([])
  const [isActivated, setIsActivated] = useState(false)

  const konamiSequence = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ]

  const resetSequence = useCallback(() => {
    setSequence([])
  }, [])

  useEffect(() => {
    if (isActivated) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key

      setSequence((prev) => {
        const newSequence = [...prev, key]

        // Check if sequence matches so far
        const isMatchSoFar = konamiSequence
          .slice(0, newSequence.length)
          .every((k, i) => k.toLowerCase() === newSequence[i].toLowerCase())

        if (!isMatchSoFar) {
          // Reset if wrong key pressed
          return []
        }

        // Check if complete
        if (newSequence.length === konamiSequence.length) {
          setIsActivated(true)
          callback()

          // Reset after delay
          setTimeout(() => {
            setIsActivated(false)
            setSequence([])
          }, delay)

          return []
        }

        return newSequence
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [callback, isActivated, delay])

  return { isActivated, resetSequence }
}
