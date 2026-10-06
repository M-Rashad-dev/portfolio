import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, MapPin, Layers, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react'
import Card from '../components/ui/Card'
import Counter from '../components/ui/Counter'
import InfoCard from '../components/ui/InfoCard'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'

const STATS = [
  { key: 'react', end: 4, variant: 'ink' },
  { key: 'laravel', end: 3, variant: 'slate' },
  { key: 'stores', end: 50, plus: true, variant: 'ink' },
  { key: 'oxford', end: 97, suffix: '%', variant: 'slate' },
]

export default function About() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="about" className="bg-bg py-16 text-ink md:py-24">
      <div className="container max-w-page">
        <SectionHeader route={t('about.tag')} title={t('about.title')} />
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          <Reveal className="col-span-12 lg:col-span-7">
            <Card variant="light" radius="lg" className="h-full flex flex-col justify-between space-y-4 p-6 sm:p-7 md:p-9 text-sm md:text-base leading-relaxed">
              <div className="space-y-3.5">
                <p className="font-bold text-base md:text-lg text-ink">{t('about.p1')}</p>
                <p className="text-ink font-medium">{t('about.p2')}</p>

                {/* Desktop: Full content always visible */}
                <div className="hidden lg:block space-y-3.5">
                  <p className="text-muted-light text-sm md:text-[15px]">{t('about.p3')}</p>
                  <p className="text-muted-light text-sm md:text-[15px]">{t('about.p4')}</p>
                  <p className="text-muted-light text-sm md:text-[15px]">{t('about.p5')}</p>
                </div>

                {/* Mobile: Smoothly expands when user clicks read more */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="lg:hidden overflow-hidden space-y-3 pt-1"
                    >
                      <p className="text-muted-light text-sm leading-relaxed">{t('about.p3')}</p>
                      <p className="text-muted-light text-sm leading-relaxed">{t('about.p4')}</p>
                      <p className="text-muted-light text-sm leading-relaxed">{t('about.p5')}</p>
                      <p className="pt-2 text-xs font-mono text-ink/85 border-t border-ink-line/50">
                        {t('about.p6')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile Toggle Button */}
                <div className="lg:hidden pt-1">
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-sky bg-ink px-4 py-2 rounded-full border border-sky-line/50 shadow-sm transition-all active:scale-95 hover:border-sky"
                  >
                    <span>{expanded ? t('about.readLess') : t('about.readMore')}</span>
                    {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {/* Desktop principles footer */}
              <p className="hidden lg:block pt-3 text-xs md:text-sm font-mono text-ink/85 border-t border-ink-line/50">
                {t('about.p6')}
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.08} className="col-span-12 lg:col-span-5">
            <Card variant="ink" radius="xl" className="group relative min-h-[320px] sm:min-h-[360px] h-full overflow-hidden p-0 border-sky-line/40 shadow-2xl">
              <img
                src="/me.jpeg"
                alt="Mohamed Rashad"
                className="w-full h-full object-cover object-center grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-5 start-5 z-10">
                <span className="mono-label text-xs text-sky bg-ink/80 px-3.5 py-1.5 rounded-full border border-sky-line backdrop-blur-md shadow-md">
                  Mohamed Rashad · Full Stack
                </span>
              </div>
            </Card>
          </Reveal>

          {STATS.map((s, i) => (
            <Reveal key={s.key} delay={0.08 * i} className="col-span-6 lg:col-span-3">
              <Card variant={s.variant} radius="md" className="flex h-full flex-col justify-between gap-6 p-6">
                <Counter end={s.end} plus={s.plus} suffix={s.suffix} />
                <p className="text-sm text-muted-dark">{t(`about.stats.${s.key}`)}</p>
              </Card>
            </Reveal>
          ))}

          {[
            ['role', Briefcase],
            ['based', MapPin],
            ['focus', Layers],
            ['edu', GraduationCap],
          ].map(([k, Icon], i) => (
            <Reveal key={k} delay={0.06 * i} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <InfoCard icon={Icon} label={t(`about.info.${k}`)} value={t(`about.info.${k}V`)} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
