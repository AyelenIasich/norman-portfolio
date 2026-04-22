import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getCyberlabItemBySlug, getAllCyberlabSlugs } from '@/lib/getCyberlabItems'

export async function generateStaticParams() {
  return getAllCyberlabSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getCyberlabItemBySlug(slug)
  if (!item) return {}
  return { title: `${item.title} | Norman Iasich` }
}

const accentColors = {
  blue: { badge: 'bg-cyan/10 text-cyan border border-cyan/25', text: 'text-cyan' },
  gold: { badge: 'bg-gold/10 text-gold border border-gold/25', text: 'text-gold' },
  green: { badge: 'bg-green/10 text-green border border-green/25', text: 'text-green' },
  red: { badge: 'bg-red/10 text-red border border-red/25', text: 'text-red' },
}

const difficultyColors = {
  Easy: 'text-green',
  Medium: 'text-gold',
  Hard: 'text-red',
}

export default async function CyberlabItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getCyberlabItemBySlug(slug)

  if (!item) notFound()

  const colors = accentColors[item.accent]

  return (
    <div className="min-h-screen" style={{ background: 'var(--c-dark)', fontFamily: 'var(--font-jetbrains-mono), monospace' }}>

      {/* Background grid */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--c-wire) 1px, transparent 1px), linear-gradient(90deg, var(--c-wire) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          opacity: 0.25,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">

        {/* Back */}
        <Link
          href="/#cyberlab"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-snow transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to CyberLab
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded mb-4 ${colors.badge}`}>
            {item.badge}
          </span>

          <h1 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow mb-4 leading-tight">
            {item.title}
          </h1>

          {item.difficulty && (
            <p className="text-sm font-semibold mb-4">
              <span className="text-muted">Difficulty: </span>
              <span className={difficultyColors[item.difficulty]}>{item.difficulty}</span>
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-wire text-muted">
                {tag}
              </span>
            ))}
          </div>

          {/* Full report link */}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded border transition-colors ${colors.badge} hover:opacity-80`}
            >
              <FileText className="w-4 h-4" />
              Ver informe completo (PDF)
            </a>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-wire mb-10" />

        {/* Markdown content */}
        <div className="prose-cyberlab">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {item.content}
          </ReactMarkdown>
        </div>

      </div>
    </div>
  )
}
