import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GitCommitHorizontal,
  Calendar,
  Building2,
  ChevronDown,
  Sparkles,
  GraduationCap,
  Layers,
} from 'lucide-react'
import clsx from 'clsx'
import Card from '../components/ui/Card'
import Pill from '../components/ui/Pill'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { experience } from '../data/experience'
import { education } from '../data/education'

function ExperienceCommit({ item, index, lang }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Reveal delay={index * 0.08} className="relative ps-8 sm:ps-12 pb-12 last:pb-0">
      {/* Continuous Git branch line */}
      <div
        className="absolute start-[11px] sm:start-[15px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-sky to-sky-line/30"
        aria-hidden="true"
      />

      {/* Git Commit Node */}
      <div
        className="absolute start-0 sm:start-1 top-1.5 grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full border-2 border-sky bg-slate text-sky shadow-[0_0_14px_rgba(169,207,221,0.5)] z-10"
        aria-hidden="true"
      >
        <span className="h-2 w-2 rounded-full bg-sky" />
      </div>

      {/* Main Commit Card */}
      <Card
        variant="ink"
        radius="md"
        className="p-5 sm:p-7 border-sky-line/50 hover:border-sky/80 transition-all duration-300 shadow-xl"
      >
        {/* Top meta bar: Commit hash, branch, and clean date */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-line/40 pb-4 mb-4">
          <div className="flex items-center gap-2" dir="ltr">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky/10 border border-sky/30 font-mono text-xs text-sky">
              <GitCommitHorizontal size={14} />
              <span>commit {item.hash}</span>
            </span>
            <span className="text-xs font-mono text-muted-dark hidden sm:inline">
              HEAD -&gt; main
            </span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate border border-sky-line/40 font-mono text-xs text-paper"
            dir="ltr"
          >
            <Calendar size={13} className="text-sky" />
            <span>{item.dates}</span>
          </div>
        </div>

        {/* Role title and company */}
        <div className="space-y-2 mb-4">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-paper tracking-tight">
              {item.title[lang]}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-dark">
            <span className="inline-flex items-center gap-1.5 text-paper/90 font-medium">
              <Building2 size={16} className="text-sky" />
              <span>{item.company}</span>
            </span>
            <span className="text-sky-line" aria-hidden="true">•</span>
            <Pill className="text-xs text-sky border-sky/30 bg-sky/5">
              {item.type}
            </Pill>
          </div>
        </div>

        {/* Visible preview of description */}
        <p className="text-sm sm:text-base text-paper/85 leading-relaxed mb-4">
          {item.summary?.[lang] || item.desc[lang]}
        </p>

        {/* Tech stack pills for this role */}
        {item.technologies && (
          <div className="flex flex-wrap gap-1.5 pt-1 mb-4" dir="ltr">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md bg-slate/70 border border-sky-line/30 font-mono text-[11px] text-paper/80"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Expandable full details */}
        <div className="border-t border-sky-line/30 pt-3">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-sky hover:text-white transition-colors duration-200"
          >
            <span>
              {expanded
                ? (lang === 'ar' ? 'عرض أقل' : 'Show less')
                : (lang === 'ar' ? 'عرض التفاصيل الكاملة للمشروع' : 'View full role details')}
            </span>
            <ChevronDown
              size={16}
              className={clsx('transition-transform duration-300', expanded && 'rotate-180')}
            />
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-2 border-t border-dashed border-sky-line/30 text-sm leading-relaxed text-muted-dark space-y-2">
                  <p>{item.desc[lang]}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </Reveal>
  )
}

export default function Journey() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <section id="journey" className="relative bg-slate py-16 text-paper md:py-24">
      <div className="grid-texture absolute inset-0" aria-hidden="true" />
      <div className="container relative max-w-4xl">
        <SectionHeader route={t('journey.tag')} title={t('journey.title')} dark className="mb-12" />

        {/* Structured Git Log Timeline */}
        <div className="relative mb-20">
          <div className="space-y-2">
            {experience.map((e, i) => (
              <ExperienceCommit
                key={e.hash}
                item={e}
                index={i}
                lang={lang}
              />
            ))}
          </div>
        </div>

        {/* Education & Training Section */}
        <div className="pt-8 border-t border-sky-line/40">
          <div className="flex items-center gap-2.5 mb-8">
            <GraduationCap size={24} className="text-sky" />
            <h3 className="text-2xl font-bold text-paper tracking-tight">
              {t('journey.education')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {education.map((ed, i) => {
              const isSUT = ed.key === 'sut'
              return (
                <Reveal key={ed.key} delay={i * 0.08}>
                  <Card
                    variant={isSUT ? 'ink' : 'slate'}
                    radius="md"
                    className={clsx(
                      'h-full p-6 space-y-3 transition-all duration-300 hover:border-sky',
                      isSUT && 'border-sky shadow-[0_0_24px_rgba(169,207,221,0.12)]'
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-sky">
                        {isSUT ? <Sparkles size={18} /> : <Layers size={18} />}
                        <span className="mono-label uppercase text-[11px] tracking-wider text-sky">
                          {isSUT ? (lang === 'ar' ? 'الدرجة الأكاديمية' : 'Academic Degree') : (lang === 'ar' ? 'تدريب متخصص' : 'Specialized Training')}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-paper leading-snug">
                      {ed.name[lang]}
                    </h4>

                    <p className="text-sm leading-relaxed text-muted-dark">
                      {ed.detail[lang]}
                    </p>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
