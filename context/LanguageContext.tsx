'use client'

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { en, type Translations } from '@/translations/en'
import { es } from '@/translations/es'

type Lang = 'en' | 'es'

interface LanguageContextValue {
  lang: Lang
  t: Translations
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  // Detect language from localStorage → navigator on first load
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang')
    if (saved === 'en' || saved === 'es') {
      setLang(saved)
      return
    }
    if (navigator.language.toLowerCase().startsWith('es')) {
      setLang('es')
    }
  }, [])

  const toggleLanguage = () => {
    setLang((prev) => {
      const next: Lang = prev === 'en' ? 'es' : 'en'
      localStorage.setItem('portfolio-lang', next)
      return next
    })
  }

  const t = useMemo(() => (lang === 'es' ? es : en), [lang])

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
