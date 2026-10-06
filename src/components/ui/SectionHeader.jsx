import clsx from 'clsx'
import Reveal from './Reveal'

export default function SectionHeader({ route, title, dark = false, className }) {
  return (
    <Reveal className={clsx('mb-12', className)}>
      <p dir="ltr" className={clsx('mono-label mb-3 text-start', dark ? 'text-sky' : 'text-muted-light')}>
        {route}
      </p>
      <h2 className={dark ? 'text-paper' : 'text-ink'}>{title}</h2>
    </Reveal>
  )
}
