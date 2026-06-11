'use client'

import { useEffect, useRef, useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Education() {
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
    <section id="education" ref={ref} className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow text-center mb-1">
            {t.education.title}
          </h2>
          <p className="text-muted text-center mb-14">{t.education.subtitle}</p>

          <div className="flex flex-col gap-6">
            {t.education.items.map((item, i) => {
              const inProgress = item.status === 'inProgress'
              return (
                <div
                  key={i}
                  className="bg-surface border border-wire rounded-xl p-6
                             hover:border-red/50 transition-all duration-300"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.65s ease ${i * 120}ms, transform 0.65s ease ${i * 120}ms`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-red/10 border border-red/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-red" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="font-grotesk font-bold text-red text-sm tracking-wide">
                          {item.institution}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                            inProgress
                              ? 'bg-gold/10 text-gold border border-gold/25'
                              : 'bg-green/10 text-green border border-green/25'
                          }`}
                        >
                          {inProgress ? t.education.inProgress : t.education.completed}
                        </span>
                      </div>
                      <p className="text-snow font-semibold text-base leading-snug mb-1">
                        {item.degree}
                      </p>
                      <p className="text-muted text-xs">{item.period}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
