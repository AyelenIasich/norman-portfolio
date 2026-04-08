'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Shield } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Navbar() {
  const { t, lang, toggleLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const links = [
    { label: t.nav.home,           id: 'home' },
    { label: t.nav.about,          id: 'about' },
    { label: t.nav.skills,         id: 'skills' },
    { label: t.nav.projects,       id: 'projects' },
    { label: t.nav.cyberlab,       id: 'cyberlab' },
    { label: t.nav.certifications, id: 'certifications' },
    { label: t.nav.contact,        id: 'contact' },
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-md border-b border-wire shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 font-grotesk font-bold text-snow hover:text-blue transition-colors"
        >
          <Shield className="w-5 h-5 text-blue" />
          Norman Iasich
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-muted hover:text-blue transition-colors text-sm font-medium tracking-wide"
            >
              {l.label}
            </button>
          ))}

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="ml-1 px-3 py-1 rounded border border-blue text-blue text-sm font-bold
                       hover:bg-blue hover:text-dark transition-all"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 rounded border border-blue text-blue text-xs font-bold"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-snow hover:text-blue transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="bg-surface border-t border-wire px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-left py-3 text-muted hover:text-blue transition-colors border-b border-wire last:border-0 text-sm"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
