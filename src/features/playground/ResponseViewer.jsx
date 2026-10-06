import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Copy } from 'lucide-react'
import clsx from 'clsx'
import StatusBadge from '../../components/ui/StatusBadge'
import { highlight } from '../../lib/highlight'

export default function ResponseViewer({ res, busy }) {
  const { t } = useTranslation()
  const [tab, setTab] = useState('pretty')
  const [copied, setCopied] = useState(false)

  const pretty = useMemo(() => (res ? JSON.stringify(res.data, null, 2) : ''), [res])
  const raw = useMemo(() => (res ? JSON.stringify(res.data) : ''), [res])
  const text = tab === 'pretty' ? pretty : raw

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pretty)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="relative min-h-[320px]">
      <div className="relative h-px overflow-hidden bg-sky-line">
        {busy && <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-sky to-transparent" />}
      </div>
      <div className="flex flex-wrap items-center gap-3 border-b border-sky-line px-3 py-2">
        {res && !busy && (
          <>
            <StatusBadge code={res.status} text={res.statusText} />
            <span className="font-mono text-xs text-muted-dark">{res.ms} {t('play.ms')}</span>
          </>
        )}
        <div className="ms-auto flex items-center gap-1 font-mono text-xs">
          {['pretty', 'raw'].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              aria-pressed={tab === k}
              className={clsx('min-h-[36px] rounded-full px-3', tab === k ? 'bg-sky/15 text-sky' : 'text-muted-dark hover:text-paper')}
            >
              {t(`play.${k}`)}
            </button>
          ))}
          <button
            type="button"
            onClick={copy}
            disabled={!res}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 text-muted-dark hover:text-paper disabled:opacity-40"
          >
            {copied ? <Check size={14} strokeWidth={1.5} /> : <Copy size={14} strokeWidth={1.5} />}
            {copied ? t('play.copied') : t('play.copy')}
          </button>
        </div>
      </div>
      <div aria-live="polite" className="max-h-[420px] overflow-auto p-4">
        {res && !busy ? (
          <pre className={clsx('font-mono text-xs leading-6', tab === 'raw' && 'whitespace-pre-wrap break-all')}>
            <code>{highlight(text)}</code>
          </pre>
        ) : (
          <p className="font-mono text-xs text-muted-dark">{busy ? '…' : t('play.empty')}</p>
        )}
      </div>
    </div>
  )
}
