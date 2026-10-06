import clsx from 'clsx'
import MethodBadge from '../../components/ui/MethodBadge'
import { ENDPOINTS } from './mockApi'

export default function EndpointList({ selected, onSelect }) {
  return (
    <div
      role="listbox"
      aria-label="Endpoints"
      className="flex gap-2 overflow-x-auto border-b border-sky-line p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-e"
    >
      {ENDPOINTS.map((e, i) => (
        <button
          key={e.path + e.method}
          type="button"
          role="option"
          aria-selected={selected === i}
          onClick={() => onSelect(i)}
          className={clsx(
            'flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-3 text-start font-mono text-xs transition-colors lg:rounded-none lg:border-0 lg:border-s-2',
            selected === i ? 'border-sky bg-sky/10 text-paper' : 'border-sky-line text-muted-dark hover:text-paper lg:border-transparent',
          )}
        >
          <MethodBadge method={e.method} />
          <span className="whitespace-nowrap">{e.path}</span>
        </button>
      ))}
    </div>
  )
}
