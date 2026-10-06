import * as CountUpModule from 'react-countup'
import { useInView } from 'react-intersection-observer'
import clsx from 'clsx'

// CJS/ESM interop: the component may sit on .default or .default.default
const CountUp = CountUpModule.default?.default ?? CountUpModule.default ?? CountUpModule

/** Oversized stat number that counts up once on view. */
export default function Counter({ end, suffix = '', plus = false, className }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <span ref={ref} dir="ltr" className={clsx('num inline-flex items-baseline text-[56px] leading-none md:text-[72px]', className)}>
      <CountUp end={inView ? end : 0} duration={1.4} preserveValue useEasing />
      <span className="text-sky text-[0.5em]">{plus ? '+' : suffix}</span>
    </span>
  )
}
