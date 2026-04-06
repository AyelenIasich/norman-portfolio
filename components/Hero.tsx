'use client'

import { useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import ParticlesBackground from './ParticlesBackground'

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark"
    >
      {/* Animated particles canvas */}
      <ParticlesBackground />

      {/* Subtle radial glow behind the text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(20,184,166,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Gradient fade to dark at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
        {/* Terminal prefix */}
        <p className="font-mono text-teal text-sm mb-5 opacity-70 tracking-widest">
          root@kali:~# whoami
        </p>

        {/* Glitch name */}
        <h1 className="glitch font-grotesk font-bold text-snow leading-none mb-4
                        text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          Norman Iasich
        </h1>

        {/* Typing effect */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-5">
          <span className="font-grotesk font-semibold text-teal
                           text-xl sm:text-2xl md:text-3xl">
            {displayText}
            <span className="cursor text-gold ml-0.5">|</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="font-inter text-muted text-base sm:text-lg md:text-xl italic mb-10">
          &ldquo;{t.hero.tagline}&rdquo;
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo('projects')}
            className="px-8 py-3 bg-teal text-dark font-grotesk font-bold rounded-lg
                       hover:bg-teal/90 transition-all active:scale-95
                       shadow-[0_0_0_rgba(20,184,166,0)] hover:shadow-[0_0_24px_rgba(20,184,166,0.45)]"
          >
            {t.hero.cta1}
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-3 border border-teal text-teal font-grotesk font-bold rounded-lg
                       hover:bg-teal/10 transition-all active:scale-95
                       hover:shadow-[0_0_24px_rgba(20,184,166,0.2)]"
          >
            {t.hero.cta2}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted bounce-y">
        <span className="font-mono text-xs tracking-widest opacity-60">{t.hero.scroll}</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  )
}
