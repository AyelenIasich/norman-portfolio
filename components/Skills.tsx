'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Target, Unlock, ShieldAlert, Terminal, ScanLine,
  Bug, Zap, Activity, Cpu, Network, Globe, Shield,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const ICONS: Record<string, LucideIcon> = {
  'Penetration Testing':          Target,
  'Ethical Hacking':              Unlock,
  'Vulnerability Analysis':       ShieldAlert,
  'Análisis de Vulnerabilidades': ShieldAlert,
  'Kali Linux':                   Terminal,
  'Nmap':                         ScanLine,
  'Burp Suite':                   Bug,
  'Metasploit':                   Zap,
  'Wireshark':                    Activity,
  'Linux':                        Cpu,
  'Networking':                   Network,
  'Redes':                        Network,
  'Web Security':                 Globe,
  'Seguridad Web':                Globe,
}

function SkillCard({
  name,
  visible,
  delay,
}: {
  name: string
  visible: boolean
  delay: number
}) {
  const Icon = ICONS[name] ?? Shield

  return (
    <div
      className="relative bg-dark border border-wire rounded-2xl p-4
                 flex flex-col items-center gap-3 cursor-default group
                 hover:border-red transition-all duration-300
                 hover:shadow-[0_0_20px_rgba(255,23,68,0.15)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {/* Top-edge glow line on hover */}
      <span
        className="absolute inset-x-6 top-0 h-px rounded-full bg-red
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Icon container */}
      <div
        className="w-10 h-10 rounded-xl bg-wire/60 flex items-center justify-center
                   group-hover:bg-red/10 transition-colors duration-300"
      >
        <Icon
          className="w-5 h-5 text-muted group-hover:text-red transition-colors duration-300"
          strokeWidth={1.5}
        />
      </div>

      {/* Name */}
      <span className="text-muted text-xs font-medium text-center leading-snug
                       group-hover:text-snow transition-colors duration-300">
        {name}
      </span>
    </div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow text-center mb-1">
            {t.skills.title}
          </h2>
          <p className="text-muted text-center mb-14">{t.skills.subtitle}</p>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-12">
          {t.skills.categories.map((cat, catIdx) => (
            <div key={catIdx}>
              {/* Category label with divider */}
              <div
                className="flex items-center gap-3 mb-5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-16px)',
                  transition: `opacity 0.65s ease ${catIdx * 120}ms, transform 0.65s ease ${catIdx * 120}ms`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red flex-shrink-0" />
                <h3 className="font-grotesk font-bold text-red text-xs uppercase tracking-[0.15em] whitespace-nowrap">
                  {cat.name}
                </h3>
                <span className="flex-1 h-px bg-wire" />
              </div>

              {/* Skill cards grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {cat.skills.map((skill, i) => (
                  <SkillCard
                    key={i}
                    name={skill.name}
                    visible={visible}
                    delay={catIdx * 150 + i * 100}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
