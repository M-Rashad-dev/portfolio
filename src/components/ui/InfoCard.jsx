import clsx from 'clsx'

/** Label + line icon, dashed divider, then the value. */
export default function InfoCard({ icon: Icon, label, value, className }) {
  return (
    <div className={clsx('border border-dashed border-ink-line bg-transparent p-5', className)}>
      <div className="flex items-center gap-2 text-muted-light">
        {Icon && <Icon size={18} strokeWidth={1.5} aria-hidden="true" />}
        <span className="mono-label">{label}</span>
      </div>
      <div className="my-3 border-t border-dashed border-ink-line" />
      <p className="font-medium leading-snug text-ink">{value}</p>
    </div>
  )
}
