import clsx from 'clsx'

const RADIUS = {
  sm: 'rounded-es-[28px]',
  md: 'rounded-es-[48px]',
  lg: 'rounded-es-[72px]',
  xl: 'rounded-es-[120px]',
}

const VARIANT = {
  light: 'bg-surface text-ink border-ink-line',
  ink: 'bg-ink text-paper border-sky-line',
  slate: 'bg-slate text-paper border-sky-line',
}

/** Signature shape: only the bottom-start corner is rounded. */
export default function Card({ variant = 'light', radius = 'md', hover = false, as: Tag = 'div', className, ...rest }) {
  return (
    <Tag
      className={clsx(
        'relative border transition-[transform,border-color] duration-200 ease-out',
        RADIUS[radius],
        VARIANT[variant],
        hover && 'hover:-translate-y-1 hover:border-sky',
        className,
      )}
      {...rest}
    />
  )
}
