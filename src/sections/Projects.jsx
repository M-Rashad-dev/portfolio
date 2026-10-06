import { lazy, Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import SectionHeader from '../components/ui/SectionHeader'
import ProjectCard from '../features/projects/ProjectCard'
import { projects } from '../data/projects'

const ProjectDialog = lazy(() => import('../features/projects/ProjectDialog'))

const FILTERS = ['all', 'backend', 'fullstack', 'ecommerce', 'systems']

// Balanced layout: Featured flagship project (12 cols horizontal) + 3 symmetrical pairs (6 cols each)
const LAYOUT = {
  'medical-booking': { span: 'md:col-span-2 lg:col-span-12', variant: 'slate', featured: true },
  lms: { span: 'md:col-span-1 lg:col-span-6', variant: 'ink', featured: false },
  'oxford-academy': { span: 'md:col-span-1 lg:col-span-6', variant: 'light', featured: false },
  wizfreelance: { span: 'md:col-span-1 lg:col-span-6', variant: 'light', featured: false },
  ecommerce: { span: 'md:col-span-1 lg:col-span-6', variant: 'slate', featured: false },
  erp: { span: 'md:col-span-1 lg:col-span-6', variant: 'ink', featured: false },
  'blog-system': { span: 'md:col-span-1 lg:col-span-6', variant: 'light', featured: false },
}
const CYCLE = ['light', 'slate', 'ink']

export default function Projects() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [openSlug, setOpenSlug] = useState(null)
  const list = projects.filter((p) => filter === 'all' || p.category.includes(filter))

  return (
    <section id="projects" className="bg-bg py-16 text-ink md:py-24">
      <div className="container max-w-page">
        <SectionHeader route={t('projects.tag')} title={t('projects.title')} className="mb-8" />

        <div role="group" aria-label="Filters" className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={clsx(
                'min-h-[44px] rounded-full border px-4 font-mono text-xs transition-colors',
                filter === f ? 'border-ink bg-ink text-sky' : 'border-ink-line hover:border-ink',
              )}
            >
              {t(`projects.filters.${f}`)}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const all = filter === 'all'
              const cfg = LAYOUT[p.slug] || { span: 'md:col-span-1 lg:col-span-6', variant: CYCLE[i % 3], featured: false }
              const spanClass = all
                ? cfg.span
                : (list.length === 1 ? 'md:col-span-2 lg:col-span-12' : 'md:col-span-1 lg:col-span-6')
              const variant = all ? cfg.variant : CYCLE[i % 3]
              const featured = all ? Boolean(cfg.featured) : false

              return (
                <motion.div
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={spanClass}
                >
                  <ProjectCard
                    project={p}
                    variant={variant}
                    featured={featured}
                    onOpen={setOpenSlug}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {openSlug && (
        <Suspense fallback={null}>
          <ProjectDialog project={projects.find((p) => p.slug === openSlug)} onClose={() => setOpenSlug(null)} />
        </Suspense>
      )}
    </section>
  )
}
