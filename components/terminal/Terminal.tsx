'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react'
import { processCommand } from './commands'

interface TerminalProps {
  isOpen: boolean
  onClose: () => void
}

interface TerminalLine {
  id: number
  type: 'input' | 'output' | 'error'
  content: string | string[]
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 0,
      type: 'output',
      content: [
        '╔════════════════════════════════════════╗',
        '║  Welcome to NI-PORTFOLIO Terminal v2.0 ║',
        '║  Type "help" to see available commands ║',
        '╚════════════════════════════════════════╝',
        '',
      ],
    },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isMaximized, setIsMaximized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lineIdRef = useRef(1)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [lines, scrollToBottom])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const executeCommand = (cmdInput: string) => {
    if (!cmdInput.trim()) return

    const trimmedInput = cmdInput.trim()

    // Add to history
    setHistory((prev) => [...prev, trimmedInput])
    setHistoryIndex(-1)

    // Add input line
    const newLines: TerminalLine[] = [
      {
        id: lineIdRef.current++,
        type: 'input',
        content: `norman@portfolio:~$ ${trimmedInput}`,
      },
    ]

    // Process command
    const { output } = processCommand(trimmedInput)

    if (output === 'CLEAR') {
      setLines([])
      return
    }

    // Add output line
    newLines.push({
      id: lineIdRef.current++,
      type: typeof output === 'string' && output.includes('not found') ? 'error' : 'output',
      content: output,
    })

    setLines((prev) => [...prev, ...newLines])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className={`fixed z-[100] ${
          isMaximized
            ? 'inset-4 md:inset-8'
            : 'bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[600px] md:h-[400px]'
        }`}
      >
        <div className="w-full h-full bg-dark/95 backdrop-blur-xl border border-wire rounded-lg overflow-hidden shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-wire bg-surface/50">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-red" />
              <span className="text-xs text-snow font-mono">Terminal</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 text-muted hover:text-snow transition-colors"
                title={isMaximized ? 'Minimize' : 'Maximize'}
              >
                {isMaximized ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-muted hover:text-red transition-colors"
                title="Close (Ctrl+`)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal content */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-auto p-4 font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line) => (
              <div key={line.id} className="mb-1">
                {line.type === 'input' ? (
                  <span className="text-green">{line.content}</span>
                ) : line.type === 'error' ? (
                  <span className="text-red">{line.content}</span>
                ) : Array.isArray(line.content) ? (
                  line.content.map((text, i) => (
                    <div key={i} className="text-snow whitespace-pre">
                      {text || ' '}
                    </div>
                  ))
                ) : (
                  <span className="text-snow">{line.content}</span>
                )}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center">
              <span className="text-green mr-2">norman@portfolio:~${' '}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-snow outline-none font-mono"
                placeholder="Type 'help' for commands..."
                spellCheck={false}
                autoComplete="off"
              />
              <span className="w-2 h-4 bg-red animate-pulse" />
            </div>
          </div>

          {/* Status bar */}
          <div className="px-4 py-1.5 border-t border-wire bg-surface/50 text-xs text-muted flex justify-between">
            <span>Bash</span>
            <span>UTF-8</span>
            <span>{history.length} commands</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
