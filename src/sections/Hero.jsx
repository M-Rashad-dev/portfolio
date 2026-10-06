import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Pill from '../components/ui/Pill'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import MethodBadge from '../components/ui/MethodBadge'
import StatusBadge from '../components/ui/StatusBadge'
import useTypewriter from '../hooks/useTypewriter'
import { highlight } from '../lib/highlight'
import { developer as d, contact } from '../data/developer'
import { scrollToId } from '../lib/scroll'

const BODY = `{
  name: '${d.name}',
  role: '${d.role}',
  focus: '${d.focus}',
  experience: {
    react_years: ${d.experience.react_years},
    laravel_years: ${d.experience.laravel_years}
  },
  live_projects: ${d.live_projects},
  stores_delivered: '${d.stores_delivered}',
  based_in: '${d.based_in}',
  status: 'Available for work'
}`

function ResponseCard() {
  const { typed, done } = useTypewriter(BODY, { speed: 25 })
  return (
    <Card variant="slate" radius="lg" className="relative z-10 w-full max-w-full overflow-hidden shadow-2xl" dir="ltr">
      <div className="flex items-center gap-2 sm:gap-3 border-b border-sky-line px-3.5 py-2.5 sm:px-5 sm:py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-del/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-put/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-ok/80" />
        </span>
        <MethodBadge method="GET" />
        <span className="flex-1 truncate font-mono text-[11px] sm:text-xs text-paper">/api/developer</span>
        <StatusBadge />
      </div>
      <div className="w-full max-w-full overflow-x-auto">
        <pre className="min-h-[260px] sm:min-h-[300px] w-full p-3.5 sm:p-5 text-start font-mono text-[11px] leading-relaxed sm:text-[13px] sm:leading-6 text-paper" aria-label="GET /api/developer response">
          <code>
            {highlight(typed)}
            <span className={`ms-0.5 inline-block h-3.5 w-[6px] sm:h-4 sm:w-[7px] translate-y-0.5 bg-sky ${done ? 'animate-blink' : ''}`} aria-hidden="true" />
          </code>
        </pre>
      </div>
    </Card>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-x-clip bg-ink pb-16 pt-24 sm:pt-28 text-paper">
      <div className="grid-texture absolute inset-0" aria-hidden="true" />
      <div className="container relative grid max-w-page min-w-0 w-full items-center gap-10 lg:gap-12 lg:grid-cols-2">
        <motion.div
          className="min-w-0 w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Pill className="text-sky">{t('hero.pill')}</Pill>
          <h1 className="mt-5 sm:mt-6 leading-tight">
            {t('hero.h1a')}
            <span className="text-sky">{t('hero.h1b')}</span>
            {t('hero.h1c')}
          </h1>
          <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg text-muted-dark leading-relaxed">{t('hero.sub')}</p>
          <div className="mt-7 sm:mt-8 flex flex-wrap gap-3">
            <Button as="a" href="#projects" onClick={(e) => { e.preventDefault(); scrollToId('projects') }}>
              {t('hero.projects')}
            </Button>
            <Button
              as="a"
              variant="secondary"
              href={contact.cv}
              download="Mohamed-Back-End.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper"
            >
              {t('hero.cv')}
            </Button>
          </div>
        </motion.div>

        <div className="relative min-w-0 w-full max-w-full">
          <svg
            className="pointer-events-none absolute -top-24 end-0 hidden animate-float lg:block"
            width="480"
            height="480"
            viewBox="0 0 480 480"
            aria-hidden="true"
          >
            <text x="240" y="400" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="520" fill="none" stroke="rgba(169,207,221,0.30)" strokeWidth="1">
              ;
            </text>
          </svg>
          <ResponseCard />
        </div>
      </div>

      <div dir="ltr" className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 font-mono text-xs text-muted-dark" aria-hidden="true">
        <span>{t('hero.scroll')}</span>
        <span className="h-8 w-px animate-scrollline bg-sky" />
      </div>
    </section>
  )
}
