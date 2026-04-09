'use client'

import { useEffect, useRef } from 'react'

const HEX_CHARS = '0123456789ABCDEF'
const COLORS = ['#FF1744', '#D32F2F', '#00FF41', '#FF5252']

export default function FallingCodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const fontSize = 18
    let columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100)

    let raf: number

    const draw = () => {
      // Recalculate columns on resize
      const newCols = Math.floor(canvas.width / fontSize)
      if (newCols !== columns) {
        columns = newCols
        drops.length = columns
        for (let i = drops.length; i < columns; i++) {
          drops[i] = Math.random() * -50
        }
      }

      // Semi-transparent overlay for trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px "Courier New", monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]

        ctx.fillStyle = color
        ctx.globalAlpha = Math.random() * 0.25 + 0.03
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        ctx.globalAlpha = 1

        drops[i]++

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -20
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-50"
      aria-hidden="true"
    />
  )
}
