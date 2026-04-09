'use client'

import { useState, useEffect, useRef } from 'react'
import { Shield, Terminal, BookOpen } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const STAT_ICONS = [Shield, Terminal, BookOpen]

/* Hacker-aesthetic SVG avatar — red/cyan theme */
function HackerAvatar() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Norman Iasich avatar"
    >
      <rect width="200" height="200" fill="#141414" />

      {/* Outer hex ring decorations */}
      <circle cx="100" cy="100" r="88" fill="none" stroke="#2a2a2a" strokeWidth="1" strokeDasharray="4 6" />

      {/* Monitor body */}
      <rect x="38" y="68" width="124" height="84" rx="6" fill="#2a2a2a" stroke="#FF1744" strokeWidth="1.5" />
      {/* Screen */}
      <rect x="46" y="76" width="108" height="64" rx="3" fill="#0a0a0a" />

      {/* Terminal text lines */}
      <text x="54" y="94"  fontFamily="monospace" fontSize="9" fill="#FF1744">$ nmap -sV target</text>
      <text x="54" y="107" fontFamily="monospace" fontSize="9" fill="#00FF41">Host: up (0.021s)</text>
      <text x="54" y="120" fontFamily="monospace" fontSize="9" fill="#808080">22/tcp  open  ssh</text>
      <text x="54" y="133" fontFamily="monospace" fontSize="9" fill="#808080">80/tcp  open  http</text>
      {/* Cursor blink block */}
      <rect x="54" y="135" width="6" height="9" fill="#FF1744" opacity="0.9" />

      {/* Monitor stand */}
      <rect x="88"  y="152" width="24" height="10" fill="#2a2a2a" />
      <rect x="72"  y="162" width="56" height="5" rx="2.5" fill="#2a2a2a" stroke="#2a2a2a" />

      {/* Person silhouette above monitor */}
      <circle cx="100" cy="48" r="18" fill="#2a2a2a" stroke="#FF1744" strokeWidth="1.5" />
      <text x="100" y="48" fontFamily="monospace" fontSize="16" fontWeight="bold" fill="#FF1744" textAnchor="middle" dominantBaseline="central">N</text>
    </svg>
  )
}

export default function About() {
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
      id="about"
      ref={ref}
      className="py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Heading */}
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow text-center mb-1">
            {t.about.title}
          </h2>
          <p className="text-muted text-center mb-14">{t.about.subtitle}</p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Avatar */}
            <div className="flex justify-center">
              <div
                className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full
                           border-2 border-red ring-pulse p-1
                           shadow-[0_0_40px_rgba(255,23,68,0.25)]"
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <HackerAvatar />
                </div>
              </div>
            </div>

            {/* Text & stats */}
            <div>
              <p className="text-muted leading-relaxed mb-4 text-sm sm:text-base">
                {t.about.p1}
              </p>
              <p className="text-muted leading-relaxed mb-8 text-sm sm:text-base">
                {t.about.p2}
              </p>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-3">
                {t.about.stats.map((stat, i) => {
                  const Icon = STAT_ICONS[i]
                  return (
                    <div
                      key={i}
                      className="bg-surface border border-wire rounded-xl p-4 text-center
                                 hover:border-red transition-colors duration-300 group"
                    >
                      <Icon className="w-5 h-5 text-red mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-grotesk text-xl sm:text-2xl font-bold text-red">
                        {stat.value}
                      </div>
                      <div className="text-muted text-xs mt-1 leading-snug">{stat.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
