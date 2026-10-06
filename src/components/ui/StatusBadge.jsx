import clsx from 'clsx'

export default function StatusBadge({ code = 200, text = 'OK', className }) {
  const bad = code >= 400
  return (
    <span
      dir="ltr"
      className={clsx(
        'inline-block rounded-full border px-2 py-px font-mono text-[11px] font-medium leading-5',
        bad ? 'border-del text-del' : 'border-ok text-ok',
        className,
      )}
    >
      {code} {text}
    </span>
  )
}
