'use client'

import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import { useMemo } from 'react'

export default function Hero() {
  const { t, lang } = useLanguage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const roles = useMemo(() => t.hero.roles, [lang])
  const displayText = useTypingEffect(roles)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
    >
      {/* ── TOPBAR ── */}
      <header
        className="relative z-10 flex justify-between items-center px-6 md:px-10 py-5"
        style={{ borderBottom: '1px solid var(--c-wire)' }}
      >
        <span style={{ fontSize: 11, color: 'var(--c-muted)', letterSpacing: '0.12em' }}>
          SYS/<span style={{ color: 'var(--c-red)' }}>NI-PORTFOLIO</span> · v1.0
        </span>
        <div className="flex items-center gap-5">
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'var(--c-muted)', letterSpacing: '0.1em' }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: 'var(--c-green)',
              display: 'inline-block',
              animation: 'blink 2.4s ease-in-out infinite'
            }} />
            ONLINE
          </span>
          <span style={{ fontSize: 10, color: 'var(--c-muted)', letterSpacing: '0.1em' }}>AR · UTC-3</span>
        </div>
      </header>

      {/* ── MAIN GRID ── */}
      <main className="relative z-10 flex-1 grid md:grid-cols-[1fr_320px] max-w-6xl w-full mx-auto px-6 md:px-10">

        {/* LEFT */}
        <div
          className="flex flex-col justify-center py-16 pr-0 md:pr-14"
          style={{ borderRight: '1px solid var(--c-wire)' }}
        >
          {/* Section label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 10, color: 'var(--c-muted)', letterSpacing: '0.18em',
            textTransform: 'uppercase', marginBottom: 36
          }}>
            <span style={{ display: 'block', width: 24, height: 1, background: 'var(--c-red)' }} />
            Perfil de seguridad
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: 'var(--c-snow)',
              marginBottom: 28,
            }}
          >
            NORMAN<br />
            <span style={{ color: 'var(--c-red)' }}>IASICH</span>
          </h1>

          {/* Typing */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>role::</span>
            <span style={{ fontSize: 13, color: 'var(--c-snow)' }}>
              {displayText}
              <span className="cursor" style={{ color: 'var(--c-red)', marginLeft: 2 }}>▌</span>
            </span>
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.8,
            maxWidth: 440, marginBottom: 48, fontWeight: 300
          }}>
            {t.hero.tagline}.<br />
            Pentesting · Networking · Sistemas Linux.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => scrollTo('cyberlab')}
              style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', padding: '13px 28px',
                background: 'var(--c-red)', border: '1px solid var(--c-red)',
                color: 'var(--c-snow)', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.target as HTMLButtonElement).style.background = 'var(--c-red-bright)'
                ;(e.target as HTMLButtonElement).style.borderColor = 'var(--c-red-bright)'
              }}
              onMouseLeave={e => {
                (e.target as HTMLButtonElement).style.background = 'var(--c-red)'
                ;(e.target as HTMLButtonElement).style.borderColor = 'var(--c-red)'
              }}
            >
              {t.hero.cta1}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', padding: '13px 28px',
                background: 'transparent', border: '1px solid var(--c-wire)',
                color: 'var(--c-muted)', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.target as HTMLButtonElement).style.borderColor = 'var(--c-red)'
                ;(e.target as HTMLButtonElement).style.color = 'var(--c-red)'
              }}
              onMouseLeave={e => {
                (e.target as HTMLButtonElement).style.borderColor = 'var(--c-wire)'
                ;(e.target as HTMLButtonElement).style.color = 'var(--c-muted)'
              }}
            >
              {t.hero.cta2}
            </button>
          </div>
        </div>

        {/* RIGHT — audit panel */}
        <div className="hidden md:flex flex-col justify-center pl-10 py-10 gap-0">

          {/* Block: Especialización */}
          <div style={{ borderTop: '1px solid var(--c-wire)', borderBottom: '1px solid var(--c-wire)', padding: '18px 0' }}>
            <p style={{ fontSize: 9, color: 'var(--c-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
              Especialización
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Pentesting', 'Red Team', 'Networking', 'Kali Linux', 'CTF'].map(tag => (
                <span
                  key={tag}
                  style={{
                    background: 'rgba(255,23,68,0.06)',
                    border: '1px solid rgba(255,23,68,0.18)',
                    color: 'var(--c-red)',
                    fontSize: 10, padding: '3px 8px',
                    letterSpacing: '0.08em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Block: Stack */}
          <div style={{ borderBottom: '1px solid var(--c-wire)', padding: '18px 0' }}>
            <p style={{ fontSize: 9, color: 'var(--c-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
              Stack activo
            </p>
            {[
              { name: 'Linux', pct: 88 },
              { name: 'Networking', pct: 75 },
              { name: 'Pentesting', pct: 62 },
              { name: 'Scripting', pct: 55 },
            ].map(({ name, pct }, i) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: 'var(--c-muted)', width: 80, flexShrink: 0 }}>{name}</span>
                <div style={{ flex: 1, height: 3, background: 'var(--c-wire)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: 'var(--c-red)',
                    transformOrigin: 'left',
                    animation: `barIn 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s both`,
                  }} />
                </div>
                <span style={{ fontSize: 9, color: 'var(--c-wire)', width: 26, textAlign: 'right' }}>{pct}</span>
              </div>
            ))}
          </div>

          {/* Block: Plataformas */}
          <div style={{ borderBottom: '1px solid var(--c-wire)', padding: '18px 0' }}>
            <p style={{ fontSize: 9, color: 'var(--c-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
              Plataformas
            </p>
            <p style={{ fontSize: 11, color: 'var(--c-muted)' }}>
              TryHackMe · Kali NetHunter · HackTheBox
            </p>
          </div>

          {/* Block: Estado */}
          <div style={{ padding: '18px 0' }}>
            <p style={{ fontSize: 9, color: 'var(--c-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
              Estado
            </p>
            <p style={{ fontSize: 11, color: 'var(--c-green)' }}>
              Disponible para oportunidades
            </p>
          </div>

        </div>
      </main>

      {/* ── BOTTOMBAR ── */}
      <footer
        className="relative z-10 flex justify-between items-center px-6 md:px-10 py-4"
        style={{ borderTop: '1px solid var(--c-wire)' }}
      >
        <span style={{ fontSize: 10, color: 'var(--c-muted)', letterSpacing: '0.08em' }}>
          © 2025 Norman Iasich
        </span>
        <button
          onClick={() => scrollTo('about')}
          className="bounce-y"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 10, color: 'var(--c-muted)', letterSpacing: '0.1em',
            background: 'none', border: 'none', cursor: 'pointer'
          }}
        >
          {t.hero.scroll.toUpperCase()}
          <ChevronDown size={14} style={{ opacity: 0.6 }} />
        </button>
      </footer>

      <style>{`
        @keyframes barIn {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  )
}
