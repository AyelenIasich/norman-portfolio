'use client'

import { useState, useEffect, useRef } from 'react'
import { GraduationCap, Award } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const INST_EMOJI: Record<string, string> = {
  Teclab:    '🎓',
  TryHackMe: '🔴',
  Platzi:    '🟢',
}

export default function Certifications() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="certifications" ref={ref} className="py-24 px-4 bg-surface">
      <div className="max-w-3xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow text-center mb-1">
            {t.certifications.title}
          </h2>
          <p className="text-muted text-center mb-14">{t.certifications.subtitle}</p>

          <div className="flex flex-col gap-4">
            {t.certifications.items.map((item, i) => {
              const inProgress = item.status === 'inProgress'
              return (
                <div
                  key={i}
                  className="bg-dark border border-wire rounded-xl px-5 py-4
                             flex items-center gap-4
                             hover:border-blue/50 transition-all duration-300"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-28px)',
                    transition: `opacity 0.55s ease ${i * 90}ms, transform 0.55s ease ${i * 90}ms`,
                  }}
                >
                  {/* Institution emoji */}
                  <span className="text-2xl w-10 text-center flex-shrink-0" aria-hidden>
                    {INST_EMOJI[item.institution] ?? '📋'}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="font-grotesk font-bold text-blue text-sm">
                        {item.institution}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          inProgress
                            ? 'bg-gold/10 text-gold border border-gold/25'
                            : 'bg-green/10 text-green border border-green/25'
                        }`}
                      >
                        {inProgress ? t.certifications.inProgress : t.certifications.completed}
                      </span>
                    </div>
                    <p className="text-snow text-sm font-medium leading-snug">{item.title}</p>
                    <p className="text-muted text-xs mt-0.5">{item.period}</p>
                  </div>

                  {/* Status icon */}
                  {inProgress ? (
                    <GraduationCap className="w-5 h-5 text-gold flex-shrink-0" />
                  ) : (
                    <Award className="w-5 h-5 text-green flex-shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
