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

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  icon: LucideIcon
  category: 'education' | 'certification' | 'ctf' | 'milestone'
  link?: string
}

const events: TimelineEvent[] = [
  {
    id: '1',
    date: '2026',
    title: 'Started Cybersecurity Degree',
    description: 'Began Tecnicatura en Ciberseguridad at Teclab, Argentina',
    icon: GraduationCap,
    category: 'education',
  },
  {
    id: '2',
    date: '2026',
    title: 'Platzi: Intro to Cybersecurity',
    description: 'Completed introductory cybersecurity course on Platzi',
    icon: BookOpen,
    category: 'certification',
  },
  {
    id: '3',
    date: '2026',
    title: 'Platzi: Networking Course',
    description: 'Completed networking fundamentals course',
    icon: BookOpen,
    category: 'certification',
  },
  {
    id: '4',
    date: '2026',
    title: 'TryHackMe: Pre-Security Path',
    description: 'Completed Pre-Security learning path on TryHackMe',
    icon: Award,
    category: 'certification',
  },
  {
    id: '5',
    date: '2026',
    title: 'First CTF Completed',
    description: 'Successfully rooted first TryHackMe machine (Blue Room)',
    icon: Target,
    category: 'ctf',
  },
  {
    id: '6',
    date: '2026',
    title: 'TryHackMe: Jr Penetration Tester',
    description: 'Currently pursuing Jr Penetration Tester path',
    icon: Terminal,
    category: 'milestone',
  },
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
            Journey
          </h2>
          <p className="text-muted text-center mb-14">My path in cybersecurity</p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-wire" />

            <div className="space-y-8">
              {events.map((event, index) => {
                const Icon = event.icon
                const isLeft = index % 2 === 0

                return (
                  <motion.div
                    key={event.id}
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
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${categoryColors[event.category].split(' ')[0]}/10`}
                          >
                            <Icon className={`w-5 h-5 ${categoryColors[event.category].split(' ')[1]}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-muted font-mono">{event.date}</span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${categoryColors[event.category].split(' ')[0]}/20 ${categoryColors[event.category].split(' ')[1]}`}
                              >
                                {event.category}
                              </span>
                            </div>
                            <h3 className="font-grotesk font-bold text-snow mb-1 group-hover:text-red transition-colors">
                              {event.title}
                            </h3>
                            <p className="text-muted text-sm">{event.description}</p>
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
