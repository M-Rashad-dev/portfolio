import Lenis from 'lenis'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

let instance = null

export function initLenis() {
  const touch = window.matchMedia('(pointer: coarse)').matches
  if (touch || prefersReducedMotion() || instance) return instance
  instance = new Lenis({ lerp: 0.1 })
  const raf = (t) => {
    instance?.raf(t)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return instance
}

export function getLenis() {
  return instance
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) instance.scrollTo(el, { offset: -64 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function scrollToTop() {
  if (instance) instance.scrollTo(0)
  else window.scrollTo({ top: 0 })
}
