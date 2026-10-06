import clsx from 'clsx'

export default function CodeBlock({ code, title, lineNumbers = false, className }) {
  const lines = code.split('\n')
  return (
    <div dir="ltr" className={clsx('overflow-hidden border border-sky-line bg-ink text-start', className)}>
      {title && (
        <div className="flex items-center gap-2 border-b border-sky-line px-4 py-2">
          <span className="mono-label text-muted-dark">{title}</span>
        </div>
      )}
      <pre className="overflow-x-auto overflow-y-auto max-h-[300px] p-4 font-mono text-[12px] sm:text-[13px] leading-6 text-paper">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            {lineNumbers && <span className="me-4 w-5 select-none text-end text-muted-dark">{i + 1}</span>}
            <code>{line || ' '}</code>
          </div>
        ))}
      </pre>
    </div>
  )
}
