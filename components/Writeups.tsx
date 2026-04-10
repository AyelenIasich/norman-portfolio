'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { writeups, type Writeup } from '@/data/writeups'
import {
  ChevronDown,
  ChevronUp,
  Lock,
  ExternalLink,
  Filter,
  Search,
} from 'lucide-react'

const platforms = ['All', 'TryHackMe', 'HackTheBox', 'Personal Lab']
const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert']
const categories = ['All', 'Linux', 'Windows', 'Web', 'Network', 'Misc']

export default function Writeups() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [selectedWriteup, setSelectedWriteup] = useState<Writeup | null>(null)
  const [filters, setFilters] = useState({
    platform: 'All',
    difficulty: 'All',
    category: 'All',
  })
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredWriteups = writeups.filter((w) => {
    if (filters.platform !== 'All' && w.platform !== filters.platform) return false
    if (filters.difficulty !== 'All' && w.difficulty !== filters.difficulty) return false
    if (filters.category !== 'All' && w.category !== filters.category) return false
    if (
      searchQuery &&
      !w.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !w.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
      return false
    return true
  })

  const difficultyColors: Record<Writeup['difficulty'], string> = {
    Easy: 'text-green border-green',
    Medium: 'text-gold border-gold',
    Hard: 'text-red border-red',
    Expert: 'text-purple-500 border-purple-500',
  }

  return (
    <section id="writeups" ref={ref} className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow mb-2">
              CTF Writeups
            </h2>
            <p className="text-muted">Detailed walkthroughs of security challenges</p>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search writeups or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-wire rounded-lg pl-10 pr-4 py-2.5 text-snow text-sm placeholder-muted focus:border-red focus:outline-none transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'platform', options: platforms },
                { key: 'difficulty', options: difficulties },
                { key: 'category', options: categories },
              ].map(({ key, options }) => (
                <div key={key} className="relative">
                  <select
                    value={filters[key as keyof typeof filters]}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="appearance-none bg-surface border border-wire rounded-lg px-3 py-1.5 pr-8 text-sm text-snow focus:border-red focus:outline-none cursor-pointer hover:border-red/50 transition-colors"
                  >
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt === 'All' ? `All ${key}s` : opt}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted pointer-events-none" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Writeups Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredWriteups.map((writeup, index) => (
              <motion.article
                key={writeup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedWriteup(writeup)}
                className="bg-surface border border-wire rounded-xl p-5 cursor-pointer hover:border-red/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded border ${difficultyColors[writeup.difficulty]}`}
                    >
                      {writeup.difficulty}
                    </span>
                    <span className="text-xs text-muted">{writeup.platform}</span>
                  </div>
                  {writeup.isLocked && (
                    <Lock className="w-4 h-4 text-muted" />
                  )}
                </div>

                <h3 className="font-grotesk font-bold text-snow mb-2 group-hover:text-red transition-colors">
                  {writeup.title}
                </h3>

                <p className="text-muted text-sm mb-3 line-clamp-2">{writeup.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {writeup.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-wire text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {filteredWriteups.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted">No writeups found matching your filters.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedWriteup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm"
            onClick={() => setSelectedWriteup(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-wire rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-wire">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded border ${difficultyColors[selectedWriteup.difficulty]}`}
                  >
                    {selectedWriteup.difficulty}
                  </span>
                  <span className="text-sm text-snow font-grotesk">{selectedWriteup.title}</span>
                </div>
                <button
                  onClick={() => setSelectedWriteup(null)}
                  className="p-1 text-muted hover:text-snow transition-colors"
                >
                  <ChevronDown className="w-5 h-5 rotate-180" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedWriteup.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-wire text-muted">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-snow font-mono leading-relaxed">
                    {selectedWriteup.content}
                  </pre>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
