import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Code2, ExternalLink } from 'lucide-react'
import clsx from 'clsx'
import Card from '../../components/ui/Card'
import Pill from '../../components/ui/Pill'
import MethodBadge from '../../components/ui/MethodBadge'

export default function ProjectCard({ project, variant, onOpen, className, featured = false }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const dark = variant !== 'light'
  const shot = project.screenshots?.[0]

  return (
    <Card
      as="button"
      type="button"
      variant={variant}
      hover
      onClick={() => onOpen(project.slug)}
      aria-label={`${t('projects.open')}: ${project.title[lang]}`}
      className={clsx(
        'group flex h-full w-full flex-col gap-4 p-5 text-start overflow-hidden',
        featured && 'md:grid md:grid-cols-12 md:gap-6 md:p-6 md:items-stretch',
        className,
      )}
    >
      {/* Visual Screenshot or Architecture Banner */}
      <div
        className={clsx(
          'relative w-full aspect-[16/10] overflow-hidden rounded-es-[24px] border border-current/15 bg-slate/40 flex items-center justify-center shrink-0',
          featured && 'md:col-span-6 lg:col-span-7 md:aspect-auto md:h-full md:min-h-[280px]',
        )}
      >
        {shot ? (
          <>
            <img
              src={shot}
              alt={project.title[lang]}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-slate/60 to-ink/80 text-muted-dark">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-sky">/{project.slug}</span>
              <Code2 size={16} />
            </div>
            <div className="text-center font-mono text-xs opacity-75">
              <span>{project.stack.slice(0, 3).join(' · ')}</span>
            </div>
            <div className="text-[10px] font-mono text-end opacity-50">System Architecture</div>
          </div>
        )}

        {/* Live URL badge overlay */}
        {project.url && (
          <div className="absolute top-2.5 end-2.5 z-10">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-ink/85 text-sky border border-sky-line backdrop-blur-sm shadow-sm transition-transform duration-200 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.url, '_blank', 'noreferrer')
              }}
            >
              <span>visit</span>
              <ExternalLink size={11} />
            </span>
          </div>
        )}
      </div>

      {/* Content wrapper */}
      <div
        className={clsx(
          'flex flex-1 flex-col gap-3',
          featured && 'md:col-span-6 lg:col-span-5 md:justify-between',
        )}
      >
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2.5" dir="ltr">
            <MethodBadge method={project.method} />
            <span className={clsx('font-mono text-xs truncate', dark ? 'text-muted-dark' : 'text-muted-light')}>
              {project.route}
            </span>
            {featured && (
              <span className="ms-1 inline-flex items-center gap-1 rounded-full bg-sky/15 text-sky px-2.5 py-0.5 text-[11px] font-mono font-medium border border-sky/30">
                ★ {lang === 'ar' ? 'مشروع مميز' : 'Featured'}
              </span>
            )}
            {project.live && (
              <Pill dot className="ms-auto text-ok shrink-0">
                {t('projects.live')}
              </Pill>
            )}
          </div>

          <h3 className={clsx('font-bold tracking-tight group-hover:text-sky transition-colors duration-200', featured ? 'text-xl lg:text-2xl' : 'text-xl')}>
            {project.title[lang]}
          </h3>
          <p className={clsx('mt-2 text-sm leading-relaxed', featured ? 'line-clamp-3' : 'line-clamp-2', dark ? 'text-muted-dark' : 'text-muted-light')}>
            {project.desc[lang]}
          </p>

          {featured && project.features?.[lang] && (
            <ul className="mt-3 hidden sm:flex flex-col gap-1.5 text-xs opacity-85">
              {project.features[lang].slice(0, 2).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-end justify-between gap-3 mt-auto pt-2">
          <ul className="flex flex-wrap gap-1.5" dir="ltr">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-current/25 px-2.5 py-0.5 font-mono text-[11px]">
                {s}
              </li>
            ))}
          </ul>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current/30 transition-all duration-200 group-hover:bg-sky group-hover:text-ink group-hover:scale-105">
            <ArrowUpRight size={18} strokeWidth={1.5} className="rtl:-scale-x-100" />
          </span>
        </div>
      </div>
    </Card>
  )
}
