import { useTranslation } from 'react-i18next'
import { ArrowUp } from 'lucide-react'
import LangToggle from './LangToggle'
import { scrollToTop } from '../../lib/scroll'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-sky-line bg-ink py-8 text-paper">
      <div className="container flex max-w-page flex-wrap items-center justify-between gap-4">
        <p dir="ltr" className="mono-label text-muted-dark">
          {t('footer.line')}
        </p>
        <div className="flex items-center gap-3">
          <LangToggle />
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={t('footer.top')}
            className="grid h-11 w-11 place-items-center rounded-full border border-sky-line transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  )
}
