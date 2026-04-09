'use client'

import { Shield } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const quickLinks = [
    { label: t.nav.about,          id: 'about' },
    { label: t.nav.skills,         id: 'skills' },
    { label: t.nav.cyberlab,       id: 'cyberlab' },
    { label: t.nav.certifications, id: 'certifications' },
    { label: t.nav.contact,        id: 'contact' },
  ]

  const externals = [
    { label: 'LinkedIn',   href: 'https://www.linkedin.com/in/norman-iasich-5a013a3b4/' },
    { label: 'GitHub',     href: 'https://github.com/normania' },
    { label: 'TryHackMe',  href: 'https://tryhackme.com/p/normania' },
  ]

  return (
    <footer className="border-t border-wire py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-grotesk font-bold text-snow mb-3">
              <Shield className="w-5 h-5 text-red" />
              Norman Iasich
            </div>
            <p className="text-muted text-sm italic leading-relaxed">
              &ldquo;From curiosity to cybersecurity&rdquo;
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-grotesk font-semibold text-snow text-sm mb-4 uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scroll(l.id)}
                    className="text-muted hover:text-red transition-colors text-sm"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* External links */}
          <div>
            <h4 className="font-grotesk font-semibold text-snow text-sm mb-4 uppercase tracking-wider">
              {t.footer.connect}
            </h4>
            <ul className="flex flex-col gap-2">
              {externals.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-red transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-wire pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-sm">
            &copy; {year} Norman Iasich
          </p>
          <p className="font-mono text-xs text-red/50 tracking-wider">
            &#x226B; SECURE BY DESIGN &#x226A;
          </p>
        </div>
      </div>
    </footer>
  )
}
