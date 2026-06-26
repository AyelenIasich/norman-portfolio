'use client'

import { Terminal, Zap } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function Footer() {
  const { isHackerMode, toggleTheme } = useTheme()

  const openTerminal = () => window.dispatchEvent(new CustomEvent('open-terminal'))
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-wire py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-sm">
            &copy; {year} Norman Iasich
          </p>
          <p className="font-mono text-xs text-red/50 tracking-wider">
            &#x226B; SECURE BY DESIGN &#x226A;
          </p>

          {/* Easter egg — hidden controls */}
          <div className="flex items-center gap-2 opacity-10 hover:opacity-30 transition-opacity duration-500">
            <button
              onClick={toggleTheme}
              title=""
              className={`p-1 rounded transition-colors ${
                isHackerMode ? 'text-green' : 'text-muted'
              }`}
            >
              <Zap className="w-3 h-3" />
            </button>
            <button
              onClick={openTerminal}
              title=""
              className="p-1 rounded text-muted"
            >
              <Terminal className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
