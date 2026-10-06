import { Send } from 'lucide-react'
import MethodBadge from '../../components/ui/MethodBadge'

export default function RequestBar({ method, url, onUrl, onSend, busy, label }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSend()
      }}
      className="flex items-center gap-2 border-b border-sky-line p-3"
    >
      <MethodBadge method={method} />
      <input
        value={url}
        onChange={(e) => onUrl(e.target.value)}
        aria-label="URL"
        spellCheck={false}
        readOnly={method === 'POST'}
        className="min-h-[44px] min-w-0 flex-1 border border-sky-line bg-ink px-3 font-mono text-xs text-paper"
      />
      {method === 'GET' && (
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-sky px-5 font-mono text-xs font-medium text-ink disabled:opacity-60"
        >
          <Send size={14} strokeWidth={1.5} className="rtl:-scale-x-100" /> {label}
        </button>
      )}
    </form>
  )
}
