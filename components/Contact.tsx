'use client'

import { useEffect, useRef, useState } from 'react'
import { Linkedin, Github, Mail, Crosshair, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface SocialCard {
  icon: LucideIcon
  label: string
  href: string
  desc: string
}

function ContactCard({ icon: Icon, label, href, desc }: SocialCard) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="bg-surface border border-wire rounded-xl p-5 flex flex-col items-center gap-3
                 hover:border-red hover:shadow-[0_0_24px_rgba(255,23,68,0.18)]
                 transition-all duration-300 group"
    >
      <Icon
        className="w-7 h-7 text-muted group-hover:text-red transition-colors"
        strokeWidth={1.5}
      />
      <div className="text-center">
        <p className="font-grotesk font-semibold text-snow text-sm group-hover:text-red transition-colors">
          {label}
        </p>
        <p className="text-muted text-xs mt-0.5 break-words leading-relaxed">{desc}</p>
      </div>
    </a>
  )
}

export default function Contact() {
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

  const socials: SocialCard[] = [
    {
      icon: Linkedin,
      label: t.contact.social.linkedin,
      href: 'https://www.linkedin.com/in/norman-iasich-5a013a3b4/',
      desc: '/in/norman-iasich',
    },
    {
      icon: Github,
      label: t.contact.social.github,
      href: 'https://github.com/normaniasich',
      desc: 'normaniasich',
    },
    {
      icon: Crosshair,
      label: t.contact.social.tryhackme,
      href: 'https://tryhackme.com/p/baton.',
      desc: 'p/baton.',
    },
    {
      icon: Mail,
      label: t.contact.social.email,
      href: 'mailto:normaniasich@gmail.com',
      desc: 'normaniasich@gmail.com',
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow text-center mb-1">
            {t.contact.title}
          </h2>
          <p className="text-muted text-center mb-14">{t.contact.subtitle}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {socials.map((s) => (
              <ContactCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
