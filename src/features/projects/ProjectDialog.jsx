import * as Dialog from '@radix-ui/react-dialog'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslation } from 'react-i18next'
import { X, ImageIcon, ExternalLink } from 'lucide-react'
import MethodBadge from '../../components/ui/MethodBadge'
import ArchDiagram from './ArchDiagram'

function Block({ title, children }) {
  return (
    <section className="border-t border-dashed border-sky-line py-5">
      <h4 dir="ltr" className="mono-label mb-3 text-start text-sky">{title}</h4>
      {children}
    </section>
  )
}

function Gallery({ shots, alt, todo }) {
  const [ref] = useEmblaCarousel({ direction: document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr' })
  const slides = shots.length ? shots : [null, null, null]
  return (
    <div ref={ref} className="overflow-hidden">
      <div className="flex gap-3">
        {slides.map((s, i) => (
          <div key={i} className="grid h-40 min-w-0 flex-[0_0_70%] place-items-center rounded-es-[28px] border border-dashed border-sky-line text-xs text-muted-dark sm:flex-[0_0_45%]">
            {s ? <img src={s} alt={alt} loading="lazy" className="h-full w-full object-cover" /> : (
              <span className="flex items-center gap-2"><ImageIcon size={16} strokeWidth={1.5} /> {todo}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProjectDialog({ project, onClose }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  if (!project) return null

  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="dlg-overlay fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm" />
        <Dialog.Content
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          className="dlg-content fixed inset-x-0 bottom-0 z-[91] max-h-[90svh] overflow-y-auto rounded-es-[48px] border border-sky-line bg-slate p-6 text-paper md:inset-0 md:m-auto md:h-fit md:w-[min(720px,92vw)] md:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div dir="ltr" className="mb-2 flex items-center gap-2">
                <MethodBadge method={project.method} />
                <span className="font-mono text-xs text-muted-dark">{project.route}</span>
              </div>
              <Dialog.Title className="text-2xl font-semibold leading-snug">{project.title[lang]}</Dialog.Title>
            </div>
            <Dialog.Close aria-label={t('projects.close')} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sky-line">
              <X size={18} strokeWidth={1.5} />
            </Dialog.Close>
          </div>

          <Block title={t('projects.overview')}>
            <Dialog.Description className="text-muted-dark">{project.desc[lang]}</Dialog.Description>
          </Block>
          <Block title={t('projects.role')}>
            <p className="text-muted-dark">{t('projects.roleV')}</p>
          </Block>
          <Block title={t('projects.stack')}>
            <ul dir="ltr" className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-sky-line px-3 py-0.5 font-mono text-xs">{s}</li>
              ))}
            </ul>
          </Block>
          <Block title={t('projects.features')}>
            <ul className="list-disc space-y-1 ps-5 text-muted-dark marker:text-sky">
              {project.features[lang].map((f) => <li key={f}>{f}</li>)}
            </ul>
          </Block>
          <Block title={t('projects.arch')}>
            <ArchDiagram nodes={project.diagram} note={project.slug === 'medical-booking' ? t('projects.rbac') : null} />
          </Block>
          <Block title={t('projects.gallery')}>
            <Gallery shots={project.screenshots} alt={project.title[lang]} todo={t('projects.screenshot')} />
          </Block>
          <Block title={t('projects.links')}>
            {project.url ? (
              <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sky underline">
                {t('projects.liveUrl')} <ExternalLink size={14} strokeWidth={1.5} />
              </a>
            ) : (
              <p className="font-mono text-xs text-muted-dark">{t('projects.todoUrl')}</p>
            )}
          </Block>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
