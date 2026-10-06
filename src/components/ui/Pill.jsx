import clsx from 'clsx'

export default function Pill({ icon: Icon, className, children, dot = false }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border border-current px-3 py-1 text-xs font-medium',
        className,
      )}
    >
      {dot && <span className="h-2 w-2 animate-pulsedot rounded-full bg-ok" aria-hidden="true" />}
      {Icon && <Icon size={14} strokeWidth={1.5} aria-hidden="true" />}
      {children}
    </span>
  )
}
