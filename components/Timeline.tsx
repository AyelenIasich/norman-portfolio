'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  GraduationCap,
  Award,
  Terminal,
  Target,
  BookOpen,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type EventCategory = 'education' | 'certification' | 'ctf' | 'milestone'

const EVENT_META: { icon: LucideIcon; category: EventCategory; date: string }[] = [
  { icon: GraduationCap, category: 'education',     date: '2026' },
  { icon: BookOpen,      category: 'certification', date: '2026' },
  { icon: BookOpen,      category: 'certification', date: '2026' },
  { icon: Award,         category: 'certification', date: '2026' },
  { icon: Target,        category: 'ctf',           date: '2026' },
  { icon: Terminal,      category: 'milestone',     date: '2026' },
]

const categoryColors: Record<TimelineEvent['category'], string> = {
  education: 'bg-red text-red',
  certification: 'bg-gold text-gold',
  ctf: 'bg-green text-green',
  milestone: 'bg-cyan text-cyan',
}

export default function Timeline() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="timeline" ref={ref} className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow text-center mb-1">
            {t.timeline.title}
          </h2>
          <p className="text-muted text-center mb-14">{t.timeline.subtitle}</p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-wire" />

            <div className="space-y-8">
              {EVENT_META.map((meta, index) => {
                const Icon = meta.icon
                const isLeft = index % 2 === 0
                const ev = t.timeline.events[index]
                const [bgCls, textCls] = categoryColors[meta.category].split(' ')

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`relative flex items-center ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${isLeft ? 'md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-surface border border-wire rounded-xl p-5 hover:border-red/50 transition-colors duration-300 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bgCls}/10`}>
                            <Icon className={`w-5 h-5 ${textCls}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-muted font-mono">{meta.date}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${bgCls}/20 ${textCls}`}>
                                {t.timeline.categories[meta.category]}
                              </span>
                            </div>
                            <h3 className="font-grotesk font-bold text-snow mb-1 group-hover:text-red transition-colors">
                              {ev.title}
                            </h3>
                            <p className="text-muted text-sm">{ev.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-dark border-2 border-red group-hover:bg-red transition-colors z-10" />

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
