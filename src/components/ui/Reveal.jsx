import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

/** Fade + rise once when 20% in view. */
export default function Reveal({ children, delay = 0, y = 24, as = 'div', className, ...rest }) {
  const reduced = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? 0.15 : 0.6, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
