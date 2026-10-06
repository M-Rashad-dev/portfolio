import { useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'

export default function LangToggle({ className }) {
  const { lang } = useParams()
  const navigate = useNavigate()
  const go = (l) => {
    if (l === lang) return
    try {
      localStorage.setItem('lang', l)
    } catch {
      /* ignore */
    }
    navigate(`/${l}${window.location.hash}`)
  }
  return (
    <div dir="ltr" role="group" aria-label="Language" className={clsx('inline-flex items-center rounded-full border border-sky-line font-mono text-xs', className)}>
      {['ar', 'en'].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => go(l)}
          aria-pressed={lang === l}
          className={clsx(
            'min-h-[36px] min-w-[44px] rounded-full px-3 uppercase transition-colors',
            lang === l ? 'bg-sky text-ink' : 'text-muted-dark hover:text-paper',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
