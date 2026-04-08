'use client'

import { useState, useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

type Filter = 'all' | 'project' | 'lab' | 'ctf'

const accentClasses = {
  blue: {
    badge: 'bg-blue/10 text-blue border border-blue/25',
    border: 'border-wire hover:border-blue hover:shadow-[0_0_24px_rgba(0,180,255,0.14)]',
    btn: 'text-blue hover:text-blue/70',
  },
  gold: {
    badge: 'bg-gold/10 text-gold border border-gold/25',
    border: 'border-wire hover:border-gold hover:shadow-[0_0_24px_rgba(251,191,36,0.14)]',
    btn: 'text-gold hover:text-gold/70',
  },
  green: {
    badge: 'bg-green/10 text-green border border-green/25',
    border: 'border-wire hover:border-green hover:shadow-[0_0_24px_rgba(34,197,94,0.14)]',
    btn: 'text-green hover:text-green/70',
  },
}

const difficultyColors = {
  Easy: 'text-green',
  Medium: 'text-gold',
  Hard: 'text-red-500',
}

export default function CyberLab() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [filter, setFilter] = useState<Filter>('all')

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

  const filters: { label: string; value: Filter }[] = [
    { label: t.cyberlab.filters.all, value: 'all' },
    { label: t.cyberlab.filters.projects, value: 'project' },
    { label: t.cyberlab.filters.labs, value: 'lab' },
    { label: t.cyberlab.filters.ctfs, value: 'ctf' },
  ]

  const filtered = t.cyberlab.items.filter(
    (item) => filter === 'all' || item.category === filter
  ) as Array<{
    title: string
    short: string
    tags: string[]
    badge: string
    accent: 'blue' | 'gold' | 'green'
    category: 'project' | 'lab' | 'ctf'
    difficulty?: 'Easy' | 'Medium' | 'Hard'
    link?: string
  }>

  const getButtonLabel = (category: string) => {
    switch (category) {
      case 'ctf': return t.cyberlab.viewWriteup
      case 'lab': return t.cyberlab.viewMethodology
      default: return t.cyberlab.viewDocs
    }
  }

  return (
    <section id="cyberlab" ref={ref} className="py-24 px-4 bg-dark">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow text-center mb-1">
            {t.cyberlab.title}
          </h2>
          <p className="text-muted text-center mb-10">{t.cyberlab.subtitle}</p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  filter === f.value
                    ? 'bg-blue text-dark border-blue'
                    : 'bg-transparent text-muted border-wire hover:border-blue hover:text-blue'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => {
              const styles = accentClasses[item.accent]

              return (
                <article
                  key={item.title}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.65s ease ${i * 130}ms, transform 0.65s ease ${i * 130}ms`,
                  }}
                  className={`bg-surface rounded-xl border transition-colors duration-300 p-6 flex flex-col ${styles.border}`}
                >
                  {/* Badge */}
                  <span className={`self-start text-xs font-bold px-2.5 py-1 rounded mb-3 ${styles.badge}`}>
                    {item.badge}
                  </span>

                  <h3 className="font-grotesk font-bold text-snow text-lg mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {item.short}
                  </p>

                  {/* Difficulty for CTFs */}
                  {item.difficulty && (
                    <p className="text-xs font-semibold mb-3">
                      <span className="text-muted">Difficulty: </span>
                      <span className={difficultyColors[item.difficulty]}>{item.difficulty}</span>
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {item.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="text-xs px-2 py-0.5 rounded bg-wire text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action button */}
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 text-sm font-semibold self-start transition-colors ${styles.btn}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {getButtonLabel(item.category)}
                    </a>
                  ) : (
                    <span className={`flex items-center gap-1 text-sm font-semibold self-start opacity-50 ${styles.btn}`}>
                      <ExternalLink className="w-4 h-4" />
                      {getButtonLabel(item.category)}
                    </span>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
