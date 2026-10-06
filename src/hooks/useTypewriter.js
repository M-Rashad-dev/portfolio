import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './useReducedMotion'

/** Types `text` char by char. Returns the visible slice and a done flag. */
export default function useTypewriter(text, { speed = 25, start = true } = {}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return undefined
    if (prefersReducedMotion()) {
      const id = setTimeout(() => setCount(text.length), 0)
      return () => clearTimeout(id)
    }
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, start])

  return { typed: text.slice(0, count), done: count >= text.length }
}
