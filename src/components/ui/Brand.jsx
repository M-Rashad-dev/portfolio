import clsx from 'clsx'

/** Semicolon glyph in a square tile with one rounded corner + MR monogram. */
export default function Brand({ className }) {
  return (
    <span dir="ltr" className={clsx('inline-flex items-center gap-2', className)}>
      <span className="grid h-9 w-9 place-items-center rounded-es-[14px] border border-sky-line bg-ink font-mono text-2xl font-medium leading-none text-sky">
        <span className="-mt-1">;</span>
      </span>
      <span className="font-mono text-sm font-medium tracking-[0.06em] text-paper">MR</span>
    </span>
  )
}
