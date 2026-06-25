'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  BookOpen, Terminal, Code2, FileText,
  Eye, ExternalLink, Download, Clock, X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { certifications, type CertDocument } from '@/data/certifications'

const INST_ICON: Record<string, { Icon: LucideIcon; cls: string }> = {
  Teclab:    { Icon: BookOpen,  cls: 'text-red' },
  TryHackMe: { Icon: Terminal,  cls: 'text-gold' },
  Platzi:    { Icon: Code2,     cls: 'text-cyan' },
}
const DEFAULT_INST = { Icon: FileText, cls: 'text-muted' }

const certById = Object.fromEntries(certifications.map((c) => [c.id, c]))

interface Viewing {
  title: string
  document: Extract<CertDocument, { type: 'image' | 'pdf' }>
}

export default function Certifications() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [viewing, setViewing] = useState<Viewing | null>(null)

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

  const close = useCallback(() => setViewing(null), [])

  // Lock scroll + close on Escape while the modal is open
  useEffect(() => {
    if (!viewing) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [viewing, close])

  return (
    <section id="certifications" ref={ref} className="py-24 px-4">
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
              const cert = certById[item.id]
              const institution = cert?.institution ?? ''
              const inProgress = cert?.status === 'inProgress'
              const doc = cert?.document ?? null
              const { Icon, cls } = INST_ICON[institution] ?? DEFAULT_INST

              return (
                <div
                  key={item.id}
                  className="group bg-dark border border-wire rounded-xl px-5 py-4
                             flex items-center gap-4
                             hover:border-red/50 transition-all duration-300"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-28px)',
                    transition: `opacity 0.65s ease ${i * 120}ms, transform 0.65s ease ${i * 120}ms`,
                  }}
                >
                  {/* Institution icon */}
                  <div className="w-9 h-9 rounded-lg bg-wire/30 flex items-center justify-center flex-shrink-0" aria-hidden>
                    <Icon className={`w-5 h-5 ${cls}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-grotesk font-bold text-red text-sm">
                        {institution}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${
                          inProgress
                            ? 'bg-gold/10 text-gold border border-gold/25'
                            : 'bg-green/10 text-green border border-green/25'
                        }`}
                      >
                        {inProgress ? t.certifications.inProgress : t.certifications.completed}
                      </span>
                    </div>
                    <p className="text-snow text-sm font-medium leading-snug pt-2">{item.title}</p>
                    <p className="text-muted text-xs mt-1">{item.period}</p>
                  </div>

                  {/* Document action */}
                  <div className="flex-shrink-0">
                    {doc === null ? (
                      <span
                        className="inline-flex items-center gap-1.5 text-xs text-muted/70
                                   px-3 py-1.5 rounded-lg border border-wire/60 cursor-default select-none"
                        title={t.certifications.comingSoon}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t.certifications.comingSoon}</span>
                      </span>
                    ) : doc.type === 'link' ? (
                      <a
                        href={doc.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan
                                   px-3 py-1.5 rounded-lg border border-cyan/30
                                   hover:bg-cyan/10 hover:border-cyan/60 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t.certifications.verify}</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setViewing({ title: item.title, document: doc })}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-red
                                   px-3 py-1.5 rounded-lg border border-red/30
                                   hover:bg-red/10 hover:border-red/60 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t.certifications.view}</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Lightbox modal for image / pdf documents */}
      {viewing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8
                     bg-dark/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
          role="dialog"
          aria-modal="true"
          aria-label={viewing.title}
          onClick={close}
        >
          <div
            className="relative w-full max-w-4xl max-h-[88vh] flex flex-col
                       bg-surface border border-red/40 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-wire">
              <p className="font-grotesk font-bold text-snow text-sm truncate">{viewing.title}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={viewing.document.src}
                  download
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted
                             px-2.5 py-1.5 rounded-lg border border-wire
                             hover:text-snow hover:border-red/50 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.certifications.download}</span>
                </a>
                <button
                  type="button"
                  onClick={close}
                  aria-label={t.certifications.close}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg
                             border border-wire text-muted
                             hover:text-snow hover:border-red/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0 overflow-auto bg-dark/60 flex items-center justify-center">
              {viewing.document.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={viewing.document.src}
                  alt={viewing.title}
                  className="max-w-full max-h-[78vh] object-contain"
                />
              ) : (
                <iframe
                  src={viewing.document.src}
                  title={viewing.title}
                  className="w-full h-[78vh]"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
