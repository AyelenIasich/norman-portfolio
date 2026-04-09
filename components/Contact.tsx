'use client'

import { useState, useEffect, useRef } from 'react'
import { Linkedin, Github, Mail, Crosshair, CheckCircle, type LucideIcon } from 'lucide-react'
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
        <p className="text-muted text-xs mt-0.5">{desc}</p>
      </div>
    </a>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

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

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())   e.name    = t.contact.errors.nameRequired
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = t.contact.errors.emailInvalid
    if (!form.message.trim()) e.message = t.contact.errors.messageRequired
    return e
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

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
      href: 'https://github.com/normania',
      desc: 'normania',
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
    <section id="contact" ref={ref} className="py-24 px-4 bg-dark">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow text-center mb-1">
            {t.contact.title}
          </h2>
          <p className="text-muted text-center mb-3">{t.contact.subtitle}</p>
          <p className="text-muted text-center text-sm mb-14 max-w-md mx-auto">
            {t.contact.description}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Social grid */}
            <div className="grid grid-cols-2 gap-4 content-start">
              {socials.map((s) => (
                <ContactCard key={s.href} {...s} />
              ))}
            </div>

            {/* Form */}
            <div>
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <CheckCircle className="w-14 h-14 text-red" strokeWidth={1.5} />
                  <p className="text-snow font-medium">{t.contact.form.success}</p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-red text-sm hover:underline"
                  >
                    {t.contact.form.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-muted text-sm mb-1.5">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.contact.form.namePlaceholder}
                      className={`w-full bg-surface border rounded-lg px-4 py-3 text-snow text-sm
                                  placeholder-muted/40 focus:outline-none focus:border-red transition-colors ${
                        errors.name ? 'border-red-500' : 'border-wire'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-muted text-sm mb-1.5">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t.contact.form.emailPlaceholder}
                      className={`w-full bg-surface border rounded-lg px-4 py-3 text-snow text-sm
                                  placeholder-muted/40 focus:outline-none focus:border-red transition-colors ${
                        errors.email ? 'border-red-500' : 'border-wire'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-muted text-sm mb-1.5">
                      {t.contact.form.message}
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t.contact.form.messagePlaceholder}
                      className={`w-full bg-surface border rounded-lg px-4 py-3 text-snow text-sm
                                  placeholder-muted/40 focus:outline-none focus:border-red transition-colors
                                  resize-none ${errors.message ? 'border-red-500' : 'border-wire'}`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red text-white font-grotesk font-bold rounded-lg
                               hover:bg-red-bright transition-all active:scale-95
                               hover:shadow-[0_0_24px_rgba(255,23,68,0.4)]"
                  >
                    {t.contact.form.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
