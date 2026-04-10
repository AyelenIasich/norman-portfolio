'use client'

import { useEffect, useState, useCallback } from 'react'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'
import { ToastProvider } from '@/context/ToastContext'
import SpotlightEffect from '@/components/effects/SpotlightEffect'
import CustomCursor from '@/components/effects/CustomCursor'
import ScrollProgress from '@/components/effects/ScrollProgress'
import MatrixRain from '@/components/effects/MatrixRain'
import Terminal from '@/components/terminal/Terminal'
import CommandPalette from '@/components/CommandPalette'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import Lenis from 'lenis'

function GlobalEffects({ children }: { children: React.ReactNode }) {
  const { isHackerMode, toggleTheme } = useTheme()
  const [terminalOpen, setTerminalOpen] = useState(false)

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  // Terminal toggle via Ctrl+` or custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault()
        setTerminalOpen((prev) => !prev)
      }
    }

    const handleOpenTerminal = () => setTerminalOpen(true)
    const handleToggleMatrix = () => toggleTheme()

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-terminal', handleOpenTerminal)
    window.addEventListener('toggle-matrix', handleToggleMatrix)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-terminal', handleOpenTerminal)
      window.removeEventListener('toggle-matrix', handleToggleMatrix)
    }
  }, [toggleTheme])

  // Konami code activates hacker mode
  const konamiCallback = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])
  useKonamiCode(konamiCallback)

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Spotlight cursor effect */}
      <SpotlightEffect />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Matrix rain (hacker mode) */}
      <MatrixRain isActive={isHackerMode} />

      {/* CRT scanline overlay (hacker mode) */}
      {isHackerMode && <div className="crt-overlay" />}

      {/* Main content */}
      {children}

      {/* Terminal */}
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* Command Palette */}
      <CommandPalette />
    </>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <GlobalEffects>{children}</GlobalEffects>
      </ToastProvider>
    </ThemeProvider>
  )
}
