'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'default' | 'hacker'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  isHackerMode: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('default')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('portfolio-theme') as Theme
    if (saved === 'default' || saved === 'hacker') {
      setThemeState(saved)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('portfolio-theme', theme)

    if (theme === 'hacker') {
      document.documentElement.classList.add('matrix-mode')
    } else {
      document.documentElement.classList.remove('matrix-mode')
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'default' ? 'hacker' : 'default'))
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isHackerMode: theme === 'hacker',
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
