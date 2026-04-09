'use client'

import { useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import FallingCodeBackground from './FallingCodeBackground'

export default function Hero() {
  const { t, lang } = useLanguage()

  // Stable reference — only recreates when lang changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const roles = useMemo(() => t.hero.roles, [lang])
  const displayText = useTypingEffect(roles)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)' }}
    >
      {/* Falling code canvas */}
      <FallingCodeBackground />

      {/* Scan lines CRT effect */}
      <div className="scan-lines" />

      {/* Red radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,23,68,0.12) 0%, transparent 65%)',
        }}
      />

      {/* Gradient fade to dark at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-dark to-transparent pointer-events-none z-[4]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Terminal prompt */}
        <p className="font-mono text-red text-xs sm:text-sm mb-6 tracking-[3px] opacity-80"
           style={{ animation: 'pulse 2s ease-in-out infinite' }}>
          root@kali:~# whoami
        </p>

        {/* Glitch name with red glow */}
        <h1
          className="glitch red-glow-pulse font-grotesk font-black text-snow leading-none mb-6
                     text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-[4px]"
          style={{ filter: 'drop-shadow(0 0 30px rgba(255,23,68,0.7))' }}
        >
          Norman Iasich
        </h1>

        {/* Typing effect */}
        <div className="h-12 sm:h-14 flex items-center justify-center mb-6">
          <span
            className="font-mono font-semibold text-red text-lg sm:text-2xl md:text-3xl"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255,23,68,0.5))' }}
          >
            {displayText}
            <span className="cursor text-red ml-0.5">&#x258C;</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="font-inter text-muted text-sm sm:text-base md:text-lg italic mb-10 max-w-xl">
          &ldquo;{t.hero.tagline}&rdquo;
        </p>

        {/* CTAs */}
        <div className="flex flex-row gap-5 justify-center mb-10">
          <button
            onClick={() => scrollTo('cyberlab')}
            className="px-8 py-3 bg-red text-white font-mono font-bold text-xs uppercase tracking-wider
                       border-2 border-transparent rounded-sm
                       hover:bg-red-bright hover:border-cyan
                       hover:shadow-[0_0_20px_rgba(255,23,68,0.5),0_0_40px_rgba(255,23,68,0.25)]
                       transition-all duration-300 active:scale-95"
          >
            {t.hero.cta1}
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3 bg-transparent text-cyan font-mono font-bold text-xs uppercase tracking-wider
                       border-2 border-cyan rounded-sm
                       hover:bg-cyan/10 hover:text-white hover:border-red
                       hover:shadow-[0_0_20px_rgba(0,255,255,0.3),0_0_40px_rgba(0,255,255,0.15)]
                       transition-all duration-300 active:scale-95"
          >
            {t.hero.cta2}
          </button>
        </div>

        {/* Security badge */}
        <div className="text-center space-y-1">
          <span className="font-mono text-xs text-cyan opacity-70 tracking-wider">
            [ CYBERSECURITY SPECIALIST ]
          </span>
          <span className="block font-mono text-[11px] text-red opacity-60 tracking-wider">
            &#x226B; Pentesting &bull; Networking &bull; Offensive Security &#x226A;
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 text-red bounce-y z-20">
        <span className="font-mono text-[11px] tracking-widest opacity-70">
          {t.hero.scroll}
        </span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  )
}
