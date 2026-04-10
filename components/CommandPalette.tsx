'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Moon,
  Sun,
  Terminal,
  Globe,
  Home,
  User,
  Code,
  Award,
  Mail,
  Command,
} from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import type { LucideIcon } from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  icon: LucideIcon
  shortcut?: string
  action: () => void
  category: 'Navigation' | 'Theme' | 'Language' | 'Tools'
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { isHackerMode, toggleTheme } = useTheme()
  const { lang, toggleLanguage } = useLanguage()

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'home',
      title: 'Go to Home',
      icon: Home,
      shortcut: 'H',
      action: () => scrollToSection('home'),
      category: 'Navigation',
    },
    {
      id: 'about',
      title: 'Go to About',
      icon: User,
      shortcut: 'A',
      action: () => scrollToSection('about'),
      category: 'Navigation',
    },
    {
      id: 'skills',
      title: 'Go to Skills',
      icon: Code,
      shortcut: 'S',
      action: () => scrollToSection('skills'),
      category: 'Navigation',
    },
    {
      id: 'certifications',
      title: 'Go to Certifications',
      icon: Award,
      shortcut: 'C',
      action: () => scrollToSection('certifications'),
      category: 'Navigation',
    },
    {
      id: 'contact',
      title: 'Go to Contact',
      icon: Mail,
      shortcut: 'M',
      action: () => scrollToSection('contact'),
      category: 'Navigation',
    },
    // Theme
    {
      id: 'theme',
      title: isHackerMode ? 'Disable Hacker Mode' : 'Enable Hacker Mode',
      icon: isHackerMode ? Sun : Moon,
      shortcut: 'T',
      action: () => {
        toggleTheme()
        setIsOpen(false)
      },
      category: 'Theme',
    },
    // Language
    {
      id: 'language',
      title: `Switch to ${lang === 'en' ? 'Spanish' : 'English'}`,
      icon: Globe,
      shortcut: 'L',
      action: () => {
        toggleLanguage()
        setIsOpen(false)
      },
      category: 'Language',
    },
    // Tools
    {
      id: 'terminal',
      title: 'Open Terminal',
      icon: Terminal,
      shortcut: '`',
      action: () => {
        window.dispatchEvent(new CustomEvent('open-terminal'))
        setIsOpen(false)
      },
      category: 'Tools',
    },
  ]

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase())
  )

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {} as Record<string, CommandItem[]>)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }

      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-wire bg-surface/50 text-muted text-sm hover:border-red hover:text-snow transition-all"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Command Palette...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-dark text-xs border border-wire">
          ⌘K
        </kbd>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-dark/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed inset-x-4 top-[20%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] z-[201]"
            >
              <div className="bg-surface border border-wire rounded-xl overflow-hidden shadow-2xl">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-wire">
                  <Search className="w-5 h-5 text-muted" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-snow placeholder-muted outline-none"
                    autoFocus
                  />
                  <kbd
                    className="px-2 py-1 rounded text-xs bg-dark border border-wire text-muted cursor-pointer hover:text-snow transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    ESC
                  </kbd>
                </div>

                {/* Commands List */}
                <div className="max-h-[400px] overflow-y-auto py-2">
                  {Object.entries(groupedCommands).map(([category, cmds]) => (
                    <div key={category}>
                      <div className="px-4 py-1.5 text-xs font-semibold text-muted uppercase tracking-wider">
                        {category}
                      </div>
                      {cmds.map((cmd) => {
                        const Icon = cmd.icon
                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red/10 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-dark flex items-center justify-center group-hover:bg-red/20 transition-colors">
                              <Icon className="w-4 h-4 text-muted group-hover:text-red" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-sm text-snow">{cmd.title}</div>
                            </div>
                            {cmd.shortcut && (
                              <kbd className="px-1.5 py-0.5 rounded text-xs bg-dark border border-wire text-muted">
                                {cmd.shortcut}
                              </kbd>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ))}

                  {filteredCommands.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted">
                      No commands found for &quot;{search}&quot;
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-wire flex items-center justify-between text-xs text-muted">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1 rounded bg-dark border border-wire">↵</kbd>
                      to select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1 rounded bg-dark border border-wire">esc</kbd>
                      to close
                    </span>
                  </div>
                  <span>{filteredCommands.length} commands</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
