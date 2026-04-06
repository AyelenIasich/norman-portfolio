'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Projects() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)

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

  const toggle = (i: number) => setExpanded(expanded === i ? null : i)

  return (
    <section id="projects" ref={ref} className="py-24 px-4 bg-dark">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow text-center mb-1">
            {t.projects.title}
          </h2>
          <p className="text-muted text-center mb-14">{t.projects.subtitle}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {t.projects.items.map((project, i) => {
              const isTeal = project.accent === 'teal'
              const isOpen = expanded === i

              return (
                <article
                  key={i}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.65s ease ${i * 130}ms, transform 0.65s ease ${i * 130}ms`,
                  }}
                  className={`bg-surface rounded-xl border transition-colors duration-300 p-6 flex flex-col ${
                    isTeal
                      ? 'border-wire hover:border-blue hover:shadow-[0_0_24px_rgba(0,180,255,0.14)]'
                      : 'border-wire hover:border-gold hover:shadow-[0_0_24px_rgba(251,191,36,0.14)]'
                  }`}
                >
                  {/* Platform badge */}
                  <span
                    className={`self-start text-xs font-bold px-2.5 py-1 rounded mb-3 ${
                      isTeal
                        ? 'bg-blue/10 text-blue border border-blue/25'
                        : 'bg-gold/10  text-gold  border border-gold/25'
                    }`}
                  >
                    {project.badge}
                  </span>

                  <h3 className="font-grotesk font-bold text-snow text-lg mb-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {project.short}
                  </p>

                  {/* Expandable full description */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      isOpen ? 'max-h-56 mb-4' : 'max-h-0'
                    }`}
                  >
                    <p
                      className={`text-muted text-sm leading-relaxed border-l-2 pl-3 ${
                        isTeal ? 'border-blue' : 'border-gold'
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {project.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="text-xs px-2 py-0.5 rounded bg-wire text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more / less */}
                  <button
                    onClick={() => toggle(i)}
                    className={`flex items-center gap-1 text-sm font-semibold self-start transition-colors ${
                      isTeal
                        ? 'text-blue hover:text-blue/70'
                        : 'text-gold hover:text-gold/70'
                    }`}
                  >
                    {isOpen ? (
                      <><ChevronUp className="w-4 h-4" />{t.projects.readLess}</>
                    ) : (
                      <><ChevronDown className="w-4 h-4" />{t.projects.readMore}</>
                    )}
                  </button>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
