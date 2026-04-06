'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const ICONS: Record<string, string> = {
  'Penetration Testing':       '🎯',
  'Ethical Hacking':           '🔓',
  'Vulnerability Analysis':    '🔍',
  'Análisis de Vulnerabilidades': '🔍',
  'Kali Linux':                '🐉',
  'Nmap':                      '📡',
  'Burp Suite':                '🕷️',
  'Metasploit':                '💣',
  'Wireshark':                 '🦈',
  'Linux':                     '🐧',
  'Networking':                '🌐',
  'Redes':                     '🌐',
  'Web Security':              '🔒',
  'Seguridad Web':             '🔒',
}

function SkillBar({
  name,
  level,
  animate,
  delay,
}: {
  name: string
  level: number
  animate: boolean
  delay: number
}) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!animate) return
    const t = setTimeout(() => setWidth(level), delay)
    return () => clearTimeout(t)
  }, [animate, level, delay])

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-snow text-sm font-medium flex items-center gap-2">
          <span className="text-base leading-none">{ICONS[name] ?? '⚡'}</span>
          {name}
        </span>
        <span className="text-blue text-xs font-bold tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 bg-wire rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue to-blue/60
                     transition-[width] duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
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
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-4 bg-surface"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow text-center mb-1">
            {t.skills.title}
          </h2>
          <p className="text-muted text-center mb-14">{t.skills.subtitle}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.skills.categories.map((cat, catIdx) => (
              <div
                key={catIdx}
                className="bg-dark border border-wire rounded-xl p-6
                           hover:border-blue/50 transition-colors duration-300"
              >
                {/* Category header */}
                <h3 className="font-grotesk font-bold text-blue mb-5 flex items-center gap-2 text-sm uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-blue inline-block" />
                  {cat.name}
                </h3>

                {cat.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skillIdx}
                    name={skill.name}
                    level={skill.level}
                    animate={visible}
                    delay={catIdx * 80 + skillIdx * 120}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
