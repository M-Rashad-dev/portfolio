import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Command } from 'lucide-react'
import clsx from 'clsx'
import Brand from '../ui/Brand'
import LangToggle from './LangToggle'
import useScrollSpy from '../../hooks/useScrollSpy'
import { scrollToId, scrollToTop } from '../../lib/scroll'

import { SECTION_IDS } from '../../lib/sections'

export default function Navbar({ onPalette }) {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 50 : 0)
  }

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-200',
        scrolled && 'bg-ink/80 backdrop-blur-md',
      )}
    >
      <div className="container flex h-16 max-w-page items-center justify-between gap-4">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop() }} aria-label="Mohamed Rashad">
          <Brand />
        </a>

        <nav aria-label="Primary" dir="ltr" className="hidden items-center gap-6 lg:flex">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => go(e, id)}
              aria-current={active === id ? 'true' : undefined}
              className={clsx(
                'mono-label border-b pb-1 transition-colors',
                active === id ? 'border-sky text-sky' : 'border-transparent text-muted-dark hover:text-paper',
              )}
            >
              /{t(`nav.${id}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <button
            type="button"
            onClick={onPalette}
            aria-label={t('nav.palette')}
            className="mono-label hidden min-h-[36px] items-center gap-1.5 rounded-full border border-sky-line px-3 text-muted-dark hover:text-paper sm:inline-flex"
          >
            <Command size={14} strokeWidth={1.5} /> K
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t('nav.close') : t('nav.menu')}
            className="grid h-11 w-11 place-items-center rounded-full border border-sky-line text-paper lg:hidden"
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 flex flex-col justify-center gap-2 bg-ink px-8 lg:hidden"
          >
            {SECTION_IDS.map((id, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={(e) => go(e, id)}
                dir="ltr"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={clsx('block py-2 text-start font-mono text-3xl', active === id ? 'text-sky' : 'text-paper')}
              >
                /{t(`nav.${id}`)}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
