'use client'

import { useState, useEffect, useRef } from 'react'

export function useTypingEffect(
  strings: string[],
  typeSpeed = 80,
  deleteSpeed = 45,
  pauseTime = 2400
): string {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  // When the strings array changes (language switch) — reset
  const prevStringsRef = useRef(strings)
  useEffect(() => {
    if (prevStringsRef.current !== strings) {
      prevStringsRef.current = strings
      setText('')
      setIdx(0)
      setDeleting(false)
      setPaused(false)
    }
  }, [strings])

  // Pause effect: after finishing a word, wait then start deleting
  useEffect(() => {
    if (!paused) return
    const t = setTimeout(() => {
      setPaused(false)
      setDeleting(true)
    }, pauseTime)
    return () => clearTimeout(t)
  }, [paused, pauseTime])

  // Typing / deleting effect
  useEffect(() => {
    if (paused || strings.length === 0) return
    const target = strings[idx % strings.length]

    const t = setTimeout(
      () => {
        if (!deleting) {
          const next = target.slice(0, text.length + 1)
          setText(next)
          if (next === target) setPaused(true)
        } else {
          const next = text.slice(0, -1)
          setText(next)
          if (next === '') {
            setDeleting(false)
            setIdx((i) => (i + 1) % strings.length)
          }
        }
      },
      deleting ? deleteSpeed : typeSpeed
    )
    return () => clearTimeout(t)
  }, [text, idx, deleting, paused, strings, typeSpeed, deleteSpeed])

  return text
}
