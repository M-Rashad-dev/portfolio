import clsx from 'clsx'
import { ArrowRight } from 'lucide-react'

const VARIANT = {
  primary: 'bg-sky text-ink border-sky',
  secondary: 'border-current bg-transparent',
}

export default function Button({ variant = 'primary', arrow = true, as: Tag = 'button', className, children, ...rest }) {
  return (
    <Tag
      className={clsx(
        'group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium',
        'transition-transform duration-150 ease-out hover:-translate-y-0.5',
        VARIANT[variant],
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          strokeWidth={1.5}
          className="transition-transform duration-150 rtl:rotate-180 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5"
        />
      )}
    </Tag>
  )
}
