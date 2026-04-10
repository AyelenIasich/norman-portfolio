'use client'

import { useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  trigger?: 'hover' | 'always'
}

export default function GlitchText({ text, className = '', trigger = 'hover' }: GlitchTextProps) {
  const [isActive, setIsActive] = useState(trigger === 'always')

  return (
    <span
      className={`glitch-text ${isActive ? 'active' : ''} ${className}`}
      data-text={text}
      onMouseEnter={trigger === 'hover' ? () => setIsActive(true) : undefined}
      onMouseLeave={trigger === 'hover' ? () => setIsActive(false) : undefined}
    >
      {text}
    </span>
  )
}
