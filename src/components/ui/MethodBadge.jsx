import clsx from 'clsx'

const COLORS = {
  GET: 'text-sky border-sky',
  POST: 'text-ok border-ok',
  PUT: 'text-put border-put',
  DELETE: 'text-del border-del',
}

export default function MethodBadge({ method, className }) {
  return (
    <span
      dir="ltr"
      className={clsx('inline-block rounded-full border px-2 py-px font-mono text-[11px] font-medium leading-5', COLORS[method], className)}
    >
      {method}
    </span>
  )
}
